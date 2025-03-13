import { LinkedDevicesProof } from '@darksoil-studio/linked-devices-zome';
import { SignedEvent } from '@darksoil-studio/private-event-sourcing-zome';
import {
	AgentPubKey,
	AgentPubKeyB64,
	EntryHash,
	EntryHashB64,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import { msg } from '@lit/localize';
import { decode } from '@msgpack/msgpack';
import {
	AsyncComputed,
	AsyncResult,
	Signal,
	joinAsync,
	mapCompleted,
	toPromise,
	uniquify,
} from '@tnesh-stack/signals';
import { MemoHoloHashMap } from '@tnesh-stack/utils';

import { MessengerStore } from './messenger-store.js';
import {
	CreateGroupChat,
	GroupChat,
	GroupChatEntry,
	GroupEvent,
	GroupInfo,
	GroupSettings,
	Message,
	MessengerEvent,
} from './types.js';
import {
	TYPING_INDICATOR_TTL_MS,
	mergeMaybeHashes,
	mergeMaybeStrings,
	mergeStrings,
} from './utils.js';

export class GroupChatStore {
	typingPeers = new Signal.State<AgentPubKey[]>([]);

	private timeouts: Record<AgentPubKeyB64, number> = {};

	constructor(
		public messengerStore: MessengerStore,
		public groupChatHash: EntryHash,
	) {
		this.messengerStore.client.onSignal(signal => {
			if (signal.type === 'GroupChatTypingIndicator') {
				if (
					encodeHashToBase64(signal.group_chat_hash) ===
					encodeHashToBase64(this.groupChatHash)
				) {
					this.typingPeers.set([
						signal.peer,
						...this.typingPeers
							.get()
							.filter(
								a => encodeHashToBase64(a) !== encodeHashToBase64(signal.peer),
							),
					]);
					if (this.timeouts[encodeHashToBase64(signal.peer)])
						clearTimeout(this.timeouts[encodeHashToBase64(signal.peer)]);
					this.timeouts[encodeHashToBase64(signal.peer)] = setTimeout(() => {
						this.typingPeers.set(
							this.typingPeers
								.get()
								.filter(
									a =>
										encodeHashToBase64(a) !== encodeHashToBase64(signal.peer),
								),
						);
					}, TYPING_INDICATOR_TTL_MS);
				}
			} else if (
				signal.type === 'EntryCreated' &&
				signal.app_entry.type === 'PrivateEvent'
			) {
				const event = decode(signal.app_entry.event.content) as MessengerEvent;
				if (
					event.type === 'GroupMessage' &&
					encodeHashToBase64(event.group_chat_hash) ===
						encodeHashToBase64(this.groupChatHash)
				) {
					const author = signal.app_entry.author;
					this.typingPeers.set(
						this.typingPeers
							.get()
							.filter(
								a => encodeHashToBase64(a) !== encodeHashToBase64(author),
							),
					);
				}
			}
		});
	}

	private groupChatEntries = new AsyncComputed(() => {
		const privateMessengerEntriesResult =
			this.messengerStore.messengerEntries.get();
		if (privateMessengerEntriesResult.status !== 'completed')
			return privateMessengerEntriesResult;

		const groupChatHashB64 = encodeHashToBase64(this.groupChatHash);
		const groupChatEntries =
			privateMessengerEntriesResult.value.groupChats[groupChatHashB64];

		const previousToNexts: Record<EntryHashB64, Array<EntryHashB64>> = {};
		const initialEventsHashes: Array<EntryHashB64> = [];

		if (!groupChatEntries) {
			return {
				status: 'error' as const,
				error: msg('Group not found'),
			};
		}

		for (const [entryHash, groupChatEvent] of Object.entries(
			groupChatEntries.events,
		)) {
			const previousEventsHashes =
				groupChatEvent.event.content.previous_group_chat_events_hashes;
			if (previousEventsHashes.length === 0) {
				initialEventsHashes.push(entryHash);
			} else {
				for (const previous of previousEventsHashes) {
					const previousB64 = encodeHashToBase64(previous);
					if (!previousToNexts[previousB64]) {
						previousToNexts[previousB64] = [];
					}
					previousToNexts[previousB64].push(entryHash);
				}
			}
		}
		const allEventsWithDescendants = Object.keys(previousToNexts);
		const currentEventsHashes = Object.keys(groupChatEntries.events).filter(
			eventHash => !allEventsWithDescendants.includes(eventHash),
		);

		return {
			status: 'completed',
			value: {
				...groupChatEntries,
				previousToNexts,
				currentEventsHashes,
				initialEventsHashes,
			},
		};
	});

	private groupChatAtEvent = new MemoHoloHashMap(
		(eventHash: EntryHash) =>
			new AsyncComputed<GroupChat>((): AsyncResult<GroupChat> => {
				const entries = this.groupChatEntries.get();
				if (entries.status !== 'completed') return entries;

				const eventHashB64 = encodeHashToBase64(eventHash);

				const event = entries.value.events[eventHashB64];

				if (!event || !entries.value.createGroupChat) {
					return {
						status: 'error' as const,
						error: msg('Group chat not found.'),
					};
				}

				const previousEventsHashes =
					event.event.content.previous_group_chat_events_hashes;

				if (previousEventsHashes.length === 0) {
					const originalGroupChat: GroupChat = initialGroupChat(
						entries.value.createGroupChat.event.content,
					);
					const groupChat = apply(
						originalGroupChat,
						event.author,
						event.event.content.event,
					);
					return {
						status: 'completed',
						value: groupChat,
					};
				}

				const previousGroupChats = joinAsync(
					previousEventsHashes.map(
						eventHash =>
							this.groupChatAtEvent
								.get(eventHash)
								.get() as AsyncResult<GroupChat>,
					),
				);
				if (previousGroupChats.status !== 'completed')
					return previousGroupChats;

				let currentGroupChat = previousGroupChats.value[0];
				for (let i = 1; i < previousGroupChats.value.length; i++) {
					currentGroupChat = merge(
						currentGroupChat,
						previousGroupChats.value[i],
					);
				}

				currentGroupChat = apply(
					currentGroupChat,
					event.author,
					event.event.content.event,
				);

				return {
					status: 'completed',
					value: currentGroupChat,
				};
			}),
	);

	currentGroupChat = new AsyncComputed<GroupChat>(() => {
		const entries = this.groupChatEntries.get();
		if (entries.status !== 'completed') return entries;
		if (!entries.value.createGroupChat) {
			return {
				status: 'error' as const,
				error: msg('Group chat not found.'),
			};
		}

		if (entries.value.currentEventsHashes.length === 0) {
			return {
				status: 'completed' as const,
				value: initialGroupChat(entries.value.createGroupChat.event.content),
			};
		}

		const previousGroupChats = joinAsync(
			entries.value.currentEventsHashes.map(
				eventHash =>
					this.groupChatAtEvent
						.get(decodeHashFromBase64(eventHash))
						.get() as AsyncResult<GroupChat>,
			),
		);
		if (previousGroupChats.status !== 'completed') return previousGroupChats;

		let currentGroupChat = previousGroupChats.value[0];
		for (let i = 1; i < previousGroupChats.value.length; i++) {
			currentGroupChat = merge(currentGroupChat, previousGroupChats.value[i]);
		}

		return {
			status: 'completed' as const,
			value: currentGroupChat,
		};
	});

	readMessages = new AsyncComputed(() => {
		const entries = this.groupChatEntries.get();
		const currentGroupChat = this.currentGroupChat.get();
		if (entries.status !== 'completed') return entries;
		if (currentGroupChat.status !== 'completed') return currentGroupChat;

		const me = currentGroupChat.value.members.find(m =>
			m.agents.find(
				a =>
					encodeHashToBase64(a) ===
					encodeHashToBase64(this.messengerStore.client.client.myPubKey),
			),
		)!;

		let myReadMessages: EntryHashB64[] = [];
		const theirReadMessages: Record<AgentPubKeyB64, EntryHashB64[]> = {};

		for (const readMessages of Object.values(entries.value.readMessages)) {
			if (
				me.agents.find(
					a =>
						encodeHashToBase64(a) === encodeHashToBase64(readMessages.author),
				)
			) {
				myReadMessages = [
					...myReadMessages,
					...readMessages.event.content.read_messages_hashes.map(
						encodeHashToBase64,
					),
				];
			} else {
				const author = encodeHashToBase64(readMessages.author);
				if (!theirReadMessages[author]) {
					theirReadMessages[author] = [];
				}
				theirReadMessages[author] = Array.from(
					new Set([
						...theirReadMessages[author],
						...readMessages.event.content.read_messages_hashes.map(
							encodeHashToBase64,
						),
					]),
				);
			}
		}

		return {
			status: 'completed' as const,
			value: {
				myReadMessages: Array.from(new Set(myReadMessages)),
				theirReadMessages,
			},
		};
	});

	originalGroupChat = new AsyncComputed(() => {
		const entries = this.groupChatEntries.get();
		if (entries.status !== 'completed') return entries;
		if (!entries.value.createGroupChat) {
			return {
				status: 'error' as const,
				error: msg('Group chat not found.'),
			};
		}
		return {
			status: 'completed' as const,
			value: entries.value.createGroupChat,
		};
	});

	messages = mapCompleted(this.groupChatEntries, e => e.messages);

	events = mapCompleted(this.groupChatEntries, e => e.events);

	summary = new AsyncComputed<GroupChatSummary>(() => {
		const currentGroupChat = this.currentGroupChat.get();
		const entries = this.groupChatEntries.get();
		const readMessages = this.readMessages.get();
		if (currentGroupChat.status !== 'completed') return currentGroupChat;
		if (entries.status !== 'completed') return entries;
		if (readMessages.status !== 'completed') return readMessages;
		if (!entries.value.createGroupChat) {
			return {
				status: 'error' as const,
				error: msg('Group chat not found.'),
			};
		}

		const me = currentGroupChat.value.members.find(m =>
			m.agents.find(
				a =>
					encodeHashToBase64(a) ===
					encodeHashToBase64(this.messengerStore.client.client.myPubKey),
			),
		)!;

		const myUnreadMessages = Object.entries(entries.value.messages)
			.filter(
				([messageHash, message]) =>
					!readMessages.value.myReadMessages.includes(messageHash) &&
					!me.agents.find(
						a => encodeHashToBase64(a) === encodeHashToBase64(message.author),
					),
			)
			.map(([hash, _]) => hash);

		const allActivity: Array<SignedEvent<GroupChatEntry>> = [
			...Object.values(entries.value.messages).map(m => ({
				...m,
				event: {
					content: {
						...m.event.content,
					},
					timestamp: m.event.timestamp,
				},
			})),
			{
				...entries.value.createGroupChat,
				event: {
					content: {
						type: 'CreateGroupChat' as const,
						...entries.value.createGroupChat.event.content,
					},
					timestamp: entries.value.createGroupChat.event.timestamp,
				},
			},
			...Object.values(entries.value.events)
				.filter(e => {
					const type = e.event.content.event.type;
					return (
						type === 'AddMember' ||
						type === 'RemoveMember' ||
						type === 'UpdateGroupInfo' ||
						type === 'LeaveGroup' ||
						type === 'DeleteGroup'
					);
				})
				.map(e => ({
					...e,
					event: {
						content: {
							...e.event.content,
						},
						timestamp: e.event.timestamp,
					},
				})),
		];

		const lastActivity = allActivity.sort(
			(m1, m2) => m2.event.timestamp - m1.event.timestamp,
		)[0];

		return {
			status: 'completed',
			value: {
				groupChatHash: this.groupChatHash,
				currentGroup: currentGroupChat.value,
				lastActivity,
				myUnreadMessages,
			},
		};
	});

	async sendMessage(message: Message): Promise<EntryHash> {
		const entries = await toPromise(this.groupChatEntries);

		return this.messengerStore.client.sendGroupMessage(
			this.groupChatHash,
			entries.currentEventsHashes.map(decodeHashFromBase64),
			message,
		);
	}

	async markMessagesAsRead(messagesHashes: EntryHash[]): Promise<void> {
		const entries = await toPromise(this.groupChatEntries);

		return this.messengerStore.client.markGroupMessagesAsRead(
			this.groupChatHash,
			entries.currentEventsHashes.map(decodeHashFromBase64),
			messagesHashes,
		);
	}

	async addMember(newMemberAgents: AgentPubKey[]) {
		const entries = await toPromise(this.groupChatEntries);
		return this.messengerStore.client.createGroupChatEvent({
			group_chat_hash: this.groupChatHash,
			previous_group_chat_events_hashes:
				entries.currentEventsHashes.map(decodeHashFromBase64),
			event: {
				type: 'AddMember',
				member_agents: newMemberAgents,
			},
		});
	}

	async promoteMemberToAdmin(memberAgents: AgentPubKey[]) {
		const entries = await toPromise(this.groupChatEntries);
		return this.messengerStore.client.createGroupChatEvent({
			group_chat_hash: this.groupChatHash,
			previous_group_chat_events_hashes:
				entries.currentEventsHashes.map(decodeHashFromBase64),
			event: {
				type: 'PromoteMemberToAdmin',
				member_agents: memberAgents,
			},
		});
	}

	async demoteMemberFromAdmin(memberAgents: AgentPubKey[]) {
		const entries = await toPromise(this.groupChatEntries);
		return this.messengerStore.client.createGroupChatEvent({
			group_chat_hash: this.groupChatHash,
			previous_group_chat_events_hashes:
				entries.currentEventsHashes.map(decodeHashFromBase64),
			event: {
				type: 'DemoteMemberFromAdmin',
				member_agents: memberAgents,
			},
		});
	}

	async removeMember(memberAgents: AgentPubKey[]) {
		const entries = await toPromise(this.groupChatEntries);
		return this.messengerStore.client.createGroupChatEvent({
			group_chat_hash: this.groupChatHash,
			previous_group_chat_events_hashes:
				entries.currentEventsHashes.map(decodeHashFromBase64),
			event: {
				type: 'RemoveMember',
				member_agents: memberAgents,
			},
		});
	}

	async notifyNewAgent(
		newAgent: AgentPubKey,
		proofs: Array<LinkedDevicesProof>,
	) {
		const entries = await toPromise(this.groupChatEntries);
		return this.messengerStore.client.createGroupChatEvent({
			group_chat_hash: this.groupChatHash,
			previous_group_chat_events_hashes:
				entries.currentEventsHashes.map(decodeHashFromBase64),
			event: {
				type: 'NewAgentForMember',
				linked_devices_proofs: proofs,
				new_agent: newAgent,
			},
		});
	}

	async updateGroupChatInfo(groupInfo: GroupInfo): Promise<EntryHash> {
		const entries = await toPromise(this.groupChatEntries);
		return this.messengerStore.client.createGroupChatEvent({
			group_chat_hash: this.groupChatHash,
			previous_group_chat_events_hashes:
				entries.currentEventsHashes.map(decodeHashFromBase64),
			event: {
				type: 'UpdateGroupInfo',
				...groupInfo,
			},
		});
	}

	async updateGroupChatSettings(
		groupSettings: GroupSettings,
	): Promise<EntryHash> {
		const entries = await toPromise(this.groupChatEntries);
		return this.messengerStore.client.createGroupChatEvent({
			group_chat_hash: this.groupChatHash,
			previous_group_chat_events_hashes:
				entries.currentEventsHashes.map(decodeHashFromBase64),
			event: {
				type: 'UpdateGroupSettings',
				...groupSettings,
			},
		});
	}

	async leaveGroup(): Promise<EntryHash> {
		const entries = await toPromise(this.groupChatEntries);
		return this.messengerStore.client.createGroupChatEvent({
			group_chat_hash: this.groupChatHash,
			previous_group_chat_events_hashes:
				entries.currentEventsHashes.map(decodeHashFromBase64),
			event: {
				type: 'LeaveGroup',
			},
		});
	}

	async deleteGroupChat(): Promise<EntryHash> {
		const entries = await toPromise(this.groupChatEntries);
		return this.messengerStore.client.createGroupChatEvent({
			group_chat_hash: this.groupChatHash,
			previous_group_chat_events_hashes:
				entries.currentEventsHashes.map(decodeHashFromBase64),
			event: {
				type: 'DeleteGroup',
			},
		});
	}
}

export interface GroupChatSummary {
	groupChatHash: EntryHash;
	lastActivity: SignedEvent<GroupChatEntry>;
	currentGroup: GroupChat;
	myUnreadMessages: Array<EntryHashB64>;
}

function apply(
	groupChat: GroupChat,
	author: AgentPubKey,
	groupEvent: GroupEvent,
): GroupChat {
	switch (groupEvent.type) {
		case 'UpdateGroupInfo':
			groupChat.info = {
				avatar: groupEvent.avatar,
				description: groupEvent.description,
				name: groupEvent.name,
			};
			break;
		case 'UpdateGroupSettings':
			groupChat.settings = {
				only_admins_can_add_members: groupEvent.only_admins_can_add_members,
				sync_message_history_with_new_members:
					groupEvent.sync_message_history_with_new_members,
				only_admins_can_edit_group_info:
					groupEvent.only_admins_can_edit_group_info,
			};
			break;
		case 'AddMember':
			const member0 = groupChat.members.find(m =>
				m.agents.find(a =>
					groupEvent.member_agents.find(
						a2 => encodeHashToBase64(a) === encodeHashToBase64(a2),
					),
				),
			);
			if (member0) {
				member0.agents = uniquify([
					...member0.agents,
					...groupEvent.member_agents,
				]);
				member0.removed = false;
			} else {
				groupChat.members.push({
					admin: false,
					agents: groupEvent.member_agents,
					profile: undefined,
					removed: false,
				});
			}
			break;
		case 'RemoveMember':
			const member = groupChat.members.find(m =>
				m.agents.find(a =>
					groupEvent.member_agents.find(
						a2 => encodeHashToBase64(a) === encodeHashToBase64(a2),
					),
				),
			);
			if (!member) throw new Error('Member not found');
			member!.removed = true;
			break;
		case 'NewAgentForMember':
			const member2 = groupChat.members.find(m =>
				m.agents.find(
					a => encodeHashToBase64(a) === encodeHashToBase64(author),
				),
			);
			if (!member2) throw new Error('Member not found');
			member2!.agents.push(groupEvent.new_agent);
			break;
		case 'PromoteMemberToAdmin':
			const member3 = groupChat.members.find(m =>
				m.agents.find(a =>
					groupEvent.member_agents.find(
						a2 => encodeHashToBase64(a) === encodeHashToBase64(a2),
					),
				),
			);
			if (!member3) throw new Error('Member not found');
			member3!.admin = true;
			break;
		case 'DemoteMemberFromAdmin':
			const member4 = groupChat.members.find(m =>
				m.agents.find(a =>
					groupEvent.member_agents.find(
						a2 => encodeHashToBase64(a) === encodeHashToBase64(a2),
					),
				),
			);
			if (!member4) throw new Error('Member not found');
			member4!.admin = false;
			break;
		case 'LeaveGroup':
			const member5 = groupChat.members.find(m =>
				m.agents.find(
					a => encodeHashToBase64(a) === encodeHashToBase64(author),
				),
			);
			if (!member5) throw new Error('Member not found');
			member5!.removed = true;
			break;
		case 'DeleteGroup':
			groupChat.deleted = true;
			break;
	}
	return groupChat;
}

function mergeSettings(
	settings1: GroupSettings,
	settings2: GroupSettings,
): GroupSettings {
	return {
		only_admins_can_edit_group_info:
			settings1.only_admins_can_edit_group_info ||
			settings2.only_admins_can_edit_group_info,
		only_admins_can_add_members:
			settings1.only_admins_can_add_members ||
			settings2.only_admins_can_add_members,
		sync_message_history_with_new_members:
			settings1.sync_message_history_with_new_members &&
			settings2.sync_message_history_with_new_members,
	};
}

function mergeInfo(info1: GroupInfo, info2: GroupInfo): GroupInfo {
	return {
		name: mergeStrings(info1.name, info2.name),
		description: mergeStrings(info1.description, info2.description),
		avatar: mergeMaybeStrings(info1.avatar, info2.avatar),
	};
}

function merge(groupChat1: GroupChat, groupChat2: GroupChat): GroupChat {
	const settings: GroupSettings = mergeSettings(
		groupChat1.settings,
		groupChat2.settings,
	);
	const info = mergeInfo(groupChat1.info, groupChat2.info);

	const members = groupChat1.members;

	for (const group2member of groupChat2.members) {
		const existingGroup1Member = members.find(
			m =>
				!!m.agents.find(
					a =>
						!!group2member.agents.find(
							a2 => encodeHashToBase64(a) === encodeHashToBase64(a2),
						),
				),
		);
		if (existingGroup1Member) {
			existingGroup1Member.agents = uniquify([
				...existingGroup1Member.agents,
				...group2member.agents,
			]);
			existingGroup1Member.removed =
				group2member.removed || existingGroup1Member.removed;
			existingGroup1Member.admin =
				group2member.admin && existingGroup1Member.admin;
		} else {
			members.push(group2member);
		}
	}

	return {
		settings,
		info,
		members,
		deleted: groupChat1.deleted || groupChat2.deleted,
	};
}

function initialGroupChat(createGroupChat: CreateGroupChat): GroupChat {
	return {
		deleted: false,
		info: createGroupChat.info,
		members: [
			{
				admin: true,
				agents: createGroupChat.me.agents,
				profile: createGroupChat.me.profile,
				removed: false,
			},
			...createGroupChat.others.map(m => ({
				admin: false,
				agents: m.agents,
				profile: m.profile,
				removed: false,
			})),
		],
		settings: createGroupChat.settings,
	};
}
