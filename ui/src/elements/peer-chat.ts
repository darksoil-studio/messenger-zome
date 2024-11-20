import {
	AgentPubKey,
	AgentPubKeyB64,
	EntryHashB64,
	encodeHashToBase64,
} from '@holochain/client';
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

import { messengerStoreContext } from '../context.js';
import { MessageSet, orderInMessageSets } from '../message-set.js';
import { MessengerStore } from '../messenger-store.js';
import { messengerStyles } from '../styles.js';
import { Message, PeerMessage, Signed } from '../types.js';
import './message-input.js';

@localized()
@customElement('peer-chat')
export class PeerChat extends SignalWatcher(LitElement) {
	@property(hashProperty('peer'))
	peer!: AgentPubKey;

	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	private renderChat(
		myAgents: AgentPubKey[],
		messages: Record<EntryHashB64, Signed<PeerMessage>>,
	) {
		const myAgentsB64 = myAgents.map(encodeHashToBase64);
		const messageSets = orderInMessageSets(messages);

		return html`<div class="column" style="flex: 1;">
			<div class="flex-scrollable-parent">
				<div class="flex-scrollable-container">
					<div
						class="flex-scrollable-y"
						id="scrolling-chat"
						style="padding-right: 8px; padding-left: 8px; gap: 8px; flex: 1; display: flex; flex-direction: column-reverse"
					>
						<div style="margin-bottom: 4px">
						</div>
						${messageSets.map(messageSet => this.renderMessageSet(messageSet, myAgentsB64))}
					</div>
				</div>
			</div>
			<message-input @send-message=${(e: CustomEvent) => this.sendMessage(e.detail.message as Message)}>
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
			await this.store.client.sendPeerMessage(this.peer, message);

			const scrollingChat = this.shadowRoot!.getElementById('scrolling-chat')!;

			scrollingChat.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		} catch (e) {
			console.log(e);
			notifyError(msg(`Error sending the message`));
		}
	}

	render() {
		const messages = joinAsync([
			this.store.allMyAgents.get(),
			this.store.peerChats.get(this.peer).get(),
		]);
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
				return this.renderChat(messages.value[0], messages.value[1]);
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
