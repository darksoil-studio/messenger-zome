import{l as x}from"./context.l_qjM7Zk.js";import{r as u,b as l,a,x as v,i as g}from"./messenger-client.BdwBMR5i.js";import{p as f,a as m,c as h,t as d}from"./property.rnZ96Gce.js";import{e as b,a as w}from"./context.Dp6U7mwm.js";import{m as y}from"./context.Cue3sNVd.js";var C=Object.defineProperty,_=Object.getOwnPropertyDescriptor,o=(t,s,i,n)=>{for(var r=n>1?void 0:n?_(s,i):s,c=t.length-1,p;c>=0;c--)(p=t[c])&&(r=(n?p(s,i,r):p(r))||r);return n&&r&&C(s,i,r),r};let e=class extends u{constructor(){super(...arguments),this.zome="messenger"}connectedCallback(){if(super.connectedCallback(),!this.store){if(!this.role)throw new Error('<messenger-context> must have a role="YOUR_DNA_ROLE" property, eg: <messenger-context role="role1">');if(!this.client)throw new Error(`<messenger-context> must either:
				a) be placed inside <app-client-context>
					or 
				b) receive an AppClient property (eg. <messenger-context .client=\${client}>) 
					or 
				c) receive a store property (eg. <messenger-context .store=\${store}>)`);this.addEventListener("context-provider",t=>{if(t.context===x){const s=t.target;setTimeout(()=>{this.store=new l(new a(this.client,this.role,this.zome),s.store)})}else t.context===f&&setTimeout(()=>{this.store=new l(new a(this.client,this.role,this.zome),this.store.linkedDevicesStore,t.target.store)})}),this.store=new l(new a(this.client,this.role,this.zome),this.linkedDevicesStore,this.profilesProvider)}}render(){return v`<slot></slot>`}};e.styles=g`
		:host {
			display: contents;
		}
	`;o([b({context:y}),m({type:Object})],e.prototype,"store",2);o([h({context:w,subscribe:!0})],e.prototype,"client",2);o([h({context:x,subscribe:!0})],e.prototype,"linkedDevicesStore",2);o([h({context:f,subscribe:!0})],e.prototype,"profilesProvider",2);o([m()],e.prototype,"role",2);o([m()],e.prototype,"zome",2);e=o([d("messenger-context")],e);export{e as MessengerContext};
