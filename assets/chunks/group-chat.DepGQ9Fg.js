import{a as b,c as he,t as ye,p as Ve}from"./property.Du0Z6lUr.js";import{a as Te,o as Xe}from"./chunk.OSU5LOVZ.BAy2AA1D.js";import{c as be,S as xe,e as le,k as Je,_ as g,f as N,w as we,s as ee,L as je,h as ie,i as Q,j as Y,p as Ie,g as ve,r as Ke,b as _e,n as ke,q as Ge,a as A,t as Qe,u as Ye,v as Ze,x as et,y as tt,o as qe,m as st,z as it,A as Be,B as Re,C as at,l as rt}from"./styles.fvlugEG2.js";import{H as ze,f as ot,d as lt,F as nt,o as Se,l as dt,b as ct,a as U,n as Oe}from"./chunk.MZCVJT24.CqIsFzLm.js";import{i as ue,x as l,r as $e,m as h,f as x,t as ht,g as ae,j as ut,k as pt}from"./messenger-client.CV9csWrB.js";import{S as Ce}from"./signal-watcher.1XZcQCR5.js";import"./chunk.UJ4C5V3J.DI4H0WFx.js";import{o as ft,s as Ee}from"./seen-status.Cmw5YDtQ.js";import{m as Ae}from"./context.DWQpVkCn.js";import"./tslib.es6.kHcLnhpD.js";var gt=ue`
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
`,Ne=class extends xe{constructor(){super(...arguments),this.hasSlotController=new ze(this,"footer","header","image")}render(){return l`
      <div
        part="base"
        class=${le({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};Ne.styles=[be,gt];Ne.define("sl-card");var mt=ue`
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
`,z=class extends xe{constructor(){super(...arguments),this.localize=new je(this),this.open=!1,this.disabled=!1}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(const e of t)e.type==="attributes"&&e.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.detailsObserver)==null||t.disconnect()}handleSummaryClick(t){t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show())}async handleOpenChange(){if(this.open){if(this.details.open=!0,this.emit("sl-show",{cancelable:!0}).defaultPrevented){this.open=!1,this.details.open=!1;return}await ie(this.body);const{keyframes:e,options:s}=Q(this,"details.show",{dir:this.localize.dir()});await Y(this.body,Ie(e,this.body.scrollHeight),s),this.body.style.height="auto",this.emit("sl-after-show")}else{if(this.emit("sl-hide",{cancelable:!0}).defaultPrevented){this.details.open=!0,this.open=!0;return}await ie(this.body);const{keyframes:e,options:s}=Q(this,"details.hide",{dir:this.localize.dir()});await Y(this.body,Ie(e,this.body.scrollHeight),s),this.body.style.height="auto",this.details.open=!1,this.emit("sl-after-hide")}}async show(){if(!(this.open||this.disabled))return this.open=!0,ve(this,"sl-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,ve(this,"sl-after-hide")}render(){const t=this.localize.dir()==="rtl";return l`
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
    `}};z.styles=[be,mt];z.dependencies={"sl-icon":Je};g([N(".details")],z.prototype,"details",2);g([N(".details__header")],z.prototype,"header",2);g([N(".details__body")],z.prototype,"body",2);g([N(".details__expand-icon-slot")],z.prototype,"expandIconSlot",2);g([b({type:Boolean,reflect:!0})],z.prototype,"open",2);g([b()],z.prototype,"summary",2);g([b({type:Boolean,reflect:!0})],z.prototype,"disabled",2);g([we("open",{waitUntilFirstUpdate:!0})],z.prototype,"handleOpenChange",1);ee("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}});ee("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}});z.define("sl-details");var vt=ue`
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
`,k=class extends xe{constructor(){super(...arguments),this.formControlController=new nt(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new ze(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!t;return l`
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
            .checked=${dt(this.checked)}
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
    `}};k.styles=[be,ot,vt];g([N('input[type="checkbox"]')],k.prototype,"input",2);g([Ke()],k.prototype,"hasFocus",2);g([b()],k.prototype,"title",2);g([b()],k.prototype,"name",2);g([b()],k.prototype,"value",2);g([b({reflect:!0})],k.prototype,"size",2);g([b({type:Boolean,reflect:!0})],k.prototype,"disabled",2);g([b({type:Boolean,reflect:!0})],k.prototype,"checked",2);g([lt("checked")],k.prototype,"defaultChecked",2);g([b({reflect:!0})],k.prototype,"form",2);g([b({type:Boolean,reflect:!0})],k.prototype,"required",2);g([b({attribute:"help-text"})],k.prototype,"helpText",2);g([we("checked",{waitUntilFirstUpdate:!0})],k.prototype,"handleCheckedChange",1);g([we("disabled",{waitUntilFirstUpdate:!0})],k.prototype,"handleDisabledChange",1);k.define("sl-switch");var u=function(t,e,s){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,s),s},d=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)},K,X,M,te,oe,F,T,I,B,R,O,W,L,J,se,G,ge,q;const yt=function(t){var e=131,s=137,r=0;t+="x";var i=Math.floor(9007199254740991/s);for(let a=0;a<t.length;a++)r>i&&(r=Math.floor(r/s)),r=r*e+t.charCodeAt(a);return r},c="0123456789abcdef".split(""),bt=[-2147483648,8388608,32768,128],S=[24,16,8,0],fe=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],_=[];class xt{constructor(e=!1,s=!1){K.set(this,void 0),X.set(this,void 0),M.set(this,void 0),te.set(this,void 0),oe.set(this,void 0),F.set(this,void 0),T.set(this,void 0),I.set(this,void 0),B.set(this,void 0),R.set(this,void 0),O.set(this,void 0),W.set(this,void 0),L.set(this,void 0),J.set(this,void 0),se.set(this,void 0),G.set(this,void 0),ge.set(this,0),q.set(this,void 0),this.init(e,s)}init(e,s){s?(_[0]=_[16]=_[1]=_[2]=_[3]=_[4]=_[5]=_[6]=_[7]=_[8]=_[9]=_[10]=_[11]=_[12]=_[13]=_[14]=_[15]=0,u(this,X,_)):u(this,X,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),e?(u(this,F,3238371032),u(this,T,914150663),u(this,I,812702999),u(this,B,4144912697),u(this,R,4290775857),u(this,O,1750603025),u(this,W,1694076839),u(this,L,3204075428)):(u(this,F,1779033703),u(this,T,3144134277),u(this,I,1013904242),u(this,B,2773480762),u(this,R,1359893119),u(this,O,2600822924),u(this,W,528734635),u(this,L,1541459225)),u(this,K,u(this,q,u(this,M,u(this,se,0)))),u(this,te,u(this,J,!1)),u(this,oe,!0),u(this,G,e)}update(e){if(d(this,te))return this;let s;e instanceof ArrayBuffer?s=new Uint8Array(e):s=e;let r=0;const i=s.length,a=d(this,X);for(;r<i;){let o;if(d(this,J)&&(u(this,J,!1),a[0]=d(this,K),a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),typeof s!="string")for(o=d(this,q);r<i&&o<64;++r)a[o>>2]|=s[r]<<S[o++&3];else for(o=d(this,q);r<i&&o<64;++r){let n=s.charCodeAt(r);n<128?a[o>>2]|=n<<S[o++&3]:n<2048?(a[o>>2]|=(192|n>>6)<<S[o++&3],a[o>>2]|=(128|n&63)<<S[o++&3]):n<55296||n>=57344?(a[o>>2]|=(224|n>>12)<<S[o++&3],a[o>>2]|=(128|n>>6&63)<<S[o++&3],a[o>>2]|=(128|n&63)<<S[o++&3]):(n=65536+((n&1023)<<10|s.charCodeAt(++r)&1023),a[o>>2]|=(240|n>>18)<<S[o++&3],a[o>>2]|=(128|n>>12&63)<<S[o++&3],a[o>>2]|=(128|n>>6&63)<<S[o++&3],a[o>>2]|=(128|n&63)<<S[o++&3])}u(this,ge,o),u(this,M,d(this,M)+(o-d(this,q))),o>=64?(u(this,K,a[16]),u(this,q,o-64),this.hash(),u(this,J,!0)):u(this,q,o)}return d(this,M)>4294967295&&(u(this,se,d(this,se)+(d(this,M)/4294967296<<0)),u(this,M,d(this,M)%4294967296)),this}finalize(){if(d(this,te))return;u(this,te,!0);const e=d(this,X),s=d(this,ge);e[16]=d(this,K),e[s>>2]|=bt[s&3],u(this,K,e[16]),s>=56&&(d(this,J)||this.hash(),e[0]=d(this,K),e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0),e[14]=d(this,se)<<3|d(this,M)>>>29,e[15]=d(this,M)<<3,this.hash()}hash(){let e=d(this,F),s=d(this,T),r=d(this,I),i=d(this,B),a=d(this,R),o=d(this,O),n=d(this,W),p=d(this,L);const v=d(this,X);let $,C,P,f,E,H,m,w,V,D;for(let y=16;y<64;++y)f=v[y-15],$=(f>>>7|f<<25)^(f>>>18|f<<14)^f>>>3,f=v[y-2],C=(f>>>17|f<<15)^(f>>>19|f<<13)^f>>>10,v[y]=v[y-16]+$+v[y-7]+C<<0;D=s&r;for(let y=0;y<64;y+=4)d(this,oe)?(d(this,G)?(m=300032,f=v[0]-1413257819,p=f-150054599<<0,i=f+24177077<<0):(m=704751109,f=v[0]-210244248,p=f-1521486534<<0,i=f+143694565<<0),u(this,oe,!1)):($=(e>>>2|e<<30)^(e>>>13|e<<19)^(e>>>22|e<<10),C=(a>>>6|a<<26)^(a>>>11|a<<21)^(a>>>25|a<<7),m=e&s,P=m^e&r^D,H=a&o^~a&n,f=p+C+H+fe[y]+v[y],E=$+P,p=i+f<<0,i=f+E<<0),$=(i>>>2|i<<30)^(i>>>13|i<<19)^(i>>>22|i<<10),C=(p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7),w=i&e,P=w^i&s^m,H=p&a^~p&o,f=n+C+H+fe[y+1]+v[y+1],E=$+P,n=r+f<<0,r=f+E<<0,$=(r>>>2|r<<30)^(r>>>13|r<<19)^(r>>>22|r<<10),C=(n>>>6|n<<26)^(n>>>11|n<<21)^(n>>>25|n<<7),V=r&i,P=V^r&e^w,H=n&p^~n&a,f=o+C+H+fe[y+2]+v[y+2],E=$+P,o=s+f<<0,s=f+E<<0,$=(s>>>2|s<<30)^(s>>>13|s<<19)^(s>>>22|s<<10),C=(o>>>6|o<<26)^(o>>>11|o<<21)^(o>>>25|o<<7),D=s&r,P=D^s&i^V,H=o&n^~o&p,f=a+C+H+fe[y+3]+v[y+3],E=$+P,a=e+f<<0,e=f+E<<0;u(this,F,d(this,F)+e<<0),u(this,T,d(this,T)+s<<0),u(this,I,d(this,I)+r<<0),u(this,B,d(this,B)+i<<0),u(this,R,d(this,R)+a<<0),u(this,O,d(this,O)+o<<0),u(this,W,d(this,W)+n<<0),u(this,L,d(this,L)+p<<0)}hex(){this.finalize();const e=d(this,F),s=d(this,T),r=d(this,I),i=d(this,B),a=d(this,R),o=d(this,O),n=d(this,W),p=d(this,L);let v=c[e>>28&15]+c[e>>24&15]+c[e>>20&15]+c[e>>16&15]+c[e>>12&15]+c[e>>8&15]+c[e>>4&15]+c[e&15]+c[s>>28&15]+c[s>>24&15]+c[s>>20&15]+c[s>>16&15]+c[s>>12&15]+c[s>>8&15]+c[s>>4&15]+c[s&15]+c[r>>28&15]+c[r>>24&15]+c[r>>20&15]+c[r>>16&15]+c[r>>12&15]+c[r>>8&15]+c[r>>4&15]+c[r&15]+c[i>>28&15]+c[i>>24&15]+c[i>>20&15]+c[i>>16&15]+c[i>>12&15]+c[i>>8&15]+c[i>>4&15]+c[i&15]+c[a>>28&15]+c[a>>24&15]+c[a>>20&15]+c[a>>16&15]+c[a>>12&15]+c[a>>8&15]+c[a>>4&15]+c[a&15]+c[o>>28&15]+c[o>>24&15]+c[o>>20&15]+c[o>>16&15]+c[o>>12&15]+c[o>>8&15]+c[o>>4&15]+c[o&15]+c[n>>28&15]+c[n>>24&15]+c[n>>20&15]+c[n>>16&15]+c[n>>12&15]+c[n>>8&15]+c[n>>4&15]+c[n&15];return d(this,G)||(v+=c[p>>28&15]+c[p>>24&15]+c[p>>20&15]+c[p>>16&15]+c[p>>12&15]+c[p>>8&15]+c[p>>4&15]+c[p&15]),v}toString(){return this.hex()}digest(){this.finalize();const e=d(this,F),s=d(this,T),r=d(this,I),i=d(this,B),a=d(this,R),o=d(this,O),n=d(this,W),p=d(this,L),v=[e>>24&255,e>>16&255,e>>8&255,e&255,s>>24&255,s>>16&255,s>>8&255,s&255,r>>24&255,r>>16&255,r>>8&255,r&255,i>>24&255,i>>16&255,i>>8&255,i&255,a>>24&255,a>>16&255,a>>8&255,a&255,o>>24&255,o>>16&255,o>>8&255,o&255,n>>24&255,n>>16&255,n>>8&255,n&255];return d(this,G)||v.push(p>>24&255,p>>16&255,p>>8&255,p&255),v}array(){return this.digest()}arrayBuffer(){this.finalize();const e=new ArrayBuffer(d(this,G)?28:32),s=new DataView(e);return s.setUint32(0,d(this,F)),s.setUint32(4,d(this,T)),s.setUint32(8,d(this,I)),s.setUint32(12,d(this,B)),s.setUint32(16,d(this,R)),s.setUint32(20,d(this,O)),s.setUint32(24,d(this,W)),d(this,G)||s.setUint32(28,d(this,L)),e}}K=new WeakMap,X=new WeakMap,M=new WeakMap,te=new WeakMap,oe=new WeakMap,F=new WeakMap,T=new WeakMap,I=new WeakMap,B=new WeakMap,R=new WeakMap,O=new WeakMap,W=new WeakMap,L=new WeakMap,J=new WeakMap,se=new WeakMap,G=new WeakMap,ge=new WeakMap,q=new WeakMap;function wt(t){const e=new xt;return e.update(t),parseInt(e.hex().substring(0,8),16)}const _t=function(t){var e="#";return t.forEach(function(s){s<16&&(e+=0),e+=s.toString(16)}),e},kt=function(t,e,s){t/=360;var r=s<.5?s*(1+e):s+e-s*e,i=2*s-r;return[t+1/3,t,t-1/3].map(function(a){return a<0&&a++,a>1&&a--,a<1/6?a=i+(r-i)*6*a:a<.5?a=r:a<2/3?a=i+(r-i)*6*(2/3-a):a=i,Math.round(a*255)})};class We{constructor(e={}){const[s,r]=[e.lightness,e.saturation].map(function(i){return i=i!==void 0?i:[.35,.5,.65],Array.isArray(i)?i.concat():[i]});this.L=s,this.S=r,typeof e.hue=="number"&&(e.hue={min:e.hue,max:e.hue}),typeof e.hue=="object"&&!Array.isArray(e.hue)&&(e.hue=[e.hue]),typeof e.hue>"u"&&(e.hue=[]),this.hueRanges=e.hue.map(function(i){return{min:typeof i.min>"u"?0:i.min,max:typeof i.max>"u"?360:i.max}}),this.hash=wt,typeof e.hash=="function"&&(this.hash=e.hash),e.hash==="bkdr"&&(this.hash=yt)}hsl(e){var s,r,i,a=this.hash(e),o=727;if(this.hueRanges.length){const n=this.hueRanges[a%this.hueRanges.length];s=a/this.hueRanges.length%o*(n.max-n.min)/o+n.min}else s=a%359;return a=Math.ceil(a/360),r=this.S[a%this.S.length],a=Math.ceil(a/this.S.length),i=this.L[a%this.L.length],[s,r,i]}rgb(e){var s=this.hsl(e);return kt.apply(this,s)}hex(e){var s=this.rgb(e);return _t(s)}}var $t=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,Pe=(t,e,s,r)=>{for(var i=r>1?void 0:r?Ct(e,s):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(i=(r?o(e,s,i):o(i))||i);return r&&i&&$t(e,s,i),i};let ne=class extends Ce($e){renderInfo(t){return l`
			<div class="column" style="gap: 16px;">
				${t.avatar?l`
							<img
								src="${t.avatar}"
								style="height: 150px; object-fit: cover"
							/>
						`:l`<sl-icon
							.src=${A(Qe)}
							style="font-size: 64px; border-radius: 50%; align-self: center; height: 150px"
							class="placeholder"
						></sl-icon>`}
				<div
					class="row"
					style=${Ge({"align-items":t.description?"auto":"center"})}
				>
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
					.headline=${h("Error fetching the info for this group")}
					.error=${t.error}
				></display-error>`;case"completed":return this.renderInfo(t.value.info)}}};ne.styles=[_e];Pe([b(ke("group-chat-hash"))],ne.prototype,"groupChatHash",2);Pe([he({context:Ae,subscribe:!0})],ne.prototype,"store",2);ne=Pe([ye("group-info")],ne);function*He(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*Ye(He(t.shadowRoot.activeElement))))}function At(){return[...He()].pop()}var re=[],Et=class{constructor(t){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=e=>{var s;if(e.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const r=At();if(this.previousFocus=r,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;e.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const i=Te(this.element);let a=i.findIndex(n=>n===r);this.previousFocus=this.currentFocus;const o=this.tabDirection==="forward"?1:-1;for(;;){a+o>=i.length?a=0:a+o<0?a=i.length-1:a+=o,this.previousFocus=this.currentFocus;const n=i[a];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||n&&this.possiblyHasTabbableChildren(n))return;e.preventDefault(),this.currentFocus=n,(s=this.currentFocus)==null||s.focus({preventScroll:!1});const p=[...He()];if(p.includes(this.currentFocus)||!p.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){re.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){re=re.filter(t=>t!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return re[re.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const t=Te(this.element);if(!this.element.matches(":focus-within")){const e=t[0],s=t[t.length-1],r=this.tabDirection==="forward"?e:s;typeof(r==null?void 0:r.focus)=="function"&&(this.currentFocus=r,r.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}},Me=new Set;function St(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Mt(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function Le(t){if(Me.add(t),!document.documentElement.classList.contains("sl-scroll-lock")){const e=St()+Mt();let s=getComputedStyle(document.documentElement).scrollbarGutter;(!s||s==="auto")&&(s="stable"),e<2&&(s=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",s),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${e}px`)}}function Ue(t){Me.delete(t),Me.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}var zt=ue`
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
`,j=class extends xe{constructor(){super(...arguments),this.hasSlotController=new ze(this,"footer"),this.localize=new je(this),this.modal=new Et(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.modal.isActive()&&this.open&&(t.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),Le(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),Ue(this),this.removeOpenListeners()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const s=Q(this,"dialog.denyClose",{dir:this.localize.dir()});Y(this.panel,s.keyframes,s.options);return}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),Le(this);const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([ie(this.dialog),ie(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});const e=Q(this,"dialog.show",{dir:this.localize.dir()}),s=Q(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([Y(this.panel,e.keyframes,e.options),Y(this.overlay,s.keyframes,s.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([ie(this.dialog),ie(this.overlay)]);const t=Q(this,"dialog.hide",{dir:this.localize.dir()}),e=Q(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([Y(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),Y(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,Ue(this);const s=this.originalTrigger;typeof(s==null?void 0:s.focus)=="function"&&setTimeout(()=>s.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,ve(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,ve(this,"sl-after-hide")}render(){return l`
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
    `}};j.styles=[be,zt];j.dependencies={"sl-icon-button":ct};g([N(".dialog")],j.prototype,"dialog",2);g([N(".dialog__panel")],j.prototype,"panel",2);g([N(".dialog__overlay")],j.prototype,"overlay",2);g([b({type:Boolean,reflect:!0})],j.prototype,"open",2);g([b({reflect:!0})],j.prototype,"label",2);g([b({attribute:"no-header",type:Boolean,reflect:!0})],j.prototype,"noHeader",2);g([we("open",{waitUntilFirstUpdate:!0})],j.prototype,"handleOpenChange",1);ee("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});ee("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});ee("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});ee("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});ee("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});j.define("sl-dialog");var Pt=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,De=(t,e,s,r)=>{for(var i=r>1?void 0:r?Ht(e,s):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(i=(r?o(e,s,i):o(i))||i);return r&&i&&Pt(e,s,i),i};let de=class extends Ce($e){renderMember(t,e,s){const r=x(s.agents[0]);return l`
			<sl-dialog id="${r}" no-header style="--width: 20rem">
				<div class="column" style="gap: 12px">
					<div
						class="row"
						style="cursor: pointer; align-items:center; gap: 8px"
						@click=${async()=>{try{const i=await ht(this.store.peerChatsForPeer.get(s.agents[0]));let a;i.length===0?a=await this.store.client.createPeerChat(s.agents[0]):a=i[0],this.dispatchEvent(new CustomEvent("peer-chat-selected",{bubbles:!0,composed:!0,detail:{peerChatHash:a}})),this.shadowRoot.getElementById(r).hide()}catch(i){console.error(i),U(h("Error sending direct message."))}}}
					>
						<sl-icon .src=${A(Ze)}></sl-icon>

						<span>${h("Send direct message")}</span>
					</div>
					${!t&&!e.removed&&e.admin&&!s.admin?l`
								<div
									class="row"
									style="cursor: pointer; gap: 8px; align-items:center"
									@click=${async()=>{try{await this.store.groupChats.get(this.groupChatHash).promoteMemberToAdmin(s.agents),this.shadowRoot.getElementById(r).hide()}catch(i){console.error(i),U(h("Error making peer an admin."))}}}
								>
									<sl-icon .src=${A(et)}></sl-icon>
									<span>${h("Make admin")}</span>
								</div>
							`:l``}
					${!t&&!e.removed&&e.admin&&s.admin?l`
								<div
									class="row"
									style="cursor: pointer; gap: 8px; align-items:center"
									@click=${async()=>{try{await this.store.groupChats.get(this.groupChatHash).demoteMemberFromAdmin(s.agents),this.shadowRoot.getElementById(r).hide()}catch(i){console.error(i),U(h("Error demoting member from admin."))}}}
								>
									<sl-icon .src=${A(tt)}></sl-icon>
									<span>${h("Remove admin role")}</span>
								</div>
							`:l``}
					${!t&&e.admin&&!e.removed?l`
								<div
									class="row"
									style="cursor: pointer; gap: 8px; align-items:center"
									@click=${async()=>{try{await this.store.groupChats.get(this.groupChatHash).removeMember(s.agents);const i=this.shadowRoot.getElementById(r);i==null||i.hide()}catch(i){console.error(i),U(h("Error removing member."))}}}
								>
									<sl-icon .src=${A(qe)}></sl-icon>
									<span>${h("Remove member")}</span>
								</div>
							`:l``}
				</div>
			</sl-dialog>
			<div
				@click=${()=>{if(s.agents.find(a=>x(a)===x(this.store.client.client.myPubKey)))return;this.shadowRoot.getElementById(r).show()}}
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
				${s.admin?l`<sl-tag>${h("Admin")}</sl-tag>`:l``}
			</div>
		`}renderMembers(t){if(t.members.length===0)return l`<div
				class="column placeholder"
				style="flex: 1; align-items: center; justify-content: center; gap: 8px"
			>
				<sl-icon
					.src=${A(st)}
					style="font-size: 64px;"
				></sl-icon>
				<span>${h("This group has no members.")}</span>
			</div>`;const e=t.members.find(s=>s.agents.find(r=>x(r)===x(this.store.client.client.myPubKey)));return l`
			<div class="column" style="gap: 12px; flex: 1">
				${t.members.filter(s=>!s.removed).map(s=>this.renderMember(t.deleted,e,s))}
				${!t.deleted&&!e.removed&&(e.admin||!t.settings.only_admins_can_add_members)?l`
							<sl-button
								variant="primary"
								style="margin-top: 8px"
								outline
								@click=${()=>{this.dispatchEvent(new CustomEvent("add-members-clicked",{bubbles:!0,composed:!0}))}}
							>
								<sl-icon slot="prefix" .src=${A(it)}>
								</sl-icon>
								${h("Add members")}
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
					.headline=${h("Error fetching the members for this group")}
					.error=${t.error}
				></display-error>`;case"completed":return this.renderMembers(t.value)}}};de.styles=[_e];De([b(ke("group-chat-hash"))],de.prototype,"groupChatHash",2);De([he({context:Ae,subscribe:!0})],de.prototype,"store",2);de=De([ye("group-members")],de);var Dt=Object.defineProperty,Ft=Object.getOwnPropertyDescriptor,Fe=(t,e,s,r)=>{for(var i=r>1?void 0:r?Ft(e,s):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(i=(r?o(e,s,i):o(i))||i);return r&&i&&Dt(e,s,i),i};let ce=class extends Ce($e){async updateGroupSettings(t){try{await this.store.groupChats.get(this.groupChatHash).updateGroupChatSettings(t)}catch(e){console.log(e),U(h("Error updating the group's settings."))}}renderSettings(t,e){return l`
			<div class="column" style="gap: 16px">
				<sl-switch
					.disabled=${!t}
					.checked=${e.only_admins_can_edit_group_info}
					@sl-change=${s=>{this.updateGroupSettings({...e,only_admins_can_edit_group_info:s.target.checked})}}
					>${h("Only admins can edit group info")}
				</sl-switch>
				<sl-switch
					.disabled=${!t}
					.checked=${e.only_admins_can_add_members}
					@sl-change=${s=>{this.updateGroupSettings({...e,only_admins_can_add_members:s.target.checked})}}
					>${h("Only admins can add members")}
				</sl-switch>
				<sl-switch
					.disabled=${!t}
					.checked=${e.sync_message_history_with_new_members}
					@sl-change=${s=>{this.updateGroupSettings({...e,sync_message_history_with_new_members:s.target.checked})}}
					>${h("Sync message history with new members")}
				</sl-switch>
			</div>
		`}render(){const t=this.store.groupChats.get(this.groupChatHash).currentGroupChat.get();switch(t.status){case"pending":return l`
					<div class="column" style="gap: 8px">
						<sl-skeleton style="height: 32px; width: 100px"> </sl-skeleton>
						<sl-skeleton style="height: 32px; width: 100px"> </sl-skeleton>
						<sl-skeleton style="height: 32px; width: 100px"> </sl-skeleton>
					</div>
				`;case"error":return l`<display-error
					.headline=${h("Error fetching the settings for this group")}
					.error=${t.error}
				></display-error>`;case"completed":const e=t.value.members.find(r=>r.agents.find(i=>x(i)===x(this.store.client.client.myPubKey))),s=e.admin&&!e.removed;return this.renderSettings(s,t.value.settings)}}};ce.styles=[_e];Fe([b(ke("group-chat-hash"))],ce.prototype,"groupChatHash",2);Fe([he({context:Ae,subscribe:!0})],ce.prototype,"store",2);ce=Fe([ye("group-settings")],ce);var Tt=Object.defineProperty,It=Object.getOwnPropertyDescriptor,pe=(t,e,s,r)=>{for(var i=r>1?void 0:r?It(e,s):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(i=(r?o(e,s,i):o(i))||i);return r&&i&&Tt(e,s,i),i};function me(t,e){return t?t instanceof ShadowRoot?me(t.host,e):t instanceof HTMLElement&&t.matches(e)?t:me(t.parentNode,e):null}let Z=class extends Ce($e){constructor(){super(...arguments),this.view="chat"}get shoelaceTheme(){return me(this,".sl-theme-dark")?"dark":"light"}get colorHash(){return this.shoelaceTheme==="dark"?new We({lightness:[.7,.8,.9]}):new We({lightness:[.1,.2,.3,.4]})}renderEvent(t,e){switch(e.payload.content.event.event.type){case"UpdateGroupInfo":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t,e.author)}
						&nbsp;${h(ae`updated the group's info.`)}
					</sl-tag>
				`;case"AddMember":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t,e.payload.content.event.event.member_agents[0])}&nbsp;${h(ae`was added to the group.`)}
					</sl-tag>
				`;case"RemoveMember":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t,e.author)}
						&nbsp;${h("removed")}&nbsp;${this.renderAgentNickname(t,e.payload.content.event.event.member_agents[0])}&nbsp;${h("from the group.")}
					</sl-tag>
				`;case"LeaveGroup":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t,e.author)}
						&nbsp;${h(ae`left the group.`)}
					</sl-tag>
				`;case"DeleteGroup":return l`
					<sl-tag style="align-self: center; margin: 4px 0">
						${this.renderAgentNickname(t,e.author)}
						&nbsp;${h(ae`deleted the group.`)}
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
		`}renderChat(t,e,s,r,i,a,o,n){const p=e.members.find(m=>!!m.agents.find(w=>x(w)===x(this.store.client.client.myPubKey))),v=e.members.filter(m=>!m.agents.find(w=>x(w)===x(this.store.client.client.myPubKey))),$=p.agents,C=v.map(m=>m.agents),P=Object.entries(r).filter(m=>{const w=m[1].payload.content.event.event.type;return w==="UpdateGroupInfo"||w==="AddMember"||w==="RemoveMember"||w==="LeaveGroup"||w==="DeleteGroup"}).reduce((m,w)=>({...m,[w[0]]:w[1]}),{}),f=ft({...s,...P},[$,...C]),E=$.map(x),H=this.store.groupChats.get(this.groupChatHash).typingPeers.get();return l`<div class="column" style="flex: 1;">
			${this.renderTopBar(e)}
			<div part="chat" class="column" style="flex: 1;">
				<div class="flex-scrollable-parent">
					<div class="flex-scrollable-container">
						<div
							class="flex-scrollable-y"
							id="scrolling-chat"
							style="padding-right: 8px; padding-left: 8px; gap: 8px; flex: 1; display: flex; flex-direction: column-reverse"
							${Oe(m=>{if(!m||p.removed)return;const w=[].concat(...f.map(D=>D.eventsSets)).filter(D=>!E.includes(x(D[0][1].author))),V=[];for(const D of w)for(const[y,Bt]of D)i.includes(y)||V.push(ut(y));V.length>0&&this.store.groupChats.get(this.groupChatHash).markMessagesAsRead(V)})}
						>
							<div style="margin-bottom: 4px"></div>
							${this.renderTypingIndicators(H)}
							${f.map(m=>this.renderEventsSetsInDay(e,E,m.day,m.eventsSets,a,o,n))}
							<div class="row" style="justify-content: center">
								<sl-tag style="align-self: center; margin: 8px">
									${h(ae`Group was created by`)}&nbsp;
									${this.renderAgentNickname(e,t.author)}
								</sl-tag>
							</div>
						</div>
					</div>
				</div>
				${e.deleted||p.removed?l``:l`
							<message-input
								@input=${()=>this.store.client.sendGroupChatTypingIndicator(this.groupChatHash,v.filter(m=>!m.removed).map(m=>m.agents))}
								@send-message=${m=>this.sendMessage(m.detail.message)}
							>
							</message-input>
						`}
			</div>
		</div> `}renderEventsSetsInDay(t,e,s,r,i,a,o){return l`
			<div class="column" style="gap: 8px; flex-direction: column-reverse">
				${r.map(n=>n[0][1].payload.content.event.type==="GroupMessage"?e.includes(x(n[0][1].author))?this.renderMessageSetFromMe(i,a,o,n):this.renderMessageSetToMe(t,n):this.renderEvent(t,n[0][1]))}
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
				${Oe(e=>{const s=this.shadowRoot.getElementById("scrolling-chat");s.scrollHeight-s.offsetHeight-s.scrollTop<40&&setTimeout(()=>{s.scrollTo({top:s.scrollHeight,behavior:"smooth"})},40)})}
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
		`}renderMessageSetFromMe(t,e,s,r){const a=r[0][1].payload.timestamp/1e3,o=new Date(a),n=Date.now()-a<60*1e3,p=Date.now()-a>46*60*1e3;return l`
			<div class="column from-me" style="flex-direction: column-reverse">
				${r.map(([v,$],C)=>l`
						<div
							class="message row"
							style="align-items: end; flex-wrap: wrap; gap: 16px;"
						>
							<span style="flex: 1; word-break: break-all"
								>${$.payload.content.event.message.message}</span
							>
							${C===0?l`
										<div
											class="placeholder column"
											style="font-size: 12px; text-align: right"
										>
											<div style="flex: 1"></div>
											${n?l`<span>${h("now")}</span>`:p?l`
															<sl-format-date
																hour="numeric"
																minute="numeric"
																hour-format="24"
																.date=${o}
															></sl-format-date>
														`:l`
															<sl-relative-time
																style=""
																sync
																format="narrow"
																.date=${o}
															>
															</sl-relative-time>
														`}
										</div>
										${this.seenStatus(t,e,s,v)}
									`:l``}
						</div>
					`)}
			</div>
		`}seenStatus(t,e,s,r){return Object.values(s).find(i=>i.includes(r))?Ee("seen"):e[r]?Ee("received"):t[r]?Ee("sent"):l``}renderAgentNickname(t,e){let s=t.members.find(r=>r.agents.find(i=>x(i)===x(e))).profile;if(this.profilesProvider.profilesArePublic&&!s){const r=this.profilesProvider.currentProfileForAgent.get(e).get();if(r.status!=="completed"||!r.value)return l`${h("Profile not found.")}`;s=r.value}return l`
			<span
				style=${Ge({color:this.colorHash.hex(x(e)),"font-weight":"bold"})}
				@click=${()=>{this.dispatchEvent(new CustomEvent("agent-selected",{bubbles:!0,composed:!0,detail:{agentPubKey:e}}))}}
				>${s.name}</span
			>
		`}renderMessageSetToMe(t,e){const s=e[0][1],r=s.payload.timestamp/1e3,i=new Date(r),a=Date.now()-r<60*1e3,o=Date.now()-r>46*60*1e3;return l` <div class="row" style="gap: 8px; align-items: end">
			<agent-avatar .agentPubKey=${s.author}></agent-avatar>

			<div
				class="column"
				style="flex-direction: column-reverse; align-items: start"
			>
				${e.map(([n,p],v)=>l`

						<div class="colum message" style="gap:8px">
							${v===e.length-1?this.renderAgentNickname(t,p.author):l``}
							<div
								class="row"
								style="gap: 16px; align-items: end; flex-wrap: wrap; "
							>
								<span style="flex: 1; word-break: break-all"
									>${p.payload.content.event.message.message}</span
								>
								${v===0?l`
												<div
													class="placeholder column"
													style="font-size: 12px; text-align: right"
												>
													<div style="flex: 1"></div>
													${a?l`<span>${h("now")}</span>`:o?l`
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
		</div>`}async sendMessage(t){try{await this.store.groupChats.get(this.groupChatHash).sendMessage(t),this.shadowRoot.getElementById("scrolling-chat").scrollTo({top:0,behavior:"smooth"})}catch(e){console.error(e),U(h("Error sending the message"))}}groupInfo(){const t=this.store.groupChats.get(this.groupChatHash);return pt([t.originalGroupChat.get(),t.currentGroupChat.get(),t.messages.get(),t.events.get(),t.readMessages.get(),t.messengerStore.eventsSentToRecipients.get(),t.messengerStore.acknowledgements.get()])}async updateGroupInfo(t){const e=this.shadowRoot.getElementById("save-group-info");e.loading=!0;try{await this.store.groupChats.get(this.groupChatHash).updateGroupChatInfo({avatar:t.avatar==="null"?void 0:t.avatar,name:t.name,description:t.description}),this.view="details"}catch(s){console.log(s),U(h("Error updating the group's info."))}e.loading=!1}get usersToBeAdded(){var e;const t=(e=this.shadowRoot)==null?void 0:e.getElementById("users");if(t)return t.value}async addMembers(){try{const t=this.usersToBeAdded;for(const e of t)await this.store.groupChats.get(this.groupChatHash).addMember(e);this.view="details"}catch(t){console.log(t),U(h("Error adding members."))}}renderAddMembers(t){return l`
			<div class="column" style="flex: 1">
				<div
					part="top-bar"
					class="row top-bar"
					style="gap: 8px; align-items: center"
				>
					<sl-icon-button
						.src=${A(Be)}
						@click=${()=>{this.view="details"}}
					></sl-icon-button>
					<span>${h("Add members")}</span>
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
											@click=${async e=>{const s=e.target;s.loading=!0,this.addMembers().finally(()=>{s.loading=!1})}}
											>${h("Add members")}
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
				${Xe(e=>this.updateGroupInfo(e))}
			>
				<div
					part="top-bar"
					class="row top-bar"
					style="gap: 8px; align-items: center "
				>
					<sl-icon-button
						.src=${A(Re)}
						@click=${()=>{this.view="details"}}
					></sl-icon-button>
					<span>${h("Edit group info")}</span>
				</div>

				<div class="row" style="justify-content: center; flex: 1; margin: 16px">
					<sl-card style="flex-basis: 500px; align-items: start">
						<div class="column" style="gap: 16px; flex: 1">
							<div class="row" style="align-items: start; gap: 16px">
								<select-avatar
									name="avatar"
									.label=${h("Image*")}
									.value=${t.avatar}
								></select-avatar>
								<sl-input
									required
									.label=${h("Name")}
									name="name"
									.value=${t.name}
									style="flex: 1"
								></sl-input>
							</div>
							<sl-textarea
								.label=${h("Description")}
								name="description"
								.value=${t.description}
							></sl-textarea>
							<div style="flex: 1"></div>
							<sl-button id="save-group-info" type="submit" variant="primary"
								>${h("Save Group Info")}
							</sl-button>
						</div>
					</sl-card>
				</div>
			</form>
		`}renderDetails(t){const e=t.members.find(s=>s.agents.find(r=>x(r)===x(this.store.client.client.myPubKey)));return l`
			<div class="column" style="flex: 1">
				<div part="top-bar" class="row top-bar" style="align-items: center">
					<sl-icon-button
						.src=${A(Be)}
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
														<sl-icon .src=${A(at)}>
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

									${t.deleted?l``:l` <sl-details .summary=${h("Settings")}>
												<group-settings
													.groupChatHash=${this.groupChatHash}
												></group-settings>
											</sl-details>`}
									${!t.deleted&&!e.removed?l`
												<sl-dialog
													id="leave-group-dialog"
													.label=${h("Leave Group")}
												>
													<span
														>${h("Are you sure you want to leave this group?")}
													</span>
													<sl-button
														slot="footer"
														@click=${async s=>{const r=s.target;r.loading=!0;try{await this.store.groupChats.get(this.groupChatHash).leaveGroup()}catch(i){console.log(i),U(h("Error leaving the group."))}r.loading=!1}}
														variant="danger"
														>${h("Leave Group")}
													</sl-button>
												</sl-dialog>
												<sl-button
													variant="danger"
													outline
													@click=${async()=>{this.shadowRoot.getElementById("leave-group-dialog").show()}}
												>
													<sl-icon
														slot="prefix"
														.src=${A(Re)}
													>
													</sl-icon>
													${h("Leave group")}
												</sl-button>
											`:l``}
									${e.admin&&!e.removed&&!t.deleted?l`<sl-dialog
													id="delete-group-dialog"
													.label=${h("Delete Group")}
												>
													<span
														>${h("Are you sure you want to delete this group?")}
													</span>
													<sl-button
														slot="footer"
														@click=${async s=>{const r=s.target;r.loading=!0;try{await this.store.groupChats.get(this.groupChatHash).deleteGroupChat()}catch(i){console.log(i),U(h("Error deleting the group."))}r.loading=!1}}
														variant="danger"
														>${h("Delete Group")}
													</sl-button>
												</sl-dialog>
												<sl-button
													variant="danger"
													outline
													@click=${async()=>{this.shadowRoot.getElementById("delete-group-dialog").show()}}
												>
													<sl-icon
														slot="prefix"
														.src=${A(qe)}
													>
													</sl-icon>
													${h("Delete group")}
												</sl-button> `:l``}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`}renderView(t,e,s,r,i,a,o,n){switch(this.view){case"chat":return this.renderChat(t,e,s,r,i,a,o,n);case"details":return this.renderDetails(e);case"add-members":return this.renderAddMembers(e);case"edit-info":return this.renderEditInfo(e.info)}}render(){const t=this.groupInfo();switch(t.status){case"pending":return l`
					<sl-skeleton
						style="height: 32px; width: 32px; --border-radius: 8px"
						effect="pulse"
					></sl-skeleton>
				`;case"error":return l`<display-error
					.headline=${h("Error fetching the messages")}
					.error=${t.error}
				></display-error>`;case"completed":const[e,s,r,i,a,o,n]=t.value;return this.renderView(e,s,r,i,a.myReadMessages,o,n,a.theirReadMessages)}}};Z.styles=[_e,ue`
			:host {
				display: flex;
				font-size: 14px;
			}
			sl-tag {
				max-width: 400px;
			}
		`];pe([b(ke("group-chat-hash"))],Z.prototype,"groupChatHash",2);pe([he({context:Ae,subscribe:!0})],Z.prototype,"store",2);pe([Ke()],Z.prototype,"view",2);pe([he({context:Ve,subscribe:!0}),b()],Z.prototype,"profilesProvider",2);Z=pe([rt(),ye("group-chat")],Z);export{Z as GroupChatEl};
