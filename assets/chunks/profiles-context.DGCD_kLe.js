import{_ as t}from"./tslib.es6.kHcLnhpD.js";import{p as s}from"./context.DLVIJArb.js";import{e as r,a as i}from"./context.DIdWcKoJ.js";import{n,a as o,c as p,t as l}from"./property.9e9_4Dyz.js";import{P as c,c as a,x as f,r as m,i as x}from"./messenger-client.Xgv8kjK5.js";import{S as h}from"./signal-watcher.CCnljk_y.js";const d=n("hc_zome_profiles/store");let e=class extends h(m){constructor(){super(...arguments),this.zome="profiles"}connectedCallback(){if(super.connectedCallback(),!this.store){if(!this.role)throw new Error('<profiles-context> must have a role="YOUR_DNA_ROLE" property, eg: <profiles-context role="role1">');if(!this.client)throw new Error(`<profiles-context> must either:
				a) be placed inside <app-client-context>
					or 
				b) receive an AppClient property (eg. <profiles-context .client=\${client}>) 
					or 
				c) receive a store property (eg. <profiles-context .store=\${store}>)`);this.store=new c(new a(this.client,this.role,this.zome))}}render(){return f`<slot></slot>`}};e.styles=x`
		:host {
			display: contents;
		}
	`;t([r({context:d}),r({context:s}),o({type:Object})],e.prototype,"store",void 0);t([p({context:i,subscribe:!0})],e.prototype,"client",void 0);t([o()],e.prototype,"role",void 0);t([o()],e.prototype,"zome",void 0);e=t([l("profiles-context")],e);export{e as ProfilesContext};
