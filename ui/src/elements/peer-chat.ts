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
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
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
import { PeerMessage } from '../types.js';

@localized()
@customElement('peer-chat')
export class PeerChat extends SignalWatcher(LitElement) {
	@property()
	peer!: AgentPubKey;

	@consume({ context: messengerStoreContext, subscribe: true })
	private store!: MessengerStore;

	private renderChat(
		myAgents: AgentPubKey[],
		messages: Record<EntryHashB64, PeerMessage>,
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
						style="gap: 4px; padding-right: 8px; padding-left: 8px; align-items: start; flex: 1; display: flex; flex-direction: column-reverse"
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
		message: PeerMessage,
		myAgentsB64: AgentPubKeyB64[],
	) {
		return html` <div
			class=${classMap({
				'from-me': myAgentsB64.includes(encodeHashToBase64(message.provenance)),
				message: true,
				row: true,
			})}
			style="align-items: end; flex-wrap: wrap; gap: 4px; min-width: 60%"
		>
			<span style="flex: 1; word-break: break-all"
				>${message.signed_content.content.message}</span
			>
			<sl-relative-time
				class="placeholder"
				style="font-size: 12px"
				sync
				format="short"
				.date=${new Date(message.signed_content.timestamp / 1000)}
			>
			</sl-relative-time>
		</div>`;
	}

	async sendMessage(message: string) {
		if (!message || message === '') return;

		try {
			await this.store.client.sendPeerMessage(this.peer, message);
			const input = this.shadowRoot!.getElementById('text-input') as SlTextarea;
			input.value = '';

			const scrollingChat = this.shadowRoot!.getElementById('scrolling-chat')!;

			scrollingChat.scrollTo({
				top: scrollingChat.scrollHeight,
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
					pill
					type="text"
					id="text-input"
					resize="auto"
					rows="1"
					style="flex: 1; margin: 2px"
					@keypress=${(event: KeyboardEvent) => {
						console.log(event);
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
				<sl-icon-button
					.src=${wrapPathInSvg(mdiSend)}
					@click=${() => {
						const input = this.shadowRoot!.getElementById(
							'text-input',
						) as SlTextarea;

						this.sendMessage(input.value);
					}}
				></sl-icon-button>
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
				border: 1px solid grey;
				padding: 4px;
				margin: 4px;
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
			:host {
				display: flex;
			}
		`,
	];
}
