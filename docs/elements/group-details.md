# `<group-details>`

## Usage

0. If you haven't already, [go through the setup for the module](/documentation/setup).

1. Import the `<group-details>` element somewhere in the javascript side of your web-app like this:

```js
import '@darksoil-studio/messenger-zome/dist/elements/group-details.js'
```

2. Use it in the html side of your web-app like this:

::: code-group
```html [Lit]
```html [Lit]
<group-chat .groupChatHash=${groupChatHash}>
</group-chat>
```

```html [React]
<group-chat groupChatHash={groupChatHash}>
</group-chat>
```

```html [Angular]
<group-chat [groupChatHash]="groupChatHash">
</group-chat>
```

```html [Vue]
<group-chat :groupChatHash="groupChatHash">
</group-chat>
```

```html [Svelte]
<group-chat groupChatHash={groupChatHash}>
</group-chat>
```
:::

> [!WARNING]
> Like all the elements in this module, `<group-details>` needs to be placed inside an initialized `<messenger-context>`.

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
import  '@darksoil-studio/profiles-zome/dist/elements/profiles-context.js';
import { ProfilesZomeMock, demoProfiles } from '@darksoil-studio/profiles-zome/dist/mocks.js';

import { MessengerZomeMock } from "../../ui/src/mocks.ts";
import { MessengerStore } from "../../ui/src/messenger-store.ts";
import { MessengerClient } from "../../ui/src/messenger-client.ts";

onMounted(async () => {
  // Elements need to be imported on the client side, not the SSR side
  // Reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  await import('@api-viewer/docs/lib/api-docs.js');
  await import('@api-viewer/demo/lib/api-demo.js');
  if (!customElements.get('messenger-context')) await import('../../ui/src/elements/messenger-context.ts');
  if (!customElements.get('group-details')) await import('../../ui/src/elements/group-details.ts');

  const profiles = await demoProfiles();
  const keys = Array.from(profiles.keys())
  const mock = new MessengerZomeMock(keys[0]);
  const client = new MessengerClient(mock, "messenger_test");

  const groupHash = await client.createGroupChat([keys[1]],
    {
      name: 'Demo group',
      description: 'Demo group',
      avatar_hash: undefined
    },
    {
      only_admins_can_add_members: false,
      only_admins_can_update_group_info: false,
      sync_message_history_with_new_members: false,
    }
  );

  const store = new MessengerStore(client);

  render(html`
  <profiles-context .store=${new ProfilesStore(new ProfilesClient(new ProfilesZomeMock(profiles, keys[0]), 'messenger_test'))}>
    <messenger-context .store=${store}>
      <api-demo src="custom-elements.json" only="group-details" exclude-knobs="store">
        <template data-element="group-details" data-target="host">
          <group-details style="height: 600px; width: 350px" group-chat-hash="${unsafeStatic(encodeHashToBase64(groupHash))}"></group-details>
        </template>
      </api-demo>
    </messenger-context>
  </profiles-context>
  `, document.querySelector('element-demo'));
});
</script>

## API Reference

`<group-details>` is a [custom element](https://web.dev/articles/custom-elements-v1), which means that it can be used in any web app or website. Here is the reference for its API:

<api-docs src="custom-elements.json" only="group-details">
</api-docs>
