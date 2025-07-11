import {
	hashProperty,
	notifyError,
	onSubmit,
	wrapPathInSvg,
} from '@darksoil-studio/holochain-elements';
import '@darksoil-studio/holochain-elements/dist/elements/display-error.js';
import '@darksoil-studio/holochain-elements/dist/elements/select-avatar.js';
import { SignalWatcher, joinAsync } from '@darksoil-studio/holochain-signals';
import {
	SignedEntry,
	SignedEvent,
} from '@darksoil-studio/private-event-sourcing-zome';
import {
	ProfilesProvider,
	profilesProviderContext,
} from '@darksoil-studio/profiles-provider';
import '@darksoil-studio/profiles-provider/dist/elements/agent-avatar.js';
import { SearchUsers } from '@darksoil-studio/profiles-provider/dist/elements/search-users.js';
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
import { mdiArrowLeft, mdiClose, mdiDelete, mdiPencil } from '@mdi/js';
import { SlButton, SlDialog } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/details/details.js';
import '@shoelace-style/shoelace/dist/components/format-date/format-date.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import ColorHash from 'color-hash';
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';

import { messengerStoreContext } from '../context.js';
import { EventSet, orderInEventSets } from '../event-set.js';
import { MessengerStore } from '../messenger-store.js';
import { messengerStyles } from '../styles.js';
import {
	CreateGroupChat,
	GroupChat,
	GroupChatEvent,
	GroupInfo,
	GroupMessage,
	Message,
} from '../types.js';
import './group-info.js';
import './group-members.js';
import './group-settings.js';
import './message-input.js';
import { seenStatus } from './seen-status.js';

function closestPassShadow(node: Node | null, selector: string) {
	if (!node) {
		return null;
	}

	if (node instanceof ShadowRoot) {
		return closestPassShadow(node.host, selector);
	}

	if (node instanceof HTMLElement) {
		if (node.matches(selector)) {
			return node;
		} else {
			return closestPassShadow(node.parentNode, selector);
		}
	}

	return closestPassShadow(node.parentNode, selector);
}

@localized()
@customElement('group-chat')
export class GroupChatEl extends SignalWatcher(LitElement) {
	@property(hashProperty('group-chat-hash'))
	groupChatHash!: EntryHash;

	@consume({ context: messengerStoreContext, subscribe: true })
	store!: MessengerStore;

	@state()
	view: 'chat' | 'details' | 'add-members' | 'edit-info' = 'chat';

	get shoelaceTheme(): 'light' | 'dark' {
		const darkClassElement = closestPassShadow(this, '.sl-theme-dark');
		return darkClassElement ? 'dark' : 'light';
	}

	get colorHash() {
		if (this.shoelaceTheme === 'dark')
			return new ColorHash({ lightness: [0.7, 0.8, 0.9] });
		return new ColorHash({ lightness: [0.1, 0.2, 0.3, 0.4] });
	}

	/**
	 * Profiles provider
	 */
	@consume({ context: profilesProviderContext, subscribe: true })
	@property()
	profilesProvider!: ProfilesProvider;

