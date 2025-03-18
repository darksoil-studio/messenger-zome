import{a as o,c as P,p as F,t as A,b as T}from"./property.rnZ96Gce.js";import{_ as h}from"./tslib.es6.kHcLnhpD.js";import{A as R,S as X,h as se,i as k,x as d,r as D,m as v,t as M}from"./messenger-client.BdwBMR5i.js";import{c as I,d as Y,_ as n,f as x,w as C,s as J,S as z,L as B,g as H,h as j,i as W,j as G,e as L,k as Q,r as V,l as U,n as Z,a as ee,o as ie,p as oe,b as re}from"./styles.By2RxiHb.js";import{g as ne,o as ae}from"./chunk.OSU5LOVZ.DxzWYEeM.js";import{o as f,e as le,n as ue,S as pe,H as te,g as de,f as he,d as ce,F as me,l as fe,a as ve}from"./chunk.UG6RICOR.D8KAyFhA.js";import{S as O}from"./signal-watcher.Dnw_ZDU5.js";import{m as ge}from"./context.Cue3sNVd.js";function be(e){return e!=null&&typeof e=="object"&&"then"in e&&typeof e.then=="function"}function ye(e,t,s){const i=new X.Computed(()=>{const u=[e,...s].map(c=>c.get());let l=u[0];if(l&&l.status){if(l.status==="error")return l;if(l.status==="pending")return l;l=l.value}try{return t(l,...u.slice(1).map(S=>S.value).reverse())}catch(c){return{status:"error",error:c}}});let r;const a=new R(()=>{const u=e.get();return r=void 0,u});return new R(()=>{a.get();const u=i.get();if(u&&u.get&&!u.has){const l=u.get();return l&&l.status?l:{status:"completed",value:l}}else if(be(u)){r||(r=se(()=>u));const l=r.get();return l.status==="completed"&&l.value.status?l.value:l}else return u&&u.status?u:{status:"completed",value:u}})}function we(e,t,s,i,r,a,u){let l=e;const c=l.get();return(!c||!(typeof c=="object"&&"status"in c))&&(l=new R(()=>({status:"completed",value:e.get()}))),ye(l,t,[])}class K{constructor(t){this.host=t,this.host.addController(this),this.handleFormData=this.handleFormData.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleFormReset=this.handleFormReset.bind(this)}closestElement(t){function s(i){if(!i||i===document||i===window)return null;i.assignedSlot&&(i=i.assignedSlot);const r=i.closest(t);return r||s(i.getRootNode().host)}return s(this.host)}hostConnected(){this.form=this.closestElement("form"),this.form&&(this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),this.form.dispatchEvent(new CustomEvent("update-form")))}hostDisconnected(){this.form&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),this.form=void 0)}handleFormData(t){const s=this.host.disabled,i=this.host.name,r=this.host.value;!s&&i&&r!==void 0&&(Array.isArray(r)?r.map(a=>t.formData.append(i,a)):t.formData.append(i,r))}handleFormSubmit(t){const s=this.form,i=this.host.disabled,r=this.host.reportValidity;s&&!s.noValidate&&!i&&r&&!this.host.reportValidity()&&(t.preventDefault(),t.stopImmediatePropagation())}handleFormReset(t){this.host.reset()}}var _e=k`
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
`,m=class extends z{constructor(){super(...arguments),this.localize=new B(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=e=>{this.open&&e.key==="Escape"&&(e.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=e=>{var t;if(e.key==="Escape"&&this.open&&!this.closeWatcher){e.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(e.key==="Tab"){if(this.open&&((t=document.activeElement)==null?void 0:t.tagName.toLowerCase())==="sl-menu-item"){e.preventDefault(),this.hide(),this.focusOnTrigger();return}setTimeout(()=>{var s,i,r;const a=((s=this.containingElement)==null?void 0:s.getRootNode())instanceof ShadowRoot?(r=(i=document.activeElement)==null?void 0:i.shadowRoot)==null?void 0:r.activeElement:document.activeElement;(!this.containingElement||(a==null?void 0:a.closest(this.containingElement.tagName.toLowerCase()))!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=e=>{const t=e.composedPath();this.containingElement&&!t.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=e=>{const t=e.target;!this.stayOpenOnSelect&&t.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const e=this.trigger.assignedElements({flatten:!0})[0];typeof(e==null?void 0:e.focus)=="function"&&e.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(e=>e.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(e){if([" ","Enter"].includes(e.key)){e.preventDefault(),this.handleTriggerClick();return}const t=this.getMenu();if(t){const s=t.getAllItems(),i=s[0],r=s[s.length-1];["ArrowDown","ArrowUp","Home","End"].includes(e.key)&&(e.preventDefault(),this.open||(this.show(),await this.updateComplete),s.length>0&&this.updateComplete.then(()=>{(e.key==="ArrowDown"||e.key==="Home")&&(t.setCurrentItem(i),i.focus()),(e.key==="ArrowUp"||e.key==="End")&&(t.setCurrentItem(r),r.focus())}))}}handleTriggerKeyUp(e){e.key===" "&&e.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.assignedElements({flatten:!0}).find(i=>ne(i).start);let s;if(t){switch(t.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":s=t.button;break;default:s=t}s.setAttribute("aria-haspopup","true"),s.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,H(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,H(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var e;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var e;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(e=this.closeWatcher)==null||e.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await j(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:e,options:t}=W(this,"dropdown.show",{dir:this.localize.dir()});await G(this.popup.popup,e,t),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await j(this);const{keyframes:e,options:t}=W(this,"dropdown.hide",{dir:this.localize.dir()});await G(this.popup.popup,e,t),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return d`
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
        sync=${f(this.sync?this.sync:void 0)}
        class=${L({dropdown:!0,"dropdown--open":this.open})}
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
    `}};m.styles=[I,_e];m.dependencies={"sl-popup":Y};n([x(".dropdown")],m.prototype,"popup",2);n([x(".dropdown__trigger")],m.prototype,"trigger",2);n([x(".dropdown__panel")],m.prototype,"panel",2);n([o({type:Boolean,reflect:!0})],m.prototype,"open",2);n([o({reflect:!0})],m.prototype,"placement",2);n([o({type:Boolean,reflect:!0})],m.prototype,"disabled",2);n([o({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],m.prototype,"stayOpenOnSelect",2);n([o({attribute:!1})],m.prototype,"containingElement",2);n([o({type:Number})],m.prototype,"distance",2);n([o({type:Number})],m.prototype,"skidding",2);n([o({type:Boolean})],m.prototype,"hoist",2);n([o({reflect:!0})],m.prototype,"sync",2);n([C("open",{waitUntilFirstUpdate:!0})],m.prototype,"handleOpenChange",1);J("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});J("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});m.define("sl-dropdown");var xe=k`
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
`,ke=class{constructor(e,t){this.popupRef=le(),this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=s=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${s.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${s.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=s=>{switch(s.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":s.target!==this.host&&(s.preventDefault(),s.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(s);break}},this.handleClick=s=>{var i;s.target===this.host?(s.preventDefault(),s.stopPropagation()):s.target instanceof Element&&(s.target.tagName==="sl-menu-item"||(i=s.target.role)!=null&&i.startsWith("menuitem"))&&this.disableSubmenu()},this.handleFocusOut=s=>{s.relatedTarget&&s.relatedTarget instanceof Element&&this.host.contains(s.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=s=>{s.stopPropagation()},this.handlePopupReposition=()=>{const s=this.host.renderRoot.querySelector("slot[name='submenu']"),i=s==null?void 0:s.assignedElements({flatten:!0}).filter(S=>S.localName==="sl-menu")[0],r=getComputedStyle(this.host).direction==="rtl";if(!i)return;const{left:a,top:u,width:l,height:c}=i.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${r?a+l:a}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${u}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${r?a+l:a}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${u+c}px`)},(this.host=e).addController(this),this.hasSlotController=t}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(e){const t=this.host.renderRoot.querySelector("slot[name='submenu']");if(!t){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let s=null;for(const i of t.assignedElements())if(s=i.querySelectorAll("sl-menu-item, [role^='menuitem']"),s.length!==0)break;if(!(!s||s.length===0)){s[0].setAttribute("tabindex","0");for(let i=1;i!==s.length;++i)s[i].setAttribute("tabindex","-1");this.popupRef.value&&(e.preventDefault(),e.stopPropagation(),this.popupRef.value.active?s[0]instanceof HTMLElement&&s[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{s[0]instanceof HTMLElement&&s[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(e){this.popupRef.value&&this.popupRef.value.active!==e&&(this.popupRef.value.active=e,this.host.requestUpdate())}enableSubmenu(e=!0){e?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var e;if(!((e=this.host.parentElement)!=null&&e.computedStyleMap))return;const t=this.host.parentElement.computedStyleMap(),i=["padding-top","border-top-width","margin-top"].reduce((r,a)=>{var u;const l=(u=t.get(a))!=null?u:new CSSUnitValue(0,"px"),S=(l instanceof CSSUnitValue?l:new CSSUnitValue(0,"px")).to("px");return r-S.value},0);this.skidding=i}isExpanded(){return this.popupRef.value?this.popupRef.value.active:!1}renderSubmenu(){const e=getComputedStyle(this.host).direction==="rtl";return this.isConnected?d`
      <sl-popup
        ${ue(this.popupRef)}
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
    `:d` <slot name="submenu" hidden></slot> `}},y=class extends z{constructor(){super(...arguments),this.localize=new B(this),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.hasSlotController=new te(this,"submenu"),this.submenuController=new ke(this,this.hasSlotController),this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleMouseOver=e=>{this.focus(),e.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const e=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=e;return}e!==this.cachedTextLabel&&(this.cachedTextLabel=e,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=!1,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return de(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const e=this.localize.dir()==="rtl",t=this.submenuController.isExpanded();return d`
      <div
        id="anchor"
        part="base"
        class=${L({"menu-item":!0,"menu-item--rtl":e,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":t})}
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
        ${this.loading?d` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};y.styles=[I,xe];y.dependencies={"sl-icon":Q,"sl-popup":Y,"sl-spinner":pe};n([x("slot:not([name])")],y.prototype,"defaultSlot",2);n([x(".menu-item")],y.prototype,"menuItem",2);n([o()],y.prototype,"type",2);n([o({type:Boolean,reflect:!0})],y.prototype,"checked",2);n([o()],y.prototype,"value",2);n([o({type:Boolean,reflect:!0})],y.prototype,"loading",2);n([o({type:Boolean,reflect:!0})],y.prototype,"disabled",2);n([C("checked")],y.prototype,"handleCheckedChange",1);n([C("disabled")],y.prototype,"handleDisabledChange",1);n([C("type")],y.prototype,"handleTypeChange",1);y.define("sl-menu-item");var Ce=k`
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
`,q=class extends z{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(e){const t=["menuitem","menuitemcheckbox"],s=e.composedPath(),i=s.find(l=>{var c;return t.includes(((c=l==null?void 0:l.getAttribute)==null?void 0:c.call(l,"role"))||"")});if(!i||s.find(l=>{var c;return((c=l==null?void 0:l.getAttribute)==null?void 0:c.call(l,"role"))==="menu"})!==this)return;const u=i;u.type==="checkbox"&&(u.checked=!u.checked),this.emit("sl-select",{detail:{item:u}})}handleKeyDown(e){if(e.key==="Enter"||e.key===" "){const t=this.getCurrentItem();e.preventDefault(),e.stopPropagation(),t==null||t.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){const t=this.getAllItems(),s=this.getCurrentItem();let i=s?t.indexOf(s):0;t.length>0&&(e.preventDefault(),e.stopPropagation(),e.key==="ArrowDown"?i++:e.key==="ArrowUp"?i--:e.key==="Home"?i=0:e.key==="End"&&(i=t.length-1),i<0&&(i=t.length-1),i>t.length-1&&(i=0),this.setCurrentItem(t[i]),t[i].focus())}}handleMouseDown(e){const t=e.target;this.isMenuItem(t)&&this.setCurrentItem(t)}handleSlotChange(){const e=this.getAllItems();e.length>0&&this.setCurrentItem(e[0])}isMenuItem(e){var t;return e.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((t=e.getAttribute("role"))!=null?t:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>!(e.inert||!this.isMenuItem(e)))}getCurrentItem(){return this.getAllItems().find(e=>e.getAttribute("tabindex")==="0")}setCurrentItem(e){this.getAllItems().forEach(s=>{s.setAttribute("tabindex",s===e?"0":"-1")})}render(){return d`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};q.styles=[I,Ce];n([x("slot")],q.prototype,"defaultSlot",2);q.define("sl-menu");var Se=k`
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
`,p=class extends z{constructor(){super(...arguments),this.formControlController=new me(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new te(this,"help-text","label"),this.localize=new B(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var e;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((e=this.input)==null?void 0:e.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(e){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=e,this.value=this.__dateInput.value}get valueAsNumber(){var e;return this.__numberInput.value=this.value,((e=this.input)==null?void 0:e.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(e){this.__numberInput.valueAsNumber=e,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(e){e.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleKeyDown(e){const t=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;e.key==="Enter"&&!t&&setTimeout(()=>{!e.defaultPrevented&&!e.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(e,t,s="none"){this.input.setSelectionRange(e,t,s)}setRangeText(e,t,s,i="preserve"){const r=t??this.input.selectionStart,a=s??this.input.selectionEnd;this.input.setRangeText(e,r,a,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("label"),t=this.hasSlotController.test("help-text"),s=this.label?!0:!!e,i=this.helpText?!0:!!t,a=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return d`
      <div
        part="form-control"
        class=${L({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":s,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${L({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
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
              name=${f(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${f(this.placeholder)}
              minlength=${f(this.minlength)}
              maxlength=${f(this.maxlength)}
              min=${f(this.min)}
              max=${f(this.max)}
              step=${f(this.step)}
              .value=${fe(this.value)}
              autocapitalize=${f(this.autocapitalize)}
              autocomplete=${f(this.autocomplete)}
              autocorrect=${f(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${f(this.pattern)}
              enterkeyhint=${f(this.enterkeyhint)}
              inputmode=${f(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${a?d`
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
            ${this.passwordToggle&&!this.disabled?d`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?d`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:d`
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
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};p.styles=[I,he,Se];p.dependencies={"sl-icon":Q};n([x(".input__control")],p.prototype,"input",2);n([V()],p.prototype,"hasFocus",2);n([o()],p.prototype,"title",2);n([o({reflect:!0})],p.prototype,"type",2);n([o()],p.prototype,"name",2);n([o()],p.prototype,"value",2);n([ce()],p.prototype,"defaultValue",2);n([o({reflect:!0})],p.prototype,"size",2);n([o({type:Boolean,reflect:!0})],p.prototype,"filled",2);n([o({type:Boolean,reflect:!0})],p.prototype,"pill",2);n([o()],p.prototype,"label",2);n([o({attribute:"help-text"})],p.prototype,"helpText",2);n([o({type:Boolean})],p.prototype,"clearable",2);n([o({type:Boolean,reflect:!0})],p.prototype,"disabled",2);n([o()],p.prototype,"placeholder",2);n([o({type:Boolean,reflect:!0})],p.prototype,"readonly",2);n([o({attribute:"password-toggle",type:Boolean})],p.prototype,"passwordToggle",2);n([o({attribute:"password-visible",type:Boolean})],p.prototype,"passwordVisible",2);n([o({attribute:"no-spin-buttons",type:Boolean})],p.prototype,"noSpinButtons",2);n([o({reflect:!0})],p.prototype,"form",2);n([o({type:Boolean,reflect:!0})],p.prototype,"required",2);n([o()],p.prototype,"pattern",2);n([o({type:Number})],p.prototype,"minlength",2);n([o({type:Number})],p.prototype,"maxlength",2);n([o()],p.prototype,"min",2);n([o()],p.prototype,"max",2);n([o()],p.prototype,"step",2);n([o()],p.prototype,"autocapitalize",2);n([o()],p.prototype,"autocorrect",2);n([o()],p.prototype,"autocomplete",2);n([o({type:Boolean})],p.prototype,"autofocus",2);n([o()],p.prototype,"enterkeyhint",2);n([o({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],p.prototype,"spellcheck",2);n([o()],p.prototype,"inputmode",2);n([C("disabled",{waitUntilFirstUpdate:!0})],p.prototype,"handleDisabledChange",1);n([C("step",{waitUntilFirstUpdate:!0})],p.prototype,"handleStepChange",1);n([C("value",{waitUntilFirstUpdate:!0})],p.prototype,"handleValueChange",1);p.define("sl-input");let $=class extends O(D){constructor(){super(...arguments),this._searchFilter=new X.State(void 0),this.excludedUsers=[],this._searchProfiles=we(this._searchFilter,t=>this.profilesProvider.search(t))}set searchFilter(t){this._searchFilter.set(t)}get searchFilter(){return this._searchFilter.get()}async onUserSelected(t,s){this.dispatchEvent(new CustomEvent("user-selected",{detail:{agents:t,profile:s},bubbles:!0,composed:!0}))}renderProfileList(){const t=this._searchFilter.get();if(!t||t.length<3)return d`<sl-menu-item disabled
				>${v("Enter at least 3 chars to search...")}</sl-menu-item
			>`;const s=this._searchProfiles.get();switch(s.status){case"pending":return Array.from(Array(3)).map(()=>d`
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
					`);case"error":return d`
					<display-error
						style="flex: 1; display:flex"
						tooltip
						.headline=${v("Error searching profiles")}
						.error=${s.error}
					></display-error>
				`;case"completed":{let i=s.value;const r=[].concat(...this.excludedUsers.map(a=>a.map(u=>u.toString())));return i=i.filter(a=>!a.agents.find(u=>r.includes(u.toString()))),i.length===0?d`<sl-menu-item disabled>
						${v("No nicknames match the filter")}
					</sl-menu-item>`:d`
					${i.map((a,u)=>{var l;return d`
							<sl-menu-item .value=${u}>
								<agent-avatar
									slot="prefix"
									.agentPubKey=${a.agents[0]}
									style="margin-right: 16px"
								></agent-avatar>
								${(l=a.profile)===null||l===void 0?void 0:l.name}
							</sl-menu-item>
						`})}
				`}}}render(){return d`
			<sl-dropdown
				id="dropdown"
				hoist
				style="flex: 1"
				.open=${f(this.open)}
			>
				<slot slot="trigger"></slot>
				<sl-menu
					@sl-select=${async t=>{const s=parseInt(t.detail.item.value),i=this._searchProfiles.get();if(i.status!=="completed")return;const r=i.value[s];this.onUserSelected(r.agents,r.profile)}}
				>
					${this.renderProfileList()}
				</sl-menu>
			</sl-dropdown>
		`}static get styles(){return[T,k`
				:host {
					display: flex;
				}
			`]}};h([o()],$.prototype,"open",void 0);h([P({context:F,subscribe:!0}),o()],$.prototype,"profilesProvider",void 0);h([o()],$.prototype,"excludedUsers",void 0);h([x("#dropdown")],$.prototype,"dropdown",void 0);$=h([U(),A("search-user-dropdown")],$);let b=class extends O(D){constructor(){super(...arguments),this.required=!1,this.disabled=!1,this.clearOnSelect=!1,this.excludedUsers=[],this._controller=new K(this),this.searchFilter=""}reportValidity(){const t=this.required!==!1&&this.value===void 0;return t&&(this._textField.setCustomValidity("This field is required"),this._textField.reportValidity()),!t}async reset(){if(this.value=this.defaultValue,this.defaultValue&&this.defaultValue.length>0){const t=await M(this.profilesProvider.currentProfileForAgent.get(this.defaultValue[0]));t&&(this._textField.value=(t==null?void 0:t.name)||"")}else this._textField.value=""}onUserSelected(t,s){this.value=t,this.clearOnSelect?this._textField.value="":this._textField.value=s.name,this.searchFilter=""}get _label(){let t=this.label?this.label:v("Search User");return this.required!==!1&&(t=`${t} *`),t}render(){return d`
			<div style="flex: 1; display: flex;">
				<search-user-dropdown
					id="dropdown"
					.open=${this.searchFilter.length>=3}
					style="flex: 1"
					.excludedUsers=${this.excludedUsers}
					.searchFilter=${this.searchFilter}
					@user-selected=${t=>this.onUserSelected(t.detail.agents,t.detail.profile)}
				>
					<sl-input
						id="textfield"
						.label=${this._label}
						.placeholder=${v("At least 3 chars...")}
						@input=${t=>{this.searchFilter=t.target.value}}
					></sl-input>
				</search-user-dropdown>
			</div>
		`}static get styles(){return[T,k`
				:host {
					display: flex;
				}
			`]}};h([o()],b.prototype,"name",void 0);h([o(Z("default-value"))],b.prototype,"defaultValue",void 0);h([o()],b.prototype,"required",void 0);h([o()],b.prototype,"disabled",void 0);h([V()],b.prototype,"value",void 0);h([o({type:Boolean,attribute:"clear-on-select"})],b.prototype,"clearOnSelect",void 0);h([P({context:F,subscribe:!0}),o()],b.prototype,"profilesProvider",void 0);h([o()],b.prototype,"excludedUsers",void 0);h([o({type:String,attribute:"label"})],b.prototype,"label",void 0);h([x("#textfield")],b.prototype,"_textField",void 0);h([V()],b.prototype,"searchFilter",void 0);b=h([U(),A("search-user")],b);let w=class extends O(D){constructor(){super(...arguments),this.defaultValue=[],this.required=!1,this.disabled=!1,this.emptyListPlaceholder=v("No users selected yet."),this._controller=new K(this),this.excludedUsers=[],this.value=[]}reportValidity(){return!0}async reset(){this.value=this.defaultValue}render(){return d`
			<div class="column" style="gap: 16px">
				<search-user
					.label=${this.label?this.label:v("Search Users")}
					clear-on-select
					@user-selected=${t=>{this.value=[...this.value,t.detail.agents],this.dispatchEvent(new CustomEvent("users-changed",{composed:!0,bubbles:!0,detail:{users:this.value}}))}}
					.excludedUsers=${this.excludedUsers}
				></search-user>
				${this.value.length===0?d`<span class="placeholder">${this.emptyListPlaceholder}</span>`:this.value.map((t,s)=>d`<div class="row">
									<profile-list-item
										style="flex: 1"
										.agentPubKey=${t[0]}
									></profile-list-item
									><sl-icon-button
										.src=${ee(ie)}
										@click=${()=>{this.value=this.value.filter((i,r)=>r!==s),this.dispatchEvent(new CustomEvent("users-changed",{composed:!0,bubbles:!0,detail:{users:this.value}}))}}
									></sl-icon-button>
								</div>`)}
			</div>
		`}};w.styles=[T];h([o()],w.prototype,"name",void 0);h([o(Z("default-value"))],w.prototype,"defaultValue",void 0);h([o()],w.prototype,"required",void 0);h([o()],w.prototype,"disabled",void 0);h([o({type:String,attribute:"label"})],w.prototype,"label",void 0);h([o({type:String,attribute:"empty-list-placeholder"})],w.prototype,"emptyListPlaceholder",void 0);h([P({context:F,subscribe:!0}),o()],w.prototype,"profilesProvider",void 0);h([o()],w.prototype,"excludedUsers",void 0);h([V()],w.prototype,"value",void 0);w=h([U(),A("search-users")],w);function $e(e,t,s){let i=e.width,r=e.height;i>r?i>t&&(r=r*(t/i),i=t):r>s&&(i=i*(s/r),r=s);const a=document.createElement("canvas");return a.width=i,a.height=r,a.getContext("2d").drawImage(e,0,0,i,r),a.toDataURL()}var _=function(e,t,s,i){var r=arguments.length,a=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,s):i,u;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(e,t,s,i);else for(var l=e.length-1;l>=0;l--)(u=e[l])&&(a=(r<3?u(a):r>3?u(t,s,a):u(t,s))||a);return r>3&&a&&Object.defineProperty(t,s,a),a};let g=class extends D{constructor(){super(...arguments),this.name="avatar",this.required=!1,this.shape="circle",this.disabled=!1,this.avatarWidth=300,this.avatarHeight=300,this.label=v("Avatar"),this._controller=new K(this)}reportValidity(){const t=this.required!==!1&&!this.value;return t&&(this._errorInput.setCustomValidity("Avatar is required"),this._errorInput.reportValidity()),!t}reset(){this.value=this.defaultValue}onAvatarUploaded(){if(this._avatarFilePicker.files&&this._avatarFilePicker.files[0]){const t=new FileReader;t.onload=s=>{var r;const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{console.log(this.avatarHeight),this.value=$e(i,this.avatarWidth,this.avatarHeight),this._avatarFilePicker.value="",this.dispatchEvent(new CustomEvent("avatar-selected",{composed:!0,bubbles:!0,detail:{avatar:this.value}}))},i.src=(r=s.target)==null?void 0:r.result},t.readAsDataURL(this._avatarFilePicker.files[0])}}renderAvatar(){return this.value?d`
				<div
					class="column"
					style="align-items: center; height: 50px"
					@click=${()=>{this.value=void 0}}
				>
					<sl-tooltip .content=${v("Clear")}>
						<sl-avatar
							image="${this.value}"
							alt="Avatar"
							.shape=${this.shape}
							initials=""
						></sl-avatar
					></sl-tooltip>
				</div>
			`:d` <div class="column" style="align-items: center;">
				<sl-button
					.disabled=${this.disabled}
					variant="default"
					size="large"
					circle
					@click=${()=>this._avatarFilePicker.click()}
				>
					<sl-icon
						src="${ee(oe)}"
						.label=${v("Add avatar image")}
					></sl-icon>
				</sl-button>
			</div>`}render(){return d`<input
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
				${this.label!==""?d`
							<span
								style="font-size: var(--sl-input-label-font-size-medium); margin-bottom: 4px"
								>${this.label}${this.required!==!1?" *":""}</span
							>
						`:d``}
				${this.renderAvatar()}
			</div>`}};g.styles=T;_([o({attribute:"name"})],g.prototype,"name",void 0);_([o()],g.prototype,"required",void 0);_([o()],g.prototype,"shape",void 0);_([o()],g.prototype,"value",void 0);_([o()],g.prototype,"disabled",void 0);_([o()],g.prototype,"defaultValue",void 0);_([o({attribute:"avatar-width"})],g.prototype,"avatarWidth",void 0);_([o({attribute:"avatar-height"})],g.prototype,"avatarHeight",void 0);_([o()],g.prototype,"label",void 0);_([x("#avatar-file-picker")],g.prototype,"_avatarFilePicker",void 0);_([x("#error-input")],g.prototype,"_errorInput",void 0);g=_([A("select-avatar")],g);var Ee=Object.defineProperty,Pe=Object.getOwnPropertyDescriptor,N=(e,t,s,i)=>{for(var r=i>1?void 0:i?Pe(t,s):t,a=e.length-1,u;a>=0;a--)(u=e[a])&&(r=(i?u(t,s,r):u(r))||r);return i&&r&&Ee(t,s,r),r};let E=class extends O(D){async createGroupChat(e){try{const t=Array.isArray(e.members)?[e.members]:e.members?[[e.members]]:[];let s,i=t.map(a=>({agent:a[0],profile:void 0}));this.profilesProvider.profilesArePublic||(s=await M(this.profilesProvider.currentProfileForAgent.get(this.store.client.client.myPubKey)),i=await Promise.all(i.map(async a=>({profile:await M(this.profilesProvider.currentProfileForAgent.get(a.agent)),agent:a.agent}))));const r=await this.store.client.createGroupChat(s,i,{avatar:e.avatar,description:"",name:e.name},{only_admins_can_add_members:!1,only_admins_can_edit_group_info:!1,sync_message_history_with_new_members:!1});this.dispatchEvent(new CustomEvent("group-chat-created",{bubbles:!0,composed:!0,detail:{groupChatHash:r}}))}catch(t){console.error(t),ve(v("Error creating group chat."))}}render(){return d`
			<form
				class="column"
				${ae(e=>this.createGroupChat(e))}
				style="gap: 24px; flex: 1"
			>
				<div class="row" style="gap: 8px; align-items: center">
					<select-avatar
						avatar-width="300"
						avatar-height="300"
						label=""
						name="avatar"
						required
					>
					</select-avatar>
					<sl-input
						style="flex: 1"
						required
						.placeholder=${v("Name")}
						name="name"
					></sl-input>
				</div>

				<search-users
					.label=${v("Add Members")}
					name="members"
					.excludedUsers=${[[this.store.client.client.myPubKey]]}
				>
				</search-users>

				<div style="flex: 1"></div>

				<sl-button variant="primary" type="submit"
					>${v("Create Group Chat")}</sl-button
				>
			</form>
		`}};E.styles=[re,k`
			:host {
				display: flex;
			}
		`];N([P({context:ge,subscribe:!0})],E.prototype,"store",2);N([P({context:F,subscribe:!0}),o()],E.prototype,"profilesProvider",2);E=N([U(),A("create-group-chat")],E);export{E as CreateGroupChat};
