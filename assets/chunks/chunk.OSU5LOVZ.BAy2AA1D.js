import{D as g,E as y,f as p,a as w,F as A}from"./styles.fvlugEG2.js";import{r as E,m as c,x as h}from"./messenger-client.CV9csWrB.js";import{b as F}from"./chunk.MZCVJT24.CqIsFzLm.js";import{b as S,a as d,t as R}from"./property.Du0Z6lUr.js";class _{constructor(t){this.host=t,this.host.addController(this),this.handleFormData=this.handleFormData.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleFormReset=this.handleFormReset.bind(this)}closestElement(t){function s(r){if(!r||r===document||r===window)return null;r.assignedSlot&&(r=r.assignedSlot);const e=r.closest(t);return e||s(r.getRootNode().host)}return s(this.host)}hostConnected(){this.form=this.closestElement("form"),this.form&&(this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),this.form.dispatchEvent(new CustomEvent("update-form")))}hostDisconnected(){this.form&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),this.form=void 0)}handleFormData(t){const s=this.host.disabled,r=this.host.name,e=this.host.value;!s&&r&&e!==void 0&&(Array.isArray(e)?e.map(a=>t.formData.append(r,a)):t.formData.append(r,e))}handleFormSubmit(t){const s=this.form,r=this.host.disabled,e=this.host.reportValidity;s&&!s.noValidate&&!r&&e&&!this.host.reportValidity()&&(t.preventDefault(),t.stopImmediatePropagation())}handleFormReset(t){this.host.reset()}}function f(i){return typeof i=="string"&&i.split(",").length===39?new Uint8Array(i.split(",").map(t=>parseInt(t,10))):i}function m(i){const t=new FormData(i),s={};return t.forEach((r,e)=>{if(Reflect.has(s,e)){const a=s[e];Array.isArray(a)?a.push(f(r)):s[e]=[s[e],f(r)]}else s[e]=f(r)}),s}class x extends y{constructor(){super(...arguments),this.initialized=!1}update(t,s){this.initialized||(this.initialized=!0,t.element.addEventListener("update-form",e=>{this.listener&&t.element.removeEventListener("submit",this.listener),this.listener=a=>{a.preventDefault();const o=m(t.element);s[0](o)},t.element.addEventListener("submit",this.listener)})),setTimeout(()=>{this.listener&&t.element.removeEventListener("submit",this.listener),this.listener=r=>{r.preventDefault();const e=m(t.element);s[0](e)},t.element.addEventListener("submit",this.listener)},100)}render(t){return""}}const I=g(x);function D(i,t,s){let r=i.width,e=i.height;r>e?r>t&&(e=e*(t/r),r=t):e>s&&(r=r*(s/e),e=s);const a=document.createElement("canvas");return a.width=r,a.height=e,a.getContext("2d").drawImage(i,0,0,r,e),a.toDataURL()}var l=function(i,t,s,r){var e=arguments.length,a=e<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,s):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(i,t,s,r);else for(var u=i.length-1;u>=0;u--)(o=i[u])&&(a=(e<3?o(a):e>3?o(t,s,a):o(t,s))||a);return e>3&&a&&Object.defineProperty(t,s,a),a};let n=class extends E{constructor(){super(...arguments),this.name="avatar",this.required=!1,this.shape="circle",this.disabled=!1,this.avatarWidth=300,this.avatarHeight=300,this.label=c("Avatar"),this._controller=new _(this)}reportValidity(){const t=this.required&&!this.value;return t&&(this._errorInput.setCustomValidity(c("Avatar is required")),this._errorInput.reportValidity()),!t}reset(){this.value=this.defaultValue}onAvatarUploaded(){const t=this.shadowRoot.querySelector("sl-button");if(t&&(t.loading=!0),this._avatarFilePicker.files&&this._avatarFilePicker.files[0]){const s=new FileReader;s.onload=r=>{var a;const e=new Image;e.crossOrigin="anonymous",e.onload=()=>{this.value=D(e,this.avatarWidth,this.avatarHeight),this._avatarFilePicker.value="",this.dispatchEvent(new CustomEvent("avatar-selected",{composed:!0,bubbles:!0,detail:{avatar:this.value}})),t.loading=!1},e.src=(a=r.target)==null?void 0:a.result},s.readAsDataURL(this._avatarFilePicker.files[0])}}renderAvatar(){return this.value?h`
				<div
					class="column"
					style="align-items: center; height: 50px"
					@click=${()=>{this.value=void 0}}
				>
					<sl-tooltip .content=${c("Clear")}>
						<sl-avatar
							image="${this.value}"
							alt="Avatar"
							.shape=${this.shape}
							initials=""
						></sl-avatar
					></sl-tooltip>
				</div>
			`:h` <div class="column" style="align-items: center;">
				<sl-button
					.disabled=${this.disabled}
					variant="default"
					size="large"
					circle
					@click=${()=>this._avatarFilePicker.click()}
				>
					<sl-icon
						src="${w(A)}"
						.label=${c("Add avatar image")}
					></sl-icon>
				</sl-button>
			</div>`}render(){return h`<input
				type="file"
				id="avatar-file-picker"
				style="display: none"
				@change=${this.onAvatarUploaded}
			/>
			<div class="column" style="position: relative; align-items: center">
				<input
					id="error-input"
					style="position: absolute; z-index: -1; left: 50%; top: 30px; height: 0; width: 0"
				/>
				${this.label!==""?h`
							<span
								style="font-size: var(--sl-input-label-font-size-medium); margin-bottom: 4px; white-space: nowrap;"
								>${this.label}${this.required!==!1?" *":""}</span
							>
						`:h``}
				${this.renderAvatar()}
			</div>`}};n.styles=S;l([d({attribute:"name"})],n.prototype,"name",void 0);l([d()],n.prototype,"required",void 0);l([d()],n.prototype,"shape",void 0);l([d()],n.prototype,"value",void 0);l([d()],n.prototype,"disabled",void 0);l([d()],n.prototype,"defaultValue",void 0);l([d({attribute:"avatar-width"})],n.prototype,"avatarWidth",void 0);l([d({attribute:"avatar-height"})],n.prototype,"avatarHeight",void 0);l([d()],n.prototype,"label",void 0);l([p("#avatar-file-picker")],n.prototype,"_avatarFilePicker",void 0);l([p("#error-input")],n.prototype,"_errorInput",void 0);n=l([R("select-avatar")],n);F.define("sl-icon-button");var b=new WeakMap;function v(i){let t=b.get(i);return t||(t=window.getComputedStyle(i,null),b.set(i,t)),t}function C(i){if(typeof i.checkVisibility=="function")return i.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const t=v(i);return t.visibility!=="hidden"&&t.display!=="none"}function $(i){const t=v(i),{overflowY:s,overflowX:r}=t;return s==="scroll"||r==="scroll"?!0:s!=="auto"||r!=="auto"?!1:i.scrollHeight>i.clientHeight&&s==="auto"||i.scrollWidth>i.clientWidth&&r==="auto"}function L(i){const t=i.tagName.toLowerCase(),s=Number(i.getAttribute("tabindex"));if(i.hasAttribute("tabindex")&&(isNaN(s)||s<=-1)||i.hasAttribute("disabled")||i.closest("[inert]"))return!1;if(t==="input"&&i.getAttribute("type")==="radio"){const a=i.getRootNode(),o=`input[type='radio'][name="${i.getAttribute("name")}"]`,u=a.querySelector(`${o}:checked`);return u?u===i:a.querySelector(o)===i}return C(i)?(t==="audio"||t==="video")&&i.hasAttribute("controls")||i.hasAttribute("tabindex")||i.hasAttribute("contenteditable")&&i.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(t)?!0:$(i):!1}function H(i){var t,s;const r=V(i),e=(t=r[0])!=null?t:null,a=(s=r[r.length-1])!=null?s:null;return{start:e,end:a}}function k(i,t){var s;return((s=i.getRootNode({composed:!0}))==null?void 0:s.host)!==t}function V(i){const t=new WeakMap,s=[];function r(e){if(e instanceof Element){if(e.hasAttribute("inert")||e.closest("[inert]")||t.has(e))return;t.set(e,!0),!s.includes(e)&&L(e)&&s.push(e),e instanceof HTMLSlotElement&&k(e,i)&&e.assignedElements({flatten:!0}).forEach(a=>{r(a)}),e.shadowRoot!==null&&e.shadowRoot.mode==="open"&&r(e.shadowRoot)}for(const a of e.children)r(a)}return r(i),s.sort((e,a)=>{const o=Number(e.getAttribute("tabindex"))||0;return(Number(a.getAttribute("tabindex"))||0)-o})}export{_ as F,V as a,H as g,I as o};
