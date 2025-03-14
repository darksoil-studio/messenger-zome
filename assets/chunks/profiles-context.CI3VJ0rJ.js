import{_ as t}from"./tslib.es6.kHcLnhpD.js";import{S as s,p as i}from"./context.CP7mVcaJ.js";import{e as r,a as n}from"./context.iwCtUv_o.js";import{n as p,a as o,c as l,t as c}from"./property.COiWTaZV.js";import{P as a,c as f,x,r as m,i as h}from"./messenger-client.CrBQT6S4.js";const d=p("hc_zome_profiles/store");let e=class extends s(m){constructor(){super(...arguments),this.zome="profiles"}connectedCallback(){if(super.connectedCallback(),!this.store){if(!this.role)throw new Error('<profiles-context> must have a role="YOUR_DNA_ROLE" property, eg: <profiles-context role="role1">');if(!this.client)throw new Error(`<profiles-context> must either:
				a) be placed inside <app-client-context>
					or 
				b) receive an AppClient property (eg. <profiles-context .client=\${client}>) 
					or 
				c) receive a store property (eg. <profiles-context .store=\${store}>)`);this.store=new a(new f(this.client,this.role,this.zome))}}render(){return x`<slot></slot>`}};e.styles=h`
		:host {
			display: contents;
		}
	`;t([r({context:d}),r({context:i}),o({type:Object})],e.prototype,"store",void 0);t([l({context:n,subscribe:!0})],e.prototype,"client",void 0);t([o()],e.prototype,"role",void 0);t([o()],e.prototype,"zome",void 0);e=t([c("profiles-context")],e);export{e as ProfilesContext};
