---
title: "React.js"
slug: "fingerprintjs-pro-react"
hidden: false
createdAt: "2022-03-09T11:44:19.010Z"
updatedAt: "2023-06-05T21:52:22.368Z"
---
The [Fingerprint React SDK](https://github.com/fingerprintjs/fingerprintjs-pro-react) is an easy way to integrate Fingerprint into your React application. It supports all capabilities of the JS agent and provides a built-in caching mechanism.

### How to install

Add `@fingerprintjs/fingerprintjs-pro-react` as a dependency to your application via npm or yarn.

```bash
npm install @fingerprintjs/fingerprintjs-pro-react
```

```bash
yarn add @fingerprintjs/fingerprintjs-pro-react
```

Wrap your application (or component) in `FpjsProvider`. You need to specify your public API key and other configuration options based on your chosen region and active integration.

```javascript
// src/index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import {
  FpjsProvider
} from '@fingerprintjs/fingerprintjs-pro-react'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FpjsProvider
      loadOptions={{
        apiKey: "<PUBLIC_API_KEY>",
        // region: "eu",
        // endpoint: "<CUSTOM_ENDPOINT>",
        // scriptUrlPattern: "<CUSTOM_SCRIPT_URL>"
      }}
    >
      <App />
    </FpjsProvider>
  </React.StrictMode>
)
```

Use the `useVisitorData` hook in your components to identify visitors.

```javascript
// src/App.jsx
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

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-react). The repository also contains [an example app](https://github.com/fingerprintjs/fingerprintjs-pro-react/tree/main/examples/create-react-app) demonstrating the usage of the library.