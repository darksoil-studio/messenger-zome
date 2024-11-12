import { css, html, LitElement } from 'lit';
import { provide } from '@lit/context';
import { customElement, property } from 'lit/decorators.js';

import { messengerStoreContext } from '../context.js';
import { MessengerStore } from '../messenger-store.js';

@customElement('messenger-context')
export class MessengerContext extends LitElement {
  @provide({ context: messengerStoreContext })
  @property({ type: Object })
  store!: MessengerStore;

  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      display: contents;
    }
  `;
}
