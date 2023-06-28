---
title: "Error handling best practices"
slug: "error-handling-best-practices"
hidden: true
createdAt: "2023-02-07T13:02:41.636Z"
updatedAt: "2023-02-07T13:06:47.894Z"
---
It is recommended to always catch errors that are thrown by our JavaScript agent:

```jsx
const fpPromise = FingerprintJS.load({ /* ... */ })

try {
  const fp = await fpPromise
  const result = await fp.get()
} catch (error) {
	// You can learn more about error types here: https://dev.fingerprint.com/docs/js-agent#error-handling
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

Depending on your scenario, you can decide how to act based on the error type. You can learn more about error types [here](https://dev.fingerprint.com/docs/js-agent#error-handling).

Most common errors, such as `ERROR_SCRIPT_LOAD_FAIL` and `ERROR_NETWORK_CONNECTION` are often caused by [AdBlockers](https://dev.fingerprint.com/docs/adblockers). In order to avoid them, it is recommended to use <<glossary:Subdomain setup>> or one of our <<glossary:Proxy cloud integration>>.