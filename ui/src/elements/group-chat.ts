import {
	AgentPubKey,
	AgentPubKeyB64,
	EntryHash,
	EntryHashB64,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { SlTextarea } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/format-date/format-date.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import { hashProperty, notifyError, sharedStyles } from '@tnesh-stack/elements';
import '@tnesh-stack/elements/dist/elements/display-error.js';
import { SignalWatcher, joinAsync } from '@tnesh-stack/signals';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { messengerStoreContext } from '../context.js';
import { MessengerStore } from '../messenger-store.js';
import { messengerStyles } from '../styles.js';
import {
	DeleteGroupChat,
	Group,
	GroupMessage,
	Message,
	PeerMessage,
	Signed,
	UpdateGroupChat,
} from '../types.js';
import './message-input.js';

@localized()
@customElement('group-chat')
export class GroupChat extends SignalWatcher(LitElement) {
	@property(hashProperty('group-hash'))
	groupHash!: EntryHash;

	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	private renderChat(
		myAgents: AgentPubKey[],
		group: Signed<Group>,
		updates: Record<EntryHashB64, Signed<UpdateGroupChat>>,
		deletes: Record<EntryHashB64, Signed<DeleteGroupChat>>,
		messages: Record<EntryHashB64, Signed<GroupMessage>>,
	) {
		const orderedMessages = Object.entries(messages).sort(
			(m1, m2) =>
				m2[1].signed_content.timestamp - m1[1].signed_content.timestamp,
		);
		const myAgentsB64 = myAgents.map(encodeHashToBase64);

		const orderedUpdates = Object.entries(updates).sort(
			(m1, m2) =>
				m2[1].signed_content.timestamp - m1[1].signed_content.timestamp,
		);
		const lastUpdate = orderedUpdates[0];
		const currentGroupHash =
			lastUpdate === undefined
				? this.groupHash
				: decodeHashFromBase64(lastUpdate[0]);

		return html`<div class="column" style="flex: 1; margin-top: 12px">
			<div class="flex-scrollable-parent">
				<div class="flex-scrollable-container">
					<div
						class="flex-scrollable-y"
						id="scrolling-chat"
						style="padding-right: 4px; padding-left: 4px; align-items: start; flex: 1; display: flex; flex-direction: column-reverse"
					>
						${orderedMessages.map(([messageHash, message]) =>
							this.renderMessage(messageHash, message, myAgentsB64),
						)}
					</div>
				</div>
			</div>
			<message-input @send-message=${(e: CustomEvent) => this.sendMessage(currentGroupHash, e.detail.message as Message)}>
		</div> `;
	}

	private renderMessage(
		messageHash: EntryHashB64,
		message: Signed<GroupMessage>,
		myAgentsB64: AgentPubKeyB64[],
	) {
		const timestamp = message.signed_content.timestamp / 1000;
		const date = new Date(timestamp);
		const lessThanAMinuteAgo = Date.now() - timestamp < 60 * 1000;
		const moreThanAnHourAgo = Date.now() - timestamp > 46 * 60 * 1000;
		return html` <div
			class=${classMap({
				'from-me': myAgentsB64.includes(encodeHashToBase64(message.provenance)),
				message: true,
				row: true,
			})}
			style="align-items: end; flex-wrap: wrap; gap: 8px;"
		>
			<span style="flex: 1; word-break: break-all"
				>${message.signed_content.content.message.message}</span
			>
			<div
				class="placeholder column"
				style="font-size: 12px; width: 4em; height: 14px; overflow: hidden; text-align: right"
			>
				${lessThanAMinuteAgo
					? html`<span>${msg('now')}</span>`
					: moreThanAnHourAgo
						? html`
								<sl-format-date
									hour="numeric"
									minute="numeric"
									hour-format="24"
									.date=${date}
								></sl-format-date>
							`
						: html`
								<sl-relative-time style="" sync format="short" .date=${date}>
								</sl-relative-time>
							`}
			</div>
		</div>`;
	}

	async sendMessage(currentGroupHash: EntryHash, message: Message) {
		try {
			await this.store.client.sendGroupMessage(
				this.groupHash,
				currentGroupHash,
				message,
			);

			const scrollingChat = this.shadowRoot!.getElementById('scrolling-chat')!;

			scrollingChat.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		} catch (e) {
			console.log(e);
			notifyError(msg(`Error sending the message`));
		}
	}

	messages() {
		const myAgents = this.store.allMyAgents.get();
		const group = this.store.groupChats.get(this.groupHash).get();
		if (myAgents.status !== 'completed') return myAgents;
		if (group.status !== 'completed') return group;

		return {
			status: 'completed' as const,
			value: {
				myAgents: myAgents.value,
				group: group.value,
			},
		};
	}

	render() {
		const messages = this.messages();
		switch (messages.status) {
			case 'pending':
				return html`
					<sl-skeleton
						style="height: 32px; width: 32px; --border-radius: 8px"
						effect="pulse"
					></sl-skeleton>
				`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the messages')}
					.error=${messages.error}
				></display-error>`;
			case 'completed':
				const group = messages.value.group;
				if (!group) {
					return html`<display-error
						.headline=${msg('Group not found')}
					></display-error>`;
				}
				return this.renderChat(
					messages.value.myAgents,
					group.group,
					group.updates,
					group.deletes,
					group.messages,
				);
		}
	}

	static styles = [
		messengerStyles,
		css`
			:host {
				display: flex;
				font-size: 14px;
			}
		`,
	];
}
