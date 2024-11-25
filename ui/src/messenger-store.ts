import { LinkedDevicesStore } from '@darksoil-studio/linked-devices-zome';
import {
	ActionHash,
	AgentPubKey,
	AgentPubKeyB64,
	EntryHash,
	EntryHashB64,
	NewEntryAction,
	Timestamp,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import {
	AsyncComputed,
	AsyncResult,
	AsyncState,
	Signal,
	allRevisionsOfEntrySignal,
	collectionSignal,
	deletedLinksSignal,
	deletesForEntrySignal,
	immutableEntrySignal,
	joinAsyncMap,
	latestVersionOfEntrySignal,
	liveLinksSignal,
	pipe,
	uniquify,
} from '@tnesh-stack/signals';
import {
	EntryRecord,
	HashType,
	HoloHashMap,
	MemoHoloHashMap,
	mapValues,
	retype,
	slice,
} from '@tnesh-stack/utils';

import { MessengerClient } from './messenger-client.js';
import {
	DeleteGroupChat,
	Group,
	GroupMessage,
	GroupMessengerEntry,
	PeerMessage,
	PrivateMessengerEntry,
	ReadGroupMessages,
	ReadPeerMessages,
	Signed,
	UpdateGroupChat,
} from './types.js';
import { TYPING_INDICATOR_TTL_MS, asyncReadable } from './utils.js';

interface InternalEntries {
	privateMessengerEntries: Record<EntryHashB64, PrivateMessengerEntry>;
	peerChats: Record<
		AgentPubKeyB64,
		{
			messages: Array<EntryHashB64>;
			myReadMessages: Array<EntryHashB64>;
			theirReadMessages: Array<EntryHashB64>;
		}
	>;
	groups: Record<
		EntryHashB64,
		{
			updates: Array<EntryHashB64>;
			deletes: Array<EntryHashB64>;
			messages: Array<EntryHashB64>;
			myReadMessages: Array<EntryHashB64>;
			theirReadMessages: Record<AgentPubKeyB64, EntryHashB64[]>;
		}
	>;
}

export class MessengerStore {
	constructor(
		public client: MessengerClient,
		public linkedDevicesStore?: LinkedDevicesStore,
	) {
		if (this.linkedDevicesStore) {
			this.linkedDevicesStore.client.onSignal(signal => {
				if (
					signal.type !== 'LinkCreated' ||
					signal.link_type !== 'AgentToLinkedDevices'
				)
					return;
				const linkedDevice = retype(
					signal.action.hashed.content.target_address,
					HashType.AGENT,
				);

				// Wait for the whole processing to finish
				setTimeout(() => {
					this.client.synchronizeWithLinkedDevice(linkedDevice);
				}, 1000);
			});
		}
	}

	private peerIsTyping = new MemoHoloHashMap((agent: AgentPubKey) => {
		const peerIsTyping = new Signal.State<boolean>(false);
		let timeout: any;
		this.client.onSignal(signal => {
			if (signal.type === 'PeerChatTypingIndicator') {
				if (encodeHashToBase64(signal.peer) === encodeHashToBase64(agent)) {
					peerIsTyping.set(true);
					if (timeout) clearTimeout(timeout);
					timeout = setTimeout(() => {
						peerIsTyping.set(false);
					}, TYPING_INDICATOR_TTL_MS);
				}
			} else if (
				signal.type === 'EntryCreated' &&
				signal.app_entry.type === 'PrivateMessengerEntry' &&
				signal.app_entry.signed_content.content.type === 'PeerMessage'
			) {
				if (
					encodeHashToBase64(signal.app_entry.provenance) ===
					encodeHashToBase64(agent)
				) {
					peerIsTyping.set(false);
					if (timeout) clearTimeout(timeout);
				}
			}
		});

		return peerIsTyping;
	});

	private peerIsTypingInGroup = new MemoHoloHashMap(
		(groupHash: EntryHash) =>
			new MemoHoloHashMap((agent: AgentPubKey) => {
				const peerIsTyping = new Signal.State<boolean>(false);
				let timeout: any;
				this.client.onSignal(signal => {
					if (signal.type === 'GroupChatTypingIndicator') {
						if (
							encodeHashToBase64(signal.peer) === encodeHashToBase64(agent) &&
							encodeHashToBase64(signal.group_hash) ===
								encodeHashToBase64(groupHash)
						) {
							peerIsTyping.set(true);
							if (timeout) clearTimeout(timeout);
							timeout = setTimeout(() => {
								peerIsTyping.set(false);
							}, TYPING_INDICATOR_TTL_MS);
						}
					} else if (
						signal.type === 'EntryCreated' &&
						signal.app_entry.type === 'PrivateMessengerEntry' &&
						signal.app_entry.signed_content.content.type === 'GroupMessage'
					) {
						if (
							encodeHashToBase64(signal.app_entry.provenance) ===
								encodeHashToBase64(agent) &&
							encodeHashToBase64(
								signal.app_entry.signed_content.content.original_group_hash,
							) === encodeHashToBase64(groupHash)
						) {
							peerIsTyping.set(false);
							if (timeout) clearTimeout(timeout);
						}
					}
				});

				return peerIsTyping;
			}),
	);

	private privateMessengerEntries = asyncReadable<
		Record<EntryHashB64, PrivateMessengerEntry>
	>(async set => {
		const privateMessengerEntries =
			await this.client.queryPrivateMessengerEntries();
		set(privateMessengerEntries);

		this.client.onSignal(signal => {
			if (
				signal.type !== 'EntryCreated' ||
				signal.app_entry.type !== 'PrivateMessengerEntry'
			)
				return;

			const entryHash = encodeHashToBase64(
				signal.action.hashed.content.entry_hash,
			);

			privateMessengerEntries[entryHash] = signal.app_entry;
			set(privateMessengerEntries);
		});
	});

	private internalEntries = new AsyncComputed<InternalEntries>(() => {
		const privateMessengerEntriesResult = this.privateMessengerEntries.get();
		if (privateMessengerEntriesResult.status !== 'completed')
			return privateMessengerEntriesResult;
		const allMyDevices = this.allMyDevices.get();
		if (allMyDevices.status !== 'completed') return allMyDevices;

		const allMyDevicesB64 = allMyDevices.value.map(encodeHashToBase64);

		const privateMessengerEntries = privateMessengerEntriesResult.value;

		const value: InternalEntries = {
			privateMessengerEntries,
			peerChats: {},
			groups: {},
		};

		for (const [entryHash, privateMessengerEntry] of Object.entries(
			privateMessengerEntries,
		)) {
			switch (privateMessengerEntry.signed_content.content.type) {
				case 'PeerMessage':
					const peerMessage = privateMessengerEntry as Signed<PeerMessage>;
					const peer = !allMyDevicesB64.includes(
						encodeHashToBase64(peerMessage.provenance),
					)
						? peerMessage.provenance
						: peerMessage.signed_content.content.recipient;
					const peerB64 = encodeHashToBase64(peer);
					if (!value.peerChats[peerB64]) {
						value.peerChats[peerB64] = {
							messages: [],
							myReadMessages: [],
							theirReadMessages: [],
						};
					}

					value.peerChats[peerB64].messages.push(entryHash);
					break;
				case 'ReadPeerMessages':
					const readPeerMessages =
						privateMessengerEntry as Signed<ReadPeerMessages>;
					const fromMe = allMyDevicesB64.includes(
						encodeHashToBase64(readPeerMessages.provenance),
					);
					const peer2 = fromMe
						? readPeerMessages.signed_content.content.peer
						: readPeerMessages.provenance;
					const peerB642 = encodeHashToBase64(peer2);
					if (!value.peerChats[peerB642]) {
						value.peerChats[peerB642] = {
							messages: [],
							myReadMessages: [],
							theirReadMessages: [],
						};
					}

					if (fromMe) {
						for (const readMessage of readPeerMessages.signed_content.content
							.read_messages_hashes) {
							value.peerChats[peerB642].myReadMessages.push(
								encodeHashToBase64(readMessage),
							);
						}
					} else {
						for (const readMessage of readPeerMessages.signed_content.content
							.read_messages_hashes) {
							value.peerChats[peerB642].theirReadMessages.push(
								encodeHashToBase64(readMessage),
							);
						}
					}
					break;
				case 'UpdateGroupChat':
					const update = privateMessengerEntry as Signed<UpdateGroupChat>;
					const groupHash = encodeHashToBase64(
						update.signed_content.content.original_group_hash,
					);
					if (!value.groups[groupHash]) {
						value.groups[groupHash] = {
							updates: [],
							deletes: [],
							messages: [],
							myReadMessages: [],
							theirReadMessages: {},
						};
					}
					value.groups[groupHash].updates.push(entryHash);
					break;
				case 'DeleteGroupChat':
					const deleteChat = privateMessengerEntry as Signed<DeleteGroupChat>;
					const groupHash2 = encodeHashToBase64(
						deleteChat.signed_content.content.original_group_hash,
					);
					if (!value.groups[groupHash2]) {
						value.groups[groupHash2] = {
							updates: [],
							deletes: [],
							messages: [],
							myReadMessages: [],
							theirReadMessages: {},
						};
					}
					value.groups[groupHash2].deletes.push(entryHash);
					break;
				case 'GroupMessage':
					const groupMessage = privateMessengerEntry as Signed<GroupMessage>;
					const groupHash3 = encodeHashToBase64(
						groupMessage.signed_content.content.original_group_hash,
					);
					if (!value.groups[groupHash3]) {
						value.groups[groupHash3] = {
							updates: [],
							deletes: [],
							messages: [],
							myReadMessages: [],
							theirReadMessages: {},
						};
					}
					value.groups[groupHash3].messages.push(entryHash);
					break;
				case 'ReadGroupMessages':
					const readGroupMessages =
						privateMessengerEntry as Signed<ReadGroupMessages>;
					const author = encodeHashToBase64(readGroupMessages.provenance);
					const fromMe2 = allMyDevicesB64.includes(author);
					const groupHash4 = encodeHashToBase64(
						readGroupMessages.signed_content.content.original_group_hash,
					);
					if (!value.groups[groupHash4]) {
						value.groups[groupHash4] = {
							updates: [],
							deletes: [],
							messages: [],
							myReadMessages: [],
							theirReadMessages: {},
						};
					}

					if (fromMe2) {
						for (const readMessage of readGroupMessages.signed_content.content
							.read_messages_hashes) {
							value.groups[groupHash4].myReadMessages.push(
								encodeHashToBase64(readMessage),
							);
						}
					} else {
						for (const readMessage of readGroupMessages.signed_content.content
							.read_messages_hashes) {
							if (!value.groups[groupHash4].theirReadMessages[author]) {
								value.groups[groupHash4].theirReadMessages[author] = [];
							}
							value.groups[groupHash4].theirReadMessages[author].push(
								encodeHashToBase64(readMessage),
							);
						}
					}
					break;
				case 'CreateGroupChat':
					if (!value.groups[entryHash]) {
						value.groups[entryHash] = {
							updates: [],
							deletes: [],
							messages: [],
							myReadMessages: [],
							theirReadMessages: {},
						};
					}
					break;
			}
		}

		return {
			status: 'completed',
			value,
		};
	});

	private allDevicesFor = new MemoHoloHashMap((agent: AgentPubKey) => {
		if (this.linkedDevicesStore) {
			return new AsyncComputed(() => {
				const devices =
					this.linkedDevicesStore!.linkedDevicesForAgent.get(agent).get();
				if (devices.status !== 'completed') return devices;

				return {
					status: 'completed',
					value: [agent, ...devices.value],
				};
			});
		} else {
			return new AsyncState({ status: 'completed', value: [agent] });
		}
	});

	allMyDevices = new AsyncComputed(() => {
		if (!this.linkedDevicesStore)
			return {
				status: 'completed',
				value: [this.client.client.myPubKey],
			};

		return this.linkedDevicesStore.myLinkedDevices.get();
	});

	peerChats = new MemoHoloHashMap(
		(agent: AgentPubKey) =>
			new AsyncComputed(() => {
				const messages = this.internalEntries.get();
				const myAgents = this.allMyDevices.get();
				const theirAgents = this.allDevicesFor.get(agent).get();
				if (messages.status !== 'completed') return messages;
				if (theirAgents.status !== 'completed') return theirAgents;
				if (myAgents.status !== 'completed') return myAgents;

				const agentMessages: Record<EntryHashB64, Signed<PeerMessage>> = {};
				const theirAgentsB64 = theirAgents.value.map(encodeHashToBase64);
				const myReadMessages: Array<EntryHashB64> = [];
				const theirReadMessages: Array<EntryHashB64> = [];

				for (const agent of theirAgentsB64) {
					const peerChatForThisAgent = messages.value.peerChats[agent];
					if (peerChatForThisAgent) {
						for (const messageHash of peerChatForThisAgent.messages) {
							const message = messages.value.privateMessengerEntries[
								messageHash
							] as Signed<PeerMessage>;
							agentMessages[messageHash] = message;
						}
						for (const readMessageHash of peerChatForThisAgent.myReadMessages) {
							myReadMessages.push(readMessageHash);
						}
						for (const readMessageHash of peerChatForThisAgent.theirReadMessages) {
							theirReadMessages.push(readMessageHash);
						}
					}
				}

				let peerIsTyping = false;

				for (const theirAgent of theirAgents.value) {
					const thisPeerIsTyping = this.peerIsTyping.get(theirAgent).get();

					if (thisPeerIsTyping) {
						peerIsTyping = true;
					}
				}

				return {
					status: 'completed',
					value: {
						messages: agentMessages,
						myReadMessages,
						theirReadMessages,
						myAgentSet: myAgents.value,
						theirAgentSet: theirAgents.value,
						peerIsTyping,
					},
				};
			}),
	);

	groupChats = new MemoHoloHashMap(
		(groupHash: EntryHash) =>
			new AsyncComputed(() => {
				const privateMessengerEntries = this.internalEntries.get();
				if (privateMessengerEntries.status !== 'completed')
					return privateMessengerEntries;
				const myAgents = this.allMyDevices.get();
				if (myAgents.status !== 'completed') return myAgents;
				const groupHashB64 = encodeHashToBase64(groupHash);
				const group = privateMessengerEntries.value.groups[groupHashB64];

				if (!group) {
					return {
						status: 'completed',
						value: undefined,
					};
				}

				const originalGroup = privateMessengerEntries.value
					.privateMessengerEntries[groupHashB64] as Signed<Group>;
				let currentGroup: Group = originalGroup.signed_content.content;
				let currentGroupTimestamp = originalGroup.signed_content.timestamp;

				const messages: Record<EntryHashB64, Signed<GroupMessage>> = {};
				const updates: Record<EntryHashB64, Signed<UpdateGroupChat>> = {};
				const deletes: Record<EntryHashB64, Signed<DeleteGroupChat>> = {};

				let theirAgents: AgentPubKey[] = [];

				for (const updateHash of group.updates) {
					const update = privateMessengerEntries.value.privateMessengerEntries[
						updateHash
					] as Signed<UpdateGroupChat>;
					updates[updateHash] = update;
					if (currentGroupTimestamp < update.signed_content.timestamp) {
						currentGroupTimestamp = update.signed_content.timestamp;
						currentGroup = update.signed_content.content.group;
					}
					theirAgents.push(update.provenance);
				}

				for (const messageHash of group.messages) {
					const message = privateMessengerEntries.value.privateMessengerEntries[
						messageHash
					] as Signed<GroupMessage>;
					messages[messageHash] = message;
					theirAgents.push(message.provenance);
				}
				for (const deleteHash of group.deletes) {
					const deleteChat = privateMessengerEntries.value
						.privateMessengerEntries[deleteHash] as Signed<DeleteGroupChat>;
					deletes[deleteHash] = deleteChat;
					theirAgents.push(deleteChat.provenance);
				}

				for (const admin of currentGroup.admins) {
					theirAgents.push(admin);
				}
				for (const member of currentGroup.members) {
					theirAgents.push(member);
				}
				theirAgents = uniquify(theirAgents).filter(
					theirAgent =>
						!myAgents.value.find(
							myAgent =>
								encodeHashToBase64(myAgent) === encodeHashToBase64(theirAgent),
						),
				);
				const agentsLinkedDevices = joinAsyncMap(
					mapValues(slice(this.allDevicesFor, theirAgents), s => s.get()),
				);
				if (agentsLinkedDevices.status !== 'completed')
					return agentsLinkedDevices;

				const theirAgentSets: Array<Array<AgentPubKey>> = [];

				for (const agents of Array.from(agentsLinkedDevices.value.values())) {
					const currentAgentSet = theirAgentSets.findIndex(agentSet =>
						agentSet.find(agent =>
							agents.find(
								a => encodeHashToBase64(a) === encodeHashToBase64(agent),
							),
						),
					);

					if (currentAgentSet === -1) {
						theirAgentSets.push(agents);
					} else {
						theirAgentSets[currentAgentSet] = uniquify([
							...theirAgentSets[currentAgentSet],
							...agents,
						]);
					}
				}

				const typingPeers: Array<AgentPubKey> = [];

				for (const agentSet of theirAgentSets) {
					for (const agent of agentSet) {
						const isTyping = this.peerIsTypingInGroup
							.get(groupHash)
							.get(agent)
							.get();
						if (isTyping) typingPeers.push(agent);
					}
				}

				return {
					status: 'completed',
					value: {
						originalGroup,
						currentGroup,
						messages,
						updates,
						deletes,
						myAgentSet: myAgents.value,
						theirAgentSets,
						typingPeers,
						myReadMessages: group.myReadMessages,
					},
				};
			}),
	);

	allPeerChats = new AsyncComputed<Array<PeerChat>>(() => {
		const privateMessengerEntries = this.internalEntries.get();
		if (privateMessengerEntries.status !== 'completed')
			return privateMessengerEntries;
		const myAgents = this.allMyDevices.get();
		if (myAgents.status !== 'completed') return myAgents;

		let allPeerAgents: AgentPubKey[] = Object.keys(
			privateMessengerEntries.value.peerChats,
		).map(decodeHashFromBase64);

		const linkedDevicesForAllPeerAgents = joinAsyncMap(
			mapValues(slice(this.allDevicesFor, allPeerAgents), s => s.get()),
		);
		if (linkedDevicesForAllPeerAgents.status !== 'completed')
			return linkedDevicesForAllPeerAgents;

		const agentSets: Array<Array<AgentPubKeyB64>> = [];

		for (const [agent, agents] of Array.from(
			linkedDevicesForAllPeerAgents.value.entries(),
		)) {
			const agentSetForAgentIndex = agentSets.findIndex(
				a => !!agents.find(a2 => a.includes(encodeHashToBase64(a2))),
			);

			if (agentSetForAgentIndex === -1) {
				agentSets.push(agents.map(encodeHashToBase64));
			} else {
				agentSets[agentSetForAgentIndex] = Array.from(
					new Set([
						...agentSets[agentSetForAgentIndex],
						...agents.map(encodeHashToBase64),
					]),
				);
			}
		}

		const peerChats: Array<PeerChat> = [];

		for (const agentSet of agentSets) {
			let lastActivity: Signed<PeerMessage> | undefined;
			const myReadMessages: Record<EntryHashB64, 'read' | 'unread'> = {};

			for (const agent of agentSet) {
				const peerChatForAgent = privateMessengerEntries.value.peerChats[agent];
				if (peerChatForAgent) {
					for (const messageHash of peerChatForAgent.messages) {
						const message = privateMessengerEntries.value
							.privateMessengerEntries[messageHash] as Signed<PeerMessage>;

						if (
							!lastActivity ||
							lastActivity.signed_content.timestamp <
								message.signed_content.timestamp
						) {
							lastActivity = message;
						}
						const fromMe = myAgents.value.find(
							myAgent =>
								encodeHashToBase64(myAgent) ===
								encodeHashToBase64(message.provenance),
						);
						if (!fromMe && !myReadMessages[messageHash]) {
							myReadMessages[messageHash] = 'unread';
						}
					}
					for (const readMessageHash of peerChatForAgent.myReadMessages) {
						myReadMessages[readMessageHash] = 'read';
					}
				}
			}

			const myUnreadMessages = Object.entries(myReadMessages)
				.filter(([_, read]) => read === 'unread')
				.map(([hash, _]) => decodeHashFromBase64(hash));

			if (lastActivity) {
				peerChats.push({
					theirAgentSet: agentSet.map(decodeHashFromBase64),
					lastActivity,
					myUnreadMessages,
				});
			}
		}

		return {
			status: 'completed',
			value: peerChats,
		};
	});

	allGroupChats = new AsyncComputed<Array<GroupChat>>(() => {
		const privateMessengerEntries = this.internalEntries.get();
		if (privateMessengerEntries.status !== 'completed')
			return privateMessengerEntries;
		const myAgents = this.allMyDevices.get();
		if (myAgents.status !== 'completed') return myAgents;
		const myAgentsB64 = myAgents.value.map(encodeHashToBase64);

		const chats: Array<GroupChat> = [];

		for (const [groupHash, group] of Object.entries(
			privateMessengerEntries.value.groups,
		)) {
			const createGroup = privateMessengerEntries.value.privateMessengerEntries[
				groupHash
			] as Signed<{ type: 'CreateGroupChat' } & Group>;

			let lastActivity: GroupMessengerEntry = createGroup;
			let lastGroupVersion: [Timestamp, Group] = [
				createGroup.signed_content.timestamp,
				createGroup.signed_content.content,
			];

			const myUnreadMessages: EntryHash[] = [];

			for (const messageHash of group.messages) {
				const message =
					privateMessengerEntries.value.privateMessengerEntries[messageHash];

				if (
					lastActivity.signed_content.timestamp <
					message.signed_content.timestamp
				) {
					lastActivity = message as Signed<
						{ type: 'GroupMessage' } & GroupMessage
					>;
				}

				if (
					!myAgentsB64.includes(encodeHashToBase64(message.provenance)) &&
					!group.myReadMessages.includes(messageHash)
				) {
					myUnreadMessages.push(decodeHashFromBase64(messageHash));
				}
			}

			for (const updateHash of group.updates) {
				const update = privateMessengerEntries.value.privateMessengerEntries[
					updateHash
				] as Signed<{ type: 'UpdateGroupChat' } & UpdateGroupChat>;

				if (
					lastActivity.signed_content.timestamp <
					update.signed_content.timestamp
				) {
					lastActivity = update;
				}
				if (lastGroupVersion[0] < update.signed_content.timestamp) {
					lastGroupVersion = [
						update.signed_content.timestamp,
						update.signed_content.content.group,
					];
				}
			}

			for (const deleteHash of group.deletes) {
				const deleteGroup = privateMessengerEntries.value
					.privateMessengerEntries[deleteHash] as Signed<
					{ type: 'DeleteGroupChat' } & DeleteGroupChat
				>;

				lastActivity = deleteGroup;
			}

			chats.push({
				lastActivity,
				currentGroup: lastGroupVersion[1],
				groupHash: decodeHashFromBase64(groupHash),
				myUnreadMessages,
			});
		}

		return {
			status: 'completed',
			value: chats,
		};
	});

	allChats = new AsyncComputed<Array<Chat>>(() => {
		const allGroupChats = this.allGroupChats.get();
		const allPeerChats = this.allPeerChats.get();
		if (allGroupChats.status !== 'completed') return allGroupChats;
		if (allPeerChats.status !== 'completed') return allPeerChats;

		const groupChats = allGroupChats.value.map(g => ({
			type: 'GroupChat' as const,
			...g,
		}));
		const peerChats = allPeerChats.value.map(p => ({
			type: 'PeerChat' as const,
			...p,
		}));

		const chats = [...groupChats, ...peerChats].sort(
			(c1, c2) =>
				c2.lastActivity.signed_content.timestamp -
				c1.lastActivity.signed_content.timestamp,
		);

		return {
			status: 'completed',
			value: chats,
		};
	});
}

export interface PeerChat {
	theirAgentSet: AgentPubKey[];
	lastActivity: Signed<PeerMessage>;
	myUnreadMessages: Array<EntryHash>;
}

export interface GroupChat {
	lastActivity: GroupMessengerEntry;
	groupHash: EntryHash;
	currentGroup: Group;
	myUnreadMessages: Array<EntryHash>;
}

export type Chat =
	| ({
			type: 'PeerChat';
	  } & PeerChat)
	| ({
			type: 'GroupChat';
	  } & GroupChat);
