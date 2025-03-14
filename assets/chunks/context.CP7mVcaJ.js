var o=Object.defineProperty;var c=(t,e,r)=>e in t?o(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var n=(t,e,r)=>c(t,typeof e!="symbol"?e+"":e,r);import{S as a}from"./messenger-client.CrBQT6S4.js";import{n as d}from"./property.COiWTaZV.js";/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function f(t){class e extends t{constructor(){super(...arguments);n(this,"__dispose");n(this,"w",new a.subtle.Watcher(()=>{this.requestUpdate()}))}performUpdate(){if(this.isUpdatePending===!1)return;const s=this.__dispose,i=new a.Computed(()=>{super.performUpdate()});this.w.watch(i),this.__dispose=()=>{this.w.unwatch(i)},i.get(),s==null||s()}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){var s;super.disconnectedCallback(),(s=this.__dispose)==null||s.call(this)}}return e}const _=d("ProfilesProvider");export{f as S,_ as p};
