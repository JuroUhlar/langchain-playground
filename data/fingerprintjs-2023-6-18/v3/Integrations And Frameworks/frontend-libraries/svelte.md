---
title: "Svelte"
slug: "svelte"
hidden: false
createdAt: "2022-07-22T12:13:06.167Z"
updatedAt: "2023-06-05T21:52:39.907Z"
---
The [Fingerprint Svelte SDK](https://github.com/fingerprintjs/fingerprintjs-pro-svelte) is an easy way to integrate Fingerprint into your Svelte application. It supports all capabilities of the JS agent and provides a built-in caching mechanism.

### How to install

Add `@fingerprintjs/fingerprintjs-pro-svelte` as a dependency to your application via npm or yarn.

```bash
npm install @fingerprintjs/fingerprintjs-pro-svelte
```

```bash
yarn add @fingerprintjs/fingerprintjs-pro-svelte
```

Wrap your application (or component) in `FpjsProvider`. You need to specify your public API key and other configuration options based on your chosen region and active integration.

```javascript
// src/App.svelte
<script>
  import {
    FpjsProvider
  } from '@fingerprintjs/fingerprintjs-pro-svelte'
  import VisitorData from './VisitorData.svelte'
</script>
<FpjsProvider
  options={{
    loadOptions: {
      apiKey: "<PUBLIC_API_KEY>",
      // region: "eu",
      // endpoint: "<CUSTOM_ENDPOINT>",
      // scriptUrlPattern: "<CUSTOM_SCRIPT_URL>"
    }
  }}
>
  <VisitorData />
</FpjsProvider>
```

Use the `useVisitorData` hook in your components to identify visitors.

```javascript
// src/VisitorData.svelte
<script>
  import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-svelte';
  const { getData, data, isLoading, error } = useVisitorData(
    { extendedResult: true },
    { immediate: false }
  );
</script>

<div>
  <button on:click={() => getData()}>Get visitor data</button>
  {#if $isLoading} Loading... {/if}
  {#if $error} {$error.message} {/if}
  {#if $data}
    <pre>{JSON.stringify($data, null, 2)}</pre>
  {/if}
</div>
```

### Documentation

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-svelte). The repository also contains [example applications](https://github.com/fingerprintjs/fingerprintjs-pro-svelte/tree/main/examples) demonstrating the usage of the library.