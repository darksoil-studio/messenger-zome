import { PrivateEventSourcingClient } from '@darksoil-studio/private-event-sourcing-zome';
import { AgentPubKey, AppClient, EntryHash } from '@holochain/client';

import {
	AgentWithProfile,
	GroupChatEvent,
	GroupInfo,
	GroupSettings,
	Message,
	MessengerProfile,
	MessengerSignal,
	PeerChatEvent,
} from './types.js';

export class MessengerClient extends PrivateEventSourcingClient<MessengerSignal> {
	constructor(
		public client: AppClient,
		public roleName: string,
		public zomeName = 'messenger',
	) {
		super(client, roleName, zomeName);
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
		return this.callZome('send_peer_message', {
			peer_chat_hash: peerChatHash,
			current_peer_chat_events_hashes: currentPeerChatEventsHashes,
			message,
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
		myProfile: MessengerProfile | undefined,
		otherMembers: Array<AgentWithProfile>,
		info: GroupInfo,
		settings: GroupSettings,
	): Promise<EntryHash> {
		return this.callZome('create_group_chat', {
			my_profile: myProfile,
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
		return this.callZome('send_group_message', {
			group_chat_hash: groupChatHash,
			current_group_chat_events_hashes: currentGroupChatEventsHashes,
			message,
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
}
