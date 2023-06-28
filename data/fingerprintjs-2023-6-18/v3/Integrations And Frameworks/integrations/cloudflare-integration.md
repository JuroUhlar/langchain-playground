---
title: "Cloudflare Proxy Integration"
slug: "cloudflare-integration"
excerpt: "Fingerprint JS agent v3.6.0 or later is required."
hidden: false
createdAt: "2022-09-19T05:39:55.681Z"
updatedAt: "2023-06-05T22:59:50.708Z"
---
Fingerprint Cloudflare Integration consists of three fundamental parts:

- Fingerprint infrastructure,
- Cloudflare worker,
- Fingerprint JS agent.

Fingerprint infrastructure creates a [Cloudflare Worker](https://workers.cloudflare.com/) that's available on the specific path on your site. The rest of your site is not affected.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/44b3a50-worker_path.png",
        "worker path.png",
        941
      ],
      "align": "center",
      "caption": "Cloudflare worker registered on a specific path"
    }
  ]
}
[/block]

Cloudflare worker code is 100% open-source and available [on GitHub](https://github.com/fingerprintjs/fingerprintjs-pro-cloudflare-worker). Once the Fingerprint JS agent is configured on your site correctly, the worker is responsible for delivering the latest fingerprinting client-side logic as well as proxying identification requests and responses between your site and Fingerprint's APIs.

## The benefits of using the Cloudflare Integration

- Significant increase in accuracy in browsers with strict privacy features such as Safari or Firefox.
- Cookies are now recognized as “first-party.” This means they can live longer in the browser and extend the lifetime of visitorIds.
- Ad blockers will not block our Fingerprint JS agent from loading. Attempts to connect to an external URL will be stopped by most ad blockers while attempts to connect to the same site URL will be allowed.
- Ad blockers will not block our identification requests since they are sent to the specific path or subdomain that belongs to the same site.
- Insight and control over the identification requests that can be combined with other Cloudflare features like WAF or Analytics.
- With the Cloudflare Integration, you can manage unlimited subdomains and paths and provide Fingerprint services to all your customers at any scale while benefiting from all the 1st-party integration improvements.
- Cookie security: Cloudflare integration drops all the cookies sent from the origin website. The worker code is open-source so this behavior can be transparently verified and audited.
- Easy to meet compliance and auditing requirements.

## Setup

The Cloudflare configuration guide on the Fingerprint [dashboard](https://dashboard.fingerprint.com/) will help you set everything up step by step. You can start the guide when creating an account, or later in the App settings.

### Newly created accounts

During the _Install_ step of the onboarding flow, select **Cloudflare**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/35ee6df-cf_wizard_step1.png",
        "cf wizard step1.png",
        1135
      ],
      "align": "center",
      "sizing": "700px",
      "caption": "Select Cloudflare Integration during onboarding"
    }
  ]
}
[/block]

### Existing accounts

Navigate to **App Settings**, switch to the **Integrations** tab, and select **Cloudflare**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e510e0b-app_settings_nav.png",
        "app settings nav.png",
        1119
      ],
      "align": "center",
      "sizing": "700px",
      "caption": "App Settings Page - Cloudflare Integration"
    }
  ]
}
[/block]

> 📘 Prerequsities
> 
> Cloudflare Integration makes use of the Cloudflare Workers [Custom Routes](https://developers.cloudflare.com/workers/platform/triggers/routes) feature. Therefore, your site needs to be [added to Cloudflare](https://developers.cloudflare.com/fundamentals/get-started/setup/add-site/) and needs to be [proxied](https://developers.cloudflare.com/dns/manage-dns-records/reference/proxied-dns-records/) (not DNS-only) through Cloudflare.

After opening the Cloudflare configuration guide, click **Get started**. 

![](https://files.readme.io/218859f-cf_wizard_step1-1.png "cf wizard step1-1.png")

You will proceed to a form where you need to put the information about your Cloudflare account.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7f19eea-cf_wizard_step2.png",
        "cf wizard step2.png",
        1149
      ],
      "align": "center",
      "caption": "Cloudflare Credentials"
    }
  ]
}
[/block]

