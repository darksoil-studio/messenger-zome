import {
	AgentPubKey,
	AgentPubKeyB64,
	EntryHashB64,
	encodeHashToBase64,
} from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiSend } from '@mdi/js';
import { SlTextarea } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/format-date/format-date.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import {
	notifyError,
	sharedStyles,
	wrapPathInSvg,
} from '@tnesh-stack/elements';
import '@tnesh-stack/elements/dist/elements/display-error.js';
import { SignalWatcher, joinAsync } from '@tnesh-stack/signals';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ref } from 'lit/directives/ref.js';

import { messengerStoreContext } from '../context.js';
import { MessengerStore } from '../messenger-store.js';
import { PeerMessage, Signed } from '../types.js';

@localized()
@customElement('peer-chat')
export class PeerChat extends SignalWatcher(LitElement) {
	@property()
	peer!: AgentPubKey;

	@consume({ context: messengerStoreContext, subscribe: true })
	private store!: MessengerStore;

	private renderChat(
		myAgents: AgentPubKey[],
		messages: Record<EntryHashB64, Signed<PeerMessage>>,
	) {
		const orderedMessages = Object.entries(messages).sort(
			(m1, m2) =>
				m2[1].signed_content.timestamp - m1[1].signed_content.timestamp,
		);
		const myAgentsB64 = myAgents.map(encodeHashToBase64);

		return html`<div class="column" style="flex: 1; margin-top: 12px">
			<div class="flex-scrollable-parent">
				<div class="flex-scrollable-container">
					<div
						class="flex-scrollable-y"
						id="scrolling-chat"
						style="padding-right: 4px; padding-left: 4px; align-items: start; flex: 1; display: flex; flex-direction: column-reverse"
					>
						${orderedMessages.map(([messageHash, message]) =>
							this.renderMessage(messageHash, message, myAgentsB64),
						)}
					</div>
				</div>
			</div>
			${this.renderTextInput()}
		</div> `;
	}

	private renderMessage(
		messageHash: EntryHashB64,
		message: Signed<PeerMessage>,
		myAgentsB64: AgentPubKeyB64[],
	) {
		const timestamp = message.signed_content.timestamp / 1000;
		const date = new Date(timestamp);
		const lessThanAMinuteAgo = Date.now() - timestamp < 60 * 1000;
		const moreThanAnHourAgo = Date.now() - timestamp > 46 * 60 * 1000;
		return html` <div
			class=${classMap({
				'from-me': myAgentsB64.includes(encodeHashToBase64(message.provenance)),
				message: true,
				row: true,
			})}
			style="align-items: end; flex-wrap: wrap; gap: 8px;"
		>
			<span style="flex: 1; word-break: break-all"
				>${message.signed_content.content.message.message}</span
			>
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
								<sl-relative-time style="" sync format="short" .date=${date}>
								</sl-relative-time>
							`}
			</div>
		</div>`;
	}

	async sendMessage(message: string) {
		if (!message || message === '') return;

		try {
			await this.store.client.sendPeerMessage(this.peer, {
				message,
				reply_to: undefined,
			});
			const input = this.shadowRoot!.getElementById('text-input') as SlTextarea;
			input.value = '';

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

	private renderTextInput() {
		return html`
			<div class="row" style="align-items: center;">
				<sl-textarea
					type="text"
					id="text-input"
					resize="auto"
					rows="1"
					style="flex: 1; margin: 2px"
					@keypress=${(event: KeyboardEvent) => {
						if (event.key === 'Enter') {
							const input = this.shadowRoot!.getElementById(
								'text-input',
							) as SlTextarea;

							this.sendMessage(input.value);
							event.preventDefault();
						}
					}}
				>
				</sl-textarea>
				<sl-button
					variant="primary"
					circle
					@click=${() => {
						const input = this.shadowRoot!.getElementById(
							'text-input',
						) as SlTextarea;

						this.sendMessage(input.value);
					}}
				>
					<sl-icon .src=${wrapPathInSvg(mdiSend)}></sl-icon>
				</sl-button>
			</div>
		`;
	}

	render() {
		const messages = joinAsync([
			this.store.allMyAgents.get(),
			this.store.peerChat.get(this.peer).get(),
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
					tooltip
					.headline=${msg('Error fetching the messages')}
					.error=${messages.error}
				></display-error>`;
			case 'completed':
				return this.renderChat(messages.value[0], messages.value[1]);
		}
	}

	static styles = [
		sharedStyles,
		css`
			.message {
				border-radius: 4px;
				border: 1px solid lightgrey;
				padding: 4px;
				margin: 2px;
				box-shadow: rgba(149, 157, 165, 0.2) 2px 2px 4px;
				background-color: var(--sl-color-neutral-100, white);
			}
			.from-me {
				background-color: var(--sl-color-primary-600, blue);
				align-self: end;
				color: var(--sl-color-neutral-0, white);
			}
			.from-me sl-relative-time {
				color: var(--sl-color-neutral-100, white);
			}
			.from-me sl-format-date {
				color: var(--sl-color-neutral-100, white);
			}
			.from-me span {
				color: var(--sl-color-neutral-100, white);
			}
			:host {
				display: flex;
				font-size: 14px;
			}
			sl-textarea::part(base) {
				border-radius: 20px;
			}
		`,
	];
}
