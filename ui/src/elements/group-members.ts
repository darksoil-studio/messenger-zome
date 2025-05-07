import {
	hashProperty,
	notifyError,
	wrapPathInSvg,
} from '@darksoil-studio/holochain-elements';
import '@darksoil-studio/holochain-elements/dist/elements/display-error.js';
import { SignalWatcher, toPromise } from '@darksoil-studio/holochain-signals';
import '@darksoil-studio/profiles-provider/dist/elements/profile-list-item-skeleton.js';
import '@darksoil-studio/profiles-provider/dist/elements/profile-list-item.js';
import { EntryHash, encodeHashToBase64 } from '@holochain/client';
import { consume } from '@lit/context';
import { msg } from '@lit/localize';
import {
	mdiAccountPlus,
	mdiAccountRemove,
	mdiAccountStar,
	mdiDelete,
	mdiInformationOutline,
	mdiMessage,
} from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/avatar/avatar.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import SlDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { messengerStoreContext } from '../context';
import { MessengerStore } from '../messenger-store';
import { messengerStyles } from '../styles';
import { GroupChat, GroupMember } from '../types';

@customElement('group-members')
export class GroupMembers extends SignalWatcher(LitElement) {
	@property(hashProperty('group-chat-hash'))
	groupChatHash!: EntryHash;

	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	private renderMember(
		isGroupDeleted: boolean,
		me: GroupMember,
		member: GroupMember,
	) {
		const dialogId = encodeHashToBase64(member.agents[0]);
		return html`
			<sl-dialog id="${dialogId}" no-header style="--width: 20rem">
				<div class="column" style="gap: 12px">
					<div
						class="row"
						style="cursor: pointer; align-items:center; gap: 8px"
						@click=${async () => {
							try {
								const peerChatsForThisPeer = await toPromise(
									this.store.peerChatsForPeer.get(member.agents[0]),
								);

								let peerChatHash: EntryHash;
								if (peerChatsForThisPeer.length === 0) {
									peerChatHash = await this.store.client.createPeerChat(
										member.agents[0],
									);
								} else {
									peerChatHash = peerChatsForThisPeer[0];
								}
								this.dispatchEvent(
									new CustomEvent('peer-chat-selected', {
										bubbles: true,
										composed: true,
										detail: {
											peerChatHash,
										},
									}),
								);
								const dialog = this.shadowRoot!.getElementById(
									dialogId,
								) as SlDialog;
								dialog.hide();
							} catch (e) {
								console.error(e);
								notifyError(msg('Error sending direct message.'));
							}
						}}
					>
						<sl-icon .src=${wrapPathInSvg(mdiMessage)}></sl-icon>

						<span>${msg('Send direct message')}</span>
					</div>
					${!isGroupDeleted && !me.removed && me.admin && !member.admin
						? html`
								<div
									class="row"
									style="cursor: pointer; gap: 8px; align-items:center"
									@click=${async () => {
										try {
											await this.store.groupChats
												.get(this.groupChatHash)
												.promoteMemberToAdmin(member.agents);
											const dialog = this.shadowRoot!.getElementById(
												dialogId,
											) as SlDialog;
											dialog.hide();
										} catch (e) {
											console.error(e);
											notifyError(msg('Error making peer an admin.'));
										}
									}}
								>
									<sl-icon .src=${wrapPathInSvg(mdiAccountStar)}></sl-icon>
									<span>${msg('Make admin')}</span>
								</div>
							`
						: html``}
					${!isGroupDeleted && !me.removed && me.admin && member.admin
						? html`
								<div
									class="row"
									style="cursor: pointer; gap: 8px; align-items:center"
									@click=${async () => {
										try {
											await this.store.groupChats
												.get(this.groupChatHash)
												.demoteMemberFromAdmin(member.agents);
											const dialog = this.shadowRoot!.getElementById(
												dialogId,
											) as SlDialog;
											dialog.hide();
										} catch (e) {
											console.error(e);
											notifyError(msg('Error demoting member from admin.'));
										}
									}}
								>
									<sl-icon .src=${wrapPathInSvg(mdiAccountRemove)}></sl-icon>
									<span>${msg('Remove admin role')}</span>
								</div>
							`
						: html``}
					${!isGroupDeleted && me.admin && !me.removed
						? html`
								<div
									class="row"
									style="cursor: pointer; gap: 8px; align-items:center"
									@click=${async () => {
										try {
											await this.store.groupChats
												.get(this.groupChatHash)
												.removeMember(member.agents);
											const dialog = this.shadowRoot!.getElementById(
												dialogId,
											) as SlDialog;
											dialog?.hide();
										} catch (e) {
											console.error(e);
											notifyError(msg('Error removing member.'));
										}
									}}
								>
									<sl-icon .src=${wrapPathInSvg(mdiDelete)}></sl-icon>
									<span>${msg('Remove member')}</span>
								</div>
							`
						: html``}
				</div>
			</sl-dialog>
			<div
				@click=${() => {
					if (
						member.agents.find(
							a =>
								encodeHashToBase64(a) ===
								encodeHashToBase64(this.store.client.client.myPubKey),
						)
					)
						return;
					const dialog = this.shadowRoot!.getElementById(dialogId) as SlDialog;
					dialog.show();
				}}
				class="row"
				style="cursor: pointer"
			>
				${member.profile
					? html`
							<div class="row" style="gap: 8px; flex: 1; align-items: center">
								<sl-avatar
									.image=${member.profile.avatar}
									.initials=${member.profile.name.slice(0, 2)}
									style="--size: 32px"
								>
								</sl-avatar>
								<span>${member.profile.name} </span>
							</div>
						`
					: html`
							<profile-list-item
								style="flex: 1"
								.agentPubKey=${member.agents[0]}
							></profile-list-item>
						`}
				${member.admin ? html`<sl-tag>${msg('Admin')}</sl-tag>` : html``}
			</div>
		`;
	}

