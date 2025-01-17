import{l as h}from"./context.w4qY2tFk.js";import{r as g,b as m,a,x as u,i as f}from"./messenger-client.Bks7hfH7.js";import{e as v,a as b}from"./context.BuuDXMv4.js";import{n as l,c as x,t as d}from"./property.BL0qaIkn.js";import{m as y}from"./context.DmZ_f8Qc.js";var w=Object.defineProperty,C=Object.getOwnPropertyDescriptor,o=(s,r,i,n)=>{for(var t=n>1?void 0:n?C(r,i):r,c=s.length-1,p;c>=0;c--)(p=s[c])&&(t=(n?p(r,i,t):p(t))||t);return n&&t&&w(r,i,t),t};let e=class extends g{constructor(){super(...arguments),this.zome="messenger"}connectedCallback(){if(super.connectedCallback(),!this.store){if(!this.role)throw new Error('<messenger-context> must have a role="YOUR_DNA_ROLE" property, eg: <messenger-context role="role1">');if(!this.client)throw new Error(`<messenger-context> must either:
				a) be placed inside <app-client-context>
					or 
				b) receive an AppClient property (eg. <messenger-context .client=\${client}>) 
					or 
				c) receive a store property (eg. <messenger-context .store=\${store}>)`);this.addEventListener("context-provider",s=>{if(s.context===h){const r=s.target;setTimeout(()=>{this.store=new m(new a(this.client,this.role,this.zome),r.store)})}}),this.store=new m(new a(this.client,this.role,this.zome),this.linkedDevicesStore)}}render(){return u`<slot></slot>`}};e.styles=f`
		:host {
			display: contents;
		}
	`;o([v({context:y}),l({type:Object})],e.prototype,"store",2);o([x({context:b,subscribe:!0})],e.prototype,"client",2);o([x({context:h,subscribe:!0})],e.prototype,"linkedDevicesStore",2);o([l()],e.prototype,"role",2);o([l()],e.prototype,"zome",2);e=o([d("messenger-context")],e);export{e as MessengerContext};
