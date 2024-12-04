import { LinkedDevicesProof } from '@darksoil-studio/linked-devices-zome';
import {
	AgentPubKey,
	EntryHash,
	EntryHashB64,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import { msg } from '@lit/localize';
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
	CreatePeerChat,
	Message,
	Peer,
	PeerChat,
	PeerChatEntry,
	PeerEvent,
} from './types.js';
import { TYPING_INDICATOR_TTL_MS, mergeProfiles } from './utils.js';

export class PeerChatStore {
	peerIsTyping = new Signal.State<boolean>(false);

	constructor(
		public messengerStore: MessengerStore,
		public peerChatHash: EntryHash,
	) {
		let timeout: number;
		this.messengerStore.client.onSignal(signal => {
			if (signal.type === 'PeerChatTypingIndicator') {
				if (
					encodeHashToBase64(signal.peer_chat_hash) ===
					encodeHashToBase64(peerChatHash)
				) {
					this.peerIsTyping.set(true);
					if (timeout) clearTimeout(timeout);
					timeout = setTimeout(() => {
						this.peerIsTyping.set(false);
					}, TYPING_INDICATOR_TTL_MS);
				}
			} else if (
				signal.type === 'EntryCreated' &&
				signal.app_entry.type === 'PrivateMessengerEntry' &&
				signal.app_entry.signed_content.content.type === 'PeerMessage'
			) {
				if (
					encodeHashToBase64(
						signal.app_entry.signed_content.content.peer_chat_hash,
					) === encodeHashToBase64(peerChatHash)
				) {
					this.peerIsTyping.set(false);
					if (timeout) clearTimeout(timeout);
				}
			}
		});
	}

