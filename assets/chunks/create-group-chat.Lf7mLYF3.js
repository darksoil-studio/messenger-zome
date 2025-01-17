import{_ as d}from"./tslib.es6.kHcLnhpD.js";import{b as F,a as o,c as P,t as A}from"./property.BEi3PmIb.js";import{A as U,S as Q,h as re,r as L,m,x as h,i as S,f as ae,j as ne,t as q,k as le,l as ue}from"./messenger-client.Bks7hfH7.js";import{d as w,a as B,f as Z,c as z,g as ee,_ as a,w as $,s as te,S as I,L as N,h as W,i as G,j as X,k as Y,e as T,n as ie,r as V,p as O,l as R,o as se,q as pe,m as de}from"./styles.BcPDAjHV.js";import{o as v,e as he,n as ce,S as me,H as oe,g as fe,f as ve,d as ge,F as be,l as ye,a as we}from"./live.CKubG-fH.js";import{f as _e}from"./show-avatar-image.B9DanR2O.js";import{S as M}from"./signal-watcher.DchcTGV4.js";import{g as xe,j as ke,o as Ce}from"./chunk.LXDTFLWU.CKPw9YI6.js";import{m as Se}from"./context.BqoJQclL.js";import"./reactive-element.CHpx6ykd.js";function $e(e){return e!=null&&typeof e=="object"&&"then"in e&&typeof e.then=="function"}function J(e,t,i){const s=new Q.Computed(()=>{const l=[e,...i].map(c=>c.get());let u=l[0];if(u&&u.status){if(u.status==="error")return u;if(u.status==="pending")return u;u=u.value}try{return t(u,...l.slice(1).map(C=>C.value).reverse())}catch(c){return{status:"error",error:c}}});let r;const n=new U(()=>{const l=e.get();return r=void 0,l});return new U(()=>{n.get();const l=s.get();if(l&&l.get&&!l.has){const u=l.get();return u&&u.status?u:{status:"completed",value:u}}else if($e(l)){r||(r=re(()=>l));const u=r.get();return u.status==="completed"&&u.value.status?u.value:u}else return l&&l.status?l:{status:"completed",value:l}})}function Ee(e,t,i,s,r,n,l){let u=e;const c=u.get();(!c||!(typeof c=="object"&&"status"in c))&&(u=new U(()=>({status:"completed",value:e.get()})));const C=J(u,t,[]);return i?J(C,i,[u]):C}class H{constructor(t){this.host=t,this.host.addController(this),this.handleFormData=this.handleFormData.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleFormReset=this.handleFormReset.bind(this)}closestElement(t){function i(s){if(!s||s===document||s===window)return null;s.assignedSlot&&(s=s.assignedSlot);const r=s.closest(t);return r||i(s.getRootNode().host)}return i(this.host)}hostConnected(){this.form=this.closestElement("form"),this.form&&(this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),this.form.dispatchEvent(new CustomEvent("update-form")))}hostDisconnected(){this.form&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),this.form=void 0)}handleFormData(t){const i=this.host.disabled,s=this.host.name,r=this.host.value;!i&&s&&r!==void 0&&(Array.isArray(r)?r.map(n=>t.formData.append(s,n)):t.formData.append(s,r))}handleFormSubmit(t){const i=this.form,s=this.host.disabled,r=this.host.reportValidity;i&&!i.noValidate&&!s&&r&&!this.host.reportValidity()&&(t.preventDefault(),t.stopImmediatePropagation())}handleFormReset(t){this.host.reset()}}let b=class extends L{constructor(){super(...arguments),this.name="avatar",this.required=!1,this.shape="circle",this.disabled=!1,this.label=m("Avatar"),this._controller=new H(this)}reportValidity(){const t=this.required!==!1&&!this.value;return t&&(this._errorInput.setCustomValidity("Avatar is required"),this._errorInput.reportValidity()),!t}reset(){this.value=this.defaultValue}async onAvatarUploaded(){this._avatarFilePicker.files&&this._avatarFilePicker.files[0]&&(this.value=await this._client.uploadFile(this._avatarFilePicker.files[0]),this.dispatchEvent(new CustomEvent("avatar-uploaded",{bubbles:!0,composed:!0,detail:{imageHash:this.value}})),this._avatarFilePicker.value="")}renderAvatar(){return this.value?h`
        <div
          class="column"
          style="align-items: center; height: 50px"
          @click=${()=>{this.value=void 0}}
        >
          <sl-tooltip .content=${m("Clear")}>
            <show-avatar-image
              style="--size: 46px"
              .imageHash=${this.value}
              .shape=${this.shape}
            >
            </show-avatar-image>
          </sl-tooltip>
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
            src="${B(Z)}"
            .label=${m("Add avatar image")}
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
                style="font-size: var(--sl-input-label-font-size-medium); margin-bottom: 4px"
                >${this.label}${this.required!==!1?" *":""}</span
              >
            `:h``}
        ${this.renderAvatar()}
      </div>`}};b.styles=F;d([o({attribute:"name"})],b.prototype,"name",void 0);d([o()],b.prototype,"required",void 0);d([o()],b.prototype,"shape",void 0);d([o()],b.prototype,"value",void 0);d([o()],b.prototype,"disabled",void 0);d([o()],b.prototype,"defaultValue",void 0);d([o()],b.prototype,"label",void 0);d([P({context:_e})],b.prototype,"_client",void 0);d([w("#avatar-file-picker")],b.prototype,"_avatarFilePicker",void 0);d([w("#error-input")],b.prototype,"_errorInput",void 0);b=d([A("upload-avatar")],b);var Pe=S`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,f=class extends I{constructor(){super(...arguments),this.localize=new N(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=e=>{this.open&&e.key==="Escape"&&(e.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=e=>{var t;if(e.key==="Escape"&&this.open&&!this.closeWatcher){e.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(e.key==="Tab"){if(this.open&&((t=document.activeElement)==null?void 0:t.tagName.toLowerCase())==="sl-menu-item"){e.preventDefault(),this.hide(),this.focusOnTrigger();return}setTimeout(()=>{var i,s,r;const n=((i=this.containingElement)==null?void 0:i.getRootNode())instanceof ShadowRoot?(r=(s=document.activeElement)==null?void 0:s.shadowRoot)==null?void 0:r.activeElement:document.activeElement;(!this.containingElement||(n==null?void 0:n.closest(this.containingElement.tagName.toLowerCase()))!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=e=>{const t=e.composedPath();this.containingElement&&!t.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=e=>{const t=e.target;!this.stayOpenOnSelect&&t.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const e=this.trigger.assignedElements({flatten:!0})[0];typeof(e==null?void 0:e.focus)=="function"&&e.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(e=>e.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(e){if([" ","Enter"].includes(e.key)){e.preventDefault(),this.handleTriggerClick();return}const t=this.getMenu();if(t){const i=t.getAllItems(),s=i[0],r=i[i.length-1];["ArrowDown","ArrowUp","Home","End"].includes(e.key)&&(e.preventDefault(),this.open||(this.show(),await this.updateComplete),i.length>0&&this.updateComplete.then(()=>{(e.key==="ArrowDown"||e.key==="Home")&&(t.setCurrentItem(s),s.focus()),(e.key==="ArrowUp"||e.key==="End")&&(t.setCurrentItem(r),r.focus())}))}}handleTriggerKeyUp(e){e.key===" "&&e.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.assignedElements({flatten:!0}).find(s=>xe(s).start);let i;if(t){switch(t.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":i=t.button;break;default:i=t}i.setAttribute("aria-haspopup","true"),i.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,W(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,W(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var e;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var e;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(e=this.closeWatcher)==null||e.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await G(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:e,options:t}=X(this,"dropdown.show",{dir:this.localize.dir()});await Y(this.popup.popup,e,t),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await G(this);const{keyframes:e,options:t}=X(this,"dropdown.hide",{dir:this.localize.dir()});await Y(this.popup.popup,e,t),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return h`
      <sl-popup
        part="base"
        exportparts="popup:base__popup"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${v(this.sync?this.sync:void 0)}
        class=${T({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};f.styles=[z,Pe];f.dependencies={"sl-popup":ee};a([w(".dropdown")],f.prototype,"popup",2);a([w(".dropdown__trigger")],f.prototype,"trigger",2);a([w(".dropdown__panel")],f.prototype,"panel",2);a([o({type:Boolean,reflect:!0})],f.prototype,"open",2);a([o({reflect:!0})],f.prototype,"placement",2);a([o({type:Boolean,reflect:!0})],f.prototype,"disabled",2);a([o({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],f.prototype,"stayOpenOnSelect",2);a([o({attribute:!1})],f.prototype,"containingElement",2);a([o({type:Number})],f.prototype,"distance",2);a([o({type:Number})],f.prototype,"skidding",2);a([o({type:Boolean})],f.prototype,"hoist",2);a([o({reflect:!0})],f.prototype,"sync",2);a([$("open",{waitUntilFirstUpdate:!0})],f.prototype,"handleOpenChange",1);te("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});te("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});f.define("sl-dropdown");var Ae=S`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }

  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,Le=class{constructor(e,t){this.popupRef=he(),this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=i=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${i.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${i.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=i=>{switch(i.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":i.target!==this.host&&(i.preventDefault(),i.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(i);break}},this.handleClick=i=>{var s;i.target===this.host?(i.preventDefault(),i.stopPropagation()):i.target instanceof Element&&(i.target.tagName==="sl-menu-item"||(s=i.target.role)!=null&&s.startsWith("menuitem"))&&this.disableSubmenu()},this.handleFocusOut=i=>{i.relatedTarget&&i.relatedTarget instanceof Element&&this.host.contains(i.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=i=>{i.stopPropagation()},this.handlePopupReposition=()=>{const i=this.host.renderRoot.querySelector("slot[name='submenu']"),s=i==null?void 0:i.assignedElements({flatten:!0}).filter(C=>C.localName==="sl-menu")[0],r=getComputedStyle(this.host).direction==="rtl";if(!s)return;const{left:n,top:l,width:u,height:c}=s.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${r?n+u:n}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${l}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${r?n+u:n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${l+c}px`)},(this.host=e).addController(this),this.hasSlotController=t}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(e){const t=this.host.renderRoot.querySelector("slot[name='submenu']");if(!t){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let i=null;for(const s of t.assignedElements())if(i=s.querySelectorAll("sl-menu-item, [role^='menuitem']"),i.length!==0)break;if(!(!i||i.length===0)){i[0].setAttribute("tabindex","0");for(let s=1;s!==i.length;++s)i[s].setAttribute("tabindex","-1");this.popupRef.value&&(e.preventDefault(),e.stopPropagation(),this.popupRef.value.active?i[0]instanceof HTMLElement&&i[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{i[0]instanceof HTMLElement&&i[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(e){this.popupRef.value&&this.popupRef.value.active!==e&&(this.popupRef.value.active=e,this.host.requestUpdate())}enableSubmenu(e=!0){e?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var e;if(!((e=this.host.parentElement)!=null&&e.computedStyleMap))return;const t=this.host.parentElement.computedStyleMap(),s=["padding-top","border-top-width","margin-top"].reduce((r,n)=>{var l;const u=(l=t.get(n))!=null?l:new CSSUnitValue(0,"px"),C=(u instanceof CSSUnitValue?u:new CSSUnitValue(0,"px")).to("px");return r-C.value},0);this.skidding=s}isExpanded(){return this.popupRef.value?this.popupRef.value.active:!1}renderSubmenu(){const e=getComputedStyle(this.host).direction==="rtl";return this.isConnected?h`
      <sl-popup
        ${ce(this.popupRef)}
        placement=${e?"left-start":"right-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:h` <slot name="submenu" hidden></slot> `}},_=class extends I{constructor(){super(...arguments),this.localize=new N(this),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.hasSlotController=new oe(this,"submenu"),this.submenuController=new Le(this,this.hasSlotController),this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleMouseOver=e=>{this.focus(),e.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const e=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=e;return}e!==this.cachedTextLabel&&(this.cachedTextLabel=e,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=!1,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return fe(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const e=this.localize.dir()==="rtl",t=this.submenuController.isExpanded();return h`
      <div
        id="anchor"
        part="base"
        class=${T({"menu-item":!0,"menu-item--rtl":e,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":t})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!t}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${e?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?h` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};_.styles=[z,Ae];_.dependencies={"sl-icon":ie,"sl-popup":ee,"sl-spinner":me};a([w("slot:not([name])")],_.prototype,"defaultSlot",2);a([w(".menu-item")],_.prototype,"menuItem",2);a([o()],_.prototype,"type",2);a([o({type:Boolean,reflect:!0})],_.prototype,"checked",2);a([o()],_.prototype,"value",2);a([o({type:Boolean,reflect:!0})],_.prototype,"loading",2);a([o({type:Boolean,reflect:!0})],_.prototype,"disabled",2);a([$("checked")],_.prototype,"handleCheckedChange",1);a([$("disabled")],_.prototype,"handleDisabledChange",1);a([$("type")],_.prototype,"handleTypeChange",1);_.define("sl-menu-item");var De=S`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,K=class extends I{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(e){const t=["menuitem","menuitemcheckbox"],i=e.composedPath(),s=i.find(u=>{var c;return t.includes(((c=u==null?void 0:u.getAttribute)==null?void 0:c.call(u,"role"))||"")});if(!s||i.find(u=>{var c;return((c=u==null?void 0:u.getAttribute)==null?void 0:c.call(u,"role"))==="menu"})!==this)return;const l=s;l.type==="checkbox"&&(l.checked=!l.checked),this.emit("sl-select",{detail:{item:l}})}handleKeyDown(e){if(e.key==="Enter"||e.key===" "){const t=this.getCurrentItem();e.preventDefault(),e.stopPropagation(),t==null||t.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){const t=this.getAllItems(),i=this.getCurrentItem();let s=i?t.indexOf(i):0;t.length>0&&(e.preventDefault(),e.stopPropagation(),e.key==="ArrowDown"?s++:e.key==="ArrowUp"?s--:e.key==="Home"?s=0:e.key==="End"&&(s=t.length-1),s<0&&(s=t.length-1),s>t.length-1&&(s=0),this.setCurrentItem(t[s]),t[s].focus())}}handleMouseDown(e){const t=e.target;this.isMenuItem(t)&&this.setCurrentItem(t)}handleSlotChange(){const e=this.getAllItems();e.length>0&&this.setCurrentItem(e[0])}isMenuItem(e){var t;return e.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((t=e.getAttribute("role"))!=null?t:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>!(e.inert||!this.isMenuItem(e)))}getCurrentItem(){return this.getAllItems().find(e=>e.getAttribute("tabindex")==="0")}setCurrentItem(e){this.getAllItems().forEach(i=>{i.setAttribute("tabindex",i===e?"0":"-1")})}render(){return h`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};K.styles=[z,De];a([w("slot")],K.prototype,"defaultSlot",2);K.define("sl-menu");var Fe=S`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,p=class extends I{constructor(){super(...arguments),this.formControlController=new be(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new oe(this,"help-text","label"),this.localize=new N(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var e;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((e=this.input)==null?void 0:e.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(e){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=e,this.value=this.__dateInput.value}get valueAsNumber(){var e;return this.__numberInput.value=this.value,((e=this.input)==null?void 0:e.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(e){this.__numberInput.valueAsNumber=e,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(e){e.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleKeyDown(e){const t=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;e.key==="Enter"&&!t&&setTimeout(()=>{!e.defaultPrevented&&!e.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(e,t,i="none"){this.input.setSelectionRange(e,t,i)}setRangeText(e,t,i,s="preserve"){const r=t??this.input.selectionStart,n=i??this.input.selectionEnd;this.input.setRangeText(e,r,n,s),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),i=this.label?!0:!!e,s=this.helpText?!0:!!t,n=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return h`
      <div
        part="form-control"
        class=${T({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":i,"form-control--has-help-text":s})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${T({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${v(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${v(this.placeholder)}
              minlength=${v(this.minlength)}
              maxlength=${v(this.maxlength)}
              min=${v(this.min)}
              max=${v(this.max)}
              step=${v(this.step)}
              .value=${ye(this.value)}
              autocapitalize=${v(this.autocapitalize)}
              autocomplete=${v(this.autocomplete)}
              autocorrect=${v(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${v(this.pattern)}
              enterkeyhint=${v(this.enterkeyhint)}
              inputmode=${v(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${n?h`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?h`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?h`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:h`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};p.styles=[z,ve,Fe];p.dependencies={"sl-icon":ie};a([w(".input__control")],p.prototype,"input",2);a([V()],p.prototype,"hasFocus",2);a([o()],p.prototype,"title",2);a([o({reflect:!0})],p.prototype,"type",2);a([o()],p.prototype,"name",2);a([o()],p.prototype,"value",2);a([ge()],p.prototype,"defaultValue",2);a([o({reflect:!0})],p.prototype,"size",2);a([o({type:Boolean,reflect:!0})],p.prototype,"filled",2);a([o({type:Boolean,reflect:!0})],p.prototype,"pill",2);a([o()],p.prototype,"label",2);a([o({attribute:"help-text"})],p.prototype,"helpText",2);a([o({type:Boolean})],p.prototype,"clearable",2);a([o({type:Boolean,reflect:!0})],p.prototype,"disabled",2);a([o()],p.prototype,"placeholder",2);a([o({type:Boolean,reflect:!0})],p.prototype,"readonly",2);a([o({attribute:"password-toggle",type:Boolean})],p.prototype,"passwordToggle",2);a([o({attribute:"password-visible",type:Boolean})],p.prototype,"passwordVisible",2);a([o({attribute:"no-spin-buttons",type:Boolean})],p.prototype,"noSpinButtons",2);a([o({reflect:!0})],p.prototype,"form",2);a([o({type:Boolean,reflect:!0})],p.prototype,"required",2);a([o()],p.prototype,"pattern",2);a([o({type:Number})],p.prototype,"minlength",2);a([o({type:Number})],p.prototype,"maxlength",2);a([o()],p.prototype,"min",2);a([o()],p.prototype,"max",2);a([o()],p.prototype,"step",2);a([o()],p.prototype,"autocapitalize",2);a([o()],p.prototype,"autocorrect",2);a([o()],p.prototype,"autocomplete",2);a([o({type:Boolean})],p.prototype,"autofocus",2);a([o()],p.prototype,"enterkeyhint",2);a([o({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],p.prototype,"spellcheck",2);a([o()],p.prototype,"inputmode",2);a([$("disabled",{waitUntilFirstUpdate:!0})],p.prototype,"handleDisabledChange",1);a([$("step",{waitUntilFirstUpdate:!0})],p.prototype,"handleStepChange",1);a([$("value",{waitUntilFirstUpdate:!0})],p.prototype,"handleValueChange",1);p.define("sl-input");let E=class extends M(L){constructor(){super(...arguments),this._searchFilter=new Q.State(void 0),this.excludedProfiles=[],this._searchProfiles=Ee(this._searchFilter,t=>this.store.client.searchProfiles(t),t=>{const i=le(this.store.profiles,t);return ke(ue(i,s=>s.latestVersion.get()))})}set searchFilter(t){this._searchFilter.set(t)}get searchFilter(){return this._searchFilter.get()}async onProfileSelected(t,i){this.dispatchEvent(new CustomEvent("profile-selected",{detail:{profileHash:t,profile:i},bubbles:!0,composed:!0}))}renderProfileList(){const t=this._searchFilter.get();if(!t||t.length<3)return h`<sl-menu-item disabled
				>${m("Enter at least 3 chars to search...")}</sl-menu-item
			>`;const i=this._searchProfiles.get();switch(i.status){case"pending":return Array.from(Array(3)).map(()=>h`
						<sl-menu-item>
							<div class="row" style="display:flex; align-items: center">
								<sl-skeleton
									effect="sheen"
									slot="prefix"
									style="height: 32px; width: 32px; border-radius: 50%; margin: 8px"
								></sl-skeleton>
								<sl-skeleton
									effect="sheen"
									style="width: 100px; margin: 8px; border-radius: 12px"
								></sl-skeleton>
							</div>
						</sl-menu-item>
					`);case"error":return h`
					<display-error
						style="flex: 1; display:flex"
						tooltip
						.headline=${m("Error searching profiles")}
						.error=${i.error}
					></display-error>
				`;case"completed":{let s=Array.from(i.value.entries()),r=this.excludedProfiles.map(n=>n.toString());return s=s.filter(([n,l])=>!r.includes(n.toString())),s.length===0?h`<sl-menu-item disabled>
						${m("No nicknames match the filter")}
					</sl-menu-item>`:h`
					${s.map(([n,l])=>h`
							<sl-menu-item .value=${ae(n)}>
								<agent-avatar
									slot="prefix"
									.profileHash=${n}
									style="margin-right: 16px"
								></agent-avatar>
								${l==null?void 0:l.entry.nickname}
							</sl-menu-item>
						`)}
				`}}}render(){return h`
			<sl-dropdown
				id="dropdown"
				hoist
				style="flex: 1"
				.open=${v(this.open)}
			>
				<slot slot="trigger"></slot>
				<sl-menu
					@sl-select=${async t=>{const i=ne(t.detail.item.value),s=await q(this.store.profiles.get(i).latestVersion);this.onProfileSelected(i,s)}}
				>
					${this.renderProfileList()}
				</sl-menu>
			</sl-dropdown>
		`}static get styles(){return[F,S`
				:host {
					display: flex;
				}
			`]}};d([o()],E.prototype,"open",void 0);d([P({context:O,subscribe:!0}),o()],E.prototype,"store",void 0);d([o()],E.prototype,"excludedProfiles",void 0);d([w("#dropdown")],E.prototype,"dropdown",void 0);E=d([R(),A("search-profile-dropdown")],E);let y=class extends M(L){constructor(){super(...arguments),this.required=!1,this.disabled=!1,this.clearOnSelect=!1,this.excludedProfiles=[],this._controller=new H(this),this.searchFilter=""}reportValidity(){const t=this.required!==!1&&this.value===void 0;return t&&(this._textField.setCustomValidity("This field is required"),this._textField.reportValidity()),!t}async reset(){if(this.value=this.defaultValue,this.defaultValue){const t=await q(this.store.profiles.get(this.defaultValue).latestVersion);this._textField.value=(t==null?void 0:t.entry.nickname)||""}else this._textField.value=""}onProfileSelected(t,i){this.value=t,this.clearOnSelect?this._textField.value="":this._textField.value=i.entry.nickname,this.searchFilter=""}get _label(){let t=this.fieldLabel?this.fieldLabel:m("Search Profile");return this.required!==!1&&(t=`${t} *`),t}render(){return h`
			<div style="flex: 1; display: flex;">
				<search-profile-dropdown
					id="dropdown"
					.open=${this.searchFilter.length>=3}
					style="flex: 1"
					.excludedProfiles=${this.excludedProfiles}
					.searchFilter=${this.searchFilter}
					@profile-selected=${t=>this.onProfileSelected(t.detail.profileHash,t.detail.profile)}
				>
					<sl-input
						id="textfield"
						.label=${this._label}
						.placeholder=${m("At least 3 chars...")}
						@input=${t=>{this.searchFilter=t.target.value}}
					></sl-input>
				</search-profile-dropdown>
			</div>
		`}static get styles(){return[F,S`
				:host {
					display: flex;
				}
			`]}};d([o()],y.prototype,"name",void 0);d([o(se("default-value"))],y.prototype,"defaultValue",void 0);d([o()],y.prototype,"required",void 0);d([o()],y.prototype,"disabled",void 0);d([V()],y.prototype,"value",void 0);d([o({type:Boolean,attribute:"clear-on-select"})],y.prototype,"clearOnSelect",void 0);d([P({context:O,subscribe:!0}),o()],y.prototype,"store",void 0);d([o()],y.prototype,"excludedProfiles",void 0);d([o({type:String,attribute:"field-label"})],y.prototype,"fieldLabel",void 0);d([w("#textfield")],y.prototype,"_textField",void 0);d([V()],y.prototype,"searchFilter",void 0);y=d([R(),A("search-profile")],y);let x=class extends M(L){constructor(){super(...arguments),this.defaultValue=[],this.required=!1,this.disabled=!1,this.emptyListPlaceholder=m("No agents selected yet."),this._controller=new H(this),this.excludedProfiles=[],this.value=[]}reportValidity(){return!0}async reset(){this.value=this.defaultValue}render(){return h`
			<div class="column" style="gap: 16px">
				<search-profile
					.fieldLabel=${this.fieldLabel}
					clear-on-select
					@profile-selected=${t=>{this.value=[...this.value,t.detail.profileHash],this.dispatchEvent(new CustomEvent("profiles-changed",{composed:!0,bubbles:!0,detail:{profilesHashes:this.value}}))}}
					.excludedProfiles=${this.excludedProfiles}
				></search-profile>
				${this.value.length===0?h`<span class="placeholder">${this.emptyListPlaceholder}</span>`:this.value.map((t,i)=>h`<div class="row">
									<profile-list-item
										style="flex: 1"
										.profileHash=${t}
									></profile-list-item
									><sl-icon-button
										.src=${B(pe)}
										@click=${()=>{this.value=this.value.filter((s,r)=>r!==i),this.dispatchEvent(new CustomEvent("profiles-changed",{composed:!0,bubbles:!0,detail:{profilesHashes:this.value}}))}}
									></sl-icon-button>
								</div>`)}
			</div>
		`}};x.styles=[F];d([o()],x.prototype,"name",void 0);d([o(se("default-value"))],x.prototype,"defaultValue",void 0);d([o()],x.prototype,"required",void 0);d([o()],x.prototype,"disabled",void 0);d([o({type:String,attribute:"field-label"})],x.prototype,"fieldLabel",void 0);d([o({type:String,attribute:"empty-list-placeholder"})],x.prototype,"emptyListPlaceholder",void 0);d([P({context:O,subscribe:!0}),o()],x.prototype,"store",void 0);d([o()],x.prototype,"excludedProfiles",void 0);d([V()],x.prototype,"value",void 0);x=d([R(),A("search-profiles")],x);function Te(e,t,i){let s=e.width,r=e.height;s>r?s>t&&(r=r*(t/s),s=t):r>i&&(s=s*(i/r),r=i);const n=document.createElement("canvas");return n.width=s,n.height=r,n.getContext("2d").drawImage(e,0,0,s,r),n.toDataURL()}var k=function(e,t,i,s){var r=arguments.length,n=r<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,i):s,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,s);else for(var u=e.length-1;u>=0;u--)(l=e[u])&&(n=(r<3?l(n):r>3?l(t,i,n):l(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let g=class extends L{constructor(){super(...arguments),this.name="avatar",this.required=!1,this.shape="circle",this.disabled=!1,this.avatarWidth=300,this.avatarHeight=300,this.label=m("Avatar"),this._controller=new H(this)}reportValidity(){const t=this.required!==!1&&!this.value;return t&&(this._errorInput.setCustomValidity("Avatar is required"),this._errorInput.reportValidity()),!t}reset(){this.value=this.defaultValue}onAvatarUploaded(){if(this._avatarFilePicker.files&&this._avatarFilePicker.files[0]){const t=new FileReader;t.onload=i=>{var r;const s=new Image;s.crossOrigin="anonymous",s.onload=()=>{console.log(this.avatarHeight),this.value=Te(s,this.avatarWidth,this.avatarHeight),this._avatarFilePicker.value="",this.dispatchEvent(new CustomEvent("avatar-selected",{composed:!0,bubbles:!0,detail:{avatar:this.value}}))},s.src=(r=i.target)==null?void 0:r.result},t.readAsDataURL(this._avatarFilePicker.files[0])}}renderAvatar(){return this.value?h`
				<div
					class="column"
					style="align-items: center; height: 50px"
					@click=${()=>{this.value=void 0}}
				>
					<sl-tooltip .content=${m("Clear")}>
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
						src="${B(Z)}"
						.label=${m("Add avatar image")}
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
								style="font-size: var(--sl-input-label-font-size-medium); margin-bottom: 4px"
								>${this.label}${this.required!==!1?" *":""}</span
							>
						`:h``}
				${this.renderAvatar()}
			</div>`}};g.styles=F;k([o({attribute:"name"})],g.prototype,"name",void 0);k([o()],g.prototype,"required",void 0);k([o()],g.prototype,"shape",void 0);k([o()],g.prototype,"value",void 0);k([o()],g.prototype,"disabled",void 0);k([o()],g.prototype,"defaultValue",void 0);k([o({attribute:"avatar-width"})],g.prototype,"avatarWidth",void 0);k([o({attribute:"avatar-height"})],g.prototype,"avatarHeight",void 0);k([o()],g.prototype,"label",void 0);k([w("#avatar-file-picker")],g.prototype,"_avatarFilePicker",void 0);k([w("#error-input")],g.prototype,"_errorInput",void 0);g=k([A("select-avatar")],g);var ze=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,j=(e,t,i,s)=>{for(var r=s>1?void 0:s?Ie(t,i):t,n=e.length-1,l;n>=0;n--)(l=e[n])&&(r=(s?l(t,i,r):l(r))||r);return s&&r&&ze(t,i,r),r};let D=class extends M(L){async createGroupChat(e){try{const t=Array.isArray(e.members)?e.members:e.members?[e.members]:[],i=await Promise.all(t.map(r=>q(this.profilesStore.agentsForProfile.get(r)))),s=await this.store.client.createGroupChat(i.map(r=>r[0]),{avatar_hash:e.avatar,description:"",name:e.name},{only_admins_can_add_members:!1,only_admins_can_edit_group_info:!1,sync_message_history_with_new_members:!1});this.dispatchEvent(new CustomEvent("group-chat-created",{bubbles:!0,composed:!0,detail:{groupChatHash:s}}))}catch(t){console.error(t),we(m("Error creating group chat."))}}render(){var t;const e=this.profilesStore.myProfile.get();return h`
			<form
				class="column"
				${Ce(i=>this.createGroupChat(i))}
				style="gap: 24px; flex: 1"
			>
				<div class="row" style="gap: 8px; align-items: center">
					<upload-avatar label="" name="avatar"> </upload-avatar>
					<sl-input
						style="flex: 1"
						required
						.placeholder=${m("Name")}
						name="name"
					></sl-input>
				</div>

				<search-profiles
					.fieldLabel=${m("Add Members")}
					name="members"
					.excludedProfiles=${e.status==="completed"?[(t=e.value)==null?void 0:t.profileHash]:[]}
				>
				</search-profiles>

				<div style="flex: 1"></div>

				<sl-button variant="primary" type="submit"
					>${m("Create Group Chat")}</sl-button
				>
			</form>
		`}};D.styles=[de,S`
			:host {
				display: flex;
			}
		`];j([P({context:Se,subscribe:!0})],D.prototype,"store",2);j([P({context:O,subscribe:!0})],D.prototype,"profilesStore",2);D=j([R(),A("create-group-chat")],D);export{D as CreateGroupChat};
