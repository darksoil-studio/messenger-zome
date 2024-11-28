import {
	LinkedDevicesStore,
	linkedDevicesStoreContext,
} from '@darksoil-studio/linked-devices-zome';
import {
	AgentPubKey,
	AgentPubKeyB64,
	EntryHash,
	EntryHashB64,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { SlTextarea } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/format-date/format-date.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import { hashProperty, notifyError, sharedStyles } from '@tnesh-stack/elements';
import '@tnesh-stack/elements/dist/elements/display-error.js';
import { SignalWatcher, joinAsync, toPromise } from '@tnesh-stack/signals';
import { LitElement, css, html, render } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ref } from 'lit/directives/ref.js';

import { messengerStoreContext } from '../context.js';
import { MessageSet, orderInMessageSets } from '../message-set.js';
import { MessengerStore } from '../messenger-store.js';
import { messengerStyles } from '../styles.js';
import {
	GroupMessage,
	Message,
	PeerChat,
	PeerMessage,
	Signed,
} from '../types.js';
import './message-input.js';

@localized()
@customElement('peer-chat')
export class PeerChatEl extends SignalWatcher(LitElement) {
	@property(hashProperty('peer-chat-hash'))
	peerChatHash!: EntryHash;

	@property(hashProperty('peer'))
	peer: AgentPubKey | undefined;

	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	@consume({ context: linkedDevicesStoreContext, subscribe: true })
	linkedDevicesStore: LinkedDevicesStore | undefined;

	async firstUpdated() {
		if (!this.peer && !this.peerChatHash)
			throw new Error(
				'peer-chat must be initialized with either the "peerChatHash" or the "peer" input.',
			);
		if (this.peer && !this.peerChatHash) {
			const peerChatsForThisPeer = await toPromise(
				this.store.peerChatsForPeer.get(this.peer),
			);

			if (peerChatsForThisPeer.length === 0) {
				const peerDevices = this.linkedDevicesStore
					? await toPromise(
							this.linkedDevicesStore.linkedDevicesForAgent.get(this.peer),
						)
					: [];
				peerDevices.push(this.peer);
				const myDevices = this.linkedDevicesStore
					? await toPromise(this.linkedDevicesStore.myLinkedDevices)
					: [];
				myDevices.push(this.store.client.client.myPubKey);
				this.peerChatHash = await this.store.client.createPeerChat({
					peer_1: {
						agents: myDevices,
						profile: undefined,
					},
					peer_2: {
						agents: peerDevices,
						profile: undefined,
					},
				});
			} else {
				this.peerChatHash = peerChatsForThisPeer[0];
			}
			// TODO: what to do in the case of more than one PeerChat for this one peer?
		}
	}

	private renderTypingIndicator() {
		return html`
			<div class="row">
				<div class="typing-indicator">
					<span>...</span>
				</div>
			</div>
		`;
	}

	private renderChat(
		peerChat: PeerChat,
		messages: Record<EntryHashB64, Signed<PeerMessage>>,
		myReadMessages: Array<EntryHashB64>,
	) {
		const peerIsTyping = this.store.peerChats
			.get(this.peerChatHash)
			.peerIsTyping.get();
		const imPeer1 = peerChat.peer_1.agents.find(
			a =>
				encodeHashToBase64(a) ===
				encodeHashToBase64(this.store.client.client.myPubKey),
		);
		const myAgents = imPeer1 ? peerChat.peer_1.agents : peerChat.peer_2.agents;
		const theirAgents = imPeer1
			? peerChat.peer_2.agents
			: peerChat.peer_1.agents;
		const myAgentsB64 = myAgents.map(encodeHashToBase64);
		const messageSets = orderInMessageSets(messages, [
			peerChat.peer_1.agents,
			peerChat.peer_2.agents,
		]);

		return html`<div class="column" style="flex: 1;">
			<div class="flex-scrollable-parent">
				<div class="flex-scrollable-container">
					<div
						${ref(el => {
							if (!el) return;
							const theirMessageSets = messageSets.filter(
								set =>
									!myAgentsB64.includes(
										encodeHashToBase64(set.messages[0][1].provenance),
									),
							);

							const unreadMessages: EntryHash[] = [];

							for (const messageSet of theirMessageSets) {
								for (const [messageHash, _] of messageSet.messages) {
									if (!myReadMessages.includes(messageHash)) {
										unreadMessages.push(decodeHashFromBase64(messageHash));
									}
								}
							}

							if (unreadMessages.length > 0) {
								this.store.peerChats
									.get(this.peerChatHash)
									.markMessagesAsRead(unreadMessages);
							}
						})}
						class="flex-scrollable-y"
						id="scrolling-chat"
						style="padding-right: 8px; padding-left: 8px; gap: 8px; flex: 1; display: flex; flex-direction: column-reverse"
					>
						<div style="margin-bottom: 4px"></div>
						${peerIsTyping ? this.renderTypingIndicator() : html``}
						${messageSets.map(messageSet =>
							this.renderMessageSet(messageSet, myAgentsB64),
						)}
					</div>
				</div>
			</div>
			<message-input
				@input=${() =>
					this.store.client.sendPeerChatTypingIndicator(
						this.peerChatHash,
						theirAgents,
					)}
				@send-message=${(e: CustomEvent) =>
					this.sendMessage(e.detail.message as Message)}
			></message-input>
		</div> `;
	}

