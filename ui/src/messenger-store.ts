import {
	LinkedDevicesProof,
	LinkedDevicesStore,
} from '@darksoil-studio/linked-devices-zome';
import {
	AgentPubKey,
	EntryHash,
	EntryHashB64,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import { decode } from '@msgpack/msgpack';
import { AsyncComputed, joinAsync, toPromise } from '@tnesh-stack/signals';
import { HashType, MemoHoloHashMap, retype } from '@tnesh-stack/utils';

import { GroupChatStore, GroupChatSummary } from './group-chat-store.js';
import { MessengerClient } from './messenger-client.js';
import { PeerChatStore, PeerChatSummary } from './peer-chat-store.js';
import {
	CreateGroupChat,
	CreatePeerChat,
	GroupChatEvent,
	GroupMessage,
	PeerChatEvent,
	PeerMessage,
	PrivateMessengerEntry,
	ReadGroupMessages,
	ReadPeerMessages,
	SignedEntry,
} from './types.js';
import { asyncReadable } from './utils.js';

export type ChatSummary =
	| ({
			type: 'PeerChat';
	  } & PeerChatSummary)
	| ({
			type: 'GroupChat';
	  } & GroupChatSummary);

export interface MessengerEntries {
	peerChats: Record<
		EntryHashB64,
		{
			createPeerChat: SignedEntry<CreatePeerChat> | undefined;
			events: Record<EntryHashB64, SignedEntry<PeerChatEvent>>;
			messages: Record<EntryHashB64, SignedEntry<PeerMessage>>;
			readMessages: Record<EntryHashB64, SignedEntry<ReadPeerMessages>>;
		}
	>;
	groupChats: Record<
		EntryHashB64,
		{
			createGroupChat: SignedEntry<CreateGroupChat> | undefined;
			events: Record<
				EntryHashB64,
				SignedEntry<{ type: 'GroupChatEvent' } & GroupChatEvent>
			>;
			messages: Record<
				EntryHashB64,
				SignedEntry<{ type: 'GroupMessage' } & GroupMessage>
			>;
			readMessages: Record<EntryHashB64, SignedEntry<ReadGroupMessages>>;
		}
	>;
}

export class MessengerStore {
	constructor(
		public client: MessengerClient,
		public linkedDevicesStore?: LinkedDevicesStore,
	) {
		this.client.commitMyPendingEncryptedMessages();
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
				setTimeout(async () => {
					this.client.synchronizeWithLinkedDevice(linkedDevice);

					// Send to everyone that we have a new peer
					const entries = await toPromise(this.privateMessengerEntries);

					const allPeerChats = Object.keys(entries.peerChats);
					const proofs = decode(
						signal.action.hashed.content.tag,
					) as Array<LinkedDevicesProof>;

					for (const peerChatHash of allPeerChats) {
						const store = this.peerChats.get(
							decodeHashFromBase64(peerChatHash),
						);
						await store.notifyNewPeerAgent(linkedDevice, proofs);
					}

					const allGroupChats = Object.keys(entries.groupChats);

					for (const groupChatHash of allGroupChats) {
						const store = this.groupChats.get(
							decodeHashFromBase64(groupChatHash),
						);
						await store.notifyNewAgent(linkedDevice, proofs);
					}
				}, 1000);
			});
		}
	}

	privateMessengerEntries = asyncReadable<MessengerEntries>(async set => {
		const privateMessengerEntries =
			await this.client.queryPrivateMessengerEntries();

		const messengerEntries: MessengerEntries = {
			groupChats: {},
			peerChats: {},
		};

		const initPeerChat = (peerChatHash: EntryHashB64) => {
			messengerEntries.peerChats[peerChatHash] = {
				createPeerChat: undefined,
				events: {},
				messages: {},
				readMessages: {},
			};
		};
		const initGroupChat = (groupChatHash: EntryHashB64) => {
			messengerEntries.groupChats[groupChatHash] = {
				createGroupChat: undefined,
				events: {},
				messages: {},
				readMessages: {},
			};
		};

		const addEntry = (
			entryHash: EntryHashB64,
			messengerEntry: PrivateMessengerEntry,
		) => {
			switch (messengerEntry.signed_content.content.type) {
				case 'CreatePeerChat':
					initPeerChat(entryHash);
					messengerEntries.peerChats[entryHash].createPeerChat =
						messengerEntry as SignedEntry<CreatePeerChat>;
					break;
				case 'PeerChatEvent':
					const peerChatEvent = messengerEntry as SignedEntry<PeerChatEvent>;
					const peerChatHash1 = encodeHashToBase64(
						peerChatEvent.signed_content.content.peer_chat_hash,
					);
					initPeerChat(peerChatHash1);
					messengerEntries.peerChats[peerChatHash1].events[entryHash] =
						peerChatEvent;
					break;
				case 'ReadPeerMessages':
					const readPeerMessages =
						messengerEntry as SignedEntry<ReadPeerMessages>;
					const peerChatHash2 = encodeHashToBase64(
						readPeerMessages.signed_content.content.peer_chat_hash,
					);
					initPeerChat(peerChatHash2);
					messengerEntries.peerChats[peerChatHash2].readMessages[entryHash] =
						readPeerMessages;
					break;
				case 'PeerMessage':
					const peerMessage = messengerEntry as SignedEntry<PeerMessage>;
					const peerChatHash3 = encodeHashToBase64(
						peerMessage.signed_content.content.peer_chat_hash,
					);
					initPeerChat(peerChatHash3);
					messengerEntries.peerChats[peerChatHash3].messages[entryHash] =
						peerMessage;
					break;
				case 'CreateGroupChat':
					initGroupChat(entryHash);
					messengerEntries.groupChats[entryHash].createGroupChat =
						messengerEntry as SignedEntry<CreateGroupChat>;
					break;
				case 'GroupChatEvent':
					const groupChatEvent = messengerEntry as SignedEntry<
						{
							type: 'GroupChatEvent';
						} & GroupChatEvent
					>;
					const groupChatHash1 = encodeHashToBase64(
						groupChatEvent.signed_content.content.group_chat_hash,
					);
					initGroupChat(groupChatHash1);
					messengerEntries.groupChats[groupChatHash1].events[entryHash] =
						groupChatEvent;
					break;
				case 'ReadGroupMessages':
					const readGroupMessages =
						messengerEntry as SignedEntry<ReadGroupMessages>;
					const groupChatHash2 = encodeHashToBase64(
						readGroupMessages.signed_content.content.group_chat_hash,
					);
					initGroupChat(groupChatHash2);
					messengerEntries.groupChats[groupChatHash2].readMessages[entryHash] =
						readGroupMessages;
					break;
				case 'GroupMessage':
					const groupMessage = messengerEntry as SignedEntry<
						{
							type: 'GroupMessage';
						} & GroupMessage
					>;
					const groupChatHash3 = encodeHashToBase64(
						groupMessage.signed_content.content.group_chat_hash,
					);
					initGroupChat(groupChatHash3);
					messengerEntries.groupChats[groupChatHash3].messages[entryHash] =
						groupMessage;
					break;
				default:
					break;
			}
		};

		const orderedEntries = Object.entries(privateMessengerEntries).sort(
			(e1, e2) =>
				e1[1].signed_content.timestamp - e2[1].signed_content.timestamp,
		);

		for (const [entryHash, messengerEntry] of orderedEntries) {
			addEntry(entryHash, messengerEntry);
		}

		set(messengerEntries);

		this.client.onSignal(signal => {
			if (
				signal.type !== 'EntryCreated' ||
				signal.app_entry.type !== 'PrivateMessengerEntry'
			)
				return;

			const entryHash = encodeHashToBase64(
				signal.action.hashed.content.entry_hash,
			);
			addEntry(entryHash, signal.app_entry);
			set(messengerEntries);
		});
	});

	groupChats = new MemoHoloHashMap(
		(groupChatHash: EntryHash) => new GroupChatStore(this, groupChatHash),
	);

	peerChats = new MemoHoloHashMap(
		(peerChatHash: EntryHash) => new PeerChatStore(this, peerChatHash),
	);

	peerChatsForPeer = new MemoHoloHashMap(
		(agent: AgentPubKey) =>
			new AsyncComputed(() => {
				const entries = this.privateMessengerEntries.get();
				if (entries.status !== 'completed') return entries;

				const allPeerChatsHashes = Object.keys(entries.value.peerChats);
				const allCurrentPeerChats = joinAsync(
					allPeerChatsHashes.map(peerChatHash =>
						this.peerChats
							.get(decodeHashFromBase64(peerChatHash))
							.currentPeerChat.get(),
					),
				);
				if (allCurrentPeerChats.status !== 'completed')
					return allCurrentPeerChats;

				const peerChatsHashesForPeer: EntryHash[] = [];

				for (let i = 0; i < allCurrentPeerChats.value.length; i++) {
					if (
						allCurrentPeerChats.value[i].peer_1.agents.find(
							a => encodeHashToBase64(a) === encodeHashToBase64(agent),
						) ||
						allCurrentPeerChats.value[i].peer_2.agents.find(
							a => encodeHashToBase64(a) === encodeHashToBase64(agent),
						)
					) {
						peerChatsHashesForPeer.push(
							decodeHashFromBase64(allPeerChatsHashes[i]),
						);
					}
				}

				return {
					status: 'completed',
					value: peerChatsHashesForPeer,
				};
			}),
	);

	allChats = new AsyncComputed<Array<ChatSummary>>(() => {
		const entries = this.privateMessengerEntries.get();
		if (entries.status !== 'completed') return entries;

		const peerChatsHashes = Object.keys(entries.value.peerChats);
		const peerChatsSummaries = joinAsync(
			peerChatsHashes.map(peerChatHash =>
				this.peerChats.get(decodeHashFromBase64(peerChatHash)).summary.get(),
			),
		);
		const groupChatsHashes = Object.keys(entries.value.groupChats);
		const groupChatsSummaries = joinAsync(
			groupChatsHashes.map(groupChatHash =>
				this.groupChats.get(decodeHashFromBase64(groupChatHash)).summary.get(),
			),
		);
		if (peerChatsSummaries.status !== 'completed') return peerChatsSummaries;
		if (groupChatsSummaries.status !== 'completed') return groupChatsSummaries;

		const chats: ChatSummary[] = [
			...peerChatsSummaries.value.map(s => ({
				type: 'PeerChat' as const,
				...s,
			})),
			...groupChatsSummaries.value.map(s => ({
				type: 'GroupChat' as const,
				...s,
			})),
		];
		const sortedChats = chats.sort(
			(c1, c2) =>
				c2.lastActivity.signed_content.timestamp -
				c1.lastActivity.signed_content.timestamp,
		);

		return {
			status: 'completed',
			value: sortedChats,
		};
	});
}
