import '@darksoil-studio/profiles-zome/dist/elements/profile-list-item-skeleton.js';
import '@darksoil-studio/profiles-zome/dist/elements/profile-list-item.js';
import { EntryHash } from '@holochain/client';
import { consume } from '@lit/context';
import { msg } from '@lit/localize';
import '@shoelace-style/shoelace/dist/components/avatar/avatar.js';
import { hashProperty } from '@tnesh-stack/elements';
import '@tnesh-stack/elements/dist/elements/display-error.js';
import { SignalWatcher } from '@tnesh-stack/signals';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { messengerStoreContext } from '../context';
import { MessengerStore } from '../messenger-store';
import { messengerStyles } from '../styles';
import { GroupMember } from '../types';

@customElement('group-member')
export class GroupMembers extends SignalWatcher(LitElement) {
	@property(hashProperty('group-chat-hash'))
	groupChatHash!: EntryHash;

	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	private renderMember(member: GroupMember) {
		if (member.profile) {
			return html`
				<div class="row" style="gap: 8px">
					<sl-avatar
						.image=${member.profile.avatar_src}
						.initials=${member.profile.nickname.slice(0, 2)}
					>
					</sl-avatar>
					<span>${member.profile.nickname} </span>
				</div>
			`;
		}

		return html`<profile-list-item
			.agentPubKey=${member.agents[0]}
		></profile-list-item>`;
	}

	private renderMembers(members: GroupMember[]) {
		return html`
			<div class="column" style="gap: 8px">
				${members.map(member => this.renderMember(member))}
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
				return this.renderMembers(groupChat.value.members);
		}
	}

	static styles = [messengerStyles];
}
