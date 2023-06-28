---
title: "Static agent"
slug: "js-agent-static"
hidden: true
createdAt: "2022-03-28T14:08:49.719Z"
updatedAt: "2023-06-05T22:48:36.040Z"
---
The regular [NPM package of JS agent](doc:js-agent) downloads its code in runtime from our CDN. If you need an old style Node package that has all its code embedded and downloads no code in runtime, you can install the static Node package by following this guide.

We don't recommend installing the static package because it doesn't update automatically so you'll miss important updates that affect the precision.

## Limitations

The static package is accessed on the allowlist basis. Please reach [our support](mailto:support@fingerprintjs.com) to get an admission to use the package. We may block the static package on server side for those customers who hasn't got the admission.

## Installation

Only NPM installation is supported.

First, create a file named `.npmrc` in the root of your project (where the `package.json` file stays) with the following content:

```text .npmrc
@fingerprintjs:registry=https://npm.fpregistry.io
```

The file name is the same for Yarn (`.yarnrc` won't work).

Then install the static package:

```shell NPM
npm remove @fingerprintjs/fingerprintjs-pro
npm install @fingerprintjs/fingerprintjs-pro-static
```
```shell Yarn
yarn remove @fingerprintjs/fingerprintjs-pro
yarn add @fingerprintjs/fingerprintjs-pro-static
```

Change the package name in the code:

```diff ECMAScript
- import FingerprintJS from '@fingerprint/fingerprintjs-pro'
+ import * as FingerprintJS from '@fingerprint/fingerprintjs-pro-static'
```
```diff CommonJS
- const FingerprintJS = require('@fingerprint/fingerprintjs-pro')
+ const FingerprintJS = require('@fingerprint/fingerprintjs-pro-static')
```

Set your [region](doc:regions) explicitly and add the necessary modules:

```diff
FingerprintJS.load({
  apiKey: <<browserToken>>,
+ region: 'us',                               // The region of your API key
+ modules: [
+   FingerprintJS.makeIdentificationModule(), // If you use identification
+   FingerprintJS.makeBotdModule(),           // If you use bot detection
+ ],
})
```

You may add the modules that you don't use, but it will harm the agent performance and weight.

> 🚧 
> 
> You must change `import FingerprintJS from` to `import * as FingerprintJS from` to access the modules. Also it's good for [tree-shaking](https://en.wikipedia.org/wiki/Tree_shaking).

## Changelog

This changelog describes Static Agent versions.

A changelog that you can find [here](../changelog) describes versions of [the regular NPM package](http://npmjs.com/package/@fingerprintjs/fingerprintjs-pro) of JS agent.

#### v3.8.14

- Improve the performance in some old browsers

#### v3.8.13

- Improve the incognito detection accuracy
- Improve the performance

#### v3.8.12

- Fix the compatibility with some monitoring tools

#### v3.8.11

- Add an [error constant](doc:js-agent#error-handling) `ERROR_INVALID_ENDPOINT` which is used then the `endpoint` option value is not a valid URL
- Improve the performance and accuracy

#### v3.8.10

- Change the fallback TLS endpoints to `https://(region).fptls3.com` because the previous fallback endpoints have got blocked by some ad blockers. If you use a [Content Security Policy](doc:js-agent-csp), actualize it.
- Add the entropy sources introduced in [FingerprintJS v3.4.0](https://github.com/fingerprintjs/fingerprintjs/releases/tag/v3.4.0).

#### v3.8.9

- Minor internal improvements.

#### v3.8.8

- Improve the bot detection accuracy.
- [Open-source BotD](https://github.com/fingerprintjs/botd) is a part of Fingerprint now.

#### v3.8.7

- Minor improvements.

#### v3.8.6

- Improve the identification performance.

#### v3.8.5

- Improve the identification performance.

#### v3.8.4

- Improve the identification performance.

#### v3.8.3

- Improve the identification accuracy.

#### v3.8.2

- Remove a CORB console warning in Chrome caused by the remote monitoring (the monitoring is disabled unless turned on on your side).

#### v3.8.1

- Add an [error constant](doc:js-agent#error-handling) `ERROR_INTEGRATION_FAILURE` which will be used for errors that happen on the [integration](doc:integrations) side.
- Improve the identification accuracy.

#### v3.8.0

- Fallback endpoints. [More details](https://dev.fingerprint.com/changelog/3-8-0).