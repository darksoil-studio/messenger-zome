import {
	ProfilesProvider,
	profilesProviderContext,
} from '@darksoil-studio/profiles-provider';
import '@darksoil-studio/profiles-provider/dist/elements/search-users.js';
import { ActionHash, AgentPubKey } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import { notifyError, onSubmit } from '@tnesh-stack/elements';
import '@tnesh-stack/elements/dist/elements/select-avatar.js';
import { SignalWatcher, toPromise } from '@tnesh-stack/signals';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { messengerStoreContext } from '../context.js';
import { MessengerStore } from '../messenger-store.js';
import { messengerStyles } from '../styles.js';
import { AgentWithProfile, MessengerProfile } from '../types.js';

@localized()
@customElement('create-group-chat')
export class CreateGroupChat extends SignalWatcher(LitElement) {
	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	@consume({ context: profilesProviderContext, subscribe: true })
	@property()
	profilesProvider!: ProfilesProvider;

	// eslint-disable-next-line
	private async createGroupChat(fields: any) {
		try {
			const members: AgentPubKey[][] = Array.isArray(fields.members)
				? [fields.members]
				: fields.members
					? [[fields.members]]
					: [];
			let myProfile: MessengerProfile | undefined = undefined;
			let membersWithProfile: Array<AgentWithProfile> = members.map(a => ({
				agent: a[0],
				profile: undefined,
			}));
			if (!this.profilesProvider.profilesArePublic) {
				myProfile = await toPromise(
					this.profilesProvider.currentProfileForAgent.get(
						this.store.client.client.myPubKey,
					),
				);
				membersWithProfile = await Promise.all(
					membersWithProfile.map(async member => {
						const profile = await toPromise(
							this.profilesProvider.currentProfileForAgent.get(member.agent),
						);
						return { profile, agent: member.agent };
					}),
				);
			}

			const groupChatHash = await this.store.client.createGroupChat(
				myProfile,
				membersWithProfile,
				{
					avatar: fields.avatar,
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
		return html`
			<form
				class="column"
				${onSubmit(fields => this.createGroupChat(fields))}
				style="gap: 24px; flex: 1"
			>
				<div class="row" style="gap: 8px; align-items: center">
					<select-avatar label="" name="avatar"> </select-avatar>
					<sl-input
						style="flex: 1"
						required
						.placeholder=${msg('Name')}
						name="name"
					></sl-input>
				</div>

				<search-users
					.label=${msg('Add Members')}
					name="members"
					.excludedUsers=${[this.store.client.client.myPubKey]}
				>
				</search-users>

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
