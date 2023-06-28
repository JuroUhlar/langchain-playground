---
title: "Determine the open source FingerprintJS version"
slug: "determine-the-open-source-fingerprintjs-version"
hidden: false
createdAt: "2022-09-05T12:39:29.919Z"
updatedAt: "2023-06-05T22:50:20.220Z"
---
> 📘 Open source FingerprintJS and Fingerprint
> 
> For the Fingerprint version guide, consult a [dedicated page](https://dev.fingerprint.com/docs/determine-the-fingerprint-pro-version).

## Projects utilizing the NPM registry

### FingerprintJS all versions

There is a `@fingerprintjs/fingerprintjs` or `fingerprintjs2` dependency in the `package.json` with a specific version.

## Projects utilizing a CDN approach

### FingerprintJS v2

You can find a version in the script path in the following format. Look for a version in the `/fingerprintjs2@2/` path segment.

```html
<script src="https://cdn.jsdelivr.net/npm/fingerprintjs2@2/dist/fingerprint2.min.js"></script>
```

### FingerprintJS v3

You can find a version in the script path in one of the following formats. Look for a version in `/v3/` path segment.

```javascript CDN
const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
```
```javascript CDN (legacy variant 1)
script.src = 'https://openfpcdn.io/fingerprintjs/v3/iife.min.js';
```
```javascript CDN (legacy variant 2)
<script src="https://openfpcdn.io/fingerprintjs/v3/iife.min.js"></script>
```