import{_ as c}from"./tslib.es6.kHcLnhpD.js";import{r as _,n as k,x as d,m as I,i as R}from"./messenger-client.Bks7hfH7.js";import{n as S,a as g,c as $,t as b,b as z}from"./property.BEi3PmIb.js";import{o as C,l as E}from"./styles.BcPDAjHV.js";import{a as x}from"./reactive-element.CHpx6ykd.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=Symbol();class G{constructor(t,e,r){this.i=0,this.status=0,this.autoRun=!0,this.t=t,this.t.addController(this);const i=typeof e=="object"?e:{task:e,args:r};this.o=i.task,this.h=i.args,this.l=i.onComplete,this.u=i.onError,i.autoRun!==void 0&&(this.autoRun=i.autoRun)}get taskComplete(){return this.v||(this.status===1?this.v=new Promise((t,e)=>{this.m=t,this._=e}):this.status===3?this.v=Promise.reject(this.k):this.v=Promise.resolve(this.p)),this.v}hostUpdated(){this.performTask()}async performTask(){var t;const e=(t=this.h)===null||t===void 0?void 0:t.call(this);this.shouldRun(e)&&await this.run(e)}shouldRun(t){return this.autoRun&&this.T(t)}async run(t){var e,r,i,a,n;let h,u;t!=null||(t=(e=this.h)===null||e===void 0?void 0:e.call(this)),this.status!==1&&(this.v=void 0,this.m=void 0,this._=void 0),this.status=1,queueMicrotask(()=>this.t.requestUpdate());const w=++this.i;try{h=await this.o(t)}catch(A){u=A}if(this.i===w){if(h===P)this.status=0;else{if(u===void 0){try{(r=this.l)===null||r===void 0||r.call(this,h)}catch{}this.status=2,(i=this.m)===null||i===void 0||i.call(this,h)}else{try{(a=this.u)===null||a===void 0||a.call(this,u)}catch{}this.status=3,(n=this._)===null||n===void 0||n.call(this,u)}this.p=h,this.k=u}this.t.requestUpdate()}}get value(){return this.p}get error(){return this.k}render(t){var e,r,i,a;switch(this.status){case 0:return(e=t.initial)===null||e===void 0?void 0:e.call(t);case 1:return(r=t.pending)===null||r===void 0?void 0:r.call(t);case 2:return(i=t.complete)===null||i===void 0?void 0:i.call(t,this.value);case 3:return(a=t.error)===null||a===void 0?void 0:a.call(t,this.error);default:this.status}}T(t){const e=this.g;return this.g=t,Array.isArray(t)&&Array.isArray(e)?t.length===e.length&&t.some((r,i)=>x(r,e[i])):t!==e}}const M=S("hc_zome_file_storage/file-storage-client");function o(s){return new Promise((t,e)=>{s.oncomplete=s.onsuccess=()=>t(s.result),s.onabort=s.onerror=()=>e(s.error)})}function f(s,t){const e=indexedDB.open(s);e.onupgradeneeded=()=>e.result.createObjectStore(t);const r=o(e);return(i,a)=>r.then(n=>a(n.transaction(t,i).objectStore(t)))}let v;function p(){return v||(v=f("keyval-store","keyval")),v}function T(s,t=p()){return t("readonly",e=>o(e.get(s)))}function U(s,t,e=p()){return e("readwrite",r=>(r.put(t,s),o(r.transaction)))}function j(s,t=p()){return t("readwrite",e=>(e.delete(s),o(e.transaction)))}function O(s,t){return s.openCursor().onsuccess=function(){this.result&&(t(this.result),this.result.continue())},o(s.transaction)}function B(s=p()){return s("readonly",t=>{if(t.getAll&&t.getAllKeys)return Promise.all([o(t.getAllKeys()),o(t.getAll())]).then(([r,i])=>r.map((a,n)=>[a,i[n]]));const e=[];return s("readonly",r=>O(r,i=>e.push([i.key,i.value])).then(()=>e))})}const m=f("HC_ZOME_FILE_STORAGE","IMAGES");async function y(s,t){await U(s,{image:t,lastRead:Date.now()},m),H()}async function D(s){const t=await T(s,m);if(t)return y(s,t.image),t.image}const F=7*24*60*60*1e3;async function H(){const s=await B(m);for(const[t,e]of s)Date.now()-e.lastRead>F&&await j(t,m)}let l=class extends _{constructor(){super(...arguments),this.shape="circle",this.initials="",this._renderImage=new G(this,async([t])=>{const e=await D(t);if(e)return e;const r=await this.client.downloadFile(t),i=await r.arrayBuffer(),a=`data:${r.type};base64,${k(new Uint8Array(i))}`;return y(t,a),a},()=>[this.imageHash])}renderImage(t){return d`
      <sl-avatar
        .image=${t}
        part="image"
        .initials=${this.initials.slice(0,2)}
        .shape=${this.shape}
      ></sl-avatar>
    `}render(){return this.imageHash?this._renderImage.render({complete:t=>this.renderImage(t),pending:()=>d`<sl-skeleton
          style="width: var(--size); height: var(--size); --border-radius: 50%; "
          effect="pulse"
        ></sl-skeleton> `,error:t=>d`<display-error
          .headline=${I("Error fetching the avatar")}
          tooltip
          .error=${t}
        ></display-error>`}):d`
        <sl-avatar
          part="image"
          .initials=${this.initials.slice(0,2)}
          .shape=${this.shape}
        ></sl-avatar>
      `}static get styles(){return[z,R`
        :host {
          display: contents;
          --size: 32px;
          --size2: var(--size);
        }
        sl-avatar {
          --size: var(--size2);
        }
      `]}};c([g(C("image-hash"))],l.prototype,"imageHash",void 0);c([g()],l.prototype,"shape",void 0);c([$({context:M})],l.prototype,"client",void 0);c([g()],l.prototype,"initials",void 0);l=c([E(),b("show-avatar-image")],l);export{M as f,D as g,G as h,y as s};
