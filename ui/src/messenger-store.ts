import {
	LinkedDevicesProof,
	LinkedDevicesStore,
} from '@darksoil-studio/linked-devices-zome';
import {
	AgentPubKey,
	AgentPubKeyB64,
	EntryHash,
	EntryHashB64,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import { decode } from '@msgpack/msgpack';
import {
	AsyncComputed,
	Signal,
	joinAsync,
	toPromise,
} from '@tnesh-stack/signals';
import { HashType, MemoHoloHashMap, retype } from '@tnesh-stack/utils';

import { GroupChatStore, GroupChatSummary } from './group-chat-store.js';
import { MessengerClient } from './messenger-client.js';
import { PeerChatStore, PeerChatSummary } from './peer-chat-store.js';
import {
	CreateGroupChat,
	GroupChatEvent,
	GroupMessage,
	PeerChat,
	PeerChatEvent,
	PeerMessage,
	PrivateMessengerEntry,
	ReadGroupMessages,
	ReadPeerMessages,
	Signed,
} from './types.js';
import { TYPING_INDICATOR_TTL_MS, asyncReadable } from './utils.js';

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
			createPeerChat: Signed<PeerChat>;
			events: Record<EntryHashB64, Signed<PeerChatEvent>>;
			messages: Record<EntryHashB64, Signed<PeerMessage>>;
			readMessages: Record<EntryHashB64, Signed<ReadPeerMessages>>;
		}
	>;
	groupChats: Record<
		EntryHashB64,
		{
			createGroupChat: Signed<CreateGroupChat>;
			events: Record<EntryHashB64, Signed<GroupChatEvent>>;
			messages: Record<EntryHashB64, Signed<GroupMessage>>;
			readMessages: Record<EntryHashB64, Signed<ReadGroupMessages>>;
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

		const addEntry = (
			entryHash: EntryHashB64,
			messengerEntry: PrivateMessengerEntry,
		) => {
			switch (messengerEntry.signed_content.content.type) {
				case 'CreatePeerChat':
					messengerEntries.peerChats[entryHash] = {
						createPeerChat: messengerEntry as Signed<PeerChat>,
						events: {},
						messages: {},
						readMessages: {},
					};
					break;
				case 'PeerChatEvent':
					const peerChatEvent = messengerEntry as Signed<PeerChatEvent>;
					const peerChatHash1 = encodeHashToBase64(
						peerChatEvent.signed_content.content.peer_chat_hash,
					);
					messengerEntries.peerChats[peerChatHash1].events[entryHash] =
						peerChatEvent;
					break;
				case 'ReadPeerMessages':
					const readPeerMessages = messengerEntry as Signed<ReadPeerMessages>;
					const peerChatHash2 = encodeHashToBase64(
						readPeerMessages.signed_content.content.peer_chat_hash,
					);
					messengerEntries.peerChats[peerChatHash2].readMessages[entryHash] =
						readPeerMessages;
					break;
				case 'PeerMessage':
					const peerMessage = messengerEntry as Signed<PeerMessage>;
					const peerChatHash3 = encodeHashToBase64(
						peerMessage.signed_content.content.peer_chat_hash,
					);
					messengerEntries.peerChats[peerChatHash3].messages[entryHash] =
						peerMessage;
					break;
				case 'CreateGroupChat':
					messengerEntries.groupChats[entryHash] = {
						createGroupChat: messengerEntry as Signed<CreateGroupChat>,
						events: {},
						messages: {},
						readMessages: {},
					};
					break;
				case 'GroupChatEvent':
					const groupChatEvent = messengerEntry as Signed<GroupChatEvent>;
					const groupChatHash1 = encodeHashToBase64(
						groupChatEvent.signed_content.content.group_chat_hash,
					);
					messengerEntries.groupChats[groupChatHash1].events[entryHash] =
						groupChatEvent;
					break;
				case 'ReadGroupMessages':
					const readGroupMessages = messengerEntry as Signed<ReadGroupMessages>;
					const groupChatHash2 = encodeHashToBase64(
						readGroupMessages.signed_content.content.group_chat_hash,
					);
					messengerEntries.groupChats[groupChatHash2].readMessages[entryHash] =
						readGroupMessages;
					break;
				case 'GroupMessage':
					const groupMessage = messengerEntry as Signed<GroupMessage>;
					const groupChatHash3 = encodeHashToBase64(
						groupMessage.signed_content.content.group_chat_hash,
					);
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

		const peerChatsHashes = Object.keys(entries);
		const peerChatsSummaries = joinAsync(
			peerChatsHashes.map(peerChatHash =>
				this.peerChats.get(decodeHashFromBase64(peerChatHash)).summary.get(),
			),
		);
		const groupChatsHashes = Object.keys(entries);
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

	// private internalEntries = new AsyncComputed<InternalEntries>(() => {
	// 	const privateMessengerEntriesResult = this.privateMessengerEntries.get();
	// 	if (privateMessengerEntriesResult.status !== 'completed')
	// 		return privateMessengerEntriesResult;
	// 	const allMyDevices = this.allMyDevices.get();
	// 	if (allMyDevices.status !== 'completed') return allMyDevices;

	// 	const allMyDevicesB64 = allMyDevices.value.map(encodeHashToBase64);

	// 	const privateMessengerEntries = privateMessengerEntriesResult.value;

	// 	const value: InternalEntries = {
	// 		privateMessengerEntries,
	// 		peerChats: {},
	// 		groups: {},
	// 	};

	// 	for (const [entryHash, privateMessengerEntry] of Object.entries(
	// 		privateMessengerEntries,
	// 	)) {
	// 		switch (privateMessengerEntry.signed_content.content.type) {
	// 			case 'PeerMessage':
	// 				const peerMessage = privateMessengerEntry as Signed<PeerMessage>;
	// 				const peer = !allMyDevicesB64.includes(
	// 					encodeHashToBase64(peerMessage.provenance),
	// 				)
	// 					? peerMessage.provenance
	// 					: peerMessage.signed_content.content.recipient;
	// 				const peerB64 = encodeHashToBase64(peer);
	// 				if (!value.peerChats[peerB64]) {
	// 					value.peerChats[peerB64] = {
	// 						messages: [],
	// 						myReadMessages: [],
	// 						theirReadMessages: [],
	// 					};
	// 				}

	// 				value.peerChats[peerB64].messages.push(entryHash);
	// 				break;
	// 			case 'ReadPeerMessages':
	// 				const readPeerMessages =
	// 					privateMessengerEntry as Signed<ReadPeerMessages>;
	// 				const fromMe = allMyDevicesB64.includes(
	// 					encodeHashToBase64(readPeerMessages.provenance),
	// 				);
	// 				const peer2 = fromMe
	// 					? readPeerMessages.signed_content.content.peer
	// 					: readPeerMessages.provenance;
	// 				const peerB642 = encodeHashToBase64(peer2);
	// 				if (!value.peerChats[peerB642]) {
	// 					value.peerChats[peerB642] = {
	// 						messages: [],
	// 						myReadMessages: [],
	// 						theirReadMessages: [],
	// 					};
	// 				}

	// 				if (fromMe) {
	// 					for (const readMessage of readPeerMessages.signed_content.content
	// 						.read_messages_hashes) {
	// 						value.peerChats[peerB642].myReadMessages.push(
	// 							encodeHashToBase64(readMessage),
	// 						);
	// 					}
	// 				} else {
	// 					for (const readMessage of readPeerMessages.signed_content.content
	// 						.read_messages_hashes) {
	// 						value.peerChats[peerB642].theirReadMessages.push(
	// 							encodeHashToBase64(readMessage),
	// 						);
	// 					}
	// 				}
	// 				break;
	// 			case 'UpdateGroupChat':
	// 				const update = privateMessengerEntry as Signed<UpdateGroupChat>;
	// 				const groupHash = encodeHashToBase64(
	// 					update.signed_content.content.original_group_hash,
	// 				);
	// 				if (!value.groups[groupHash]) {
	// 					value.groups[groupHash] = {
	// 						updates: [],
	// 						deletes: [],
	// 						messages: [],
	// 						myReadMessages: [],
	// 						theirReadMessages: {},
	// 					};
	// 				}
	// 				value.groups[groupHash].updates.push(entryHash);
	// 				break;
	// 			case 'DeleteGroupChat':
	// 				const deleteChat = privateMessengerEntry as Signed<DeleteGroupChat>;
	// 				const groupHash2 = encodeHashToBase64(
	// 					deleteChat.signed_content.content.original_group_hash,
	// 				);
	// 				if (!value.groups[groupHash2]) {
	// 					value.groups[groupHash2] = {
	// 						updates: [],
	// 						deletes: [],
	// 						messages: [],
	// 						myReadMessages: [],
	// 						theirReadMessages: {},
	// 					};
	// 				}
	// 				value.groups[groupHash2].deletes.push(entryHash);
	// 				break;
	// 			case 'GroupMessage':
	// 				const groupMessage = privateMessengerEntry as Signed<GroupMessage>;
	// 				const groupHash3 = encodeHashToBase64(
	// 					groupMessage.signed_content.content.original_group_hash,
	// 				);
	// 				if (!value.groups[groupHash3]) {
	// 					value.groups[groupHash3] = {
	// 						updates: [],
	// 						deletes: [],
	// 						messages: [],
	// 						myReadMessages: [],
	// 						theirReadMessages: {},
	// 					};
	// 				}
	// 				value.groups[groupHash3].messages.push(entryHash);
	// 				break;
	// 			case 'ReadGroupMessages':
	// 				const readGroupMessages =
	// 					privateMessengerEntry as Signed<ReadGroupMessages>;
	// 				const author = encodeHashToBase64(readGroupMessages.provenance);
	// 				const fromMe2 = allMyDevicesB64.includes(author);
	// 				const groupHash4 = encodeHashToBase64(
	// 					readGroupMessages.signed_content.content.original_group_hash,
	// 				);
	// 				if (!value.groups[groupHash4]) {
	// 					value.groups[groupHash4] = {
	// 						updates: [],
	// 						deletes: [],
	// 						messages: [],
	// 						myReadMessages: [],
	// 						theirReadMessages: {},
	// 					};
	// 				}

	// 				if (fromMe2) {
	// 					for (const readMessage of readGroupMessages.signed_content.content
	// 						.read_messages_hashes) {
	// 						value.groups[groupHash4].myReadMessages.push(
	// 							encodeHashToBase64(readMessage),
	// 						);
	// 					}
	// 				} else {
	// 					for (const readMessage of readGroupMessages.signed_content.content
	// 						.read_messages_hashes) {
	// 						if (!value.groups[groupHash4].theirReadMessages[author]) {
	// 							value.groups[groupHash4].theirReadMessages[author] = [];
	// 						}
	// 						value.groups[groupHash4].theirReadMessages[author].push(
	// 							encodeHashToBase64(readMessage),
	// 						);
	// 					}
	// 				}
	// 				break;
	// 			case 'CreateGroupChat':
	// 				if (!value.groups[entryHash]) {
	// 					value.groups[entryHash] = {
	// 						updates: [],
	// 						deletes: [],
	// 						messages: [],
	// 						myReadMessages: [],
	// 						theirReadMessages: {},
	// 					};
	// 				}
	// 				break;
	// 		}
	// 	}

	// 	return {
	// 		status: 'completed',
	// 		value,
	// 	};
	// });

	// private allDevicesFor = new MemoHoloHashMap((agent: AgentPubKey) => {
	// 	if (this.linkedDevicesStore) {
	// 		return new AsyncComputed(() => {
	// 			const devices =
	// 				this.linkedDevicesStore!.linkedDevicesForAgent.get(agent).get();
	// 			if (devices.status !== 'completed') return devices;

	// 			return {
	// 				status: 'completed',
	// 				value: [agent, ...devices.value],
	// 			};
	// 		});
	// 	} else {
	// 		return new AsyncState({ status: 'completed', value: [agent] });
	// 	}
	// });

	// allMyDevices = new AsyncComputed(() => {
	// 	if (!this.linkedDevicesStore)
	// 		return {
	// 			status: 'completed',
	// 			value: [this.client.client.myPubKey],
	// 		};

	// 	return this.linkedDevicesStore.myLinkedDevices.get();
	// });

	// peerChats = new MemoHoloHashMap(
	// 	(agent: AgentPubKey) =>
	// 		new AsyncComputed(() => {
	// 			const messages = this.internalEntries.get();
	// 			const myAgents = this.allMyDevices.get();
	// 			const theirAgents = this.allDevicesFor.get(agent).get();
	// 			if (messages.status !== 'completed') return messages;
	// 			if (theirAgents.status !== 'completed') return theirAgents;
	// 			if (myAgents.status !== 'completed') return myAgents;

	// 			const agentMessages: Record<EntryHashB64, Signed<PeerMessage>> = {};
	// 			const theirAgentsB64 = theirAgents.value.map(encodeHashToBase64);
	// 			const myReadMessages: Array<EntryHashB64> = [];
	// 			const theirReadMessages: Array<EntryHashB64> = [];

	// 			for (const agent of theirAgentsB64) {
	// 				const peerChatForThisAgent = messages.value.peerChats[agent];
	// 				if (peerChatForThisAgent) {
	// 					for (const messageHash of peerChatForThisAgent.messages) {
	// 						const message = messages.value.privateMessengerEntries[
	// 							messageHash
	// 						] as Signed<PeerMessage>;
	// 						agentMessages[messageHash] = message;
	// 					}
	// 					for (const readMessageHash of peerChatForThisAgent.myReadMessages) {
	// 						myReadMessages.push(readMessageHash);
	// 					}
	// 					for (const readMessageHash of peerChatForThisAgent.theirReadMessages) {
	// 						theirReadMessages.push(readMessageHash);
	// 					}
	// 				}
	// 			}

	// 			let peerIsTyping = false;

	// 			for (const theirAgent of theirAgents.value) {
	// 				const thisPeerIsTyping = this.peerIsTyping.get(theirAgent).get();

	// 				if (thisPeerIsTyping) {
	// 					peerIsTyping = true;
	// 				}
	// 			}

	// 			return {
	// 				status: 'completed',
	// 				value: {
	// 					messages: agentMessages,
	// 					myReadMessages,
	// 					theirReadMessages,
	// 					myAgentSet: myAgents.value,
	// 					theirAgentSet: theirAgents.value,
	// 					peerIsTyping,
	// 				},
	// 			};
	// 		}),
	// );

	// groupChats = new MemoHoloHashMap(
	// 	(groupHash: EntryHash) =>
	// 		new AsyncComputed(() => {
	// 			const privateMessengerEntries = this.internalEntries.get();
	// 			if (privateMessengerEntries.status !== 'completed')
	// 				return privateMessengerEntries;
	// 			const myAgents = this.allMyDevices.get();
	// 			if (myAgents.status !== 'completed') return myAgents;
	// 			const groupHashB64 = encodeHashToBase64(groupHash);
	// 			const group = privateMessengerEntries.value.groups[groupHashB64];

	// 			if (!group) {
	// 				return {
	// 					status: 'completed',
	// 					value: undefined,
	// 				};
	// 			}

	// 			const originalGroup = privateMessengerEntries.value
	// 				.privateMessengerEntries[groupHashB64] as Signed<Group>;
	// 			let currentGroup: Group = originalGroup.signed_content.content;
	// 			let currentGroupTimestamp = originalGroup.signed_content.timestamp;

	// 			const messages: Record<EntryHashB64, Signed<GroupMessage>> = {};
	// 			const updates: Record<EntryHashB64, Signed<UpdateGroupChat>> = {};
	// 			const deletes: Record<EntryHashB64, Signed<DeleteGroupChat>> = {};

	// 			let theirAgents: AgentPubKey[] = [];

	// 			for (const updateHash of group.updates) {
	// 				const update = privateMessengerEntries.value.privateMessengerEntries[
	// 					updateHash
	// 				] as Signed<UpdateGroupChat>;
	// 				updates[updateHash] = update;
	// 				if (currentGroupTimestamp < update.signed_content.timestamp) {
	// 					currentGroupTimestamp = update.signed_content.timestamp;
	// 					currentGroup = update.signed_content.content.group;
	// 				}
	// 				theirAgents.push(update.provenance);
	// 			}

	// 			for (const messageHash of group.messages) {
	// 				const message = privateMessengerEntries.value.privateMessengerEntries[
	// 					messageHash
	// 				] as Signed<GroupMessage>;
	// 				messages[messageHash] = message;
	// 				theirAgents.push(message.provenance);
	// 			}
	// 			for (const deleteHash of group.deletes) {
	// 				const deleteChat = privateMessengerEntries.value
	// 					.privateMessengerEntries[deleteHash] as Signed<DeleteGroupChat>;
	// 				deletes[deleteHash] = deleteChat;
	// 				theirAgents.push(deleteChat.provenance);
	// 			}

	// 			for (const admin of currentGroup.admins) {
	// 				theirAgents.push(admin);
	// 			}
	// 			for (const member of currentGroup.members) {
	// 				theirAgents.push(member);
	// 			}
	// 			theirAgents = uniquify(theirAgents).filter(
	// 				theirAgent =>
	// 					!myAgents.value.find(
	// 						myAgent =>
	// 							encodeHashToBase64(myAgent) === encodeHashToBase64(theirAgent),
	// 					),
	// 			);
	// 			const agentsLinkedDevices = joinAsyncMap(
	// 				mapValues(slice(this.allDevicesFor, theirAgents), s => s.get()),
	// 			);
	// 			if (agentsLinkedDevices.status !== 'completed')
	// 				return agentsLinkedDevices;

	// 			const theirAgentSets: Array<Array<AgentPubKey>> = [];

	// 			for (const agents of Array.from(agentsLinkedDevices.value.values())) {
	// 				const currentAgentSet = theirAgentSets.findIndex(agentSet =>
	// 					agentSet.find(agent =>
	// 						agents.find(
	// 							a => encodeHashToBase64(a) === encodeHashToBase64(agent),
	// 						),
	// 					),
	// 				);

	// 				if (currentAgentSet === -1) {
	// 					theirAgentSets.push(agents);
	// 				} else {
	// 					theirAgentSets[currentAgentSet] = uniquify([
	// 						...theirAgentSets[currentAgentSet],
	// 						...agents,
	// 					]);
	// 				}
	// 			}

	// 			const typingPeers: Array<AgentPubKey> = [];

	// 			for (const agentSet of theirAgentSets) {
	// 				for (const agent of agentSet) {
	// 					const isTyping = this.peerIsTypingInGroup
	// 						.get(groupHash)
	// 						.get(agent)
	// 						.get();
	// 					if (isTyping) typingPeers.push(agent);
	// 				}
	// 			}

	// 			return {
	// 				status: 'completed',
	// 				value: {
	// 					originalGroup,
	// 					currentGroup,
	// 					messages,
	// 					updates,
	// 					deletes,
	// 					myAgentSet: myAgents.value,
	// 					theirAgentSets,
	// 					typingPeers,
	// 					myReadMessages: group.myReadMessages,
	// 				},
	// 			};
	// 		}),
	// );

	// allPeerChats = new AsyncComputed<Array<PeerChat>>(() => {
	// 	const privateMessengerEntries = this.internalEntries.get();
	// 	if (privateMessengerEntries.status !== 'completed')
	// 		return privateMessengerEntries;
	// 	const myAgents = this.allMyDevices.get();
	// 	if (myAgents.status !== 'completed') return myAgents;

	// 	let allPeerAgents: AgentPubKey[] = Object.keys(
	// 		privateMessengerEntries.value.peerChats,
	// 	).map(decodeHashFromBase64);

	// 	const linkedDevicesForAllPeerAgents = joinAsyncMap(
	// 		mapValues(slice(this.allDevicesFor, allPeerAgents), s => s.get()),
	// 	);
	// 	if (linkedDevicesForAllPeerAgents.status !== 'completed')
	// 		return linkedDevicesForAllPeerAgents;

	// 	const agentSets: Array<Array<AgentPubKeyB64>> = [];

	// 	for (const [agent, agents] of Array.from(
	// 		linkedDevicesForAllPeerAgents.value.entries(),
	// 	)) {
	// 		const agentSetForAgentIndex = agentSets.findIndex(
	// 			a => !!agents.find(a2 => a.includes(encodeHashToBase64(a2))),
	// 		);

	// 		if (agentSetForAgentIndex === -1) {
	// 			agentSets.push(agents.map(encodeHashToBase64));
	// 		} else {
	// 			agentSets[agentSetForAgentIndex] = Array.from(
	// 				new Set([
	// 					...agentSets[agentSetForAgentIndex],
	// 					...agents.map(encodeHashToBase64),
	// 				]),
	// 			);
	// 		}
	// 	}

	// 	const peerChats: Array<PeerChat> = [];

	// 	for (const agentSet of agentSets) {
	// 		let lastActivity: Signed<PeerMessage> | undefined;
	// 		const myReadMessages: Record<EntryHashB64, 'read' | 'unread'> = {};

	// 		for (const agent of agentSet) {
	// 			const peerChatForAgent = privateMessengerEntries.value.peerChats[agent];
	// 			if (peerChatForAgent) {
	// 				for (const messageHash of peerChatForAgent.messages) {
	// 					const message = privateMessengerEntries.value
	// 						.privateMessengerEntries[messageHash] as Signed<PeerMessage>;

	// 					if (
	// 						!lastActivity ||
	// 						lastActivity.signed_content.timestamp <
	// 							message.signed_content.timestamp
	// 					) {
	// 						lastActivity = message;
	// 					}
	// 					const fromMe = myAgents.value.find(
	// 						myAgent =>
	// 							encodeHashToBase64(myAgent) ===
	// 							encodeHashToBase64(message.provenance),
	// 					);
	// 					if (!fromMe && !myReadMessages[messageHash]) {
	// 						myReadMessages[messageHash] = 'unread';
	// 					}
	// 				}
	// 				for (const readMessageHash of peerChatForAgent.myReadMessages) {
	// 					myReadMessages[readMessageHash] = 'read';
	// 				}
	// 			}
	// 		}

	// 		const myUnreadMessages = Object.entries(myReadMessages)
	// 			.filter(([_, read]) => read === 'unread')
	// 			.map(([hash, _]) => decodeHashFromBase64(hash));

	// 		if (lastActivity) {
	// 			peerChats.push({
	// 				theirAgentSet: agentSet.map(decodeHashFromBase64),
	// 				lastActivity,
	// 				myUnreadMessages,
	// 			});
	// 		}
	// 	}

	// 	return {
	// 		status: 'completed',
	// 		value: peerChats,
	// 	};
	// });

	// allGroupChats = new AsyncComputed<Array<GroupChat>>(() => {
	// 	const privateMessengerEntries = this.internalEntries.get();
	// 	if (privateMessengerEntries.status !== 'completed')
	// 		return privateMessengerEntries;
	// 	const myAgents = this.allMyDevices.get();
	// 	if (myAgents.status !== 'completed') return myAgents;
	// 	const myAgentsB64 = myAgents.value.map(encodeHashToBase64);

	// 	const chats: Array<GroupChat> = [];

	// 	for (const [groupHash, group] of Object.entries(
	// 		privateMessengerEntries.value.groups,
	// 	)) {
	// 		const createGroup = privateMessengerEntries.value.privateMessengerEntries[
	// 			groupHash
	// 		] as Signed<{ type: 'CreateGroupChat' } & Group>;

	// 		let lastActivity: GroupMessengerEntry = createGroup;
	// 		let lastGroupVersion: [Timestamp, Group] = [
	// 			createGroup.signed_content.timestamp,
	// 			createGroup.signed_content.content,
	// 		];

	// 		const myUnreadMessages: EntryHash[] = [];

	// 		for (const messageHash of group.messages) {
	// 			const message =
	// 				privateMessengerEntries.value.privateMessengerEntries[messageHash];

	// 			if (
	// 				lastActivity.signed_content.timestamp <
	// 				message.signed_content.timestamp
	// 			) {
	// 				lastActivity = message as Signed<
	// 					{ type: 'GroupMessage' } & GroupMessage
	// 				>;
	// 			}

	// 			if (
	// 				!myAgentsB64.includes(encodeHashToBase64(message.provenance)) &&
	// 				!group.myReadMessages.includes(messageHash)
	// 			) {
	// 				myUnreadMessages.push(decodeHashFromBase64(messageHash));
	// 			}
	// 		}

	// 		for (const updateHash of group.updates) {
	// 			const update = privateMessengerEntries.value.privateMessengerEntries[
	// 				updateHash
	// 			] as Signed<{ type: 'UpdateGroupChat' } & UpdateGroupChat>;

	// 			if (
	// 				lastActivity.signed_content.timestamp <
	// 				update.signed_content.timestamp
	// 			) {
	// 				lastActivity = update;
	// 			}
	// 			if (lastGroupVersion[0] < update.signed_content.timestamp) {
	// 				lastGroupVersion = [
	// 					update.signed_content.timestamp,
	// 					update.signed_content.content.group,
	// 				];
	// 			}
	// 		}

	// 		for (const deleteHash of group.deletes) {
	// 			const deleteGroup = privateMessengerEntries.value
	// 				.privateMessengerEntries[deleteHash] as Signed<
	// 				{ type: 'DeleteGroupChat' } & DeleteGroupChat
	// 			>;

	// 			lastActivity = deleteGroup;
	// 		}

	// 		chats.push({
	// 			lastActivity,
	// 			currentGroup: lastGroupVersion[1],
	// 			groupHash: decodeHashFromBase64(groupHash),
	// 			myUnreadMessages,
	// 		});
	// 	}

	// 	return {
	// 		status: 'completed',
	// 		value: chats,
	// 	};
	// });

	// allChats = new AsyncComputed<Array<Chat>>(() => {
	// 	const allGroupChats = this.allGroupChats.get();
	// 	const allPeerChats = this.allPeerChats.get();
	// 	if (allGroupChats.status !== 'completed') return allGroupChats;
	// 	if (allPeerChats.status !== 'completed') return allPeerChats;

	// 	const groupChats = allGroupChats.value.map(g => ({
	// 		type: 'GroupChat' as const,
	// 		...g,
	// 	}));
	// 	const peerChats = allPeerChats.value.map(p => ({
	// 		type: 'PeerChat' as const,
	// 		...p,
	// 	}));

	// 	const chats = [...groupChats, ...peerChats].sort(
	// 		(c1, c2) =>
	// 			c2.lastActivity.signed_content.timestamp -
	// 			c1.lastActivity.signed_content.timestamp,
	// 	);

	// 	return {
	// 		status: 'completed',
	// 		value: chats,
	// 	};
	// });
}
