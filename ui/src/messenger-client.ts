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

import { MessengerSignal, PeerMessage } from './types.js';

export class MessengerClient extends ZomeClient<MessengerSignal> {
	constructor(
		public client: AppClient,
		public roleName: string,
		public zomeName = 'messenger',
	) {
		super(client, roleName, zomeName);
	}

	async sendPeerMessage(recipient: AgentPubKey, message: String) {
		await this.callZome('send_peer_message', {
			recipient,
			message,
		});

		return new Promise(resolve => {
			this.onSignal(signal => {
				if (
					signal.type !== 'EntryCreated' ||
					signal.app_entry.type !== 'PeerMessage'
				)
					return;
				if (signal.app_entry.signed_content.content.message === message)
					resolve(undefined);
			});
		});
	}

	async queryPeerMessages(): Promise<Record<EntryHashB64, PeerMessage>> {
		return this.callZome('query_peer_messages', undefined);
	}
}
