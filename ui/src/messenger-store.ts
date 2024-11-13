import { LinkedDevicesStore } from '@darksoil-studio/linked-devices-zome';
import {
	ActionHash,
	AgentPubKey,
	EntryHash,
	EntryHashB64,
	NewEntryAction,
	encodeHashToBase64,
} from '@holochain/client';
import {
	AsyncComputed,
	AsyncResult,
	AsyncState,
	Signal,
	allRevisionsOfEntrySignal,
	collectionSignal,
	deletedLinksSignal,
	deletesForEntrySignal,
	immutableEntrySignal,
	latestVersionOfEntrySignal,
	liveLinksSignal,
	pipe,
} from '@tnesh-stack/signals';
import {
	EntryRecord,
	HashType,
	MemoHoloHashMap,
	retype,
	slice,
} from '@tnesh-stack/utils';

import { MessengerClient } from './messenger-client.js';
import { PeerMessage, PrivateMessengerEntry, Signed } from './types.js';
import { asyncReadable } from './utils.js';

export class MessengerStore {
	constructor(
		public client: MessengerClient,
		public linkedDevicesStore?: LinkedDevicesStore,
	) {}

	private privateMessengerEntries = asyncReadable<
		Record<EntryHashB64, PrivateMessengerEntry>
	>(async set => {
		const messages = await this.client.queryPrivateMessengerEntries();

		set(messages);

		this.client.onSignal(signal => {
			if (
				signal.type !== 'EntryCreated' ||
				signal.app_entry.type !== 'PrivateMessengerEntry'
			)
				return;
			messages[encodeHashToBase64(signal.action.hashed.content.entry_hash)] =
				signal.app_entry;
			set(messages);
		});
	});

	private allPeerMessages = new AsyncComputed(() => {
		const privateMessengerEntries = this.privateMessengerEntries.get();
		if (privateMessengerEntries.status !== 'completed')
			return privateMessengerEntries;

		const peerMessages: Record<EntryHashB64, Signed<PeerMessage>> = {};
		for (const [entryHash, privateMessengerEntry] of Object.entries(
			privateMessengerEntries.value,
		)) {
			if (privateMessengerEntry.signed_content.content.type === 'PeerMessage') {
				peerMessages[entryHash] = privateMessengerEntry;
			}
		}

		return {
			status: 'completed',
			value: peerMessages,
		};
	});

	peerConversations = new AsyncComputed(() => {
		const messages = this.privateMessengerEntries.get();
		if (messages.status !== 'completed') return messages;

		const conversations: Array<Array<AgentPubKey>> = [];

		for (const [messageHash, message] of Object.entries(messages.value)) {
		}

		return {
			status: 'completed',
			value: conversations,
		};
	});

	private allAgentsFor = new MemoHoloHashMap((agent: AgentPubKey) => {
		if (this.linkedDevicesStore) {
			return new AsyncComputed(() => {
				const devices =
					this.linkedDevicesStore!.linkedDevicesForAgent.get(agent).get();
				if (devices.status !== 'completed') return devices;

				return {
					status: 'completed',
					value: [agent, ...devices.value],
				};
			});
		} else {
			return new AsyncState({ status: 'completed', value: [agent] });
		}
	});

	allMyAgents = this.allAgentsFor.get(this.client.client.myPubKey);

	peerChat = new MemoHoloHashMap(
		(agent: AgentPubKey) =>
			new AsyncComputed(() => {
				const messages = this.allPeerMessages.get();
				const theirAgents = this.allAgentsFor.get(agent).get();
				if (messages.status !== 'completed') return messages;
				if (theirAgents.status !== 'completed') return theirAgents;

				const agentMessages: Record<EntryHashB64, Signed<PeerMessage>> = {};
				const theirAgentsB64 = theirAgents.value.map(encodeHashToBase64);

				for (const [messageHash, message] of Object.entries(messages.value)) {
					const messageFromThem = theirAgentsB64.includes(
						encodeHashToBase64(message.provenance),
					);
					const messageForThem = theirAgentsB64.includes(
						encodeHashToBase64(message.signed_content.content.recipient),
					);

					if (messageForThem || messageFromThem) {
						agentMessages[messageHash] = message;
					}
				}

				return {
					status: 'completed',
					value: agentMessages,
				};
			}),
	);
}
