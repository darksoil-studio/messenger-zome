import{i as u,q as b,n as d}from"./messenger-client.CV9csWrB.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let p=class extends Event{constructor(e,t,o,r){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=o,this.subscribe=r??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function y(s){return s}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class h{constructor(e,t,o,r){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(i,c)=>{this.unsubscribe&&(this.unsubscribe!==c&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=i,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(i,c)),this.unsubscribe=c},this.host=e,t.context!==void 0){const i=t;this.context=i.context,this.callback=i.callback,this.subscribe=i.subscribe??!1}else this.context=t,this.callback=o,this.subscribe=r??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new p(this.context,this.host,this.t,this.subscribe))}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g({context:s,subscribe:e}){return(t,o)=>{typeof o=="object"?o.addInitializer(function(){new h(this,{context:s,callback:r=>{t.set.call(this,r)},subscribe:e})}):t.constructor.addInitializer(r=>{new h(r,{context:s,callback:i=>{r[o]=i},subscribe:e})})}}const w="ProfilesProvider",k=[u`
		.row {
			display: flex;
			flex-direction: row;
		}
		.column {
			display: flex;
			flex-direction: column;
		}
		.small-margin {
			margin-top: 6px;
		}
		.big-margin {
			margin-top: 23px;
		}

		.fill {
			flex: 1;
			height: 100%;
		}

		.title {
			font-size: 20px;
		}

		.center-content {
			align-items: center;
			justify-content: center;
		}

		.placeholder {
			color: var(--sl-color-gray-700);
		}

		.flex-scrollable-parent {
			position: relative;
			display: flex;
			flex: 1;
		}

		.flex-scrollable-container {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}

		.flex-scrollable-x {
			max-width: 100%;
			overflow-x: auto;
		}
		.flex-scrollable-y {
			max-height: 100%;
			overflow-y: auto;
		}
		:host {
			color: var(--sl-color-neutral-1000);
		}

		sl-card {
			display: flex;
		}
		sl-card::part(base) {
			flex: 1;
		}
		sl-card::part(body) {
			display: flex;
			flex: 1;
			height: 100%;
		}
		sl-drawer::part(body) {
			display: flex;
		}
	`];/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class n extends Event{constructor(e){super(n.eventName,{bubbles:!0,composed:!0,cancelable:!1}),this.routes=e}}n.eventName="lit-routes-connected";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const f={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:b},x=(s=f,e,t)=>{const{kind:o,metadata:r}=t;let i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),i.set(t.name,s),o==="accessor"){const{name:c}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(c,a,s)},init(l){return l!==void 0&&this.P(c,void 0,s),l}}}if(o==="setter"){const{name:c}=t;return function(l){const a=this[c];e.call(this,l),this.requestUpdate(c,a,s)}}throw Error("Unsupported decorator location: "+o)};function q(s){return(e,t)=>typeof t=="object"?x(s,e,t):((o,r,i)=>{const c=r.hasOwnProperty(i);return r.constructor.createProperty(i,c?{...o,wrapped:!0}:o),c?Object.getOwnPropertyDescriptor(r,i):void 0})(s,e,t)}export{q as a,k as b,g as c,y as n,w as p,p as s,P as t};
