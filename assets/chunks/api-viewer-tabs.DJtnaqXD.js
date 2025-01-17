import{u as _t,i as At}from"./reactive-element.CHpx6ykd.js";import{_ as N}from"./tslib.es6.kHcLnhpD.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var U;const P=window,b=P.trustedTypes,V=b?b.createPolicy("lit-html",{createHTML:s=>s}):void 0,I="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,j="?"+$,gt=`<${j}>`,A=document,C=()=>A.createComment(""),E=s=>s===null||typeof s!="object"&&typeof s!="function",tt=Array.isArray,et=s=>tt(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",B=`[ 	
\f\r]`,w=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,q=/-->/g,F=/>/g,m=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,Z=/"/g,st=/^(?:script|style|textarea|title)$/i,bt=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),yt=bt(1),f=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Y=new WeakMap,_=A.createTreeWalker(A,129,null,!1);function it(s,t){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return V!==void 0?V.createHTML(t):t}const nt=(s,t)=>{const e=s.length-1,i=[];let n,o=t===2?"<svg>":"",r=w;for(let a=0;a<e;a++){const l=s[a];let d,c,h=-1,p=0;for(;p<l.length&&(r.lastIndex=p,c=r.exec(l),c!==null);)p=r.lastIndex,r===w?c[1]==="!--"?r=q:c[1]!==void 0?r=F:c[2]!==void 0?(st.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=m):c[3]!==void 0&&(r=m):r===m?c[0]===">"?(r=n??w,h=-1):c[1]===void 0?h=-2:(h=r.lastIndex-c[2].length,d=c[1],r=c[3]===void 0?m:c[3]==='"'?Z:W):r===Z||r===W?r=m:r===q||r===F?r=w:(r=m,n=void 0);const v=r===m&&s[a+1].startsWith("/>")?" ":"";o+=r===w?l+gt:h>=0?(i.push(d),l.slice(0,h)+I+l.slice(h)+$+v):l+$+(h===-2?(i.push(void 0),a):v)}return[it(s,o+(s[e]||"<?>")+(t===2?"</svg>":"")),i]};class k{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,r=0;const a=t.length-1,l=this.parts,[d,c]=nt(t,e);if(this.el=k.createElement(d,i),_.currentNode=this.el.content,e===2){const h=this.el.content,p=h.firstChild;p.remove(),h.append(...p.childNodes)}for(;(n=_.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes()){const h=[];for(const p of n.getAttributeNames())if(p.endsWith(I)||p.startsWith($)){const v=c[r++];if(h.push(p),v!==void 0){const mt=n.getAttribute(v.toLowerCase()+I).split($),H=/([.?@])?(.*)/.exec(v);l.push({type:1,index:o,name:H[2],strings:mt,ctor:H[1]==="."?rt:H[1]==="?"?lt:H[1]==="@"?at:T})}else l.push({type:6,index:o})}for(const p of h)n.removeAttribute(p)}if(st.test(n.tagName)){const h=n.textContent.split($),p=h.length-1;if(p>0){n.textContent=b?b.emptyScript:"";for(let v=0;v<p;v++)n.append(h[v],C()),_.nextNode(),l.push({type:2,index:++o});n.append(h[p],C())}}}else if(n.nodeType===8)if(n.data===j)l.push({type:2,index:o});else{let h=-1;for(;(h=n.data.indexOf($,h+1))!==-1;)l.push({type:7,index:o}),h+=$.length-1}o++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function g(s,t,e=s,i){var n,o,r,a;if(t===f)return t;let l=i!==void 0?(n=e._$Co)===null||n===void 0?void 0:n[i]:e._$Cl;const d=E(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==d&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),d===void 0?l=void 0:(l=new d(s),l._$AT(s,e,i)),i!==void 0?((r=(a=e)._$Co)!==null&&r!==void 0?r:a._$Co=[])[i]=l:e._$Cl=l),l!==void 0&&(t=g(s,l._$AS(s,t.values),l,i)),t}class ot{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:n}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:A).importNode(i,!0);_.currentNode=o;let r=_.nextNode(),a=0,l=0,d=n[0];for(;d!==void 0;){if(a===d.index){let c;d.type===2?c=new y(r,r.nextSibling,this,t):d.type===1?c=new d.ctor(r,d.name,d.strings,this,t):d.type===6&&(c=new ct(r,this,t)),this._$AV.push(c),d=n[++l]}a!==(d==null?void 0:d.index)&&(r=_.nextNode(),a++)}return _.currentNode=A,o}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class y{constructor(t,e,i,n){var o;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cp=(o=n==null?void 0:n.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=g(this,t,e),E(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==f&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):et(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&E(this._$AH)?this._$AA.nextSibling.data=t:this.$(A.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:n}=t,o=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=k.createElement(it(n.h,n.h[0]),this.options)),n);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(i);else{const r=new ot(o,this),a=r.u(this.options);r.v(i),this.$(a),this._$AH=r}}_$AC(t){let e=Y.get(t.strings);return e===void 0&&Y.set(t.strings,e=new k(t)),e}T(t){tt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new y(this.k(C()),this.k(C()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class T{constructor(t,e,i,n,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){const o=this.strings;let r=!1;if(o===void 0)t=g(this,t,e,0),r=!E(t)||t!==this._$AH&&t!==f,r&&(this._$AH=t);else{const a=t;let l,d;for(t=o[0],l=0;l<o.length-1;l++)d=g(this,a[i+l],e,l),d===f&&(d=this._$AH[l]),r||(r=!E(d)||d!==this._$AH[l]),d===u?t=u:t!==u&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}r&&!n&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}const wt=b?b.emptyScript:"";class lt extends T{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,wt):this.element.removeAttribute(this.name)}}class at extends T{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=g(this,t,e,0))!==null&&i!==void 0?i:u)===f)return;const n=this._$AH,o=t===u&&n!==u||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==u&&(n===u||o);o&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class ct{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){g(this,t)}}const xt={O:I,P:$,A:j,C:1,M:nt,L:ot,R:et,D:g,I:y,V:T,H:lt,N:at,U:rt,F:ct},K=P.litHtmlPolyfillSupport;K==null||K(k,y),((U=P.litHtmlVersions)!==null&&U!==void 0?U:P.litHtmlVersions=[]).push("2.8.0");const Ct=(s,t,e)=>{var i,n;const o=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t;let r=o._$litPart$;if(r===void 0){const a=(n=e==null?void 0:e.renderBefore)!==null&&n!==void 0?n:null;o._$litPart$=r=new y(t.insertBefore(C(),a),a,void 0,e??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var D,R;let S=class extends _t{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ct(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return f}};S.finalized=!0,S._$litElement$=!0,(D=globalThis.litElementHydrateSupport)===null||D===void 0||D.call(globalThis,{LitElement:S});const G=globalThis.litElementPolyfillSupport;G==null||G({LitElement:S});((R=globalThis.litElementVersions)!==null&&R!==void 0?R:globalThis.litElementVersions=[]).push("3.3.3");const Jt=At`
  :host {
    display: block;
    text-align: left;
    box-sizing: border-box;
    max-width: 800px;
    min-width: 360px;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, sans-serif;
    border: 1px solid var(--ave-border-color);
    border-radius: var(--ave-border-radius);

    --ave-primary-color: #01579b;
    --ave-secondary-color: rgba(0, 0, 0, 0.54);
    --ave-accent-color: #d63200;
    --ave-border-color: rgba(0, 0, 0, 0.12);
    --ave-border-radius: 4px;
    --ave-header-color: #fff;
    --ave-item-color: rgba(0, 0, 0, 0.87);
    --ave-label-color: #424242;
    --ave-link-color: #01579b;
    --ave-link-hover-color: #d63200;
    --ave-tab-indicator-size: 2px;
    --ave-tab-color: rgba(0, 0, 0, 0.54);
    --ave-tag-background-color: #e2e3e5;
    --ave-tag-border-color: #d6d8db;
    --ave-tag-color: #383d41;
    --ave-monospace-font: Menlo, 'DejaVu Sans Mono', 'Liberation Mono', Consolas,
      'Courier New', monospace;
  }

  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    background: var(--ave-header-background, var(--ave-primary-color));
    border-top-left-radius: var(--ave-border-radius);
    border-top-right-radius: var(--ave-border-radius);
  }

  nav {
    display: flex;
    align-items: center;
  }

  [part='header-title'] {
    color: var(--ave-header-color);
    font-family: var(--ave-monospace-font);
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  [part='select-label'] {
    margin-left: 0.5rem;
  }

  [part='warning'] {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    header {
      flex-direction: column;
    }

    nav {
      margin-top: 0.5rem;
    }
  }

  @media (prefers-color-scheme: dark) {
    :host {
      background: #fff;
      color: #000;
    }
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Et}=xt,kt=s=>s===null||typeof s!="object"&&typeof s!="function",Xt=(s,t)=>(s==null?void 0:s._$litType$)!==void 0,te=s=>{var t;return((t=s==null?void 0:s._$litType$)===null||t===void 0?void 0:t.h)!=null},Tt=s=>s.strings===void 0,Q=()=>document.createComment(""),ee=(s,t,e)=>{var i;const n=s._$AA.parentNode,o=s._$AB;if(e===void 0){const r=n.insertBefore(Q(),o),a=n.insertBefore(Q(),o);e=new Et(r,a,s,s.options)}else{const r=e._$AB.nextSibling,a=e._$AM,l=a!==s;if(l){let d;(i=e._$AQ)===null||i===void 0||i.call(e,s),e._$AM=s,e._$AP!==void 0&&(d=s._$AU)!==a._$AU&&e._$AP(d)}if(r!==o||l){let d=e._$AA;for(;d!==r;){const c=d.nextSibling;n.insertBefore(d,o),d=c}}}return e},Ht={},se=(s,t=Ht)=>s._$AH=t,ie=s=>s._$AH,ne=s=>{s._$AR()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ht=s=>(...t)=>({_$litDirective$:s,values:t});let ut=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=(s,t)=>{var e,i;const n=s._$AN;if(n===void 0)return!1;for(const o of n)(i=(e=o)._$AO)===null||i===void 0||i.call(e,t,!1),x(o,t);return!0},L=s=>{let t,e;do{if((t=s._$AM)===void 0)break;e=t._$AN,e.delete(s),s=t}while((e==null?void 0:e.size)===0)},pt=s=>{for(let t;t=s._$AM;s=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(s))break;e.add(s),St(t)}};function Nt(s){this._$AN!==void 0?(L(this),this._$AM=s,pt(this)):this._$AM=s}function Mt(s,t=!1,e=0){const i=this._$AH,n=this._$AN;if(n!==void 0&&n.size!==0)if(t)if(Array.isArray(i))for(let o=e;o<i.length;o++)x(i[o],!1),L(i[o]);else i!=null&&(x(i,!1),L(i));else x(this,s)}const St=s=>{var t,e,i,n;s.type==dt.CHILD&&((t=(i=s)._$AP)!==null&&t!==void 0||(i._$AP=Mt),(e=(n=s)._$AQ)!==null&&e!==void 0||(n._$AQ=Nt))};let Pt=class extends ut{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),pt(this),this.isConnected=t._$AU}_$AO(t,e=!0){var i,n;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)===null||i===void 0||i.call(this):(n=this.disconnected)===null||n===void 0||n.call(this)),e&&(x(this,t),L(this))}setValue(t){if(Tt(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class It{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}}let Lt=class{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){var t;(t=this.Y)!==null&&t!==void 0||(this.Y=new Promise(e=>this.Z=e))}resume(){var t;(t=this.Z)===null||t===void 0||t.call(this),this.Y=this.Z=void 0}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=s=>!kt(s)&&typeof s.then=="function",X=1073741823;class Ut extends Pt{constructor(){super(...arguments),this._$C_t=X,this._$Cwt=[],this._$Cq=new It(this),this._$CK=new Lt}render(...t){var e;return(e=t.find(i=>!J(i)))!==null&&e!==void 0?e:f}update(t,e){const i=this._$Cwt;let n=i.length;this._$Cwt=e;const o=this._$Cq,r=this._$CK;this.isConnected||this.disconnected();for(let a=0;a<e.length&&!(a>this._$C_t);a++){const l=e[a];if(!J(l))return this._$C_t=a,l;a<n&&l===i[a]||(this._$C_t=X,n=0,Promise.resolve(l).then(async d=>{for(;r.get();)await r.get();const c=o.deref();if(c!==void 0){const h=c._$Cwt.indexOf(l);h>-1&&h<c._$C_t&&(c._$C_t=h,c.setValue(d))}}))}return f}disconnected(){this._$Cq.disconnect(),this._$CK.pause()}reconnected(){this._$Cq.reconnect(this),this._$CK.resume()}}const ae=ht(Ut);function vt(s){return!!s&&Array.isArray(s.modules)&&s.modules.some(t=>{var e,i;return((e=t.exports)==null?void 0:e.some(n=>n.kind==="custom-element-definition"))||((i=t.declarations)==null?void 0:i.some(n=>n.customElement))})}const Bt=s=>s.kind==="custom-element-definition",Dt=s=>s.customElement,$t=s=>!(s.privacy==="private"||s.privacy==="protected");async function Rt(s){try{const e=await(await fetch(s)).json();if(vt(e))return e;throw new Error(`No element definitions found at ${s}`)}catch(t){return console.error(t),null}}function ce(s,t){const e=(s.modules??[]).flatMap(i=>{var n;return((n=i.exports)==null?void 0:n.filter(Bt))??[]});return t?e.filter(i=>t.includes(i.name)):e}const de=(s,t,e)=>{var l,d;const i=e?t.findIndex(c=>(c==null?void 0:c.name)===e):0,n=t[i];if(!n)return null;const{name:o,module:r}=n.declaration,a=r?(d=(l=s.modules.find(c=>c.path===r.replace(/^\//,"")))==null?void 0:l.declarations)==null?void 0:d.find(c=>c.name===o):s.modules.flatMap(c=>c.declarations).find(c=>(c==null?void 0:c.name)===o);if(!a||!Dt(a))throw new Error(`Could not find declaration for ${e}`);return{customElement:!0,name:n.name,description:a==null?void 0:a.description,slots:a.slots??[],attributes:a.attributes??[],members:a.members??[],events:a.events??[],cssParts:a.cssParts??[],cssProperties:[...a.cssProperties??[]].sort((c,h)=>c.name>h.name?1:-1)}},he=(s=[])=>s.filter(t=>t.kind==="field"&&$t(t)),ue=(s=[])=>s.filter(t=>t.kind==="method"&&$t(t));/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zt=(s,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,s)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,s)}},jt=(s,t,e)=>{t.constructor.createProperty(e,s)};function M(s){return(t,e)=>e!==void 0?jt(s,t,e):zt(s,t)}const pe=yt`
  <div part="warning">No custom elements found in the JSON file.</div>
`,ve=s=>{class t extends s{constructor(){super(...arguments),this.jsonFetched=Promise.resolve(null)}willUpdate(){const{src:i}=this;this.manifest?vt(this.manifest)?(this.lastSrc=void 0,this.jsonFetched=Promise.resolve(this.manifest)):console.error("No custom elements found in the `manifest` object."):i&&this.lastSrc!==i&&(this.lastSrc=i,this.jsonFetched=Rt(i))}}return N([M()],t.prototype,"src",void 0),N([M({attribute:!1})],t.prototype,"manifest",void 0),N([M({reflect:!0,converter:{fromAttribute:e=>e.split(","),toAttribute:e=>e.join(",")}})],t.prototype,"only",void 0),N([M()],t.prototype,"selected",void 0),t},$e=s=>typeof s=="string"&&s.startsWith("'")&&s.endsWith("'")?s.slice(1,s.length-1):s;function O(s,...t){const e=document.createElement("template");return e.innerHTML=t.reduce((i,n,o)=>i+n+s[o+1],s[0]),e}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class z extends ut{constructor(t){if(super(t),this.et=u,t.type!==dt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===u||t==null)return this.ft=void 0,this.et=t;if(t===f)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}z.directiveName="unsafeHTML",z.resultType=1;const fe=ht(z);let Ot=0;const Vt=O`
  <style>
    :host {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      box-sizing: border-box;
      position: relative;
      max-width: 150px;
      overflow: hidden;
      min-height: 3rem;
      padding: 0 1rem;
      color: var(--ave-tab-color);
      font-size: 0.875rem;
      line-height: 1.2;
      font-weight: 500;
      text-transform: uppercase;
      outline: none;
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    :host([hidden]) {
      display: none !important;
    }

    :host::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: var(--ave-tab-indicator-size);
      background-color: var(--ave-primary-color);
      opacity: 0;
    }

    :host([selected]) {
      color: var(--ave-tab-selected-color, var(--ave-primary-color));
    }

    :host([selected])::before {
      opacity: 1;
    }

    :host::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: var(--ave-primary-color);
      opacity: 0;
      transition: opacity 0.1s linear;
    }

    :host(:hover)::after {
      opacity: 0.08;
    }

    :host([focus-ring])::after {
      opacity: 0.12;
    }

    :host([active])::after {
      opacity: 0.16;
    }

    @media (max-width: 600px) {
      :host {
        justify-content: center;
        text-align: center;
      }

      :host::before {
        top: auto;
        right: 0;
        width: 100%;
        height: var(--ave-tab-indicator-size);
      }
    }
  </style>
  <slot></slot>
`;class ft extends HTMLElement{get selected(){return this._selected}set selected(t){this._selected=t,this.setAttribute("aria-selected",String(t)),this.setAttribute("tabindex",t?"0":"-1"),this.toggleAttribute("selected",t)}constructor(){super(),this._mousedown=!1,this._selected=!1,this.attachShadow({mode:"open"}).appendChild(Vt.content.cloneNode(!0)),this.addEventListener("focus",()=>this._setFocused(!0),!0),this.addEventListener("blur",()=>{this._setFocused(!1),this._setActive(!1)},!0),this.addEventListener("mousedown",()=>{this._setActive(this._mousedown=!0);const e=()=>{this._setActive(this._mousedown=!1),document.removeEventListener("mouseup",e)};document.addEventListener("mouseup",e)})}connectedCallback(){this.setAttribute("role","tab"),this.id||(this.id=`api-viewer-tab-${Ot++}`)}_setActive(t){this.toggleAttribute("active",t)}_setFocused(t){this.toggleAttribute("focused",t),this.toggleAttribute("focus-ring",t&&!this._mousedown)}}customElements.define("api-viewer-tab",ft);let qt=0;const Ft=O`
  <style>
    :host {
      display: block;
      box-sizing: border-box;
      width: 100%;
      overflow: hidden;
    }

    :host([hidden]) {
      display: none !important;
    }
  </style>
  <slot></slot>
`;class Wt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(Ft.content.cloneNode(!0))}connectedCallback(){this.setAttribute("role","tabpanel"),this.id||(this.id=`api-viewer-panel-${qt++}`)}}customElements.define("api-viewer-panel",Wt);const Zt=O`
  <style>
    :host {
      display: flex;
      border-bottom-left-radius: var(--ave-border-radius);
      overflow: hidden;
    }

    @media (max-width: 600px) {
      :host {
        flex-direction: column;
      }

      .tabs {
        display: flex;
        flex-grow: 1;
        align-self: stretch;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
  </style>
  <div class="tabs">
    <slot name="tab"></slot>
  </div>
  <slot name="panel"></slot>
`;class Yt extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.appendChild(Zt.content.cloneNode(!0));const e=t.querySelectorAll("slot");e[0].addEventListener("slotchange",()=>this._linkPanels()),e[1].addEventListener("slotchange",()=>this._linkPanels()),this.addEventListener("keydown",this.handleEvent),this.addEventListener("click",this.handleEvent)}connectedCallback(){this.setAttribute("role","tablist"),requestAnimationFrame(()=>{this._linkPanels()})}_linkPanels(){const{tabs:t}=this;t.forEach(i=>{const n=i.nextElementSibling;i.setAttribute("aria-controls",n.id),n.setAttribute("aria-labelledby",i.id)});const e=t.find(i=>i.selected)||t[0];this._selectTab(e)}get tabs(){return Array.from(this.querySelectorAll("api-viewer-tab"))}_getAvailableIndex(t,e){const{tabs:i}=this,n=i.length;for(let o=0;typeof t=="number"&&o<n;o++,t+=e||1)if(t<0?t=n-1:t>=n&&(t=0),!i[t].hasAttribute("hidden"))return t;return-1}_prevTab(t){const e=this._getAvailableIndex(t.findIndex(i=>i.selected)-1,-1);return t[(e+t.length)%t.length]}_nextTab(t){const e=this._getAvailableIndex(t.findIndex(i=>i.selected)+1,1);return t[e%t.length]}reset(){this.tabs.forEach(t=>{t.selected=!1}),this.querySelectorAll("api-viewer-panel").forEach(t=>{t.hidden=!0})}selectFirst(){const t=this._getAvailableIndex(0,1);this._selectTab(this.tabs[t%this.tabs.length])}_selectTab(t){this.reset();const e=t.getAttribute("aria-controls"),i=this.querySelector(`#${e}`);i&&(t.selected=!0,i.hidden=!1)}handleEvent(t){const{target:e}=t;if(e&&e instanceof ft){let i;if(t.type==="keydown"){const{tabs:n}=this;switch(t.key){case"ArrowLeft":case"ArrowUp":i=this._prevTab(n);break;case"ArrowDown":case"ArrowRight":i=this._nextTab(n);break;case"Home":i=n[0];break;case"End":i=n[n.length-1];break;default:return}t.preventDefault()}else i=e;this._selectTab(i),i.focus()}}}customElements.define("api-viewer-tabs",Yt);export{u as A,Ct as D,ve as M,f as T,de as a,he as b,ue as c,Jt as d,pe as e,ht as f,ce as g,vt as h,ut as i,ie as j,se as k,ee as l,ae as m,M as n,fe as o,ne as p,dt as q,S as s,Xt as t,$e as u,te as v,yt as x};
