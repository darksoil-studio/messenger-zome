import{l as x}from"./context.aH6lHp5J.js";import{r as v,b as l,a,x as g,i as u}from"./messenger-client.CJVut2Sl.js";import{p as f,a as m,c as h,t as d}from"./property.CdyGxQ3i.js";import{e as b,a as w}from"./context.DRhR2QFt.js";import{m as y}from"./context.Cfnzkp14.js";var C=Object.defineProperty,P=Object.getOwnPropertyDescriptor,s=(e,r,n,i)=>{for(var o=i>1?void 0:i?P(r,n):r,c=e.length-1,p;c>=0;c--)(p=e[c])&&(o=(i?p(r,n,o):p(o))||o);return i&&o&&C(r,n,o),o};let t=class extends v{constructor(){super(...arguments),this.zome="messenger"}connectedCallback(){if(super.connectedCallback(),!this.store){if(!this.role)throw new Error('<messenger-context> must have a role="YOUR_DNA_ROLE" property, eg: <messenger-context role="role1">');if(!this.client)throw new Error(`<messenger-context> must either:
				a) be placed inside <app-client-context>
					or 
				b) receive an AppClient property (eg. <messenger-context .client=\${client}>) 
					or 
				c) receive a store property (eg. <messenger-context .store=\${store}>)`);this.addEventListener("context-provider",e=>{if(e.context===x){const r=e.target;setTimeout(()=>{this.store=new l(new a(this.client,this.role,this.zome),r.store,this.store.profilesProvider)})}else if(e.context===f){const r=e.contextTarget?e.contextTarget:e.target;setTimeout(()=>{const n=r.store;this.store=new l(new a(this.client,this.role,this.zome),this.store.linkedDevicesStore,n)})}}),this.store=new l(new a(this.client,this.role,this.zome),this.linkedDevicesStore,this.profilesProvider)}}render(){return g`<slot></slot>`}};t.styles=u`
		:host {
			display: contents;
		}
	`;s([b({context:y}),m({type:Object})],t.prototype,"store",2);s([h({context:w,subscribe:!0})],t.prototype,"client",2);s([h({context:x,subscribe:!0})],t.prototype,"linkedDevicesStore",2);s([h({context:f,subscribe:!0})],t.prototype,"profilesProvider",2);s([m()],t.prototype,"role",2);s([m()],t.prototype,"zome",2);t=s([d("messenger-context")],t);export{t as MessengerContext};
