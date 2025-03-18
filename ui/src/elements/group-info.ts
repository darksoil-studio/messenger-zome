import { EntryHash } from '@holochain/client';
import { consume } from '@lit/context';
import { msg } from '@lit/localize';
import { mdiImageOffOutline } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import { hashProperty, wrapPathInSvg } from '@tnesh-stack/elements';
import '@tnesh-stack/elements/dist/elements/display-error.js';
import { SignalWatcher } from '@tnesh-stack/signals';
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { messengerStoreContext } from '../context';
import { MessengerStore } from '../messenger-store';
import { messengerStyles } from '../styles';
import { GroupInfo } from '../types';

@customElement('group-info')
export class GroupInfoEl extends SignalWatcher(LitElement) {
	@property(hashProperty('group-chat-hash'))
	groupChatHash!: EntryHash;

	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	private renderInfo(info: GroupInfo) {
		return html`
			<div class="column" style="gap: 16px;">
				${info.avatar
					? html`
							<img
								src="${info.avatar}"
								style="height: 150px; object-fit: cover"
							/>
						`
					: html`<sl-icon
							.src=${wrapPathInSvg(mdiImageOffOutline)}
							style="font-size: 64px; border-radius: 50%; align-self: center; height: 150px"
							class="placeholder"
						></sl-icon>`}
				<div class="row">
					<div class="column" style="gap: 8px; flex: 1">
						<span class="title" style="flex: 1">${info.name}</span>
						${info.description
							? html` <span class="placeholder">${info.description}</span> `
							: html``}
					</div>
					<slot name="action"></slot>
				</div>
			</div>
		`;
	}

	render() {
		const groupChat = this.store.groupChats
			.get(this.groupChatHash)
			.currentGroupChat.get();
		switch (groupChat.status) {
			case 'pending':
				return html`
					<div class="column" style="gap: 8px">
						<sl-skeleton style="height: 32px; width: 100px"> </sl-skeleton>
						<sl-skeleton style="height: 32px; width: 100px"> </sl-skeleton>
						<sl-skeleton style="height: 32px; width: 100px"> </sl-skeleton>
					</div>
				`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the info for this group')}
					.error=${groupChat.error}
				></display-error>`;
			case 'completed':
				return this.renderInfo(groupChat.value.info);
		}
	}

	static styles = [messengerStyles];
}
