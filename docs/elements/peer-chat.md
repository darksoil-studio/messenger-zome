# `<peer-chat>`

## Usage

0. If you haven't already, [go through the setup for the module](../setup.md).

1. Import the `<peer-chat>` element somewhere in the javascript side of your web-app like this:

```js
import '@darksoil-studio/messenger-zome/dist/elements/peer-chat.js'
```

2. Use it in the html side of your web-app like this:

::: code-group
```html [Lit]
<peer-chat .peerChatHash=${peerChatHash}>
</peer-chat>
```

```html [React]
<peer-chat peerChatHash={peerChatHash}>
</peer-chat>
```

```html [Angular]
<peer-chat [peerChatHash]="peerChatHash">
</peer-chat>
```

```html [Vue]
<peer-chat :peerChatHash="peerChatHash">
</peer-chat>
```

```html [Svelte]
<peer-chat peerChatHash={peerChatHash}>
</peer-chat>
```
:::

> [!WARNING]
> Like all the elements in this module, `<peer-chat>` needs to be placed inside an initialized `<messenger-context>`.

## Demo

Here is an interactive demo of the element:

<element-demo>
</element-demo>

<script setup>
import { onMounted } from "vue";
import { decodeHashFromBase64, encodeHashToBase64, fakeActionHash, fakeAgentPubKey } from '@holochain/client';
import { render } from "lit";
import { html, unsafeStatic } from "lit/static-html.js";
import { ProfilesClient, ProfilesStore } from '@darksoil-studio/profiles-zome';
import { ProfilesZomeMock, demoProfiles } from '@darksoil-studio/profiles-zome/dist/mocks.js';

import { MessengerZomeMock } from "../../ui/src/mocks.ts";
import { MessengerStore } from "../../ui/src/messenger-store.ts";
import { MessengerClient } from "../../ui/src/messenger-client.ts";

onMounted(async () => {
  // Elements need to be imported on the client side, not the SSR side
  // Reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  await import('@api-viewer/docs/lib/api-docs.js');
  await import('@api-viewer/demo/lib/api-demo.js');
  await import('@darksoil-studio/profiles-zome/dist/elements/profiles-context.js');
  if (!customElements.get('messenger-context')) await import('../../ui/src/elements/messenger-context.ts');
  if (!customElements.get('peer-chat')) await import('../../ui/src/elements/peer-chat.ts');

  const profiles = await demoProfiles();
  const keys = Array.from(profiles.keys())
  const mock = new MessengerZomeMock(keys[0]);
  const client = new MessengerClient(mock, "messenger_test");

  const peerChatHash = await client.createPeerChat(keys[1]);

  const store = new MessengerStore(client);

  render(html`
  <profiles-context .store=${new ProfilesStore(new ProfilesClient(new ProfilesZomeMock(profiles), 'messenger_test'))}>
    <messenger-context .store=${store}>
      <api-demo src="custom-elements.json" only="peer-chat" exclude-knobs="store">
        <template data-element="peer-chat" data-target="host">
          <peer-chat style="height: 400px; width: 350px" peer-chat-hash="${unsafeStatic(encodeHashToBase64(peerChatHash))}"></peer-chat>
        </template>
      </api-demo>
    </messenger-context>
  </profiles-context>
  `, document.querySelector('element-demo'));
});
</script>

## API Reference

`<peer-chat>` is a [custom element](https://web.dev/articles/custom-elements-v1), which means that it can be used in any web app or website. Here is the reference for its API:

<api-docs src="custom-elements.json" only="peer-chat">
</api-docs>
