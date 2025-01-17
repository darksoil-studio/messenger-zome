import{_ as t}from"./tslib.es6.kHcLnhpD.js";import{e as r,a as s}from"./context.BuuDXMv4.js";import{n as o,c as i,t as n}from"./property.BL0qaIkn.js";import{P as p,c as l,x as c,i as a,r as f}from"./messenger-client.Bks7hfH7.js";import{S as m,p as x}from"./signal-watcher.CurgRbfO.js";let e=class extends m(f){constructor(){super(...arguments),this.zome="profiles"}connectedCallback(){if(super.connectedCallback(),!this.store){if(!this.role)throw new Error('<profiles-context> must have a role="YOUR_DNA_ROLE" property, eg: <profiles-context role="role1">');if(!this.client)throw new Error(`<profiles-context> must either:
				a) be placed inside <app-client-context>
					or 
				b) receive an AppClient property (eg. <profiles-context .client=\${client}>) 
					or 
				c) receive a store property (eg. <profiles-context .store=\${store}>)`);this.store=new p(new l(this.client,this.role,this.zome))}}render(){return c`<slot></slot>`}};e.styles=a`
		:host {
			display: contents;
		}
	`;t([r({context:x}),o({type:Object})],e.prototype,"store",void 0);t([i({context:s,subscribe:!0})],e.prototype,"client",void 0);t([o()],e.prototype,"role",void 0);t([o()],e.prototype,"zome",void 0);e=t([n("profiles-context")],e);export{e as ProfilesContext};
