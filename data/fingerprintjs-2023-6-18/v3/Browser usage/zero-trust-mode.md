---
title: "Zero Trust Mode"
slug: "zero-trust-mode"
hidden: false
createdAt: "2022-06-01T08:09:49.559Z"
updatedAt: "2023-06-14T14:37:01.870Z"
---
When you identify browsers or devices with Fingerprint, you get back the `visitorId` value.  
You can use this value in your business logic to find suspicious activity or for marketing analytics.  
By default, this value is sent back to your browser or device where you can read it and do something with it, e.g. send to your server for storage and analysis.  
This works fine in most cases, but sometimes you want to **not** receive the `visitorId` value from Fingerprint back to your devices. In security-critical applications, you want to hide that value and only read it on the server with your private API key.  
Instead, you get back a random `requestId` value that you can use later to [read the actual visitorId server-side](doc:server-api#get-events-identification--bot-detection).  
This mode of running the identification and not sending the `visitorId` back to the client device is called **Zero Trust Mode**.

The Fingerprint API supports **Zero Trust Mode** to make it very difficult to send malicious identification requests that impersonate other visitors.  
Zero Trust Mode is implemented internally by _identification result hiding_ and _strict origin checking_ features.

## Identification Result Hiding

Zero Trust Mode requires this feature to avoid sending the identification results to end-user  browsers.

When enabled, these fields will not be sent to the end-user browser: `visitorId`, `visitorFound`, and [`confidenceScore`](doc:understanding-your-confidence-score). The [requestId](doc:server-api#requestid) field will still be returned, because you need it to get the full results later using our [Server API](doc:server-api#get-events-identification--bot-detection).  
Importantly, when Zero Trust Mode is enabled, you will still get full results through the [webhook](doc:webhooks).

In addition to the `requestId`, the [JavaScript agent response](doc:js-agent#extendedresult) will include a new field called `zeroTrust` that will list all the fields that were hidden:

```json
{
  "requestId": "...",
  "zeroTrust": {
    "hiddenFields": ["visitorId", "visitorFound", "confidence"],
    "comment": "The result was hidden because of the subscription configuration."
  }
}
```

## Strict Origin Checking

In all modern browsers the [Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) header is automatically included in all cross-origin requests.  
Websites cannot spoof this header. However some signals collected by the [JavaScript agent](doc:js-agent) can be spoofed.

When Zero Trust Mode is enabled, the _strict origin checking_ feature detects inconsistencies between the data collected by the JavaScript agent and the request headers that cannot be spoofed by the browser. These headers are the [Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) and the [Referer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer). Identification requests with the inconsistencies are rejected by the server. This ensures that the `url` and `clientReferrer` values can’t be spoofed. That is important because `url` and `clientReferrer` are exposed in our Server API and webhook responses.

You can use Zero Trust Mode with the [request filtering](doc:request-filtering) feature for additional security.

This mode is only available for the [Enterprise](https://fingerprintjs.com/pricing/) subscription tier.  
It can be enabled on a per-subscription level.

> 📘 
> 
> If you would like to try this mode or learn more, please contact our support at [support@fingerprint.com](mailto:support@fingerprint.com).