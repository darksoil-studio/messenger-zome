import{_ as t}from"./tslib.es6.kHcLnhpD.js";import{e as r,a as s}from"./context.CaTdb-6-.js";import{n as i,a as o,c as n,t as l}from"./property.BEi3PmIb.js";import{P as p,c,x as a,i as f,r as m}from"./messenger-client.Bks7hfH7.js";import{S as x}from"./signal-watcher.DchcTGV4.js";const h=i("hc_zome_profiles/store");let e=class extends x(m){constructor(){super(...arguments),this.zome="profiles"}connectedCallback(){if(super.connectedCallback(),!this.store){if(!this.role)throw new Error('<profiles-context> must have a role="YOUR_DNA_ROLE" property, eg: <profiles-context role="role1">');if(!this.client)throw new Error(`<profiles-context> must either:
				a) be placed inside <app-client-context>
					or 
				b) receive an AppClient property (eg. <profiles-context .client=\${client}>) 
					or 
				c) receive a store property (eg. <profiles-context .store=\${store}>)`);this.store=new p(new c(this.client,this.role,this.zome))}}render(){return a`<slot></slot>`}};e.styles=f`
		:host {
			display: contents;
		}
	`;t([r({context:h}),o({type:Object})],e.prototype,"store",void 0);t([n({context:s,subscribe:!0})],e.prototype,"client",void 0);t([o()],e.prototype,"role",void 0);t([o()],e.prototype,"zome",void 0);e=t([l("profiles-context")],e);export{e as ProfilesContext};
