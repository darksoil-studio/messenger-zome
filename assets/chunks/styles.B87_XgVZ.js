import{f as Le,k as Qe,i as Z,r as Zt,T as Ae,x as _,p as ti,q as ei,m as ii}from"./messenger-client.Xgv8kjK5.js";import{a as g,b as _e,t as Ee}from"./property.9e9_4Dyz.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const se="lit-localize-status";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let oi=class{constructor(e){this.__litLocalizeEventHandler=i=>{i.detail.status==="ready"&&this.host.requestUpdate()},this.host=e}hostConnected(){window.addEventListener(se,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(se,this.__litLocalizeEventHandler)}};const ri=t=>t.addController(new oi(t)),ni=ri;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const si=()=>(t,e)=>(t.addInitializer(ni),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Se=t=>(...e)=>({_$litDirective$:t,values:e});let ze=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,o){this._$Ct=e,this._$AM=i,this._$Ci=o}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}};function ai(t){return{attribute:t,type:Object,hasChanged:(e,i)=>(e==null?void 0:e.toString())!==(i==null?void 0:i.toString()),converter:{fromAttribute:e=>e&&e.length>0&&Qe(e),toAttribute:e=>e&&Le(e)},reflect:!0}}function li(t){return`data:image/svg+xml;utf8,${ci(t)}`}function ci(t){return encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' style='fill: currentColor' viewBox='0 0 24 24'><path d='${t}'></path></svg>`)}var Bo="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z",Do="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z",Io="M15,14C17.67,14 23,15.33 23,18V20H7V18C7,15.33 12.33,14 15,14M15,12A4,4 0 0,1 11,8A4,4 0 0,1 15,4A4,4 0 0,1 19,8A4,4 0 0,1 15,12M5,9.59L7.12,7.46L8.54,8.88L6.41,11L8.54,13.12L7.12,14.54L5,12.41L2.88,14.54L1.46,13.12L3.59,11L1.46,8.88L2.88,7.46L5,9.59Z",Vo="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12M5,13.28L7.45,14.77L6.8,11.96L9,10.08L6.11,9.83L5,7.19L3.87,9.83L1,10.08L3.18,11.96L2.5,14.77L5,13.28Z",hi="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z",Fo="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z",jo="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",No="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",Wo="M22 20.7L3.3 2L2 3.3L3 4.3V19C3 20.1 3.9 21 5 21H19.7L20.7 22L22 20.7M5 19V6.3L12.6 13.9L11.1 15.8L9 13.1L6 17H15.7L17.7 19H5M8.8 5L6.8 3H19C20.1 3 21 3.9 21 5V17.2L19 15.2V5H8.8",Uo="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",qo="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z",Zo="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",Yo="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",Ko="M2,21L23,12L2,3V10L17,12L2,14V21Z";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Yt(t){return g({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const di=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function at(t,e){return(i,o,r)=>{const n=s=>{var a;return((a=s.renderRoot)==null?void 0:a.querySelector(t))??null};return di(i,o,{get(){return n(this)}})}}var ui=Z`
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
`,wt=Z`
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
`,$e=Object.defineProperty,pi=Object.defineProperties,fi=Object.getOwnPropertyDescriptor,gi=Object.getOwnPropertyDescriptors,ae=Object.getOwnPropertySymbols,mi=Object.prototype.hasOwnProperty,vi=Object.prototype.propertyIsEnumerable,Ht=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),Kt=t=>{throw TypeError(t)},le=(t,e,i)=>e in t?$e(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,bt=(t,e)=>{for(var i in e||(e={}))mi.call(e,i)&&le(t,i,e[i]);if(ae)for(var i of ae(e))vi.call(e,i)&&le(t,i,e[i]);return t},Xt=(t,e)=>pi(t,gi(e)),p=(t,e,i,o)=>{for(var r=o>1?void 0:o?fi(e,i):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(o?s(e,i,r):s(r))||r);return o&&r&&$e(e,i,r),r},Oe=(t,e,i)=>e.has(t)||Kt("Cannot "+i),yi=(t,e,i)=>(Oe(t,e,"read from private field"),e.get(t)),wi=(t,e,i)=>e.has(t)?Kt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),bi=(t,e,i,o)=>(Oe(t,e,"write to private field"),e.set(t,i),i),xi=function(t,e){this[0]=t,this[1]=e},Xo=t=>{var e=t[Ht("asyncIterator")],i=!1,o,r={};return e==null?(e=t[Ht("iterator")](),o=n=>r[n]=s=>e[n](s)):(e=e.call(t),o=n=>r[n]=s=>{if(i){if(i=!1,n==="throw")throw s;return s}return i=!0,{done:!1,value:new xi(new Promise(a=>{var l=e[n](s);l instanceof Object||Kt("Object expected"),a(l)}),1)}}),r[Ht("iterator")]=()=>r,o("next"),"throw"in e?o("throw"):r.throw=n=>{throw n},"return"in e&&o("return"),r},_t,Y=class extends Zt{constructor(){super(),wi(this,_t,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){const i=new CustomEvent(t,bt({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(i),i}static define(t,e=this,i={}){const o=customElements.get(t);if(!o){try{customElements.define(t,e,i)}catch{customElements.define(t,class extends e{},i)}return}let r=" (unknown version)",n=r;"version"in e&&e.version&&(r=" v"+e.version),"version"in o&&o.version&&(n=" v"+o.version),!(r&&n&&r===n)&&console.warn(`Attempted to register <${t}>${r}, but <${t}>${n} has already been registered.`)}attributeChangedCallback(t,e,i){yi(this,_t)||(this.constructor.elementProperties.forEach((o,r)=>{o.reflect&&this[r]!=null&&this.initialReflectedProperties.set(r,this[r])}),bi(this,_t,!0)),super.attributeChangedCallback(t,e,i)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,i)=>{t.has(i)&&this[i]==null&&(this[i]=e)})}};_t=new WeakMap;Y.version="2.20.0";Y.dependencies={};p([g()],Y.prototype,"dir",2);p([g()],Y.prototype,"lang",2);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt=Se(class extends ze{constructor(t){var e;if(super(t),t.type!==Pe.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var o,r;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in e)e[n]&&!((o=this.nt)!=null&&o.has(n))&&this.st.add(n);return this.render(e)}const i=t.element.classList;for(const n of this.st)n in e||(i.remove(n),this.st.delete(n));for(const n in e){const s=!!e[n];s===this.st.has(n)||(r=this.nt)!=null&&r.has(n)||(s?(i.add(n),this.st.add(n)):(i.remove(n),this.st.delete(n)))}return Ae}});var Gt=class extends Y{constructor(){super(...arguments),this.effect="none"}render(){return _`
      <div
        part="base"
        class=${dt({skeleton:!0,"skeleton--pulse":this.effect==="pulse","skeleton--sheen":this.effect==="sheen"})}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};Gt.styles=[wt,ui];p([g()],Gt.prototype,"effect",2);Gt.define("sl-skeleton");var Ci=Z`
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
`,Ft="";function ce(t){Ft=t}function Li(t=""){if(!Ft){const e=[...document.getElementsByTagName("script")],i=e.find(o=>o.hasAttribute("data-shoelace"));if(i)ce(i.getAttribute("data-shoelace"));else{const o=e.find(n=>/shoelace(\.min)?\.js($|\?)/.test(n.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(n.src));let r="";o&&(r=o.getAttribute("src")),ce(r.split("/").slice(0,-1).join("/"))}}return Ft.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var Ai={name:"default",resolver:t=>Li(`assets/icons/${t}.svg`)},_i=Ai,he={caret:`
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
  `},Ei={name:"system",resolver:t=>t in he?`data:image/svg+xml,${encodeURIComponent(he[t])}`:""},Pi=Ei,Si=[_i,Pi],jt=[];function zi(t){jt.push(t)}function $i(t){jt=jt.filter(e=>e!==t)}function de(t){return Si.find(e=>e.name===t)}var Oi=Z`
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
`;function pt(t,e){const i=bt({waitUntilFirstUpdate:!1},e);return(o,r)=>{const{update:n}=o,s=Array.isArray(t)?t:[t];o.update=function(a){s.forEach(l=>{const c=l;if(a.has(c)){const h=a.get(c),d=this[c];h!==d&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[r](h,d)}}),n.call(this,a)}}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ki=(t,e)=>(t==null?void 0:t._$litType$)!==void 0,Go=t=>t.strings===void 0,Mi={},Jo=(t,e=Mi)=>t._$AH=e;var vt=Symbol(),Lt=Symbol(),Bt,Dt=new Map,j=class extends Y{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var i;let o;if(e!=null&&e.spriteSheet)return this.svg=_`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?vt:Lt}catch{return Lt}try{const r=document.createElement("div");r.innerHTML=await o.text();const n=r.firstElementChild;if(((i=n==null?void 0:n.tagName)==null?void 0:i.toLowerCase())!=="svg")return vt;Bt||(Bt=new DOMParser);const a=Bt.parseFromString(n.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):vt}catch{return vt}}connectedCallback(){super.connectedCallback(),zi(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),$i(this)}getIconSource(){const t=de(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:i}=this.getIconSource(),o=i?de(this.library):void 0;if(!e){this.svg=null;return}let r=Dt.get(e);if(r||(r=this.resolveIcon(e,o),Dt.set(e,r)),!this.initialRender)return;const n=await r;if(n===Lt&&Dt.delete(e),e===this.getIconSource().url){if(ki(n)){if(this.svg=n,o){await this.updateComplete;const s=this.shadowRoot.querySelector("[part='svg']");typeof o.mutator=="function"&&s&&o.mutator(s)}return}switch(n){case Lt:case vt:this.svg=null,this.emit("sl-error");break;default:this.svg=n.cloneNode(!0),(t=o==null?void 0:o.mutator)==null||t.call(o,this.svg),this.emit("sl-load")}}}render(){return this.svg}};j.styles=[wt,Oi];p([Yt()],j.prototype,"svg",2);p([g({reflect:!0})],j.prototype,"name",2);p([g()],j.prototype,"src",2);p([g()],j.prototype,"label",2);p([g({reflect:!0})],j.prototype,"library",2);p([pt("label")],j.prototype,"handleLabelChange",1);p([pt(["name","src","library"])],j.prototype,"setIcon",1);var N=class extends Y{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}handleImageLoadError(){this.hasError=!0,this.emit("sl-error")}render(){const t=_`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${this.handleImageLoadError}"
      />
    `;let e=_``;return this.initials?e=_`<div part="initials" class="avatar__initials">${this.initials}</div>`:e=_`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `,_`
      <div
        part="base"
        class=${dt({avatar:!0,"avatar--circle":this.shape==="circle","avatar--rounded":this.shape==="rounded","avatar--square":this.shape==="square"})}
        role="img"
        aria-label=${this.label}
      >
        ${this.image&&!this.hasError?t:e}
      </div>
    `}};N.styles=[wt,Ci];N.dependencies={"sl-icon":j};p([Yt()],N.prototype,"hasError",2);p([g()],N.prototype,"image",2);p([g()],N.prototype,"label",2);p([g()],N.prototype,"initials",2);p([g()],N.prototype,"loading",2);p([g({reflect:!0})],N.prototype,"shape",2);p([pt("image")],N.prototype,"handleImageChange",1);N.define("sl-avatar");j.define("sl-icon");var Ri=Z`
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
`,Ti=Z`
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
`;const Nt=new Set,ct=new Map;let ot,Jt="ltr",Qt="en";const ke=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(ke){const t=new MutationObserver(Re);Jt=document.documentElement.dir||"ltr",Qt=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function Me(...t){t.map(e=>{const i=e.$code.toLowerCase();ct.has(i)?ct.set(i,Object.assign(Object.assign({},ct.get(i)),e)):ct.set(i,e),ot||(ot=e)}),Re()}function Re(){ke&&(Jt=document.documentElement.dir||"ltr",Qt=document.documentElement.lang||navigator.language),[...Nt.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let Hi=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Nt.add(this.host)}hostDisconnected(){Nt.delete(this.host)}dir(){return`${this.host.dir||Jt}`.toLowerCase()}lang(){return`${this.host.lang||Qt}`.toLowerCase()}getTranslationData(e){var i,o;const r=new Intl.Locale(e.replace(/_/g,"-")),n=r==null?void 0:r.language.toLowerCase(),s=(o=(i=r==null?void 0:r.region)===null||i===void 0?void 0:i.toLowerCase())!==null&&o!==void 0?o:"",a=ct.get(`${n}-${s}`),l=ct.get(n);return{locale:r,language:n,region:s,primary:a,secondary:l}}exists(e,i){var o;const{primary:r,secondary:n}=this.getTranslationData((o=i.lang)!==null&&o!==void 0?o:this.lang());return i=Object.assign({includeFallback:!1},i),!!(r&&r[e]||n&&n[e]||i.includeFallback&&ot&&ot[e])}term(e,...i){const{primary:o,secondary:r}=this.getTranslationData(this.lang());let n;if(o&&o[e])n=o[e];else if(r&&r[e])n=r[e];else if(ot&&ot[e])n=ot[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof n=="function"?n(...i):n}date(e,i){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),i).format(e)}number(e,i){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),i).format(e)}relativeTime(e,i,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(e,i)}};var Te={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};Me(Te);var Bi=Te,He=class extends Hi{};Me(Bi);const tt=Math.min,$=Math.max,St=Math.round,At=Math.floor,I=t=>({x:t,y:t}),Di={left:"right",right:"left",bottom:"top",top:"bottom"},Ii={start:"end",end:"start"};function Wt(t,e,i){return $(t,tt(e,i))}function ft(t,e){return typeof t=="function"?t(e):t}function et(t){return t.split("-")[0]}function gt(t){return t.split("-")[1]}function Be(t){return t==="x"?"y":"x"}function te(t){return t==="y"?"height":"width"}function rt(t){return["top","bottom"].includes(et(t))?"y":"x"}function ee(t){return Be(rt(t))}function Vi(t,e,i){i===void 0&&(i=!1);const o=gt(t),r=ee(t),n=te(r);let s=r==="x"?o===(i?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[n]>e.floating[n]&&(s=zt(s)),[s,zt(s)]}function Fi(t){const e=zt(t);return[Ut(t),e,Ut(e)]}function Ut(t){return t.replace(/start|end/g,e=>Ii[e])}function ji(t,e,i){const o=["left","right"],r=["right","left"],n=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return i?e?r:o:e?o:r;case"left":case"right":return e?n:s;default:return[]}}function Ni(t,e,i,o){const r=gt(t);let n=ji(et(t),i==="start",o);return r&&(n=n.map(s=>s+"-"+r),e&&(n=n.concat(n.map(Ut)))),n}function zt(t){return t.replace(/left|right|bottom|top/g,e=>Di[e])}function Wi(t){return{top:0,right:0,bottom:0,left:0,...t}}function De(t){return typeof t!="number"?Wi(t):{top:t,right:t,bottom:t,left:t}}function $t(t){const{x:e,y:i,width:o,height:r}=t;return{width:o,height:r,top:i,left:e,right:e+o,bottom:i+r,x:e,y:i}}function ue(t,e,i){let{reference:o,floating:r}=t;const n=rt(e),s=ee(e),a=te(s),l=et(e),c=n==="y",h=o.x+o.width/2-r.width/2,d=o.y+o.height/2-r.height/2,m=o[a]/2-r[a]/2;let u;switch(l){case"top":u={x:h,y:o.y-r.height};break;case"bottom":u={x:h,y:o.y+o.height};break;case"right":u={x:o.x+o.width,y:d};break;case"left":u={x:o.x-r.width,y:d};break;default:u={x:o.x,y:o.y}}switch(gt(e)){case"start":u[s]-=m*(i&&c?-1:1);break;case"end":u[s]+=m*(i&&c?-1:1);break}return u}const Ui=async(t,e,i)=>{const{placement:o="bottom",strategy:r="absolute",middleware:n=[],platform:s}=i,a=n.filter(Boolean),l=await(s.isRTL==null?void 0:s.isRTL(e));let c=await s.getElementRects({reference:t,floating:e,strategy:r}),{x:h,y:d}=ue(c,o,l),m=o,u={},f=0;for(let v=0;v<a.length;v++){const{name:w,fn:y}=a[v],{x:b,y:x,data:A,reset:L}=await y({x:h,y:d,initialPlacement:o,placement:m,strategy:r,middlewareData:u,rects:c,platform:s,elements:{reference:t,floating:e}});h=b??h,d=x??d,u={...u,[w]:{...u[w],...A}},L&&f<=50&&(f++,typeof L=="object"&&(L.placement&&(m=L.placement),L.rects&&(c=L.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:r}):L.rects),{x:h,y:d}=ue(c,m,l)),v=-1)}return{x:h,y:d,placement:m,strategy:r,middlewareData:u}};async function ie(t,e){var i;e===void 0&&(e={});const{x:o,y:r,platform:n,rects:s,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:m=!1,padding:u=0}=ft(e,t),f=De(u),w=a[m?d==="floating"?"reference":"floating":d],y=$t(await n.getClippingRect({element:(i=await(n.isElement==null?void 0:n.isElement(w)))==null||i?w:w.contextElement||await(n.getDocumentElement==null?void 0:n.getDocumentElement(a.floating)),boundary:c,rootBoundary:h,strategy:l})),b=d==="floating"?{x:o,y:r,width:s.floating.width,height:s.floating.height}:s.reference,x=await(n.getOffsetParent==null?void 0:n.getOffsetParent(a.floating)),A=await(n.isElement==null?void 0:n.isElement(x))?await(n.getScale==null?void 0:n.getScale(x))||{x:1,y:1}:{x:1,y:1},L=$t(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:b,offsetParent:x,strategy:l}):b);return{top:(y.top-L.top+f.top)/A.y,bottom:(L.bottom-y.bottom+f.bottom)/A.y,left:(y.left-L.left+f.left)/A.x,right:(L.right-y.right+f.right)/A.x}}const qi=t=>({name:"arrow",options:t,async fn(e){const{x:i,y:o,placement:r,rects:n,platform:s,elements:a,middlewareData:l}=e,{element:c,padding:h=0}=ft(t,e)||{};if(c==null)return{};const d=De(h),m={x:i,y:o},u=ee(r),f=te(u),v=await s.getDimensions(c),w=u==="y",y=w?"top":"left",b=w?"bottom":"right",x=w?"clientHeight":"clientWidth",A=n.reference[f]+n.reference[u]-m[u]-n.floating[f],L=m[u]-n.reference[u],k=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c));let P=k?k[x]:0;(!P||!await(s.isElement==null?void 0:s.isElement(k)))&&(P=a.floating[x]||n.floating[f]);const U=A/2-L/2,H=P/2-v[f]/2-1,M=tt(d[y],H),X=tt(d[b],H),B=M,G=P-v[f]-X,S=P/2-v[f]/2+U,lt=Wt(B,S,G),q=!l.arrow&&gt(r)!=null&&S!==lt&&n.reference[f]/2-(S<B?M:X)-v[f]/2<0,D=q?S<B?S-B:S-G:0;return{[u]:m[u]+D,data:{[u]:lt,centerOffset:S-lt-D,...q&&{alignmentOffset:D}},reset:q}}}),Zi=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var i,o;const{placement:r,middlewareData:n,rects:s,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:h=!0,crossAxis:d=!0,fallbackPlacements:m,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:f="none",flipAlignment:v=!0,...w}=ft(t,e);if((i=n.arrow)!=null&&i.alignmentOffset)return{};const y=et(r),b=rt(a),x=et(a)===a,A=await(l.isRTL==null?void 0:l.isRTL(c.floating)),L=m||(x||!v?[zt(a)]:Fi(a)),k=f!=="none";!m&&k&&L.push(...Ni(a,v,f,A));const P=[a,...L],U=await ie(e,w),H=[];let M=((o=n.flip)==null?void 0:o.overflows)||[];if(h&&H.push(U[y]),d){const S=Vi(r,s,A);H.push(U[S[0]],U[S[1]])}if(M=[...M,{placement:r,overflows:H}],!H.every(S=>S<=0)){var X,B;const S=(((X=n.flip)==null?void 0:X.index)||0)+1,lt=P[S];if(lt)return{data:{index:S,overflows:M},reset:{placement:lt}};let q=(B=M.filter(D=>D.overflows[0]<=0).sort((D,J)=>D.overflows[1]-J.overflows[1])[0])==null?void 0:B.placement;if(!q)switch(u){case"bestFit":{var G;const D=(G=M.filter(J=>{if(k){const Q=rt(J.placement);return Q===b||Q==="y"}return!0}).map(J=>[J.placement,J.overflows.filter(Q=>Q>0).reduce((Q,Je)=>Q+Je,0)]).sort((J,Q)=>J[1]-Q[1])[0])==null?void 0:G[0];D&&(q=D);break}case"initialPlacement":q=a;break}if(r!==q)return{reset:{placement:q}}}return{}}}};async function Yi(t,e){const{placement:i,platform:o,elements:r}=t,n=await(o.isRTL==null?void 0:o.isRTL(r.floating)),s=et(i),a=gt(i),l=rt(i)==="y",c=["left","top"].includes(s)?-1:1,h=n&&l?-1:1,d=ft(e,t);let{mainAxis:m,crossAxis:u,alignmentAxis:f}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return a&&typeof f=="number"&&(u=a==="end"?f*-1:f),l?{x:u*h,y:m*c}:{x:m*c,y:u*h}}const Ki=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var i,o;const{x:r,y:n,placement:s,middlewareData:a}=e,l=await Yi(e,t);return s===((i=a.offset)==null?void 0:i.placement)&&(o=a.arrow)!=null&&o.alignmentOffset?{}:{x:r+l.x,y:n+l.y,data:{...l,placement:s}}}}},Xi=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:i,y:o,placement:r}=e,{mainAxis:n=!0,crossAxis:s=!1,limiter:a={fn:w=>{let{x:y,y:b}=w;return{x:y,y:b}}},...l}=ft(t,e),c={x:i,y:o},h=await ie(e,l),d=rt(et(r)),m=Be(d);let u=c[m],f=c[d];if(n){const w=m==="y"?"top":"left",y=m==="y"?"bottom":"right",b=u+h[w],x=u-h[y];u=Wt(b,u,x)}if(s){const w=d==="y"?"top":"left",y=d==="y"?"bottom":"right",b=f+h[w],x=f-h[y];f=Wt(b,f,x)}const v=a.fn({...e,[m]:u,[d]:f});return{...v,data:{x:v.x-i,y:v.y-o,enabled:{[m]:n,[d]:s}}}}}},Gi=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var i,o;const{placement:r,rects:n,platform:s,elements:a}=e,{apply:l=()=>{},...c}=ft(t,e),h=await ie(e,c),d=et(r),m=gt(r),u=rt(r)==="y",{width:f,height:v}=n.floating;let w,y;d==="top"||d==="bottom"?(w=d,y=m===(await(s.isRTL==null?void 0:s.isRTL(a.floating))?"start":"end")?"left":"right"):(y=d,w=m==="end"?"top":"bottom");const b=v-h.top-h.bottom,x=f-h.left-h.right,A=tt(v-h[w],b),L=tt(f-h[y],x),k=!e.middlewareData.shift;let P=A,U=L;if((i=e.middlewareData.shift)!=null&&i.enabled.x&&(U=x),(o=e.middlewareData.shift)!=null&&o.enabled.y&&(P=b),k&&!m){const M=$(h.left,0),X=$(h.right,0),B=$(h.top,0),G=$(h.bottom,0);u?U=f-2*(M!==0||X!==0?M+X:$(h.left,h.right)):P=v-2*(B!==0||G!==0?B+G:$(h.top,h.bottom))}await l({...e,availableWidth:U,availableHeight:P});const H=await s.getDimensions(a.floating);return f!==H.width||v!==H.height?{reset:{rects:!0}}:{}}}};function kt(){return typeof window<"u"}function mt(t){return Ie(t)?(t.nodeName||"").toLowerCase():"#document"}function O(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function W(t){var e;return(e=(Ie(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Ie(t){return kt()?t instanceof Node||t instanceof O(t).Node:!1}function R(t){return kt()?t instanceof Element||t instanceof O(t).Element:!1}function V(t){return kt()?t instanceof HTMLElement||t instanceof O(t).HTMLElement:!1}function pe(t){return!kt()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof O(t).ShadowRoot}function xt(t){const{overflow:e,overflowX:i,overflowY:o,display:r}=T(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+i)&&!["inline","contents"].includes(r)}function Ji(t){return["table","td","th"].includes(mt(t))}function Mt(t){return[":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch{return!1}})}function Rt(t){const e=oe(),i=R(t)?T(t):t;return["transform","translate","scale","rotate","perspective"].some(o=>i[o]?i[o]!=="none":!1)||(i.containerType?i.containerType!=="normal":!1)||!e&&(i.backdropFilter?i.backdropFilter!=="none":!1)||!e&&(i.filter?i.filter!=="none":!1)||["transform","translate","scale","rotate","perspective","filter"].some(o=>(i.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(i.contain||"").includes(o))}function Qi(t){let e=it(t);for(;V(e)&&!ut(e);){if(Rt(e))return e;if(Mt(e))return null;e=it(e)}return null}function oe(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function ut(t){return["html","body","#document"].includes(mt(t))}function T(t){return O(t).getComputedStyle(t)}function Tt(t){return R(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function it(t){if(mt(t)==="html")return t;const e=t.assignedSlot||t.parentNode||pe(t)&&t.host||W(t);return pe(e)?e.host:e}function Ve(t){const e=it(t);return ut(e)?t.ownerDocument?t.ownerDocument.body:t.body:V(e)&&xt(e)?e:Ve(e)}function yt(t,e,i){var o;e===void 0&&(e=[]),i===void 0&&(i=!0);const r=Ve(t),n=r===((o=t.ownerDocument)==null?void 0:o.body),s=O(r);if(n){const a=qt(s);return e.concat(s,s.visualViewport||[],xt(r)?r:[],a&&i?yt(a):[])}return e.concat(r,yt(r,[],i))}function qt(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Fe(t){const e=T(t);let i=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const r=V(t),n=r?t.offsetWidth:i,s=r?t.offsetHeight:o,a=St(i)!==n||St(o)!==s;return a&&(i=n,o=s),{width:i,height:o,$:a}}function re(t){return R(t)?t:t.contextElement}function ht(t){const e=re(t);if(!V(e))return I(1);const i=e.getBoundingClientRect(),{width:o,height:r,$:n}=Fe(e);let s=(n?St(i.width):i.width)/o,a=(n?St(i.height):i.height)/r;return(!s||!Number.isFinite(s))&&(s=1),(!a||!Number.isFinite(a))&&(a=1),{x:s,y:a}}const to=I(0);function je(t){const e=O(t);return!oe()||!e.visualViewport?to:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function eo(t,e,i){return e===void 0&&(e=!1),!i||e&&i!==O(t)?!1:e}function nt(t,e,i,o){e===void 0&&(e=!1),i===void 0&&(i=!1);const r=t.getBoundingClientRect(),n=re(t);let s=I(1);e&&(o?R(o)&&(s=ht(o)):s=ht(t));const a=eo(n,i,o)?je(n):I(0);let l=(r.left+a.x)/s.x,c=(r.top+a.y)/s.y,h=r.width/s.x,d=r.height/s.y;if(n){const m=O(n),u=o&&R(o)?O(o):o;let f=m,v=qt(f);for(;v&&o&&u!==f;){const w=ht(v),y=v.getBoundingClientRect(),b=T(v),x=y.left+(v.clientLeft+parseFloat(b.paddingLeft))*w.x,A=y.top+(v.clientTop+parseFloat(b.paddingTop))*w.y;l*=w.x,c*=w.y,h*=w.x,d*=w.y,l+=x,c+=A,f=O(v),v=qt(f)}}return $t({width:h,height:d,x:l,y:c})}function ne(t,e){const i=Tt(t).scrollLeft;return e?e.left+i:nt(W(t)).left+i}function Ne(t,e,i){i===void 0&&(i=!1);const o=t.getBoundingClientRect(),r=o.left+e.scrollLeft-(i?0:ne(t,o)),n=o.top+e.scrollTop;return{x:r,y:n}}function io(t){let{elements:e,rect:i,offsetParent:o,strategy:r}=t;const n=r==="fixed",s=W(o),a=e?Mt(e.floating):!1;if(o===s||a&&n)return i;let l={scrollLeft:0,scrollTop:0},c=I(1);const h=I(0),d=V(o);if((d||!d&&!n)&&((mt(o)!=="body"||xt(s))&&(l=Tt(o)),V(o))){const u=nt(o);c=ht(o),h.x=u.x+o.clientLeft,h.y=u.y+o.clientTop}const m=s&&!d&&!n?Ne(s,l,!0):I(0);return{width:i.width*c.x,height:i.height*c.y,x:i.x*c.x-l.scrollLeft*c.x+h.x+m.x,y:i.y*c.y-l.scrollTop*c.y+h.y+m.y}}function oo(t){return Array.from(t.getClientRects())}function ro(t){const e=W(t),i=Tt(t),o=t.ownerDocument.body,r=$(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),n=$(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let s=-i.scrollLeft+ne(t);const a=-i.scrollTop;return T(o).direction==="rtl"&&(s+=$(e.clientWidth,o.clientWidth)-r),{width:r,height:n,x:s,y:a}}function no(t,e){const i=O(t),o=W(t),r=i.visualViewport;let n=o.clientWidth,s=o.clientHeight,a=0,l=0;if(r){n=r.width,s=r.height;const c=oe();(!c||c&&e==="fixed")&&(a=r.offsetLeft,l=r.offsetTop)}return{width:n,height:s,x:a,y:l}}function so(t,e){const i=nt(t,!0,e==="fixed"),o=i.top+t.clientTop,r=i.left+t.clientLeft,n=V(t)?ht(t):I(1),s=t.clientWidth*n.x,a=t.clientHeight*n.y,l=r*n.x,c=o*n.y;return{width:s,height:a,x:l,y:c}}function fe(t,e,i){let o;if(e==="viewport")o=no(t,i);else if(e==="document")o=ro(W(t));else if(R(e))o=so(e,i);else{const r=je(t);o={x:e.x-r.x,y:e.y-r.y,width:e.width,height:e.height}}return $t(o)}function We(t,e){const i=it(t);return i===e||!R(i)||ut(i)?!1:T(i).position==="fixed"||We(i,e)}function ao(t,e){const i=e.get(t);if(i)return i;let o=yt(t,[],!1).filter(a=>R(a)&&mt(a)!=="body"),r=null;const n=T(t).position==="fixed";let s=n?it(t):t;for(;R(s)&&!ut(s);){const a=T(s),l=Rt(s);!l&&a.position==="fixed"&&(r=null),(n?!l&&!r:!l&&a.position==="static"&&!!r&&["absolute","fixed"].includes(r.position)||xt(s)&&!l&&We(t,s))?o=o.filter(h=>h!==s):r=a,s=it(s)}return e.set(t,o),o}function lo(t){let{element:e,boundary:i,rootBoundary:o,strategy:r}=t;const s=[...i==="clippingAncestors"?Mt(e)?[]:ao(e,this._c):[].concat(i),o],a=s[0],l=s.reduce((c,h)=>{const d=fe(e,h,r);return c.top=$(d.top,c.top),c.right=tt(d.right,c.right),c.bottom=tt(d.bottom,c.bottom),c.left=$(d.left,c.left),c},fe(e,a,r));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function co(t){const{width:e,height:i}=Fe(t);return{width:e,height:i}}function ho(t,e,i){const o=V(e),r=W(e),n=i==="fixed",s=nt(t,!0,n,e);let a={scrollLeft:0,scrollTop:0};const l=I(0);if(o||!o&&!n)if((mt(e)!=="body"||xt(r))&&(a=Tt(e)),o){const m=nt(e,!0,n,e);l.x=m.x+e.clientLeft,l.y=m.y+e.clientTop}else r&&(l.x=ne(r));const c=r&&!o&&!n?Ne(r,a):I(0),h=s.left+a.scrollLeft-l.x-c.x,d=s.top+a.scrollTop-l.y-c.y;return{x:h,y:d,width:s.width,height:s.height}}function It(t){return T(t).position==="static"}function ge(t,e){if(!V(t)||T(t).position==="fixed")return null;if(e)return e(t);let i=t.offsetParent;return W(t)===i&&(i=i.ownerDocument.body),i}function Ue(t,e){const i=O(t);if(Mt(t))return i;if(!V(t)){let r=it(t);for(;r&&!ut(r);){if(R(r)&&!It(r))return r;r=it(r)}return i}let o=ge(t,e);for(;o&&Ji(o)&&It(o);)o=ge(o,e);return o&&ut(o)&&It(o)&&!Rt(o)?i:o||Qi(t)||i}const uo=async function(t){const e=this.getOffsetParent||Ue,i=this.getDimensions,o=await i(t.floating);return{reference:ho(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function po(t){return T(t).direction==="rtl"}const Et={convertOffsetParentRelativeRectToViewportRelativeRect:io,getDocumentElement:W,getClippingRect:lo,getOffsetParent:Ue,getElementRects:uo,getClientRects:oo,getDimensions:co,getScale:ht,isElement:R,isRTL:po};function qe(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function fo(t,e){let i=null,o;const r=W(t);function n(){var a;clearTimeout(o),(a=i)==null||a.disconnect(),i=null}function s(a,l){a===void 0&&(a=!1),l===void 0&&(l=1),n();const c=t.getBoundingClientRect(),{left:h,top:d,width:m,height:u}=c;if(a||e(),!m||!u)return;const f=At(d),v=At(r.clientWidth-(h+m)),w=At(r.clientHeight-(d+u)),y=At(h),x={rootMargin:-f+"px "+-v+"px "+-w+"px "+-y+"px",threshold:$(0,tt(1,l))||1};let A=!0;function L(k){const P=k[0].intersectionRatio;if(P!==l){if(!A)return s();P?s(!1,P):o=setTimeout(()=>{s(!1,1e-7)},1e3)}P===1&&!qe(c,t.getBoundingClientRect())&&s(),A=!1}try{i=new IntersectionObserver(L,{...x,root:r.ownerDocument})}catch{i=new IntersectionObserver(L,x)}i.observe(t)}return s(!0),n}function go(t,e,i,o){o===void 0&&(o={});const{ancestorScroll:r=!0,ancestorResize:n=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=!1}=o,c=re(t),h=r||n?[...c?yt(c):[],...yt(e)]:[];h.forEach(y=>{r&&y.addEventListener("scroll",i,{passive:!0}),n&&y.addEventListener("resize",i)});const d=c&&a?fo(c,i):null;let m=-1,u=null;s&&(u=new ResizeObserver(y=>{let[b]=y;b&&b.target===c&&u&&(u.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var x;(x=u)==null||x.observe(e)})),i()}),c&&!l&&u.observe(c),u.observe(e));let f,v=l?nt(t):null;l&&w();function w(){const y=nt(t);v&&!qe(v,y)&&i(),v=y,f=requestAnimationFrame(w)}return i(),()=>{var y;h.forEach(b=>{r&&b.removeEventListener("scroll",i),n&&b.removeEventListener("resize",i)}),d==null||d(),(y=u)==null||y.disconnect(),u=null,l&&cancelAnimationFrame(f)}}const mo=Ki,vo=Xi,yo=Zi,me=Gi,wo=qi,bo=(t,e,i)=>{const o=new Map,r={platform:Et,...i},n={...r.platform,_c:o};return Ui(t,e,{...r,platform:n})};function xo(t){return Co(t)}function Vt(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Co(t){for(let e=t;e;e=Vt(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Vt(t);e;e=Vt(e)){if(!(e instanceof Element))continue;const i=getComputedStyle(e);if(i.display!=="contents"&&(i.position!=="static"||Rt(i)||e.tagName==="BODY"))return e}return null}function Lo(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var C=class extends Y{constructor(){super(...arguments),this.localize=new He(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom");let o=0,r=0,n=0,s=0,a=0,l=0,c=0,h=0;i?t.top<e.top?(o=t.left,r=t.bottom,n=t.right,s=t.bottom,a=e.left,l=e.top,c=e.right,h=e.top):(o=e.left,r=e.bottom,n=e.right,s=e.bottom,a=t.left,l=t.top,c=t.right,h=t.top):t.left<e.left?(o=t.right,r=t.top,n=e.left,s=e.top,a=t.right,l=t.bottom,c=e.left,h=e.bottom):(o=e.right,r=e.top,n=t.left,s=t.top,a=e.right,l=e.bottom,c=t.left,h=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${n}px`),this.style.setProperty("--hover-bridge-top-right-y",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||Lo(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=go(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[mo({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(me({apply:({rects:i})=>{const o=this.sync==="width"||this.sync==="both",r=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${i.reference.width}px`:"",this.popup.style.height=r?`${i.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(yo({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(vo({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(me({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(wo({element:this.arrowEl,padding:this.arrowPadding}));const e=this.strategy==="absolute"?i=>Et.getOffsetParent(i,xo):Et.getOffsetParent;bo(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:Xt(bt({},Et),{getOffsetParent:e})}).then(({x:i,y:o,middlewareData:r,placement:n})=>{const s=this.localize.dir()==="rtl",a={top:"bottom",right:"left",bottom:"top",left:"right"}[n.split("-")[0]];if(this.setAttribute("data-current-placement",n),Object.assign(this.popup.style,{left:`${i}px`,top:`${o}px`}),this.arrow){const l=r.arrow.x,c=r.arrow.y;let h="",d="",m="",u="";if(this.arrowPlacement==="start"){const f=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",d=s?f:"",u=s?"":f}else if(this.arrowPlacement==="end"){const f=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";d=s?"":f,u=s?f:"",m=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(u=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",h=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(u=typeof l=="number"?`${l}px`:"",h=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:h,right:d,bottom:m,left:u,[a]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return _`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${dt({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${dt({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?_`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};C.styles=[wt,Ti];p([at(".popup")],C.prototype,"popup",2);p([at(".popup__arrow")],C.prototype,"arrowEl",2);p([g()],C.prototype,"anchor",2);p([g({type:Boolean,reflect:!0})],C.prototype,"active",2);p([g({reflect:!0})],C.prototype,"placement",2);p([g({reflect:!0})],C.prototype,"strategy",2);p([g({type:Number})],C.prototype,"distance",2);p([g({type:Number})],C.prototype,"skidding",2);p([g({type:Boolean})],C.prototype,"arrow",2);p([g({attribute:"arrow-placement"})],C.prototype,"arrowPlacement",2);p([g({attribute:"arrow-padding",type:Number})],C.prototype,"arrowPadding",2);p([g({type:Boolean})],C.prototype,"flip",2);p([g({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],C.prototype,"flipFallbackPlacements",2);p([g({attribute:"flip-fallback-strategy"})],C.prototype,"flipFallbackStrategy",2);p([g({type:Object})],C.prototype,"flipBoundary",2);p([g({attribute:"flip-padding",type:Number})],C.prototype,"flipPadding",2);p([g({type:Boolean})],C.prototype,"shift",2);p([g({type:Object})],C.prototype,"shiftBoundary",2);p([g({attribute:"shift-padding",type:Number})],C.prototype,"shiftPadding",2);p([g({attribute:"auto-size"})],C.prototype,"autoSize",2);p([g()],C.prototype,"sync",2);p([g({type:Object})],C.prototype,"autoSizeBoundary",2);p([g({attribute:"auto-size-padding",type:Number})],C.prototype,"autoSizePadding",2);p([g({attribute:"hover-bridge",type:Boolean})],C.prototype,"hoverBridge",2);var Ze=new Map,Ao=new WeakMap;function _o(t){return t??{keyframes:[],options:{duration:0}}}function ve(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Ye(t,e){Ze.set(t,_o(e))}function ye(t,e,i){const o=Ao.get(t);if(o!=null&&o[e])return ve(o[e],i.dir);const r=Ze.get(e);return r?ve(r,i.dir):{keyframes:[],options:{duration:0}}}function we(t,e){return new Promise(i=>{function o(r){r.target===t&&(t.removeEventListener(e,o),i())}t.addEventListener(e,o)})}function be(t,e,i){return new Promise(o=>{if((i==null?void 0:i.duration)===1/0)throw new Error("Promise-based animations must be finite.");const r=t.animate(e,Xt(bt({},i),{duration:Eo()?0:i.duration}));r.addEventListener("cancel",o,{once:!0}),r.addEventListener("finish",o,{once:!0})})}function xe(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?parseFloat(t)*1e3:parseFloat(t)}function Eo(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Ce(t){return Promise.all(t.getAnimations().map(e=>new Promise(i=>{e.cancel(),requestAnimationFrame(i)})))}function tr(t,e){return t.map(i=>Xt(bt({},i),{height:i.height==="auto"?`${e}px`:i.height}))}var E=class extends Y{constructor(){super(),this.localize=new He(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=xe(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=xe(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await Ce(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:i,options:o}=ye(this,"tooltip.show",{dir:this.localize.dir()});await be(this.popup.popup,i,o),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await Ce(this.body);const{keyframes:i,options:o}=ye(this,"tooltip.hide",{dir:this.localize.dir()});await be(this.popup.popup,i,o),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,we(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,we(this,"sl-after-hide")}render(){return _`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${dt({tooltip:!0,"tooltip--open":this.open})}
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
    `}};E.styles=[wt,Ri];E.dependencies={"sl-popup":C};p([at("slot:not([name])")],E.prototype,"defaultSlot",2);p([at(".tooltip__body")],E.prototype,"body",2);p([at("sl-popup")],E.prototype,"popup",2);p([g()],E.prototype,"content",2);p([g()],E.prototype,"placement",2);p([g({type:Boolean,reflect:!0})],E.prototype,"disabled",2);p([g({type:Number})],E.prototype,"distance",2);p([g({type:Boolean,reflect:!0})],E.prototype,"open",2);p([g({type:Number})],E.prototype,"skidding",2);p([g()],E.prototype,"trigger",2);p([g({type:Boolean})],E.prototype,"hoist",2);p([pt("open",{waitUntilFirstUpdate:!0})],E.prototype,"handleOpenChange",1);p([pt(["content","distance","hoist","placement","skidding"])],E.prototype,"handleOptionsChange",1);p([pt("disabled")],E.prototype,"handleDisabledChange",1);Ye("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});Ye("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});E.define("sl-tooltip");var Ct=function(t,e,i,o){var r=arguments.length,n=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,i,n):s(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};let st=class extends Zt{constructor(){super(...arguments),this.tooltip=!1}get _iconSize(){return this.iconSize?this.iconSize:this.tooltip!==!1?"32px":"64px"}renderIcon(){return _`
			<sl-icon
				style="color: red; height: ${this._iconSize}; width: ${this._iconSize}; margin-bottom: 8px;"
				src="${li(hi)}"
			></sl-icon>
		`}renderFull(){return _` <div class="column center-content" style="flex: 1">
			${this.renderIcon()}
			<div style="width: 500px; text-align: center" class="column">
				${this.headline?_` <span style="margin-bottom: 8px">${this.headline} </span>`:_``}
				<span class="placeholder"
					>${typeof this.error=="object"&&"message"in this.error?this.error.message:this.error}
				</span>
			</div>
		</div>`}renderTooltip(){return _`
			<sl-tooltip hoist .content=${this.headline?this.headline:this.error}>
				${this.renderIcon()}</sl-tooltip
			>
		`}render(){return this.tooltip!==!1?this.renderTooltip():this.renderFull()}};st.styles=[_e,Z`
			:host {
				display: flex;
			}
		`];Ct([g({attribute:"tooltip"})],st.prototype,"tooltip",void 0);Ct([g()],st.prototype,"headline",void 0);Ct([g()],st.prototype,"error",void 0);Ct([g({attribute:"icon-size"})],st.prototype,"iconSize",void 0);st=Ct([Ee("display-error")],st);let Ot=[0],Pt=0;function Po(t){t[0]===132&&t[1]===32&&t[2]===36?Ot=t.slice(3):Ot=t||[],Pt=0}function z(){return(()=>{const e=Ot[Pt];return Pt=(Pt+1)%Ot.length,e})()/256}function Ke(t){const e=Math.floor(z()*360),i=z()*60+40,o=t||(z()*100+(z()+z()+z()+z())*25)/2;return{h:e,s:i,l:o}}function Xe({h:t,s:e,l:i}){return`hsl(${t}, ${e}%, ${i}%)`}function So(t,e,i){const o=z()*2*Math.PI,r=e*Math.cos(o),n=e*Math.sin(o),s=i.x+r,a=i.x+n,l=o+2*Math.PI*.3,c=e*Math.cos(l),h=e*Math.sin(l),d=i.x+c,m=i.x+h,u=l+2*Math.PI*.3,f=e*Math.cos(u),v=e*Math.sin(u),w=i.x+f,y=i.x+v;t.beginPath(),t.moveTo(s,a),t.lineTo(d,m),t.lineTo(w,y),t.fill()}function zo(t){const e=t.hash||[0];return Po(e),{backgroundColor:t.backgroundColor||Xe(Ke()),hash:e,size:t.size||32}}function $o(t,e){if(t.hash&&!(t.hash instanceof Uint8Array))throw new Error("invalid type for opts.hash, expecting Uint8Array or null");t=zo(t||{});const{size:i,backgroundColor:o}=t;e.width=e.height=i;const r=e.getContext("2d");if(!r)return;r.fillStyle=o,r.fillRect(0,0,e.width,e.height);const n=z()<.5?3:4,s=Array.apply(null,Array(n)).map((a,l)=>{const c=l===0?5+z()*25:l===1?70+z()*25:null;return{x:z()*i,y:z()*i,radius:5+z()*i*.25,type:Math.floor(z()*3),color:Xe(Ke(c))}}).sort((a,l)=>a.radius>l.radius?-1:1);for(let a=0;a<n;a++){const l=s[a],{x:c,y:h,radius:d,type:m,color:u}=l;switch(r.fillStyle=u,m){case 0:r.beginPath(),r.arc(c,h,d,0,2*Math.PI),r.fill();break;case 1:r.fillRect(c,h,d*2,d*2);break;case 2:So(r,d*2,{x:c});break;default:throw new Error("shape is greater than 2, this should never happen")}}return e}var K=function(t,e,i,o){var r=arguments.length,n=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,i,n):s(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};const Oo=new ti(t=>new ei(e=>{const i=document.createElement("canvas");return $o({hash:t,size:e},i),i}));let F=class extends Zt{constructor(){super(...arguments),this.size=32,this.shape="circle",this.disableTooltip=!1,this.disableCopy=!1,this.justCopiedHash=!1}async copyHash(){this.disableCopy||(await navigator.clipboard.writeText(this.strHash),this.timeout&&clearTimeout(this.timeout),this.justCopiedHash=!0,this._tooltip.show(),this.timeout=setTimeout(()=>{this._tooltip.hide(),setTimeout(()=>{this.justCopiedHash=!1},100)},2e3))}get strHash(){return Le(this.hash)}updated(e){var i,o;if(super.updated(e),e.has("hash")&&e.get("hash")!==void 0&&((i=e.get("hash"))==null?void 0:i.toString())!==((o=this.hash)==null?void 0:o.toString())||e.has("size")){const r=e.get("hash")!==void 0?e.get("hash"):this.hash,n=Oo.get(r).get(this.size);this._canvas.width=n.width,this._canvas.height=n.height,this._canvas.getContext("2d").drawImage(n,0,0)}}renderCanvas(){return _` <canvas
			id="canvas"
			width="1"
			height="1"
			class=${dt({square:this.shape==="square",circle:this.shape==="circle"})}
		></canvas>`}render(){return _`<div
			@click=${()=>this.copyHash()}
			style="${this.disableCopy?"":"cursor: pointer;"} flex-grow: 0"
		>
			<sl-tooltip
				id="tooltip"
				placement="top"
				.content=${this.justCopiedHash?ii("Copied!"):`${this.strHash.substring(0,6)}...`}
				.trigger=${this.disableTooltip||this.justCopiedHash?"manual":"hover focus"}
				hoist
			>
				${this.renderCanvas()}
			</sl-tooltip>
		</div>`}static get styles(){return Z`
			:host {
				display: flex;
			}

			.square {
				border-radius: 0%;
			}
			.circle {
				border-radius: 50%;
			}
		`}};K([g(ai("hash"))],F.prototype,"hash",void 0);K([g({type:Number})],F.prototype,"size",void 0);K([g({type:String})],F.prototype,"shape",void 0);K([g({type:Boolean,attribute:"disable-tooltip"})],F.prototype,"disableTooltip",void 0);K([g({type:Boolean,attribute:"disable-copy"})],F.prototype,"disableCopy",void 0);K([at("#canvas")],F.prototype,"_canvas",void 0);K([at("#tooltip")],F.prototype,"_tooltip",void 0);K([Yt()],F.prototype,"justCopiedHash",void 0);F=K([si(),Ee("holo-identicon")],F);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ge="important",ko=" !"+Ge,or=Se(class extends ze{constructor(t){var e;if(super(t),t.type!==Pe.ATTRIBUTE||t.name!=="style"||((e=t.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const o=t[i];return o==null?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(t,[e]){const{style:i}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const o of this.ft)e[o]==null&&(this.ft.delete(o),o.includes("-")?i.removeProperty(o):i[o]=null);for(const o in e){const r=e[o];if(r!=null){this.ft.add(o);const n=typeof r=="string"&&r.endsWith(ko);o.includes("-")||n?i.setProperty(o,n?r.slice(0,-11):r,n?Ge:""):i[o]=r}}return Ae}}),rr=[..._e,Z`
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
	`];export{or as A,Fo as B,Zo as C,jo as D,Se as E,ze as F,Bo as G,Ko as H,hi as I,Go as J,Pe as K,He as L,Xt as M,bt as N,Jo as O,Y as S,p as _,li as a,rr as b,wt as c,C as d,dt as e,at as f,we as g,Ce as h,ye as i,be as j,j as k,si as l,Uo as m,ai as n,No as o,Yo as p,tr as q,Yt as r,Ye as s,Wo as t,Xo as u,qo as v,pt as w,Vo as x,Io as y,Do as z};
