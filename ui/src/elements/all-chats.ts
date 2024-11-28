import '@darksoil-studio/file-storage-zome/dist/elements/show-avatar-image.js';
import {
	Profile,
	ProfilesStore,
	profilesStoreContext,
} from '@darksoil-studio/profiles-zome';
import '@darksoil-studio/profiles-zome/dist/elements/agent-avatar.js';
import {
	AgentPubKey,
	EntryHash,
	Timestamp,
	encodeHashToBase64,
} from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiInformationOutline } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/avatar/avatar.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/format-date/format-date.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import { wrapPathInSvg } from '@tnesh-stack/elements';
import { AsyncResult, SignalWatcher } from '@tnesh-stack/signals';
import { EntryRecord } from '@tnesh-stack/utils';
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { join } from 'lit/directives/join.js';

import { messengerStoreContext } from '../context.js';
import { GroupChatSummary } from '../group-chat-store.js';
import { ChatSummary, MessengerStore } from '../messenger-store.js';
import { PeerChatSummary } from '../peer-chat-store.js';
import { messengerStyles } from '../styles.js';
import {
	GroupChat,
	GroupChatEntry,
	MessengerProfile,
	PeerMessage,
} from '../types.js';

@localized()
@customElement('all-chats')
export class AllChats extends SignalWatcher(LitElement) {
	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	@consume({ context: profilesStoreContext, subscribe: true })
	profilesStore!: ProfilesStore;

	private renderPeerChat(chat: PeerChatSummary) {
		const lastActivityContent = chat.lastActivity.signed_content.content;
		return html`<div
			class="row"
			style="gap: 8px; cursor: pointer;"
			@click=${() => {
				this.dispatchEvent(
					new CustomEvent('peer-chat-selected', {
						composed: true,
						bubbles: true,
						detail: {
							peerChatHash: chat.peerChatHash,
						},
					}),
				);
			}}
		>
			<div style="align-self: center">
				${this.renderAvatar(chat.peer.agents[0], chat.peer.profile)}
			</div>
			<div class="column" style="gap: 8px; flex: 1; overflow: hidden">
				<span
					>${this.renderAgentNickname(
						chat.peer.agents[0],
						chat.peer.profile,
					)}</span
				>
				<span class="placeholder last-activity"
					>${lastActivityContent.type === 'PeerMessage'
						? lastActivityContent.message.message
						: ''}</span
				>
			</div>

			<div class="column" style="gap: 2px; justify-content: end">
				<div class="placeholder time" style="display: contents">
					${this.renderTime(chat.lastActivity.signed_content.timestamp)}
				</div>
				<div style="flex: 1">
					${chat.myUnreadMessages.length !== 0
						? html`<sl-badge variant="primary" pill
								>${chat.myUnreadMessages.length}</sl-badge
							>`
						: html``}
				</div>
			</div>
		</div>`;
	}

	renderTime(timestamp: Timestamp) {
		timestamp = timestamp / 1000; // Convert from micro to milliseconds
		const today = new Date();
		today.setHours(0);
		today.setMinutes(0);
		today.setMilliseconds(0);
		const todayFirstTimestamp = today.valueOf();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);
		yesterday.setHours(0);
		yesterday.setMinutes(0);
		yesterday.setMilliseconds(0);
		const yesterdayFirstTimestamp = yesterday.valueOf();
		const beforeThanYesterday = timestamp < yesterdayFirstTimestamp;

		if (beforeThanYesterday)
			return html`<sl-format-date
				weekday="short"
				.date=${new Date(timestamp)}
			></sl-format-date>`;

		const inYesterday =
			yesterdayFirstTimestamp < timestamp && timestamp < todayFirstTimestamp;

		if (inYesterday) return msg('yesterday');

		const lessThanAMinuteAgo = Date.now() - timestamp < 60 * 1000;
		if (lessThanAMinuteAgo) return msg('now');

		const moreThanAnHourAgo = Date.now() - timestamp > 46 * 60 * 1000;
		if (moreThanAnHourAgo)
			return html`
				<sl-format-date
					hour="numeric"
					minute="numeric"
					hour-format="24"
					.date=${new Date(timestamp)}
				></sl-format-date>
			`;

