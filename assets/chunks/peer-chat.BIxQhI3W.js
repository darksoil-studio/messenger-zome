import{l as $}from"./context.w4qY2tFk.js";import{t as b,f as c,x as s,j as S,m,o as _,i as H,r as P}from"./messenger-client.Bks7hfH7.js";import{S as M,p as I}from"./signal-watcher.CurgRbfO.js";import{n as T,a as A}from"./live.BiKC474q.js";import{n as C,c as y,t as D}from"./property.BL0qaIkn.js";import{e as E,m as B,o as w,l as j}from"./styles.D7lbDD0V.js";import"./chunk.RWPQHXWX.B_DUdI__.js";import{o as z}from"./message-input.pgpO83H3.js";import{m as O}from"./context.DmZ_f8Qc.js";import"./tslib.es6.kHcLnhpD.js";var F=Object.defineProperty,K=Object.getOwnPropertyDescriptor,h=(e,t,r,a)=>{for(var n=a>1?void 0:a?K(t,r):t,l=e.length-1,p;l>=0;l--)(p=e[l])&&(n=(a?p(t,r,n):p(n))||n);return a&&n&&F(t,r,n),n};let o=class extends M(P){async firstUpdated(){if(!this.peer&&!this.peerChatHash)throw new Error('peer-chat must be initialized with either the "peerChatHash" or the "peer" input.');if(this.peer&&!this.peerChatHash){const e=await b(this.store.peerChatsForPeer.get(this.peer));e.length===0?this.peerChatHash=await this.store.client.createPeerChat(this.peer):this.peerChatHash=e[0]}}renderTopBar(e){const t=e.peer_1.agents.find(r=>c(r)===c(this.store.client.client.myPubKey))?e.peer_2:e.peer_1;return s`
			<div
				part="top-bar"
				class="row top-bar"
				style="align-items: center; gap: 8px"
			>
				<slot name="top-bar-left-action"></slot>
				${t.profile?s`
							<div class="row" style="align-items: center; gap: 8px">
								<sl-avatar .image=${t.profile.avatar_src}></sl-avatar>
							</div>
						`:s`
							<profile-list-item .agentPubKey=${t.agents[0]}>
							</profile-list-item>
						`}
			</div>
		`}renderTypingIndicator(){return s`
			<div class="row">
				<div class="typing-indicator">
					<span>...</span>
				</div>
			</div>
		`}renderChat(e,t,r){const a=this.store.peerChats.get(this.peerChatHash).peerIsTyping.get(),n=e.peer_1.agents.find(i=>c(i)===c(this.store.client.client.myPubKey)),l=n?e.peer_1.agents:e.peer_2.agents,p=n?e.peer_2.agents:e.peer_1.agents,g=l.map(c),f=z(t,[e.peer_1.agents,e.peer_2.agents]);return s`<div class="column" style="flex: 1;">
			${this.renderTopBar(e)}
			<div part="chat" class="column" style="flex: 1; margin: 8px">
				<div class="flex-scrollable-parent">
					<div class="flex-scrollable-container">
						<div
							${T(i=>{if(!i)return;const u=[].concat(...f.map(d=>d.eventsSets)).filter(d=>!g.includes(c(d[0][1].provenance))),v=[];for(const d of u)for(const[x,k]of d)r.includes(x)||v.push(S(x));v.length>0&&this.store.peerChats.get(this.peerChatHash).markMessagesAsRead(v)})}
							class="flex-scrollable-y"
							id="scrolling-chat"
							style="padding-right: 8px; padding-left: 8px; gap: 8px; flex: 1; display: flex; flex-direction: column-reverse"
						>
							<div style="margin-bottom: 4px"></div>
							${a?this.renderTypingIndicator():s``}
							${f.map(i=>this.renderEventsSetsInDay(g,i.day,i.eventsSets))}
							<div class="row" style="justify-content: center">
								<sl-tag style="margin-top: 8px"
									>${m("Beginning of chat history")}
								</sl-tag>
							</div>
						</div>
					</div>
				</div>
				<message-input
					@input=${()=>this.store.client.sendPeerChatTypingIndicator(this.peerChatHash,p)}
					@send-message=${i=>this.sendMessage(i.detail.message)}
				></message-input>
			</div>
		</div> `}renderEventsSetsInDay(e,t,r){return s`
			<div class="column" style="gap: 8px; flex-direction: column-reverse">
				${r.map(a=>this.renderMessageSet(a,e))}
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
		`}renderMessageSet(e,t){const r=e[0],a=r[1].signed_content.timestamp/1e3,n=new Date(a),l=Date.now()-a<60*1e3,p=Date.now()-a>46*60*1e3,g=t.includes(c(r[1].provenance));return s`
			<div
				class=${E({"from-me":g,column:!0})}
				style="align-items: start; flex-direction: column-reverse"
			>
				${e.map(([f,i],u)=>s`
						<div
							class="message row"
							style="align-items: end; flex-wrap: wrap; gap: 16px;"
						>
							<span style="flex: 1; word-break: break-all"
								>${i.signed_content.content.message.message}</span
							>
							${u===0?s`
										<div
											class="placeholder column"
											style="font-size: 12px; text-align: right"
										>
											${l?s`<span>${m("now")}</span>`:p?s`
															<sl-format-date
																hour="numeric"
																minute="numeric"
																hour-format="24"
																.date=${n}
															></sl-format-date>
														`:s`
															<sl-relative-time
																style=""
																sync
																format="narrow"
																.date=${n}
															>
															</sl-relative-time>
														`}
										</div>
									`:s``}
						</div>
					`)}
			</div>
		`}async sendMessage(e){try{await this.store.peerChats.get(this.peerChatHash).sendMessage(e)}catch(t){console.error(t),A(m("Error sending the message"))}}get peerChatStore(){return this.store.peerChats.get(this.peerChatHash)}chatInfo(){return this.peerChatHash?_([this.peerChatStore.currentPeerChat.get(),this.peerChatStore.messages.get(),this.peerChatStore.readMessages.get()]):{status:"pending"}}render(){const e=this.chatInfo();switch(e.status){case"pending":return s`
					<sl-skeleton
						style="height: 32px; width: 32px; --border-radius: 8px"
						effect="pulse"
					></sl-skeleton>
				`;case"error":return s`<display-error
					.headline=${m("Error fetching the messages")}
					.error=${e.error}
				></display-error>`;case"completed":const[t,r,a]=e.value;return this.renderChat(t,r,a.myReadMessages)}}};o.styles=[B,H`
			:host {
				display: flex;
				font-size: 14px;
			}
		`];h([C(w("peer-chat-hash"))],o.prototype,"peerChatHash",2);h([C(w("peer"))],o.prototype,"peer",2);h([y({context:O,subscribe:!0})],o.prototype,"store",2);h([y({context:$,subscribe:!0})],o.prototype,"linkedDevicesStore",2);h([y({context:I,subscribe:!0})],o.prototype,"profilesStore",2);o=h([j(),D("peer-chat")],o);export{o as PeerChatEl};
