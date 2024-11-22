import {
	AgentPubKey,
	AppClient,
	EntryHash,
	EntryHashB64,
	encodeHashToBase64,
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
		const privateEntries = await this.callZome(
			'query_private_messenger_entries',
			undefined,
		);
		return privateEntries.entries;
	}

	/** Peer Chat */

	async sendPeerMessage(
		recipient: AgentPubKey,
		message: Message,
	): Promise<EntryHash> {
		const entryHash: EntryHash = await this.callZome('send_peer_message', {
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
					encodeHashToBase64(signal.action.hashed.content.entry_hash) ===
					encodeHashToBase64(entryHash)
				)
					resolve(entryHash);
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

	async updateGroupChat(
		originalGroupHash: EntryHash,
		previousGroupHashes: Array<EntryHash>,
		group: Group,
	): Promise<EntryHash> {
		return this.callZome('update_group_chat', {
			original_group_hash: originalGroupHash,
			previous_group_hashes: previousGroupHashes,
			group,
		});
	}

	async deleteGroupChat(
		originalGroupHash: EntryHash,
		previousGroupHash: EntryHash,
	): Promise<void> {
		return this.callZome('delete_group_chat', {
			original_group_hash: originalGroupHash,
			previous_group_hash: previousGroupHash,
		});
	}

	async sendGroupMessage(
		originalGroupHash: EntryHash,
		currentGroupHash: EntryHash,
		message: Message,
	): Promise<EntryHash> {
		const entryHash: EntryHash = await this.callZome('send_group_message', {
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
					encodeHashToBase64(signal.action.hashed.content.entry_hash) ===
					encodeHashToBase64(entryHash)
				)
					resolve(entryHash);
			});
		});
	}

	async markGroupMessagesAsRead(
		originalGroupHash: EntryHash,
		currentGroupHash: EntryHash,
		readMessagesHashes: Array<EntryHash>,
	) {
		await this.callZome('mark_group_messages_as_read', {
			original_group_hash: originalGroupHash,
			current_group_hash: currentGroupHash,
			read_messages_hashes: readMessagesHashes,
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
