---
title: "Determine the Fingerprint Agent version"
slug: "determine-the-fingerprint-pro-version"
hidden: false
createdAt: "2022-09-05T12:18:16.540Z"
updatedAt: "2023-06-05T22:50:01.790Z"
---
> 📘 Fingerprint, FingerprintJS, and open source FingerprintJS
> 
> This documentation page uses the terms `FingerprintJS` and `Fingerprint` interchangeably. For open source FingerprintJS, consult a [dedicated page](https://dev.fingerprint.com/docs/determine-the-open-source-fingerprintjs-version).

## Projects utilizing the NPM registry

### Fingerprint v2

There is a `@fp-pro/client` dependency in the `package.json` with a specific version.

### Fingerprint v3

There is a `@fingerprintjs/fingerprintjs-pro` dependency in the `package.json` with a specific version.

> 📘 Frontend frameworks
> 
> The latest versions of frontend libraries and packages provided by Fingerprint, such as [React.js](https://dev.fingerprint.com/docs/fingerprintjs-pro-react), [Vue.js](https://dev.fingerprint.com/docs/vuejs), or [Angular](https://dev.fingerprint.com/docs/angular), use the latest Fingerprint JavaScript agent.  
> For older versions, one can check a version in the `/node_modules/@fingerprintjs/fingerprintjs-pro/package.json` file.

## Projects utilizing a CDN approach

### Fingerprint v2

There is a`<script async src="https://cdn.fpjs.io/:version/fp.js"></script>` script in your code.  `:version` is a special directive that can match a literal version or a major version.

### Fingerprint v3

#### jsDelivr CDN

If you used the `jsDelivr` CDN, you can find the a version in the script path in one of the following formats. Look for a version in the `/fingerprintjs-pro@3/` path segment.

```javascript import()
import('https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3/+esm')
```
```javascript \\\<script>
script.src = 'https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3.0.0/dist/fp.min.js';
```
```javascript UMD
require(
  ['https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3.0.0/dist/fp.umd.min.js'],
  ...
```

#### Fingerprint CDN

If you used Fingerprint CDN, you can find a version in the script path in one of the following formats. Look for a version in `/v3/` path segment.

```javascript import()
const fpPromise = import('https://fpjscdn.net/v3/your-public-api-key')
```
```html HTML
<script src="https://fpjscdn.net/v3/your-public-api-key/iife.min.js"></script>
```
```javascript UMD
require(
  ['https://fpjscdn.net/v3/your-public-api-key/umd.min.js'],
  ...
```