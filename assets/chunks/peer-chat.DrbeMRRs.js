import{a as $,c as b,t as P}from"./property.Du0Z6lUr.js";import{e as M,b as H,n as _,l as I}from"./styles.fvlugEG2.js";import{n as T,a as A}from"./chunk.MZCVJT24.CqIsFzLm.js";import{t as D,f as p,x as r,m as u,j as E,k as B,r as j,i as k}from"./messenger-client.CV9csWrB.js";import{S as z}from"./signal-watcher.1XZcQCR5.js";import{l as O}from"./context.Bxm-JU9o.js";import"./chunk.UJ4C5V3J.DI4H0WFx.js";import{o as R,s as C}from"./seen-status.BsDKb2xD.js";import{m as F}from"./context.DWQpVkCn.js";import"./tslib.es6.kHcLnhpD.js";var K=Object.defineProperty,U=Object.getOwnPropertyDescriptor,m=(e,t,a,s)=>{for(var n=s>1?void 0:s?U(t,a):t,i=e.length-1,o;i>=0;i--)(o=e[i])&&(n=(s?o(t,a,n):o(n))||n);return s&&n&&K(t,a,n),n};let c=class extends z(j){async firstUpdated(){if(!this.peer&&!this.peerChatHash)throw new Error('peer-chat must be initialized with either the "peerChatHash" or the "peer" input.');if(this.peer&&!this.peerChatHash){const e=await D(this.store.peerChatsForPeer.get(this.peer));e.length===0?this.peerChatHash=await this.store.client.createPeerChat(this.peer):this.peerChatHash=e[0]}}renderTopBar(e){const t=e.peer_1.agents.find(a=>p(a)===p(this.store.client.client.myPubKey))?e.peer_2:e.peer_1;return r`
			<div
				part="top-bar"
				class="row top-bar"
				style="align-items: center; gap: 8px"
			>
				<slot name="top-bar-left-action"></slot>
				<profile-list-item .agentPubKey=${t.agents[0]}> </profile-list-item>
			</div>
		`}renderTypingIndicator(){return r`
			<div class="row">
				<div class="typing-indicator">
					<span>...</span>
				</div>
			</div>
		`}renderChat(e,t,a,s,n,i){const o=this.store.peerChats.get(this.peerChatHash).peerIsTyping.get(),h=e.peer_1.agents.find(l=>p(l)===p(this.store.client.client.myPubKey)),y=h?e.peer_1.agents:e.peer_2.agents,v=h?e.peer_2.agents:e.peer_1.agents,d=y.map(p),f=R(t,[e.peer_1.agents,e.peer_2.agents]);return r`<div class="column" style="flex: 1;">
			${this.renderTopBar(e)}
			<div part="chat" class="column" style="flex: 1;">
				<div class="flex-scrollable-parent">
					<div class="flex-scrollable-container">
						<div
							${T(l=>{if(!l)return;const x=[].concat(...f.map(g=>g.eventsSets)).filter(g=>!d.includes(p(g[0][1].author))),w=[];for(const g of x)for(const[S,W]of g)a.includes(S)||w.push(E(S));w.length>0&&this.store.peerChats.get(this.peerChatHash).markMessagesAsRead(w)})}
							class="flex-scrollable-y"
							id="scrolling-chat"
							style="padding-right: 8px; padding-left: 8px; gap: 8px; flex: 1; display: flex; flex-direction: column-reverse"
						>
							<div style="margin-bottom: 4px"></div>
							${o?this.renderTypingIndicator():r``}
							${f.map(l=>this.renderEventsSetsInDay(d,l.day,l.eventsSets,n,i,s))}
							<div class="row" style="justify-content: center">
								<sl-tag style="margin-top: 8px"
									>${u("Beginning of chat history")}
								</sl-tag>
							</div>
						</div>
					</div>
				</div>
				<message-input
					@input=${()=>this.store.client.sendPeerChatTypingIndicator(this.peerChatHash,v)}
					@send-message=${l=>this.sendMessage(l.detail.message)}
				></message-input>
			</div>
		</div> `}renderEventsSetsInDay(e,t,a,s,n,i){return r`
			<div class="column" style="gap: 8px; flex-direction: column-reverse">
				${a.map(o=>this.renderMessageSet(o,e,s,n,i))}
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
		`}renderMessageSet(e,t,a,s,n){const i=e[0],o=i[1].payload.timestamp/1e3,h=new Date(o),y=Date.now()-o<60*1e3,v=Date.now()-o>46*60*1e3,d=t.includes(p(i[1].author));return r`
			<div
				class=${M({"from-me":d,column:!0})}
				style="align-items: start; flex-direction: column-reverse"
			>
				${e.map(([f,l],x)=>r`
						<div
							class="message row"
							style="align-items: end; flex-wrap: wrap; gap: 8px;"
						>
							<span style="flex: 1; word-break: break-all"
								>${l.payload.content.event.message.message}</span
							>
							${x===0?r`
										<div
											class="placeholder column"
											style="font-size: 12px; text-align: right"
										>
											${y?r`<span>${u("now")}</span>`:v?r`
															<sl-format-date
																hour="numeric"
																minute="numeric"
																hour-format="24"
																.date=${h}
															></sl-format-date>
														`:r`
															<sl-relative-time
																style=""
																sync
																format="narrow"
																.date=${h}
															>
															</sl-relative-time>
														`}
										</div>
										${d?this.seenStatus(a,s,n,f):r``}
									`:r``}
						</div>
					`)}
			</div>
		`}seenStatus(e,t,a,s){return a.includes(s)?C("seen"):t[s]?C("received"):e[s]?C("sent"):r``}async sendMessage(e){try{await this.store.peerChats.get(this.peerChatHash).sendMessage(e)}catch(t){console.error(t),A(u("Error sending the message"))}}get peerChatStore(){return this.store.peerChats.get(this.peerChatHash)}chatInfo(){return this.peerChatHash?B([this.peerChatStore.currentPeerChat.get(),this.peerChatStore.messages.get(),this.peerChatStore.readMessages.get(),this.store.eventsSentToRecipients.get(),this.store.acknowledgements.get()]):{status:"pending"}}render(){const e=this.chatInfo();switch(e.status){case"pending":return r`
					<sl-skeleton
						style="height: 32px; width: 32px; --border-radius: 8px"
						effect="pulse"
					></sl-skeleton>
				`;case"error":return r`<display-error
					.headline=${u("Error fetching the messages")}
					.error=${e.error}
				></display-error>`;case"completed":const[t,a,s,n,i]=e.value;return this.renderChat(t,a,s.myReadMessages,s.theirReadMessages,n,i)}}};c.styles=[H,k`
			:host {
				display: flex;
				font-size: 14px;
			}
		`];m([$(_("peer-chat-hash"))],c.prototype,"peerChatHash",2);m([$(_("peer"))],c.prototype,"peer",2);m([b({context:F,subscribe:!0})],c.prototype,"store",2);m([b({context:O,subscribe:!0})],c.prototype,"linkedDevicesStore",2);c=m([I(),P("peer-chat")],c);export{c as PeerChatEl};
