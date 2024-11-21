import {
	AgentPubKey,
	AgentPubKeyB64,
	EntryHashB64,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import '@lit-labs/virtualizer';
import { LitVirtualizer } from '@lit-labs/virtualizer';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { SlTextarea } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/format-date/format-date.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import { hashProperty, notifyError, sharedStyles } from '@tnesh-stack/elements';
import '@tnesh-stack/elements/dist/elements/display-error.js';
import { SignalWatcher, joinAsync } from '@tnesh-stack/signals';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ref } from 'lit/directives/ref.js';

import { messengerStoreContext } from '../context.js';
import { MessageSet, orderInMessageSets } from '../message-set.js';
import { MessengerStore } from '../messenger-store.js';
import { messengerStyles } from '../styles.js';
import { GroupMessage, Message, PeerMessage, Signed } from '../types.js';
import './message-input.js';

@localized()
@customElement('peer-chat')
export class PeerChat extends SignalWatcher(LitElement) {
	@property(hashProperty('peer'))
	peer!: AgentPubKey;

	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	private renderTypingIndicator() {
		return html`
			<div class="row">
				<div class="typing-indicator">
					<span>...</span>
				</div>
			</div>
		`;
	}

	initVirtualizer = false;

	private renderChat(
		messages: Record<EntryHashB64, Signed<PeerMessage>>,
		myAgents: AgentPubKey[],
		theirAgents: AgentPubKey[],
		peerIsTyping: boolean,
		myReadMessages: Array<EntryHashB64>,
	) {
		const myAgentsB64 = myAgents.map(encodeHashToBase64);
		const messageSets = orderInMessageSets(messages, [myAgents, theirAgents]);

		return html`<div class="column" style="flex: 1;">
			<div
				style="padding-right: 8px; padding-left: 8px; flex: 1; display: flex; flex-direction: column-reverse"
			>
				${peerIsTyping ? this.renderTypingIndicator() : html``}
				<lit-virtualizer
					style="opacity: 0"
					${ref(el => {
						if (!el || this.initVirtualizer) return;
						this.initVirtualizer = true;
						const virtualizer = el as LitVirtualizer;
						setTimeout(() => {
							virtualizer.scrollTo({
								top: virtualizer.scrollHeight,
								behavior: 'instant',
							});
							virtualizer.style.opacity = '1';
						});
					})}
					id="scrolling-chat"
					.items=${messageSets}
					.renderItem=${(messageSet: MessageSet<PeerMessage>) =>
						this.renderMessageSet(messageSet, myReadMessages, myAgentsB64)}
				>
				</lit-virtualizer>
			</div>
			<message-input
				@input=${() =>
					this.store.client.sendPeerChatTypingIndicator(theirAgents)}
				@send-message=${(e: CustomEvent) =>
					this.sendMessage(e.detail.message as Message)}
			></message-input>
		</div> `;
	}

	private renderMessageSet(
		messageSet: MessageSet<PeerMessage>,
		myReadMessages: Array<EntryHashB64>,
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
				${ref(() => {
					if (fromMe) return;
					const unreadMessages = messageSet.messages
						.map(([hash]) => hash)
						.filter(messageHash => !myReadMessages.includes(messageHash));
					if (unreadMessages.length > 0) {
						this.store.client.markPeerMessagesAsRead(
							this.peer,
							unreadMessages.map(decodeHashFromBase64),
						);
					}
				})}
				class=${classMap({
					'from-me': fromMe,
					column: true,
				})}
				style="align-items: start;"
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
							${i === messageSet.messages.length - 1
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
			await this.store.client.sendPeerMessage(this.peer, message);

			const virtualizer = this.shadowRoot!.getElementById(
				'scrolling-chat',
			)! as LitVirtualizer;

			setTimeout(() => {
				virtualizer.scrollTo({
					top: virtualizer.scrollHeight,
					behavior: 'smooth',
				});
			});
		} catch (e) {
			console.log(e);
			notifyError(msg(`Error sending the message`));
		}
	}

	render() {
		const messages = this.store.peerChats.get(this.peer).get();
		switch (messages.status) {
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
					.error=${messages.error}
				></display-error>`;
			case 'completed':
				return this.renderChat(
					messages.value.messages,
					messages.value.myAgentSet,
					messages.value.theirAgentSet,
					messages.value.peerIsTyping,
					messages.value.myReadMessages,
				);
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
