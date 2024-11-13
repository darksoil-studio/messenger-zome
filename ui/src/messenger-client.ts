import {
	ActionHash,
	AgentPubKey,
	AppClient,
	CreateLink,
	Delete,
	DeleteLink,
	EntryHash,
	EntryHashB64,
	Link,
	SignedActionHashed,
} from '@holochain/client';
import { EntryRecord, ZomeClient } from '@tnesh-stack/utils';

import {
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

	async queryPrivateMessengerEntries(): Promise<
		Record<EntryHashB64, PrivateMessengerEntry>
	> {
		return this.callZome('query_private_messenger_entries', undefined);
	}
}
