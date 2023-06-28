---
title: "Regions"
slug: "regions"
hidden: false
metadata: 
  title: "Server regions | FingerprintJS Pro Documentation"
  description: "The US FingerprintJS Pro server is located in North Virginia and the EU server is in Frankfurt, Germany."
  image: 
    0: "https://files.readme.io/9489b3f-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-10-08T22:59:28.180Z"
updatedAt: "2023-06-05T21:27:27.219Z"
---
Fingerprint is available in the following regions

| Region        | Code                           | Base API URL             |
| :------------ | :----------------------------- | :----------------------- |
| Global (US)   | not required, defaults to `us` | `https://api.fpjs.io`    |
| EU            | `eu`                           | `https://eu.api.fpjs.io` |
| Asia (Mumbai) | `ap`                           | `https://ap.api.fpjs.io` |

### Non-global Region users

If you chose a non-global region during registration, please add this to the JS agent initialization:

```diff EU
FingerprintJS.load({
  apiKey: '<<browserToken>>',
  // note that you don't need to specify the region
  // if you use the global endpoint
+ region: 'eu'
})
```
```diff Asia (Mumbai)
FingerprintJS.load({
  apiKey: '<<browserToken>>',
  // note that you don't need to specify the region
  // if you use the global endpoint
+ region: 'ap'
})
```

In the following examples we will use the EU region code for simplicity:

```html CDN
<script>
  // Initialize the agent at application startup.
  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => FingerprintJS.load({
      // note that you don't need to specify the region 
      // if you use the global endpoint
      region: 'eu'
    }));

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get())
    .then(result => console.log(result.visitorId));
</script>
```
```javascript NPM
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
 
const fpPromise = FingerprintJS.load({
  apiKey: '<<browserToken>>',
  // note that you don't need to specify the region 
  // if you use the global endpoint
  region: 'eu'
})

// When you need the visitor identifier:
fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.visitorId))
```