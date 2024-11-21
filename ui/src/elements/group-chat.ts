import {
	Profile,
	ProfilesStore,
	profilesStoreContext,
} from '@darksoil-studio/profiles-zome';
import '@darksoil-studio/profiles-zome/dist/elements/agent-avatar.js';
import {
	AgentPubKey,
	AgentPubKeyB64,
	EntryHash,
	EntryHashB64,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import '@lit-labs/virtualizer';
import { LitVirtualizer } from '@lit-labs/virtualizer';
import { consume } from '@lit/context';
import { localized, msg, str } from '@lit/localize';
import { SlTextarea } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/format-date/format-date.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import { hashProperty, notifyError, sharedStyles } from '@tnesh-stack/elements';
import '@tnesh-stack/elements/dist/elements/display-error.js';
import { AsyncResult, SignalWatcher, joinAsync } from '@tnesh-stack/signals';
import { EntryRecord } from '@tnesh-stack/utils';
import ColorHash from 'color-hash';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';

import { messengerStoreContext } from '../context.js';
import { MessageSet, orderInMessageSets } from '../message-set.js';
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

const colorHash = new ColorHash({ lightness: [0.1, 0.2, 0.3, 0.4] });

@localized()
@customElement('group-chat')
export class GroupChat extends SignalWatcher(LitElement) {
	@property(hashProperty('group-hash'))
	groupHash!: EntryHash;

	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	@consume({ context: profilesStoreContext, subscribe: true })
	profilesStore!: ProfilesStore;

	private renderChat(
		myAgents: AgentPubKey[],
		originalGroup: Signed<Group>,
		currentGroup: Group,
		updates: Record<EntryHashB64, Signed<UpdateGroupChat>>,
		deletes: Record<EntryHashB64, Signed<DeleteGroupChat>>,
		messages: Record<EntryHashB64, Signed<GroupMessage>>,
		theirAgentSets: Array<Array<AgentPubKey>>,
		typingPeers: Array<AgentPubKey>,
	) {
		const messageSets = orderInMessageSets(messages, [
			myAgents,
			...theirAgentSets,
		]);
		const myAgentsB64 = myAgents.map(encodeHashToBase64);
		const currentMembers = [...currentGroup.admins, ...currentGroup.members];
		const currentGroupAgentSets = theirAgentSets.filter(
			agentSet =>
				!!currentMembers.find(currentMember =>
					agentSet.find(
						agent =>
							encodeHashToBase64(agent) === encodeHashToBase64(currentMember),
					),
				),
		);

		const orderedUpdates = Object.entries(updates).sort(
			(m1, m2) =>
				m2[1].signed_content.timestamp - m1[1].signed_content.timestamp,
		);
		const lastUpdate = orderedUpdates[0];
		const currentGroupHash =
			lastUpdate === undefined
				? this.groupHash
				: decodeHashFromBase64(lastUpdate[0]);

		return html`<div class="column" style="flex: 1;">
			<div class="flex-scrollable-parent">
				<div class="flex-scrollable-container">
					<div
						class="flex-scrollable-y"
						id="scrolling-chat"
						style="padding-right: 8px; padding-left: 8px; gap: 8px; flex: 1; display: flex; flex-direction: column-reverse"
					>
						<div style="margin-bottom: 4px"></div>
						${this.renderTypingIndicators(typingPeers)}
						${messageSets.map(messageSet =>
							myAgentsB64.includes(
								encodeHashToBase64(messageSet.messages[0][1].provenance),
							)
								? this.renderMessageSetFromMe(messageSet)
								: this.renderMessageSetToMe(messageSet),
						)}
						<sl-tag style="align-self: center">
							${msg(str`Group was created by`)}&nbsp;
							${this.renderAgentNickname(originalGroup.provenance)}
						</sl-tag>
					</div>
				</div>
			</div>
			<message-input
				@input=${() =>
					this.store.client.sendGroupChatTypingIndicator(
						this.groupHash,
						currentGroupAgentSets,
					)}
				@send-message=${(e: CustomEvent) =>
					this.sendMessage(currentGroupHash, e.detail.message as Message)}
			>
			</message-input>
		</div> `;
	}

	private renderTypingIndicators(typingPeers: Array<AgentPubKey>) {
		if (typingPeers.length === 0) return html``;
		return html`
			<div
				class="column"
				${ref(el => {
					const virtualizer = this.shadowRoot!.getElementById(
						'scrolling-chat',
					)! as LitVirtualizer;

					if (
						virtualizer.scrollHeight -
							virtualizer.offsetHeight -
							virtualizer.scrollTop <
						40
					) {
						setTimeout(() => {
							virtualizer.scrollTo({
								top: virtualizer.scrollHeight,
								behavior: 'smooth',
							});
						}, 40);
					}
				})}
				style="gap: 4px; justify-content: start; margin-top:4px"
			>
				${typingPeers.map(
					peer => html`
						<div class="row" style="gap: 2px; align-items: center">
							<agent-avatar
								size="24"
								style="height: 24px"
								.agentPubKey=${peer}
							></agent-avatar>
							<div class="typing-indicator">
								<span>...</span>
							</div>
						</div>
					`,
				)}
			</div>
		`;
	}

	private renderMessageSetFromMe(messageSet: MessageSet<GroupMessage>) {
		const lastMessage = messageSet.messages[0][1];
		const timestamp = lastMessage.signed_content.timestamp / 1000;
		const date = new Date(timestamp);
		const lessThanAMinuteAgo = Date.now() - timestamp < 60 * 1000;
		const moreThanAnHourAgo = Date.now() - timestamp > 46 * 60 * 1000;
		return html`
			<div class="column from-me" style="flex-direction: column-reverse">
				${messageSet.messages.map(
					([messageHash, message], i) => html`
						<div
							class="message row"
							style="align-items: end; flex-wrap: wrap; gap: 8px;"
						>
							<span style="flex: 1; word-break: break-all"
								>${message.signed_content.content.message.message}</span
							>
							${i === 0
								? html`
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
															<sl-relative-time
																style=""
																sync
																format="short"
																.date=${date}
															>
															</sl-relative-time>
														`}
										</div>
									`
								: html``}
						</div>
					`,
				)}
			</div>
		`;
	}

	renderAgentNickname(agent: AgentPubKey) {
		const profile = this.profilesStore.profileForAgent.get(agent).get();
		if (profile.status !== 'completed' || !profile.value)
			return html`${msg('Profile not found')}`;
		const latestValue = profile.value.latestVersion.get() as AsyncResult<
			EntryRecord<Profile> | undefined
		>;
		if (latestValue.status !== 'completed')
			return html`${msg('Profile not found')}`;

		return html`
			<span
				style=${styleMap({
					color: colorHash.hex(encodeHashToBase64(profile.value.profileHash)),
					'font-weight': 'bold',
				})}
				@click=${() => {
					this.dispatchEvent(
						new CustomEvent('agent-selected', {
							bubbles: true,
							composed: true,
							detail: {
								agentPubKey: agent,
							},
						}),
					);
				}}
				>${latestValue.value?.entry.nickname}</span
			>
		`;
	}

	private renderMessageSetToMe(messageSet: MessageSet<GroupMessage>) {
		const lastMessage = messageSet.messages[0][1];
		const timestamp = lastMessage.signed_content.timestamp / 1000;
		const date = new Date(timestamp);
		const lessThanAMinuteAgo = Date.now() - timestamp < 60 * 1000;
		const moreThanAnHourAgo = Date.now() - timestamp > 46 * 60 * 1000;
		return html` <div class="row" style="gap: 8px; align-items: end">
			<agent-avatar .agentPubKey=${lastMessage.provenance}></agent-avatar>

			<div
				class="column"
				style="flex-direction: column-reverse; align-items: start"
			>
				${messageSet.messages.map(
					([messageHash, message], i) => html`

						<div class="colum message" style="gap:8px">
							${
								i === messageSet.messages.length - 1
									? this.renderAgentNickname(message.provenance)
									: html``
							}
							<div
								class="row"
								style="gap: 8px; align-items: end; flex-wrap: wrap; "
							>
								<span style="flex: 1; word-break: break-all"
									>${message.signed_content.content.message.message}</span
								>
								${
									i === 0
										? html`
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
																	<sl-relative-time
																		style=""
																		sync
																		format="short"
																		.date=${date}
																	>
																	</sl-relative-time>
																`}
												</div>
											`
										: html``
								}
							</div>
						</div>
					</div>
				`,
				)}
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
			console.error(e);
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
					group.originalGroup,
					group.currentGroup,
					group.updates,
					group.deletes,
					group.messages,
					group.theirAgentSets,
					group.typingPeers,
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