	private renderEvent(
		currentGroup: GroupChat,
		event: SignedEvent<GroupChatEvent>,
	) {
		switch (event.payload.content.event.event.type) {
			case 'UpdateGroupInfo':
				return html`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(currentGroup, event.author)}
						&nbsp;${msg(str`updated the group's info.`)}
					</sl-tag>
				`;
			case 'AddMember':
				return html`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(
							currentGroup,
							event.payload.content.event.event.member_agents[0],
						)}&nbsp;${msg(str`was added to the group.`)}
					</sl-tag>
				`;
			case 'RemoveMember':
				return html`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(currentGroup, event.author)}
						&nbsp;${msg('removed')}&nbsp;${this.renderAgentNickname(
							currentGroup,
							event.payload.content.event.event.member_agents[0],
						)}&nbsp;${msg('from the group.')}
					</sl-tag>
				`;
			case 'LeaveGroup':
				return html`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(currentGroup, event.author)}
						&nbsp;${msg(str`left the group.`)}
					</sl-tag>
				`;
			case 'DeleteGroup':
				return html`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(currentGroup, event.author)}
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
						this.view = 'details';
					}}
				>
					<sl-avatar
						style="--size: 32px"
						.image=${groupChat.info.avatar}
						.initials=${groupChat.info.name.slice(0, 2)}
					></sl-avatar>
					<span>${groupChat.info.name} </span>
				</div>
			</div>
		`;
	}

	private renderChat(
		createGroupChat: SignedEvent<CreateGroupChat>,
		currentGroup: GroupChat,
		messages: Record<
			EntryHashB64,
			SignedEvent<{ type: 'GroupMessage' } & GroupMessage>
		>,
		events: Record<
			EntryHashB64,
			SignedEvent<{ type: 'GroupChatEvent' } & GroupChatEvent>
		>,
		myReadMessages: EntryHashB64[],
		eventsSentToRecipients: Record<
			EntryHashB64,
			Record<AgentPubKeyB64, number>
		>,
		acknowledgements: Record<EntryHashB64, Record<AgentPubKeyB64, number>>,
		theirReadMessages: Record<AgentPubKeyB64, Array<EntryHashB64>>,
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
				const type = e[1].payload.content.event.event.type;
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
			<div part="chat" class="column" style="flex: 1;">
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
												encodeHashToBase64(eventSet[0][1].author),
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
									currentGroup,
									myAgentsB64,
									eventSetsInDay.day,
									eventSetsInDay.eventsSets,
									eventsSentToRecipients,
									acknowledgements,
									theirReadMessages,
								),
							)}
							<div class="row" style="justify-content: center">
								<sl-tag style="align-self: center; margin: 8px">
									${msg(str`Group was created by`)}&nbsp;
									${this.renderAgentNickname(
										currentGroup,
										createGroupChat.author,
									)}
								</sl-tag>
							</div>
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
		currentGroup: GroupChat,
		myAgentsB64: Array<AgentPubKeyB64>,
		day: Date,
		eventsSets: Array<
			EventSet<
				| ({ type: 'GroupChatEvent' } & GroupChatEvent)
				| ({ type: 'GroupMessage' } & GroupMessage)
			>
		>,
		eventsSentToRecipients: Record<
			EntryHashB64,
			Record<AgentPubKeyB64, number>
		>,
		acknowledgements: Record<EntryHashB64, Record<AgentPubKeyB64, number>>,
		theirReadMessages: Record<AgentPubKeyB64, Array<EntryHashB64>>,
	) {
		return html`
			<div class="column" style="gap: 8px; flex-direction: column-reverse">
				${eventsSets.map(eventSet =>
					eventSet[0][1].payload.content.event.type === 'GroupMessage'
						? myAgentsB64.includes(encodeHashToBase64(eventSet[0][1].author))
							? this.renderMessageSetFromMe(
									eventsSentToRecipients,
									acknowledgements,
									theirReadMessages,
									eventSet as EventSet<GroupMessage>,
								)
							: this.renderMessageSetToMe(
									currentGroup,
									eventSet as EventSet<GroupMessage>,
								)
						: this.renderEvent(
								currentGroup,
								eventSet[0][1] as SignedEvent<GroupChatEvent>,
							),
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

	private renderMessageSetFromMe(
		eventsSentToRecipients: Record<
			EntryHashB64,
			Record<AgentPubKeyB64, number>
		>,
		acknowledgements: Record<EntryHashB64, Record<AgentPubKeyB64, number>>,
		theirReadMessages: Record<AgentPubKeyB64, Array<EntryHashB64>>,
		messageSet: EventSet<GroupMessage>,
	) {
		const lastMessage = messageSet[0][1];
		const timestamp = lastMessage.payload.timestamp / 1000;
		const date = new Date(timestamp);
		const lessThanAMinuteAgo = Date.now() - timestamp < 60 * 1000;
		const moreThanAnHourAgo = Date.now() - timestamp > 46 * 60 * 1000;
		return html`
			<div class="column from-me" style="flex-direction: column-reverse">
				${messageSet.map(
					([messageHash, message], i) => html`
						<div
							class="message row"
							style="align-items: end; flex-wrap: wrap; gap: 16px;"
						>
							<span style="flex: 1; word-break: break-all"
								>${message.payload.content.event.message.message}</span
							>
							${i === 0
								? html`
										<div
											class="placeholder column"
											style="font-size: 12px; text-align: right"
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
										${this.seenStatus(
											eventsSentToRecipients,
											acknowledgements,
											theirReadMessages,
											messageHash,
										)}
									`
								: html``}
						</div>
					`,
				)}
			</div>
		`;
	}

	seenStatus(
		eventsSentToRecipients: Record<
			EntryHashB64,
			Record<AgentPubKeyB64, number>
		>,
		acknowledgements: Record<EntryHashB64, Record<AgentPubKeyB64, number>>,
		theirReadMessages: Record<AgentPubKeyB64, Array<EntryHashB64>>,
		messageHash: EntryHashB64,
	) {
		if (Object.values(theirReadMessages).find(rm => rm.includes(messageHash)))
			return seenStatus('seen');
		if (acknowledgements[messageHash]) return seenStatus('received');
		if (eventsSentToRecipients[messageHash]) return seenStatus('sent');
		return html``;
	}

	renderAgentNickname(currentGroup: GroupChat, agent: AgentPubKey) {
		let profile = currentGroup.members.find(member =>
			member.agents.find(
				a => encodeHashToBase64(a) === encodeHashToBase64(agent),
			),
		)!.profile;

		if (this.profilesProvider.profilesArePublic && !profile) {
			const profileResult = this.profilesProvider.currentProfileForAgent
				.get(agent)
				.get();
			if (profileResult.status !== 'completed' || !profileResult.value)
				return html`${msg('Profile not found.')}`;
			profile = profileResult.value;
		}

		return html`
			<span
				style=${styleMap({
					color: this.colorHash.hex(encodeHashToBase64(agent)),
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
				>${profile!.name}</span
			>
		`;
	}

	private renderMessageSetToMe(
		currentGroup: GroupChat,
		messageSet: EventSet<GroupMessage>,
	) {
		const lastMessage = messageSet[0][1];
		const timestamp = lastMessage.payload.timestamp / 1000;
		const date = new Date(timestamp);
		const lessThanAMinuteAgo = Date.now() - timestamp < 60 * 1000;
		const moreThanAnHourAgo = Date.now() - timestamp > 46 * 60 * 1000;
		return html` <div class="row" style="gap: 8px; align-items: end">
			<agent-avatar .agentPubKey=${lastMessage.author}></agent-avatar>

			<div
				class="column"
				style="flex-direction: column-reverse; align-items: start"
			>
				${messageSet.map(
					([messageHash, message], i) => html`

						<div class="colum message" style="gap:8px">
							${
								i === messageSet.length - 1
									? this.renderAgentNickname(currentGroup, message.author)
									: html``
							}
							<div
								class="row"
								style="gap: 16px; align-items: end; flex-wrap: wrap; "
							>
								<span style="flex: 1; word-break: break-all"
									>${message.payload.content.event.message.message}</span
								>
								${
									i === 0
										? html`
												<div
													class="placeholder column"
													style="font-size: 12px; text-align: right"
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

	private groupInfo() {
		const groupStore = this.store.groupChats.get(this.groupChatHash);

		return joinAsync([
			groupStore.originalGroupChat.get(),
			groupStore.currentGroupChat.get(),
			groupStore.messages.get(),
			groupStore.events.get(),
			groupStore.readMessages.get(),
			groupStore.messengerStore.eventsSentToRecipients.get(),
			groupStore.messengerStore.acknowledgements.get(),
		]);
	}

	// eslint-disable-next-line
	async updateGroupInfo(fields: Record<string, any>) {
		const button = this.shadowRoot!.getElementById(
			'save-group-info',
		) as SlButton;
		button.loading = true;
		try {
			await this.store.groupChats.get(this.groupChatHash).updateGroupChatInfo({
				avatar: fields.avatar === 'null' ? undefined : fields.avatar,
				name: fields.name,
				description: fields.description,
			});
			this.view = 'details';
		} catch (e) {
			console.log(e);
			notifyError(msg("Error updating the group's info."));
		}
		button.loading = false;
	}

	get usersToBeAdded() {
		const searchUsers = this.shadowRoot?.getElementById('users') as SearchUsers;
		if (!searchUsers) return undefined;
		return searchUsers.value;
	}

	async addMembers() {
		try {
			const usersToBeAdded = this.usersToBeAdded!;

			for (const userToBeAdded of usersToBeAdded) {
				await this.store.groupChats
					.get(this.groupChatHash)
					.addMember(userToBeAdded);
			}

			this.view = 'details';
		} catch (e) {
			console.log(e);
			notifyError(msg('Error adding members.'));
		}
	}

	private renderAddMembers(groupChat: GroupChat) {
		return html`
			<div class="column" style="flex: 1">
				<div
					part="top-bar"
					class="row top-bar"
					style="gap: 8px; align-items: center"
				>
					<sl-icon-button
						.src=${wrapPathInSvg(mdiArrowLeft)}
						@click=${() => {
							this.view = 'details';
						}}
					></sl-icon-button>
					<span>${msg('Add members')}</span>
				</div>

				<div class="flex-scrollable-parent" style="flex: 1">
					<div class="flex-scrollable-container">
						<div class="flex-scrollable-y">
							<div class="row" style="justify-content: center; flex: 1;">
								<sl-card
									style="flex-basis: 500px; align-self: start; margin: 16px"
								>
									<div class="column" style="gap: 16px; flex: 1">
										<search-users
											id="users"
											.excludedUsers=${groupChat.members
												.filter(m => !m.removed)
												.map(m => m.agents)}
											@user-selected=${(e: CustomEvent) => {
												this.requestUpdate();
											}}
											style="min-height: 200px"
										>
										</search-users>

										<sl-button
											variant="primary"
											.disabled=${this.usersToBeAdded &&
											this.usersToBeAdded.length === 0}
											@click=${async (e: CustomEvent) => {
												const button = e.target as SlButton;
												button.loading = true;
												this.addMembers().finally(() => {
													button.loading = false;
												});
											}}
											>${msg('Add members')}
										</sl-button>
									</div>
								</sl-card>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	private renderEditInfo(info: GroupInfo) {
		return html`
			<form
				class="column"
				style="flex: 1"
				${onSubmit(fields => this.updateGroupInfo(fields))}
			>
				<div
					part="top-bar"
					class="row top-bar"
					style="gap: 8px; align-items: center "
				>
					<sl-icon-button
						.src=${wrapPathInSvg(mdiClose)}
						@click=${() => {
							this.view = 'details';
						}}
					></sl-icon-button>
					<span>${msg('Edit group info')}</span>
				</div>

				<div class="row" style="justify-content: center; flex: 1; margin: 16px">
					<sl-card style="flex-basis: 500px; align-items: start">
						<div class="column" style="gap: 16px; flex: 1">
							<div class="row" style="align-items: start; gap: 16px">
								<select-avatar
									name="avatar"
									.label=${msg('Image*')}
									.value=${info.avatar}
								></select-avatar>
								<sl-input
									required
									.label=${msg('Name')}
									name="name"
									.value=${info.name}
									style="flex: 1"
								></sl-input>
							</div>
							<sl-textarea
								.label=${msg('Description')}
								name="description"
								.value=${info.description}
							></sl-textarea>
							<div style="flex: 1"></div>
							<sl-button id="save-group-info" type="submit" variant="primary"
								>${msg('Save Group Info')}
							</sl-button>
						</div>
					</sl-card>
				</div>
			</form>
		`;
	}

	private renderDetails(groupChat: GroupChat) {
		const me = groupChat.members.find(m =>
			m.agents.find(
				a =>
					encodeHashToBase64(a) ===
					encodeHashToBase64(this.store.client.client.myPubKey),
			),
		)!;

		return html`
			<div class="column" style="flex: 1">
				<div part="top-bar" class="row top-bar" style="align-items: center">
					<sl-icon-button
						.src=${wrapPathInSvg(mdiArrowLeft)}
						@click=${() => {
							this.view = 'chat';
						}}
					></sl-icon-button>
					<div style="flex: 1"></div>
				</div>
				<div class="flex-scrollable-parent">
					<div class="flex-scrollable-container">
						<div class="flex-scrollable-y">
							<div
								class="row"
								style="justify-content: center; flex: 1; margin: 8px; margin-top: 0"
							>
								<div class="column" style="gap: 16px; flex-basis: 500px">
									<group-info .groupChatHash=${this.groupChatHash}>
										${!groupChat.deleted &&
										!me.removed &&
										(me.admin ||
											!groupChat.settings.only_admins_can_edit_group_info)
											? html`
													<sl-button
														slot="action"
														@click=${() => {
															this.view = 'edit-info';
														}}
														circle
														variant="primary"
														outline
													>
														<sl-icon .src=${wrapPathInSvg(mdiPencil)}>
														</sl-icon>
													</sl-button>
												`
											: html``}
									</group-info>

									<sl-card>
										<group-members
											style="flex: 1"
											.groupChatHash=${this.groupChatHash}
											@add-members-clicked=${() => {
												this.view = 'add-members';
											}}
										></group-members>
									</sl-card>

									${!groupChat.deleted
										? html` <sl-details .summary=${msg('Settings')}>
												<group-settings
													.groupChatHash=${this.groupChatHash}
												></group-settings>
											</sl-details>`
										: html``}
									${!groupChat.deleted && !me.removed
										? html`
												<sl-dialog
													id="leave-group-dialog"
													.label=${msg('Leave Group')}
												>
													<span
														>${msg(
															'Are you sure you want to leave this group?',
														)}
													</span>
													<sl-button
														slot="footer"
														@click=${async (e: CustomEvent) => {
															const button = e.target as SlButton;
															button.loading = true;
															try {
																await this.store.groupChats
																	.get(this.groupChatHash)
																	.leaveGroup();
															} catch (e) {
																console.log(e);
																notifyError(msg('Error leaving the group.'));
															}
															button.loading = false;
														}}
														variant="danger"
														>${msg('Leave Group')}
													</sl-button>
												</sl-dialog>
												<sl-button
													variant="danger"
													outline
													@click=${async () => {
														const dialog = this.shadowRoot!.getElementById(
															'leave-group-dialog',
														) as SlDialog;
														dialog.show();
													}}
												>
													<sl-icon
														slot="prefix"
														.src=${wrapPathInSvg(mdiClose)}
													>
													</sl-icon>
													${msg('Leave group')}
												</sl-button>
											`
										: html``}
									${me.admin && !me.removed && !groupChat.deleted
										? html`<sl-dialog
													id="delete-group-dialog"
													.label=${msg('Delete Group')}
												>
													<span
														>${msg(
															'Are you sure you want to delete this group?',
														)}
													</span>
													<sl-button
														slot="footer"
														@click=${async (e: CustomEvent) => {
															const button = e.target as SlButton;
															button.loading = true;
															try {
																await this.store.groupChats
																	.get(this.groupChatHash)
																	.deleteGroupChat();
															} catch (e) {
																console.log(e);
																notifyError(msg('Error deleting the group.'));
															}
															button.loading = false;
														}}
														variant="danger"
														>${msg('Delete Group')}
													</sl-button>
												</sl-dialog>
												<sl-button
													variant="danger"
													outline
													@click=${async () => {
														const dialog = this.shadowRoot!.getElementById(
															'delete-group-dialog',
														) as SlDialog;
														dialog.show();
													}}
												>
													<sl-icon
														slot="prefix"
														.src=${wrapPathInSvg(mdiDelete)}
													>
													</sl-icon>
													${msg('Delete group')}
												</sl-button> `
										: html``}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	renderView(
		createGroupChat: SignedEvent<CreateGroupChat>,
		currentGroup: GroupChat,
		messages: Record<
			EntryHashB64,
			SignedEvent<{ type: 'GroupMessage' } & GroupMessage>
		>,
		events: Record<
			EntryHashB64,
			SignedEvent<{ type: 'GroupChatEvent' } & GroupChatEvent>
		>,
		myReadMessages: EntryHashB64[],
		eventsSentToRecipients: Record<
			EntryHashB64,
			Record<AgentPubKeyB64, number>
		>,
		acknowledgements: Record<EntryHashB64, Record<AgentPubKeyB64, number>>,
		theirReadMessages: Record<AgentPubKeyB64, Array<EntryHashB64>>,
	) {
		switch (this.view) {
			case 'chat':
				return this.renderChat(
					createGroupChat,
					currentGroup,
					messages,
					events,
					myReadMessages,
					eventsSentToRecipients,
					acknowledgements,
					theirReadMessages,
				);
			case 'details':
				return this.renderDetails(currentGroup);
			case 'add-members':
				return this.renderAddMembers(currentGroup);
			case 'edit-info':
				return this.renderEditInfo(currentGroup.info);
		}
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
				const [
					createGroupChat,
					currentGroupChat,
					messages,
					events,
					readMessages,
					eventsSentToRecipients,
					acknowledgements,
				] = groupInfo.value;
				return this.renderView(
					createGroupChat,
					currentGroupChat,
					messages,
					events,
					readMessages.myReadMessages,
					eventsSentToRecipients,
					acknowledgements,
					readMessages.theirReadMessages,
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
				max-width: 400px;
			}
		`,
	];
}
