import { localized } from '@lit/localize';
import { mdiSend } from '@mdi/js';
import { SlTextarea } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import { sharedStyles, wrapPathInSvg } from '@darksoil-studio/holochain-elements';
import { SignalWatcher } from '@darksoil-studio/holochain-signals';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Message } from '../types';

@localized()
@customElement('message-input')
export class MessageInput extends SignalWatcher(LitElement) {
	private dispatchSendMessage(message: string) {
		if (!message || message === '') return;
		this.dispatchEvent(
			new CustomEvent('send-message', {
				bubbles: true,
				composed: true,
				detail: {
					message: {
						message,
						reply_to: undefined,
					} as Message,
				},
			}),
		);
		const input = this.shadowRoot!.getElementById('text-input') as SlTextarea;
		input.value = '';
	}
	render() {
		return html`
			<div class="row" style="align-items: center; gap: 4px">
				<sl-textarea
					type="text"
					id="text-input"
					resize="auto"
					rows="1"
					style="flex: 1; margin: 2px;"
					@keypress=${(event: KeyboardEvent) => {
						if (event.key === 'Enter') {
							const input = this.shadowRoot!.getElementById(
								'text-input',
							) as SlTextarea;

							this.dispatchSendMessage(input.value);

							event.preventDefault();
						}
					}}
				>
				</sl-textarea>
				<sl-button
					variant="primary"
					circle
					@click=${() => {
						const input = this.shadowRoot!.getElementById(
							'text-input',
						) as SlTextarea;

						this.dispatchSendMessage(input.value);

						this.shadowRoot!.querySelector('sl-textarea')!.focus();
					}}
				>
					<sl-icon .src=${wrapPathInSvg(mdiSend)}></sl-icon>
				</sl-button>
			</div>
		`;
	}

	static styles = [
		sharedStyles,
		css`
			sl-textarea::part(base) {
				border-radius: 20px;
			}
			sl-textarea::part(textarea) {
				min-height: 38px;
			}
		`,
	];
}
