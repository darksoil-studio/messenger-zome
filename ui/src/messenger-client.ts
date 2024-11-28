import {
	AgentPubKey,
	AppClient,
	EntryHash,
	EntryHashB64,
	encodeHashToBase64,
} from '@holochain/client';
import { ZomeClient } from '@tnesh-stack/utils';

import {
	CreateGroupChat,
	CreatePeerChat,
	GroupChatEvent,
	GroupInfo,
	GroupSettings,
	Message,
	MessengerSignal,
	PeerChat,
	PeerChatEvent,
	PrivateMessengerEntry,
} from './types.js';

export class MessengerClient extends ZomeClient<MessengerSignal> {
	constructor(
		public client: AppClient,
		public roleName: string,
		public zomeName = 'messenger',
	) {
		super(client, roleName, zomeName);
	}

	async queryPrivateMessengerEntries(): Promise<
		Record<EntryHashB64, PrivateMessengerEntry>
	> {
		return this.callZome('query_private_messenger_entries', undefined);
	}

	/** Peer Chat */

	async createPeerChat(peer: AgentPubKey): Promise<EntryHash> {
		return this.callZome('create_peer_chat', peer);
	}

	async sendPeerMessage(
		peerChatHash: EntryHash,
		currentPeerChatEventsHashes: Array<EntryHash>,
		message: Message,
	): Promise<EntryHash> {
		const entryHash: EntryHash = await this.callZome('send_peer_message', {
			peer_chat_hash: peerChatHash,
			current_peer_chat_events_hashes: currentPeerChatEventsHashes,
			message,
		});

		return new Promise(resolve => {
			this.onSignal(signal => {
				if (
					signal.type !== 'EntryCreated' ||
					signal.app_entry.type !== 'PrivateMessengerEntry' ||
					signal.app_entry.signed_content.content.type !== 'PeerMessage'
				)
					return;
				if (
					encodeHashToBase64(signal.action.hashed.content.entry_hash) ===
					encodeHashToBase64(entryHash)
				)
					resolve(entryHash);
			});
		});
	}

	async markPeerMessagesAsRead(
		peerChatHash: EntryHash,
		currentPeerChatEventsHashes: Array<EntryHash>,
		readMessagesHashes: Array<EntryHash>,
	) {
		await this.callZome('mark_peer_messages_as_read', {
			peer_chat_hash: peerChatHash,
			current_peer_chat_events_hashes: currentPeerChatEventsHashes,
			read_messages_hashes: readMessagesHashes,
		});
	}

	async createPeerChatEvent(peerChatEvent: PeerChatEvent) {
		return this.callZome('create_peer_chat_event', peerChatEvent);
	}

	/** Group Chat */

	async createGroupChat(
		otherMembers: Array<AgentPubKey>,
		info: GroupInfo,
		settings: GroupSettings,
	): Promise<EntryHash> {
		return this.callZome('create_group_chat', {
			others: otherMembers,
			info,
			settings,
		});
	}

	async createGroupChatEvent(groupChatEvent: GroupChatEvent) {
		return this.callZome('create_group_chat_event', groupChatEvent);
	}

	async sendGroupMessage(
		groupChatHash: EntryHash,
		currentGroupChatEventsHashes: EntryHash[],
		message: Message,
	): Promise<EntryHash> {
		const entryHash: EntryHash = await this.callZome('send_group_message', {
			group_chat_hash: groupChatHash,
			current_group_chat_events_hashes: currentGroupChatEventsHashes,
			message,
		});

		return new Promise(resolve => {
			this.onSignal(signal => {
				if (
					signal.type !== 'EntryCreated' ||
					signal.app_entry.type !== 'PrivateMessengerEntry' ||
					signal.app_entry.signed_content.content.type !== 'GroupMessage'
				)
					return;
				if (
					encodeHashToBase64(signal.action.hashed.content.entry_hash) ===
					encodeHashToBase64(entryHash)
				)
					resolve(entryHash);
			});
		});
	}

	async markGroupMessagesAsRead(
		groupChatHash: EntryHash,
		currentGroupChatEventsHashes: EntryHash[],
		readMessagesHashes: Array<EntryHash>,
	) {
		await this.callZome('mark_group_messages_as_read', {
			group_chat_hash: groupChatHash,
			current_group_chat_events_hashes: currentGroupChatEventsHashes,
			read_messages_hashes: readMessagesHashes,
		});
	}

	/** Typing Indicator */

	async sendPeerChatTypingIndicator(
		peerChatHash: EntryHash,
		peerAgents: AgentPubKey[],
	) {
		await this.callZome('send_peer_chat_typing_indicator', {
			peer_agents: peerAgents,
			peer_chat_hash: peerChatHash,
		});
	}

	async sendGroupChatTypingIndicator(
		groupHash: EntryHash,
		allAgents: Array<Array<AgentPubKey>>,
	) {
		await this.callZome('send_group_chat_typing_indicator', {
			group_hash: groupHash,
			all_agents: allAgents,
		});
	}

	/** Linked Devices */

	async synchronizeWithLinkedDevice(linkedDevice: AgentPubKey) {
		await this.callZome('synchronize_with_linked_device', linkedDevice);
	}
}