	private renderMembers(groupChat: GroupChat) {
		if (groupChat.members.length === 0) {
			return html`<div
				class="column placeholder"
				style="flex: 1; align-items: center; justify-content: center; gap: 8px"
			>
				<sl-icon
					.src=${wrapPathInSvg(mdiInformationOutline)}
					style="font-size: 64px;"
				></sl-icon>
				<span>${msg('This group has no members.')}</span>
			</div>`;
		}

		const me = groupChat.members.find(m =>
			m.agents.find(
				a =>
					encodeHashToBase64(a) ===
					encodeHashToBase64(this.store.client.client.myPubKey),
			),
		)!;
		return html`
			<div class="column" style="gap: 12px; flex: 1">
				${groupChat.members
					.filter(m => !m.removed)
					.map(member => this.renderMember(groupChat.deleted, me, member))}
				${!groupChat.deleted &&
				!me.removed &&
				(me.admin || !groupChat.settings.only_admins_can_add_members)
					? html`
							<sl-button
								variant="primary"
								style="margin-top: 8px"
								outline
								@click=${() => {
									this.dispatchEvent(
										new CustomEvent('add-members-clicked', {
											bubbles: true,
											composed: true,
										}),
									);
								}}
							>
								<sl-icon slot="prefix" .src=${wrapPathInSvg(mdiAccountPlus)}>
								</sl-icon>
								${msg('Add members')}
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
						<profile-list-item-skeleton></profile-list-item-skeleton>
						<profile-list-item-skeleton></profile-list-item-skeleton>
						<profile-list-item-skeleton></profile-list-item-skeleton>
					</div>
				`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the members for this group')}
					.error=${groupChat.error}
				></display-error>`;
			case 'completed':
				return this.renderMembers(groupChat.value);
		}
	}

	static styles = [messengerStyles];
}
