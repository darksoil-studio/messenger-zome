import{i as x,x as c,f as p,r as k}from"./messenger-client.CV9csWrB.js";import{b as M}from"./chunk.MZCVJT24.CqIsFzLm.js";import{c as $,_ as g,S as I,L as D,e as R,a as n,G as B,l as C,H as d}from"./styles.fvlugEG2.js";import{a as v,b as T,t as O}from"./property.Du0Z6lUr.js";import{S as A}from"./signal-watcher.1XZcQCR5.js";var H=x`
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
`,l=class extends I{constructor(){super(...arguments),this.localize=new D(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return c`
      <span
        part="base"
        class=${R({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?c`
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
    `}};l.styles=[$,H];l.dependencies={"sl-icon-button":M};g([v({reflect:!0})],l.prototype,"variant",2);g([v({reflect:!0})],l.prototype,"size",2);g([v({type:Boolean,reflect:!0})],l.prototype,"pill",2);g([v({type:Boolean})],l.prototype,"removable",2);l.define("sl-tag");const P=60*1e3*1e3;function W(e,a){const o=[],u=Object.entries(e).sort((r,t)=>t[1].payload.timestamp-r[1].payload.timestamp);for(const[r,t]of u)if(o.length===0){const s=new Date(t.payload.timestamp/1e3);s.setHours(0),s.setMinutes(0),s.setSeconds(0),s.setMilliseconds(0),o.push({eventsSets:[[[r,t]]],day:s})}else{const s=o[o.length-1],m=s.eventsSets[s.eventsSets.length-1],h=m[m.length-1][1],w=a.find(b=>b.find(y=>p(y)===p(h.author))),S=a.find(b=>b.find(y=>p(y)===p(t.author))),_=w===S,z=h.payload.timestamp-t.payload.timestamp<P,E=t.payload.content.event.type===h.payload.content.event.type,i=new Date(t.payload.timestamp/1e3);i.setHours(0),i.setMinutes(0),i.setSeconds(0),i.setMilliseconds(0),i.valueOf()===s.day.valueOf()?_&&z&&E?m.push([r,t]):s.eventsSets.push([[r,t]]):o.push({eventsSets:[[[r,t]]],day:i})}return o}var L=Object.getOwnPropertyDescriptor,j=(e,a,o,u)=>{for(var r=u>1?void 0:u?L(a,o):a,t=e.length-1,s;t>=0;t--)(s=e[t])&&(r=s(r)||r);return r};let f=class extends A(k){dispatchSendMessage(e){if(!e||e==="")return;this.dispatchEvent(new CustomEvent("send-message",{bubbles:!0,composed:!0,detail:{message:{message:e,reply_to:void 0}}}));const a=this.shadowRoot.getElementById("text-input");a.value=""}render(){return c`
			<div class="row" style="align-items: center; gap: 4px">
				<sl-textarea
					type="text"
					id="text-input"
					resize="auto"
					rows="1"
					style="flex: 1; margin: 2px;"
					@keypress=${e=>{if(e.key==="Enter"){const a=this.shadowRoot.getElementById("text-input");this.dispatchSendMessage(a.value),e.preventDefault()}}}
				>
				</sl-textarea>
				<sl-button
					variant="primary"
					circle
					@click=${()=>{const e=this.shadowRoot.getElementById("text-input");this.dispatchSendMessage(e.value),this.shadowRoot.querySelector("sl-textarea").focus()}}
				>
					<sl-icon .src=${n(B)}></sl-icon>
				</sl-button>
			</div>
		`}};f.styles=[T,x`
			sl-textarea::part(base) {
				border-radius: 20px;
			}
			sl-textarea::part(textarea) {
				min-height: 38px;
			}
		`];f=j([C(),O("message-input")],f);function J(e){switch(e){case"sent":return c`
				<sl-icon
					style="border-radius: 50%; border: 1px solid; font-size: 12px"
					.src=${n(d)}
				></sl-icon>
			`;case"received":return c`
				<div class="row">
					<sl-icon
						style="border-radius: 50%; border: 1px solid; font-size: 12px; margin-right: -7px"
						.src=${n(d)}
					></sl-icon>
					<sl-icon
						style="border-radius: 50%; border: 1px solid; font-size: 12px; background-color: var(--sl-color-primary-500, blue)"
						.src=${n(d)}
					></sl-icon>
				</div>
			`;case"seen":return c`
				<div class="row">
					<sl-icon
						style="border-radius: 50%; border: 1px solid; font-size: 12px; margin-right: -7px; background-color: white; color: var(--sl-color-primary-500, blue)"
						.src=${n(d)}
					></sl-icon>
					<sl-icon
						style="border-radius: 50%; border: 1px solid; font-size: 12px; background-color: white; color: var(--sl-color-primary-500, blue)"
						.src=${n(d)}
					></sl-icon>
				</div>
			`}}export{W as o,J as s};