		return html`
			<sl-relative-time
				sync
				style="width: 3em; height: 14px; overflow: hidden; text-align: right"
				format="narrow"
				.date=${new Date(timestamp)}
			>
			</sl-relative-time>
		`;
	}

	renderAvatar(
		agent: AgentPubKey,
		messengerProfile: MessengerProfile | undefined,
	) {
		if (messengerProfile)
			return html`<sl-avatar
				.image=${messengerProfile.avatar_src}
			></sl-avatar>`;
		return html` <agent-avatar .agentPubKey=${agent}></agent-avatar> `;
	}

	renderAgentNickname(
		agent: AgentPubKey,
		messengerProfile: MessengerProfile | undefined,
	) {
		if (messengerProfile)
			return html`<span>${messengerProfile.nickname}</span>`;
		const profile = this.profilesStore.profileForAgent.get(agent).get();
		if (profile.status !== 'completed') return html`${msg('Loading...')}`;
		if (!profile.value) return html`${msg('Profile not found')}`;
		const latestValue = profile.value.latestVersion.get() as AsyncResult<
			EntryRecord<Profile> | undefined
		>;
		if (latestValue.status !== 'completed')
			return html`${msg('Profile not found')}`;

		return html`<span>${latestValue.value?.entry.nickname}</span>`;
	}

	renderGroupLastActivity(
		groupChat: GroupChat,
		groupMessengerEntry: GroupChatEntry,
	) {
		if (groupMessengerEntry.signed_content.content.type === 'GroupMessage') {
			const author = groupChat.members.find(
				m =>
					!!m.agents.find(
						a =>
							encodeHashToBase64(a) ===
							encodeHashToBase64(groupMessengerEntry.provenance),
					),
			)!;
			return html`<span
				>${this.renderAgentNickname(
					groupMessengerEntry.provenance,
					author.profile,
				)}:
				${groupMessengerEntry.signed_content.content.message.message}</span
			>`;
		}
	}

	renderGroupChat(groupChatSummary: GroupChatSummary) {
		const info = groupChatSummary.currentGroup.info;
		return html`<div
			class="row"
			style="gap: 8px; cursor: pointer"
			@click=${() => {
				this.dispatchEvent(
					new CustomEvent('group-chat-selected', {
						composed: true,
						bubbles: true,
						detail: {
							groupChatHash: groupChatSummary.groupChatHash,
						},
					}),
				);
			}}
		>
			${!info.avatar_hash
				? html`
						<sl-avatar
							style="align-self: center; --size: 32px"
							.initials=${info.name.slice(0, 2)}
						></sl-avatar>
					`
				: html`
						<show-avatar-image
							.initials=${info.name.slice(0, 2)}
							.imageHash=${info.avatar_hash}
							style="--size: 32px; align-self: center"
						>
						</show-avatar-image>
					`}
			<div class="column" style="gap: 8px; flex: 1; overflow: hidden">
				<span class="chat-name">${info.name}</span>
				<span class="placeholder last-activity"
					>${this.renderGroupLastActivity(
						groupChatSummary.currentGroup,
						groupChatSummary.lastActivity,
					)}</span
				>
			</div>

			<div class="column" style="gap: 2px; align-items: end">
				<div class="placeholder time" style="display: contents">
					${this.renderTime(
						groupChatSummary.lastActivity.signed_content.timestamp,
					)}
				</div>
				<div style="flex: 1"></div>
				${groupChatSummary.myUnreadMessages.length !== 0
					? html`<sl-badge variant="primary" pill
							>${groupChatSummary.myUnreadMessages.length}</sl-badge
						>`
					: html``}
			</div>
		</div>`;
	}

	renderChats(chats: Array<ChatSummary>) {
		if (chats.length === 0) {
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
					<span>${msg('There are no chats yet.')}</span>
				</div>
			</div>`;
		}

		return html`<div class="column" style="flex: 1; overflow: hidden">
			${join(
				chats.map(chat =>
					chat.type === 'PeerChat'
						? this.renderPeerChat(chat)
						: this.renderGroupChat(chat),
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
					<div class="column" style="flex: 1">
						<div class="row" style="gap: 8px">
							<sl-skeleton
								style="height: 32px; width: 32px; --border-radius: 8px; align-self: center"
								effect="pulse"
							></sl-skeleton>
							<sl-skeleton
								style="height: 16px; flex: 1; --border-radius: 8px"
								effect="pulse"
							></sl-skeleton>
						</div>
						<sl-divider> </sl-divider>
						<div class="row" style="gap: 8px">
							<sl-skeleton
								style="height: 32px; width: 32px; --border-radius: 8px; align-self: center"
								effect="pulse"
							></sl-skeleton>
							<sl-skeleton
								style="height: 16px; flex: 1; --border-radius: 8px"
								effect="pulse"
							></sl-skeleton>
						</div>
						<sl-divider> </sl-divider>
						<div class="row" style="gap: 8px">
							<sl-skeleton
								style="height: 32px; width: 32px; --border-radius: 8px; align-self: center"
								effect="pulse"
							></sl-skeleton>
							<sl-skeleton
								style="height: 16px; flex: 1; --border-radius: 8px"
								effect="pulse"
							></sl-skeleton>
						</div>
					</div>
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
			.last-activity {
				font-size: 14px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.chat-name {
			}
			.time {
				font-size: 14px;
			}
		`,
	];
}
