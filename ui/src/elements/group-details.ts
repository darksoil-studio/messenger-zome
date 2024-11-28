import '@darksoil-studio/file-storage-zome/dist/elements/show-image.js';
import { EntryHash } from '@holochain/client';
import { consume } from '@lit/context';
import { msg } from '@lit/localize';
import { mdiInformationOutline } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import SlSwitch from '@shoelace-style/shoelace/dist/components/switch/switch.js';
import { hashProperty, wrapPathInSvg } from '@tnesh-stack/elements';
import '@tnesh-stack/elements/dist/elements/display-error.js';
import { SignalWatcher } from '@tnesh-stack/signals';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { messengerStoreContext } from '../context';
import { MessengerStore } from '../messenger-store';
import { messengerStyles } from '../styles';
import { GroupChat } from '../types';
import './group-info.js';
import './group-members.js';
import './group-settings.js';

@customElement('group-details')
export class GroupDetails extends SignalWatcher(LitElement) {
	@property(hashProperty('group-chat-hash'))
	groupChatHash!: EntryHash;

	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	private renderDetails(details: GroupChat | undefined) {
		if (!details) {
			return html`<div
				class="column placeholder"
				style="flex: 1; align-items: center; justify-content: center"
			>
				<div
					class="column"
					style="align-items: center; justify-content: center; gap: 8px"
				>
					<sl-icon
						.src=${wrapPathInSvg(mdiInformationOutline)}
						style="height: 64px; width: 64px"
					></sl-icon>
					<span>${msg('Group chat not found.')}</span>
				</div>
			</div>`;
		}
		return html`
			<div class="column" style="gap: 8px">
				<group-info .groupChatHash=${this.groupChatHash}></group-info>
				<group-members .groupChatHash=${this.groupChatHash}></group-members>
				<group-settings .groupChatHash=${this.groupChatHash}></group-settings>
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
					.headline=${msg('Error fetching the details for this group')}
					.error=${groupChat.error}
				></display-error>`;
			case 'completed':
				return this.renderDetails(groupChat.value);
		}
	}

	static styles = [messengerStyles];
}
