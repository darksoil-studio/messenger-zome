import '@darksoil-studio/file-storage-zome/dist/elements/show-avatar-image.js';
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
import { consume } from '@lit/context';
import { localized, msg, str } from '@lit/localize';
import { mdiArrowLeft } from '@mdi/js';
import { SlTextarea } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/format-date/format-date.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import {
	hashProperty,
	notifyError,
	sharedStyles,
	wrapPathInSvg,
} from '@tnesh-stack/elements';
import '@tnesh-stack/elements/dist/elements/display-error.js';
import { AsyncResult, SignalWatcher, joinAsync } from '@tnesh-stack/signals';
import { EntryRecord } from '@tnesh-stack/utils';
import ColorHash from 'color-hash';
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';

import { messengerStoreContext } from '../context.js';
import { EventSet, orderInEventSets } from '../event-set.js';
import { GroupChatStore } from '../group-chat-store.js';
import { MessengerStore } from '../messenger-store.js';
import { messengerStyles } from '../styles.js';
import {
	CreateGroupChat,
	GroupChat,
	GroupChatEntry,
	GroupChatEvent,
	GroupMessage,
	Message,
	PeerMessage,
	SignedEntry,
} from '../types.js';
import './group-details.js';
import './message-input.js';

const colorHash = new ColorHash({ lightness: [0.1, 0.2, 0.3, 0.4] });

@localized()
@customElement('group-chat')
export class GroupChatEl extends SignalWatcher(LitElement) {
	@property(hashProperty('group-chat-hash'))
	groupChatHash!: EntryHash;

	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	@consume({ context: profilesStoreContext, subscribe: true })
	profilesStore!: ProfilesStore;

	@state()
	private showDetails = false;

