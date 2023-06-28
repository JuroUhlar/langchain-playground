---
title: "Multiple domain tracking"
slug: "multiple-domain-tracking"
hidden: false
createdAt: "2022-02-27T20:02:25.851Z"
updatedAt: "2023-06-05T21:22:07.168Z"
---
Tracking visitors across multiple domains can be helpful in proactively mitigating fraud. With a single Fingerprint application, a browser can be identified as it visits multiple domains.

i.e. dogs.com ← `visitorId: abc123` → cats.com

To track a visitor across multiple domains, configure the JavaScript agent for each domain with a public API key from a single application. You may use separate public API keys as long as they are from the same Fingerprint application.

If you wish to query the Fingerprint Server API by domain name, the [linkedId](https://dev.fingerprintjs.com/docs/js-agent#linkedid) feature can be used.

> 🚧 Important Note:
> 
> If using the [Custom subdomain](https://dev.fingerprintjs.com/docs/subdomain-integration) on your domains, do not copy/paste the same snippet across multiple sites without first verifying the `endpoint` property in your JavaScript agent matches with the origin. Cookies set by a server may be discarded if the server and website origin do not match, thus reducing accuracy of the `visitorId`. For example, do not use `fp.dogs.com` as the endpoint on `cats.com`.