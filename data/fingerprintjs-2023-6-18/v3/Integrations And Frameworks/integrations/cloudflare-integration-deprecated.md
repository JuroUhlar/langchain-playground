---
title: "Cloudflare Proxy Integration Manual Setup (Deprecated)"
slug: "cloudflare-integration-deprecated"
excerpt: "Fingerprint Pro JS agent v3.6.0 or later is required."
hidden: true
createdAt: "2022-07-07T11:51:49.232Z"
updatedAt: "2023-05-09T16:04:12.912Z"
---
> 🚧 Use the automated setup instead
> 
> This document covers the manual setup of Cloudflare Integration. For most situations, we reccommend using the [automated installation wizard](https://dev.fingerprint.com/docs/cloudflare-integration-new-accounts) instead.

Fingerprint Pro Cloudflare Integration consists of three fundamental parts:

- Fingerprint Pro infrastructure,
- Cloudflare worker,
- Fingerprint Pro JS agent.

Fingerprint Pro infrastructure creates a [Cloudflare Worker](https://workers.cloudflare.com/) that's available on the specific path on your site. The rest of your site is not affected. 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9e1180f-Untitled_drawing.png",
        "Untitled drawing.png",
        941
      ],
      "align": "center",
      "caption": "Cloudflare worker registered on a specific path"
    }
  ]
}
[/block]

Cloudflare worker code is 100% open-source and available [on GitHub](https://github.com/fingerprintjs/fingerprintjs-pro-cloudflare-worker). Once the Fingerprint Pro JS agent is configured on your site correctly, the worker is responsible for delivering the latest fingerprinting client-side logic as well as proxying identification requests and responses between your site and Fingerprint Pro's APIs.

## The benefits of using the Cloudflare Integration

- Significant increase to accuracy in browsers with strict privacy features such as Safari or Firefox.
- Cookies are now recognized as “first-party.” This means they can live longer in the browser and extend the lifetime of visitorIds.
- Ad blockers will not block our Fingerprint Pro JS agent from loading. Attempts to connect to an external URL will be stopped by most ad blockers while attempts to connect to the same site URL will be allowed.
- Ad blockers will not block our identification requests since they are sent to the specific path or subdomain that belongs to the same site.
- Insight and control over the identification requests that can be combined with other Cloudflare features like WAF or Analytics.
- With the CF Integration, you can manage an unlimited number of subdomains and paths and provide Fingerprint Pro services to all your customers at any scale while benefiting from all the 1st-party integration improvements.
- Easy to meet compliance and auditing requirements.
- Improved performance without the need to do the TLS handshakes.

## Setup process

The process consists of two steps. One needs to set up worker creation together with our support at [support@fingerprint.com](mailto:support@fingerprint.com). Afterwards, the Fingerprint Pro JS agent on the site needs to be configured to communicate with the worker.

> 📘 Prerequsities
> 
> Cloudflare Integration makes use of the Cloudflare Workers [Custom Routes](https://developers.cloudflare.com/workers/platform/triggers/routes) feature. Therefore, your site needs to be [added to Cloudflare](https://developers.cloudflare.com/fundamentals/get-started/setup/add-site/) and needs to be [proxied](https://developers.cloudflare.com/dns/manage-dns-records/reference/proxied-dns-records/) (not DNS-only) through Cloudflare.

### 1. Cloudflare worker setup

Our support team needs the following information about your Cloudflare subscription:

- Cloudflare _API Token_,
- Cloudflare _Account ID_,
- Cloudflare _Zone ID_,
- site domain (or subdomain),
- Fingerprint Pro subscription.

| Name                         | Examples                                 | Short description                                                                                                          |
| :--------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare API Token         | YQSnnxWAQiiEh9qM58wZNnyQS7FUdoqGIUAbrh7T | API Token generated from the Cloudflare's [User Profile 'API Tokens' page](https://dash.cloudflare.com/profile/api-tokens) |
| Cloudflare Account ID        | 88e2a7348d589a61edd0918e57fb136f         | The account ID obtained from the [Cloudflare Dashboard](https://dash.cloudflare.com/)                                      |
| Cloudflare Zone ID           | cd7d0123e3012345da9420df9514dad0         | The zone ID obtained from the [Cloudflare Dashboard](https://dash.cloudflare.com/)                                         |
| Site domain (or subdomain)   | yourwebsite.com, fp.yourwebsite.com      | The domain that will be part of the CF Worker's publicly accessible URL                                                    |
| Fingerprint Pro subscription | sub_2oxsc5UuxTAYTC                       | Subscription (or application) ID obtained from the [Cloudflare Dashboard](https://dashboard.fingerprint.com/subscriptions) |

#### Cloudflare API Token

The _API Token_ is required to deploy workers. Go to the [_API Tokens_ page](https://dash.cloudflare.com/profile/api-tokens), select _Create Custom Token_, and follow the steps bellow.

- Type "fingerprint.com" in the name field.
- _Add Account_ > _Workers Scripts_ > _Edit_ permission.
- _Add Zone_ > _Workers Routes_ > _Edit_ permission.
- Select the account in the _Account Resources_.
- _Select Specific zone_ > _yourwebsite_ in the _Zone Resources_.
- _Add IP Filtering_ > _3.23.16.20_.
- Do not set any TTL.

> 📘 Worker on subdomain
> 
> If you want to use Cloudflare Worker on a subdomain, make sure there is a DNS record for the subdomain.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1897793-api_token.png",
        "api token.png",
        899
      ],
      "align": "center",
      "caption": "API Token Creation Form"
    }
  ]
}
[/block]

In the next step, you should see summary and then _Create Token_.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/74d3154-api_token_summary.png",
        "api token summary.png",
        717
      ],
      "align": "center",
      "caption": "API Token Summary"
    }
  ]
}
[/block]

