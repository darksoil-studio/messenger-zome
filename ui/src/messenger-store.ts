import {
	LinkedDevicesProof,
	LinkedDevicesStore,
} from '@darksoil-studio/linked-devices-zome';
import {
	PrivateEventSourcingStore,
	SignedEvent,
} from '@darksoil-studio/private-event-sourcing-zome';
import { ProfilesProvider } from '@darksoil-studio/profiles-provider';
import {
	AgentPubKey,
	EntryHash,
	EntryHashB64,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import { decode } from '@msgpack/msgpack';
import { AsyncComputed, joinAsync, toPromise } from '@darksoil-studio/holochain-signals';
import { HashType, MemoHoloHashMap, retype } from '@darksoil-studio/holochain-utils';

import { GroupChatStore, GroupChatSummary } from './group-chat-store.js';
import { MessengerClient } from './messenger-client.js';
import { PeerChatStore, PeerChatSummary } from './peer-chat-store.js';
import {
	CreateGroupChat,
	CreatePeerChat,
	GroupChatEvent,
	GroupMessage,
	MessengerEvent,
	PeerChatEvent,
	PeerMessage,
	ReadGroupMessages,
	ReadPeerMessages,
} from './types.js';
import { areEqual, asyncReadable, effect } from './utils.js';

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
			createPeerChat: SignedEvent<CreatePeerChat> | undefined;
			events: Record<EntryHashB64, SignedEvent<PeerChatEvent>>;
			messages: Record<EntryHashB64, SignedEvent<PeerMessage>>;
			readMessages: Record<EntryHashB64, SignedEvent<ReadPeerMessages>>;
		}
	>;
	groupChats: Record<
		EntryHashB64,
		{
			createGroupChat: SignedEvent<CreateGroupChat> | undefined;
			events: Record<
				EntryHashB64,
				SignedEvent<{ type: 'GroupChatEvent' } & GroupChatEvent>
			>;
			messages: Record<
				EntryHashB64,
				SignedEvent<{ type: 'GroupMessage' } & GroupMessage>
			>;
			readMessages: Record<EntryHashB64, SignedEvent<ReadGroupMessages>>;
		}
	>;
}

export class MessengerStore extends PrivateEventSourcingStore<MessengerEvent> {
	constructor(
		public client: MessengerClient,
		public linkedDevicesStore?: LinkedDevicesStore,
		public profilesProvider?: ProfilesProvider,
	) {
		super(client);
		if (profilesProvider && !profilesProvider.profilesArePublic) {
			effect(() => {
				const myProfile = this.profilesProvider?.currentProfileForAgent
					.get(this.client.client.myPubKey)
					.get();
				const entries = this.messengerEntries.get();

				if (myProfile!.status !== 'completed' || !myProfile?.value) return;
				if (entries!.status !== 'completed') return;

				for (const groupChatHash of Object.keys(entries.value.groupChats)) {
					const groupChatStore = this.groupChats.get(
						decodeHashFromBase64(groupChatHash),
					);
					const groupChat = groupChatStore.currentGroupChat.get();
					if (groupChat.status !== 'completed') continue;

					const myMember = groupChat.value.members.find(member =>
						member.agents.find(
							agent =>
								encodeHashToBase64(agent) ===
								encodeHashToBase64(this.client.client.myPubKey),
						),
					);
					if (!myMember || myMember.removed) continue;

					if (
						!myMember.profile ||
						!areEqual(myMember.profile, myProfile.value)
					) {
						groupChatStore.updateProfile(myProfile.value);
					}
				}
			});
		}

		setTimeout(() => {
			this.client.commitMyPendingEncryptedMessages();
		}, 2000);
		setTimeout(() => {
			this.client.commitMyPendingEncryptedMessages();
		}, 4000);
		if (this.linkedDevicesStore) {
			this.linkedDevicesStore.client.onSignal(async signal => {
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
				// this.client.synchronizeWithLinkedDevice(linkedDevice);
				// Send to everyone that we have a new peer
				const entries = await toPromise(this.messengerEntries);

				const allPeerChats = Object.keys(entries.peerChats);
				const proofs = decode(
					signal.action.hashed.content.tag,
				) as Array<LinkedDevicesProof>;

				for (const peerChatHash of allPeerChats) {
					const store = this.peerChats.get(decodeHashFromBase64(peerChatHash));
					await store.notifyNewPeerAgent(linkedDevice, proofs);
				}

				const allGroupChats = Object.keys(entries.groupChats);

				for (const groupChatHash of allGroupChats) {
					const store = this.groupChats.get(
						decodeHashFromBase64(groupChatHash),
					);

					await store.notifyNewAgent(linkedDevice, proofs);
				}
			});
		}
	}

