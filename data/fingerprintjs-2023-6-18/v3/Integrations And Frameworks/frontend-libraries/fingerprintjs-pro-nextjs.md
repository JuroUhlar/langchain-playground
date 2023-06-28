---
title: "Next.js"
slug: "fingerprintjs-pro-nextjs"
hidden: false
createdAt: "2022-05-17T12:00:06.205Z"
updatedAt: "2023-06-05T21:51:45.209Z"
---
The [Fingerprint React SDK](https://github.com/fingerprintjs/fingerprintjs-pro-react) is an easy way to integrate Fingerprint into your Next.js application. It supports all capabilities of the JS agent and provides a built-in caching mechanism. 

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
// pages/_app.tsx
import {
  FpjsProvider
} from '@fingerprintjs/fingerprintjs-pro-react'
import {AppProps} from 'next/app'

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: "<PUBLIC_API_KEY>",
        // region: "eu",
        // endpoint: "<CUSTOM_ENDPOINT>",
        // scriptUrlPattern: "<CUSTOM_SCRIPT_URL>"
      }}
    >
      <Component {...pageProps} />
    </FpjsProvider>
  )
}
```

Use the `useVisitorData` hook in your components to identify visitors.

```javascript
// pages/index.tsx
import {useVisitorData} from '@fingerprintjs/fingerprintjs-pro-react'

export default function Home() {
  const {isLoading, error, data, getData} = useVisitorData(
    {extendedResult: true},
    {immediate: true}
  )

  return (
    <div>
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

### Documentation

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-react). The repository also contains [an example app](https://github.com/fingerprintjs/fingerprintjs-pro-react/tree/main/examples/next) demonstrating the usage of the library.