> 📘 API Token Safety
> 
> When creating an API Token, it is considered best practice to grant it as few privileges as possible. In the example above, the API Token has permissions to only manage workers in your account. Fingerprint Pro  will use your API Token for managing the Fingerprint Pro Cloudflare Worker and nothing else.
> 
> Fingerprint always encrypts customer data, including API tokens and configuration items. This guarantees that the data we get from our customers is securely transmitted and stored. The Client IP Address Filtering functionality adds an additional layer of security. Whitelisting our public Cloudflare service IP address ensures that the API Token can only be used by Fingerprint services and no one else.

#### Cloudflare Account ID

The _Account ID_ is required to deploy workers. Go to [Cloudflare Workers](https://dash.cloudflare.com/?to=/:account/workers) and copy the _Account ID_.

#### Cloudflare Zone ID:

The _Zone ID_ is required to deploy Cloudflare Worker on a domain that belongs to site. Go to [Cloudflare Dashboard](https://dash.cloudflare.com), select the website, copy the _Zone ID_.

#### Site domain

We need the site domain to create the Cloudflare Worker for this site.

#### Site subdomain (optional)

If you want us to create the Cloudflare Worker on a subdomain, create a DNS record in Cloudflare dashboard. Include this subdomain when contacting us.

#### Fingerprint Pro subscription

You can find list of your subscriptions in [the dashboard](https://dashboard.fingerprint.com/subscriptions).

> 👍 Worker deployment
> 
> When you provide us with the information above, we will create a Cloudflare Worker in your Cloudflare account. Since we are responsible for updating and maintenance of the Cloudflare Worker, please don't make any changes to the API Token or revoke it.
> 
> Cloudflare Worker will be named _fingerprint-pro-cloudflare-worker-yourwebsite_, you will be able to see it in [_Cloudflare Workers Dashboard_](https://dash.cloudflare.com/?to=/:account/workers/overview) once it is deployed.

### 2. Fingerprint Pro JS agent configuration

When the worker is deployed, our support will provide instructions about the Fingerprint Pro JS agent configuration. Let us know if you use [CDN](https://dev.fingerprint.com/docs/js-agent#cdn), [NPM](https://dev.fingerprint.com/docs/js-agent#npm), or any of our libraries. We will provide you with instructions on how to set up the agent.  
Before you use it in production, we recommend testing it in your staging environment.

### Using Multiple Worker Routes

Cloudflare Integration uses Cloudflare Workers, which supports [multiple routes](https://developers.cloudflare.com/workers/platform/triggers/routes/). You can add more routes if you need to but don't change the original worker route and configuration created by Fingerprint.

> 📘 This integration requires a pre-paid annual contract
> 
> It's not available for free-tier or monthly self-service customers.  
> Please contact [support@fingerprint.com](mailto:support@fingerprint.com) if you have any questions.