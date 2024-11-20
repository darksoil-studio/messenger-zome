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
	Signed,
	UpdateGroupChat,
} from './types.js';
import { asyncReadable } from './utils.js';

interface InternalEntries {
	privateMessengerEntries: Record<EntryHashB64, PrivateMessengerEntry>;
	peerMessages: Record<AgentPubKeyB64, Array<EntryHashB64>>;
	groups: Record<
		EntryHashB64,
		{
			updates: Array<EntryHashB64>;
			deletes: Array<EntryHashB64>;
			messages: Array<EntryHashB64>;
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
				const linkedDevice = signal.action.hashed.content.target_address;

				this.client.synchronizeWithLinkedDevice(linkedDevice);
			});
		}
	}

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
		const allMyAgents = this.allMyAgents.get();
		if (allMyAgents.status !== 'completed') return allMyAgents;

		const allMyAgentsB64 = allMyAgents.value.map(encodeHashToBase64);

		const privateMessengerEntries = privateMessengerEntriesResult.value;

		const value: InternalEntries = {
			privateMessengerEntries,
			peerMessages: {},
			groups: {},
		};

		for (const [entryHash, privateMessengerEntry] of Object.entries(
			privateMessengerEntries,
		)) {
			switch (privateMessengerEntry.signed_content.content.type) {
				case 'PeerMessage':
					const peerMessage = privateMessengerEntry as Signed<PeerMessage>;
					const peer = !allMyAgentsB64.includes(
						encodeHashToBase64(peerMessage.provenance),
					)
						? peerMessage.provenance
						: peerMessage.signed_content.content.recipient;
					const peerB64 = encodeHashToBase64(peer);
					if (!value.peerMessages[peerB64]) {
						value.peerMessages[peerB64] = [];
					}

					value.peerMessages[peerB64].push(entryHash);
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
						};
					}
					value.groups[groupHash3].messages.push(entryHash);
					break;
				case 'CreateGroupChat':
					if (!value.groups[entryHash]) {
						value.groups[entryHash] = {
							updates: [],
							deletes: [],
							messages: [],
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

	private allAgentsFor = new MemoHoloHashMap((agent: AgentPubKey) => {
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

	allMyAgents = this.allAgentsFor.get(this.client.client.myPubKey);

	peerChats = new MemoHoloHashMap(
		(agent: AgentPubKey) =>
			new AsyncComputed(() => {
				const messages = this.internalEntries.get();
				const theirAgents = this.allAgentsFor.get(agent).get();
				if (messages.status !== 'completed') return messages;
				if (theirAgents.status !== 'completed') return theirAgents;

				const agentMessages: Record<EntryHashB64, Signed<PeerMessage>> = {};
				const theirAgentsB64 = theirAgents.value.map(encodeHashToBase64);

				for (const agent of theirAgentsB64) {
					const messagesFromThisAgent = messages.value.peerMessages[agent];
					if (messagesFromThisAgent) {
						for (const messageHash of messagesFromThisAgent) {
							const message = messages.value.privateMessengerEntries[
								messageHash
							] as Signed<PeerMessage>;
							agentMessages[messageHash] = message;
						}
					}
				}

				return {
					status: 'completed',
					value: agentMessages,
				};
			}),
	);

	groupChats = new MemoHoloHashMap(
		(groupHash: EntryHash) =>
			new AsyncComputed(() => {
				const privateMessengerEntries = this.internalEntries.get();
				if (privateMessengerEntries.status !== 'completed')
					return privateMessengerEntries;
				const entryHashB64 = encodeHashToBase64(groupHash);
				const group = privateMessengerEntries.value.groups[entryHashB64];

				if (!group) {
					return {
						status: 'completed',
						value: undefined,
					};
				}
				const messages: Record<EntryHashB64, Signed<GroupMessage>> = {};
				const updates: Record<EntryHashB64, Signed<UpdateGroupChat>> = {};
				const deletes: Record<EntryHashB64, Signed<DeleteGroupChat>> = {};

				for (const messageHash of group.messages) {
					messages[messageHash] = privateMessengerEntries.value
						.privateMessengerEntries[messageHash] as Signed<GroupMessage>;
				}
				for (const deleteHash of group.deletes) {
					deletes[deleteHash] = privateMessengerEntries.value
						.privateMessengerEntries[deleteHash] as Signed<DeleteGroupChat>;
				}
				for (const updateHash of group.updates) {
					updates[updateHash] = privateMessengerEntries.value
						.privateMessengerEntries[updateHash] as Signed<UpdateGroupChat>;
				}

				return {
					status: 'completed',
					value: {
						group: privateMessengerEntries.value.privateMessengerEntries[
							entryHashB64
						] as Signed<Group>,
						messages,
						updates,
						deletes,
					},
				};
			}),
	);

	allPeerChats = new AsyncComputed<Array<PeerChat>>(() => {
		const privateMessengerEntries = this.internalEntries.get();
		if (privateMessengerEntries.status !== 'completed')
			return privateMessengerEntries;

		let allPeerAgents: AgentPubKey[] = Object.keys(
			privateMessengerEntries.value.peerMessages,
		).map(decodeHashFromBase64);

		const linkedDevicesForAllPeerAgents = joinAsyncMap(
			mapValues(slice(this.allAgentsFor, allPeerAgents), s => s.get()),
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

			for (const agent of agentSet) {
				const messagesForAgent =
					privateMessengerEntries.value.peerMessages[agent];
				if (messagesForAgent) {
					for (const messageHash of messagesForAgent) {
						const message = privateMessengerEntries.value
							.privateMessengerEntries[messageHash] as Signed<PeerMessage>;

						if (
							!lastActivity ||
							lastActivity.signed_content.timestamp <
								message.signed_content.timestamp
						) {
							lastActivity = message;
						}
					}
				}
			}

			if (lastActivity) {
				peerChats.push({
					agents: agentSet.map(decodeHashFromBase64),
					lastActivity,
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
	agents: AgentPubKey[];
	lastActivity: Signed<PeerMessage>;
}

export interface GroupChat {
	lastActivity: GroupMessengerEntry;
	groupHash: EntryHash;
	currentGroup: Group;
}

export type Chat =
	| ({
			type: 'PeerChat';
	  } & PeerChat)
	| ({
			type: 'GroupChat';
	  } & GroupChat);
