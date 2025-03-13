import{l as K}from"./context.CEPY6pde.js";import{i as k,r as b,x as s,m,t as E,f as c,k as D,l as B}from"./messenger-client.Xgv8kjK5.js";import{S as x}from"./signal-watcher.CCnljk_y.js";import{_ as n}from"./tslib.es6.kHcLnhpD.js";import{b as z,a as l,c as $,t as P}from"./property.9e9_4Dyz.js";import{n as w,l as A,A as I,a as F,G as j,e as L,b as O}from"./styles.B87_XgVZ.js";import{p as M}from"./context.DLVIJArb.js";import"./chunk.UJ4C5V3J.FPLQwGNR.js";import{o as R}from"./message-input.C6WxqoDu.js";import{n as G,a as N}from"./chunk.UG6RICOR.BqzUYkit.js";import{m as U}from"./context.CjZT0WpV.js";let p=class extends x(b){constructor(){super(...arguments),this.size=32,this.disableTooltip=!1,this.disableCopy=!1}renderIdenticon(){return this.agentPubKey?s` <div
			style=${I({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
		>
			<holo-identicon
				.disableCopy=${this.disableCopy}
				.disableTooltip=${this.disableTooltip}
				.hash=${this.agentPubKey}
				.size=${this.size}
			>
			</holo-identicon>
			<div class="badge"><slot name="badge"></slot></div>
		</div>`:s`
				<sl-icon
					style=${I({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
					.src=${F(j)}
				>
				</sl-icon>
			`}renderProfile(t){if(!t||!t.avatar)return this.renderIdenticon();const r=s`
			<div
				style=${I({cursor:this.disableCopy?"":"pointer",position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
			>
				<sl-avatar
					.image=${t.avatar}
					style="--size: ${this.size}px; display: flex;"
					@click=${()=>this.dispatchEvent(new CustomEvent("profile-clicked",{composed:!0,bubbles:!0,detail:{agentPubKey:this.agentPubKey}}))}
				>
				</sl-avatar>
				<div class="badge"><slot name="badge"></slot></div>
			</div>
		`;return s`
			<sl-tooltip
				id="tooltip"
				placement="top"
				.trigger=${this.disableTooltip?"manual":"hover focus"}
				hoist
				.content=${t.name}
			>
				${r}
			</sl-tooltip>
		`}render(){const t=this.profilesProvider.currentProfileForAgent.get(this.agentPubKey).get();switch(t.status){case"pending":return s`<sl-skeleton
					effect="pulse"
					style="height: ${this.size}px; width: ${this.size}px"
				></sl-skeleton>`;case"error":return s`
					<display-error
						tooltip
						.headline=${m("Error fetching the user's profile.")}
						.error=${t.error}
					></display-error>
				`;case"completed":return this.renderProfile(t.value)}}};p.styles=[z,k`
			.badge {
				position: absolute;
				right: 0;
				bottom: 0;
			}
			:host {
				height: 32px;
			}
		`];n([l(w("agent-pub-key"))],p.prototype,"agentPubKey",void 0);n([l({type:Number})],p.prototype,"size",void 0);n([l({type:Boolean,attribute:"disable-tooltip"})],p.prototype,"disableTooltip",void 0);n([l({type:Boolean,attribute:"disable-copy"})],p.prototype,"disableCopy",void 0);n([$({context:M,subscribe:!0}),l()],p.prototype,"profilesProvider",void 0);p=n([A(),P("agent-avatar")],p);let T=class extends x(b){render(){return s`<div class="row" style="align-items: center; width: 150px">
      <sl-skeleton
        effect="sheen"
        style="height: 32px; width: 32px; border-radius: 50%; margin: 8px"
      ></sl-skeleton
      ><sl-skeleton
        effect="sheen"
        style="flex: 1; margin: 8px; border-radius: 12px"
      >
      </sl-skeleton>
    </div>`}static get styles(){return[z,k`
        :host {
          display: flex;
        }
      `]}};T=n([P("profile-list-item-skeleton")],T);let f=class extends x(b){render(){var t;const r=this.profilesProvider.currentProfileForAgent.get(this.agentPubKey).get();switch(r.status){case"pending":return s`<profile-list-item-skeleton></profile-list-item-skeleton>`;case"completed":return s`
					<div class="row" style="align-items: center; gap: 8px">
						<agent-avatar .agentPubKey=${this.agentPubKey}></agent-avatar>
						<span>${(t=r.value)===null||t===void 0?void 0:t.name}</span>
					</div>
				`;case"error":return s`<display-error
					tooltip
					.headline=${m("Error fetching the profile.")}
					.error=${r.error}
				></display-error>`}}};f.styles=[z];n([l(w("agent-pub-key"))],f.prototype,"agentPubKey",void 0);n([$({context:M,subscribe:!0}),l()],f.prototype,"profilesProvider",void 0);f=n([A(),P("profile-list-item")],f);var W=Object.defineProperty,q=Object.getOwnPropertyDescriptor,y=(e,t,r,i)=>{for(var a=i>1?void 0:i?q(t,r):t,d=e.length-1,h;d>=0;d--)(h=e[d])&&(a=(i?h(t,r,a):h(a))||a);return i&&a&&W(t,r,a),a};let g=class extends x(b){async firstUpdated(){if(!this.peer&&!this.peerChatHash)throw new Error('peer-chat must be initialized with either the "peerChatHash" or the "peer" input.');if(this.peer&&!this.peerChatHash){const e=await E(this.store.peerChatsForPeer.get(this.peer));e.length===0?this.peerChatHash=await this.store.client.createPeerChat(this.peer):this.peerChatHash=e[0]}}renderTopBar(e){const t=e.peer_1.agents.find(r=>c(r)===c(this.store.client.client.myPubKey))?e.peer_2:e.peer_1;return s`
			<div
				part="top-bar"
				class="row top-bar"
				style="align-items: center; gap: 8px"
			>
				<slot name="top-bar-left-action"></slot>
				<profile-list-item .agentPubKey=${t.agents[0]}> </profile-list-item>
			</div>
		`}renderTypingIndicator(){return s`
			<div class="row">
				<div class="typing-indicator">
					<span>...</span>
				</div>
			</div>
		`}renderChat(e,t,r){const i=this.store.peerChats.get(this.peerChatHash).peerIsTyping.get(),a=e.peer_1.agents.find(o=>c(o)===c(this.store.client.client.myPubKey)),d=a?e.peer_1.agents:e.peer_2.agents,h=a?e.peer_2.agents:e.peer_1.agents,v=d.map(c),C=R(t,[e.peer_1.agents,e.peer_2.agents]);return s`<div class="column" style="flex: 1;">
			${this.renderTopBar(e)}
			<div part="chat" class="column" style="flex: 1; margin: 8px">
				<div class="flex-scrollable-parent">
					<div class="flex-scrollable-container">
						<div
							${G(o=>{if(!o)return;const S=[].concat(...C.map(u=>u.eventsSets)).filter(u=>!v.includes(c(u[0][1].author))),_=[];for(const u of S)for(const[H,J]of u)r.includes(H)||_.push(D(H));_.length>0&&this.store.peerChats.get(this.peerChatHash).markMessagesAsRead(_)})}
							class="flex-scrollable-y"
							id="scrolling-chat"
							style="padding-right: 8px; padding-left: 8px; gap: 8px; flex: 1; display: flex; flex-direction: column-reverse"
						>
							<div style="margin-bottom: 4px"></div>
							${i?this.renderTypingIndicator():s``}
							${C.map(o=>this.renderEventsSetsInDay(v,o.day,o.eventsSets))}
							<div class="row" style="justify-content: center">
								<sl-tag style="margin-top: 8px"
									>${m("Beginning of chat history")}
								</sl-tag>
							</div>
						</div>
					</div>
				</div>
				<message-input
					@input=${()=>this.store.client.sendPeerChatTypingIndicator(this.peerChatHash,h)}
					@send-message=${o=>this.sendMessage(o.detail.message)}
				></message-input>
			</div>
		</div> `}renderEventsSetsInDay(e,t,r){return s`
			<div class="column" style="gap: 8px; flex-direction: column-reverse">
				${r.map(i=>this.renderMessageSet(i,e))}
				<div style="align-self: center">
					<sl-tag>
						<sl-format-date
							month="long"
							day="numeric"
							.date=${t}
						></sl-format-date>
					</sl-tag>
				</div>
			</div>
		`}renderMessageSet(e,t){const r=e[0],i=r[1].event.timestamp/1e3,a=new Date(i),d=Date.now()-i<60*1e3,h=Date.now()-i>46*60*1e3,v=t.includes(c(r[1].author));return s`
			<div
				class=${L({"from-me":v,column:!0})}
				style="align-items: start; flex-direction: column-reverse"
			>
				${e.map(([C,o],S)=>s`
						<div
							class="message row"
							style="align-items: end; flex-wrap: wrap; gap: 16px;"
						>
							<span style="flex: 1; word-break: break-all"
								>${o.event.content.message.message}</span
							>
							${S===0?s`
										<div
											class="placeholder column"
											style="font-size: 12px; text-align: right"
										>
											${d?s`<span>${m("now")}</span>`:h?s`
															<sl-format-date
																hour="numeric"
																minute="numeric"
																hour-format="24"
																.date=${a}
															></sl-format-date>
														`:s`
															<sl-relative-time
																style=""
																sync
																format="narrow"
																.date=${a}
															>
															</sl-relative-time>
														`}
										</div>
									`:s``}
						</div>
					`)}
			</div>
		`}async sendMessage(e){try{await this.store.peerChats.get(this.peerChatHash).sendMessage(e)}catch(t){console.error(t),N(m("Error sending the message"))}}get peerChatStore(){return this.store.peerChats.get(this.peerChatHash)}chatInfo(){return this.peerChatHash?B([this.peerChatStore.currentPeerChat.get(),this.peerChatStore.messages.get(),this.peerChatStore.readMessages.get()]):{status:"pending"}}render(){const e=this.chatInfo();switch(e.status){case"pending":return s`
					<sl-skeleton
						style="height: 32px; width: 32px; --border-radius: 8px"
						effect="pulse"
					></sl-skeleton>
				`;case"error":return s`<display-error
					.headline=${m("Error fetching the messages")}
					.error=${e.error}
				></display-error>`;case"completed":const[t,r,i]=e.value;return this.renderChat(t,r,i.myReadMessages)}}};g.styles=[O,k`
			:host {
				display: flex;
				font-size: 14px;
			}
		`];y([l(w("peer-chat-hash"))],g.prototype,"peerChatHash",2);y([l(w("peer"))],g.prototype,"peer",2);y([$({context:U,subscribe:!0})],g.prototype,"store",2);y([$({context:K,subscribe:!0})],g.prototype,"linkedDevicesStore",2);g=y([A(),P("peer-chat")],g);export{g as PeerChatEl};
