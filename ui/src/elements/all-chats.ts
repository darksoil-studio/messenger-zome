import { EntryHash } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import { SignalWatcher } from '@tnesh-stack/signals';
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { join } from 'lit/directives/join.js';

import { messengerStoreContext } from '../context.js';
import { Chat, MessengerStore } from '../messenger-store.js';
import { messengerStyles } from '../styles.js';
import { Group } from '../types.js';

@localized()
@customElement('all-chats')
export class AllChats extends SignalWatcher(LitElement) {
	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	renderPeerChat(chat: Chat) {
		return html``;
	}

	renderGroupChat(groupHash: EntryHash, group: Group) {
		return html`<div
			@click=${() => {
				this.dispatchEvent(
					new CustomEvent('group-chat-selected', {
						composed: true,
						bubbles: true,
						detail: {
							groupHash,
						},
					}),
				);
			}}
		>
			<span>${group.info.name}</span>
		</div>`;
	}

	renderChats(chats: Array<Chat>) {
		return html`<div class="column" style="flex: 1; overflow: hidden">
			${join(
				chats.map(chat =>
					chat.type === 'PeerChat'
						? this.renderPeerChat(chat)
						: this.renderGroupChat(chat.groupHash, chat.group),
				),
				html`<sl-divider></sl-divider>`,
			)}
		</div>`;
	}

	render() {
		const chats = this.store.allChats.get();
		switch (chats.status) {
			case 'pending':
				return html`
					<sl-skeleton
						style="height: 32px; width: 32px; --border-radius: 8px"
						effect="pulse"
					></sl-skeleton>
				`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the chats')}
					.error=${chats.error}
				></display-error>`;
			case 'completed':
				return this.renderChats(chats.value);
		}
	}

	static styles = [
		messengerStyles,
		css`
			:host {
				display: flex;
			}
		`,
	];
}