	private renderMessageSet(
		messageSet: MessageSet<PeerMessage>,
		myAgentsB64: AgentPubKeyB64[],
	) {
		const lastMessage = messageSet.messages[0];
		const timestamp = lastMessage[1].signed_content.timestamp / 1000;
		const date = new Date(timestamp);
		const lessThanAMinuteAgo = Date.now() - timestamp < 60 * 1000;
		const moreThanAnHourAgo = Date.now() - timestamp > 46 * 60 * 1000;
		const fromMe = myAgentsB64.includes(
			encodeHashToBase64(lastMessage[1].provenance),
		);
		return html`
			<div
				class=${classMap({
					'from-me': fromMe,
					column: true,
				})}
				style="align-items: start; flex-direction: column-reverse"
			>
				${messageSet.messages.map(
					([messageHash, message], i) => html`
						<div
							class="message row"
							style="align-items: end; flex-wrap: wrap; gap: 8px;"
						>
							<span style="flex: 1; word-break: break-all"
								>${message.signed_content.content.message.message}</span
							>
							${i === 0
								? html`
										<div
											class="placeholder column"
											style="font-size: 12px; width: 4em; height: 14px; overflow: hidden; text-align: right"
										>
											${lessThanAMinuteAgo
												? html`<span>${msg('now')}</span>`
												: moreThanAnHourAgo
													? html`
															<sl-format-date
																hour="numeric"
																minute="numeric"
																hour-format="24"
																.date=${date}
															></sl-format-date>
														`
													: html`
															<sl-relative-time
																style=""
																sync
																format="short"
																.date=${date}
															>
															</sl-relative-time>
														`}
										</div>
									`
								: html``}
						</div>
					`,
				)}
			</div>
		`;
	}

	async sendMessage(message: Message) {
		try {
			await this.store.peerChats.get(this.peerChatHash).sendMessage(message);

			// setTimeout(() => {
			// 	virtualizer.scrollTo({
			// 		top: virtualizer.scrollHeight,
			// 		behavior: 'smooth',
			// 	});
			// });
		} catch (e) {
			console.error(e);
			notifyError(msg(`Error sending the message`));
		}
	}

	get peerChatStore() {
		return this.store.peerChats.get(this.peerChatHash);
	}

	chatInfo() {
		if (!this.peerChatHash) {
			return {
				status: 'pending' as const,
			};
		}
		const chatInfo = joinAsync([
			this.peerChatStore.currentPeerChat.get(),
			this.peerChatStore.messages.get(),
			this.peerChatStore.readMessages.get(),
		]);
		return chatInfo;
	}

	render() {
		const chatInfo = this.chatInfo();

		switch (chatInfo.status) {
			case 'pending':
				return html`
					<sl-skeleton
						style="height: 32px; width: 32px; --border-radius: 8px"
						effect="pulse"
					></sl-skeleton>
				`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the messages')}
					.error=${chatInfo.error}
				></display-error>`;
			case 'completed':
				const [peerChat, messages, readMessages] = chatInfo.value;
				return this.renderChat(peerChat, messages, readMessages.myReadMessages);
		}
	}

	static styles = [
		messengerStyles,
		css`
			:host {
				display: flex;
				font-size: 14px;
			}
		`,
	];
}
