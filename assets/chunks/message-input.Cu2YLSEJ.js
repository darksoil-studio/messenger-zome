import{i as y,x as h,f as c,r as E}from"./messenger-client.CV9csWrB.js";import{b as z}from"./chunk.MZCVJT24.VqmoYKr-.js";import{c as M,_ as d,S as k,L as I,e as D,a as R,G as $,l as B}from"./styles.BZJ__To4.js";import{a as u,b as T,t as C}from"./property.Du0Z6lUr.js";import{S as O}from"./signal-watcher.1XZcQCR5.js";var A=y`
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
`,l=class extends k{constructor(){super(...arguments),this.localize=new I(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return h`
      <span
        part="base"
        class=${D({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?h`
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
    `}};l.styles=[M,A];l.dependencies={"sl-icon-button":z};d([u({reflect:!0})],l.prototype,"variant",2);d([u({reflect:!0})],l.prototype,"size",2);d([u({type:Boolean,reflect:!0})],l.prototype,"pill",2);d([u({type:Boolean})],l.prototype,"removable",2);l.define("sl-tag");const P=60*1e3*1e3;function N(t,r){const o=[],i=Object.entries(t).sort((s,e)=>e[1].payload.timestamp-s[1].payload.timestamp);for(const[s,e]of i)if(o.length===0){const a=new Date(e.payload.timestamp/1e3);a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0),o.push({eventsSets:[[[s,e]]],day:a})}else{const a=o[o.length-1],p=a.eventsSets[a.eventsSets.length-1],g=p[p.length-1][1],f=r.find(v=>v.find(m=>c(m)===c(g.author))),x=r.find(v=>v.find(m=>c(m)===c(e.author))),S=f===x,w=g.payload.timestamp-e.payload.timestamp<P,_=e.payload.content.event.type===g.payload.content.event.type,n=new Date(e.payload.timestamp/1e3);n.setHours(0),n.setMinutes(0),n.setSeconds(0),n.setMilliseconds(0),n.valueOf()===a.day.valueOf()?S&&w&&_?p.push([s,e]):a.eventsSets.push([[s,e]]):o.push({eventsSets:[[[s,e]]],day:n})}return o}var H=Object.getOwnPropertyDescriptor,L=(t,r,o,i)=>{for(var s=i>1?void 0:i?H(r,o):r,e=t.length-1,a;e>=0;e--)(a=t[e])&&(s=a(s)||s);return s};let b=class extends O(E){dispatchSendMessage(t){if(!t||t==="")return;this.dispatchEvent(new CustomEvent("send-message",{bubbles:!0,composed:!0,detail:{message:{message:t,reply_to:void 0}}}));const r=this.shadowRoot.getElementById("text-input");r.value=""}render(){return h`
			<div class="row" style="align-items: center; gap: 4px">
				<sl-textarea
					type="text"
					id="text-input"
					resize="auto"
					rows="1"
					style="flex: 1; margin: 2px;"
					@keypress=${t=>{if(t.key==="Enter"){const r=this.shadowRoot.getElementById("text-input");this.dispatchSendMessage(r.value),t.preventDefault()}}}
				>
				</sl-textarea>
				<sl-button
					variant="primary"
					circle
					@click=${()=>{const t=this.shadowRoot.getElementById("text-input");this.dispatchSendMessage(t.value),this.shadowRoot.querySelector("sl-textarea").focus()}}
				>
					<sl-icon .src=${R($)}></sl-icon>
				</sl-button>
			</div>
		`}};b.styles=[T,y`
			sl-textarea::part(base) {
				border-radius: 20px;
			}
			sl-textarea::part(textarea) {
				min-height: 38px;
			}
		`];b=L([B(),C("message-input")],b);export{N as o};
