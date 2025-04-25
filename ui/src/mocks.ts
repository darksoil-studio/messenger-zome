import { SignedEvent } from '@darksoil-studio/private-event-sourcing-zome';
import {
	AgentPubKey,
	AppClient,
	EntryHashB64,
	encodeHashToBase64,
} from '@holochain/client';
import { HashType, ZomeMock, fakeCreateAction, hash } from '@darksoil-studio/holochain-utils';

import {
	CreateGroupChat,
	CreatePeerChat,
	GroupChatEvent,
	GroupInfo,
	GroupMessage,
	GroupSettings,
	MessengerEvent,
	PeerChatEvent,
	PeerMessage,
	ReadGroupMessages,
	ReadPeerMessages,
} from './types.js';

export class MessengerZomeMock extends ZomeMock implements AppClient {
	constructor(myPubKey?: AgentPubKey) {
		super('messenger_test', 'messenger', 'messenger_test', myPubKey);
	}

	entries: Record<EntryHashB64, SignedEvent<MessengerEvent>> = {};

	async query_private_messenger_entries() {
		return this.entries;
	}

	private async createPrivateEntry(
		entry:
			| ({ type: 'CreatePeerChat' } & CreatePeerChat)
			| ({ type: 'PeerChatEvent' } & PeerChatEvent)
			| ({ type: 'PeerMessage' } & PeerMessage)
			| ({ type: 'ReadPeerMessages' } & ReadPeerMessages)
			| ({ type: 'CreateGroupChat' } & CreateGroupChat)
			| ({ type: 'GroupChatEvent' } & GroupChatEvent)
			| ({ type: 'GroupMessage' } & GroupMessage)
			| ({ type: 'ReadGroupMessages' } & ReadGroupMessages),
	) {
		const privateentry: SignedEvent<MessengerEvent> = {
			author: this.myPubKey,
			signature: new Uint8Array(),
			event: {
				// eslint-disable-next-line
				content: entry as any,
				timestamp: Date.now() * 1000,
			},
		};

		const entryHash = hash(privateentry, HashType.ENTRY);
		this.entries[encodeHashToBase64(entryHash)] = privateentry;

		const action = await fakeCreateAction(entryHash);
		setTimeout(() => {
			this.emitSignal({
				type: 'EntryCreated',
				app_entry: {
					type: 'PrivateMessengerEntry',
					...privateentry,
				},
				action: {
					hashed: {
						content: action,
					},
				},
			});
		});
		return entryHash;
	}

	async create_group_chat({
		others,
		info,
		settings,
	}: {
		others: Array<AgentPubKey>;
		info: GroupInfo;
		settings: GroupSettings;
	}) {
		const entry: CreateGroupChat = {
			info,
			settings,
			me: {
				agents: [this.myPubKey],
				profile: undefined,
				proofs: [],
			},
			others: others.map(o => ({
				agents: [o],
				profile: undefined,
				proofs: [],
			})),
		};
		return this.createPrivateEntry({
			type: 'CreateGroupChat',
			...entry,
		});
	}

	async create_group_event(groupEvent: GroupChatEvent) {
		return this.createPrivateEntry({
			type: 'GroupChatEvent',
			...groupEvent,
		});
	}

	async send_group_message(message: GroupMessage) {
		return this.createPrivateEntry({
			type: 'GroupMessage',
			...message,
		});
	}

	async mark_group_messages_as_read(read: ReadGroupMessages) {
		return this.createPrivateEntry({
			type: 'ReadGroupMessages',
			...read,
		});
	}

	async create_peer_chat(peer: AgentPubKey) {
		const entry: CreatePeerChat = {
			peer_1: {
				agents: [this.myPubKey],
				proofs: [],
			},
			peer_2: {
				agents: [peer],
				proofs: [],
			},
		};
		return this.createPrivateEntry({
			type: 'CreatePeerChat',
			...entry,
		});
	}

	async create_peer_event(peerEvent: PeerChatEvent) {
		return this.createPrivateEntry({
			type: 'PeerChatEvent',
			...peerEvent,
		});
	}

	async send_peer_message(message: PeerMessage) {
		return this.createPrivateEntry({
			type: 'PeerMessage',
			...message,
		});
	}

	async mark_peer_messages_as_read(read: ReadPeerMessages) {
		return this.createPrivateEntry({
			type: 'ReadPeerMessages',
			...read,
		});
	}

	async send_group_chat_typing_indicator() {}
	async send_peer_chat_typing_indicator() {}
}
