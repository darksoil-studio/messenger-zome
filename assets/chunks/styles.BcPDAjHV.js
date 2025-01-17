import{_ as lt}from"./tslib.es6.kHcLnhpD.js";import{a as u,b as Gt,t as Jt,n as si,c as ni}from"./property.BEi3PmIb.js";import{j as ai,f as Pe,i as j,r as Tt,T as Se,x as L,m as ke}from"./messenger-client.Bks7hfH7.js";import{S as li}from"./signal-watcher.DchcTGV4.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pe="lit-localize-status";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ci=class{constructor(e){this.__litLocalizeEventHandler=i=>{i.detail.status==="ready"&&this.host.requestUpdate()},this.host=e}hostConnected(){window.addEventListener(pe,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(pe,this.__litLocalizeEventHandler)}};const hi=t=>t.addController(new ci(t)),di=hi;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Oe=()=>(t,e)=>(t.addInitializer(di),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Me={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Te=t=>(...e)=>({_$litDirective$:t,values:e});let Re=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,o){this._$Ct=e,this._$AM=i,this._$Ci=o}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}};function Qt(t){return{attribute:t,type:Object,hasChanged:(e,i)=>(e==null?void 0:e.toString())!==(i==null?void 0:i.toString()),converter:{fromAttribute:e=>e&&e.length>0&&ai(e),toAttribute:e=>e&&Pe(e)},reflect:!0}}function He(t){return`data:image/svg+xml;utf8,${pi(t)}`}function pi(t){return`<svg style='fill: currentColor' viewBox='0 0 24 24'><path d='${t}'></path></svg>`}var ui="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z",No="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z",Wo="M15,14C17.67,14 23,15.33 23,18V20H7V18C7,15.33 12.33,14 15,14M15,12A4,4 0 0,1 11,8A4,4 0 0,1 15,4A4,4 0 0,1 19,8A4,4 0 0,1 15,12M5,9.59L7.12,7.46L8.54,8.88L6.41,11L8.54,13.12L7.12,14.54L5,12.41L2.88,14.54L1.46,13.12L3.59,11L1.46,8.88L2.88,7.46L5,9.59Z",Uo="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12M5,13.28L7.45,14.77L6.8,11.96L9,10.08L6.11,9.83L5,7.19L3.87,9.83L1,10.08L3.18,11.96L2.5,14.77L5,13.28Z",fi="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z",qo="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z",Zo="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",Ko="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",Yo="M22 20.7L3.3 2L2 3.3L3 4.3V19C3 20.1 3.9 21 5 21H19.7L20.7 22L22 20.7M5 19V6.3L12.6 13.9L11.1 15.8L9 13.1L6 17H15.7L17.7 19H5M8.8 5L6.8 3H19C20.1 3 21 3.9 21 5V17.2L19 15.2V5H8.8",Xo="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",Go="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z",Jo="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",Qo="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",tr="M2,21L23,12L2,3V10L17,12L2,14V21Z";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function te(t){return u({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gi=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ct(t,e){return(i,o,r)=>{const s=n=>{var a;return((a=n.renderRoot)==null?void 0:a.querySelector(t))??null};return gi(i,o,{get(){return s(this)}})}}var mi=j`
  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: var(--sl-color-neutral-200);
    --sheen-color: var(--sl-color-neutral-300);

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :host {
      --color: GrayText;
    }
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`,xt=j`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,Be=Object.defineProperty,vi=Object.defineProperties,yi=Object.getOwnPropertyDescriptor,bi=Object.getOwnPropertyDescriptors,ue=Object.getOwnPropertySymbols,wi=Object.prototype.hasOwnProperty,xi=Object.prototype.propertyIsEnumerable,Vt=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),ee=t=>{throw TypeError(t)},fe=(t,e,i)=>e in t?Be(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,Ct=(t,e)=>{for(var i in e||(e={}))wi.call(e,i)&&fe(t,i,e[i]);if(ue)for(var i of ue(e))xi.call(e,i)&&fe(t,i,e[i]);return t},ie=(t,e)=>vi(t,bi(e)),f=(t,e,i,o)=>{for(var r=o>1?void 0:o?yi(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(e,i,r):n(r))||r);return o&&r&&Be(e,i,r),r},De=(t,e,i)=>e.has(t)||ee("Cannot "+i),Ci=(t,e,i)=>(De(t,e,"read from private field"),e.get(t)),Li=(t,e,i)=>e.has(t)?ee("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),Ai=(t,e,i,o)=>(De(t,e,"write to private field"),e.set(t,i),i),_i=function(t,e){this[0]=t,this[1]=e},er=t=>{var e=t[Vt("asyncIterator")],i=!1,o,r={};return e==null?(e=t[Vt("iterator")](),o=s=>r[s]=n=>e[s](n)):(e=e.call(t),o=s=>r[s]=n=>{if(i){if(i=!1,s==="throw")throw n;return n}return i=!0,{done:!1,value:new _i(new Promise(a=>{var l=e[s](n);l instanceof Object||ee("Object expected"),a(l)}),1)}}),r[Vt("iterator")]=()=>r,o("next"),"throw"in e?o("throw"):r.throw=s=>{throw s},"return"in e&&o("return"),r},$t,Y=class extends Tt{constructor(){super(),Li(this,$t,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){const i=new CustomEvent(t,Ct({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(i),i}static define(t,e=this,i={}){const o=customElements.get(t);if(!o){try{customElements.define(t,e,i)}catch{customElements.define(t,class extends e{},i)}return}let r=" (unknown version)",s=r;"version"in e&&e.version&&(r=" v"+e.version),"version"in o&&o.version&&(s=" v"+o.version),!(r&&s&&r===s)&&console.warn(`Attempted to register <${t}>${r}, but <${t}>${s} has already been registered.`)}attributeChangedCallback(t,e,i){Ci(this,$t)||(this.constructor.elementProperties.forEach((o,r)=>{o.reflect&&this[r]!=null&&this.initialReflectedProperties.set(r,this[r])}),Ai(this,$t,!0)),super.attributeChangedCallback(t,e,i)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,i)=>{t.has(i)&&this[i]==null&&(this[i]=e)})}};$t=new WeakMap;Y.version="2.19.0";Y.dependencies={};f([u()],Y.prototype,"dir",2);f([u()],Y.prototype,"lang",2);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ut=Te(class extends Re{constructor(t){var e;if(super(t),t.type!==Me.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var o,r;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in e)e[s]&&!((o=this.nt)!=null&&o.has(s))&&this.st.add(s);return this.render(e)}const i=t.element.classList;for(const s of this.st)s in e||(i.remove(s),this.st.delete(s));for(const s in e){const n=!!e[s];n===this.st.has(s)||(r=this.nt)!=null&&r.has(s)||(n?(i.add(s),this.st.add(s)):(i.remove(s),this.st.delete(s)))}return Se}});var oe=class extends Y{constructor(){super(...arguments),this.effect="none"}render(){return L`
      <div
        part="base"
        class=${ut({skeleton:!0,"skeleton--pulse":this.effect==="pulse","skeleton--sheen":this.effect==="sheen"})}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};oe.styles=[xt,mi];f([u()],oe.prototype,"effect",2);oe.define("sl-skeleton");var Ei=j`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`,Ut="";function ge(t){Ut=t}function $i(t=""){if(!Ut){const e=[...document.getElementsByTagName("script")],i=e.find(o=>o.hasAttribute("data-shoelace"));if(i)ge(i.getAttribute("data-shoelace"));else{const o=e.find(s=>/shoelace(\.min)?\.js($|\?)/.test(s.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(s.src));let r="";o&&(r=o.getAttribute("src")),ge(r.split("/").slice(0,-1).join("/"))}}return Ut.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var zi={name:"default",resolver:t=>$i(`assets/icons/${t}.svg`)},Pi=zi,me={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},Si={name:"system",resolver:t=>t in me?`data:image/svg+xml,${encodeURIComponent(me[t])}`:""},ki=Si,Oi=[Pi,ki],qt=[];function Mi(t){qt.push(t)}function Ti(t){qt=qt.filter(e=>e!==t)}function ve(t){return Oi.find(e=>e.name===t)}var Ri=j`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function gt(t,e){const i=Ct({waitUntilFirstUpdate:!1},e);return(o,r)=>{const{update:s}=o,n=Array.isArray(t)?t:[t];o.update=function(a){n.forEach(l=>{const c=l;if(a.has(c)){const h=a.get(c),d=this[c];h!==d&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[r](h,d)}}),s.call(this,a)}}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Hi=(t,e)=>(t==null?void 0:t._$litType$)!==void 0,ir=t=>t.strings===void 0,Bi={},or=(t,e=Bi)=>t._$AH=e;var bt=Symbol(),_t=Symbol(),It,Ft=new Map,N=class extends Y{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var i;let o;if(e!=null&&e.spriteSheet)return this.svg=L`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?bt:_t}catch{return _t}try{const r=document.createElement("div");r.innerHTML=await o.text();const s=r.firstElementChild;if(((i=s==null?void 0:s.tagName)==null?void 0:i.toLowerCase())!=="svg")return bt;It||(It=new DOMParser);const a=It.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):bt}catch{return bt}}connectedCallback(){super.connectedCallback(),Mi(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Ti(this)}getIconSource(){const t=ve(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:i}=this.getIconSource(),o=i?ve(this.library):void 0;if(!e){this.svg=null;return}let r=Ft.get(e);if(r||(r=this.resolveIcon(e,o),Ft.set(e,r)),!this.initialRender)return;const s=await r;if(s===_t&&Ft.delete(e),e===this.getIconSource().url){if(Hi(s)){if(this.svg=s,o){await this.updateComplete;const n=this.shadowRoot.querySelector("[part='svg']");typeof o.mutator=="function"&&n&&o.mutator(n)}return}switch(s){case _t:case bt:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(!0),(t=o==null?void 0:o.mutator)==null||t.call(o,this.svg),this.emit("sl-load")}}}render(){return this.svg}};N.styles=[xt,Ri];f([te()],N.prototype,"svg",2);f([u({reflect:!0})],N.prototype,"name",2);f([u()],N.prototype,"src",2);f([u()],N.prototype,"label",2);f([u({reflect:!0})],N.prototype,"library",2);f([gt("label")],N.prototype,"handleLabelChange",1);f([gt(["name","src","library"])],N.prototype,"setIcon",1);var W=class extends Y{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}handleImageLoadError(){this.hasError=!0,this.emit("sl-error")}render(){const t=L`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${this.handleImageLoadError}"
      />
    `;let e=L``;return this.initials?e=L`<div part="initials" class="avatar__initials">${this.initials}</div>`:e=L`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `,L`
      <div
        part="base"
        class=${ut({avatar:!0,"avatar--circle":this.shape==="circle","avatar--rounded":this.shape==="rounded","avatar--square":this.shape==="square"})}
        role="img"
        aria-label=${this.label}
      >
        ${this.image&&!this.hasError?t:e}
      </div>
    `}};W.styles=[xt,Ei];W.dependencies={"sl-icon":N};f([te()],W.prototype,"hasError",2);f([u()],W.prototype,"image",2);f([u()],W.prototype,"label",2);f([u()],W.prototype,"initials",2);f([u()],W.prototype,"loading",2);f([u({reflect:!0})],W.prototype,"shape",2);f([gt("image")],W.prototype,"handleImageChange",1);W.define("sl-avatar");N.define("sl-icon");var Di=j`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,Vi=j`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const Zt=new Set,dt=new Map;let rt,re="ltr",se="en";const Ve=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Ve){const t=new MutationObserver(Fe);re=document.documentElement.dir||"ltr",se=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function Ie(...t){t.map(e=>{const i=e.$code.toLowerCase();dt.has(i)?dt.set(i,Object.assign(Object.assign({},dt.get(i)),e)):dt.set(i,e),rt||(rt=e)}),Fe()}function Fe(){Ve&&(re=document.documentElement.dir||"ltr",se=document.documentElement.lang||navigator.language),[...Zt.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let Ii=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Zt.add(this.host)}hostDisconnected(){Zt.delete(this.host)}dir(){return`${this.host.dir||re}`.toLowerCase()}lang(){return`${this.host.lang||se}`.toLowerCase()}getTranslationData(e){var i,o;const r=new Intl.Locale(e.replace(/_/g,"-")),s=r==null?void 0:r.language.toLowerCase(),n=(o=(i=r==null?void 0:r.region)===null||i===void 0?void 0:i.toLowerCase())!==null&&o!==void 0?o:"",a=dt.get(`${s}-${n}`),l=dt.get(s);return{locale:r,language:s,region:n,primary:a,secondary:l}}exists(e,i){var o;const{primary:r,secondary:s}=this.getTranslationData((o=i.lang)!==null&&o!==void 0?o:this.lang());return i=Object.assign({includeFallback:!1},i),!!(r&&r[e]||s&&s[e]||i.includeFallback&&rt&&rt[e])}term(e,...i){const{primary:o,secondary:r}=this.getTranslationData(this.lang());let s;if(o&&o[e])s=o[e];else if(r&&r[e])s=r[e];else if(rt&&rt[e])s=rt[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof s=="function"?s(...i):s}date(e,i){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),i).format(e)}number(e,i){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),i).format(e)}relativeTime(e,i,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(e,i)}};var je={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};Ie(je);var Fi=je,Ne=class extends Ii{};Ie(Fi);const et=Math.min,P=Math.max,St=Math.round,Et=Math.floor,V=t=>({x:t,y:t}),ji={left:"right",right:"left",bottom:"top",top:"bottom"},Ni={start:"end",end:"start"};function Kt(t,e,i){return P(t,et(e,i))}function mt(t,e){return typeof t=="function"?t(e):t}function it(t){return t.split("-")[0]}function vt(t){return t.split("-")[1]}function We(t){return t==="x"?"y":"x"}function ne(t){return t==="y"?"height":"width"}function st(t){return["top","bottom"].includes(it(t))?"y":"x"}function ae(t){return We(st(t))}function Wi(t,e,i){i===void 0&&(i=!1);const o=vt(t),r=ae(t),s=ne(r);let n=r==="x"?o===(i?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(n=kt(n)),[n,kt(n)]}function Ui(t){const e=kt(t);return[Yt(t),e,Yt(e)]}function Yt(t){return t.replace(/start|end/g,e=>Ni[e])}function qi(t,e,i){const o=["left","right"],r=["right","left"],s=["top","bottom"],n=["bottom","top"];switch(t){case"top":case"bottom":return i?e?r:o:e?o:r;case"left":case"right":return e?s:n;default:return[]}}function Zi(t,e,i,o){const r=vt(t);let s=qi(it(t),i==="start",o);return r&&(s=s.map(n=>n+"-"+r),e&&(s=s.concat(s.map(Yt)))),s}function kt(t){return t.replace(/left|right|bottom|top/g,e=>ji[e])}function Ki(t){return{top:0,right:0,bottom:0,left:0,...t}}function Ue(t){return typeof t!="number"?Ki(t):{top:t,right:t,bottom:t,left:t}}function Ot(t){const{x:e,y:i,width:o,height:r}=t;return{width:o,height:r,top:i,left:e,right:e+o,bottom:i+r,x:e,y:i}}function ye(t,e,i){let{reference:o,floating:r}=t;const s=st(e),n=ae(e),a=ne(n),l=it(e),c=s==="y",h=o.x+o.width/2-r.width/2,d=o.y+o.height/2-r.height/2,m=o[a]/2-r[a]/2;let p;switch(l){case"top":p={x:h,y:o.y-r.height};break;case"bottom":p={x:h,y:o.y+o.height};break;case"right":p={x:o.x+o.width,y:d};break;case"left":p={x:o.x-r.width,y:d};break;default:p={x:o.x,y:o.y}}switch(vt(e)){case"start":p[n]-=m*(i&&c?-1:1);break;case"end":p[n]+=m*(i&&c?-1:1);break}return p}const Yi=async(t,e,i)=>{const{placement:o="bottom",strategy:r="absolute",middleware:s=[],platform:n}=i,a=s.filter(Boolean),l=await(n.isRTL==null?void 0:n.isRTL(e));let c=await n.getElementRects({reference:t,floating:e,strategy:r}),{x:h,y:d}=ye(c,o,l),m=o,p={},g=0;for(let v=0;v<a.length;v++){const{name:b,fn:y}=a[v],{x:w,y:x,data:_,reset:A}=await y({x:h,y:d,initialPlacement:o,placement:m,strategy:r,middlewareData:p,rects:c,platform:n,elements:{reference:t,floating:e}});h=w??h,d=x??d,p={...p,[b]:{...p[b],..._}},A&&g<=50&&(g++,typeof A=="object"&&(A.placement&&(m=A.placement),A.rects&&(c=A.rects===!0?await n.getElementRects({reference:t,floating:e,strategy:r}):A.rects),{x:h,y:d}=ye(c,m,l)),v=-1)}return{x:h,y:d,placement:m,strategy:r,middlewareData:p}};async function le(t,e){var i;e===void 0&&(e={});const{x:o,y:r,platform:s,rects:n,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:m=!1,padding:p=0}=mt(e,t),g=Ue(p),b=a[m?d==="floating"?"reference":"floating":d],y=Ot(await s.getClippingRect({element:(i=await(s.isElement==null?void 0:s.isElement(b)))==null||i?b:b.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(a.floating)),boundary:c,rootBoundary:h,strategy:l})),w=d==="floating"?{x:o,y:r,width:n.floating.width,height:n.floating.height}:n.reference,x=await(s.getOffsetParent==null?void 0:s.getOffsetParent(a.floating)),_=await(s.isElement==null?void 0:s.isElement(x))?await(s.getScale==null?void 0:s.getScale(x))||{x:1,y:1}:{x:1,y:1},A=Ot(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:w,offsetParent:x,strategy:l}):w);return{top:(y.top-A.top+g.top)/_.y,bottom:(A.bottom-y.bottom+g.bottom)/_.y,left:(y.left-A.left+g.left)/_.x,right:(A.right-y.right+g.right)/_.x}}const Xi=t=>({name:"arrow",options:t,async fn(e){const{x:i,y:o,placement:r,rects:s,platform:n,elements:a,middlewareData:l}=e,{element:c,padding:h=0}=mt(t,e)||{};if(c==null)return{};const d=Ue(h),m={x:i,y:o},p=ae(r),g=ne(p),v=await n.getDimensions(c),b=p==="y",y=b?"top":"left",w=b?"bottom":"right",x=b?"clientHeight":"clientWidth",_=s.reference[g]+s.reference[p]-m[p]-s.floating[g],A=m[p]-s.reference[p],k=await(n.getOffsetParent==null?void 0:n.getOffsetParent(c));let O=k?k[x]:0;(!O||!await(n.isElement==null?void 0:n.isElement(k)))&&(O=a.floating[x]||s.floating[g]);const q=_/2-A/2,H=O/2-v[g]/2-1,M=et(d[y],H),G=et(d[w],H),B=M,J=O-v[g]-G,$=O/2-v[g]/2+q,ht=Kt(B,$,J),Z=!l.arrow&&vt(r)!=null&&$!==ht&&s.reference[g]/2-($<B?M:G)-v[g]/2<0,D=Z?$<B?$-B:$-J:0;return{[p]:m[p]+D,data:{[p]:ht,centerOffset:$-ht-D,...Z&&{alignmentOffset:D}},reset:Z}}}),Gi=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var i,o;const{placement:r,middlewareData:s,rects:n,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:h=!0,crossAxis:d=!0,fallbackPlacements:m,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:v=!0,...b}=mt(t,e);if((i=s.arrow)!=null&&i.alignmentOffset)return{};const y=it(r),w=st(a),x=it(a)===a,_=await(l.isRTL==null?void 0:l.isRTL(c.floating)),A=m||(x||!v?[kt(a)]:Ui(a)),k=g!=="none";!m&&k&&A.push(...Zi(a,v,g,_));const O=[a,...A],q=await le(e,b),H=[];let M=((o=s.flip)==null?void 0:o.overflows)||[];if(h&&H.push(q[y]),d){const $=Wi(r,n,_);H.push(q[$[0]],q[$[1]])}if(M=[...M,{placement:r,overflows:H}],!H.every($=>$<=0)){var G,B;const $=(((G=s.flip)==null?void 0:G.index)||0)+1,ht=O[$];if(ht)return{data:{index:$,overflows:M},reset:{placement:ht}};let Z=(B=M.filter(D=>D.overflows[0]<=0).sort((D,Q)=>D.overflows[1]-Q.overflows[1])[0])==null?void 0:B.placement;if(!Z)switch(p){case"bestFit":{var J;const D=(J=M.filter(Q=>{if(k){const tt=st(Q.placement);return tt===w||tt==="y"}return!0}).map(Q=>[Q.placement,Q.overflows.filter(tt=>tt>0).reduce((tt,ri)=>tt+ri,0)]).sort((Q,tt)=>Q[1]-tt[1])[0])==null?void 0:J[0];D&&(Z=D);break}case"initialPlacement":Z=a;break}if(r!==Z)return{reset:{placement:Z}}}return{}}}};async function Ji(t,e){const{placement:i,platform:o,elements:r}=t,s=await(o.isRTL==null?void 0:o.isRTL(r.floating)),n=it(i),a=vt(i),l=st(i)==="y",c=["left","top"].includes(n)?-1:1,h=s&&l?-1:1,d=mt(e,t);let{mainAxis:m,crossAxis:p,alignmentAxis:g}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return a&&typeof g=="number"&&(p=a==="end"?g*-1:g),l?{x:p*h,y:m*c}:{x:m*c,y:p*h}}const Qi=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var i,o;const{x:r,y:s,placement:n,middlewareData:a}=e,l=await Ji(e,t);return n===((i=a.offset)==null?void 0:i.placement)&&(o=a.arrow)!=null&&o.alignmentOffset?{}:{x:r+l.x,y:s+l.y,data:{...l,placement:n}}}}},to=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:i,y:o,placement:r}=e,{mainAxis:s=!0,crossAxis:n=!1,limiter:a={fn:b=>{let{x:y,y:w}=b;return{x:y,y:w}}},...l}=mt(t,e),c={x:i,y:o},h=await le(e,l),d=st(it(r)),m=We(d);let p=c[m],g=c[d];if(s){const b=m==="y"?"top":"left",y=m==="y"?"bottom":"right",w=p+h[b],x=p-h[y];p=Kt(w,p,x)}if(n){const b=d==="y"?"top":"left",y=d==="y"?"bottom":"right",w=g+h[b],x=g-h[y];g=Kt(w,g,x)}const v=a.fn({...e,[m]:p,[d]:g});return{...v,data:{x:v.x-i,y:v.y-o,enabled:{[m]:s,[d]:n}}}}}},eo=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var i,o;const{placement:r,rects:s,platform:n,elements:a}=e,{apply:l=()=>{},...c}=mt(t,e),h=await le(e,c),d=it(r),m=vt(r),p=st(r)==="y",{width:g,height:v}=s.floating;let b,y;d==="top"||d==="bottom"?(b=d,y=m===(await(n.isRTL==null?void 0:n.isRTL(a.floating))?"start":"end")?"left":"right"):(y=d,b=m==="end"?"top":"bottom");const w=v-h.top-h.bottom,x=g-h.left-h.right,_=et(v-h[b],w),A=et(g-h[y],x),k=!e.middlewareData.shift;let O=_,q=A;if((i=e.middlewareData.shift)!=null&&i.enabled.x&&(q=x),(o=e.middlewareData.shift)!=null&&o.enabled.y&&(O=w),k&&!m){const M=P(h.left,0),G=P(h.right,0),B=P(h.top,0),J=P(h.bottom,0);p?q=g-2*(M!==0||G!==0?M+G:P(h.left,h.right)):O=v-2*(B!==0||J!==0?B+J:P(h.top,h.bottom))}await l({...e,availableWidth:q,availableHeight:O});const H=await n.getDimensions(a.floating);return g!==H.width||v!==H.height?{reset:{rects:!0}}:{}}}};function Rt(){return typeof window<"u"}function yt(t){return qe(t)?(t.nodeName||"").toLowerCase():"#document"}function S(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function U(t){var e;return(e=(qe(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function qe(t){return Rt()?t instanceof Node||t instanceof S(t).Node:!1}function T(t){return Rt()?t instanceof Element||t instanceof S(t).Element:!1}function I(t){return Rt()?t instanceof HTMLElement||t instanceof S(t).HTMLElement:!1}function be(t){return!Rt()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof S(t).ShadowRoot}function Lt(t){const{overflow:e,overflowX:i,overflowY:o,display:r}=R(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+i)&&!["inline","contents"].includes(r)}function io(t){return["table","td","th"].includes(yt(t))}function Ht(t){return[":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch{return!1}})}function Bt(t){const e=ce(),i=T(t)?R(t):t;return i.transform!=="none"||i.perspective!=="none"||(i.containerType?i.containerType!=="normal":!1)||!e&&(i.backdropFilter?i.backdropFilter!=="none":!1)||!e&&(i.filter?i.filter!=="none":!1)||["transform","perspective","filter"].some(o=>(i.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(i.contain||"").includes(o))}function oo(t){let e=ot(t);for(;I(e)&&!ft(e);){if(Bt(e))return e;if(Ht(e))return null;e=ot(e)}return null}function ce(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function ft(t){return["html","body","#document"].includes(yt(t))}function R(t){return S(t).getComputedStyle(t)}function Dt(t){return T(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function ot(t){if(yt(t)==="html")return t;const e=t.assignedSlot||t.parentNode||be(t)&&t.host||U(t);return be(e)?e.host:e}function Ze(t){const e=ot(t);return ft(e)?t.ownerDocument?t.ownerDocument.body:t.body:I(e)&&Lt(e)?e:Ze(e)}function wt(t,e,i){var o;e===void 0&&(e=[]),i===void 0&&(i=!0);const r=Ze(t),s=r===((o=t.ownerDocument)==null?void 0:o.body),n=S(r);if(s){const a=Xt(n);return e.concat(n,n.visualViewport||[],Lt(r)?r:[],a&&i?wt(a):[])}return e.concat(r,wt(r,[],i))}function Xt(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Ke(t){const e=R(t);let i=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const r=I(t),s=r?t.offsetWidth:i,n=r?t.offsetHeight:o,a=St(i)!==s||St(o)!==n;return a&&(i=s,o=n),{width:i,height:o,$:a}}function he(t){return T(t)?t:t.contextElement}function pt(t){const e=he(t);if(!I(e))return V(1);const i=e.getBoundingClientRect(),{width:o,height:r,$:s}=Ke(e);let n=(s?St(i.width):i.width)/o,a=(s?St(i.height):i.height)/r;return(!n||!Number.isFinite(n))&&(n=1),(!a||!Number.isFinite(a))&&(a=1),{x:n,y:a}}const ro=V(0);function Ye(t){const e=S(t);return!ce()||!e.visualViewport?ro:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function so(t,e,i){return e===void 0&&(e=!1),!i||e&&i!==S(t)?!1:e}function nt(t,e,i,o){e===void 0&&(e=!1),i===void 0&&(i=!1);const r=t.getBoundingClientRect(),s=he(t);let n=V(1);e&&(o?T(o)&&(n=pt(o)):n=pt(t));const a=so(s,i,o)?Ye(s):V(0);let l=(r.left+a.x)/n.x,c=(r.top+a.y)/n.y,h=r.width/n.x,d=r.height/n.y;if(s){const m=S(s),p=o&&T(o)?S(o):o;let g=m,v=Xt(g);for(;v&&o&&p!==g;){const b=pt(v),y=v.getBoundingClientRect(),w=R(v),x=y.left+(v.clientLeft+parseFloat(w.paddingLeft))*b.x,_=y.top+(v.clientTop+parseFloat(w.paddingTop))*b.y;l*=b.x,c*=b.y,h*=b.x,d*=b.y,l+=x,c+=_,g=S(v),v=Xt(g)}}return Ot({width:h,height:d,x:l,y:c})}function de(t,e){const i=Dt(t).scrollLeft;return e?e.left+i:nt(U(t)).left+i}function Xe(t,e,i){i===void 0&&(i=!1);const o=t.getBoundingClientRect(),r=o.left+e.scrollLeft-(i?0:de(t,o)),s=o.top+e.scrollTop;return{x:r,y:s}}function no(t){let{elements:e,rect:i,offsetParent:o,strategy:r}=t;const s=r==="fixed",n=U(o),a=e?Ht(e.floating):!1;if(o===n||a&&s)return i;let l={scrollLeft:0,scrollTop:0},c=V(1);const h=V(0),d=I(o);if((d||!d&&!s)&&((yt(o)!=="body"||Lt(n))&&(l=Dt(o)),I(o))){const p=nt(o);c=pt(o),h.x=p.x+o.clientLeft,h.y=p.y+o.clientTop}const m=n&&!d&&!s?Xe(n,l,!0):V(0);return{width:i.width*c.x,height:i.height*c.y,x:i.x*c.x-l.scrollLeft*c.x+h.x+m.x,y:i.y*c.y-l.scrollTop*c.y+h.y+m.y}}function ao(t){return Array.from(t.getClientRects())}function lo(t){const e=U(t),i=Dt(t),o=t.ownerDocument.body,r=P(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),s=P(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let n=-i.scrollLeft+de(t);const a=-i.scrollTop;return R(o).direction==="rtl"&&(n+=P(e.clientWidth,o.clientWidth)-r),{width:r,height:s,x:n,y:a}}function co(t,e){const i=S(t),o=U(t),r=i.visualViewport;let s=o.clientWidth,n=o.clientHeight,a=0,l=0;if(r){s=r.width,n=r.height;const c=ce();(!c||c&&e==="fixed")&&(a=r.offsetLeft,l=r.offsetTop)}return{width:s,height:n,x:a,y:l}}function ho(t,e){const i=nt(t,!0,e==="fixed"),o=i.top+t.clientTop,r=i.left+t.clientLeft,s=I(t)?pt(t):V(1),n=t.clientWidth*s.x,a=t.clientHeight*s.y,l=r*s.x,c=o*s.y;return{width:n,height:a,x:l,y:c}}function we(t,e,i){let o;if(e==="viewport")o=co(t,i);else if(e==="document")o=lo(U(t));else if(T(e))o=ho(e,i);else{const r=Ye(t);o={x:e.x-r.x,y:e.y-r.y,width:e.width,height:e.height}}return Ot(o)}function Ge(t,e){const i=ot(t);return i===e||!T(i)||ft(i)?!1:R(i).position==="fixed"||Ge(i,e)}function po(t,e){const i=e.get(t);if(i)return i;let o=wt(t,[],!1).filter(a=>T(a)&&yt(a)!=="body"),r=null;const s=R(t).position==="fixed";let n=s?ot(t):t;for(;T(n)&&!ft(n);){const a=R(n),l=Bt(n);!l&&a.position==="fixed"&&(r=null),(s?!l&&!r:!l&&a.position==="static"&&!!r&&["absolute","fixed"].includes(r.position)||Lt(n)&&!l&&Ge(t,n))?o=o.filter(h=>h!==n):r=a,n=ot(n)}return e.set(t,o),o}function uo(t){let{element:e,boundary:i,rootBoundary:o,strategy:r}=t;const n=[...i==="clippingAncestors"?Ht(e)?[]:po(e,this._c):[].concat(i),o],a=n[0],l=n.reduce((c,h)=>{const d=we(e,h,r);return c.top=P(d.top,c.top),c.right=et(d.right,c.right),c.bottom=et(d.bottom,c.bottom),c.left=P(d.left,c.left),c},we(e,a,r));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function fo(t){const{width:e,height:i}=Ke(t);return{width:e,height:i}}function go(t,e,i){const o=I(e),r=U(e),s=i==="fixed",n=nt(t,!0,s,e);let a={scrollLeft:0,scrollTop:0};const l=V(0);if(o||!o&&!s)if((yt(e)!=="body"||Lt(r))&&(a=Dt(e)),o){const m=nt(e,!0,s,e);l.x=m.x+e.clientLeft,l.y=m.y+e.clientTop}else r&&(l.x=de(r));const c=r&&!o&&!s?Xe(r,a):V(0),h=n.left+a.scrollLeft-l.x-c.x,d=n.top+a.scrollTop-l.y-c.y;return{x:h,y:d,width:n.width,height:n.height}}function jt(t){return R(t).position==="static"}function xe(t,e){if(!I(t)||R(t).position==="fixed")return null;if(e)return e(t);let i=t.offsetParent;return U(t)===i&&(i=i.ownerDocument.body),i}function Je(t,e){const i=S(t);if(Ht(t))return i;if(!I(t)){let r=ot(t);for(;r&&!ft(r);){if(T(r)&&!jt(r))return r;r=ot(r)}return i}let o=xe(t,e);for(;o&&io(o)&&jt(o);)o=xe(o,e);return o&&ft(o)&&jt(o)&&!Bt(o)?i:o||oo(t)||i}const mo=async function(t){const e=this.getOffsetParent||Je,i=this.getDimensions,o=await i(t.floating);return{reference:go(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function vo(t){return R(t).direction==="rtl"}const zt={convertOffsetParentRelativeRectToViewportRelativeRect:no,getDocumentElement:U,getClippingRect:uo,getOffsetParent:Je,getElementRects:mo,getClientRects:ao,getDimensions:fo,getScale:pt,isElement:T,isRTL:vo};function yo(t,e){let i=null,o;const r=U(t);function s(){var a;clearTimeout(o),(a=i)==null||a.disconnect(),i=null}function n(a,l){a===void 0&&(a=!1),l===void 0&&(l=1),s();const{left:c,top:h,width:d,height:m}=t.getBoundingClientRect();if(a||e(),!d||!m)return;const p=Et(h),g=Et(r.clientWidth-(c+d)),v=Et(r.clientHeight-(h+m)),b=Et(c),w={rootMargin:-p+"px "+-g+"px "+-v+"px "+-b+"px",threshold:P(0,et(1,l))||1};let x=!0;function _(A){const k=A[0].intersectionRatio;if(k!==l){if(!x)return n();k?n(!1,k):o=setTimeout(()=>{n(!1,1e-7)},1e3)}x=!1}try{i=new IntersectionObserver(_,{...w,root:r.ownerDocument})}catch{i=new IntersectionObserver(_,w)}i.observe(t)}return n(!0),s}function bo(t,e,i,o){o===void 0&&(o={});const{ancestorScroll:r=!0,ancestorResize:s=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=!1}=o,c=he(t),h=r||s?[...c?wt(c):[],...wt(e)]:[];h.forEach(y=>{r&&y.addEventListener("scroll",i,{passive:!0}),s&&y.addEventListener("resize",i)});const d=c&&a?yo(c,i):null;let m=-1,p=null;n&&(p=new ResizeObserver(y=>{let[w]=y;w&&w.target===c&&p&&(p.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var x;(x=p)==null||x.observe(e)})),i()}),c&&!l&&p.observe(c),p.observe(e));let g,v=l?nt(t):null;l&&b();function b(){const y=nt(t);v&&(y.x!==v.x||y.y!==v.y||y.width!==v.width||y.height!==v.height)&&i(),v=y,g=requestAnimationFrame(b)}return i(),()=>{var y;h.forEach(w=>{r&&w.removeEventListener("scroll",i),s&&w.removeEventListener("resize",i)}),d==null||d(),(y=p)==null||y.disconnect(),p=null,l&&cancelAnimationFrame(g)}}const wo=Qi,xo=to,Co=Gi,Ce=eo,Lo=Xi,Ao=(t,e,i)=>{const o=new Map,r={platform:zt,...i},s={...r.platform,_c:o};return Yi(t,e,{...r,platform:s})};function _o(t){return Eo(t)}function Nt(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Eo(t){for(let e=t;e;e=Nt(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Nt(t);e;e=Nt(e)){if(!(e instanceof Element))continue;const i=getComputedStyle(e);if(i.display!=="contents"&&(i.position!=="static"||Bt(i)||e.tagName==="BODY"))return e}return null}function $o(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var C=class extends Y{constructor(){super(...arguments),this.localize=new Ne(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom");let o=0,r=0,s=0,n=0,a=0,l=0,c=0,h=0;i?t.top<e.top?(o=t.left,r=t.bottom,s=t.right,n=t.bottom,a=e.left,l=e.top,c=e.right,h=e.top):(o=e.left,r=e.bottom,s=e.right,n=e.bottom,a=t.left,l=t.top,c=t.right,h=t.top):t.left<e.left?(o=t.right,r=t.top,s=e.left,n=e.top,a=t.right,l=t.bottom,c=e.left,h=e.bottom):(o=e.right,r=e.top,s=t.left,n=t.top,a=e.right,l=e.bottom,c=t.left,h=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||$o(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=bo(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[wo({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Ce({apply:({rects:i})=>{const o=this.sync==="width"||this.sync==="both",r=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${i.reference.width}px`:"",this.popup.style.height=r?`${i.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Co({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(xo({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Ce({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Lo({element:this.arrowEl,padding:this.arrowPadding}));const e=this.strategy==="absolute"?i=>zt.getOffsetParent(i,_o):zt.getOffsetParent;Ao(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:ie(Ct({},zt),{getOffsetParent:e})}).then(({x:i,y:o,middlewareData:r,placement:s})=>{const n=this.localize.dir()==="rtl",a={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${i}px`,top:`${o}px`}),this.arrow){const l=r.arrow.x,c=r.arrow.y;let h="",d="",m="",p="";if(this.arrowPlacement==="start"){const g=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",d=n?g:"",p=n?"":g}else if(this.arrowPlacement==="end"){const g=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";d=n?"":g,p=n?g:"",m=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(p=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",h=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(p=typeof l=="number"?`${l}px`:"",h=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:h,right:d,bottom:m,left:p,[a]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return L`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${ut({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${ut({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?L`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};C.styles=[xt,Vi];f([ct(".popup")],C.prototype,"popup",2);f([ct(".popup__arrow")],C.prototype,"arrowEl",2);f([u()],C.prototype,"anchor",2);f([u({type:Boolean,reflect:!0})],C.prototype,"active",2);f([u({reflect:!0})],C.prototype,"placement",2);f([u({reflect:!0})],C.prototype,"strategy",2);f([u({type:Number})],C.prototype,"distance",2);f([u({type:Number})],C.prototype,"skidding",2);f([u({type:Boolean})],C.prototype,"arrow",2);f([u({attribute:"arrow-placement"})],C.prototype,"arrowPlacement",2);f([u({attribute:"arrow-padding",type:Number})],C.prototype,"arrowPadding",2);f([u({type:Boolean})],C.prototype,"flip",2);f([u({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],C.prototype,"flipFallbackPlacements",2);f([u({attribute:"flip-fallback-strategy"})],C.prototype,"flipFallbackStrategy",2);f([u({type:Object})],C.prototype,"flipBoundary",2);f([u({attribute:"flip-padding",type:Number})],C.prototype,"flipPadding",2);f([u({type:Boolean})],C.prototype,"shift",2);f([u({type:Object})],C.prototype,"shiftBoundary",2);f([u({attribute:"shift-padding",type:Number})],C.prototype,"shiftPadding",2);f([u({attribute:"auto-size"})],C.prototype,"autoSize",2);f([u()],C.prototype,"sync",2);f([u({type:Object})],C.prototype,"autoSizeBoundary",2);f([u({attribute:"auto-size-padding",type:Number})],C.prototype,"autoSizePadding",2);f([u({attribute:"hover-bridge",type:Boolean})],C.prototype,"hoverBridge",2);var Qe=new Map,zo=new WeakMap;function Po(t){return t??{keyframes:[],options:{duration:0}}}function Le(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function ti(t,e){Qe.set(t,Po(e))}function Ae(t,e,i){const o=zo.get(t);if(o!=null&&o[e])return Le(o[e],i.dir);const r=Qe.get(e);return r?Le(r,i.dir):{keyframes:[],options:{duration:0}}}function _e(t,e){return new Promise(i=>{function o(r){r.target===t&&(t.removeEventListener(e,o),i())}t.addEventListener(e,o)})}function Ee(t,e,i){return new Promise(o=>{if((i==null?void 0:i.duration)===1/0)throw new Error("Promise-based animations must be finite.");const r=t.animate(e,ie(Ct({},i),{duration:So()?0:i.duration}));r.addEventListener("cancel",o,{once:!0}),r.addEventListener("finish",o,{once:!0})})}function $e(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?parseFloat(t)*1e3:parseFloat(t)}function So(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function ze(t){return Promise.all(t.getAnimations().map(e=>new Promise(i=>{e.cancel(),requestAnimationFrame(i)})))}function sr(t,e){return t.map(i=>ie(Ct({},i),{height:i.height==="auto"?`${e}px`:i.height}))}var E=class extends Y{constructor(){super(),this.localize=new Ne(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=$e(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=$e(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await ze(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:i,options:o}=Ae(this,"tooltip.show",{dir:this.localize.dir()});await Ee(this.popup.popup,i,o),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await ze(this.body);const{keyframes:i,options:o}=Ae(this,"tooltip.hide",{dir:this.localize.dir()});await Ee(this.popup.popup,i,o),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,_e(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,_e(this,"sl-after-hide")}render(){return L`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${ut({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};E.styles=[xt,Di];E.dependencies={"sl-popup":C};f([ct("slot:not([name])")],E.prototype,"defaultSlot",2);f([ct(".tooltip__body")],E.prototype,"body",2);f([ct("sl-popup")],E.prototype,"popup",2);f([u()],E.prototype,"content",2);f([u()],E.prototype,"placement",2);f([u({type:Boolean,reflect:!0})],E.prototype,"disabled",2);f([u({type:Number})],E.prototype,"distance",2);f([u({type:Boolean,reflect:!0})],E.prototype,"open",2);f([u({type:Number})],E.prototype,"skidding",2);f([u()],E.prototype,"trigger",2);f([u({type:Boolean})],E.prototype,"hoist",2);f([gt("open",{waitUntilFirstUpdate:!0})],E.prototype,"handleOpenChange",1);f([gt(["content","distance","hoist","placement","skidding"])],E.prototype,"handleOptionsChange",1);f([gt("disabled")],E.prototype,"handleDisabledChange",1);ti("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});ti("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});E.define("sl-tooltip");var At=function(t,e,i,o){var r=arguments.length,s=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};let at=class extends Tt{constructor(){super(...arguments),this.tooltip=!1}get _iconSize(){return this.iconSize?this.iconSize:this.tooltip!==!1?"32px":"64px"}renderIcon(){return L`
			<sl-icon
				style="color: red; height: ${this._iconSize}; width: ${this._iconSize}; margin-bottom: 8px;"
				src="${He(fi)}"
			></sl-icon>
		`}renderFull(){return L` <div class="column center-content" style="flex: 1">
			${this.renderIcon()}
			<div style="width: 500px; text-align: center" class="column">
				${this.headline?L` <span style="margin-bottom: 8px">${this.headline} </span>`:L``}
				<span class="placeholder"
					>${typeof this.error=="object"&&"message"in this.error?this.error.message:this.error}
				</span>
			</div>
		</div>`}renderTooltip(){return L`
			<sl-tooltip hoist .content=${this.headline?this.headline:this.error}>
				${this.renderIcon()}</sl-tooltip
			>
		`}render(){return this.tooltip!==!1?this.renderTooltip():this.renderFull()}};at.styles=[Gt,j`
			:host {
				display: flex;
			}
		`];At([u({attribute:"tooltip"})],at.prototype,"tooltip",void 0);At([u()],at.prototype,"headline",void 0);At([u()],at.prototype,"error",void 0);At([u({attribute:"icon-size"})],at.prototype,"iconSize",void 0);at=At([Jt("display-error")],at);const ko=si("hc_zome_profiles/store");let Mt=[0],Pt=0;function Oo(t){t[0]===132&&t[1]===32&&t[2]===36?Mt=t.slice(3):Mt=t||[],Pt=0}function z(){return(()=>{const e=Mt[Pt];return Pt=(Pt+1)%Mt.length,e})()/256}function ei(t){const e=Math.floor(z()*360),i=z()*60+40,o=t||(z()*100+(z()+z()+z()+z())*25)/2;return{h:e,s:i,l:o}}function ii({h:t,s:e,l:i}){return`hsl(${t}, ${e}%, ${i}%)`}function Mo(t,e,i){const o=z()*2*Math.PI,r=e*Math.cos(o),s=e*Math.sin(o),n=i.x+r,a=i.x+s,l=o+2*Math.PI*.3,c=e*Math.cos(l),h=e*Math.sin(l),d=i.x+c,m=i.x+h,p=l+2*Math.PI*.3,g=e*Math.cos(p),v=e*Math.sin(p),b=i.x+g,y=i.x+v;t.beginPath(),t.moveTo(n,a),t.lineTo(d,m),t.lineTo(b,y),t.fill()}function To(t){const e=t.hash||[0];return Oo(e),{backgroundColor:t.backgroundColor||ii(ei()),hash:e,size:t.size||32}}function Ro(t,e){if(t.hash&&!(t.hash instanceof Uint8Array))throw new Error("invalid type for opts.hash, expecting Uint8Array or null");t=To(t||{});const{size:i,backgroundColor:o}=t;e.width=e.height=i;const r=e.getContext("2d");if(!r)return;r.fillStyle=o,r.fillRect(0,0,e.width,e.height);const s=z()<.5?3:4,n=Array.apply(null,Array(s)).map((a,l)=>{const c=l===0?5+z()*25:l===1?70+z()*25:null;return{x:z()*i,y:z()*i,radius:5+z()*i*.25,type:Math.floor(z()*3),color:ii(ei(c))}}).sort((a,l)=>a.radius>l.radius?-1:1);for(let a=0;a<s;a++){const l=n[a],{x:c,y:h,radius:d,type:m,color:p}=l;switch(r.fillStyle=p,m){case 0:r.beginPath(),r.arc(c,h,d,0,2*Math.PI),r.fill();break;case 1:r.fillRect(c,h,d*2,d*2);break;case 2:Mo(r,d*2,{x:c,y:h});break;default:throw new Error("shape is greater than 2, this should never happen")}}return e}var X=function(t,e,i,o){var r=arguments.length,s=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};let F=class extends Tt{constructor(){super(...arguments),this.size=32,this.shape="circle",this.disableTooltip=!1,this.disableCopy=!1,this.justCopiedHash=!1}async copyHash(){this.disableCopy||(await navigator.clipboard.writeText(this.strHash),this.timeout&&clearTimeout(this.timeout),this.justCopiedHash=!0,this._tooltip.show(),this.timeout=setTimeout(()=>{this._tooltip.hide(),setTimeout(()=>{this.justCopiedHash=!1},100)},2e3))}get strHash(){return Pe(this.hash)}updated(e){var i,o;super.updated(e),(e.has("hash")&&((i=e.get("hash"))==null?void 0:i.toString())!==((o=this.hash)==null?void 0:o.toString())||e.has("size")||e.has("value"))&&Ro({hash:this.hash,size:this.size},this._canvas)}renderCanvas(){return L` <canvas
      id="canvas"
      width="1"
      height="1"
      class=${ut({square:this.shape==="square",circle:this.shape==="circle"})}
    ></canvas>`}render(){return L`<div
      @click=${()=>this.copyHash()}
      style="${this.disableCopy?"":"cursor: pointer;"} flex-grow: 0"
    >
      <sl-tooltip
        id="tooltip"
        placement="top"
        .content=${this.justCopiedHash?ke("Copied!"):`${this.strHash.substring(0,6)}...`}
        .trigger=${this.disableTooltip||this.justCopiedHash?"manual":"hover focus"}
        hoist
      >
        ${this.renderCanvas()}
      </sl-tooltip>
    </div>`}static get styles(){return j`
      :host {
        display: flex;
      }

      .square {
        border-radius: 0%;
      }
      .circle {
        border-radius: 50%;
      }
    `}};X([u(Qt("hash"))],F.prototype,"hash",void 0);X([u({type:Number})],F.prototype,"size",void 0);X([u({type:String})],F.prototype,"shape",void 0);X([u({type:Boolean,attribute:"disable-tooltip"})],F.prototype,"disableTooltip",void 0);X([u({type:Boolean,attribute:"disable-copy"})],F.prototype,"disableCopy",void 0);X([ct("#canvas")],F.prototype,"_canvas",void 0);X([ct("#tooltip")],F.prototype,"_tooltip",void 0);X([te()],F.prototype,"justCopiedHash",void 0);F=X([Oe(),Jt("holo-identicon")],F);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oi="important",Ho=" !"+oi,Wt=Te(class extends Re{constructor(t){var e;if(super(t),t.type!==Me.ATTRIBUTE||t.name!=="style"||((e=t.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const o=t[i];return o==null?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(t,[e]){const{style:i}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const o of this.ft)e[o]==null&&(this.ft.delete(o),o.includes("-")?i.removeProperty(o):i[o]=null);for(const o in e){const r=e[o];if(r!=null){this.ft.add(o);const s=typeof r=="string"&&r.endsWith(Ho);o.includes("-")||s?i.setProperty(o,s?r.slice(0,-11):r,s?oi:""):i[o]=r}}return Se}});let K=class extends li(Tt){constructor(){super(...arguments),this.size=32,this.disableTooltip=!1,this.disableCopy=!1}renderIdenticon(){return this.agentPubKey?L` <div
			style=${Wt({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
		>
			<holo-identicon
				.disableCopy=${this.disableCopy}
				.disableTooltip=${this.disableTooltip}
				.hash=${this.agentPubKey}
				.size=${this.size}
			>
			</holo-identicon>
			<div class="badge"><slot name="badge"></slot></div>
		</div>`:L`
				<sl-icon
					style=${Wt({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
					.src=${He(ui)}
				>
				</sl-icon>
			`}renderProfile(e){if(!e||!e.entry.fields.avatar)return this.renderIdenticon();const i=L`
			<div
				style=${Wt({cursor:this.disableCopy?"":"pointer",position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
			>
				<sl-avatar
					.image=${e.entry.fields.avatar}
					style="--size: ${this.size}px;"
					@click=${()=>this.dispatchEvent(new CustomEvent("profile-clicked",{composed:!0,bubbles:!0,detail:{agentPubKey:this.agentPubKey}}))}
				>
				</sl-avatar>
				<div class="badge"><slot name="badge"></slot></div>
			</div>
		`;return L`
			<sl-tooltip
				id="tooltip"
				placement="top"
				.trigger=${this.disableTooltip?"manual":"hover focus"}
				hoist
				.content=${e.entry.nickname}
			>
				${i}
			</sl-tooltip>
		`}profile(){if(this.profileHash)return this.store.profiles.get(this.profileHash).latestVersion.get();if(this.agentPubKey){const e=this.store.profileForAgent.get(this.agentPubKey).get();return e.status!=="completed"?e:e.value===void 0?{status:"completed",value:void 0}:e.value.latestVersion.get()}else throw new Error("Either agentPubKey or profileHash needs to be defined for the agent-avatar element")}render(){if(this.store.config.avatarMode==="identicon")return this.renderIdenticon();const e=this.profile();switch(e.status){case"pending":return L`<sl-skeleton
					effect="pulse"
					style="height: ${this.size}px; width: ${this.size}px"
				></sl-skeleton>`;case"completed":return this.renderProfile(e.value);case"error":return L`
					<display-error
						tooltip
						.headline=${ke("Error fetching the agent's avatar")}
						.error=${e.error}
					></display-error>
				`}}};K.styles=[Gt,j`
			.badge {
				position: absolute;
				right: 0;
				bottom: 0;
			}
			:host {
				height: 32px;
			}
		`];lt([u(Qt("agent-pub-key"))],K.prototype,"agentPubKey",void 0);lt([u(Qt("profile-hash"))],K.prototype,"profileHash",void 0);lt([u({type:Number})],K.prototype,"size",void 0);lt([u({type:Boolean,attribute:"disable-tooltip"})],K.prototype,"disableTooltip",void 0);lt([u({type:Boolean,attribute:"disable-copy"})],K.prototype,"disableCopy",void 0);lt([ni({context:ko,subscribe:!0}),u()],K.prototype,"store",void 0);K=lt([Oe(),Jt("agent-avatar")],K);const cr=[...Gt,j`
		.message {
			border-radius: 4px;
			padding: 4px;
			border: 1px solid var(--sl-color-gray-300, lightgrey);
			box-shadow: rgba(149, 157, 165, 0.2) 2px 2px 4px;
			background-color: var(--sl-color-neutral-100, white);
		}
		.from-me {
			right: 0;
		}
		.from-me .message {
			background-color: var(--sl-color-primary-500, blue);
			align-self: end;
			color: white;
		}
		.from-me .message sl-relative-time {
			color: white;
		}
		.from-me .message sl-format-date {
			color: white;
		}
		.from-me .message span {
			color: white;
		}

		.typing-indicator {
			display: flex;
			flex-direction: row;
			align-items: end;
			border-radius: 4px;
			height: 16px;
			padding: 0 4px;
			background: var(--sl-color-neutral-300);
			color: var(--sl-color-neutral-500);
			font-size: 24px;
		}

		.top-bar {
			background-color: var(--sl-color-neutral-100);
			box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 8px;
			padding: 8px;
		}
	`];export{No as A,Wt as B,qo as C,Jo as D,Zo as E,Te as F,Re as G,tr as H,fi as I,ie as J,Ct as K,Ne as L,ir as M,Me as N,or as O,Y as S,f as _,He as a,Xo as b,xt as c,ct as d,ut as e,Qo as f,C as g,_e as h,ze as i,Ae as j,Ee as k,Oe as l,cr as m,N as n,Qt as o,ko as p,Ko as q,te as r,ti as s,sr as t,Yo as u,er as v,gt as w,Go as x,Uo as y,Wo as z};