	private renderEvent(event: SignedEntry<GroupChatEvent>) {
		switch (event.signed_content.content.event.type) {
			case 'UpdateGroupInfo':
				return html`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(event.provenance)}
						&nbsp;${msg(str`updated the group's info.`)}
					</sl-tag>
				`;
			case 'AddMember':
				return html`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(
							event.signed_content.content.event.member_agents[0],
						)}&nbsp;
						${msg(str`was added to the group.`)}
					</sl-tag>
				`;
			case 'RemoveMember':
				return html`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(event.provenance)}
						&nbsp;${msg('removed')}&nbsp;${this.renderAgentNickname(
							event.signed_content.content.event.member_agents[0],
						)}&nbsp;${msg('from the group.')}
					</sl-tag>
				`;
			case 'LeaveGroup':
				return html`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(event.provenance)}
						&nbsp;${msg(str`left the group.`)}
					</sl-tag>
				`;
			case 'DeleteGroup':
				return html`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(event.provenance)}
						&nbsp;${msg(str`deleted the group.`)}
					</sl-tag>
				`;
		}
	}

	private renderTopBar(groupChat: GroupChat) {
		return html`
			<div
				part="top-bar"
				class="row top-bar"
				style="align-items: center; gap: 8px"
			>
				<slot name="top-bar-left-action"></slot>
				<div
					class="row"
					style="flex: 1; align-items: center; gap: 8px; cursor: pointer"
					@click=${() => {
						this.showDetails = true;
					}}
				>
					<show-avatar-image .imageHash=${groupChat.info.avatar_hash}>
					</show-avatar-image>
					<span>${groupChat.info.name} </span>
				</div>
			</div>
		`;
	}

	private renderChat(
		createGroupChat: SignedEntry<CreateGroupChat>,
		currentGroup: GroupChat,
		messages: Record<
			EntryHashB64,
			SignedEntry<{ type: 'GroupMessage' } & GroupMessage>
		>,
		events: Record<
			EntryHashB64,
			SignedEntry<{ type: 'GroupChatEvent' } & GroupChatEvent>
		>,
		myReadMessages: EntryHashB64[],
	) {
		const me = currentGroup.members.find(
			m =>
				!!m.agents.find(
					a =>
						encodeHashToBase64(a) ===
						encodeHashToBase64(this.store.client.client.myPubKey),
				),
		)!;
		const otherMembers = currentGroup.members.filter(
			m =>
				!m.agents.find(
					a =>
						encodeHashToBase64(a) ===
						encodeHashToBase64(this.store.client.client.myPubKey),
				),
		)!;
		const myAgents = me.agents;
		const theirAgentSets = otherMembers.map(m => m.agents);

		const relevantEvents = Object.entries(events)
			.filter(e => {
				const type = e[1].signed_content.content.event.type;
				return (
					type === 'UpdateGroupInfo' ||
					type === 'AddMember' ||
					type === 'RemoveMember' ||
					type === 'LeaveGroup' ||
					type === 'DeleteGroup'
				);
			})
			.reduce((acc, next) => ({ ...acc, [next[0]]: next[1] }), {});

		const eventsSetsInDay = orderInEventSets<
			| ({ type: 'GroupChatEvent' } & GroupChatEvent)
			| ({ type: 'GroupMessage' } & GroupMessage)
		>({ ...messages, ...relevantEvents }, [myAgents, ...theirAgentSets]);
		const myAgentsB64 = myAgents.map(encodeHashToBase64);

		const typingPeers = this.store.groupChats
			.get(this.groupChatHash)
			.typingPeers.get();

		return html`<div class="column" style="flex: 1;">
			${this.renderTopBar(currentGroup)}
			<div class="column" style="flex: 1;">
				<div class="flex-scrollable-parent">
					<div class="flex-scrollable-container">
						<div
							class="flex-scrollable-y"
							id="scrolling-chat"
							style="padding-right: 8px; padding-left: 8px; gap: 8px; flex: 1; display: flex; flex-direction: column-reverse"
							${ref(el => {
								if (!el) return;
								if (me.removed) return;
								const theirEventsSets = (
									[] as EventSet<
										| ({ type: 'GroupMessage' } & GroupMessage)
										| ({ type: 'GroupChatEvent' } & GroupChatEvent)
									>[]
								)
									.concat(
										...eventsSetsInDay.map(
											eventSetsInDay => eventSetsInDay.eventsSets,
										),
									)
									.filter(
										eventSet =>
											!myAgentsB64.includes(
												encodeHashToBase64(eventSet[0][1].provenance),
											),
									);

								const unreadMessages: EntryHash[] = [];

								for (const eventSet of theirEventsSets) {
									for (const [messageHash, _] of eventSet) {
										if (!myReadMessages.includes(messageHash)) {
											unreadMessages.push(decodeHashFromBase64(messageHash));
										}
									}
								}

								if (unreadMessages.length > 0) {
									this.store.groupChats
										.get(this.groupChatHash)
										.markMessagesAsRead(unreadMessages);
								}
							})}
						>
							<div style="margin-bottom: 4px"></div>
							${this.renderTypingIndicators(typingPeers)}
							${eventsSetsInDay.map(eventSetsInDay =>
								this.renderEventsSetsInDay(
									myAgentsB64,
									eventSetsInDay.day,
									eventSetsInDay.eventsSets,
								),
							)}
							<sl-tag style="align-self: center; margin: 4px">
								${msg(str`Group was created by`)}&nbsp;
								${this.renderAgentNickname(createGroupChat.provenance)}
							</sl-tag>
						</div>
					</div>
				</div>
				${currentGroup.deleted || me.removed
					? html``
					: html`
							<message-input
								@input=${() =>
									this.store.client.sendGroupChatTypingIndicator(
										this.groupChatHash,
										otherMembers.filter(m => !m.removed).map(m => m.agents),
									)}
								@send-message=${(e: CustomEvent) =>
									this.sendMessage(e.detail.message as Message)}
							>
							</message-input>
						`}
			</div>
		</div> `;
	}

	private renderEventsSetsInDay(
		myAgentsB64: Array<AgentPubKeyB64>,
		day: Date,
		eventsSets: Array<
			EventSet<
				| ({ type: 'GroupChatEvent' } & GroupChatEvent)
				| ({ type: 'GroupMessage' } & GroupMessage)
			>
		>,
	) {
		return html`
			<div class="column" style="gap: 8px; flex-direction: column-reverse">
				${eventsSets.map(eventSet =>
					eventSet[0][1].signed_content.content.type === 'GroupMessage'
						? myAgentsB64.includes(
								encodeHashToBase64(eventSet[0][1].provenance),
							)
							? this.renderMessageSetFromMe(eventSet as EventSet<GroupMessage>)
							: this.renderMessageSetToMe(eventSet as EventSet<GroupMessage>)
						: this.renderEvent(eventSet[0][1] as SignedEntry<GroupChatEvent>),
				)}
				<div style="align-self: center">
					<sl-tag>
						<sl-format-date
							month="long"
							day="numeric"
							.date=${day}
						></sl-format-date>
					</sl-tag>
				</div>
			</div>
		`;
	}

	private renderTypingIndicators(typingPeers: Array<AgentPubKey>) {
		if (typingPeers.length === 0) return html``;
		return html`
			<div
				class="column"
				${ref(el => {
					const scrollingChat =
						this.shadowRoot!.getElementById('scrolling-chat')!;

					if (
						scrollingChat.scrollHeight -
							scrollingChat.offsetHeight -
							scrollingChat.scrollTop <
						40
					) {
						setTimeout(() => {
							scrollingChat.scrollTo({
								top: scrollingChat.scrollHeight,
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

	private renderMessageSetFromMe(messageSet: EventSet<GroupMessage>) {
		const lastMessage = messageSet[0][1];
		const timestamp = lastMessage.signed_content.timestamp / 1000;
		const date = new Date(timestamp);
		const lessThanAMinuteAgo = Date.now() - timestamp < 60 * 1000;
		const moreThanAnHourAgo = Date.now() - timestamp > 46 * 60 * 1000;
		return html`
			<div class="column from-me" style="flex-direction: column-reverse">
				${messageSet.map(
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
											style="font-size: 12px; width: 4.5em; overflow: hidden; text-align: right"
										>
											<div style="flex: 1"></div>
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
																format="narrow"
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

	private renderMessageSetToMe(messageSet: EventSet<GroupMessage>) {
		const lastMessage = messageSet[0][1];
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
				${messageSet.map(
					([messageHash, message], i) => html`

						<div class="colum message" style="gap:8px">
							${
								i === messageSet.length - 1
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
													style="font-size: 12px; width: 4.5em; overflow: hidden; text-align: right"
												>
													<div style="flex: 1"></div>
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
																		format="narrow"
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
	async sendMessage(message: Message) {
		try {
			await this.store.groupChats.get(this.groupChatHash).sendMessage(message);

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

	groupInfo() {
		const groupStore = this.store.groupChats.get(this.groupChatHash);

		return joinAsync([
			groupStore.originalGroupChat.get(),
			groupStore.currentGroupChat.get(),
			groupStore.messages.get(),
			groupStore.events.get(),
			groupStore.readMessages.get(),
		]);
	}

	render() {
		const groupInfo = this.groupInfo();
		switch (groupInfo.status) {
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
					.error=${groupInfo.error}
				></display-error>`;
			case 'completed':
				if (this.showDetails)
					return html`
						<div class="flex-scrollable-parent">
							<div class="flex-scrollable-container">
								<div class="flex-scrollable-y">
									<div class="column" style="flex: 1">
										<div part="top-bar" class="row top-bar">
											<sl-icon-button
												.src=${wrapPathInSvg(mdiArrowLeft)}
												@click=${() => {
													this.showDetails = false;
												}}
											></sl-icon-button>
										</div>
										<div class="row" style="max-width: 600px;">
											<group-details
												.groupChatHash=${this.groupChatHash}
												style="flex: 1"
											>
											</group-details>
										</div>
									</div>
								</div>
							</div>
						</div>
					`;

				const [
					createGroupChat,
					currentGroupChat,
					messages,
					events,
					readMessages,
				] = groupInfo.value;
				return this.renderChat(
					createGroupChat,
					currentGroupChat,
					messages,
					events,
					readMessages.myReadMessages,
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
			sl-tag {
				max-width: 250px;
			}
		`,
	];
}
