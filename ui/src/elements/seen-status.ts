import { wrapPathInSvg } from '@darksoil-studio/holochain-elements';
import { mdiCheck } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { LitElement, css, html } from 'lit';

export function seenStatus(status: 'sent' | 'received' | 'seen') {
	switch (status) {
		case 'sent':
			return html`
				<sl-icon
					style="border-radius: 50%; border: 1px solid; font-size: 12px"
					.src=${wrapPathInSvg(mdiCheck)}
				></sl-icon>
			`;
		case 'received':
			return html`
				<div class="row">
					<sl-icon
						style="border-radius: 50%; border: 1px solid; font-size: 12px; margin-right: -7px"
						.src=${wrapPathInSvg(mdiCheck)}
					></sl-icon>
					<sl-icon
						style="border-radius: 50%; border: 1px solid; font-size: 12px; background-color: var(--sl-color-primary-500, blue)"
						.src=${wrapPathInSvg(mdiCheck)}
					></sl-icon>
				</div>
			`;
		case 'seen':
			return html`
				<div class="row">
					<sl-icon
						style="border-radius: 50%; border: 1px solid; font-size: 12px; margin-right: -7px; background-color: white; color: var(--sl-color-primary-500, blue)"
						.src=${wrapPathInSvg(mdiCheck)}
					></sl-icon>
					<sl-icon
						style="border-radius: 50%; border: 1px solid; font-size: 12px; background-color: white; color: var(--sl-color-primary-500, blue)"
						.src=${wrapPathInSvg(mdiCheck)}
					></sl-icon>
				</div>
			`;
	}
}
