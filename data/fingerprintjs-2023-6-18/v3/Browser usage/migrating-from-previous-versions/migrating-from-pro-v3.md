---
title: "From Fingerprint v3"
slug: "migrating-from-pro-v3"
excerpt: "Update from Fingerprint version 3 to the latest version 3"
hidden: false
createdAt: "2022-02-03T19:01:29.293Z"
updatedAt: "2023-06-05T21:13:34.584Z"
---
Because Fingerprint follows [Semantic Versioning](https://semver.org), no code changes are necessary when upgrading from version 3.X.X to the latest version of 3. You only need to increase the JS agent package version as specified in your code.

Please see the [changelog](/changelog) to learn about the latest features.

## CDN

This section is for installing JS agent without the use of NPM or Yarn.

If you use [our CDN](doc:js-agent#cdn) (`fpjscdn.net`), no action is required because it always serves the latest version of JS agent.

### jsDelivr

If you use the jsDelivr CDN, switch to our CDN:

```diff import()
<script>
- import('https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3/+esm')
+ import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => FingerprintJS.load({
-     apiKey: '<<browserToken>>'
    }));
</script>
```
```diff Async \<script>
<script>
  const script = document.createElement('script');
- script.src = 'https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3.0.0/dist/fp.min.js';
+ script.src = 'https://fpjscdn.net/v3/<<browserToken>>/iife.min.js';
  
  // ...
  
  FingerprintJS.load({
-   apiKey: '<<browserToken>>'
  });
</script>
```
```diff Sync \<script>
- <script src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3.0.0/dist/fp.min.js"></script>
+ <script src="https://fpjscdn.net/v3/<<browserToken>>/iife.min.js"></script>
  <script>
    FingerprintJS.load({
-     apiKey: '<<browserToken>>'
    });
  </script>
```
```diff UMD
require(
- ['https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3.0.0/dist/fp.umd.min.js'],
+ ['https://fpjscdn.net/v3/<<browserToken>>/umd.min.js'],
  (FingerprintJS) => {
    FingerprintJS.load({
-     apiKey: '<<browserToken>>'
    })
  }
)
```

Put your public API keys into the script URL after `/v3/`. An example script URL where the key is `public-key`: `https://fpjscdn.net/v3/public-key`.

If you use a Content Security Policy, add the `https://fpjscdn.net` origin to the allowlist. See more details in [the CSP guide](doc:js-agent-csp).

Since the public API token is a part of the URL, you may remove the `apiKey` option from the `load` function.

## NPM

This section is for using NPM or Yarn to install JS agent.

Run the  following command in a terminal to install the latest version of JS agent:

```shell NPM
npm install @fingerprintjs/fingerprintjs-pro
```
```shell Yarn
yarn add @fingerprintjs/fingerprintjs-pro
```