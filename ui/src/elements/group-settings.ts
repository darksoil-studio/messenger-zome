import { EntryHash, encodeHashToBase64 } from '@holochain/client';
import { consume } from '@lit/context';
import { msg } from '@lit/localize';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import SlSwitch from '@shoelace-style/shoelace/dist/components/switch/switch.js';
import { hashProperty, notifyError } from '@tnesh-stack/elements';
import '@tnesh-stack/elements/dist/elements/display-error.js';
import { SignalWatcher } from '@tnesh-stack/signals';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { messengerStoreContext } from '../context';
import { MessengerStore } from '../messenger-store';
import { messengerStyles } from '../styles';
import { GroupSettings } from '../types';

@customElement('group-settings')
export class GroupSettingsEl extends SignalWatcher(LitElement) {
	@property(hashProperty('group-chat-hash'))
	groupChatHash!: EntryHash;

	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	private async updateGroupSettings(settings: GroupSettings) {
		try {
			await this.store.groupChats
				.get(this.groupChatHash)
				.updateGroupChatSettings(settings);
		} catch (e) {
			console.log(e);
			notifyError(msg("Error updating the group's settings."));
		}
	}

	private renderSettings(iCanEditSettings: boolean, settings: GroupSettings) {
		return html`
			<div class="column" style="gap: 16px">
				<sl-switch
					.disabled=${!iCanEditSettings}
					.checked=${settings.only_admins_can_edit_group_info}
					@sl-change=${(e: CustomEvent) => {
						this.updateGroupSettings({
							...settings,
							only_admins_can_edit_group_info: (e.target as SlSwitch).checked,
						});
					}}
					>${msg('Only admins can edit group info')}
				</sl-switch>
				<sl-switch
					.disabled=${!iCanEditSettings}
					.checked=${settings.only_admins_can_add_members}
					@sl-change=${(e: CustomEvent) => {
						this.updateGroupSettings({
							...settings,
							only_admins_can_add_members: (e.target as SlSwitch).checked,
						});
					}}
					>${msg('Only admins can add members')}
				</sl-switch>
				<sl-switch
					.disabled=${!iCanEditSettings}
					.checked=${settings.sync_message_history_with_new_members}
					@sl-change=${(e: CustomEvent) => {
						this.updateGroupSettings({
							...settings,
							sync_message_history_with_new_members: (e.target as SlSwitch)
								.checked,
						});
					}}
					>${msg('Sync message history with new members')}
				</sl-switch>
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
					.headline=${msg('Error fetching the settings for this group')}
					.error=${groupChat.error}
				></display-error>`;
			case 'completed':
				const me = groupChat.value.members.find(m =>
					m.agents.find(
						a =>
							encodeHashToBase64(a) ===
							encodeHashToBase64(this.store.client.client.myPubKey),
					),
				)!;
				const iCanEditSettings = me.admin && !me.removed;
				return this.renderSettings(iCanEditSettings, groupChat.value.settings);
		}
	}

	static styles = [messengerStyles];
}