	private peerChatEntries = new AsyncComputed(() => {
		const privateMessengerEntriesResult =
			this.messengerStore.privateMessengerEntries.get();
		if (privateMessengerEntriesResult.status !== 'completed')
			return privateMessengerEntriesResult;

		const peerChatHashB64 = encodeHashToBase64(this.peerChatHash);
		const peerChatEntries =
			privateMessengerEntriesResult.value.peerChats[peerChatHashB64];
		if (!peerChatEntries)
			return {
				status: 'error',
				error: msg('Peer Chat not found'),
			};

		const previousToNexts: Record<EntryHashB64, Array<EntryHashB64>> = {};
		const initialEventsHashes: Array<EntryHashB64> = [];

		for (const [entryHash, peerChatEvent] of Object.entries(
			peerChatEntries.events,
		)) {
			const previousEventsHashes =
				peerChatEvent.signed_content.content.previous_peer_chat_events_hashes;
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
		const currentEventsHashes = Object.keys(peerChatEntries.events).filter(
			eventHash => !allEventsWithDescendants.includes(eventHash),
		);

		return {
			status: 'completed',
			value: {
				...peerChatEntries,
				previousToNexts,
				currentEventsHashes,
				initialEventsHashes,
			},
		};
	});

	private peerChatAtEvent = new MemoHoloHashMap(
		(eventHash: EntryHash) =>
			new AsyncComputed<PeerChat>((): AsyncResult<PeerChat> => {
				const entries = this.peerChatEntries.get();
				if (entries.status !== 'completed') return entries;

				const eventHashB64 = encodeHashToBase64(eventHash);

				const event = entries.value.events[eventHashB64];

				const previousEventsHashes =
					event.signed_content.content.previous_peer_chat_events_hashes;

				if (previousEventsHashes.length === 0) {
					const peerChat = apply(
						initialPeerChat(
							entries.value.createPeerChat.signed_content.content,
						),
						event.provenance,
						event.signed_content.content.event,
					);
					return {
						status: 'completed',
						value: peerChat,
					};
				}

				const previousPeerChats = joinAsync(
					previousEventsHashes.map(
						eventHash =>
							this.peerChatAtEvent
								.get(eventHash)
								.get() as AsyncResult<PeerChat>,
					),
				);
				if (previousPeerChats.status !== 'completed') return previousPeerChats;

				let currentPeerChat = previousPeerChats.value[0];
				for (let i = 1; i < previousPeerChats.value.length; i++) {
					currentPeerChat = merge(currentPeerChat, previousPeerChats.value[i]);
				}

				currentPeerChat = apply(
					currentPeerChat,
					event.provenance,
					event.signed_content.content.event,
				);

				return {
					status: 'completed',
					value: currentPeerChat,
				};
			}),
	);

	currentPeerChat = new AsyncComputed<PeerChat>(() => {
		const entries = this.peerChatEntries.get();
		if (entries.status !== 'completed') return entries;

		if (entries.value.currentEventsHashes.length === 0) {
			return {
				status: 'completed',
				value: entries.value.createPeerChat.signed_content.content,
			};
		}

		const previousPeerChats = joinAsync(
			entries.value.currentEventsHashes.map(
				eventHash =>
					this.peerChatAtEvent
						.get(decodeHashFromBase64(eventHash))
						.get() as AsyncResult<PeerChat>,
			),
		);
		if (previousPeerChats.status !== 'completed') return previousPeerChats;

		let currentPeerChat = previousPeerChats.value[0];
		for (let i = 1; i < previousPeerChats.value.length; i++) {
			currentPeerChat = merge(currentPeerChat, previousPeerChats.value[i]);
		}

		return {
			status: 'completed',
			value: currentPeerChat,
		};
	});

	messages = mapCompleted(this.peerChatEntries, e => e.messages);

	events = mapCompleted(this.peerChatEntries, e => e.events);

	readMessages = new AsyncComputed(() => {
		const entries = this.peerChatEntries.get();
		const currentPeerChat = this.currentPeerChat.get();
		if (entries.status !== 'completed') return entries;
		if (currentPeerChat.status !== 'completed') return currentPeerChat;

		const imPeer1 = !!currentPeerChat.value.peer_1.agents.find(
			a =>
				encodeHashToBase64(a) ===
				encodeHashToBase64(this.messengerStore.client.client.myPubKey),
		);
		const me = imPeer1
			? currentPeerChat.value.peer_1
			: currentPeerChat.value.peer_2;

		let myReadMessages: EntryHashB64[] = [];
		let theirReadMessages: EntryHashB64[] = [];

		for (const readMessages of Object.values(entries.value.readMessages)) {
			if (
				me.agents.find(
					a =>
						encodeHashToBase64(a) ===
						encodeHashToBase64(readMessages.provenance),
				)
			) {
				myReadMessages = [
					...myReadMessages,
					...readMessages.signed_content.content.read_messages_hashes.map(
						encodeHashToBase64,
					),
				];
			} else {
				theirReadMessages = [
					...theirReadMessages,
					...readMessages.signed_content.content.read_messages_hashes.map(
						encodeHashToBase64,
					),
				];
			}
		}

		return {
			status: 'completed' as const,
			value: {
				myReadMessages: Array.from(new Set(myReadMessages)),
				theirReadMessages: Array.from(new Set(theirReadMessages)),
			},
		};
	});

	summary = new AsyncComputed<PeerChatSummary>(() => {
		const entries = this.peerChatEntries.get();
		const currentPeerChat = this.currentPeerChat.get();
		const readMessages = this.readMessages.get();
		if (entries.status !== 'completed') return entries;
		if (currentPeerChat.status !== 'completed') return currentPeerChat;
		if (readMessages.status !== 'completed') return readMessages;

		const imPeer1 = !!currentPeerChat.value.peer_1.agents.find(
			a =>
				encodeHashToBase64(a) ===
				encodeHashToBase64(this.messengerStore.client.client.myPubKey),
		);
		const me = imPeer1
			? currentPeerChat.value.peer_1
			: currentPeerChat.value.peer_2;
		const peer = imPeer1
			? currentPeerChat.value.peer_2
			: currentPeerChat.value.peer_1;

		const myUnreadMessages = Object.entries(entries.value.messages)
			.filter(
				([messageHash, message]) =>
					!readMessages.value.myReadMessages.includes(messageHash) &&
					!me.agents.find(
						a =>
							encodeHashToBase64(a) === encodeHashToBase64(message.provenance),
					),
			)
			.map(([hash, _]) => hash);

		const allActivity: PeerChatEntry[] = [
			...Object.values(entries.value.messages).map(m => ({
				...m,
				signed_content: {
					content: {
						type: 'PeerMessage' as const,
						...m.signed_content.content,
					},
					timestamp: m.signed_content.timestamp,
				},
			})),
			{
				...entries.value.createPeerChat,
				signed_content: {
					content: {
						type: 'CreatePeerChat' as const,
						...entries.value.createPeerChat.signed_content.content,
					},
					timestamp: entries.value.createPeerChat.signed_content.timestamp,
				},
			},
			// ...Object.values(entries.value.events).map(e => ({
			// 	...e,
			// 	signed_content: {
			// 		content: {
			// 			type: 'PeerChatEvent' as const,
			// 			...e.signed_content.content,
			// 		},
			// 		timestamp: e.signed_content.timestamp,
			// 	},
			// })),
		];

		const lastActivity = allActivity.sort(
			(m1, m2) => m2.signed_content.timestamp - m1.signed_content.timestamp,
		)[0];

		return {
			status: 'completed',
			value: {
				peerChatHash: this.peerChatHash,
				lastActivity,
				me,
				peer,
				myUnreadMessages,
			},
		};
	});

	async sendMessage(message: Message): Promise<EntryHash> {
		const entries = await toPromise(this.peerChatEntries);

		return this.messengerStore.client.sendPeerMessage(
			this.peerChatHash,
			entries.currentEventsHashes.map(decodeHashFromBase64),
			message,
		);
	}

	async markMessagesAsRead(messagesHashes: EntryHash[]): Promise<void> {
		const entries = await toPromise(this.peerChatEntries);

		return this.messengerStore.client.markPeerMessagesAsRead(
			this.peerChatHash,
			entries.currentEventsHashes.map(decodeHashFromBase64),
			messagesHashes,
		);
	}

	async notifyNewPeerAgent(
		newAgent: AgentPubKey,
		proofs: Array<LinkedDevicesProof>,
	) {
		const entries = await toPromise(this.peerChatEntries);
		return this.messengerStore.client.createPeerChatEvent({
			peer_chat_hash: this.peerChatHash,
			previous_peer_chat_events_hashes:
				entries.currentEventsHashes.map(decodeHashFromBase64),
			event: {
				type: 'NewPeerAgent',
				new_agent: newAgent,
				proofs,
			},
		});
	}
}

function apply(
	peerChat: PeerChat,
	provenance: AgentPubKey,
	event: PeerEvent,
): PeerChat {
	const isPeer1 = !!peerChat.peer_1.agents.find(
		a => encodeHashToBase64(a) === encodeHashToBase64(provenance),
	);
	switch (event.type) {
		case 'NewPeerAgent':
			if (isPeer1) {
				peerChat.peer_1.agents.push(event.new_agent);
			} else {
				peerChat.peer_2.agents.push(event.new_agent);
			}
			break;
		case 'UpdateProfile':
			if (isPeer1) {
				peerChat.peer_1.profile = event;
			} else {
				peerChat.peer_2.profile = event;
			}

			break;
	}

	return peerChat;
}

function merge(peerChat1: PeerChat, peerChat2: PeerChat): PeerChat {
	const profile1 = mergeProfiles(
		peerChat1.peer_1.profile,
		peerChat2.peer_1.profile,
	);
	const profile2 = mergeProfiles(
		peerChat1.peer_2.profile,
		peerChat2.peer_2.profile,
	);

	const agents1 = uniquify([
		...peerChat1.peer_1.agents,
		...peerChat2.peer_1.agents,
	]);
	const agents2 = uniquify([
		...peerChat1.peer_2.agents,
		...peerChat2.peer_2.agents,
	]);

	return {
		peer_1: {
			agents: agents1,
			profile: profile1,
		},
		peer_2: {
			agents: agents2,
			profile: profile2,
		},
	};
}

function initialPeerChat(createPeerChat: CreatePeerChat): PeerChat {
	return {
		peer_1: {
			agents: createPeerChat.peer_1.agents,
			profile: createPeerChat.peer_1.profile,
		},
		peer_2: {
			agents: createPeerChat.peer_2.agents,
			profile: createPeerChat.peer_2.profile,
		},
	};
}

export interface PeerChatSummary {
	peerChatHash: EntryHash;

	me: Peer;
	peer: Peer;

	lastActivity: PeerChatEntry;
	myUnreadMessages: Array<EntryHashB64>;
}
