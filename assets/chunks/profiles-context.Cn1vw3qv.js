import{_ as t}from"./tslib.es6.kHcLnhpD.js";import{n as s,a as o,c as i,t as n,p}from"./property.Du0Z6lUr.js";import{e as r,a as l}from"./context.CgxInIiu.js";import{P as c,c as a,x as f,r as x,i as m}from"./messenger-client.CV9csWrB.js";import{S as h}from"./signal-watcher.1XZcQCR5.js";const d=s("hc_zome_profiles/store");let e=class extends h(x){constructor(){super(...arguments),this.zome="profiles"}connectedCallback(){if(super.connectedCallback(),!this.store){if(!this.role)throw new Error('<profiles-context> must have a role="YOUR_DNA_ROLE" property, eg: <profiles-context role="role1">');if(!this.client)throw new Error(`<profiles-context> must either:
				a) be placed inside <app-client-context>
					or 
				b) receive an AppClient property (eg. <profiles-context .client=\${client}>) 
					or 
				c) receive a store property (eg. <profiles-context .store=\${store}>)`);this.store=new c(new a(this.client,this.role,this.zome))}}render(){return f`<slot></slot>`}};e.styles=m`
		:host {
			display: contents;
		}
	`;t([r({context:d}),r({context:p}),o({type:Object})],e.prototype,"store",void 0);t([i({context:l,subscribe:!0})],e.prototype,"client",void 0);t([o()],e.prototype,"role",void 0);t([o()],e.prototype,"zome",void 0);e=t([n("profiles-context")],e);export{e as ProfilesContext};
