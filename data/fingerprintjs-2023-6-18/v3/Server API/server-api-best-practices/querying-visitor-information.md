---
title: "Querying visitor information"
slug: "querying-visitor-information"
hidden: false
createdAt: "2022-02-27T20:22:45.871Z"
updatedAt: "2023-06-05T22:57:51.101Z"
---
In addition to [tagging](https://dev.fingerprint.com/docs/tagging-information), the [linkedId](https://dev.fingerprint.com/docs/js-agent#linkedid) lets you connect an identification event with a custom identifier that is indexed by Fingerprint. This lets you filter visit history when querying the server API. Unlike tags, the linkedId is a string. Objects or non-string values are not supported.

> 📘 Note
> 
> The server API returns identification events up to 30 days in the past. For information critical to your business, we recommend storing copies of this data on your own servers. Enterprise [plans](https://fingerprint.com/pricing/) include unlimited server-side storage of identification events.

The table below lists common use cases and basic implementation using the Fingerprint Identification [linkedId](https://dev.fingerprint.com/docs/js-agent#linkedid) and [server API visitors endpoint](https://dev.fingerprint.com/docs/server-api#get-visitor-history).

| Use Case                                                                                  | Implementation                                                                                                                                                      |
| :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Authenticated User Tracking** - bulk information collection of authenticated visitors   | Link user ID with `visitorId` upon user action i.e. login or session. Query server API by `visitorId` to view browser details about a specific user.                |
| **Form & Survey Abuse** - protect forms from duplicate entries                            | Link survey ID with `visitorId` on form submission. Query server API to validate form submissions by checking a `visitorId` for multiple entries.                   |
| **Coupon & Promo Abuse** - protect profits from duplicate promotion abuse                 | Link promo code with `visitorId` at checkout. At checkout, query server API by `visitorId` and promo code to see if promo code was used by the browser in the past. |
| **E-commerce Inventory Abuse** - prevent illicit repeat orders made by anonymous visitors | Link order ID with `visitorId` at checkout. Query server API to see orders made by a `visitorId`.                                                                   |

> 🚧 Important Note
> 
> Do not expose the server API key in production. You can make requests from the server side using our official [Node.js wrapper](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk). If you need to access the server API in production, it is recommended you perform authorization via [auth headers](https://dev.fingerprint.com/docs/server-api#auth-header) instead of using the api key inside the endpoint.