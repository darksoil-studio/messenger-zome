import{f as qe,h as Ve,g as Ne,s as Xe}from"./show-avatar-image.BZm0lwcV.js";import{p as Je}from"./agent-avatar.BvZW1j7G.js";import{i as se,x as l,r as he,j as Qe,m as u,f as w,t as Ye,g as ae,k as Ze,l as et}from"./messenger-client.Xgv8kjK5.js";import{a as v,c as ie,t as ue,b as tt}from"./property.9e9_4Dyz.js";import{c as we,S as _e,e as le,k as st,_ as g,f as j,w as ke,s as Q,L as We,h as te,i as N,j as X,q as Te,g as be,r as Ue,n as pe,l as Le,b as $e,a as A,t as it,u as at,v as rt,x as ot,y as lt,o as Ke,z as nt,A as dt,B as Ee,C as ct,D as ht}from"./styles.B87_XgVZ.js";import{H as He,f as ut,d as pt,F as ft,o as Se,l as gt,b as mt,a as O,n as Be}from"./chunk.UG6RICOR.BqzUYkit.js";import"./chunk.UJ4C5V3J.FPLQwGNR.js";import{a as Re,o as vt}from"./chunk.OSU5LOVZ.B1cAFhF_.js";import{o as yt}from"./message-input.C6WxqoDu.js";import{S as Ce}from"./signal-watcher.CCnljk_y.js";import{m as Ae}from"./context.CjZT0WpV.js";import{_ as ze}from"./tslib.es6.kHcLnhpD.js";import"./reactive-element.ChgaCBqn.js";var bt=se`
  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,je=class extends _e{constructor(){super(...arguments),this.hasSlotController=new He(this,"footer","header","image")}render(){return l`
      <div
        part="base"
        class=${le({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};je.styles=[we,bt];je.define("sl-card");var xt=se`
  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(1px + var(--sl-focus-ring-offset));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
  }

  .details--open .details__summary-icon {
    rotate: 90deg;
  }

  .details--open.details--rtl .details__summary-icon {
    rotate: -90deg;
  }

  .details--open slot[name='expand-icon'],
  .details:not(.details--open) slot[name='collapse-icon'] {
    display: none;
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    display: block;
    padding: var(--sl-spacing-medium);
  }
`,H=class extends _e{constructor(){super(...arguments),this.localize=new We(this),this.open=!1,this.disabled=!1}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(const e of t)e.type==="attributes"&&e.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.detailsObserver)==null||t.disconnect()}handleSummaryClick(t){t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show())}async handleOpenChange(){if(this.open){if(this.details.open=!0,this.emit("sl-show",{cancelable:!0}).defaultPrevented){this.open=!1,this.details.open=!1;return}await te(this.body);const{keyframes:e,options:s}=N(this,"details.show",{dir:this.localize.dir()});await X(this.body,Te(e,this.body.scrollHeight),s),this.body.style.height="auto",this.emit("sl-after-show")}else{if(this.emit("sl-hide",{cancelable:!0}).defaultPrevented){this.details.open=!0,this.open=!0;return}await te(this.body);const{keyframes:e,options:s}=N(this,"details.hide",{dir:this.localize.dir()});await X(this.body,Te(e,this.body.scrollHeight),s),this.body.style.height="auto",this.details.open=!1,this.emit("sl-after-hide")}}async show(){if(!(this.open||this.disabled))return this.open=!0,be(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,be(this,"sl-after-hide")}render(){const t=this.localize.dir()==="rtl";return l`
      <details
        part="base"
        class=${le({details:!0,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":t})}
      >
        <summary
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary" class="details__summary">${this.summary}</slot>

          <span part="summary-icon" class="details__summary-icon">
            <slot name="expand-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </span>
        </summary>

        <div class="details__body" role="region" aria-labelledby="header">
          <slot part="content" id="content" class="details__content"></slot>
        </div>
      </details>
    `}};H.styles=[we,xt];H.dependencies={"sl-icon":st};g([j(".details")],H.prototype,"details",2);g([j(".details__header")],H.prototype,"header",2);g([j(".details__body")],H.prototype,"body",2);g([j(".details__expand-icon-slot")],H.prototype,"expandIconSlot",2);g([v({type:Boolean,reflect:!0})],H.prototype,"open",2);g([v()],H.prototype,"summary",2);g([v({type:Boolean,reflect:!0})],H.prototype,"disabled",2);g([ke("open",{waitUntilFirstUpdate:!0})],H.prototype,"handleOpenChange",1);Q("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});Q("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});H.define("sl-details");var wt=se`
  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`,_=class extends _e{constructor(){super(...arguments),this.formControlController=new ft(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new He(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!t;return l`
      <div
        class=${le({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${le({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${Se(this.value)}
            .checked=${gt(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            role="switch"
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />

          <span part="control" class="switch__control">
            <span part="thumb" class="switch__thumb"></span>
          </span>

          <div part="label" class="switch__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};_.styles=[we,ut,wt];g([j('input[type="checkbox"]')],_.prototype,"input",2);g([Ue()],_.prototype,"hasFocus",2);g([v()],_.prototype,"title",2);g([v()],_.prototype,"name",2);g([v()],_.prototype,"value",2);g([v({reflect:!0})],_.prototype,"size",2);g([v({type:Boolean,reflect:!0})],_.prototype,"disabled",2);g([v({type:Boolean,reflect:!0})],_.prototype,"checked",2);g([pt("checked")],_.prototype,"defaultChecked",2);g([v({reflect:!0})],_.prototype,"form",2);g([v({type:Boolean,reflect:!0})],_.prototype,"required",2);g([v({attribute:"help-text"})],_.prototype,"helpText",2);g([ke("checked",{waitUntilFirstUpdate:!0})],_.prototype,"handleCheckedChange",1);g([ke("disabled",{waitUntilFirstUpdate:!0})],_.prototype,"handleDisabledChange",1);_.define("sl-switch");var p=function(t,e,s){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,s),s},n=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)},U,q,M,Z,oe,I,D,P,F,T,B,R,G,V,ee,L,ye,K;const _t=function(t){var e=131,s=137,r=0;t+="x";var a=Math.floor(9007199254740991/s);for(let i=0;i<t.length;i++)r>a&&(r=Math.floor(r/s)),r=r*e+t.charCodeAt(i);return r},d="0123456789abcdef".split(""),kt=[-2147483648,8388608,32768,128],S=[24,16,8,0],ve=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],x=[];class $t{constructor(e=!1,s=!1){U.set(this,void 0),q.set(this,void 0),M.set(this,void 0),Z.set(this,void 0),oe.set(this,void 0),I.set(this,void 0),D.set(this,void 0),P.set(this,void 0),F.set(this,void 0),T.set(this,void 0),B.set(this,void 0),R.set(this,void 0),G.set(this,void 0),V.set(this,void 0),ee.set(this,void 0),L.set(this,void 0),ye.set(this,0),K.set(this,void 0),this.init(e,s)}init(e,s){s?(x[0]=x[16]=x[1]=x[2]=x[3]=x[4]=x[5]=x[6]=x[7]=x[8]=x[9]=x[10]=x[11]=x[12]=x[13]=x[14]=x[15]=0,p(this,q,x)):p(this,q,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),e?(p(this,I,3238371032),p(this,D,914150663),p(this,P,812702999),p(this,F,4144912697),p(this,T,4290775857),p(this,B,1750603025),p(this,R,1694076839),p(this,G,3204075428)):(p(this,I,1779033703),p(this,D,3144134277),p(this,P,1013904242),p(this,F,2773480762),p(this,T,1359893119),p(this,B,2600822924),p(this,R,528734635),p(this,G,1541459225)),p(this,U,p(this,K,p(this,M,p(this,ee,0)))),p(this,Z,p(this,V,!1)),p(this,oe,!0),p(this,L,e)}update(e){if(n(this,Z))return this;let s;e instanceof ArrayBuffer?s=new Uint8Array(e):s=e;let r=0;const a=s.length,i=n(this,q);for(;r<a;){let o;if(n(this,V)&&(p(this,V,!1),i[0]=n(this,U),i[16]=i[1]=i[2]=i[3]=i[4]=i[5]=i[6]=i[7]=i[8]=i[9]=i[10]=i[11]=i[12]=i[13]=i[14]=i[15]=0),typeof s!="string")for(o=n(this,K);r<a&&o<64;++r)i[o>>2]|=s[r]<<S[o++&3];else for(o=n(this,K);r<a&&o<64;++r){let c=s.charCodeAt(r);c<128?i[o>>2]|=c<<S[o++&3]:c<2048?(i[o>>2]|=(192|c>>6)<<S[o++&3],i[o>>2]|=(128|c&63)<<S[o++&3]):c<55296||c>=57344?(i[o>>2]|=(224|c>>12)<<S[o++&3],i[o>>2]|=(128|c>>6&63)<<S[o++&3],i[o>>2]|=(128|c&63)<<S[o++&3]):(c=65536+((c&1023)<<10|s.charCodeAt(++r)&1023),i[o>>2]|=(240|c>>18)<<S[o++&3],i[o>>2]|=(128|c>>12&63)<<S[o++&3],i[o>>2]|=(128|c>>6&63)<<S[o++&3],i[o>>2]|=(128|c&63)<<S[o++&3])}p(this,ye,o),p(this,M,n(this,M)+(o-n(this,K))),o>=64?(p(this,U,i[16]),p(this,K,o-64),this.hash(),p(this,V,!0)):p(this,K,o)}return n(this,M)>4294967295&&(p(this,ee,n(this,ee)+(n(this,M)/4294967296<<0)),p(this,M,n(this,M)%4294967296)),this}finalize(){if(n(this,Z))return;p(this,Z,!0);const e=n(this,q),s=n(this,ye);e[16]=n(this,U),e[s>>2]|=kt[s&3],p(this,U,e[16]),s>=56&&(n(this,V)||this.hash(),e[0]=n(this,U),e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0),e[14]=n(this,ee)<<3|n(this,M)>>>29,e[15]=n(this,M)<<3,this.hash()}hash(){let e=n(this,I),s=n(this,D),r=n(this,P),a=n(this,F),i=n(this,T),o=n(this,B),c=n(this,R),f=n(this,G);const y=n(this,q);let k,$,z,h,m,C,E,Y,ge,me;for(let b=16;b<64;++b)h=y[b-15],k=(h>>>7|h<<25)^(h>>>18|h<<14)^h>>>3,h=y[b-2],$=(h>>>17|h<<15)^(h>>>19|h<<13)^h>>>10,y[b]=y[b-16]+k+y[b-7]+$<<0;me=s&r;for(let b=0;b<64;b+=4)n(this,oe)?(n(this,L)?(E=300032,h=y[0]-1413257819,f=h-150054599<<0,a=h+24177077<<0):(E=704751109,h=y[0]-210244248,f=h-1521486534<<0,a=h+143694565<<0),p(this,oe,!1)):(k=(e>>>2|e<<30)^(e>>>13|e<<19)^(e>>>22|e<<10),$=(i>>>6|i<<26)^(i>>>11|i<<21)^(i>>>25|i<<7),E=e&s,z=E^e&r^me,C=i&o^~i&c,h=f+$+C+ve[b]+y[b],m=k+z,f=a+h<<0,a=h+m<<0),k=(a>>>2|a<<30)^(a>>>13|a<<19)^(a>>>22|a<<10),$=(f>>>6|f<<26)^(f>>>11|f<<21)^(f>>>25|f<<7),Y=a&e,z=Y^a&s^E,C=f&i^~f&o,h=c+$+C+ve[b+1]+y[b+1],m=k+z,c=r+h<<0,r=h+m<<0,k=(r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10),$=(c>>>6|c<<26)^(c>>>11|c<<21)^(c>>>25|c<<7),ge=r&a,z=ge^r&e^Y,C=c&f^~c&i,h=o+$+C+ve[b+2]+y[b+2],m=k+z,o=s+h<<0,s=h+m<<0,k=(s>>>2|s<<30)^(s>>>13|s<<19)^(s>>>22|s<<10),$=(o>>>6|o<<26)^(o>>>11|o<<21)^(o>>>25|o<<7),me=s&r,z=me^s&a^ge,C=o&c^~o&f,h=i+$+C+ve[b+3]+y[b+3],m=k+z,i=e+h<<0,e=h+m<<0;p(this,I,n(this,I)+e<<0),p(this,D,n(this,D)+s<<0),p(this,P,n(this,P)+r<<0),p(this,F,n(this,F)+a<<0),p(this,T,n(this,T)+i<<0),p(this,B,n(this,B)+o<<0),p(this,R,n(this,R)+c<<0),p(this,G,n(this,G)+f<<0)}hex(){this.finalize();const e=n(this,I),s=n(this,D),r=n(this,P),a=n(this,F),i=n(this,T),o=n(this,B),c=n(this,R),f=n(this,G);let y=d[e>>28&15]+d[e>>24&15]+d[e>>20&15]+d[e>>16&15]+d[e>>12&15]+d[e>>8&15]+d[e>>4&15]+d[e&15]+d[s>>28&15]+d[s>>24&15]+d[s>>20&15]+d[s>>16&15]+d[s>>12&15]+d[s>>8&15]+d[s>>4&15]+d[s&15]+d[r>>28&15]+d[r>>24&15]+d[r>>20&15]+d[r>>16&15]+d[r>>12&15]+d[r>>8&15]+d[r>>4&15]+d[r&15]+d[a>>28&15]+d[a>>24&15]+d[a>>20&15]+d[a>>16&15]+d[a>>12&15]+d[a>>8&15]+d[a>>4&15]+d[a&15]+d[i>>28&15]+d[i>>24&15]+d[i>>20&15]+d[i>>16&15]+d[i>>12&15]+d[i>>8&15]+d[i>>4&15]+d[i&15]+d[o>>28&15]+d[o>>24&15]+d[o>>20&15]+d[o>>16&15]+d[o>>12&15]+d[o>>8&15]+d[o>>4&15]+d[o&15]+d[c>>28&15]+d[c>>24&15]+d[c>>20&15]+d[c>>16&15]+d[c>>12&15]+d[c>>8&15]+d[c>>4&15]+d[c&15];return n(this,L)||(y+=d[f>>28&15]+d[f>>24&15]+d[f>>20&15]+d[f>>16&15]+d[f>>12&15]+d[f>>8&15]+d[f>>4&15]+d[f&15]),y}toString(){return this.hex()}digest(){this.finalize();const e=n(this,I),s=n(this,D),r=n(this,P),a=n(this,F),i=n(this,T),o=n(this,B),c=n(this,R),f=n(this,G),y=[e>>24&255,e>>16&255,e>>8&255,e&255,s>>24&255,s>>16&255,s>>8&255,s&255,r>>24&255,r>>16&255,r>>8&255,r&255,a>>24&255,a>>16&255,a>>8&255,a&255,i>>24&255,i>>16&255,i>>8&255,i&255,o>>24&255,o>>16&255,o>>8&255,o&255,c>>24&255,c>>16&255,c>>8&255,c&255];return n(this,L)||y.push(f>>24&255,f>>16&255,f>>8&255,f&255),y}array(){return this.digest()}arrayBuffer(){this.finalize();const e=new ArrayBuffer(n(this,L)?28:32),s=new DataView(e);return s.setUint32(0,n(this,I)),s.setUint32(4,n(this,D)),s.setUint32(8,n(this,P)),s.setUint32(12,n(this,F)),s.setUint32(16,n(this,T)),s.setUint32(20,n(this,B)),s.setUint32(24,n(this,R)),n(this,L)||s.setUint32(28,n(this,G)),e}}U=new WeakMap,q=new WeakMap,M=new WeakMap,Z=new WeakMap,oe=new WeakMap,I=new WeakMap,D=new WeakMap,P=new WeakMap,F=new WeakMap,T=new WeakMap,B=new WeakMap,R=new WeakMap,G=new WeakMap,V=new WeakMap,ee=new WeakMap,L=new WeakMap,ye=new WeakMap,K=new WeakMap;function Ct(t){const e=new $t;return e.update(t),parseInt(e.hex().substring(0,8),16)}const At=function(t){var e="#";return t.forEach(function(s){s<16&&(e+=0),e+=s.toString(16)}),e},Et=function(t,e,s){t/=360;var r=s<.5?s*(1+e):s+e-s*e,a=2*s-r;return[t+1/3,t,t-1/3].map(function(i){return i<0&&i++,i>1&&i--,i<1/6?i=a+(r-a)*6*i:i<.5?i=r:i<2/3?i=a+(r-a)*6*(2/3-i):i=a,Math.round(i*255)})};class St{constructor(e={}){const[s,r]=[e.lightness,e.saturation].map(function(a){return a=a!==void 0?a:[.35,.5,.65],Array.isArray(a)?a.concat():[a]});this.L=s,this.S=r,typeof e.hue=="number"&&(e.hue={min:e.hue,max:e.hue}),typeof e.hue=="object"&&!Array.isArray(e.hue)&&(e.hue=[e.hue]),typeof e.hue>"u"&&(e.hue=[]),this.hueRanges=e.hue.map(function(a){return{min:typeof a.min>"u"?0:a.min,max:typeof a.max>"u"?360:a.max}}),this.hash=Ct,typeof e.hash=="function"&&(this.hash=e.hash),e.hash==="bkdr"&&(this.hash=_t)}hsl(e){var s,r,a,i=this.hash(e),o=727;if(this.hueRanges.length){const c=this.hueRanges[i%this.hueRanges.length];s=i/this.hueRanges.length%o*(c.max-c.min)/o+c.min}else s=i%359;return i=Math.ceil(i/360),r=this.S[i%this.S.length],i=Math.ceil(i/this.S.length),a=this.L[i%this.L.length],[s,r,a]}rgb(e){var s=this.hsl(e);return Et.apply(this,s)}hex(e){var s=this.rgb(e);return At(s)}}let xe=class extends he{constructor(){super(...arguments),this._renderImage=new Ve(this,async([e])=>{const s=await Ne(e);if(s)return s;const r=await this.client.downloadFile(e),a=await r.arrayBuffer(),i=`data:${r.type};base64,${Qe(new Uint8Array(a))}`;return Xe(e,i),i},()=>[this.imageHash])}renderImage(e){return l`<div style="flex:1"><img src="${e}" part="image" style="object-fit: cover; overflow: hidden; width: 100%; height: 100%"></img></div>`}render(){return this._renderImage.render({complete:e=>this.renderImage(e),pending:()=>l`<sl-skeleton
          style="flex: 1; --border-radius: 0"
          effect="pulse"
        ></sl-skeleton> `,error:e=>l`<display-error
          .headline=${u("Error fetching the image")}
          .error=${e}
        ></display-error>`})}static get styles(){return[tt,se`
        :host {
          display: flex;
        }
      `]}};ze([v(pe("image-hash"))],xe.prototype,"imageHash",void 0);ze([ie({context:qe})],xe.prototype,"client",void 0);xe=ze([Le(),ue("show-image")],xe);var Mt=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,Ie=(t,e,s,r)=>{for(var a=r>1?void 0:r?Ht(e,s):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(a=(r?o(e,s,a):o(a))||a);return r&&a&&Mt(e,s,a),a};let ne=class extends Ce(he){renderInfo(t){return l`
			<div class="column" style="gap: 8px;">
				${t.avatar?l`<show-image
							.imageHash=${t.avatar}
							style="height: 150px"
						></show-image>`:l`<sl-icon
							.src=${A(it)}
							style="font-size: 64px; border-radius: 50%; align-self: center; height: 150px"
							class="placeholder"
						></sl-icon>`}
				<span class="title">${t.name}</span>
				${t.description?l` <span class="placeholder">${t.description}</span> `:l``}
			</div>
		`}render(){const t=this.store.groupChats.get(this.groupChatHash).currentGroupChat.get();switch(t.status){case"pending":return l`
					<div class="column" style="gap: 8px">
						<sl-skeleton style="height: 32px; width: 100px"> </sl-skeleton>
						<sl-skeleton style="height: 32px; width: 100px"> </sl-skeleton>
						<sl-skeleton style="height: 32px; width: 100px"> </sl-skeleton>
					</div>
				`;case"error":return l`<display-error
					.headline=${u("Error fetching the info for this group")}
					.error=${t.error}
				></display-error>`;case"completed":return this.renderInfo(t.value.info)}}};ne.styles=[$e];Ie([v(pe("group-chat-hash"))],ne.prototype,"groupChatHash",2);Ie([ie({context:Ae,subscribe:!0})],ne.prototype,"store",2);ne=Ie([ue("group-info")],ne);function*De(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*at(De(t.shadowRoot.activeElement))))}function zt(){return[...De()].pop()}var re=[],It=class{constructor(t){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=e=>{var s;if(e.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const r=zt();if(this.previousFocus=r,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;e.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const a=Re(this.element);let i=a.findIndex(c=>c===r);this.previousFocus=this.currentFocus;const o=this.tabDirection==="forward"?1:-1;for(;;){i+o>=a.length?i=0:i+o<0?i=a.length-1:i+=o,this.previousFocus=this.currentFocus;const c=a[i];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||c&&this.possiblyHasTabbableChildren(c))return;e.preventDefault(),this.currentFocus=c,(s=this.currentFocus)==null||s.focus({preventScroll:!1});const f=[...De()];if(f.includes(this.currentFocus)||!f.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){re.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){re=re.filter(t=>t!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return re[re.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const t=Re(this.element);if(!this.element.matches(":focus-within")){const e=t[0],s=t[t.length-1],r=this.tabDirection==="forward"?e:s;typeof(r==null?void 0:r.focus)=="function"&&(this.currentFocus=r,r.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}},Me=new Set;function Dt(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Pt(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function Ge(t){if(Me.add(t),!document.documentElement.classList.contains("sl-scroll-lock")){const e=Dt()+Pt();let s=getComputedStyle(document.documentElement).scrollbarGutter;(!s||s==="auto")&&(s="stable"),e<2&&(s=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",s),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${e}px`)}}function Oe(t){Me.delete(t),Me.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}var Ft=se`
  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,W=class extends _e{constructor(){super(...arguments),this.hasSlotController=new He(this,"footer"),this.localize=new We(this),this.modal=new It(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.modal.isActive()&&this.open&&(t.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),Ge(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),Oe(this),this.removeOpenListeners()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const s=N(this,"dialog.denyClose",{dir:this.localize.dir()});X(this.panel,s.keyframes,s.options);return}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),Ge(this);const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([te(this.dialog),te(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});const e=N(this,"dialog.show",{dir:this.localize.dir()}),s=N(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([X(this.panel,e.keyframes,e.options),X(this.overlay,s.keyframes,s.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([te(this.dialog),te(this.overlay)]);const t=N(this,"dialog.hide",{dir:this.localize.dir()}),e=N(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([X(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),X(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,Oe(this);const s=this.originalTrigger;typeof(s==null?void 0:s.focus)=="function"&&setTimeout(()=>s.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,be(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,be(this,"sl-after-hide")}render(){return l`
      <div
        part="base"
        class=${le({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${Se(this.noHeader?this.label:void 0)}
          aria-labelledby=${Se(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":l`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};W.styles=[we,Ft];W.dependencies={"sl-icon-button":mt};g([j(".dialog")],W.prototype,"dialog",2);g([j(".dialog__panel")],W.prototype,"panel",2);g([j(".dialog__overlay")],W.prototype,"overlay",2);g([v({type:Boolean,reflect:!0})],W.prototype,"open",2);g([v({reflect:!0})],W.prototype,"label",2);g([v({attribute:"no-header",type:Boolean,reflect:!0})],W.prototype,"noHeader",2);g([ke("open",{waitUntilFirstUpdate:!0})],W.prototype,"handleOpenChange",1);Q("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});Q("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});Q("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});Q("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});Q("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});W.define("sl-dialog");var Tt=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,Pe=(t,e,s,r)=>{for(var a=r>1?void 0:r?Bt(e,s):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(a=(r?o(e,s,a):o(a))||a);return r&&a&&Tt(e,s,a),a};let de=class extends Ce(he){renderMember(t,e,s){const r=w(s.agents[0]);return l`
			<sl-dialog id="${r}" no-header style="--width: 20rem">
				<div class="column" style="gap: 12px">
					<div
						class="row"
						style="cursor: pointer; align-items:center; gap: 8px"
						@click=${async()=>{try{const a=await Ye(this.store.peerChatsForPeer.get(s.agents[0]));let i;a.length===0?i=await this.store.client.createPeerChat(s.agents[0]):i=a[0],this.dispatchEvent(new CustomEvent("peer-chat-selected",{bubbles:!0,composed:!0,detail:{peerChatHash:i}})),this.shadowRoot.getElementById(r).hide()}catch(a){console.error(a),O(u("Error sending direct message."))}}}
					>
						<sl-icon .src=${A(rt)}></sl-icon>

						<span>${u("Send direct message")}</span>
					</div>
					${!t&&!e.removed&&e.admin&&!s.admin?l`
								<div
									class="row"
									style="cursor: pointer; gap: 8px; align-items:center"
									@click=${async()=>{try{await this.store.groupChats.get(this.groupChatHash).promoteMemberToAdmin(s.agents),this.shadowRoot.getElementById(r).hide()}catch(a){console.error(a),O(u("Error making peer an admin."))}}}
								>
									<sl-icon .src=${A(ot)}></sl-icon>
									<span>${u("Make admin")}</span>
								</div>
							`:l``}
					${!t&&!e.removed&&e.admin&&s.admin?l`
								<div
									class="row"
									style="cursor: pointer; gap: 8px; align-items:center"
									@click=${async()=>{try{await this.store.groupChats.get(this.groupChatHash).demoteMemberFromAdmin(s.agents),this.shadowRoot.getElementById(r).hide()}catch(a){console.error(a),O(u("Error demoting member from admin."))}}}
								>
									<sl-icon .src=${A(lt)}></sl-icon>
									<span>${u("Remove admin role")}</span>
								</div>
							`:l``}
					${!t&&e.admin&&!e.removed?l`
								<div
									class="row"
									style="cursor: pointer; gap: 8px; align-items:center"
									@click=${async()=>{try{await this.store.groupChats.get(this.groupChatHash).removeMember(s.agents),this.shadowRoot.getElementById(r).hide()}catch(a){console.error(a),O(u("Error removing member."))}}}
								>
									<sl-icon .src=${A(Ke)}></sl-icon>
									<span>${u("Remove member")}</span>
								</div>
							`:l``}
				</div>
			</sl-dialog>
			<div
				@click=${()=>{if(s.agents.find(i=>w(i)===w(this.store.client.client.myPubKey)))return;this.shadowRoot.getElementById(r).show()}}
				class="row"
				style="cursor: pointer"
			>
				${s.profile?l`
							<div class="row" style="gap: 8px; flex: 1">
								<sl-avatar
									.image=${s.profile.avatar}
									.initials=${s.profile.name.slice(0,2)}
								>
								</sl-avatar>
								<span>${s.profile.name} </span>
							</div>
						`:l`
							<profile-list-item
								style="flex: 1"
								.agentPubKey=${s.agents[0]}
							></profile-list-item>
						`}
				${s.admin?l`<sl-tag>${u("Admin")}</sl-tag>`:l``}
			</div>
		`}renderMembers(t){const e=t.members.find(s=>s.agents.find(r=>w(r)===w(this.store.client.client.myPubKey)));return l`
			<div class="column" style="gap: 12px; flex: 1">
				${t.members.filter(s=>!s.removed).map(s=>this.renderMember(t.deleted,e,s))}
				${!t.deleted&&!e.removed&&(e.admin||!t.settings.only_admins_can_add_members)?l`
							<div
								class="row"
								style="align-items: center; gap: 8px; margin-top: 8px; cursor: pointer"
								@click=${()=>{this.dispatchEvent(new CustomEvent("add-members-clicked",{bubbles:!0,composed:!0}))}}
							>
								<sl-icon slot="prefix" .src=${A(nt)}>
								</sl-icon>
								${u("Add members")}
							</div>
						`:l``}
			</div>
		`}render(){const t=this.store.groupChats.get(this.groupChatHash).currentGroupChat.get();switch(t.status){case"pending":return l`
					<div class="column" style="gap: 8px">
						<profile-list-item-skeleton></profile-list-item-skeleton>
						<profile-list-item-skeleton></profile-list-item-skeleton>
						<profile-list-item-skeleton></profile-list-item-skeleton>
					</div>
				`;case"error":return l`<display-error
					.headline=${u("Error fetching the members for this group")}
					.error=${t.error}
				></display-error>`;case"completed":return this.renderMembers(t.value)}}};de.styles=[$e];Pe([v(pe("group-chat-hash"))],de.prototype,"groupChatHash",2);Pe([ie({context:Ae,subscribe:!0})],de.prototype,"store",2);de=Pe([ue("group-members")],de);var Rt=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,Fe=(t,e,s,r)=>{for(var a=r>1?void 0:r?Gt(e,s):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(a=(r?o(e,s,a):o(a))||a);return r&&a&&Rt(e,s,a),a};let ce=class extends Ce(he){async updateGroupSettings(t){try{await this.store.groupChats.get(this.groupChatHash).updateGroupChatSettings(t)}catch(e){console.log(e),O(u("Error updating the group's settings."))}}renderSettings(t,e){return l`
			<div class="column" style="gap: 8px">
				<sl-switch
					.disabled=${!t}
					.checked=${e.only_admins_can_edit_group_info}
					@sl-change=${s=>{this.updateGroupSettings({...e,only_admins_can_edit_group_info:s.target.checked})}}
					>${u("Only admins can edit group info")}
				</sl-switch>
				<sl-switch
					.disabled=${!t}
					.checked=${e.only_admins_can_add_members}
					@sl-change=${s=>{this.updateGroupSettings({...e,only_admins_can_add_members:s.target.checked})}}
					>${u("Only admins can add members")}
				</sl-switch>
				<sl-switch
					.disabled=${!t}
					.checked=${e.sync_message_history_with_new_members}
					@sl-change=${s=>{this.updateGroupSettings({...e,sync_message_history_with_new_members:s.target.checked})}}
					>${u("Sync message history with new members")}
				</sl-switch>
			</div>
		`}render(){const t=this.store.groupChats.get(this.groupChatHash).currentGroupChat.get();switch(t.status){case"pending":return l`
					<div class="column" style="gap: 8px">
						<sl-skeleton style="height: 32px; width: 100px"> </sl-skeleton>
						<sl-skeleton style="height: 32px; width: 100px"> </sl-skeleton>
						<sl-skeleton style="height: 32px; width: 100px"> </sl-skeleton>
					</div>
				`;case"error":return l`<display-error
					.headline=${u("Error fetching the settings for this group")}
					.error=${t.error}
				></display-error>`;case"completed":const e=t.value.members.find(s=>s.agents.find(r=>w(r)===w(this.store.client.client.myPubKey))).admin;return this.renderSettings(e,t.value.settings)}}};ce.styles=[$e];Fe([v(pe("group-chat-hash"))],ce.prototype,"groupChatHash",2);Fe([ie({context:Ae,subscribe:!0})],ce.prototype,"store",2);ce=Fe([ue("group-settings")],ce);var Ot=Object.defineProperty,Wt=Object.getOwnPropertyDescriptor,fe=(t,e,s,r)=>{for(var a=r>1?void 0:r?Wt(e,s):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(a=(r?o(e,s,a):o(a))||a);return r&&a&&Ot(e,s,a),a};const Ut=new St({lightness:[.1,.2,.3,.4]});let J=class extends Ce(he){constructor(){super(...arguments),this.view="chat"}renderEvent(t){switch(t.event.content.event.type){case"UpdateGroupInfo":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t.author)}
						&nbsp;${u(ae`updated the group's info.`)}
					</sl-tag>
				`;case"AddMember":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t.event.content.event.member_agents[0])}&nbsp;${u(ae`was added to the group.`)}
					</sl-tag>
				`;case"RemoveMember":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t.author)}
						&nbsp;${u("removed")}&nbsp;${this.renderAgentNickname(t.event.content.event.member_agents[0])}&nbsp;${u("from the group.")}
					</sl-tag>
				`;case"LeaveGroup":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t.author)}
						&nbsp;${u(ae`left the group.`)}
					</sl-tag>
				`;case"DeleteGroup":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t.author)}
						&nbsp;${u(ae`deleted the group.`)}
					</sl-tag>
				`}}renderTopBar(t){return l`
			<div
				part="top-bar"
				class="row top-bar"
				style="align-items: center; gap: 8px"
			>
				<slot name="top-bar-left-action"></slot>
				<div
					class="row"
					style="flex: 1; align-items: center; gap: 8px; cursor: pointer"
					@click=${()=>{this.view="details"}}
				>
					<show-avatar-image .imageHash=${t.info.avatar}>
					</show-avatar-image>
					<span>${t.info.name} </span>
				</div>
			</div>
		`}renderChat(t,e,s,r,a){const i=e.members.find(h=>!!h.agents.find(m=>w(m)===w(this.store.client.client.myPubKey))),o=e.members.filter(h=>!h.agents.find(m=>w(m)===w(this.store.client.client.myPubKey))),c=i.agents,f=o.map(h=>h.agents),y=Object.entries(r).filter(h=>{const m=h[1].event.content.event.type;return m==="UpdateGroupInfo"||m==="AddMember"||m==="RemoveMember"||m==="LeaveGroup"||m==="DeleteGroup"}).reduce((h,m)=>({...h,[m[0]]:m[1]}),{}),k=yt({...s,...y},[c,...f]),$=c.map(w),z=this.store.groupChats.get(this.groupChatHash).typingPeers.get();return l`<div class="column" style="flex: 1;">
			${this.renderTopBar(e)}
			<div part="chat" class="column" style="flex: 1; margin: 8px">
				<div class="flex-scrollable-parent">
					<div class="flex-scrollable-container">
						<div
							class="flex-scrollable-y"
							id="scrolling-chat"
							style="padding-right: 8px; padding-left: 8px; gap: 8px; flex: 1; display: flex; flex-direction: column-reverse"
							${Be(h=>{if(!h||i.removed)return;const m=[].concat(...k.map(E=>E.eventsSets)).filter(E=>!$.includes(w(E[0][1].author))),C=[];for(const E of m)for(const[Y,ge]of E)a.includes(Y)||C.push(Ze(Y));C.length>0&&this.store.groupChats.get(this.groupChatHash).markMessagesAsRead(C)})}
						>
							<div style="margin-bottom: 4px"></div>
							${this.renderTypingIndicators(z)}
							${k.map(h=>this.renderEventsSetsInDay($,h.day,h.eventsSets))}
							<div class="row" style="justify-content: center">
								<sl-tag style="align-self: center; margin: 8px">
									${u(ae`Group was created by`)}&nbsp;
									${this.renderAgentNickname(t.author)}
								</sl-tag>
							</div>
						</div>
					</div>
				</div>
				${e.deleted||i.removed?l``:l`
							<message-input
								@input=${()=>this.store.client.sendGroupChatTypingIndicator(this.groupChatHash,o.filter(h=>!h.removed).map(h=>h.agents))}
								@send-message=${h=>this.sendMessage(h.detail.message)}
							>
							</message-input>
						`}
			</div>
		</div> `}renderEventsSetsInDay(t,e,s){return l`
			<div class="column" style="gap: 8px; flex-direction: column-reverse">
				${s.map(r=>r[0][1].event.content.type==="GroupMessage"?t.includes(w(r[0][1].author))?this.renderMessageSetFromMe(r):this.renderMessageSetToMe(r):this.renderEvent(r[0][1]))}
				<div style="align-self: center">
					<sl-tag>
						<sl-format-date
							month="long"
							day="numeric"
							.date=${e}
						></sl-format-date>
					</sl-tag>
				</div>
			</div>
		`}renderTypingIndicators(t){return t.length===0?l``:l`
			<div
				class="column"
				${Be(e=>{const s=this.shadowRoot.getElementById("scrolling-chat");s.scrollHeight-s.offsetHeight-s.scrollTop<40&&setTimeout(()=>{s.scrollTo({top:s.scrollHeight,behavior:"smooth"})},40)})}
				style="gap: 4px; justify-content: start; margin-top:4px"
			>
				${t.map(e=>l`
						<div class="row" style="gap: 2px; align-items: center">
							<agent-avatar
								size="24"
								style="height: 24px"
								.agentPubKey=${e}
							></agent-avatar>
							<div class="typing-indicator">
								<span>...</span>
							</div>
						</div>
					`)}
			</div>
		`}renderMessageSetFromMe(t){const s=t[0][1].event.timestamp/1e3,r=new Date(s),a=Date.now()-s<60*1e3,i=Date.now()-s>46*60*1e3;return l`
			<div class="column from-me" style="flex-direction: column-reverse">
				${t.map(([o,c],f)=>l`
						<div
							class="message row"
							style="align-items: end; flex-wrap: wrap; gap: 16px;"
						>
							<span style="flex: 1; word-break: break-all"
								>${c.event.content.message.message}</span
							>
							${f===0?l`
										<div
											class="placeholder column"
											style="font-size: 12px; text-align: right"
										>
											<div style="flex: 1"></div>
											${a?l`<span>${u("now")}</span>`:i?l`
															<sl-format-date
																hour="numeric"
																minute="numeric"
																hour-format="24"
																.date=${r}
															></sl-format-date>
														`:l`
															<sl-relative-time
																style=""
																sync
																format="narrow"
																.date=${r}
															>
															</sl-relative-time>
														`}
										</div>
									`:l``}
						</div>
					`)}
			</div>
		`}renderAgentNickname(t){var s;const e=this.profilesProvider.currentProfileForAgent.get(t).get();return e.status!=="completed"||!e.value?l`${u("Profile not found.")}`:l`
			<span
				style=${dt({color:Ut.hex(w(t)),"font-weight":"bold"})}
				@click=${()=>{this.dispatchEvent(new CustomEvent("agent-selected",{bubbles:!0,composed:!0,detail:{agentPubKey:t}}))}}
				>${(s=e.value)==null?void 0:s.name}</span
			>
		`}renderMessageSetToMe(t){const e=t[0][1],s=e.event.timestamp/1e3,r=new Date(s),a=Date.now()-s<60*1e3,i=Date.now()-s>46*60*1e3;return l` <div class="row" style="gap: 8px; align-items: end">
			<agent-avatar .agentPubKey=${e.author}></agent-avatar>

			<div
				class="column"
				style="flex-direction: column-reverse; align-items: start"
			>
				${t.map(([o,c],f)=>l`

						<div class="colum message" style="gap:8px">
							${f===t.length-1?this.renderAgentNickname(c.author):l``}
							<div
								class="row"
								style="gap: 16px; align-items: end; flex-wrap: wrap; "
							>
								<span style="flex: 1; word-break: break-all"
									>${c.event.content.message.message}</span
								>
								${f===0?l`
												<div
													class="placeholder column"
													style="font-size: 12px; text-align: right"
												>
													<div style="flex: 1"></div>
													${a?l`<span>${u("now")}</span>`:i?l`
																	<sl-format-date
																		hour="numeric"
																		minute="numeric"
																		hour-format="24"
																		.date=${r}
																	></sl-format-date>
																`:l`
																	<sl-relative-time
																		style=""
																		sync
																		format="narrow"
																		.date=${r}
																	>
																	</sl-relative-time>
																`}
												</div>
											`:l``}
							</div>
						</div>
					</div>
				`)}
			</div>
		</div>`}async sendMessage(t){try{await this.store.groupChats.get(this.groupChatHash).sendMessage(t),this.shadowRoot.getElementById("scrolling-chat").scrollTo({top:0,behavior:"smooth"})}catch(e){console.error(e),O(u("Error sending the message"))}}groupInfo(){const t=this.store.groupChats.get(this.groupChatHash);return et([t.originalGroupChat.get(),t.currentGroupChat.get(),t.messages.get(),t.events.get(),t.readMessages.get()])}async updateGroupInfo(t){try{await this.store.groupChats.get(this.groupChatHash).updateGroupChatInfo({avatar:t.avatar==="null"?void 0:t.avatar,name:t.name,description:t.description}),this.view="details"}catch(e){console.log(e),O(u("Error updating the group's info."))}}get usersToBeAdded(){var e;const t=(e=this.shadowRoot)==null?void 0:e.getElementById("users");if(t)return t.value}async addMembers(){try{const t=this.usersToBeAdded;for(const e of t)await this.store.groupChats.get(this.groupChatHash).addMember(e);this.view="details"}catch(t){console.log(t),O(u("Error adding members."))}}renderAddMembers(t){return l`
			<div class="column" style="flex: 1">
				<div
					part="top-bar"
					class="row top-bar"
					style="gap: 8px; align-items: center"
				>
					<sl-icon-button
						.src=${A(Ee)}
						@click=${()=>{this.view="details"}}
					></sl-icon-button>
					<span>${u("Add Members")}</span>
				</div>

				<div class="row" style="justify-content: center; flex: 1; margin: 8px">
					<div class="column" style="gap: 8px; flex-basis: 500px">
						<div class="flex-scrollable-parent">
							<div class="flex-scrollable-container">
								<div class="flex-scrollable-y">
									<search-users
										id="profiles"
										.excludedUsers=${t.members.filter(e=>!e.removed).map(e=>e.agents)}
										@user-selected=${e=>{this.requestUpdate()}}
									>
									</search-users>
								</div>
							</div>
						</div>

						<div style="flex: 1"></div>

						<sl-button
							variant="primary"
							.disabled=${this.usersToBeAdded&&this.usersToBeAdded.length===0}
							@click=${()=>{this.addMembers()}}
							>${u("Add Members")}
						</sl-button>
					</div>
				</div>
			</div>
		`}renderEditInfo(t){return l`
			<form
				class="column"
				style="flex: 1"
				${vt(e=>this.updateGroupInfo(e))}
			>
				<div
					part="top-bar"
					class="row top-bar"
					style="gap: 8px; align-items: center "
				>
					<sl-icon-button
						.src=${A(Ee)}
						@click=${()=>{this.view="details"}}
					></sl-icon-button>
					<span>${u("Edit Group Info")}</span>
				</div>

				<div class="row" style="justify-content: center; flex: 1; margin: 8px">
					<div class="column" style="gap: 8px; flex-basis: 500px">
						<upload-avatar name="avatar" .value=${t.avatar}></upload-avatar>
						<sl-input
							required
							.label=${u("Name")}
							name="name"
							.value=${t.name}
						></sl-input>
						<sl-input
							.label=${u("Description")}
							name="description"
							.value=${t.description}
						></sl-input>
						<div style="flex: 1"></div>
						<sl-button type="submit" variant="primary"
							>${u("Save")}
						</sl-button>
					</div>
				</div>
			</form>
		`}renderDetails(t){const e=t.members.find(s=>s.agents.find(r=>w(r)===w(this.store.client.client.myPubKey)));return l`
			<div class="column" style="flex: 1">
				<div part="top-bar" class="row top-bar" style="align-items: center;">
					<sl-icon-button
						.src=${A(Ee)}
						@click=${()=>{this.view="chat"}}
					></sl-icon-button>
					<span>${u("Group Info")}</span>
					<div style="flex: 1"></div>

					${!t.deleted&&!e.removed&&(e.admin||!t.settings.only_admins_can_edit_group_info)?l`
								<sl-button
									@click=${()=>{this.view="edit-info"}}
									variant="text"
									style="margin: -8px"
								>
									<sl-icon slot="prefix" .src=${A(ct)}>
									</sl-icon>
									${u("Edit")}
								</sl-button>
							`:l``}
				</div>
				<div class="flex-scrollable-parent">
					<div class="flex-scrollable-container">
						<div class="flex-scrollable-y">
							<div
								class="row"
								style="justify-content: center; flex: 1; margin: 8px"
							>
								<div class="column" style="gap: 8px; flex-basis: 500px">
									<group-info .groupChatHash=${this.groupChatHash}></group-info>

									<sl-card>
										<group-members
											style="flex: 1"
											.groupChatHash=${this.groupChatHash}
											@add-members-clicked=${()=>{this.view="add-members"}}
										></group-members>
									</sl-card>

									${t.deleted?l``:l` <sl-details .summary=${u("Settings")}>
												<group-settings
													.groupChatHash=${this.groupChatHash}
												></group-settings>
											</sl-details>`}
									${!t.deleted&&!e.removed?l`
												<sl-dialog
													id="leave-group-dialog"
													.label=${u("leave Group")}
												>
													<span
														>${u("Are you sure you want to leave this group?")}
													</span>
													<sl-button
														slot="footer"
														@click=${async()=>{try{await this.store.groupChats.get(this.groupChatHash).leaveGroup()}catch(s){console.log(s),O(u("Error leaving the group."))}}}
														variant="danger"
														>${u("Leave Group")}
													</sl-button>
												</sl-dialog>
												<sl-button
													variant="danger"
													outline
													@click=${async()=>{this.shadowRoot.getElementById("leave-group-dialog").show()}}
												>
													<sl-icon
														slot="prefix"
														.src=${A(ht)}
													>
													</sl-icon>
													${u("Leave group")}
												</sl-button>
											`:l``}
									${e.admin&&!e.removed&&!t.deleted?l`<sl-dialog
													id="delete-group-dialog"
													.label=${u("Delete Group")}
												>
													<span
														>${u("Are you sure you want to delete this group?")}
													</span>
													<sl-button
														slot="footer"
														@click=${async()=>{try{await this.store.groupChats.get(this.groupChatHash).deleteGroupChat()}catch(s){console.log(s),O(u("Error deleting the group."))}}}
														variant="danger"
														>${u("Delete Group")}
													</sl-button>
												</sl-dialog>
												<sl-button
													variant="danger"
													outline
													@click=${async()=>{this.shadowRoot.getElementById("delete-group-dialog").show()}}
												>
													<sl-icon
														slot="prefix"
														.src=${A(Ke)}
													>
													</sl-icon>
													${u("Delete group")}
												</sl-button> `:l``}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`}renderView(t,e,s,r,a){switch(this.view){case"chat":return this.renderChat(t,e,s,r,a);case"details":return this.renderDetails(e);case"add-members":return this.renderAddMembers(e);case"edit-info":return this.renderEditInfo(e.info)}}render(){const t=this.groupInfo();switch(t.status){case"pending":return l`
					<sl-skeleton
						style="height: 32px; width: 32px; --border-radius: 8px"
						effect="pulse"
					></sl-skeleton>
				`;case"error":return l`<display-error
					.headline=${u("Error fetching the messages")}
					.error=${t.error}
				></display-error>`;case"completed":const[e,s,r,a,i]=t.value;return this.renderView(e,s,r,a,i.myReadMessages)}}};J.styles=[$e,se`
			:host {
				display: flex;
				font-size: 14px;
			}
			sl-tag {
				max-width: 250px;
			}
		`];fe([v(pe("group-chat-hash"))],J.prototype,"groupChatHash",2);fe([ie({context:Ae,subscribe:!0})],J.prototype,"store",2);fe([Ue()],J.prototype,"view",2);fe([ie({context:Je,subscribe:!0}),v()],J.prototype,"profilesProvider",2);J=fe([Le(),ue("group-chat")],J);export{J as GroupChatEl};
