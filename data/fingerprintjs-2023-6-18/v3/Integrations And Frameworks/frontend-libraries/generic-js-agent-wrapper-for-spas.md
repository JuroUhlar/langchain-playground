---
title: "Generic JS Agent Wrapper for SPAs"
slug: "generic-js-agent-wrapper-for-spas"
hidden: false
createdAt: "2023-01-27T10:53:07.701Z"
updatedAt: "2023-06-05T21:53:20.167Z"
---
The [`fingerprintjs-pro-spa` open-source library](https://github.com/fingerprintjs/fingerprintjs-pro-spa) is a framework-agnostic wrapper over the Fingerprint JS Agent with a built-in caching mechanism. It is used by our other frontend libraries under the hood.   

> 👍 SDKs tailor-made for your framework
> 
> If you are using [React (including Next, Preact)](https://github.com/fingerprintjs/fingerprintjs-pro-react), [Vue](https://github.com/fingerprintjs/fingerprintjs-pro-vue), [Svelte](https://github.com/fingerprintjs/fingerprintjs-pro-svelte) or [Angular](https://github.com/fingerprintjs/fingerprintjs-pro-angular), we recommend using the SDK made for your specific framework. 
> 
> If you are using vanilla JavaScript, a different framework, or just you prefer a lower-level library, feel free to use `fingerprintjs-pro-spa` to integrate Fingerprint into your website.

## Installation

Install using your favorite package manager: 

```shell npm
npm install @fingerprintjs/fingerprintjs-pro-spa
```
```text Yarn
yarn add @fingerprintjs/fingerprintjs-pro-spa
```

## Create the client

Create a `FpjsClient` instance before rendering or initializing your application. You should only have one instance of the client.

```js
import { FpjsClient } from '@fingerprintjs/fingerprintjs-pro-spa';

// It can receive multiple parameters but the only required one is `loadOptions`, which contains the public API key
const fpjsClient = new FpjsClient({
  loadOptions: {
    apiKey: "your-fpjs-public-api-key" // insert your public api key from the dashboard here
  }
});
```

You can learn more about different load options here: <https://dev.fingerprint.com/docs/js-agent#agent-initialization>

## Initialise the JS agent

Before you start making identification requests to the Fingerprint API, you need to initialize the Agent  
to allow it to gather browser signals.  
Make sure the initialization has been completed before calling the `getVisitorData` method to avoid errors.

```js
// with async/await
await fpjsClient.init()
const visitorData = await fpjsClient.getVisitorData()

// with promises
const visitorData = fpjsClient.init().then(() => {
  return fpjsClient.getVisitorData()
})
```

## Call the Fingerprint API

The `getVisitorData` method returns visitor identification data based on the request [options](https://dev.fingerprint.com/docs/js-agent#visitor-identification).  
The second parameter `ignoreCache` will make sure that a request to the API is made even if the data is present in the cache.

```js
// with async/await
const visitorData = await fpjsClient.getVisitorData({ extendedResult: true })

// with promises
const visitorData = fpjsClient.getVisitorData({ extendedResult: true }).then((visitorData) => {
  // use visitor data in your fraud prevention logic
  console.log(visitorData.visitorId);
});
```

Full documentation and source code are available on [GitHub](https://github.com/fingerprintjs/fingerprintjs-pro-spa).