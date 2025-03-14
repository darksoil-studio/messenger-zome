import{S as w,p as $}from"./context.CP7mVcaJ.js";import{c as y,_ as d,S as b,e as A,w as k,a as C,m as _,b as P,l as G}from"./styles.1LkFSSyP.js";import{i as f,x as r,m as n,f as v,g,r as D}from"./messenger-client.CrBQT6S4.js";import{a as c,c as x,t as T}from"./property.COiWTaZV.js";import"./chunk.UJ4C5V3J.BgoNkNvF.js";import{m as N}from"./context.BUoRP9Rb.js";import"./tslib.es6.kHcLnhpD.js";var H=f`
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
`,p=class extends b{constructor(){super(...arguments),this.variant="primary",this.pill=!1,this.pulse=!1}render(){return r`
      <span
        part="base"
        class=${A({badge:!0,"badge--primary":this.variant==="primary","badge--success":this.variant==="success","badge--neutral":this.variant==="neutral","badge--warning":this.variant==="warning","badge--danger":this.variant==="danger","badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};p.styles=[y,H];d([c({reflect:!0})],p.prototype,"variant",2);d([c({type:Boolean,reflect:!0})],p.prototype,"pill",2);d([c({type:Boolean,reflect:!0})],p.prototype,"pulse",2);p.define("sl-badge");var M=f`
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
`,h=class extends b{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};h.styles=[y,M];d([c({type:Boolean,reflect:!0})],h.prototype,"vertical",2);d([k("vertical")],h.prototype,"handleVerticalChange",1);h.define("sl-divider");/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*O(e,t){const a=typeof t=="function";if(e!==void 0){let s=-1;for(const l of e)s>-1&&(yield a?t(s):t),s++,yield l}}var z=Object.defineProperty,L=Object.getOwnPropertyDescriptor,m=(e,t,a,s)=>{for(var l=s>1?void 0:s?L(t,a):t,i=e.length-1,u;i>=0;i--)(u=e[i])&&(l=(s?u(t,a,l):u(l))||l);return s&&l&&z(t,a,l),l};let o=class extends w(D){renderPeerChat(e){const t=e.lastActivity.event.content;return r`<div
			class="row"
			style="gap: 8px; cursor: pointer;"
			@click=${()=>{this.dispatchEvent(new CustomEvent("peer-chat-selected",{composed:!0,bubbles:!0,detail:{peerChatHash:e.peerChatHash}}))}}
		>
			<div style="align-self: center">
				${this.renderAvatar(e.peer.agents[0],void 0)}
			</div>
			<div class="column" style="gap: 4px; flex: 1; overflow: hidden">
				<span>${this.renderAgentNickname(e.peer.agents[0],void 0)}</span>
				<span class="placeholder last-activity"
					>${t.type==="PeerMessage"?t.message.message:n("No messages yet.")}</span
				>
			</div>

			<div class="column" style="gap: 2px; justify-content: end">
				<div class="placeholder time" style="display: contents">
					${this.renderTime(e.lastActivity.event.timestamp)}
				</div>
				<div style="flex: 1">
					${e.myUnreadMessages.length!==0?r`<sl-badge variant="primary" pill
								>${e.myUnreadMessages.length}</sl-badge
							>`:r`
								<sl-badge variant="primary" pill style="opacity: 0"
									>${e.myUnreadMessages.length}</sl-badge
								>
							`}
				</div>
			</div>
		</div>`}renderTime(e){e=e/1e3;const t=new Date;t.setHours(0),t.setMinutes(0),t.setMilliseconds(0);const a=t.valueOf(),s=new Date;s.setDate(t.getDate()-1),s.setHours(0),s.setMinutes(0),s.setMilliseconds(0);const l=s.valueOf();return e<l?r`<sl-format-date
				weekday="short"
				.date=${new Date(e)}
			></sl-format-date>`:l<e&&e<a?n("yesterday"):Date.now()-e<60*1e3?n("now"):Date.now()-e>46*60*1e3?r`
				<sl-format-date
					hour="numeric"
					minute="numeric"
					hour-format="24"
					.date=${new Date(e)}
				></sl-format-date>
			`:r`
			<sl-relative-time
				sync
				style="text-align: right"
				format="narrow"
				.date=${new Date(e)}
			>
			</sl-relative-time>
		`}renderAvatar(e,t){return t?r`<sl-avatar .image=${t.avatar}></sl-avatar>`:r` <agent-avatar .agentPubKey=${e}></agent-avatar> `}renderAgentNickname(e,t){var s;if(t)return r`<span>${t.name}</span>`;const a=this.profilesProvider.currentProfileForAgent.get(e).get();return a.status!=="completed"?r`${n("Loading...")}`:a.value?r`<span>${(s=a.value)==null?void 0:s.name}</span>`:r`${n("Profile not found")}`}renderGroupEventLastActivity(e,t,a){const s=e.members.find(l=>l.agents.find(i=>v(i)===v(t))).profile;switch(a.type){case"UpdateGroupInfo":return r`
					<span>
						${this.renderAgentNickname(t,s)}
						${n(g`updated the group's info.`)}
					</span>
				`;case"AddMember":return r`
					<span>
						${this.renderAgentNickname(a.member_agents[0],s)}&nbsp;${n(g`was added to the group.`)}
					</span>
				`;case"RemoveMember":return r`
					<span>
						${this.renderAgentNickname(t,s)}
						${n("removed")}&nbsp;${this.renderAgentNickname(a.member_agents[0],s)}&nbsp;${n("from the group.")}
					</span>
				`;case"LeaveGroup":return r`
					<span>
						${this.renderAgentNickname(t,s)}
						${n(g`left the group.`)}
					</span>
				`;case"DeleteGroup":return r`
					<span>
						${this.renderAgentNickname(t,s)}
						${n(g`deleted the group.`)}
					</span>
				`}}renderGroupLastActivity(e,t){const a=e.members.find(s=>!!s.agents.find(l=>v(l)===v(t.author)));if(t.event.content.type==="CreateGroupChat")return r`<span
				>${this.renderAgentNickname(t.author,a.profile)}&nbsp;${n("created the group.")}
			</span>`;if(t.event.content.type==="GroupMessage")return r`<span
				>${this.renderAgentNickname(t.author,a.profile)}:
				${t.event.content.message.message}</span
			>`;if(t.event.content.type==="GroupChatEvent")return this.renderGroupEventLastActivity(e,t.author,t.event.content.event)}renderGroupChat(e){const t=e.currentGroup.info;return r`<div
			class="row"
			style="gap: 8px; cursor: pointer"
			@click=${()=>{this.dispatchEvent(new CustomEvent("group-chat-selected",{composed:!0,bubbles:!0,detail:{groupChatHash:e.groupChatHash}}))}}
		>
			<sl-avatar
				style="align-self: center; --size: 32px"
				.image=${t.avatar}
				.initials=${t.name.slice(0,2)}
			></sl-avatar>

			<div class="column" style="gap: 4px; flex: 1; overflow: hidden">
				<span class="chat-name">${t.name}</span>
				<span class="placeholder last-activity"
					>${this.renderGroupLastActivity(e.currentGroup,e.lastActivity)}</span
				>
			</div>

			<div class="column" style="gap: 2px; align-items: end">
				<div class="placeholder time" style="display: contents">
					${this.renderTime(e.lastActivity.event.timestamp)}
				</div>
				<div style="flex: 1"></div>
				${e.myUnreadMessages.length!==0?r`<sl-badge variant="primary" pill
							>${e.myUnreadMessages.length}</sl-badge
						>`:r``}
			</div>
		</div>`}renderChats(e){return e.length===0?r`<div
				class="column placeholder"
				style="flex: 1; align-items: center; justify-content: center; gap: 8px"
			>
				<sl-icon
					.src=${C(_)}
					style="height: 64px; width: 64px"
				></sl-icon>
				<span>${n("There are no chats yet.")}</span>
			</div>`:r`<div class="column" style="flex: 1; overflow: hidden">
			${O(e.map(t=>t.type==="PeerChat"?this.renderPeerChat(t):this.renderGroupChat(t)),r`<sl-divider></sl-divider>`)}
		</div>`}render(){const e=this.store.allChats.get();switch(e.status){case"pending":return r`
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
				`;case"error":return r`<display-error
					.headline=${n("Error fetching the chats")}
					.error=${e.error}
				></display-error>`;case"completed":return this.renderChats(e.value)}}};o.styles=[P,f`
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
		`];m([x({context:N,subscribe:!0})],o.prototype,"store",2);m([x({context:$,subscribe:!0}),c()],o.prototype,"profilesProvider",2);o=m([G(),T("all-chats")],o);export{o as AllChats};
