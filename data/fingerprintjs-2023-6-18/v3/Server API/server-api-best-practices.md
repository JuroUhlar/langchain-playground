---
title: "Best practices"
slug: "server-api-best-practices"
excerpt: "Recommendations and usage patterns to help you get the most out of the Server API."
hidden: false
createdAt: "2022-03-14T22:33:37.014Z"
updatedAt: "2022-08-23T15:58:00.922Z"
---
### Accessing Fingerprint Information

Generating a `visitorId` is the first step in preventing account takeover, payment fraud, and similar unwanted activity. To receive the full benefits of Fingerprint, we recommend collecting the information about your identifications.

Fortunately, Fingerprint offers a suite of features to access and save information about a `visitorId`.

- [Querying visit history](doc:querying-visitor-information)
- [Saving identification events](doc:saving-visitor-information)
[block:callout]
{
  "type": "info",
  "title": "Customizing API requests",
  "body": "If you need to assign custom properties to a `visitorId`, we recommend tagging your browser API requests. [Learn more about tagging requests](doc:tagging-information)."
}
[/block]