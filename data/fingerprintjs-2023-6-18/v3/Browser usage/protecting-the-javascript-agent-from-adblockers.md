---
title: "Protecting the JavaScript agent from ad blockers"
slug: "protecting-the-javascript-agent-from-adblockers"
hidden: false
createdAt: "2023-03-30T15:33:52.991Z"
updatedAt: "2023-06-16T16:09:09.360Z"
---
The Fingerprint [JavaScript agent](https://dev.fingerprint.com/docs/js-agent) is a piece of JavaScript responsible for collecting browser signals and sending them to the Fingerprint API for processing, identification, and bot detection. Throughout its life cycle, it makes three types of HTTP requests that can be disrupted by ad blockers or browser privacy features. 

In this article, we will discuss each JS agent request and how to protect it. Protecting the JS agent will help you identify all of your visitors with the maximum possible accuracy.

## The JavaScript agent life cycle

The agent makes three types of HTTP requests:

1. **The agent-download request** — downloads the latest device intelligence logic from our CDN.
2. **The TLS request** — gathers TLS fingerprint data of the browser.
3. **The get-result request** — sends browser data to Fingerprint API and receives the identification result.

```html Using a CDN directly
<script>
  // 1. the import() statement triggers the agent-download request 
  const fpPromise = import('https://fpjscdn.net/v3/your-public-api-key')
  	// 2. Calling FingerprintJS.load() gathers the browser attributes,
  	// triggers the TLS request to get the browser's TLS fingerprint
    .then(FingerprintJS => FingerprintJS.load())

  // 3. Calling fp.get() triggers the get-result request sent to Fingeprint API
  fpPromise
    .then(fp => fp.get())
    .then(result => console.log(result.requestId, result.visitorId))
</script>
```
```javascript Using an NPM package
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

// 1. & 2. Calling FingerprintJS.load() triggers the agent-download and TLS request
const fpPromise = FingerprintJS.load({ apiKey: 'your-public-api-key' })

// 3. Calling fp.get() triggers the identification result request sent to Fingeprint Pro API
fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.requestId, result.visitorId))
```

If you are using one of our [Frontend libraries](doc:frontend-libraries), the _agent-download_ and _TLS_ requests generally fire when the component providing the Fingerprint Identification functionality is first rendered, and the _result_ request fires depending on your setup.

> 📘 Libraries still connect to the CDN
> 
> The NPM package and client libraries still need to connect to our CDN and download the latest device intelligence logic at runtime. We routinely update our JavaScript agent to keep up with the latest changes in browsers, ad blockers, and fraud techniques. This ensures the highest possible identification accuracy without the need to frequently update your NPM dependencies and redeploy your application.

## Problem: Ad blockers

Because fingerprinting could be misused to compromise users' privacy, ad blockers like Adblock and privacy focused browsers like Brave block some or all of the JavaScript agent's requests. They do this by keeping track of Fingerprint domains hosting our APIs (for example, `fpjscdn.net`, `api.fpjs.io`, `fptls.com`) and by blocking all requests matching those domains.

Both _agent-download_ and _get-result_ requests are essential for visitor identification. The data obtained with the _TLS_ request is useful, but Fingerprint Identification can still generate an accurate visitor identifier without it.

![](https://files.readme.io/5563921-image.png)

You can examine the blocked requests in your browser developer tools (in _Console_ or _Network_ tab):  

![](https://files.readme.io/12302ed-image.png)

> 📘 JS Agent best practices
> 
> - Make sure you are handling errors thrown by the JavaScript agent. See [Error handling](https://dev.fingerprint.com/docs/js-agent#error-handling) in the JS Agent API reference.
> - Be careful not to use scripts, subdomains or URL routes with fingerprint related names like "fingerprint", "track", "fpjs", and similar which could be flagged and blocked by ad blockers. Use neutral names like "metrics" or "analytics".

## Solution: proxying requests through your domain

The best way to protect the JS agent requests from getting blocked is to proxy them through your own domain. Instead of calling Fingerprint APIs directly, you call a proxy function hosted on your own domain or subdomain, for example, `metrics.yourwebsite.com` which then passes the request to the Fingerprint API. 

![](https://files.readme.io/d466657-image.png)

The requests are now happening within the same site which means:

- The requests are not blocked by ad blockers.
- Cookies created by the request are considered "first-party" and live longer in the browser.
- Your usage of Fingerprint becomes harder to detect for fraudsters and bad actors.

This increases both effectiveness and accuracy of visitor identification. The two main options of proxying requests are _custom subdomain setup_ and _cloud proxy integrations_.

### Custom subdomain setup

Custom subdomain setup is easy to enable but can only protect the _get-result_ request. Due to scalability limitations, it cannot protect the _agent-download_ request. It still gives you the increased cookie lifetime benefits, but most users with ad blockers will remain un-identified.

- The setup is largely automated. It consists of registering your subdomain inside the Fingerprint dashboard, adjusting your DNS records and passing the subdomain to the the JS agent on your website. See [Custom subdomain setup](doc:subdomain-integration) for more information. 

### Cloud proxy integration

A cloud proxy integration using Cloudflare or AWS CloudFront  protects both _agent-download_ and _get-result_ requests. It involves deploying a proxy function on your own cloud infrastructure. Currently, we offer two cloud proxy integrations:

- [Cloudflare Proxy Integration](doc:cloudflare-integration): The setup is largely automated. An installation wizard on our dashboard will guide you through the necessary steps. To use this integration, you website must already be served by Cloudflare. 
- [AWS CloudFront Proxy Integration](doc:cloudfront-proxy-integration): The setup consists of both automated and manual steps. Using our templates, you need to deploy a proxy function and other resources in your own AWS infrastructure, adjust your DNS records and the JS agent configuration on your website. Your website does not need to be hosted on AWS, it can run anywhere.

Due to technical limitations, neither custom subdomain setup, nor cloud proxy integrations can protect the _TLS_ request. A custom TLS endpoint domain is available for enterprise subscriptions, [contact our support](https://fingerprint.com/support/) for more details.

## Choosing your protective measure

Choosing the right protective measure depends on your use case and traffic patterns. Identifying ad-blocking traffic is more important if you get a lot of it on your website. It's also generally more important for security and fraud prevention than personalisation.

- Using one of our cloud proxy integrations is highly recommended. They protect both agent requests necessary to issue a visitor ID. You can identify all of your visitors whether they are using using ad blockers or not. See [Cloudflare Proxy Integration](doc:cloudflare-integration) or [AWS CloudFront Proxy Integration](doc:cloudfront-proxy-integration) for more details.
- Using _at least_ [custom subdomain setup](https://dev.fingerprint.com/docs/subdomain-integration) is required to reliably identify visitors on your website, mostly due to increased life time of cookies. Most of the ad-blocking traffic will remain unidentified, as most ad blockers block both _agent-download_ and _get-result_ requests.
- For most customers and use cases, a custom TLS domain is not necessary to get value from Fingerprint.

| Measure                             | Setup            | Limitations                   | Increased cookie lifetime | Can protect _agent-download_ request | Can protect _get-result_ request | Can protect _TLS_ request |
| :---------------------------------- | :--------------- | :---------------------------- | :-----------------------: | :----------------------------------: | :------------------------------: | :-----------------------: |
| Custom subdomain setup              | automated        |                               |     :white-check-mark:    |                  :x:                 |        :white-check-mark:        |            :x:            |
| Cloudflare proxy integration        | automated        | website must use Cloudflare\* |     :white-check-mark:    |          :white-check-mark:          |        :white-check-mark:        |            :x:            |
| AWS proxy  integration              | partially manual |                               |     :white-check-mark:    |          :white-check-mark:          |        :white-check-mark:        |            :x:            |
| Custom TLS domain                   | manual           | Enterprise plan only          |            :x:            |                  :x:                 |                :x:               |     :white-check-mark:    |
| Any cloud proxy + custom TLS domain | partially manual | Enterprise plan only          |     :white-check-mark:    |          :white-check-mark:          |        :white-check-mark:        |     :white-check-mark:    |

> \* The automated setup assumes your website already uses Cloudflare. Technically, it is possible to use Cloudflare integration on a website not behind Cloudflare, by hosting the Cloudflare worker on a subdomain as long as the domain DNS is managed on Cloudflare and the worker subdomain is [proxied](https://developers.cloudflare.com/dns/manage-dns-records/reference/proxied-dns-records/#proxied-records). In this case you need to create the worker [manually](https://dev.fingerprint.com/docs/cloudflare-integration-deprecated).  

If you have any questions, reach out to our [support](https://fingerprint.com/support/).

## Related topics

- Aside from ad blockers, the JavaScript agent could also get blocked by your own content security policy. See the [Content Security Policy (CSP)](doc:js-agent-csp) guide for more details.
- Aside from blocking the JavaScript agent's requests, some browsers can disable 3rd party cookies or limit the life time of script-writable data. These limitations lower identification accuracy but you can avoid them by using a custom subdomain setup or a cloud proxy integration. See [Safari Intelligent Tracking Prevention](https://dev.fingerprint.com/docs/safari-itp) for more details.
- Blog: [How ad-blockers can be used for browser fingerprinting](https://fingerprint.com/blog/ad-blocker-fingerprinting/).