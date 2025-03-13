import{E as w,F as S,n as k,l as A}from"./styles.B87_XgVZ.js";import{b as E}from"./chunk.UG6RICOR.BqzUYkit.js";import{_ as u}from"./tslib.es6.kHcLnhpD.js";import{t as h,b as p,a as g,c as P}from"./property.9e9_4Dyz.js";import{r as y,x as l,i as T,m as L}from"./messenger-client.Xgv8kjK5.js";import{S as v}from"./signal-watcher.CCnljk_y.js";import{p as N}from"./agent-avatar.BvZW1j7G.js";function f(t){return typeof t=="string"&&t.split(",").length===39?new Uint8Array(t.split(",").map(e=>parseInt(e,10))):t}function d(t){const e=new FormData(t),i={};return e.forEach((n,r)=>{if(Reflect.has(i,r)){const s=i[r];Array.isArray(s)?s.push(f(n)):i[r]=[i[r],f(n)]}else i[r]=f(n)}),i}class R extends S{constructor(){super(...arguments),this.initialized=!1}update(e,i){this.initialized||(this.initialized=!0,e.element.addEventListener("update-form",r=>{this.listener&&e.element.removeEventListener("submit",this.listener),this.listener=s=>{s.preventDefault();const o=d(e.element);i[0](o)},e.element.addEventListener("submit",this.listener)})),setTimeout(()=>{this.listener&&e.element.removeEventListener("submit",this.listener),this.listener=n=>{n.preventDefault();const r=d(e.element);i[0](r)},e.element.addEventListener("submit",this.listener)},100)}render(e){return""}}const X=w(R);E.define("sl-icon-button");let b=class extends v(y){render(){return l`<div class="row" style="align-items: center; width: 150px">
      <sl-skeleton
        effect="sheen"
        style="height: 32px; width: 32px; border-radius: 50%; margin: 8px"
      ></sl-skeleton
      ><sl-skeleton
        effect="sheen"
        style="flex: 1; margin: 8px; border-radius: 12px"
      >
      </sl-skeleton>
    </div>`}static get styles(){return[p,T`
        :host {
          display: flex;
        }
      `]}};b=u([h("profile-list-item-skeleton")],b);let a=class extends v(y){render(){var e;const i=this.profilesProvider.currentProfileForAgent.get(this.agentPubKey).get();switch(i.status){case"pending":return l`<profile-list-item-skeleton></profile-list-item-skeleton>`;case"completed":return l`
					<div class="row" style="align-items: center; gap: 8px">
						<agent-avatar .agentPubKey=${this.agentPubKey}></agent-avatar>
						<span>${(e=i.value)===null||e===void 0?void 0:e.name}</span>
					</div>
				`;case"error":return l`<display-error
					tooltip
					.headline=${L("Error fetching the profile.")}
					.error=${i.error}
				></display-error>`}}};a.styles=[p];u([g(k("agent-pub-key"))],a.prototype,"agentPubKey",void 0);u([P({context:N,subscribe:!0}),g()],a.prototype,"profilesProvider",void 0);a=u([A(),h("profile-list-item")],a);var m=new WeakMap;function x(t){let e=m.get(t);return e||(e=window.getComputedStyle(t,null),m.set(t,e)),e}function C(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=x(t);return e.visibility!=="hidden"&&e.display!=="none"}function O(t){const e=x(t),{overflowY:i,overflowX:n}=e;return i==="scroll"||n==="scroll"?!0:i!=="auto"||n!=="auto"?!1:t.scrollHeight>t.clientHeight&&i==="auto"||t.scrollWidth>t.clientWidth&&n==="auto"}function _(t){const e=t.tagName.toLowerCase(),i=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(i)||i<=-1)||t.hasAttribute("disabled")||t.closest("[inert]"))return!1;if(e==="input"&&t.getAttribute("type")==="radio"){const s=t.getRootNode(),o=`input[type='radio'][name="${t.getAttribute("name")}"]`,c=s.querySelector(`${o}:checked`);return c?c===t:s.querySelector(o)===t}return C(t)?(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:O(t):!1}function B(t){var e,i;const n=$(t),r=(e=n[0])!=null?e:null,s=(i=n[n.length-1])!=null?i:null;return{start:r,end:s}}function D(t,e){var i;return((i=t.getRootNode({composed:!0}))==null?void 0:i.host)!==e}function $(t){const e=new WeakMap,i=[];function n(r){if(r instanceof Element){if(r.hasAttribute("inert")||r.closest("[inert]")||e.has(r))return;e.set(r,!0),!i.includes(r)&&_(r)&&i.push(r),r instanceof HTMLSlotElement&&D(r,t)&&r.assignedElements({flatten:!0}).forEach(s=>{n(s)}),r.shadowRoot!==null&&r.shadowRoot.mode==="open"&&n(r.shadowRoot)}for(const s of r.children)n(s)}return n(t),i.sort((r,s)=>{const o=Number(r.getAttribute("tabindex"))||0;return(Number(s.getAttribute("tabindex"))||0)-o})}export{$ as a,B as g,X as o};
