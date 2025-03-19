import{a as y,c as de,t as ye,p as qe}from"./property.CdyGxQ3i.js";import{c as be,S as xe,e as re,k as Ne,_ as g,f as G,w as we,s as Q,L as Ue,h as te,i as V,j as X,p as Fe,g as ve,r as Ke,b as _e,n as ke,a as C,q as Ve,t as Xe,u as Je,v as Qe,x as Ye,o as je,m as Ze,y as et,z as tt,A as Te,B as Ie,C as st,l as it}from"./styles.ChGdpW6H.js";import{i as ce,x as l,r as $e,m as u,f as b,t as at,g as se,j as rt,k as ot}from"./messenger-client.CJVut2Sl.js";import{H as Me,f as lt,d as nt,F as dt,o as Ee,l as ct,b as ht,a as W,n as Be}from"./chunk.UG6RICOR.b7ztLsiC.js";import"./chunk.UJ4C5V3J.VdG0d-v6.js";import{a as Re,o as ut}from"./select-avatar.BIQpEifb.js";import{o as pt}from"./message-input.BZU1VbQz.js";import{S as Ce}from"./signal-watcher.CwHglHdS.js";import{m as Ae}from"./context.Cfnzkp14.js";import"./tslib.es6.kHcLnhpD.js";var ft=ce`
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
`,Ge=class extends xe{constructor(){super(...arguments),this.hasSlotController=new Me(this,"footer","header","image")}render(){return l`
      <div
        part="base"
        class=${re({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};Ge.styles=[be,ft];Ge.define("sl-card");var gt=ce`
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
`,z=class extends xe{constructor(){super(...arguments),this.localize=new Ue(this),this.open=!1,this.disabled=!1}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(const e of t)e.type==="attributes"&&e.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.detailsObserver)==null||t.disconnect()}handleSummaryClick(t){t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show())}async handleOpenChange(){if(this.open){if(this.details.open=!0,this.emit("sl-show",{cancelable:!0}).defaultPrevented){this.open=!1,this.details.open=!1;return}await te(this.body);const{keyframes:e,options:s}=V(this,"details.show",{dir:this.localize.dir()});await X(this.body,Fe(e,this.body.scrollHeight),s),this.body.style.height="auto",this.emit("sl-after-show")}else{if(this.emit("sl-hide",{cancelable:!0}).defaultPrevented){this.details.open=!0,this.open=!0;return}await te(this.body);const{keyframes:e,options:s}=V(this,"details.hide",{dir:this.localize.dir()});await X(this.body,Fe(e,this.body.scrollHeight),s),this.body.style.height="auto",this.details.open=!1,this.emit("sl-after-hide")}}async show(){if(!(this.open||this.disabled))return this.open=!0,ve(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,ve(this,"sl-after-hide")}render(){const t=this.localize.dir()==="rtl";return l`
      <details
        part="base"
        class=${re({details:!0,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":t})}
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
    `}};z.styles=[be,gt];z.dependencies={"sl-icon":Ne};g([G(".details")],z.prototype,"details",2);g([G(".details__header")],z.prototype,"header",2);g([G(".details__body")],z.prototype,"body",2);g([G(".details__expand-icon-slot")],z.prototype,"expandIconSlot",2);g([y({type:Boolean,reflect:!0})],z.prototype,"open",2);g([y()],z.prototype,"summary",2);g([y({type:Boolean,reflect:!0})],z.prototype,"disabled",2);g([we("open",{waitUntilFirstUpdate:!0})],z.prototype,"handleOpenChange",1);Q("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});Q("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});z.define("sl-details");var mt=ce`
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
`,_=class extends xe{constructor(){super(...arguments),this.formControlController=new dt(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new Me(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!t;return l`
      <div
        class=${re({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${re({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${Ee(this.value)}
            .checked=${ct(this.checked)}
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
    `}};_.styles=[be,lt,mt];g([G('input[type="checkbox"]')],_.prototype,"input",2);g([Ke()],_.prototype,"hasFocus",2);g([y()],_.prototype,"title",2);g([y()],_.prototype,"name",2);g([y()],_.prototype,"value",2);g([y({reflect:!0})],_.prototype,"size",2);g([y({type:Boolean,reflect:!0})],_.prototype,"disabled",2);g([y({type:Boolean,reflect:!0})],_.prototype,"checked",2);g([nt("checked")],_.prototype,"defaultChecked",2);g([y({reflect:!0})],_.prototype,"form",2);g([y({type:Boolean,reflect:!0})],_.prototype,"required",2);g([y({attribute:"help-text"})],_.prototype,"helpText",2);g([we("checked",{waitUntilFirstUpdate:!0})],_.prototype,"handleCheckedChange",1);g([we("disabled",{waitUntilFirstUpdate:!0})],_.prototype,"handleDisabledChange",1);_.define("sl-switch");var p=function(t,e,s){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,s),s},n=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)},U,q,M,Z,ae,P,D,F,T,I,B,R,O,N,ee,K,ge,j;const vt=function(t){var e=131,s=137,r=0;t+="x";var i=Math.floor(9007199254740991/s);for(let a=0;a<t.length;a++)r>i&&(r=Math.floor(r/s)),r=r*e+t.charCodeAt(a);return r},d="0123456789abcdef".split(""),yt=[-2147483648,8388608,32768,128],S=[24,16,8,0],fe=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],w=[];class bt{constructor(e=!1,s=!1){U.set(this,void 0),q.set(this,void 0),M.set(this,void 0),Z.set(this,void 0),ae.set(this,void 0),P.set(this,void 0),D.set(this,void 0),F.set(this,void 0),T.set(this,void 0),I.set(this,void 0),B.set(this,void 0),R.set(this,void 0),O.set(this,void 0),N.set(this,void 0),ee.set(this,void 0),K.set(this,void 0),ge.set(this,0),j.set(this,void 0),this.init(e,s)}init(e,s){s?(w[0]=w[16]=w[1]=w[2]=w[3]=w[4]=w[5]=w[6]=w[7]=w[8]=w[9]=w[10]=w[11]=w[12]=w[13]=w[14]=w[15]=0,p(this,q,w)):p(this,q,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),e?(p(this,P,3238371032),p(this,D,914150663),p(this,F,812702999),p(this,T,4144912697),p(this,I,4290775857),p(this,B,1750603025),p(this,R,1694076839),p(this,O,3204075428)):(p(this,P,1779033703),p(this,D,3144134277),p(this,F,1013904242),p(this,T,2773480762),p(this,I,1359893119),p(this,B,2600822924),p(this,R,528734635),p(this,O,1541459225)),p(this,U,p(this,j,p(this,M,p(this,ee,0)))),p(this,Z,p(this,N,!1)),p(this,ae,!0),p(this,K,e)}update(e){if(n(this,Z))return this;let s;e instanceof ArrayBuffer?s=new Uint8Array(e):s=e;let r=0;const i=s.length,a=n(this,q);for(;r<i;){let o;if(n(this,N)&&(p(this,N,!1),a[0]=n(this,U),a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),typeof s!="string")for(o=n(this,j);r<i&&o<64;++r)a[o>>2]|=s[r]<<S[o++&3];else for(o=n(this,j);r<i&&o<64;++r){let c=s.charCodeAt(r);c<128?a[o>>2]|=c<<S[o++&3]:c<2048?(a[o>>2]|=(192|c>>6)<<S[o++&3],a[o>>2]|=(128|c&63)<<S[o++&3]):c<55296||c>=57344?(a[o>>2]|=(224|c>>12)<<S[o++&3],a[o>>2]|=(128|c>>6&63)<<S[o++&3],a[o>>2]|=(128|c&63)<<S[o++&3]):(c=65536+((c&1023)<<10|s.charCodeAt(++r)&1023),a[o>>2]|=(240|c>>18)<<S[o++&3],a[o>>2]|=(128|c>>12&63)<<S[o++&3],a[o>>2]|=(128|c>>6&63)<<S[o++&3],a[o>>2]|=(128|c&63)<<S[o++&3])}p(this,ge,o),p(this,M,n(this,M)+(o-n(this,j))),o>=64?(p(this,U,a[16]),p(this,j,o-64),this.hash(),p(this,N,!0)):p(this,j,o)}return n(this,M)>4294967295&&(p(this,ee,n(this,ee)+(n(this,M)/4294967296<<0)),p(this,M,n(this,M)%4294967296)),this}finalize(){if(n(this,Z))return;p(this,Z,!0);const e=n(this,q),s=n(this,ge);e[16]=n(this,U),e[s>>2]|=yt[s&3],p(this,U,e[16]),s>=56&&(n(this,N)||this.hash(),e[0]=n(this,U),e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0),e[14]=n(this,ee)<<3|n(this,M)>>>29,e[15]=n(this,M)<<3,this.hash()}hash(){let e=n(this,P),s=n(this,D),r=n(this,F),i=n(this,T),a=n(this,I),o=n(this,B),c=n(this,R),f=n(this,O);const v=n(this,q);let k,$,H,h,m,A,E,Y,ue,pe;for(let x=16;x<64;++x)h=v[x-15],k=(h>>>7|h<<25)^(h>>>18|h<<14)^h>>>3,h=v[x-2],$=(h>>>17|h<<15)^(h>>>19|h<<13)^h>>>10,v[x]=v[x-16]+k+v[x-7]+$<<0;pe=s&r;for(let x=0;x<64;x+=4)n(this,ae)?(n(this,K)?(E=300032,h=v[0]-1413257819,f=h-150054599<<0,i=h+24177077<<0):(E=704751109,h=v[0]-210244248,f=h-1521486534<<0,i=h+143694565<<0),p(this,ae,!1)):(k=(e>>>2|e<<30)^(e>>>13|e<<19)^(e>>>22|e<<10),$=(a>>>6|a<<26)^(a>>>11|a<<21)^(a>>>25|a<<7),E=e&s,H=E^e&r^pe,A=a&o^~a&c,h=f+$+A+fe[x]+v[x],m=k+H,f=i+h<<0,i=h+m<<0),k=(i>>>2|i<<30)^(i>>>13|i<<19)^(i>>>22|i<<10),$=(f>>>6|f<<26)^(f>>>11|f<<21)^(f>>>25|f<<7),Y=i&e,H=Y^i&s^E,A=f&a^~f&o,h=c+$+A+fe[x+1]+v[x+1],m=k+H,c=r+h<<0,r=h+m<<0,k=(r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10),$=(c>>>6|c<<26)^(c>>>11|c<<21)^(c>>>25|c<<7),ue=r&i,H=ue^r&e^Y,A=c&f^~c&a,h=o+$+A+fe[x+2]+v[x+2],m=k+H,o=s+h<<0,s=h+m<<0,k=(s>>>2|s<<30)^(s>>>13|s<<19)^(s>>>22|s<<10),$=(o>>>6|o<<26)^(o>>>11|o<<21)^(o>>>25|o<<7),pe=s&r,H=pe^s&i^ue,A=o&c^~o&f,h=a+$+A+fe[x+3]+v[x+3],m=k+H,a=e+h<<0,e=h+m<<0;p(this,P,n(this,P)+e<<0),p(this,D,n(this,D)+s<<0),p(this,F,n(this,F)+r<<0),p(this,T,n(this,T)+i<<0),p(this,I,n(this,I)+a<<0),p(this,B,n(this,B)+o<<0),p(this,R,n(this,R)+c<<0),p(this,O,n(this,O)+f<<0)}hex(){this.finalize();const e=n(this,P),s=n(this,D),r=n(this,F),i=n(this,T),a=n(this,I),o=n(this,B),c=n(this,R),f=n(this,O);let v=d[e>>28&15]+d[e>>24&15]+d[e>>20&15]+d[e>>16&15]+d[e>>12&15]+d[e>>8&15]+d[e>>4&15]+d[e&15]+d[s>>28&15]+d[s>>24&15]+d[s>>20&15]+d[s>>16&15]+d[s>>12&15]+d[s>>8&15]+d[s>>4&15]+d[s&15]+d[r>>28&15]+d[r>>24&15]+d[r>>20&15]+d[r>>16&15]+d[r>>12&15]+d[r>>8&15]+d[r>>4&15]+d[r&15]+d[i>>28&15]+d[i>>24&15]+d[i>>20&15]+d[i>>16&15]+d[i>>12&15]+d[i>>8&15]+d[i>>4&15]+d[i&15]+d[a>>28&15]+d[a>>24&15]+d[a>>20&15]+d[a>>16&15]+d[a>>12&15]+d[a>>8&15]+d[a>>4&15]+d[a&15]+d[o>>28&15]+d[o>>24&15]+d[o>>20&15]+d[o>>16&15]+d[o>>12&15]+d[o>>8&15]+d[o>>4&15]+d[o&15]+d[c>>28&15]+d[c>>24&15]+d[c>>20&15]+d[c>>16&15]+d[c>>12&15]+d[c>>8&15]+d[c>>4&15]+d[c&15];return n(this,K)||(v+=d[f>>28&15]+d[f>>24&15]+d[f>>20&15]+d[f>>16&15]+d[f>>12&15]+d[f>>8&15]+d[f>>4&15]+d[f&15]),v}toString(){return this.hex()}digest(){this.finalize();const e=n(this,P),s=n(this,D),r=n(this,F),i=n(this,T),a=n(this,I),o=n(this,B),c=n(this,R),f=n(this,O),v=[e>>24&255,e>>16&255,e>>8&255,e&255,s>>24&255,s>>16&255,s>>8&255,s&255,r>>24&255,r>>16&255,r>>8&255,r&255,i>>24&255,i>>16&255,i>>8&255,i&255,a>>24&255,a>>16&255,a>>8&255,a&255,o>>24&255,o>>16&255,o>>8&255,o&255,c>>24&255,c>>16&255,c>>8&255,c&255];return n(this,K)||v.push(f>>24&255,f>>16&255,f>>8&255,f&255),v}array(){return this.digest()}arrayBuffer(){this.finalize();const e=new ArrayBuffer(n(this,K)?28:32),s=new DataView(e);return s.setUint32(0,n(this,P)),s.setUint32(4,n(this,D)),s.setUint32(8,n(this,F)),s.setUint32(12,n(this,T)),s.setUint32(16,n(this,I)),s.setUint32(20,n(this,B)),s.setUint32(24,n(this,R)),n(this,K)||s.setUint32(28,n(this,O)),e}}U=new WeakMap,q=new WeakMap,M=new WeakMap,Z=new WeakMap,ae=new WeakMap,P=new WeakMap,D=new WeakMap,F=new WeakMap,T=new WeakMap,I=new WeakMap,B=new WeakMap,R=new WeakMap,O=new WeakMap,N=new WeakMap,ee=new WeakMap,K=new WeakMap,ge=new WeakMap,j=new WeakMap;function xt(t){const e=new bt;return e.update(t),parseInt(e.hex().substring(0,8),16)}const wt=function(t){var e="#";return t.forEach(function(s){s<16&&(e+=0),e+=s.toString(16)}),e},_t=function(t,e,s){t/=360;var r=s<.5?s*(1+e):s+e-s*e,i=2*s-r;return[t+1/3,t,t-1/3].map(function(a){return a<0&&a++,a>1&&a--,a<1/6?a=i+(r-i)*6*a:a<.5?a=r:a<2/3?a=i+(r-i)*6*(2/3-a):a=i,Math.round(a*255)})};class Oe{constructor(e={}){const[s,r]=[e.lightness,e.saturation].map(function(i){return i=i!==void 0?i:[.35,.5,.65],Array.isArray(i)?i.concat():[i]});this.L=s,this.S=r,typeof e.hue=="number"&&(e.hue={min:e.hue,max:e.hue}),typeof e.hue=="object"&&!Array.isArray(e.hue)&&(e.hue=[e.hue]),typeof e.hue>"u"&&(e.hue=[]),this.hueRanges=e.hue.map(function(i){return{min:typeof i.min>"u"?0:i.min,max:typeof i.max>"u"?360:i.max}}),this.hash=xt,typeof e.hash=="function"&&(this.hash=e.hash),e.hash==="bkdr"&&(this.hash=vt)}hsl(e){var s,r,i,a=this.hash(e),o=727;if(this.hueRanges.length){const c=this.hueRanges[a%this.hueRanges.length];s=a/this.hueRanges.length%o*(c.max-c.min)/o+c.min}else s=a%359;return a=Math.ceil(a/360),r=this.S[a%this.S.length],a=Math.ceil(a/this.S.length),i=this.L[a%this.L.length],[s,r,i]}rgb(e){var s=this.hsl(e);return _t.apply(this,s)}hex(e){var s=this.rgb(e);return wt(s)}}var kt=Object.defineProperty,$t=Object.getOwnPropertyDescriptor,ze=(t,e,s,r)=>{for(var i=r>1?void 0:r?$t(e,s):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(i=(r?o(e,s,i):o(i))||i);return r&&i&&kt(e,s,i),i};let oe=class extends Ce($e){renderInfo(t){return l`
			<div class="column" style="gap: 16px;">
				${t.avatar?l`
							<img
								src="${t.avatar}"
								style="height: 150px; object-fit: cover"
							/>
						`:l`<sl-icon
							.src=${C(Ve)}
							style="font-size: 64px; border-radius: 50%; align-self: center; height: 150px"
							class="placeholder"
						></sl-icon>`}
				<div class="row">
					<div class="column" style="gap: 8px; flex: 1">
						<span class="title" style="flex: 1">${t.name}</span>
						${t.description?l` <span class="placeholder">${t.description}</span> `:l``}
					</div>
					<slot name="action"></slot>
				</div>
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
				></display-error>`;case"completed":return this.renderInfo(t.value.info)}}};oe.styles=[_e];ze([y(ke("group-chat-hash"))],oe.prototype,"groupChatHash",2);ze([de({context:Ae,subscribe:!0})],oe.prototype,"store",2);oe=ze([ye("group-info")],oe);function*He(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*Xe(He(t.shadowRoot.activeElement))))}function Ct(){return[...He()].pop()}var ie=[],At=class{constructor(t){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=e=>{var s;if(e.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const r=Ct();if(this.previousFocus=r,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;e.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const i=Re(this.element);let a=i.findIndex(c=>c===r);this.previousFocus=this.currentFocus;const o=this.tabDirection==="forward"?1:-1;for(;;){a+o>=i.length?a=0:a+o<0?a=i.length-1:a+=o,this.previousFocus=this.currentFocus;const c=i[a];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||c&&this.possiblyHasTabbableChildren(c))return;e.preventDefault(),this.currentFocus=c,(s=this.currentFocus)==null||s.focus({preventScroll:!1});const f=[...He()];if(f.includes(this.currentFocus)||!f.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){ie.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){ie=ie.filter(t=>t!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return ie[ie.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const t=Re(this.element);if(!this.element.matches(":focus-within")){const e=t[0],s=t[t.length-1],r=this.tabDirection==="forward"?e:s;typeof(r==null?void 0:r.focus)=="function"&&(this.currentFocus=r,r.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}},Se=new Set;function Et(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function St(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function We(t){if(Se.add(t),!document.documentElement.classList.contains("sl-scroll-lock")){const e=Et()+St();let s=getComputedStyle(document.documentElement).scrollbarGutter;(!s||s==="auto")&&(s="stable"),e<2&&(s=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",s),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${e}px`)}}function Le(t){Se.delete(t),Se.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}var Mt=ce`
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
`,L=class extends xe{constructor(){super(...arguments),this.hasSlotController=new Me(this,"footer"),this.localize=new Ue(this),this.modal=new At(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.modal.isActive()&&this.open&&(t.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),We(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),Le(this),this.removeOpenListeners()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const s=V(this,"dialog.denyClose",{dir:this.localize.dir()});X(this.panel,s.keyframes,s.options);return}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),We(this);const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([te(this.dialog),te(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});const e=V(this,"dialog.show",{dir:this.localize.dir()}),s=V(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([X(this.panel,e.keyframes,e.options),X(this.overlay,s.keyframes,s.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([te(this.dialog),te(this.overlay)]);const t=V(this,"dialog.hide",{dir:this.localize.dir()}),e=V(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([X(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),X(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,Le(this);const s=this.originalTrigger;typeof(s==null?void 0:s.focus)=="function"&&setTimeout(()=>s.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,ve(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,ve(this,"sl-after-hide")}render(){return l`
      <div
        part="base"
        class=${re({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${Ee(this.noHeader?this.label:void 0)}
          aria-labelledby=${Ee(this.noHeader?void 0:"title")}
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
    `}};L.styles=[be,Mt];L.dependencies={"sl-icon-button":ht};g([G(".dialog")],L.prototype,"dialog",2);g([G(".dialog__panel")],L.prototype,"panel",2);g([G(".dialog__overlay")],L.prototype,"overlay",2);g([y({type:Boolean,reflect:!0})],L.prototype,"open",2);g([y({reflect:!0})],L.prototype,"label",2);g([y({attribute:"no-header",type:Boolean,reflect:!0})],L.prototype,"noHeader",2);g([we("open",{waitUntilFirstUpdate:!0})],L.prototype,"handleOpenChange",1);Q("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});Q("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});Q("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});Q("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});Q("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});L.define("sl-dialog");var zt=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,Pe=(t,e,s,r)=>{for(var i=r>1?void 0:r?Ht(e,s):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(i=(r?o(e,s,i):o(i))||i);return r&&i&&zt(e,s,i),i};let le=class extends Ce($e){renderMember(t,e,s){const r=b(s.agents[0]);return l`
			<sl-dialog id="${r}" no-header style="--width: 20rem">
				<div class="column" style="gap: 12px">
					<div
						class="row"
						style="cursor: pointer; align-items:center; gap: 8px"
						@click=${async()=>{try{const i=await at(this.store.peerChatsForPeer.get(s.agents[0]));let a;i.length===0?a=await this.store.client.createPeerChat(s.agents[0]):a=i[0],this.dispatchEvent(new CustomEvent("peer-chat-selected",{bubbles:!0,composed:!0,detail:{peerChatHash:a}})),this.shadowRoot.getElementById(r).hide()}catch(i){console.error(i),W(u("Error sending direct message."))}}}
					>
						<sl-icon .src=${C(Je)}></sl-icon>

						<span>${u("Send direct message")}</span>
					</div>
					${!t&&!e.removed&&e.admin&&!s.admin?l`
								<div
									class="row"
									style="cursor: pointer; gap: 8px; align-items:center"
									@click=${async()=>{try{await this.store.groupChats.get(this.groupChatHash).promoteMemberToAdmin(s.agents),this.shadowRoot.getElementById(r).hide()}catch(i){console.error(i),W(u("Error making peer an admin."))}}}
								>
									<sl-icon .src=${C(Qe)}></sl-icon>
									<span>${u("Make admin")}</span>
								</div>
							`:l``}
					${!t&&!e.removed&&e.admin&&s.admin?l`
								<div
									class="row"
									style="cursor: pointer; gap: 8px; align-items:center"
									@click=${async()=>{try{await this.store.groupChats.get(this.groupChatHash).demoteMemberFromAdmin(s.agents),this.shadowRoot.getElementById(r).hide()}catch(i){console.error(i),W(u("Error demoting member from admin."))}}}
								>
									<sl-icon .src=${C(Ye)}></sl-icon>
									<span>${u("Remove admin role")}</span>
								</div>
							`:l``}
					${!t&&e.admin&&!e.removed?l`
								<div
									class="row"
									style="cursor: pointer; gap: 8px; align-items:center"
									@click=${async()=>{try{await this.store.groupChats.get(this.groupChatHash).removeMember(s.agents);const i=this.shadowRoot.getElementById(r);i==null||i.hide()}catch(i){console.error(i),W(u("Error removing member."))}}}
								>
									<sl-icon .src=${C(je)}></sl-icon>
									<span>${u("Remove member")}</span>
								</div>
							`:l``}
				</div>
			</sl-dialog>
			<div
				@click=${()=>{if(s.agents.find(a=>b(a)===b(this.store.client.client.myPubKey)))return;this.shadowRoot.getElementById(r).show()}}
				class="row"
				style="cursor: pointer"
			>
				${s.profile?l`
							<div class="row" style="gap: 8px; flex: 1; align-items: center">
								<sl-avatar
									.image=${s.profile.avatar}
									.initials=${s.profile.name.slice(0,2)}
									style="--size: 32px"
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
		`}renderMembers(t){if(t.members.length===0)return l`<div
				class="column placeholder"
				style="flex: 1; align-items: center; justify-content: center; gap: 8px"
			>
				<sl-icon
					.src=${C(Ze)}
					style="font-size: 64px;"
				></sl-icon>
				<span>${u("This group has no members.")}</span>
			</div>`;const e=t.members.find(s=>s.agents.find(r=>b(r)===b(this.store.client.client.myPubKey)));return l`
			<div class="column" style="gap: 12px; flex: 1">
				${t.members.filter(s=>!s.removed).map(s=>this.renderMember(t.deleted,e,s))}
				${!t.deleted&&!e.removed&&(e.admin||!t.settings.only_admins_can_add_members)?l`
							<sl-button
								variant="primary"
								style="margin-top: 8px"
								outline
								@click=${()=>{this.dispatchEvent(new CustomEvent("add-members-clicked",{bubbles:!0,composed:!0}))}}
							>
								<sl-icon slot="prefix" .src=${C(et)}>
								</sl-icon>
								${u("Add members")}
							</sl-button>
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
				></display-error>`;case"completed":return this.renderMembers(t.value)}}};le.styles=[_e];Pe([y(ke("group-chat-hash"))],le.prototype,"groupChatHash",2);Pe([de({context:Ae,subscribe:!0})],le.prototype,"store",2);le=Pe([ye("group-members")],le);var Pt=Object.defineProperty,Dt=Object.getOwnPropertyDescriptor,De=(t,e,s,r)=>{for(var i=r>1?void 0:r?Dt(e,s):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(i=(r?o(e,s,i):o(i))||i);return r&&i&&Pt(e,s,i),i};let ne=class extends Ce($e){async updateGroupSettings(t){try{await this.store.groupChats.get(this.groupChatHash).updateGroupChatSettings(t)}catch(e){console.log(e),W(u("Error updating the group's settings."))}}renderSettings(t,e){return l`
			<div class="column" style="gap: 16px">
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
				></display-error>`;case"completed":const e=t.value.members.find(r=>r.agents.find(i=>b(i)===b(this.store.client.client.myPubKey))),s=e.admin&&!e.removed;return this.renderSettings(s,t.value.settings)}}};ne.styles=[_e];De([y(ke("group-chat-hash"))],ne.prototype,"groupChatHash",2);De([de({context:Ae,subscribe:!0})],ne.prototype,"store",2);ne=De([ye("group-settings")],ne);var Ft=Object.defineProperty,Tt=Object.getOwnPropertyDescriptor,he=(t,e,s,r)=>{for(var i=r>1?void 0:r?Tt(e,s):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(i=(r?o(e,s,i):o(i))||i);return r&&i&&Ft(e,s,i),i};function me(t,e){return t?t instanceof ShadowRoot?me(t.host,e):t instanceof HTMLElement&&t.matches(e)?t:me(t.parentNode,e):null}let J=class extends Ce($e){constructor(){super(...arguments),this.view="chat"}get shoelaceTheme(){return me(this,".sl-theme-dark")?"dark":"light"}get colorHash(){return this.shoelaceTheme==="dark"?new Oe({lightness:[.7,.8,.9]}):new Oe({lightness:[.1,.2,.3,.4]})}renderEvent(t,e){switch(e.event.content.event.type){case"UpdateGroupInfo":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t,e.author)}
						&nbsp;${u(se`updated the group's info.`)}
					</sl-tag>
				`;case"AddMember":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t,e.event.content.event.member_agents[0])}&nbsp;${u(se`was added to the group.`)}
					</sl-tag>
				`;case"RemoveMember":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t,e.author)}
						&nbsp;${u("removed")}&nbsp;${this.renderAgentNickname(t,e.event.content.event.member_agents[0])}&nbsp;${u("from the group.")}
					</sl-tag>
				`;case"LeaveGroup":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t,e.author)}
						&nbsp;${u(se`left the group.`)}
					</sl-tag>
				`;case"DeleteGroup":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t,e.author)}
						&nbsp;${u(se`deleted the group.`)}
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
					<sl-avatar
						style="--size: 32px"
						.image=${t.info.avatar}
						.initials=${t.info.name.slice(0,2)}
					></sl-avatar>
					<span>${t.info.name} </span>
				</div>
			</div>
		`}renderChat(t,e,s,r,i){const a=e.members.find(h=>!!h.agents.find(m=>b(m)===b(this.store.client.client.myPubKey))),o=e.members.filter(h=>!h.agents.find(m=>b(m)===b(this.store.client.client.myPubKey))),c=a.agents,f=o.map(h=>h.agents),v=Object.entries(r).filter(h=>{const m=h[1].event.content.event.type;return m==="UpdateGroupInfo"||m==="AddMember"||m==="RemoveMember"||m==="LeaveGroup"||m==="DeleteGroup"}).reduce((h,m)=>({...h,[m[0]]:m[1]}),{}),k=pt({...s,...v},[c,...f]),$=c.map(b),H=this.store.groupChats.get(this.groupChatHash).typingPeers.get();return l`<div class="column" style="flex: 1;">
			${this.renderTopBar(e)}
			<div part="chat" class="column" style="flex: 1;">
				<div class="flex-scrollable-parent">
					<div class="flex-scrollable-container">
						<div
							class="flex-scrollable-y"
							id="scrolling-chat"
							style="padding-right: 8px; padding-left: 8px; gap: 8px; flex: 1; display: flex; flex-direction: column-reverse"
							${Be(h=>{if(!h||a.removed)return;const m=[].concat(...k.map(E=>E.eventsSets)).filter(E=>!$.includes(b(E[0][1].author))),A=[];for(const E of m)for(const[Y,ue]of E)i.includes(Y)||A.push(rt(Y));A.length>0&&this.store.groupChats.get(this.groupChatHash).markMessagesAsRead(A)})}
						>
							<div style="margin-bottom: 4px"></div>
							${this.renderTypingIndicators(H)}
							${k.map(h=>this.renderEventsSetsInDay(e,$,h.day,h.eventsSets))}
							<div class="row" style="justify-content: center">
								<sl-tag style="align-self: center; margin: 8px">
									${u(se`Group was created by`)}&nbsp;
									${this.renderAgentNickname(e,t.author)}
								</sl-tag>
							</div>
						</div>
					</div>
				</div>
				${e.deleted||a.removed?l``:l`
							<message-input
								@input=${()=>this.store.client.sendGroupChatTypingIndicator(this.groupChatHash,o.filter(h=>!h.removed).map(h=>h.agents))}
								@send-message=${h=>this.sendMessage(h.detail.message)}
							>
							</message-input>
						`}
			</div>
		</div> `}renderEventsSetsInDay(t,e,s,r){return l`
			<div class="column" style="gap: 8px; flex-direction: column-reverse">
				${r.map(i=>i[0][1].event.content.type==="GroupMessage"?e.includes(b(i[0][1].author))?this.renderMessageSetFromMe(i):this.renderMessageSetToMe(t,i):this.renderEvent(t,i[0][1]))}
				<div style="align-self: center">
					<sl-tag>
						<sl-format-date
							month="long"
							day="numeric"
							.date=${s}
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
		`}renderMessageSetFromMe(t){const s=t[0][1].event.timestamp/1e3,r=new Date(s),i=Date.now()-s<60*1e3,a=Date.now()-s>46*60*1e3;return l`
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
											${i?l`<span>${u("now")}</span>`:a?l`
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
		`}renderAgentNickname(t,e){let s=t.members.find(r=>r.agents.find(i=>b(i)===b(e))).profile;if(this.profilesProvider.profilesArePublic&&!s){const r=this.profilesProvider.currentProfileForAgent.get(e).get();if(r.status!=="completed"||!r.value)return l`${u("Profile not found.")}`;s=r.value}return l`
			<span
				style=${tt({color:this.colorHash.hex(b(e)),"font-weight":"bold"})}
				@click=${()=>{this.dispatchEvent(new CustomEvent("agent-selected",{bubbles:!0,composed:!0,detail:{agentPubKey:e}}))}}
				>${s.name}</span
			>
		`}renderMessageSetToMe(t,e){const s=e[0][1],r=s.event.timestamp/1e3,i=new Date(r),a=Date.now()-r<60*1e3,o=Date.now()-r>46*60*1e3;return l` <div class="row" style="gap: 8px; align-items: end">
			<agent-avatar .agentPubKey=${s.author}></agent-avatar>

			<div
				class="column"
				style="flex-direction: column-reverse; align-items: start"
			>
				${e.map(([c,f],v)=>l`

						<div class="colum message" style="gap:8px">
							${v===e.length-1?this.renderAgentNickname(t,f.author):l``}
							<div
								class="row"
								style="gap: 16px; align-items: end; flex-wrap: wrap; "
							>
								<span style="flex: 1; word-break: break-all"
									>${f.event.content.message.message}</span
								>
								${v===0?l`
												<div
													class="placeholder column"
													style="font-size: 12px; text-align: right"
												>
													<div style="flex: 1"></div>
													${a?l`<span>${u("now")}</span>`:o?l`
																	<sl-format-date
																		hour="numeric"
																		minute="numeric"
																		hour-format="24"
																		.date=${i}
																	></sl-format-date>
																`:l`
																	<sl-relative-time
																		style=""
																		sync
																		format="narrow"
																		.date=${i}
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
		</div>`}async sendMessage(t){try{await this.store.groupChats.get(this.groupChatHash).sendMessage(t),this.shadowRoot.getElementById("scrolling-chat").scrollTo({top:0,behavior:"smooth"})}catch(e){console.error(e),W(u("Error sending the message"))}}groupInfo(){const t=this.store.groupChats.get(this.groupChatHash);return ot([t.originalGroupChat.get(),t.currentGroupChat.get(),t.messages.get(),t.events.get(),t.readMessages.get()])}async updateGroupInfo(t){try{await this.store.groupChats.get(this.groupChatHash).updateGroupChatInfo({avatar:t.avatar==="null"?void 0:t.avatar,name:t.name,description:t.description}),this.view="details"}catch(e){console.log(e),W(u("Error updating the group's info."))}}get usersToBeAdded(){var e;const t=(e=this.shadowRoot)==null?void 0:e.getElementById("users");if(t)return t.value}async addMembers(){try{const t=this.usersToBeAdded;for(const e of t)await this.store.groupChats.get(this.groupChatHash).addMember(e);this.view="details"}catch(t){console.log(t),W(u("Error adding members."))}}renderAddMembers(t){return l`
			<div class="column" style="flex: 1">
				<div
					part="top-bar"
					class="row top-bar"
					style="gap: 8px; align-items: center"
				>
					<sl-icon-button
						.src=${C(Te)}
						@click=${()=>{this.view="details"}}
					></sl-icon-button>
					<span>${u("Add members")}</span>
				</div>

				<div class="flex-scrollable-parent" style="flex: 1">
					<div class="flex-scrollable-container">
						<div class="flex-scrollable-y">
							<div class="row" style="justify-content: center; flex: 1;">
								<sl-card
									style="flex-basis: 500px; align-self: start; margin: 16px"
								>
									<div class="column" style="gap: 16px; flex: 1">
										<search-users
											id="users"
											.excludedUsers=${t.members.filter(e=>!e.removed).map(e=>e.agents)}
											@user-selected=${e=>{this.requestUpdate()}}
											style="min-height: 200px"
										>
										</search-users>

										<sl-button
											variant="primary"
											.disabled=${this.usersToBeAdded&&this.usersToBeAdded.length===0}
											@click=${()=>{this.addMembers()}}
											>${u("Add members")}
										</sl-button>
									</div>
								</sl-card>
							</div>
						</div>
					</div>
				</div>
			</div>
		`}renderEditInfo(t){return l`
			<form
				class="column"
				style="flex: 1"
				${ut(e=>this.updateGroupInfo(e))}
			>
				<div
					part="top-bar"
					class="row top-bar"
					style="gap: 8px; align-items: center "
				>
					<sl-icon-button
						.src=${C(Ie)}
						@click=${()=>{this.view="details"}}
					></sl-icon-button>
					<span>${u("Edit group info")}</span>
				</div>

				<div class="row" style="justify-content: center; flex: 1; margin: 16px">
					<sl-card style="flex-basis: 500px; align-items: start">
						<div class="column" style="gap: 16px; flex: 1">
							<div class="row" style="align-items: start; gap: 16px">
								<select-avatar
									name="avatar"
									.label=${u("Image*")}
									.value=${t.avatar}
								></select-avatar>
								<sl-input
									required
									.label=${u("Name")}
									name="name"
									.value=${t.name}
									style="flex: 1"
								></sl-input>
							</div>
							<sl-textarea
								.label=${u("Description")}
								name="description"
								.value=${t.description}
							></sl-textarea>
							<div style="flex: 1"></div>
							<sl-button type="submit" variant="primary"
								>${u("Save")}
							</sl-button>
						</div>
					</sl-card>
				</div>
			</form>
		`}renderDetails(t){const e=t.members.find(s=>s.agents.find(r=>b(r)===b(this.store.client.client.myPubKey)));return l`
			<div class="column" style="flex: 1">
				<div part="top-bar" class="row top-bar" style="align-items: center">
					<sl-icon-button
						.src=${C(Te)}
						@click=${()=>{this.view="chat"}}
					></sl-icon-button>
					<div style="flex: 1"></div>
				</div>
				<div class="flex-scrollable-parent">
					<div class="flex-scrollable-container">
						<div class="flex-scrollable-y">
							<div
								class="row"
								style="justify-content: center; flex: 1; margin: 8px; margin-top: 0"
							>
								<div class="column" style="gap: 16px; flex-basis: 500px">
									<group-info .groupChatHash=${this.groupChatHash}>
										${!t.deleted&&!e.removed&&(e.admin||!t.settings.only_admins_can_edit_group_info)?l`
													<sl-button
														slot="action"
														@click=${()=>{this.view="edit-info"}}
														circle
														variant="primary"
														outline
													>
														<sl-icon .src=${C(st)}>
														</sl-icon>
													</sl-button>
												`:l``}
									</group-info>

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
													.label=${u("Leave Group")}
												>
													<span
														>${u("Are you sure you want to leave this group?")}
													</span>
													<sl-button
														slot="footer"
														@click=${async()=>{try{await this.store.groupChats.get(this.groupChatHash).leaveGroup()}catch(s){console.log(s),W(u("Error leaving the group."))}}}
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
														.src=${C(Ie)}
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
														@click=${async()=>{try{await this.store.groupChats.get(this.groupChatHash).deleteGroupChat()}catch(s){console.log(s),W(u("Error deleting the group."))}}}
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
														.src=${C(je)}
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
		`}renderView(t,e,s,r,i){switch(this.view){case"chat":return this.renderChat(t,e,s,r,i);case"details":return this.renderDetails(e);case"add-members":return this.renderAddMembers(e);case"edit-info":return this.renderEditInfo(e.info)}}render(){const t=this.groupInfo();switch(t.status){case"pending":return l`
					<sl-skeleton
						style="height: 32px; width: 32px; --border-radius: 8px"
						effect="pulse"
					></sl-skeleton>
				`;case"error":return l`<display-error
					.headline=${u("Error fetching the messages")}
					.error=${t.error}
				></display-error>`;case"completed":const[e,s,r,i,a]=t.value;return this.renderView(e,s,r,i,a.myReadMessages)}}};J.styles=[_e,ce`
			:host {
				display: flex;
				font-size: 14px;
			}
			sl-tag {
				max-width: 400px;
			}
		`];he([y(ke("group-chat-hash"))],J.prototype,"groupChatHash",2);he([de({context:Ae,subscribe:!0})],J.prototype,"store",2);he([Ke()],J.prototype,"view",2);he([de({context:qe,subscribe:!0}),y()],J.prototype,"profilesProvider",2);J=he([it(),ye("group-chat")],J);export{J as GroupChatEl};
