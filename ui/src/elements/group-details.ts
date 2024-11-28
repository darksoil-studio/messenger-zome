import '@darksoil-studio/file-storage-zome/dist/elements/show-image.js';
import {
	ProfilesStore,
	profilesStoreContext,
} from '@darksoil-studio/profiles-zome';
import '@darksoil-studio/profiles-zome/dist/elements/search-profiles.js';
import { SearchProfiles } from '@darksoil-studio/profiles-zome/dist/elements/search-profiles.js';
import { ActionHash, EntryHash, encodeHashToBase64 } from '@holochain/client';
import { consume } from '@lit/context';
import { msg } from '@lit/localize';
import { mdiArrowLeft, mdiInformationOutline, mdiPencil } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/details/details.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import {
	hashProperty,
	notifyError,
	onSubmit,
	wrapPathInSvg,
} from '@tnesh-stack/elements';
import '@tnesh-stack/elements/dist/elements/display-error.js';
import { SignalWatcher, toPromise } from '@tnesh-stack/signals';
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { messengerStoreContext } from '../context';
import { MessengerStore } from '../messenger-store';
import { messengerStyles } from '../styles';
import { GroupChat, GroupInfo } from '../types';
import './group-info.js';
import './group-members.js';
import './group-settings.js';

@customElement('group-details')
export class GroupDetails extends SignalWatcher(LitElement) {
	@property(hashProperty('group-chat-hash'))
	groupChatHash!: EntryHash;

	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	@consume({ context: profilesStoreContext, subscribe: true })
	profilesStore!: ProfilesStore;

	@state()
	view: 'details' | 'add-members' | 'edit-info' = 'details';

	async updateGroupInfo(fields: any) {
		try {
			await this.store.groupChats.get(this.groupChatHash).updateGroupChatInfo({
				avatar_hash: fields.avatar,
				name: fields.name,
				description: fields.description,
			});
			this.view = 'details';
		} catch (e) {
			console.log(e);
			notifyError(msg("Error updating the group's info."));
		}
	}

	get profilesToBeAdded() {
		const searchProfiles = this.shadowRoot?.getElementById(
			'profiles',
		) as SearchProfiles;
		if (!searchProfiles) return undefined;
		return searchProfiles.value;
	}

	async addMembers() {
		try {
			const profilesToBeAdded = this.profilesToBeAdded!;

			for (const profileToBeAdded of profilesToBeAdded) {
				const agents = await toPromise(
					this.profilesStore.agentsForProfile.get(profileToBeAdded),
				);

				await this.store.groupChats.get(this.groupChatHash).addMember(agents);
			}

			this.view = 'details';
		} catch (e) {
			console.log(e);
			notifyError(msg('Error adding members.'));
		}
	}

	private renderAddMembers() {
		return html`
			<div class="column" style="gap: 12px; flex: 1">
				<sl-icon-button
					.src=${wrapPathInSvg(mdiArrowLeft)}
					@click=${() => {
						this.view = 'details';
					}}
					style="align-self: start"
				>
				</sl-icon-button>

				<search-profiles
					id="profiles"
					@profile-selected=${(e: CustomEvent) => {
						this.requestUpdate();
					}}
				>
				</search-profiles>

				<div style="flex: 1"></div>

				<sl-button
					variant="primary"
					.disabled=${this.profilesToBeAdded &&
					this.profilesToBeAdded.length === 0}
					@click=${() => {
						this.addMembers();
					}}
					>${msg('Add members')}
				</sl-button>
			</div>
		`;
	}

	private renderEditInfo(info: GroupInfo) {
		return html`
			<form
				class="column"
				style="gap: 8px; flex: 1"
				${onSubmit(fields => this.updateGroupInfo(fields))}
			>
				<sl-icon-button
					.src=${wrapPathInSvg(mdiArrowLeft)}
					@click=${() => {
						this.view = 'details';
					}}
					style="align-self: start"
				>
				</sl-icon-button>

				<upload-avatar name="avatar" .value=${info.avatar_hash}></upload-avatar>
				<sl-input
					required
					.label=${msg('Name')}
					name="name"
					.value=${info.name}
				></sl-input>
				<sl-input
					.label=${msg('Description')}
					name="description"
					.value=${info.description}
				></sl-input>
				<div style="flex: 1"></div>
				<sl-button type="submit" variant="primary">${msg('Save')} </sl-button>
			</form>
		`;
	}
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
		if (this.view === 'edit-info') return this.renderEditInfo(details.info);
		if (this.view === 'add-members') return this.renderAddMembers();

		const imAdmin = details.members.find(m =>
			m.agents.find(
				a =>
					encodeHashToBase64(a) ===
					encodeHashToBase64(this.store.client.client.myPubKey),
			),
		)!.admin;

		return html`
			<div class="column" style="gap: 8px; position: relative; flex: 1">
				<group-info .groupChatHash=${this.groupChatHash}></group-info>

				<sl-card>
					<group-members
						style="flex: 1"
						.groupChatHash=${this.groupChatHash}
						@add-members-clicked=${() => {
							this.view = 'add-members';
						}}
					></group-members>
				</sl-card>

				<sl-details .summary=${msg('Settings')}>
					<group-settings .groupChatHash=${this.groupChatHash}></group-settings>
				</sl-details>

				${imAdmin || !details.settings.only_admins_can_edit_group_info
					? html`
							<sl-button
								@click=${() => {
									this.view = 'edit-info';
								}}
								circle
								style="position: absolute; right: 8px; top: 8px"
							>
								<sl-icon .src=${wrapPathInSvg(mdiPencil)}> </sl-icon>
							</sl-button>
						`
					: html``}
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

	static styles = [
		messengerStyles,
		css`
			:host {
				display: flex;
			}
		`,
	];
}
