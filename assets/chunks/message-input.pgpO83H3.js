import{i as _,x as g,f as p,r as H}from"./messenger-client.Bks7hfH7.js";import{b as I,f as F,d as B,F as M,H as R,o as d,l as O}from"./live.BiKC474q.js";import{c as w,_ as t,S as k,L as j,e as x,d as C,r as D,w as z,a as A,l as P,G as U}from"./styles.D7lbDD0V.js";import{n as a,b as L,t as q}from"./property.BL0qaIkn.js";import{S as N}from"./signal-watcher.CurgRbfO.js";var G=_`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,u=class extends k{constructor(){super(...arguments),this.localize=new j(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return g`
      <span
        part="base"
        class=${x({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?g`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};u.styles=[w,G];u.dependencies={"sl-icon-button":I};t([a({reflect:!0})],u.prototype,"variant",2);t([a({reflect:!0})],u.prototype,"size",2);t([a({type:Boolean,reflect:!0})],u.prototype,"pill",2);t([a({type:Boolean})],u.prototype,"removable",2);u.define("sl-tag");const W=60*1e3*1e3;function ae(e,s){const o=[],c=Object.entries(e).sort((i,l)=>l[1].signed_content.timestamp-i[1].signed_content.timestamp);for(const[i,l]of c)if(o.length===0){const n=new Date(l.signed_content.timestamp/1e3);n.setHours(0),n.setMinutes(0),n.setSeconds(0),n.setMilliseconds(0),o.push({eventsSets:[[[i,l]]],day:n})}else{const n=o[o.length-1],v=n.eventsSets[n.eventsSets.length-1],m=v[v.length-1][1],S=s.find(b=>b.find(f=>p(f)===p(m.provenance))),$=s.find(b=>b.find(f=>p(f)===p(l.provenance))),T=S===$,E=m.signed_content.timestamp-l.signed_content.timestamp<W,V=l.signed_content.content.type===m.signed_content.content.type,h=new Date(l.signed_content.timestamp/1e3);h.setHours(0),h.setMinutes(0),h.setSeconds(0),h.setMilliseconds(0),h.valueOf()===n.day.valueOf()?T&&E&&V?v.push([i,l]):n.eventsSets.push([[i,l]]):o.push({eventsSets:[[[i,l]]],day:h})}return o}var J=_`
  :host {
    display: block;
  }

  .textarea {
    display: grid;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control,
  .textarea__size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .textarea__size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`,r=class extends k{constructor(){super(...arguments),this.formControlController=new M(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new R(this,"help-text","label"),this.hasFocus=!1,this.title="",this.name="",this.value="",this.size="medium",this.filled=!1,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.form="",this.required=!1,this.spellcheck=!0,this.defaultValue=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)})}firstUpdated(){this.formControlController.updateValidity()}disconnectedCallback(){var e;super.disconnectedCallback(),this.input&&((e=this.resizeObserver)==null||e.unobserve(this.input))}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}setTextareaHeight(){this.resize==="auto"?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=""}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleRowsChange(){this.setTextareaHeight()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(e){if(e){typeof e.top=="number"&&(this.input.scrollTop=e.top),typeof e.left=="number"&&(this.input.scrollLeft=e.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(e,s,o="none"){this.input.setSelectionRange(e,s,o)}setRangeText(e,s,o,c="preserve"){const i=s??this.input.selectionStart,l=o??this.input.selectionEnd;this.input.setRangeText(e,i,l,c),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight())}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){const e=this.hasSlotController.test("label"),s=this.hasSlotController.test("help-text"),o=this.label?!0:!!e,c=this.helpText?!0:!!s;return g`
      <div
        part="form-control"
        class=${x({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":o,"form-control--has-help-text":c})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${x({textarea:!0,"textarea--small":this.size==="small","textarea--medium":this.size==="medium","textarea--large":this.size==="large","textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":this.resize==="none","textarea--resize-vertical":this.resize==="vertical","textarea--resize-auto":this.resize==="auto"})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${d(this.name)}
              .value=${O(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${d(this.placeholder)}
              rows=${d(this.rows)}
              minlength=${d(this.minlength)}
              maxlength=${d(this.maxlength)}
              autocapitalize=${d(this.autocapitalize)}
              autocorrect=${d(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${d(this.spellcheck)}
              enterkeyhint=${d(this.enterkeyhint)}
              inputmode=${d(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
            <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
            <div part="textarea-adjuster" class="textarea__size-adjuster" ?hidden=${this.resize!=="auto"}></div>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${c?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};r.styles=[w,F,J];t([C(".textarea__control")],r.prototype,"input",2);t([C(".textarea__size-adjuster")],r.prototype,"sizeAdjuster",2);t([D()],r.prototype,"hasFocus",2);t([a()],r.prototype,"title",2);t([a()],r.prototype,"name",2);t([a()],r.prototype,"value",2);t([a({reflect:!0})],r.prototype,"size",2);t([a({type:Boolean,reflect:!0})],r.prototype,"filled",2);t([a()],r.prototype,"label",2);t([a({attribute:"help-text"})],r.prototype,"helpText",2);t([a()],r.prototype,"placeholder",2);t([a({type:Number})],r.prototype,"rows",2);t([a()],r.prototype,"resize",2);t([a({type:Boolean,reflect:!0})],r.prototype,"disabled",2);t([a({type:Boolean,reflect:!0})],r.prototype,"readonly",2);t([a({reflect:!0})],r.prototype,"form",2);t([a({type:Boolean,reflect:!0})],r.prototype,"required",2);t([a({type:Number})],r.prototype,"minlength",2);t([a({type:Number})],r.prototype,"maxlength",2);t([a()],r.prototype,"autocapitalize",2);t([a()],r.prototype,"autocorrect",2);t([a()],r.prototype,"autocomplete",2);t([a({type:Boolean})],r.prototype,"autofocus",2);t([a()],r.prototype,"enterkeyhint",2);t([a({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],r.prototype,"spellcheck",2);t([a()],r.prototype,"inputmode",2);t([B()],r.prototype,"defaultValue",2);t([z("disabled",{waitUntilFirstUpdate:!0})],r.prototype,"handleDisabledChange",1);t([z("rows",{waitUntilFirstUpdate:!0})],r.prototype,"handleRowsChange",1);t([z("value",{waitUntilFirstUpdate:!0})],r.prototype,"handleValueChange",1);r.define("sl-textarea");var K=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,X=(e,s,o,c)=>{for(var i=c>1?void 0:c?Q(s,o):s,l=e.length-1,n;l>=0;l--)(n=e[l])&&(i=(c?n(s,o,i):n(i))||i);return c&&i&&K(s,o,i),i};let y=class extends N(H){dispatchSendMessage(e){if(!e||e==="")return;this.dispatchEvent(new CustomEvent("send-message",{bubbles:!0,composed:!0,detail:{message:{message:e,reply_to:void 0}}}));const s=this.shadowRoot.getElementById("text-input");s.value=""}render(){return g`
			<div class="row" style="align-items: center;">
				<sl-textarea
					type="text"
					id="text-input"
					resize="auto"
					rows="1"
					style="flex: 1; margin: 2px;"
					@keypress=${e=>{if(e.key==="Enter"){const s=this.shadowRoot.getElementById("text-input");this.dispatchSendMessage(s.value),e.preventDefault()}}}
				>
				</sl-textarea>
				<sl-button
					variant="primary"
					circle
					@click=${()=>{const e=this.shadowRoot.getElementById("text-input");this.dispatchSendMessage(e.value)}}
				>
					<sl-icon .src=${A(U)}></sl-icon>
				</sl-button>
			</div>
		`}};y.styles=[L,_`
			sl-textarea::part(base) {
				border-radius: 20px;
			}
			sl-textarea::part(textarea) {
				min-height: 38px;
			}
		`];y=X([P(),q("message-input")],y);export{ae as o};
