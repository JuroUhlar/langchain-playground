---
title: "From Fingerprint v2"
slug: "migrating-from-pro-v2"
excerpt: "Update from Fingerprint version 2 to version 3"
hidden: false
createdAt: "2022-02-03T18:59:05.098Z"
updatedAt: "2023-06-05T21:14:10.859Z"
---
The [JS agent](doc:js-agent) has several changes compared to the previous version. [Server API](doc:server-api), [webhooks](doc:webhooks) and other integrations have not changed.

## Browser support

Internet Explorer 10 is no longer supported in v3. Some old browsers like Internet Explorer 11 and Android Browser 4.1 require a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) polyfill. See the [browser support guide](doc:browser-support#old-browsers-requirements) to get a list of the supported browsers and learn how to use Fingerprint in old browsers.

## Installation

### CDN

Skip this section if you installed the v2 of the JS agent via NPM.  
The cdn.fpjs.io is no longer supported, use fpjscdn.net instead.  
Here is the new CDN URL: `https://fpjscdn.net/v3/<<browserToken>>/iife.min.js`.

The global variables `fp` and `fpLayer` were replaced with `FingerprintJS` which provides the same API as the NPM version. Instead of passing configuration parameters to `fp('config', ...)`, you should pass them to `FingerprintJS.load({ ... })`.  
Example before:

```html
<head>
  <script>
    window.fpLayer = window.fpLayer || [];
    function fp() { fpLayer.push(arguments); }
    fp('config', 'client', '<<browserToken>>');
    fp('config', 'endpoint', 'your-endpoint'); // If you have a custom subdomain
    fp('config', 'loaded', function (fpAgent) {
      // Your code that uses the agent
      fpAgent.send()
    });
  </script>
  <script async src="https://cdn.fpjs.io/@2/fp.js"></script>
</head>
```

Example after:

```html
<head>
  <script>
    // Initialize the agent at application startup.
    const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
      .then(FingerprintJS => FingerprintJS.load({
        endpoint: 'your-endpoint' // If you have a custom subdomain
      }))

    // Get the visitor identifier when you need it.
    fpPromise.then(fpAgent => {
      // Your code that uses the agent
      fpAgent.get()
    })
  </script>
</head>
```

You aren't required to pass the public API key to the `load` function because the key is a part of the URL.

### NPM

Skip this section if you installed  the v2 of the JavaScript agent via CDN. Replace the old NPM package with the new one:

```shell NPM
npm remove @fp-pro/client
npm install @fingerprintjs/fingerprintjs-pro
```
```shell Yarn
yarn remove @fp-pro/client
yarn add @fingerprintjs/fingerprintjs-pro
```

Then update the import code. Change the package name and import `FP` as a default export. Example:

```diff
- import { FP } from '@fp-pro/client'
+ import FP from '@fingerprintjs/fingerprintjs-pro'
```

The exported constants are available as default export properties and as individual exports:

```javascript
import FP, { ERROR_CLIENT_TIMEOUT } from '@fingerprintjs/fingerprintjs-pro'
FP.ERROR_CLIENT_TIMEOUT // Also works
```

## Configuration

This section describes what was changed in the configuration parameters that are passed to the `FP.load()` method or to `fp('config', ...)`.

### `client`

Rename the `client` parameter to `apiKey`.

```diff
const fp = await FP.load({
- client: '<<browserToken>>'
+ apiKey: '<<browserToken>>'
})
```

You may remove the parameter completely if you use the CDN installation method because the key is a part of the CDN URL.

### `region`

In v3, the parameter is optional for NPM, so you can remove `region: 'us'`.

### `cookieDomain`

Remove this parameter, it is not used anymore. The best cookie domain is detected automatically.

### `autoSend`

The parameter is removed. Send explicitly when the agent loads. Call `fp.get()` right after the agent loads:

```html
<script>
  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => FingerprintJS.load())
	  .then(fp => fp.get()); // Automatic sending when the agent is ready
</script>
```

### `loaded`

The parameter is removed. Put your "loaded" handling code right after the agent loads.

```html
<script>
  // Initialize the agent at application startup.
  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => FingerprintJS.load())

  fpPromise.then(fp => {
    // Put the code that handles "loaded" event here
  })
</script>
```

### `cookieKey`

Rename the parameter to `storageKey`. It affects local storage too.

### `timeoutDelay`

Rename the parameter to `delayFallback`.

## Sending data

Rename the `.send()` method to `.get()`.

```diff
const fp = await FP.load()
- await fp.send(options)
+ await fp.get(options)
```

### `callbackData`

Rename the parameter to `extendedResult`.

```diff
await fp.get({
- callbackData: true
+ extendedResult: true
})
```

### `ip`

Remove the parameter because it is not supported.

```diff
await fp.get({
- ip: 'city'
})
```

## Receiving data

Some results that were resolved in v2 are rejected in v3 and vice-versa. The shift has been done to  simplify resolved and rejected value types. See the [expected errors table](doc:js-agent#error-handling) to learn the cases that lead to errors. Generally speaking, error are thrown only when your attention is required.

The `.get()` method returns a promise that is resolved with an object of a single predictable format. The format is similar to the visitor data format from v2. The differences are described below.

### `visitorId`

If a visitor can't be identified, the `visitorId` field value is an empty string instead of `'n/a'`. The rest of the result object will have the same type (as for an identified visitor) in this case.

```diff
- import { NotAvailable } from '@fp-pro/client'
- if (result.visitorId === NotAvailable) {
+ if (!result.visitorId) {
    console.log('The visitor can not be identified')
  }
```

### `tag`

The tag field was removed from the .get() method’s response for simplicity. Previously, this value was sent and received without ever changing.

```diff
const optionsTag = { userId: 123, coupon: 'FOOBAR' }
const result = await fp.get({ tag: optionsTag })
- const resultTag = result.tag
+ const resultTag = optionsTag
```

### `botProbability`

The property is replaced with the `bot` field that has the `probability` subfield.

```diff
// Visitor data example:
  {
    visitorId: 'qwerty12345',
-   botProbability: 1,
+   bot: {
+     probability: 1
+   },
    // ...
  }
```

When the visitor isn't suspected to be a bot, the `bot` field is undefined.

The bot detection feature of JS agent is deprecated, we're working on a new product for bot detection. Please contact support for more details.

## Error handling

The JavaScript agent .get() method returns a promise which will be rejected in the case of an error. The JavaScript agent provides constants for every expected error. To see a list of common error messages, [click here](https://dev.fingerprintjs.com/docs/js-agent#error-handling).

```html CDN installation
<script>
  import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => {
      FingerprintJS.ERROR_CLIENT_TIMEOUT;
      FingerprintJS.ERROR_NETWORK_CONNECTION;
      // And many more
    });
</script>
```
```javascript NPM installation
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
// or
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

FingerprintJS.ERROR_CLIENT_TIMEOUT
FingerprintJS.ERROR_NETWORK_CONNECTION
// And many more
```

When you catch an error, check the message:

```javascript
try {
  await fp.get()
} catch (error) {
  if (error.message === FingerprintJS.ERROR_CLIENT_TIMEOUT) {
    // ...
  }
  // ...
}
```

### Search bots

In v2 the `.send()` method promise was rejected in case of a search bot. In v3 the promise is resolved with a full featured result object. Also the result has the `bot.safe` field equal to `true`. Change your search bot checking code:

```diff
- try {
-   const result = await fp.get()
+   const result = await fp.get({ extendedResult: true })
- } catch (error) {
-   if (error.reason === 'Not available for crawl bots') {
+   if (!result.visitorId && result.bot && result.bot.safe) {
      console.log("It's a crawl bot")
    }
- }
```

### Missing User-Agent header

 V3 rejects the `.get()` (ex `.send()`) method promise when a visitor accesses a site without a user-agent header because a missing user-agent header is a strong sign of a bot.