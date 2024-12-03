import '@darksoil-studio/file-storage-zome/dist/elements/upload-avatar.js';
import {
	ProfilesStore,
	profilesStoreContext,
} from '@darksoil-studio/profiles-zome';
import '@darksoil-studio/profiles-zome/dist/elements/search-profiles.js';
import { ActionHash } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import { notifyError, onSubmit } from '@tnesh-stack/elements';
import '@tnesh-stack/elements/dist/elements/select-avatar.js';
import { SignalWatcher, toPromise } from '@tnesh-stack/signals';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { messengerStoreContext } from '../context';
import { MessengerStore } from '../messenger-store';
import { messengerStyles } from '../styles';

@localized()
@customElement('create-group-chat')
export class CreateGroupChat extends SignalWatcher(LitElement) {
	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	@consume({ context: profilesStoreContext, subscribe: true })
	profilesStore!: ProfilesStore;

	private async createGroupChat(fields: any) {
		try {
			const profileHashes: ActionHash[] = Array.isArray(fields.members)
				? fields.members
				: fields.members
					? [fields.members]
					: [];
			const otherAgents = await Promise.all(
				profileHashes.map(h =>
					toPromise(this.profilesStore.agentsForProfile.get(h)),
				),
			);
			const groupChatHash = await this.store.client.createGroupChat(
				otherAgents.map(a => a[0]),
				{
					avatar_hash: fields.avatar,
					description: '',
					name: fields.name,
				},
				{
					only_admins_can_add_members: false,
					only_admins_can_edit_group_info: false,
					sync_message_history_with_new_members: false,
				},
			);
			this.dispatchEvent(
				new CustomEvent('group-chat-created', {
					bubbles: true,
					composed: true,
					detail: {
						groupChatHash,
					},
				}),
			);
		} catch (e) {
			console.error(e);
			notifyError(msg('Error creating group chat.'));
		}
	}

	render() {
		const myProfile = this.profilesStore.myProfile.get();
		return html`
			<form
				class="column"
				${onSubmit(fields => this.createGroupChat(fields))}
				style="gap: 24px; flex: 1"
			>
				<div class="row" style="gap: 8px; align-items: center">
					<upload-avatar label="" name="avatar"> </upload-avatar>
					<sl-input
						style="flex: 1"
						required
						.placeholder=${msg('Name')}
						name="name"
					></sl-input>
				</div>

				<search-profiles
					.fieldLabel=${msg('Add Members')}
					name="members"
					.excludedProfiles=${myProfile.status === 'completed'
						? [myProfile.value?.profileHash]
						: []}
				>
				</search-profiles>

				<div style="flex: 1"></div>

				<sl-button variant="primary" type="submit"
					>${msg('Create Group Chat')}</sl-button
				>
			</form>
		`;
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
