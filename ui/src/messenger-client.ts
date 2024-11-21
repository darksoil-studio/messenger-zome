import {
	AgentPubKey,
	AppClient,
	EntryHash,
	EntryHashB64,
} from '@holochain/client';
import { EntryRecord, ZomeClient } from '@tnesh-stack/utils';

import {
	Group,
	Message,
	MessengerSignal,
	PeerMessage,
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

	async sendPeerMessage(recipient: AgentPubKey, message: Message) {
		await this.callZome('send_peer_message', {
			recipient,
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
					signal.app_entry.signed_content.content.message.message ===
					message.message
				)
					resolve(undefined);
			});
		});
	}

	async markPeerMessagesAsRead(
		peer: AgentPubKey,
		readMessagesHashes: Array<EntryHash>,
	) {
		await this.callZome('mark_peer_messages_as_read', {
			peer,
			read_messages_hashes: readMessagesHashes,
		});
	}

	/** Group Chat */

	async createGroupChat(group: Group): Promise<EntryHash> {
		return this.callZome('create_group_chat', group);
	}

	async sendGroupMessage(
		originalGroupHash: EntryHash,
		currentGroupHash: EntryHash,
		message: Message,
	) {
		await this.callZome('send_group_message', {
			original_group_hash: originalGroupHash,
			current_group_hash: currentGroupHash,
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
					signal.app_entry.signed_content.content.message.message ===
					message.message
				)
					resolve(undefined);
			});
		});
	}

	/** Typing Indicator */

	async sendPeerChatTypingIndicator(peerAgentSet: AgentPubKey[]) {
		await this.callZome('send_peer_chat_typing_indicator', peerAgentSet);
	}

	async sendGroupChatTypingIndicator(
		groupHash: EntryHash,
		allMembersAgentsSets: Array<Array<AgentPubKey>>,
	) {
		await this.callZome('send_group_chat_typing_indicator', {
			group_hash: groupHash,
			all_members_agents_sets: allMembersAgentsSets,
		});
	}

	/** Linked Devices */

	async synchronizeWithLinkedDevice(linkedDevice: AgentPubKey) {
		await this.callZome('synchronize_with_linked_device', linkedDevice);
	}
}
