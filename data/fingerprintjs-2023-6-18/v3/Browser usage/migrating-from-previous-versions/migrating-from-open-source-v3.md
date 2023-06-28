---
title: "From FingerprintJS Open-Source v3"
slug: "migrating-from-open-source-v3"
excerpt: "Update from FingerprintJS Open-Source version 3 to Fingerprint version 3"
hidden: false
createdAt: "2022-02-03T19:03:02.606Z"
updatedAt: "2023-06-12T11:51:07.624Z"
---
How to update from [Fingerprintjs Open-Source](https://github.com/fingerprintjs/fingerprintjs) to Fingerprint in 30 seconds:

1. Sign up on [dashboard.fingerprint.com/signup](https://dashboard.fingerprint.com/signup), create a account, then get a public API key.
2. Change the `@fingerprintjs/fingerprintjs` package to `@fingerprintjs/fingerprintjs-pro`:

   ```diff NPM
   Run:
   npm remove @fingerprintjs/fingerprintjs
   npm install @fingerprintjs/fingerprintjs-pro

   And replace the package name in your JavaScript/TypeScript code:
   - import FingerprintJS from '@fingerprintjs/fingerprintjs'
   + import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
   ```
   ```diff Yarn
   Run:
   yarn remove @fingerprintjs/fingerprintjs
   yarn add @fingerprintjs/fingerprintjs-pro

   And replace the package name in your JavaScript/TypeScript code:
   - import FingerprintJS from '@fingerprintjs/fingerprintjs'
   + import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
   ```
   ```diff CDN
   Change the script URL:
     <script>
   -   const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
   +   const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
         .then(FingerprintJS => FingerprintJS.load())

       // ...
     </script>
   ```
   ```diff CDN (legacy variant 1)
   Change the script URL:
     <script>
       // Initialize the agent at application startup.
       const fpPromise = new Promise((resolve, reject) => {
         const script = document.createElement('script');
         script.onload = resolve;
         script.onerror = reject;
         script.async = true;
   -     script.src = 'https://openfpcdn.io/fingerprintjs/v3/iife.min.js';
   +     script.src = 'https://fpjscdn.net/v3/<<browserToken>>/iife.min.js';
         document.head.appendChild(script);
       })
         .then(() => FingerprintJS.load());

       // ...
     </script>
   ```
   ```diff CDN (legacy variant 2)
   Change the script URL:
   - <script src="https://openfpcdn.io/fingerprintjs/v3/iife.min.js"></script>
   + <script src="https://fpjscdn.net/v3/<<browserToken>>/iife.min.js"></script>
     <script>
       // ...
     </script>
   ```
3. Add the public API key to the `FingerprintJS.load()` configuration:

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

That's it, the `visitorId` has pro-level accuracy of 99.5% now.