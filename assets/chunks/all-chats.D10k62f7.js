import"./show-avatar-image.Bt_Btw72.js";import{S as w,p as $}from"./signal-watcher.CurgRbfO.js";import{i as f,x as s,m as l,f as u,r as A,g as v}from"./messenger-client.Bks7hfH7.js";import{c as y,_ as d,S as b,e as k,w as _,a as C,m as G,l as D,b as P}from"./styles.D7lbDD0V.js";import{n as g,c as x,t as T}from"./property.BL0qaIkn.js";import"./chunk.RWPQHXWX.B_DUdI__.js";import{m as N}from"./context.DmZ_f8Qc.js";import"./tslib.es6.kHcLnhpD.js";import"./reactive-element.CHpx6ykd.js";var H=f`
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`,c=class extends b{constructor(){super(...arguments),this.variant="primary",this.pill=!1,this.pulse=!1}render(){return s`
      <span
        part="base"
        class=${k({badge:!0,"badge--primary":this.variant==="primary","badge--success":this.variant==="success","badge--neutral":this.variant==="neutral","badge--warning":this.variant==="warning","badge--danger":this.variant==="danger","badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};c.styles=[y,H];d([g({reflect:!0})],c.prototype,"variant",2);d([g({type:Boolean,reflect:!0})],c.prototype,"pill",2);d([g({type:Boolean,reflect:!0})],c.prototype,"pulse",2);c.define("sl-badge");var z=f`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`,h=class extends b{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};h.styles=[y,z];d([g({type:Boolean,reflect:!0})],h.prototype,"vertical",2);d([_("vertical")],h.prototype,"handleVerticalChange",1);h.define("sl-divider");/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*M(e,t){const n=typeof t=="function";if(e!==void 0){let r=-1;for(const a of e)r>-1&&(yield n?t(r):t),r++,yield a}}var O=Object.defineProperty,j=Object.getOwnPropertyDescriptor,m=(e,t,n,r)=>{for(var a=r>1?void 0:r?j(t,n):t,i=e.length-1,p;i>=0;i--)(p=e[i])&&(a=(r?p(t,n,a):p(a))||a);return r&&a&&O(t,n,a),a};let o=class extends w(A){renderPeerChat(e){const t=e.lastActivity.signed_content.content;return s`<div
			class="row"
			style="gap: 8px; cursor: pointer;"
			@click=${()=>{this.dispatchEvent(new CustomEvent("peer-chat-selected",{composed:!0,bubbles:!0,detail:{peerChatHash:e.peerChatHash}}))}}
		>
			<div style="align-self: center">
				${this.renderAvatar(e.peer.agents[0],e.peer.profile)}
			</div>
			<div class="column" style="gap: 4px; flex: 1; overflow: hidden">
				<span
					>${this.renderAgentNickname(e.peer.agents[0],e.peer.profile)}</span
				>
				<span class="placeholder last-activity"
					>${t.type==="PeerMessage"?t.message.message:l("No messages yet.")}</span
				>
			</div>

			<div class="column" style="gap: 2px; justify-content: end">
				<div class="placeholder time" style="display: contents">
					${this.renderTime(e.lastActivity.signed_content.timestamp)}
				</div>
				<div style="flex: 1">
					${e.myUnreadMessages.length!==0?s`<sl-badge variant="primary" pill
								>${e.myUnreadMessages.length}</sl-badge
							>`:s`
								<sl-badge variant="primary" pill style="opacity: 0"
									>${e.myUnreadMessages.length}</sl-badge
								>
							`}
				</div>
			</div>
		</div>`}renderTime(e){e=e/1e3;const t=new Date;t.setHours(0),t.setMinutes(0),t.setMilliseconds(0);const n=t.valueOf(),r=new Date;r.setDate(t.getDate()-1),r.setHours(0),r.setMinutes(0),r.setMilliseconds(0);const a=r.valueOf();return e<a?s`<sl-format-date
				weekday="short"
				.date=${new Date(e)}
			></sl-format-date>`:a<e&&e<n?l("yesterday"):Date.now()-e<60*1e3?l("now"):Date.now()-e>46*60*1e3?s`
				<sl-format-date
					hour="numeric"
					minute="numeric"
					hour-format="24"
					.date=${new Date(e)}
				></sl-format-date>
			`:s`
			<sl-relative-time
				sync
				style="text-align: right"
				format="narrow"
				.date=${new Date(e)}
			>
			</sl-relative-time>
		`}renderAvatar(e,t){return t?s`<sl-avatar
				.image=${t.avatar_src}
			></sl-avatar>`:s` <agent-avatar .agentPubKey=${e}></agent-avatar> `}renderAgentNickname(e,t){var a;if(t)return s`<span>${t.nickname}</span>`;const n=this.profilesStore.profileForAgent.get(e).get();if(n.status!=="completed")return s`${l("Loading...")}`;if(!n.value)return s`${l("Profile not found")}`;const r=n.value.latestVersion.get();return r.status!=="completed"?s`${l("Profile not found")}`:s`<span>${(a=r.value)==null?void 0:a.entry.nickname}</span>`}renderGroupEventLastActivity(e,t,n){const r=e.members.find(a=>a.agents.find(i=>u(i)===u(t))).profile;switch(n.type){case"UpdateGroupInfo":return s`
					<span>
						${this.renderAgentNickname(t,r)}
						${l(v`updated the group's info.`)}
					</span>
				`;case"AddMember":return s`
					<span>
						${this.renderAgentNickname(n.member_agents[0],r)}&nbsp;${l(v`was added to the group.`)}
					</span>
				`;case"RemoveMember":return s`
					<span>
						${this.renderAgentNickname(t,r)}
						${l("removed")}&nbsp;${this.renderAgentNickname(n.member_agents[0],r)}&nbsp;${l("from the group.")}
					</span>
				`;case"LeaveGroup":return s`
					<span>
						${this.renderAgentNickname(t,r)}
						${l(v`left the group.`)}
					</span>
				`;case"DeleteGroup":return s`
					<span>
						${this.renderAgentNickname(t,r)}
						${l(v`deleted the group.`)}
					</span>
				`}}renderGroupLastActivity(e,t){const n=e.members.find(r=>!!r.agents.find(a=>u(a)===u(t.provenance)));if(t.signed_content.content.type==="CreateGroupChat")return s`<span
				>${this.renderAgentNickname(t.provenance,n.profile)}&nbsp;${l("created the group.")}
			</span>`;if(t.signed_content.content.type==="GroupMessage")return s`<span
				>${this.renderAgentNickname(t.provenance,n.profile)}:
				${t.signed_content.content.message.message}</span
			>`;if(t.signed_content.content.type==="GroupChatEvent")return this.renderGroupEventLastActivity(e,t.provenance,t.signed_content.content.event)}renderGroupChat(e){const t=e.currentGroup.info;return s`<div
			class="row"
			style="gap: 8px; cursor: pointer"
			@click=${()=>{this.dispatchEvent(new CustomEvent("group-chat-selected",{composed:!0,bubbles:!0,detail:{groupChatHash:e.groupChatHash}}))}}
		>
			${t.avatar_hash?s`
						<show-avatar-image
							.initials=${t.name.slice(0,2)}
							.imageHash=${t.avatar_hash}
							style="--size: 32px; align-self: center"
						>
						</show-avatar-image>
					`:s`
						<sl-avatar
							style="align-self: center; --size: 32px"
							.initials=${t.name.slice(0,2)}
						></sl-avatar>
					`}
			<div class="column" style="gap: 4px; flex: 1; overflow: hidden">
				<span class="chat-name">${t.name}</span>
				<span class="placeholder last-activity"
					>${this.renderGroupLastActivity(e.currentGroup,e.lastActivity)}</span
				>
			</div>

			<div class="column" style="gap: 2px; align-items: end">
				<div class="placeholder time" style="display: contents">
					${this.renderTime(e.lastActivity.signed_content.timestamp)}
				</div>
				<div style="flex: 1"></div>
				${e.myUnreadMessages.length!==0?s`<sl-badge variant="primary" pill
							>${e.myUnreadMessages.length}</sl-badge
						>`:s``}
			</div>
		</div>`}renderChats(e){return e.length===0?s`<div
				class="column placeholder"
				style="flex: 1; align-items: center; justify-content: center"
			>
				<div
					class="column"
					style="align-items: center; justify-content: center; gap: 8px"
				>
					<sl-icon
						.src=${C(P)}
						style="height: 64px; width: 64px"
					></sl-icon>
					<span>${l("There are no chats yet.")}</span>
				</div>
			</div>`:s`<div class="column" style="flex: 1; overflow: hidden">
			${M(e.map(t=>t.type==="PeerChat"?this.renderPeerChat(t):this.renderGroupChat(t)),s`<sl-divider></sl-divider>`)}
		</div>`}render(){const e=this.store.allChats.get();switch(e.status){case"pending":return s`
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
				`;case"error":return s`<display-error
					.headline=${l("Error fetching the chats")}
					.error=${e.error}
				></display-error>`;case"completed":return this.renderChats(e.value)}}};o.styles=[G,f`
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
		`];m([x({context:N,subscribe:!0})],o.prototype,"store",2);m([x({context:$,subscribe:!0})],o.prototype,"profilesStore",2);o=m([D(),T("all-chats")],o);export{o as AllChats};
