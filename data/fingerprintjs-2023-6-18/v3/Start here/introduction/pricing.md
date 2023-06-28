---
title: "Pricing explained"
slug: "pricing"
excerpt: "A guide for engineers"
hidden: false
createdAt: "2022-11-02T15:19:29.758Z"
updatedAt: "2023-06-14T11:14:11.253Z"
---
# Fingerprint Platform Pricing

Customers are billed on a monthly basis based on the number of API requests made over the billing period.  The Fingerprint Platform consists of three plans: [Pro, Pro Plus, and Enterprise](https://fingerprint.com/pricing/?utm_source=https://dev.fingerprint.com/docs/quick-start-guide).

> Check out our [Pricing & Packaging](https://fingerprint.com/pricing/) to learn which plan is best for your needs.

The minimum paid plan is $200/mo for 100,000 API requests – with additional requests will be charged at a rate of $2 per 1,000 requests.

For businesses that require 2,000,000 Monthly API requests or more, custom pricing options are available. Please reach out to [sales@fingerprint.com](mailto:sales@fingerprint.com).

### API request as a billing unit

A billable API request is performed when Fingerprint [JavaScript agent](doc:js-agent)  performs a request that results in a request_id. This occurs when leveraging our Identification or Smart Signal Products.  These requests are processed successfully by the Fingerprint Platform before being considered to be billable. The request_id can be triggered by calling the [`get()`](doc:js-agent#get-options) function from the Fingerprint  JavaScript agent or its alternative from our [frontend framework libraries](https://fingerprint.com/sdk-libraries/). Calling the [`load()`](js-agent#load-options) function is not billable, since it doesn't generate a request_id  and only loads the agent and prepares it to work.

Requests to Server API are not billable, as again they do not generate a request_id.

### Bot Detection

Bot Detection is a vital signal for detecting bots and is part of our [Pro Plus and Enterprise Plans.](https://fingerprint.com/pricing/?utm_source=https://dev.fingerprint.com/docs/quick-start-guide).

### Caching

If your application code retrieves visitor data from the application cache, it is not billed. Only those requests that hit the Fingerprint backend are billed. The majority of our [frontend libraries](https://fingerprint.com/sdk-libraries/) for specific frameworks provide various caching strategies. The number of billed requests will depend on the selected caching strategy.

### Failed requests

If an API request ends with an error, it is usually not billed. If you encounter any billing issues or believe the billing is not working correctly, please reach out to [support@fingerprint.com](mailto:support@fingerprint.com) to resolve your issue.

### Blocked requests

Requests blocked by ad blockers or application firewalls are generally not billed. 

### Throttled requests

Throttled identification requests are not billed.

### Fingerprint Mobile Identification

The same billing principles also apply to Fingerprint Identification for native [iOS](doc:ios) and [Android](native-android-integration) platforms. The billing request is triggered by the `getVisitorId()` and `getVisitorIdResponse()` functions for Android or iOS SDKs. For [React Native](doc:fingerprintjs-pro-react-native) and [Flutter](flutter) SDKs, billed requests are triggered by the `getVisitorId()` or `getVisitorData()` functions.

### Other Fingerprint platform features

Other Fingerprint platform features, such as [Server API requests](doc:server-api), [Webhooks](doc:webhooks), [Custom subdomains](doc:subdomain-integration), [Request filtering](doc:request-filtering), [integrations](https://fingerprint.com/integrations/), [libraries, and SDKs](https://fingerprint.com/sdk-libraries/) are free of charge. Some [limitations](doc:account-limits) apply.

### Pricing changes

We reserve the right to change the pricing for our current or future products. In the event of an upcoming pricing change, we'll send a newsletter to all our customers with a notification at least 30 days before the price change event.