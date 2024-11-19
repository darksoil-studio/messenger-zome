import { LinkedDevicesStore } from '@darksoil-studio/linked-devices-zome';
import {
	ActionHash,
	AgentPubKey,
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
	latestVersionOfEntrySignal,
	liveLinksSignal,
	pipe,
} from '@tnesh-stack/signals';
import {
	EntryRecord,
	HashType,
	MemoHoloHashMap,
	retype,
	slice,
} from '@tnesh-stack/utils';

import { MessengerClient } from './messenger-client.js';
import {
	DeleteGroupChat,
	Group,
	GroupMessage,
	PeerMessage,
	PrivateMessengerEntry,
	Signed,
	UpdateGroupChat,
} from './types.js';
import { asyncReadable } from './utils.js';

interface InternalEntries {
	privateMessengerEntries: Record<EntryHashB64, PrivateMessengerEntry>;
	peerMessages: Array<EntryHashB64>;
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
	) {}

	private privateMessengerEntries = asyncReadable<InternalEntries>(
		async set => {
			const privateMessengerEntries =
				await this.client.queryPrivateMessengerEntries();

			const value: InternalEntries = {
				privateMessengerEntries,
				peerMessages: [],
				groups: {},
			};

			for (const [entryHash, privateMessengerEntry] of Object.entries(
				privateMessengerEntries,
			)) {
				switch (privateMessengerEntry.signed_content.content.type) {
					case 'PeerMessage':
						value.peerMessages.push(entryHash);
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

			set(value);

			this.client.onSignal(signal => {
				if (
					signal.type !== 'EntryCreated' ||
					signal.app_entry.type !== 'PrivateMessengerEntry'
				)
					return;

				const privateMessageEntryType =
					signal.app_entry.signed_content.content.type;
				const entryHash = encodeHashToBase64(
					signal.action.hashed.content.entry_hash,
				);

				value.privateMessengerEntries[entryHash] = signal.app_entry;

				switch (privateMessageEntryType) {
					case 'PeerMessage':
						value.peerMessages.push(entryHash);
						break;
					case 'GroupMessage':
						let groupHash = encodeHashToBase64(
							signal.app_entry.signed_content.content.original_group_hash,
						);
						if (!value.groups[groupHash]) {
							value.groups[groupHash] = {
								updates: [],
								deletes: [],
								messages: [],
							};
						}
						value.groups[groupHash].messages.push(entryHash);
						break;
					case 'DeleteGroupChat':
						groupHash = encodeHashToBase64(
							signal.app_entry.signed_content.content.original_group_hash,
						);
						if (!value.groups[groupHash]) {
							value.groups[groupHash] = {
								updates: [],
								deletes: [],
								messages: [],
							};
						}
						value.groups[groupHash].deletes.push(entryHash);
						break;
					case 'UpdateGroupChat':
						groupHash = encodeHashToBase64(
							signal.app_entry.signed_content.content.original_group_hash,
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
				}
				set(value);
			});
		},
	);

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
				const messages = this.privateMessengerEntries.get();
				const theirAgents = this.allAgentsFor.get(agent).get();
				if (messages.status !== 'completed') return messages;
				if (theirAgents.status !== 'completed') return theirAgents;

				const agentMessages: Record<EntryHashB64, Signed<PeerMessage>> = {};
				const theirAgentsB64 = theirAgents.value.map(encodeHashToBase64);

				for (const messageHash of messages.value.peerMessages) {
					const message = messages.value.privateMessengerEntries[
						messageHash
					] as Signed<PeerMessage>;
					const messageFromThem = theirAgentsB64.includes(
						encodeHashToBase64(message.provenance),
					);
					const messageForThem = theirAgentsB64.includes(
						encodeHashToBase64(message.signed_content.content.recipient),
					);

					if (messageForThem || messageFromThem) {
						agentMessages[messageHash] = message;
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
				const privateMessengerEntries = this.privateMessengerEntries.get();
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

	allChats = new AsyncComputed(() => {
		const privateMessengerEntries = this.privateMessengerEntries.get();
		if (privateMessengerEntries.status !== 'completed')
			return privateMessengerEntries;

		const chats: Array<Chat> = [];

		for (const [groupHash, group] of Object.entries(
			privateMessengerEntries.value.groups,
		)) {
			const group = privateMessengerEntries.value.privateMessengerEntries[
				groupHash
			] as Signed<Group>;

			chats.push({
				type: 'GroupChat',
				lastActivity: Date.now(), // TODO CHANGE THIIIS
				group: group.signed_content.content,
				groupHash: decodeHashFromBase64(groupHash),
			});
		}

		return {
			status: 'completed',
			value: chats,
		};
	});
}

export type Chat =
	| {
			type: 'PeerChat';
			lastActivity: Timestamp;
	  }
	| {
			type: 'GroupChat';
			lastActivity: Timestamp;
			groupHash: EntryHash;
			group: Group;
	  };
