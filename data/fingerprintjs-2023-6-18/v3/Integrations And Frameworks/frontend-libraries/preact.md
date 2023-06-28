---
title: "Preact"
slug: "preact"
hidden: false
createdAt: "2022-07-22T11:04:34.219Z"
updatedAt: "2023-06-05T21:52:05.475Z"
---
The [Fingerprint React SDK](https://github.com/fingerprintjs/fingerprintjs-pro-react) is an easy way to integrate Fingerprint into your Preact application. It supports all capabilities of the JS agent and provides a built-in caching mechanism.

### How to install

Add `@fingerprintjs/fingerprintjs-pro-react` as a dependency to your application via npm or yarn.

```
npm install @fingerprintjs/fingerprintjs-pro-react
```

```
yarn add @fingerprintjs/fingerprintjs-pro-react
```

Wrap your application (or component) in `FpjsProvider`. You need to specify your public API key and other configuration options based on your chosen region and active integration.

```javascript
// src/components/app.js
import {
  FpjsProvider
} from '@fingerprintjs/fingerprintjs-pro-react';
import Home from '../routes/home';

export default function Wrapper() {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: "<PUBLIC_API_KEY>",
        // region: "eu",
        // endpoint: "<CUSTOM_ENDPOINT>",
        // scriptUrlPattern: "<CUSTOM_SCRIPT_URL>"
      }}
    >
      <Home />
    </FpjsProvider>
  );
}
```

Use the `useVisitorData` hook in your components to identify visitors.

```javascript
// src/routes/home/index.js
import {useVisitorData} from '@fingerprintjs/fingerprintjs-pro-react'

export default function Home() {
  const {isLoading, error, data, getData} = useVisitorData(
    {extendedResult: true},
    {immediate: true}
  )

  return (
    <div id='preact_root'>
      <button onClick={() => getData({ignoreCache: true})}>
        Reload data
      </button>
      <p>VisitorId: {isLoading ? 'Loading...' : data?.visitorId}</p>
      <p>Full visitor data:</p>
      <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

> Note: The Fingerprint React SDK is available as an NPM package. If you are using Preact without a build tool, you can [use the JS agent directly](https://dev.fingerprint.com/docs/js-agent) by importing it from our CDN.

### Documentation

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-react). The repository also contains [an example app](https://github.com/fingerprintjs/fingerprintjs-pro-react/tree/main/examples/preact) demonstrating usage of the library.