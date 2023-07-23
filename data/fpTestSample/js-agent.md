---
title: "JavaScript agent"
slug: "js-agent"
excerpt: "Fingerprint Platform JavaScript browser SDK. Not supported in Node.js, requires web browser to work."
hidden: false
metadata: 
  title: "Introduction to the JavaScript Agent | FingerprintJS Pro Docs"
  description: "The easy-to-install JavaScript agent collects multiple device and browser signals and sends them to the FingerprintJS Pro API for processing and identification."
  image: 
    0: "https://files.readme.io/785134d-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-10-08T22:59:28.187Z"
updatedAt: "2023-06-14T14:07:59.272Z"
---
The client-side agent is a high-performance JavaScript agent that collects multiple device and browser signals and sends them to the Fingerprint Platform API for processing, identification, and bot detection.

> 📘 Integrations and SDKs
> 
> For a list of supported integrations,  see [Integrations](https://dev.fingerprint.com/docs/integrations).  
> We also have [frontend SDKs](https://dev.fingerprint.com/docs/frontend-libraries) for the popular JavaScript frameworks and [Backend SDKs](https://dev.fingerprint.com/docs/backend-libraries) for working with our Server API.

> 📘 
> 
> If you want to use Bot Detection, reach out to our support at [support@fingerprint.com](mailto:support@fingerprint.com?subject=Enable%20Bot%20Detection). Browser Identification is available by default. Bot Detection works only with JS agent version 3.7.0 or newer. Check your version and [update](doc:migrating-from-previous-versions) if needed.

## Installing the agent + quick usage examples

There are various ways to install the agent but the API stays the same no matter which one you choose.

### CDN

This is the easiest way to start. It's also known as ESM import. Add the following HTML code to your page:

```html
<script>
  // Initialize the agent once at web application startup.
  // Alternatively initialize as early on the page as possible.
  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => FingerprintJS.load())

  // Analyze the visitor when necessary.
  fpPromise
    .then(fp => fp.get())
    .then(result => console.log(result.requestId, result.visitorId))
</script>
```

Put your public API key to the URL (right after `/v3/`). You can get an API key at [dashboard.fingerprint.com](https://dashboard.fingerprint.com). An example script URL where the key is `qwerty`: `https://fpjscdn.net/v3/qwerty`.

Alternatively, you can use a synchronous code that pauses the other scripts during loading and therefore is not recommended:

```html
<script src="https://fpjscdn.net/v3/<<browserToken>>/iife.min.js"></script>
<script>
  // Initialize the agent at application startup.
  var fpPromise = FingerprintJS.load()

  // Analyze the visitor when necessary.
  fpPromise
    .then(function (fp) { return fp.get() })
    .then(result => console.log(result.requestId, result.visitorId))
</script>
```

UMD installation method designed for module loaders like [RequireJS](https://requirejs.org) is also available:

```javascript
require(
  ['https://fpjscdn.net/v3/<<browserToken>>/umd.min.js'],
  FingerprintJS => {
    // Initialize an agent.
    const fpPromise = FingerprintJS.load()

    // Analyze the visitor when necessary.
    fpPromise
      .then(fp => fp.get())
      .then(result => console.log(result.requestId, result.visitorId))
  }
)
```

> 🚧 
> 
> We don't recommend copying these JS files from fpjscdn.net to your codebase because you may miss critical updates. If you absolutely must host all JavaScript resources yourself, please reach out to our support at [support@fingerprint.com](mailto:support@fingerprint.com?subject=I%20want%20to%20keep%20JS%20Agent%20code%20on%20my%20server) for a solution.

### NPM

First install the [agent NPM package](https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro):

```shell NPM
npm install @fingerprintjs/fingerprintjs-pro
```
```shell Yarn
yarn add @fingerprintjs/fingerprintjs-pro
```

Then import the package into your code:

```javascript
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({ apiKey: '<<browserToken>>' })

// Analyze the visitor when necessary.
fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.requestId, result.visitorId))
```

We recommend typing `import * as FingerprintJS from` instead of `import FingerprintJS from` because the `*` variant allows excluding the unused code from your application by [tree-shaking](https://en.wikipedia.org/wiki/Tree_shaking).

The NPM package comes with a [TypeScript declaration](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) for a better development experience. The package can be used with various module bundlers such as [Webpack](https://webpack.js.org), [Rollup.js](https://rollupjs.org) or [Browserify](http://browserify.org). If you have a TypeScript error that occurs in the FingerprintJS file, see the [TypeScript support section](#typescript-support).

Alternatively, you can use the legacy CommonJS standard:

```javascript
const FingerprintJS = require('@fingerprintjs/fingerprintjs-pro')

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({ apiKey: '<<browserToken>>' })

// Analyze the visitor when necessary.
fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.requestId, result.visitorId))
```

> 📘 NPM package connects to our CDN for updates
> 
> When you call `FingerprintJS.load()`, the NPM package connects to our CDN and downloads the latest fingerprinting logic at runtime. We routinely update our fingerprinting agent to keep up with the latest changes in browsers, ad blockers, and fraud techniques. This ensures the highest possible identification accuracy without the need to frequently update your NPM dependencies and redeploy your application.

## Initializing the agent

The JS agent has 2 methods: `load()` and `get()`. 

The `load()` method returns a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to an agent instance. Use it to initlize the agent: 

- When using the CDN, call `import()` to download the JS agent a then `load()` on the result to get a promise of the JS agent instance.
- When using the NPM package, call `load()` to download the latest client-side logic and and get a promise of the JS instance. 

Once you have JS agent instance promise, you can resolve it and call `get()` to send an identification requests to Fingerprint API.

```html HTML & CDN
<script>
  // Initilize the agent with load()
  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => FingerprintJS.load())

  fpPromise
    .then(fp => fp.get())
    .then(result => console.log(result.requestId, result.visitorId))
</script>
```
```javascript
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

// Initilize the agent with load()
const fpPromise = FingerprintJS.load({ apiKey: '<<browserToken>>' })

fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.requestId, result.visitorId))
```

Note that both _agent-download_ and _get-result_ HTTP requests can be blocked by ad blockers if you call our CDN or API directly. See [Protecting the JavaScript agent from ad-blockers](https://dev.fingerprint.com/docs/protecting-the-javascript-agent-from-adblockers) for a detailed breakdown of available solutions.   

## `load()` options

To configure the agent, pass parameters into the “load” function.

### `apiKey`

> **Required**: yes for NPM installation  
> **Type**: string  
> **Used by products**: all

Your public API key to authenticate the agent. You can get one at [dashboard.fingerprint.com](https://dashboard.fingerprint.com). If you login into this documentation portal through the dashboard, you will be able to see your personal API key in the example below.

Example usage:

```javascript
const fpPromise = FingerprintJS.load({ apiKey: "<<browserToken>>" })
```

The parameter is required for the NPM installation method and optional for the CDN (where the key is a part of the URL).

### `region`

> **Required**: no  
> **Default**: `us`  
> **Available values**: `us`, `eu` and `ap`  
> **Used by products**: all

Use this parameter to specify the [region](regions) you picked for your application during registration (defaults to `us`). 

The Fingerprint Platform CDN can usually determine the region automatically using your API Key. Nevertheless, we recommend you specify it explicitly. Our proxy integrations like [Cloudflare](cloudflare-integration) and [CloudFront](cloudfront-proxy-integration) rely on the `region` parameter, as they do not have access to the same internal API that our CDN does. Even if you use our CDN, specifying the region explicitly will keep your JS agent working correctly if our internal API is temporarily disrupted. 

The parameter is ignored when both the `endpoint` and `tlsEndpoint` parameters are used.

Example:

```javascript
const fpPromise = FingerprintJS.load({ region: 'eu' })
```

### `endpoint`

> **Required**: no  
> **Default**: (depends on the region)  
> **Type**: `string | string[]`  
> **Used by products**: all

This parameter should only be used with the [Custom subdomain](doc:subdomain-integration) or [Cloudflare Integration](doc:fingerprintjs-pro-cloudflare-integration). Specify your custom endpoint URL here.

Multiple endpoints can be set using an array. The JS agent will try to send the request with the first endpoint, and if the request fails, retry the request with the second endpoint, and so on. Use `FingerprintJS.defaultEndpoint` to fall back to the default endpoint.

```javascript
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

const fpPromise = FingerprintJS.load({
  apiKey: 'your-public-api-key',
  endpoint: [
    'https://fp.example.com', // This endpoint will be used primarily
    FingerprintJS.defaultEndpoint, // The default endpoint will be used if the primary fails
  ],
})
```

JS agent will throw an error if an empty array is given.

### `tlsEndpoint`

> **Required**: no  
> **Default**: (depends on the region)  
> **Type**: `string | string[]`  
> **Since**: v3.1.0  
> **Used by products**: identification

Your custom TLS endpoint URL address.

Multiple endpoints can be set with an array. The JS agent will try to send the request with the first endpoint, and if the request fails, retry the request with the second endpoint, and so on. Use `FingerprintJS.defaultTlsEndpoint` to fall back to the default endpoint.

### `disableTls`

> **Required**: no  
> **Default**: `false`  
> **Type**: string  
> **Since**: v3.4.0  
> **Used by products**: identification

Set to `true` to disable the extra TLS request. This is not recommended as it will negatively affect your identification accuracy.

### `storageKey`

> **Required**: no  
> **Default**: `'_vid'`  
> **Type**: string  
> **Used by products**: identification

Name of key to store data in visitor browsers. The data is stored in cookies and local storage. You shouldn't change this parameter once your code runs in production. The change will cause the data in visitor browsers to be purged which will decrease the identification accuracy.

### `scriptUrlPattern`

> Only for NPM installation  
> **Required**: no  
> **Default**: `'https://fpnpmcdn.net/v<version>/<apiKey>/loader_v<loaderVersion>.js'`  
> **Type**: `string | string[]`  
> **Since**: v3.6.0  
> **Used by products**: all

This parameter should only be used with proxy integrations ([Cloudflare](https://dev.fingerprint.com/docs/cloudflare-integration-new-accounts), [CloudFront](doc:cloudfront-proxy-integration)). The pattern of the URL from where the JS agent downloads the latest code at runtime. By default, the JS agent downloads the code from our CDN. JS agent replaces the following substrings:

- `<version>` — the major version of the JS agent;
- `<apiKey>` — the public key set via the `apiKey` parameter;
- `<loaderVersion>` — the exact version of the `@fingerprintjs/fingerprintjs-pro` package.

You can set multiple endpoints using an array. The JS agent will try to download the code from the first URL, and if it fails, retry to download with the second URL, and so on. Use `FingerprintJS.defaultScriptUrlPattern` to fall back to the default URL.

```javascript
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

const fpPromise = FingerprintJS.load({
  apiKey: 'your-public-api-key',
  scriptUrlPattern: [
    // This endpoint will be used primarily
    '/myproxy/v<version>/<apiKey>/loader_v<loaderVersion>.js',

    // The default endpoint will be used if the primary fails
    FingerprintJS.defaultScriptUrlPattern,
  ],
})
```

## Analyzing the visitor

Once an agent instance is initialized, you can start analyzing the visitor. The analysis can involve identification or [bot detection](https://fingerprint.com/products/bot-detection/), or both depending on your application settings. You are free to analyze at any time. You can configure Fingerprint Platform to receive the visitor data in the browser, on the server (via a [webhook](doc:webhooks)), or both.

Below are a few examples of different analysis approaches. 

### Automatic mode

In many cases, you will use the automatic mode, because it's the simplest way to get started. The agent will identify the visitor on every page load. You don't need to do anything else. Just add the `fp.get()` call as soon as the agent is loaded:

```javascript
const fpPromise = FingerprintJS.load(/* ... */)
const fp = await fpPromise
const result = await fp.get()
console.log(result.requestId)
```

You can use both `async/await` and promises to get the visitor data. Example of using promises:

```javascript
const fpPromise = FingerprintJS.load(/* ... */)
fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.requestId))
```

When `get()` is called, a FingerprintJS server will send a [webhook request](doc:webhooks) to your server (once configured). You can also query the [Server API](doc:server-api#get-events) to retrieve the visitor data using the `requestId` value.

### Manual mode

Manual mode provides more granular control over when the analysis is performed. When you actually need to get visitor data (on a signup event, for example), call the `.get()` method to get the data.

```javascript Async/await
const fpPromise = FingerprintJS.load(/* ... */)

document.querySelector('#ad').addEventListener('click', async () => {
  const fp = await fpPromise
  const result = await fp.get()
  console.log(result.requestId)
})
```
```javascript Promises
const fpPromise = FingerprintJS.load(/* ... */)

document.querySelector('#ad').addEventListener('click', () => {
  fpPromise
    .then(fp => fp.get())
    .then(result => console.log(result.visitorId))
})
```

### Search bots

The Fingerprint Platform recognizes the most well-known search bots (Google, Bing, Yahoo, Baidu, DuckDuckGo, and others) and treats them differently. Whenever a page is loaded by a search bot, an analysis event is processed server-side, but the search bot requests are not billed.

## `get()` options

### `extendedResult`

> **Required**: no  
> **Default**: false  
> **Type**: boolean  
> **Used by products**: identification

Two types of responses are supported: default and extended. You don't need to pass any parameters to get the default response. Extended result format includes geolocation, incognito mode, and other information. It can be requested by setting the `extendedResult` parameter to  `true`. See more details about the responses [here](#get-response).

### `products`

> **Required**: no  
> **Default**: (depends on the API key)  
> **Type**: string\[]  
> **Since**: v3.7.0  
> **Used by products**: all

You can enable or disable Fingerprint products that will handle this request. You won't be billed for the disabled products. An example of enabling only identification:

```javascript
await fp.get({ products: ['identification'] })
```

Possible array values: 

- `'identification'` — Browser Identification
- `'botd'` — [Bot Detection](https://fingerprint.com/products/bot-detection/)

Enabled products are configured for your application via our support. Once a product is enabled, you can decide if you want to run it on a specific page or in a certain situation. 

For example, you can contact support to enable both products: "identification" and "botd". Then you can run only `identification` on the "Submit order" page, run only `botd` on the "Add comment" page, and run both on the "Create account" page. 

Application configuration of enabled products overrides the client-side `products` parameter. If the option is not set, all the products enabled for your application will be run.

### `linkedId`

> **Required**: no  
> **Default**: undefined  
> **Type**: string  
> **Constraint**: the number of characters must not exceed 256  
> **Used by products**: identification

`linkedId` is a way of linking the current analysis event with a custom identifier. This will allow you to filter visit information when using the [Server API](doc:server-api).

```javascript Add a custom identifier to an analysis event
// Making an API call
var orderId = 3936532456
fp.get({ linkedId: orderId })
// linkedId will be saved with this event and will be available to be queried later.
```

To learn more about `tag` and `linkedId` use cases, see [Linking and tagging information](https://dev.fingerprint.com/docs/tagging-information).

### `tag`

> **Required**: no  
> **Default**: undefined  
> **Type**: any simple value or an object (not arrays)  
> **Constraint**: the size must not exceed 16KB  
> **Used by products**: all

`tag` is a customer-provided value or an object that is saved with the identification event and returned back to you in a webhook message or Server API response. You can use `tag` to associate the visit event with other information you have about the visitor.

You can use any simple value (string, number, boolean) or an object. An object is saved as provided. A simple value (for example `123`) is returned wrapped in an object like this: `{ "tag": 123 }`.

Examples of using the `tag` option:

```javascript
fp.get({ tag: 123 });
fp.get({ tag: "signup" });
fp.get({ tag: { id: "456", location: { city: "Atlanta", country: "US" }});
```

What comes back in a webhook or Server API response:

```json
{
  "visitorId": "nTxJ28Gt4CegeAwdWELL",
  "tag": { "tag": 123 },
  // ...
},
{
  "visitorId": "nTxJ28Gt4CegeAwdWELL",
  "tag": { "tag": "signup" },
  // ...
},
{
  "visitorId": "nTxJ28Gt4CegeAwdWELL",
  "tag": {
    "id": "456",
    "location": {
      "city": "Atlanta",
      "country": "US"
    }
  }
  // ...
}
```

To learn more about `tag` and `linkedId` use cases, see [Linking and tagging information](https://dev.fingerprint.com/docs/tagging-information).

### `timeout`

> **Required**: no  
> **Default**: 10000  
> **Type**: number  
> **Used by products**: all

Client timeout controls the total time (both client-side and server-side) that any analysis event can run. It doesn't include the time when the page is in the background (not visible) because the browser may suspend the analysis process during that time. By default, it's 10 seconds. You can set the client-side timeout _in milliseconds_ using the `timeout` option. Example usage:

```javascript
// A timeout of 20 seconds
// An example of the client-side timeout handling
try {
  const result = await fp.get({ timeout: 20000 })
  // ...
} catch (error) {
  if (error.message === FingerprintJS.ERROR_CLIENT_TIMEOUT) {
    console.log("A timeout of 20 seconds exceeded")
  }
}
```

> 🚧 
> 
> Note that setting a low timeout (less than 2000ms) could increase identification failures on weaker devices with slower internet connections.

## `get()` response

`fp.get()` returns a promise that resolves to an object. The object format depends on the [`extendedResult`](#extendedResult) option. The format summary:

```javascript default
await fp.get()
// response:
{
  "requestId": "8nbmT18x79m54PQ0GvPq",
  "visitorId": "2JGu1Z4d2J4IqiyzO3i4",
  "visitorFound": true,
  "confidence": { "score": 0.995 }
}
```
```javascript extendedResult
await fp.get({ extendedResult: true })
// response:
{
  "requestId": "8nbmT18x79m54PQ0GvPq",
  "visitorId": "2JGu1Z4d2J4IqiyzO3i4",
  "visitorFound": true,
  "confidence": { "score": 0.995 },
  "ip": "185.230.125.20",
  "ipLocation": {
    "accuracyRadius": 10,
    "latitude": 47.3925,
    "longitude": 8.4546,
    "postalCode": "8010",
    "timezone": "Europe/Zurich",
    "city": {
      "name": "Zurich"
    },
    "continent": {
      "code": "EU",
      "name": "Europe"
    },
    "country": {
      "code": "CH",
      "name": "Switzerland"
    },
    "subdivisions": [
      {
        "isoCode": "ZH",
        "name": "Zurich"
      }
    ]
  },
  "browserName": "Chrome",
  "browserVersion": "75.0.3770",
  "os": "Mac OS X",
  "osVersion": "10.14.5",
  "device": "Other",
  "incognito": false,
  "firstSeenAt": {
    "global": "2022-03-16T11:26:45.362Z",
    "subscription": "2022-03-16T11:31:01.101Z"
  },
  "lastSeenAt": {
    "global": "2022-03-16T11:28:34.023Z",
    "subscription": null
  }
}
```

When the identification product is disabled, all the fields except `requestId` are replaced with default values.

Response fields:

### `requestId`

> **Required**: yes  
> **Type**: string

The request identifier is unique for every request. Use it to request information about a specific identification request from the [Server API](doc:server-api#get-events).

### `visitorId`

> **Required**: yes  
> **Type**: string

The browser identifier (or device identifier for mobile platforms)

The field will contain an empty string if the visitor can't be identified, for example, a search bot. If the identification product is disabled, a dummy value is used.

### `visitorFound`

> **Required**: yes  
> **Type**: boolean

If `true`, this visitor has been identified before (globally, across all Fingerprint Identification subscriptions, not only yours). If `false`, Fingerprint has never identified this visitor.

See `firstSeenAt` and `lastSeenAt` for useful timestamps of recorded visits both globally and scoped to only your subscription. 

If the identification product is disabled, a dummy value is used.

### `confidence`

> **Required**: yes  
> **Type**: `{ score: number, comment?: string }`

A number between 0 and 1 that represents the probability of accurate identification. The higher the number, the higher the chance of the visitor identifier being true. To learn more about how Fingerprint calculates this value, see [Understanding your confidence score](doc:understanding-your-confidence-score).

### `zeroTrust`

> **Required**: no  
> **Type**: `{ hiddenFields: string[], comment?: string }`

See more details in the [Zero Trust Mode](doc:zero-trust-mode) guide.

### `incognito`

> Only when `extendedResult` is `true`  
> **Required**: yes  
> **Type**: boolean

Whether the visitor is in [incognito/private mode](doc:incognito-private-mode-detection).

If the identification product is disabled, a dummy value is used.

### `browserName`

> Only when `extendedResult` is `true`  
> **Required**: yes  
> **Type**: string

Browser name. Examples: `'Safari'`, `'Chrome'`.

If the identification product is disabled, a dummy value is used.

### `browserVersion`

> Only when `extendedResult` is `true`  
> **Required**: yes  
> **Type**: string

Browser version. Example: `'78.0.3904'`.

If the identification product is disabled, a dummy value is used.

### `device`

> Only when `extendedResult` is `true`  
> **Required**: yes  
> **Type**: string

Device. For desktop/laptop devices, the value will be "Other". Example: `'Samsung SM-J330F'`.

If the identification product is disabled, a dummy value is used.

### `ip`

> Only when `extendedResult` is `true`  
> **Required**: yes  
> **Type**: string

IP address. Only IPv4 addresses are returned.

If the identification product is disabled, a dummy value is used.

### `ipLocation`

> Only when `extendedResult` is `true`  
> **Required**: no  
> **Type**: object

[IP address location](doc:geolocation). Can be empty for anonymous proxies. The value type:

```typescript
{
  accuracyRadius?: number
  latitude?: number
  longitude?: number
  timezone?: string
  postalCode?: string
  city?: {
    name: string
  }
  subdivisions?: {
    isoCode: string
    name: string
  }[]
  country?: {
    code: string
    name: string
  }
  continent?: {
    code: string
    name: string
  }
}
```

If the identification product is disabled, the value is absent.

### `os`

> Only when `extendedResult` is `true`  
> **Required**: yes  
> **Type**: string

Operating system name. Examples: `'Mac OS X'`, `'Android'`.

If the identification product is disabled, a dummy value is used.

### `osVersion`

> Only when `extendedResult` is `true`  
> **Required**: yes  
> **Type**: string

Operating system version. Examples: `'10.13.6'`.

### `firstSeenAt`

> Only when `extendedResult` is `true`  
> **Required**: yes  
> **Type**: `{ subscription: string | null, global: string | null }`

The first time this visitor was identified, both within your subscription and globally. See [Useful timestamps](doc:useful-timestamps) for more information.

If the identification product is disabled, a dummy value is used.

### `lastSeenAt`

> Only when `extendedResult` is `true`  
> **Required**: yes  
> **Type**: `{ subscription: string | null, global: string | null }`

The last time this visitor was identified, both within your subscription and globally. See [Useful timestamps](doc:useful-timestamps) for more information.

If the identification product is disabled, a dummy value is used.

## Error handling

JavaScript agent's `load` and `get` methods return a promise which will be rejected in case of an error. The table below summarizes the possible types of errors.

| Error                                                 | Short description                                                                                                                                                      |
| :---------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FingerprintJS.ERROR_NETWORK_CONNECTION`              | Fingerprint server connection error                                                                                                                                    |
| `FingerprintJS.ERROR_NETWORK_ABORT`                   | Fingerprint server request is aborted                                                                                                                                  |
| `FingerprintJS.ERROR_API_KEY_MISSING`                 | Public API key is missing                                                                                                                                              |
| `FingerprintJS.ERROR_API_KEY_INVALID`                 | Public API key is invalid                                                                                                                                              |
| `FingerprintJS.ERROR_API_KEY_EXPIRED`                 | Public API key is expired                                                                                                                                              |
| `FingerprintJS.ERROR_BAD_REQUEST_FORMAT`              | Bad Fingerprint server request data. Can be caused by a wrong TLS endpoint.                                                                                            |
| `FingerprintJS.ERROR_BAD_RESPONSE_FORMAT`             | Bad Fingerprint server response data. Can be caused by a wrong endpoint.                                                                                               |
| `FingerprintJS.ERROR_GENERAL_SERVER_FAILURE`          | General request server side failure                                                                                                                                    |
| `FingerprintJS.ERROR_CLIENT_TIMEOUT`                  | Client side timeout                                                                                                                                                    |
| `FingerprintJS.ERROR_SERVER_TIMEOUT`                  | Server request times out                                                                                                                                               |
| `FingerprintJS.ERROR_RATE_LIMIT`                      | Request rate limit is exceeded                                                                                                                                         |
| `FingerprintJS.ERROR_FORBIDDEN_ORIGIN`                | Analysis request is blocked due to a forbidden origin (see [request filtering](doc:request-filtering))                                                                 |
| `FingerprintJS.ERROR_FORBIDDEN_HEADER`                | Analysis request is blocked due to a forbidden HTTP header (see [request filtering](doc:request-filtering))                                                            |
| `FingerprintJS.ERROR_FORBIDDEN_ENDPOINT`              | Analysis request is blocked due to a forbidden `endpoint`. Probably because the default endpoint is used instead of the [custom subdomain](doc:subdomain-integration). |
| `FingerprintJS.ERROR_WRONG_REGION`                    | The [region](doc:regions) set in the agent options doesn't match the region that was used to create your application                                                   |
| `FingerprintJS.ERROR_SUBSCRIPTION_NOT_ACTIVE`         | Your application hasn't been activated in the dashboard                                                                                                                |
| `FingerprintJS.ERROR_UNSUPPORTED_VERSION`             | The JS agent version is not supported                                                                                                                                  |
| `FingerprintJS.ERROR_SCRIPT_LOAD_FAIL`                | Failed to load the JS agent code. The error is available only for NPM installation.                                                                                    |
| `FingerprintJS.​ERROR_INSTALLATION_METHOD_RESTRICTED` | The JS agent installation method is not allowed                                                                                                                        |
| `FingerprintJS.ERROR_CSP_BLOCK`                       | Blocked by the [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) of the page                                                            |
| `FingerprintJS.ERROR_INTEGRATION_FAILURE`             | Failure on the [integration](doc:integrations) side                                                                                                                    |
| `FingerprintJS.ERROR_INVALID_ENDPOINT`                | The given [endpoint](#endpoint) is not a valid URL                                                                                                                     |

With the exception of `ERROR_CLIENT_TIMEOUT`, `ERROR_NETWORK_CONNECTION` `ERROR_NETWORK_ABORT`, `ERROR_SCRIPT_LOAD_FAIL` and `ERROR_CSP_BLOCK`, all the errors described above will include the [`requestId` field](#requestid). The methods can also throw other unexpected errors, they should be treated as agent bugs.

Error handling example:

```javascript Async/await
const fpPromise = FingerprintJS.load({ /* ... */ })

try {
  const fp = await fpPromise
  const result = await fp.get()
} catch (error) {
  switch (error.message) {
    case FingerprintJS.ERROR_GENERAL_SERVER_FAILURE:
      console.log('Unknown server error. Request id:', error.requestId)
      break
    case FingerprintJS.ERROR_CLIENT_TIMEOUT:
      console.log('Analysis time limit of 10 seconds is exceeded')
      break
    default:
      console.log('Other error')
  }
}
```
```javascript Promises
const fpPromise = FingerprintJS.load({ /* ... */ })

fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.visitorId))
  .catch(error => {
    switch (error.message) {
      case FingerprintJS.ERROR_GENERAL_SERVER_FAILURE:
        console.log('Unknown server error. Request id:', error.requestId)
        break
      case FingerprintJS.ERROR_CLIENT_TIMEOUT:
        console.log('Identification time limit of 10 seconds is exceeded')
        break
      default:
        console.log('Other error')
    }
  })
```

The connection error occurs when the agent fails to connect to the server API. This can happen during a network outage or if a browser plugin blocks networking requests \(e.g. AdBlock\).

### Timeouts

Two types of timeouts are possible: a **server** timeout and a **client** timeout.

#### Server timeout

The server timeout is fixed at 10 seconds of server-side processing time. If server-side processing exceeds 10 seconds for any reason, the promise will be rejected.

#### Client timeout

[Client timeout](#timeout) controls the total time (both client-side and server-side) that any analysis event is allowed to run. By default, it's 10 seconds. Note that even if the client-side timeout is exceeded, the server-side request can still be running, and its results will be sent to you via a [webhook](doc:webhooks) if enabled.

### Rate limiting

Every application API key has a rate limit. It means that you cannot make more requests per second than your rate limit allows. Paid applications have a limit of 5 requests per second, which you can increase by emailing [support@fingerprint.com](mailto:support@fingerprint.com). 

Whenever the rate limit is exceeded, the request is throttled and an `ERROR_RATE_LIMIT` error is thrown.

### Retrying after an error

JS agent retries automatically in case of failure. If you want the agent to make more attempts, increase the [timeout](#timeout). If you want to retry with another endpoint, set an array of endpoints in the JS agent option (see options: [scriptUrlPattern](#scripturlpattern), [endpoint](#endpoint), and [tlsEndpoint](#tlsendpoint)).

We don't recommend implementing your own retry mechanism around the JS agent because it can lead to excessive consumption of paid API calls.

## Supported browsers

The JS agent supports all popular browsers. See more details and learn how to run the agent in old browsers in the [browser support guide](doc:browser-support).

## TypeScript support

JS agent officially supports TypeScript version 4.9 but may work with newer and older versions of TypeScript. If you face a TypeScript error that occurs in a `.d.ts` file provided by FingerprintJS ([example 1](https://github.com/fingerprintjs/fingerprintjs/issues/651), [example 2](https://github.com/fingerprintjs/fingerprintjs/issues/653)), consider any of these solutions:

- Update the TypeScript package in your project to version 4.9 or newer
  ```bash
  npm i typescript@^4.9
  # or
  yarn add typescript@^4.9
  ```
- Prevent TypeScript from using the library types. Replace

  ```ts
  import ... from '@fingerprintjs/fingerprintjs-pro'
  ```

    with

  ```ts
  import ... from '@fingerprintjs/fingerprintjs-pro/dist/fp.esm.min'
  ```

    in your `.ts` files, and add the following line to a `.d.ts` file (if there is no such file, create one anywhere with any name):

  ```
  declare module '@fingerprintjs/fingerprintjs-pro/dist/fp.esm.min'
  ```