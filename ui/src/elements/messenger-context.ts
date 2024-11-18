import {
	LinkedDevicesStore,
	linkedDevicesStoreContext,
} from '@darksoil-studio/linked-devices-zome';
import { LinkedDevicesContext } from '@darksoil-studio/linked-devices-zome/dist/elements/linked-devices-context.js';
import { AppClient } from '@holochain/client';
import { consume, provide } from '@lit/context';
import { appClientContext } from '@tnesh-stack/elements';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { messengerStoreContext } from '../context.js';
import { MessengerClient } from '../messenger-client.js';
import { MessengerStore } from '../messenger-store.js';

@customElement('messenger-context')
export class MessengerContext extends LitElement {
	@provide({ context: messengerStoreContext })
	@property({ type: Object })
	store!: MessengerStore;

	@consume({ context: appClientContext, subscribe: true })
	client!: AppClient;

	@consume({ context: linkedDevicesStoreContext, subscribe: true })
	linkedDevicesStore!: LinkedDevicesStore;

	@property()
	role!: string;

	@property()
	zome = 'messenger';

	connectedCallback() {
		super.connectedCallback();
		if (this.store) return;
		if (!this.role) {
			throw new Error(
				`<messenger-context> must have a role="YOUR_DNA_ROLE" property, eg: <messenger-context role="role1">`,
			);
		}
		if (!this.client) {
			throw new Error(
				`<messenger-context> must either:
				a) be placed inside <app-client-context>
					or 
				b) receive an AppClient property (eg. <messenger-context .client=\${client}>) 
					or 
				c) receive a store property (eg. <messenger-context .store=\${store}>)`,
			);
		}

		this.addEventListener('context-provider', e => {
			if (e.context === linkedDevicesStoreContext) {
				const context = e.target as LinkedDevicesContext;

				this.store = new MessengerStore(
					new MessengerClient(this.client, this.role, this.zome),
					context.store,
				);
			}
		});

		this.store = new MessengerStore(
			new MessengerClient(this.client, this.role, this.zome),
			this.linkedDevicesStore,
		);
	}

	render() {
		return html`<slot></slot>`;
	}

	static styles = css`
		:host {
			display: contents;
		}
	`;
}
