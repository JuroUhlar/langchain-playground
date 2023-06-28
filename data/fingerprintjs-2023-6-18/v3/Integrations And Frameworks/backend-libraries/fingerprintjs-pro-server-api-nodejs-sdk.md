---
title: "Node.js Server API SDK"
slug: "fingerprintjs-pro-server-api-nodejs-sdk"
hidden: false
createdAt: "2022-05-06T11:54:33.189Z"
updatedAt: "2023-06-05T21:49:10.689Z"
---
The [Fingerprint Server Node SDK](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk) is an easy way to interact with our Server API from your Node application. You can retrieve visitor history or individual fingerprinting events.

### How to install

Add `@fingerprintjs/fingerprintjs-pro-server-api` as a dependency to your application via npm or yarn.

```bash
npm install @fingerprintjs/fingerprintjs-pro-server-api
```

```bash
yarn add @fingerprintjs/fingerprintjs-pro-server-api
```

Initialize the client instance and use it to make API requests. You need to specify your secret API key and region.

```typescript
import {
  FingerprintJsServerApiClient,
  Region,
} from '@fingerprintjs/fingerprintjs-pro-server-api'

const client = new FingerprintJsServerApiClient({
  apiKey: '<SECRET_API_KEY>',
  region: Region.Global,
})

// Get visit history of a specific visitor
client.getVisitorHistory('<visitorId>').then((visitorHistory) => {
  console.log(visitorHistory)
})

// Get a specific fingerprinting event
client.getEvent('<requestId>').then((event) => {
  console.log(event)
})
```

### Documentation

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk).