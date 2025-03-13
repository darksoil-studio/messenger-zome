import{_ as s}from"./tslib.es6.kHcLnhpD.js";import{n as l,b as n,a as o,c as p,t as d}from"./property.9e9_4Dyz.js";import{i as h,r as c,x as i,m as u}from"./messenger-client.Xgv8kjK5.js";import{n as b,l as g,A as r,a as v,G as y}from"./styles.B87_XgVZ.js";import{S as m}from"./signal-watcher.CCnljk_y.js";const $=l("ProfilesProvider");let t=class extends m(c){constructor(){super(...arguments),this.size=32,this.disableTooltip=!1,this.disableCopy=!1}renderIdenticon(){return this.agentPubKey?i` <div
			style=${r({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
		>
			<holo-identicon
				.disableCopy=${this.disableCopy}
				.disableTooltip=${this.disableTooltip}
				.hash=${this.agentPubKey}
				.size=${this.size}
			>
			</holo-identicon>
			<div class="badge"><slot name="badge"></slot></div>
		</div>`:i`
				<sl-icon
					style=${r({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
					.src=${v(y)}
				>
				</sl-icon>
			`}renderProfile(e){if(!e||!e.avatar)return this.renderIdenticon();const a=i`
			<div
				style=${r({cursor:this.disableCopy?"":"pointer",position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
			>
				<sl-avatar
					.image=${e.avatar}
					style="--size: ${this.size}px; display: flex;"
					@click=${()=>this.dispatchEvent(new CustomEvent("profile-clicked",{composed:!0,bubbles:!0,detail:{agentPubKey:this.agentPubKey}}))}
				>
				</sl-avatar>
				<div class="badge"><slot name="badge"></slot></div>
			</div>
		`;return i`
			<sl-tooltip
				id="tooltip"
				placement="top"
				.trigger=${this.disableTooltip?"manual":"hover focus"}
				hoist
				.content=${e.name}
			>
				${a}
			</sl-tooltip>
		`}render(){const e=this.profilesProvider.currentProfileForAgent.get(this.agentPubKey).get();switch(e.status){case"pending":return i`<sl-skeleton
					effect="pulse"
					style="height: ${this.size}px; width: ${this.size}px"
				></sl-skeleton>`;case"error":return i`
					<display-error
						tooltip
						.headline=${u("Error fetching the user's profile.")}
						.error=${e.error}
					></display-error>
				`;case"completed":return this.renderProfile(e.value)}}};t.styles=[n,h`
			.badge {
				position: absolute;
				right: 0;
				bottom: 0;
			}
			:host {
				height: 32px;
			}
		`];s([o(b("agent-pub-key"))],t.prototype,"agentPubKey",void 0);s([o({type:Number})],t.prototype,"size",void 0);s([o({type:Boolean,attribute:"disable-tooltip"})],t.prototype,"disableTooltip",void 0);s([o({type:Boolean,attribute:"disable-copy"})],t.prototype,"disableCopy",void 0);s([p({context:$,subscribe:!0}),o()],t.prototype,"profilesProvider",void 0);t=s([g(),d("agent-avatar")],t);export{$ as p};