	messengerEntries = asyncReadable<MessengerEntries>(async set => {
		const privateMessengerEntries =
			await this.client.queryPrivateEventEntries();

		const messengerEntries: MessengerEntries = {
			groupChats: {},
			peerChats: {},
		};

		const initPeerChat = (peerChatHash: EntryHashB64) => {
			if (!messengerEntries.peerChats[peerChatHash]) {
				messengerEntries.peerChats[peerChatHash] = {
					createPeerChat: undefined,
					events: {},
					messages: {},
					readMessages: {},
				};
			}
		};
		const initGroupChat = (groupChatHash: EntryHashB64) => {
			if (!messengerEntries.groupChats[groupChatHash]) {
				messengerEntries.groupChats[groupChatHash] = {
					createGroupChat: undefined,
					events: {},
					messages: {},
					readMessages: {},
				};
			}
		};

		const addEntry = (
			entryHash: EntryHashB64,
			messengerEntry: SignedEvent<MessengerEvent>,
		) => {
			switch (messengerEntry.event.content.type) {
				case 'CreatePeerChat':
					initPeerChat(entryHash);
					messengerEntries.peerChats[entryHash].createPeerChat =
						messengerEntry as SignedEvent<CreatePeerChat>;
					break;
				case 'PeerChatEvent':
					const peerChatEvent = messengerEntry as SignedEvent<PeerChatEvent>;
					const peerChatHash1 = encodeHashToBase64(
						peerChatEvent.event.content.peer_chat_hash,
					);
					initPeerChat(peerChatHash1);
					messengerEntries.peerChats[peerChatHash1].events[entryHash] =
						peerChatEvent;
					break;
				case 'ReadPeerMessages':
					const readPeerMessages =
						messengerEntry as SignedEvent<ReadPeerMessages>;
					const peerChatHash2 = encodeHashToBase64(
						readPeerMessages.event.content.peer_chat_hash,
					);
					initPeerChat(peerChatHash2);
					messengerEntries.peerChats[peerChatHash2].readMessages[entryHash] =
						readPeerMessages;
					break;
				case 'PeerMessage':
					const peerMessage = messengerEntry as SignedEvent<PeerMessage>;
					const peerChatHash3 = encodeHashToBase64(
						peerMessage.event.content.peer_chat_hash,
					);
					initPeerChat(peerChatHash3);
					messengerEntries.peerChats[peerChatHash3].messages[entryHash] =
						peerMessage;
					break;
				case 'CreateGroupChat':
					initGroupChat(entryHash);
					messengerEntries.groupChats[entryHash].createGroupChat =
						messengerEntry as SignedEvent<CreateGroupChat>;
					break;
				case 'GroupChatEvent':
					const groupChatEvent = messengerEntry as SignedEvent<
						{
							type: 'GroupChatEvent';
						} & GroupChatEvent
					>;
					const groupChatHash1 = encodeHashToBase64(
						groupChatEvent.event.content.group_chat_hash,
					);
					initGroupChat(groupChatHash1);
					messengerEntries.groupChats[groupChatHash1].events[entryHash] =
						groupChatEvent;
					break;
				case 'ReadGroupMessages':
					const readGroupMessages =
						messengerEntry as SignedEvent<ReadGroupMessages>;
					const groupChatHash2 = encodeHashToBase64(
						readGroupMessages.event.content.group_chat_hash,
					);
					initGroupChat(groupChatHash2);
					messengerEntries.groupChats[groupChatHash2].readMessages[entryHash] =
						readGroupMessages;
					break;
				case 'GroupMessage':
					const groupMessage = messengerEntry as SignedEvent<
						{
							type: 'GroupMessage';
						} & GroupMessage
					>;
					const groupChatHash3 = encodeHashToBase64(
						groupMessage.event.content.group_chat_hash,
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
			(e1, e2) => e1[1].event.timestamp - e2[1].event.timestamp,
		);

		for (const [entryHash, privateEventEntry] of orderedEntries) {
			const event = {
				...privateEventEntry,
				event: {
					timestamp: privateEventEntry.event.timestamp,
					content: decode(privateEventEntry.event.content) as MessengerEvent,
				},
			};
			addEntry(entryHash, event);
		}

		set(messengerEntries);

		return this.client.onSignal(signal => {
			if (signal.type !== 'NewPrivateEvent') return;

			const entryHash = encodeHashToBase64(signal.event_hash);
			const event = {
				...signal.private_event_entry,
				event: {
					timestamp: signal.private_event_entry.event.timestamp,
					content: decode(
						signal.private_event_entry.event.content,
					) as MessengerEvent,
				},
			};
			addEntry(entryHash, event);
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
				const entries = this.messengerEntries.get();
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
		const entries = this.messengerEntries.get();
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
				c2.lastActivity.event.timestamp - c1.lastActivity.event.timestamp,
		);

		return {
			status: 'completed',
			value: sortedChats,
		};
	});
}