| Name                  | Example                                  | Short description                                                                                                           |
| :-------------------- | :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Account ID | 88e2a7348d589a61edd0918e57fb136f         | The Account ID obtained from the [Cloudflare Dashboard](https://dash.cloudflare.com/).                                      |
| Cloudflare API Token  | YQSnnxWAQiiEh9qM58wZNnyQS7FUdoqGIUAbrh7T | API Token generated from the Cloudflare's [User Profile 'API Tokens' page](https://dash.cloudflare.com/profile/api-tokens). |

#### Cloudflare Account ID

The _Account ID_ is required to deploy workers. Go to [Cloudflare Workers](https://dash.cloudflare.com/?to=/:account/workers) and copy the _Account ID_.

#### Cloudflare API Token

The _API Token_ is required to deploy workers. Go to the [_API Tokens_ page](https://dash.cloudflare.com/profile/api-tokens), select _Create Custom Token_, and follow the steps bellow.

- Type "fingerprint.com" in the name field.
- _Add Account_ > _Workers Scripts_ > _Edit_ permission.
- _Add Zone_ > _Workers Routes_ > _Edit_ permission.
- Select the account in the _Account Resources_.
- _Select Specific zone_ > _yourwebsite_ in the _Zone Resources_.
- _Add IP Filtering_ > _3.23.16.20_.
- Do not set any TTL.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b9e906d-api_token.png",
        "api token.png",
        899
      ],
      "align": "center",
      "caption": "API Token Creation Form"
    }
  ]
}
[/block]

In the next step, see the summary and click _Create Token_.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0098c26-api_token_summary.png",
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
> When creating an API Token, it is considered best practice to grant it as few privileges as possible. In the example above, the API Token has permissions to only manage workers in your account. Fingerprint will use your API Token for managing the Fingerprint Cloudflare Worker and nothing else.
> 
> Fingerprint always encrypts customer data, including API tokens and configuration items. This guarantees that the data we get from our customers is securely transmitted and stored. The Client IP Address Filtering functionality adds an additional layer of security. Whitelisting our public Cloudflare service IP address ensures that the API Token can only be used by Fingerprint services and no one else.

After entering _Account ID_ and _API Token_, proceed to the next step.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9675d78-cf_wizard_step3.png",
        "cf wizard step3.png",
        1135
      ],
      "align": "center",
      "caption": "Choose domain"
    }
  ]
}
[/block]

Select the same domain you had created the API Token for before from the dropdown menu. If you don't see the domain you wish to use, please contact our support at [support@fingerprint.com](mailto:support@fingerprint.com).

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1747e83-cf_wizard_step4.png",
        "cf wizard step4.png",
        1186
      ],
      "align": "center",
      "caption": "Cloudflare Worker Review"
    }
  ]
}
[/block]

Confirm to start the deployment process. This process may take several minutes.

![](https://files.readme.io/6ed37e4-cf_wizard_step5.png "cf wizard step5.png")

> 👍 Worker deployment
> 
> When you provide the integration wizard with the information above, we will create a Cloudflare Worker in your Cloudflare account. Since we are responsible for updating and maintenance of the Cloudflare Worker, please don't make any changes to the API Token or revoke it.
> 
> Cloudflare Worker will be named _fingerprint-pro-cloudflare-worker-your-website-com_, you will be able to see it in [_Cloudflare Workers Dashboard_](https://dash.cloudflare.com/?to=/:account/workers/overview) once it is deployed.

### Fingerprint JS agent configuration

Once the worker is deployed, you need to configure your client-side application accordingly. In this step, you can choose from a variety of frameworks, platforms, and approaches. You can always come back to **App settings** -> **Integrations** to find code snippets for different frameworks which reflect your Cloudflare configuration setup.  

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/740226b-cf_wizard_step6.png",
        "cf wizard step6.png",
        1073
      ],
      "align": "center",
      "caption": "Code Snippets"
    }
  ]
}
[/block]

### Using Multiple Worker Routes

Cloudflare Integration uses Cloudflare Workers, which supports [multiple routes](https://developers.cloudflare.com/workers/platform/triggers/routes/). You can add more routes if you need to but don't change the original worker route and configuration created by Fingerprint.