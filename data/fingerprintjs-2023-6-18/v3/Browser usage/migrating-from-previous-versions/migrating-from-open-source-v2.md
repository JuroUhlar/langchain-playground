---
title: "From FingerprintJS Open-Source v2"
slug: "migrating-from-open-source-v2"
excerpt: "Update from FingerprintJS Open-Source version 2 to Fingerprint version 3"
hidden: false
createdAt: "2022-02-03T19:03:29.574Z"
updatedAt: "2023-06-12T11:51:01.765Z"
---
How to update from [Fingerprintjs Open-Source v2](https://github.com/fingerprintjs/fingerprintjs/tree/v2) to Fingerprint:

1. Sign up on [dashboard.fingerprint.com/signup](https://dashboard.fingerprint.com/signup), create an account, and get a public API key.
2. Change the `@fingerprintjs/fingerprintjs` or `fingerprintjs2` package to `@fingerprintjs/fingerprintjs-pro`. If you use NPM, run:

   ```bash NPM
   npm remove @fingerprintjs/fingerprintjs fingerprintjs2 @types/fingerprintjs__fingerprintjs @types/fingerprintjs2
   npm install @fingerprintjs/fingerprintjs-pro
   ```
   ```bash Yarn
   # Don't mind the "This module isn't specified in a package.json file" error
   yarn remove @fingerprintjs/fingerprintjs fingerprintjs2 @types/fingerprintjs__fingerprintjs @types/fingerprintjs2
   yarn add @fingerprintjs/fingerprintjs-pro
   ```

   And replace the package name in your JavaScript/TypeScript code:

   ```diff
   - import Fingerprint2 from '@fingerprintjs/fingerprintjs'
   - import Fingerprint2 from 'fingerprintjs2'
   + import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
   ```

   If you use a CDN, switch to our CDN:

   ```diff
   - <script src="https://cdn.jsdelivr.net/npm/fingerprintjs2@2/dist/fingerprint2.min.js"></script>
   + <script src="https://fpjscdn.net/v3/<<browserToken>>/iife.min.js"></script>
     <script>
       // ...
     </script>
   ```
3. Replace `requestIdleCallback` with `FingerprintJS.load`. The function will return a promise that resolves with an agent object. The agent has a `get` method that you will use instead of calling `Fingerprint2.get` directly:

   ```diff
   - requestIdleCallback(() => {
   -   Fingerprint2.get(result => {
   + const fpPromise = FingerprintJS.load()
   + fpPromise
   +   .then(fp => fp.get()){
   +   .then(result => {
         // Handle the result
       })
   - })
   ```
4. Add the public API key to the `FingerprintJS.load()` configuration:

   ```diff NPM/Yarn
   - FingerprintJS.load()
   + FingerprintJS.load({ apiKey: '<<browserToken>>' })
   ```
   ```diff CDN
   Put the key to the agent script URL:
   https://fpjscdn.net/v3/YOUR_PUBLIC_KEY

   For example:
   https://fpjscdn.net/v3/token
   https://fpjscdn.net/v3/token/iife.min.js
   ```
5. Use the visitor identifier directly (the raw components aren't provided):

   ```diff
     fp.get().then(result => {
   -   const values = result.map(function (component) { return component.value })
   -   const visitorId = Fingerprint2.x64hash128(values.join(''), 31)
   +   const visitorId = result.visitorId
     })
   ```
6. Remember that the support of Internet Explorer 10 and older has been dropped. Some old browsers like Internet Explorer 11 and Android Browser 4.1 require a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) polyfill. See the [browser support guide](doc:browser-support#old-browsers-requirements) to get a list of the supported browsers and learn how to use Fingerprint in old browsers.