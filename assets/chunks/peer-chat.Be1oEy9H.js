import{l as b}from"./context.Bs1IEbUe.js";import{t as $,f as p,x as a,m,j as S,k as H,r as _,i as P}from"./messenger-client.BdYAEnCL.js";import{S as M}from"./signal-watcher.BqXN4Q8R.js";import{n as I,a as T}from"./chunk.UG6RICOR.Dh5eDRUr.js";import{a as x,c as C,t as A}from"./property.B87aljMC.js";import{e as D,b as E,n as w,l as B}from"./styles.CLSDQiDl.js";import"./chunk.UJ4C5V3J.DuCSCpgY.js";import{o as j}from"./message-input.WvTLuTOW.js";import{m as z}from"./context.BAJUE9Qa.js";import"./tslib.es6.kHcLnhpD.js";var O=Object.defineProperty,k=Object.getOwnPropertyDescriptor,d=(e,t,s,r)=>{for(var n=r>1?void 0:r?k(t,s):t,o=e.length-1,l;o>=0;o--)(l=e[o])&&(n=(r?l(t,s,n):l(n))||n);return r&&n&&O(t,s,n),n};let h=class extends M(_){async firstUpdated(){if(!this.peer&&!this.peerChatHash)throw new Error('peer-chat must be initialized with either the "peerChatHash" or the "peer" input.');if(this.peer&&!this.peerChatHash){const e=await $(this.store.peerChatsForPeer.get(this.peer));e.length===0?this.peerChatHash=await this.store.client.createPeerChat(this.peer):this.peerChatHash=e[0]}}renderTopBar(e){const t=e.peer_1.agents.find(s=>p(s)===p(this.store.client.client.myPubKey))?e.peer_2:e.peer_1;return a`
			<div
				part="top-bar"
				class="row top-bar"
				style="align-items: center; gap: 8px"
			>
				<slot name="top-bar-left-action"></slot>
				<profile-list-item .agentPubKey=${t.agents[0]}> </profile-list-item>
			</div>
		`}renderTypingIndicator(){return a`
			<div class="row">
				<div class="typing-indicator">
					<span>...</span>
				</div>
			</div>
		`}renderChat(e,t,s){const r=this.store.peerChats.get(this.peerChatHash).peerIsTyping.get(),n=e.peer_1.agents.find(i=>p(i)===p(this.store.client.client.myPubKey)),o=n?e.peer_1.agents:e.peer_2.agents,l=n?e.peer_2.agents:e.peer_1.agents,g=o.map(p),f=j(t,[e.peer_1.agents,e.peer_2.agents]);return a`<div class="column" style="flex: 1;">
			${this.renderTopBar(e)}
			<div part="chat" class="column" style="flex: 1;">
				<div class="flex-scrollable-parent">
					<div class="flex-scrollable-container">
						<div
							${I(i=>{if(!i)return;const u=[].concat(...f.map(c=>c.eventsSets)).filter(c=>!g.includes(p(c[0][1].author))),y=[];for(const c of u)for(const[v,F]of c)s.includes(v)||y.push(S(v));y.length>0&&this.store.peerChats.get(this.peerChatHash).markMessagesAsRead(y)})}
							class="flex-scrollable-y"
							id="scrolling-chat"
							style="padding-right: 8px; padding-left: 8px; gap: 8px; flex: 1; display: flex; flex-direction: column-reverse"
						>
							<div style="margin-bottom: 4px"></div>
							${r?this.renderTypingIndicator():a``}
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
					@input=${()=>this.store.client.sendPeerChatTypingIndicator(this.peerChatHash,l)}
					@send-message=${i=>this.sendMessage(i.detail.message)}
				></message-input>
			</div>
		</div> `}renderEventsSetsInDay(e,t,s){return a`
			<div class="column" style="gap: 8px; flex-direction: column-reverse">
				${s.map(r=>this.renderMessageSet(r,e))}
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
		`}renderMessageSet(e,t){const s=e[0],r=s[1].event.timestamp/1e3,n=new Date(r),o=Date.now()-r<60*1e3,l=Date.now()-r>46*60*1e3,g=t.includes(p(s[1].author));return a`
			<div
				class=${D({"from-me":g,column:!0})}
				style="align-items: start; flex-direction: column-reverse"
			>
				${e.map(([f,i],u)=>a`
						<div
							class="message row"
							style="align-items: end; flex-wrap: wrap; gap: 16px;"
						>
							<span style="flex: 1; word-break: break-all"
								>${i.event.content.message.message}</span
							>
							${u===0?a`
										<div
											class="placeholder column"
											style="font-size: 12px; text-align: right"
										>
											${o?a`<span>${m("now")}</span>`:l?a`
															<sl-format-date
																hour="numeric"
																minute="numeric"
																hour-format="24"
																.date=${n}
															></sl-format-date>
														`:a`
															<sl-relative-time
																style=""
																sync
																format="narrow"
																.date=${n}
															>
															</sl-relative-time>
														`}
										</div>
									`:a``}
						</div>
					`)}
			</div>
		`}async sendMessage(e){try{await this.store.peerChats.get(this.peerChatHash).sendMessage(e)}catch(t){console.error(t),T(m("Error sending the message"))}}get peerChatStore(){return this.store.peerChats.get(this.peerChatHash)}chatInfo(){return this.peerChatHash?H([this.peerChatStore.currentPeerChat.get(),this.peerChatStore.messages.get(),this.peerChatStore.readMessages.get()]):{status:"pending"}}render(){const e=this.chatInfo();switch(e.status){case"pending":return a`
					<sl-skeleton
						style="height: 32px; width: 32px; --border-radius: 8px"
						effect="pulse"
					></sl-skeleton>
				`;case"error":return a`<display-error
					.headline=${m("Error fetching the messages")}
					.error=${e.error}
				></display-error>`;case"completed":const[t,s,r]=e.value;return this.renderChat(t,s,r.myReadMessages)}}};h.styles=[E,P`
			:host {
				display: flex;
				font-size: 14px;
			}
		`];d([x(w("peer-chat-hash"))],h.prototype,"peerChatHash",2);d([x(w("peer"))],h.prototype,"peer",2);d([C({context:z,subscribe:!0})],h.prototype,"store",2);d([C({context:b,subscribe:!0})],h.prototype,"linkedDevicesStore",2);h=d([B(),A("peer-chat")],h);export{h as PeerChatEl};
