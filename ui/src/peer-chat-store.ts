import {
	AsyncComputed,
	AsyncResult,
	Signal,
	joinAsync,
	mapCompleted,
	toPromise,
	uniquify,
} from '@darksoil-studio/holochain-signals';
import { MemoHoloHashMap } from '@darksoil-studio/holochain-utils';
import { LinkedDevicesProof } from '@darksoil-studio/linked-devices-zome';
import {
	SignedEntry,
	SignedEvent,
} from '@darksoil-studio/private-event-sourcing-zome';
import {
	AgentPubKey,
	EntryHash,
	EntryHashB64,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import { msg } from '@lit/localize';
import { decode } from '@msgpack/msgpack';

import { MessengerStore } from './messenger-store.js';
import {
	CreatePeerChat,
	Message,
	MessengerEvent,
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
			} else if (signal.type === 'NewPrivateEvent') {
				const event = decode(
					signal.private_event_entry.payload.content.event,
				) as MessengerEvent;
				if (
					event.type === 'PeerMessage' &&
					encodeHashToBase64(event.peer_chat_hash) ===
						encodeHashToBase64(peerChatHash)
				) {
					this.peerIsTyping.set(false);
					if (timeout) clearTimeout(timeout);
				}
			}
		});
	}

	private peerChatEntries = new AsyncComputed(() => {
		const privateMessengerEntriesResult =
			this.messengerStore.messengerEntries.get();
		if (privateMessengerEntriesResult.status !== 'completed')
			return privateMessengerEntriesResult;

		const peerChatHashB64 = encodeHashToBase64(this.peerChatHash);
		const peerChatEntries =
			privateMessengerEntriesResult.value.peerChats[peerChatHashB64];
		if (!peerChatEntries)
			return {
				status: 'error' as const,
				error: msg('Peer Chat not found'),
			};

		const previousToNexts: Record<EntryHashB64, Array<EntryHashB64>> = {};
		const initialEventsHashes: Array<EntryHashB64> = [];

		for (const [entryHash, peerChatEvent] of Object.entries(
			peerChatEntries.events,
		)) {
			const previousEventsHashes =
				peerChatEvent.payload.content.event.previous_peer_chat_events_hashes;
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

				if (!entries.value.createPeerChat) {
					return {
						status: 'error' as const,
						error: msg('Peer chat not found.'),
					};
				}

				const eventHashB64 = encodeHashToBase64(eventHash);

				const event = entries.value.events[eventHashB64];

				const previousEventsHashes =
					event.payload.content.event.previous_peer_chat_events_hashes;

				if (previousEventsHashes.length === 0) {
					const peerChat = apply(
						initialPeerChat(entries.value.createPeerChat.payload.content.event),
						event.author,
						event.payload.content.event.event,
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
					event.author,
					event.payload.content.event.event,
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
		if (!entries.value.createPeerChat) {
			return {
				status: 'error' as const,
				error: msg('Peer chat not found.'),
			};
		}

		if (entries.value.currentEventsHashes.length === 0) {
			return {
				status: 'completed',
				value: entries.value.createPeerChat.payload.content.event,
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
						encodeHashToBase64(a) === encodeHashToBase64(readMessages.author),
				)
			) {
				myReadMessages = [
					...myReadMessages,
					...readMessages.payload.content.event.read_messages_hashes.map(
						encodeHashToBase64,
					),
				];
			} else {
				theirReadMessages = [
					...theirReadMessages,
					...readMessages.payload.content.event.read_messages_hashes.map(
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
		if (!entries.value.createPeerChat) {
			return {
				status: 'error' as const,
				error: msg('Peer chat not found.'),
			};
		}

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
						a => encodeHashToBase64(a) === encodeHashToBase64(message.author),
					),
			)
			.map(([hash, _]) => hash);

		const allActivity: Array<SignedEntry<PeerChatEntry>> = [
			...Object.values(entries.value.messages).map(m => ({
				...m,
				payload: {
					content: {
						type: 'PeerMessage' as const,
						...m.payload.content.event,
					},
					timestamp: m.payload.timestamp,
				},
			})),
			{
				...entries.value.createPeerChat,
				payload: {
					content: {
						type: 'CreatePeerChat' as const,
						...entries.value.createPeerChat.payload.content.event,
					},
					timestamp: entries.value.createPeerChat.payload.timestamp,
				},
			},
			// ...Object.values(entries.value.events).map(e => ({
			// 	...e,
			// 	event: {
			// 		content: {
			// 			type: 'PeerChatEvent' as const,
			// 			...e.event.content,
			// 		},
			// 		timestamp: e.event.timestamp,
			// 	},
			// })),
		];

		const lastActivity = allActivity.sort(
			(m1, m2) => m2.payload.timestamp - m1.payload.timestamp,
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
		// case 'UpdateProfile':
		// 	if (isPeer1) {
		// 		peerChat.peer_1.profile = event;
		// 	} else {
		// 		peerChat.peer_2.profile = event;
		// 	}

		// 	break;
	}

	return peerChat;
}

function merge(peerChat1: PeerChat, peerChat2: PeerChat): PeerChat {
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
		},
		peer_2: {
			agents: agents2,
		},
	};
}

function initialPeerChat(createPeerChat: CreatePeerChat): PeerChat {
	return {
		peer_1: {
			agents: createPeerChat.peer_1.agents,
		},
		peer_2: {
			agents: createPeerChat.peer_2.agents,
		},
	};
}

export interface PeerChatSummary {
	peerChatHash: EntryHash;

	me: Peer;
	peer: Peer;

	lastActivity: SignedEntry<PeerChatEntry>;
	myUnreadMessages: Array<EntryHashB64>;
}
