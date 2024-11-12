# Setup

> [!WARNING]
> This guide assumes that you have scaffolded a hApp with the [TNESH stack template](https://darksoil.studio/tnesh-stack).

1. Run this to scaffold this zome in your hApp:

```bash
nix run github:darksoil-studiomessenger-zome#scaffold
```

This will do the following:
  - Add the flake input for that repository in your `flake.nix`.
  - Add the appropriate zome packages to the `dna.nix` that you select.
  - Add the UI package for that zome in the local NPM package that you select.

Now you only need to integrate the zome's frontend in your web-app.

2. Connect to Holochain with the `AppClient`, and create the `MessengerStore` with it:

```js
import { MessengerStore, MessengerClient } from "@darksoil-studio/messenger-zome";
import { AppWebsocket } from "@holochain/client";

async function setupMessengerStore() {
  // TODO: change "MY_zome_name" for the roleId that you can find in your "happ.yaml"
  const client = await AppWebsocket.connect();

  // TODO: change "MY_CELL_ROLE" for the roleId that you can find in your "happ.yaml"
  return new MessengerStore(new MessengerClient(client, '<MY_CELL_ROLE>'));
}
```

3. Import the `<messenger-context>` element and add it to your html **wrapping the whole section of your page in which you are going to be placing** the other elements from `@darksoil-studio/messenger-zome`:

```js
// This can be placed in the index.js, at the top level of your web-app.
import "@darksoil-studio/messenger-zome/dist/elements/messenger-context.js";
```

And then add the `<messenger-context>` element in your html:

```html
<messenger-context>
  <!-- Add here other elements from @darksoil-studio/messenger-zome -->
</messenger-context>
```

4. Attach the `messengerStore` to the `<messenger-context>` element:

- Go to [this page](https://darksoil.studio/tnesh-stack/), select the framework you are using, and follow its example.

You need to set the `store` property of it to your already instantiated `MessengerStore` object:

- If you **are using some JS framework**:

::: code-group
```html [React]
<messenger-context store={ messengerStore}><!-- ... --></messenger-context>
```

```html [Angular]
<messenger-context [store]="messengerStore"><!-- ... --></messenger-context>
```

```html [Vue]
<messenger-context :store="messengerStore"><!-- ... --></messenger-context>
```

```html [Svelte]
<messenger-context store={ messengerStore}><!-- ... --></messenger-context>
```

```html [Lit]
<messenger-context .store=${ messengerStore}><!-- ... --></messenger-context>
```
:::

OR

- If you **are not using any framework**:

```js
const contextElement = document.querySelector("messenger-context");
contextElement.store = store;
```

> You can read more about the context pattern [here](https://darksoil.studio/tnesh-stack).

5. [Choose which elements you need](?path=/docs/frontend-elements) and import them like this:

```js
import "@darksoil-studio/messenger-zome/dist/elements/messenger-context.js";
```

And then they are ready be used inside the `<messenger-context>` just like any other HTML tag.

This will define all the elements from this module in the global `CustomElementsRegistry`. You can read more about Custom Elements [here](https://developers.google.com/web/fundamentals/web-components/customelements).

6. Add your preferred shoelace theme in your `<head>` tag:

```html
  <head>
    <link rel="stylesheet" href="path/to/shoelace/dist/themes/light.css" />
  </head>
```

You can read more about how to initialize the shoelace theme [here](https://shoelace.style/getting-started/themes?id=activating-themes).

---

That's it! You have now integrated both the backend and the frontend for the profiles module.

# Example

You can see a full working example of the UI working in [here](https://github.com/darksoil-studio/messenger/blob/main/ui/demo/index.html).

