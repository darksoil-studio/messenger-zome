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
import { LitElement, html } from 'lit';
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
			const myAgents = this.store.linkedDevicesStore
				? await toPromise(this.store.linkedDevicesStore.myLinkedDevices)
				: [];
			myAgents.push(this.store.client.client.myPubKey);
			const profileHashes: ActionHash[] = Array.isArray(fields.members)
				? fields.members
				: [fields.members];
			const otherAgents = await Promise.all(
				profileHashes.map(h =>
					toPromise(this.profilesStore.agentsForProfile.get(h)),
				),
			);
			await this.store.client.createGroupChat({
				info: {
					avatar_hash: fields.avatar,
					description: '',
					name: fields.name,
				},
				my_agents: myAgents,
				other_members: otherAgents,
				settings: {
					only_admins_can_add_members: false,
					only_admins_can_edit_group_info: false,
					sync_message_history_with_new_members: false,
				},
			});
		} catch (e) {
			console.error(e);
			notifyError(msg('Error creating group chat.'));
		}
	}

	render() {
		return html`
			<form
				class="column"
				${onSubmit(fields => this.createGroupChat(fields))}
				style="gap: 24px"
			>
				<div class="row" style="gap: 8px; align-items: center">
					<upload-avatar label="" name="avatar"> </upload-avatar>
					<sl-input required .placeholder=${msg('Name')} name="name"></sl-input>
				</div>

				<search-profiles .fieldLabel=${msg('Add Members')} name="members">
				</search-profiles>

				<sl-button variant="primary" type="submit"
					>${msg('Create Group Chat')}</sl-button
				>
			</form>
		`;
	}

	static styles = messengerStyles;
}
