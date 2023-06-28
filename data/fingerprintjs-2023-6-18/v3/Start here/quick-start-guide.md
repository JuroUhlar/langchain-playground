---
title: "🚀 Quick Start Guide"
slug: "quick-start-guide"
excerpt: "How to install the Fingerprint Platform in your application."
hidden: false
createdAt: "2022-11-25T05:58:38.309Z"
updatedAt: "2023-06-14T14:52:46.895Z"
---
# Fingerprint Platform

The Fingerprint Platform consists of three plans: [Pro, Pro Plus, and Enterprise](https://fingerprint.com/pricing/?utm_source=https://dev.fingerprint.com/docs/quick-start-guide).

> Check out our [Pricing & Packaging](https://fingerprint.com/pricing/) to learn which plan is best for your needs. 

## Create an Account

[Sign Up](https://dashboard.fingerprint.com/signup?utm_source=https://dev.fingerprint.com/docs/quick-start-guide) to make an account and [start your 14-day free trial](https://dashboard.fingerprint.com/signup?utm_source=https://dev.fingerprint.com/docs/quick-start-guide), no credit card is required.

> If you have network issues accessing our dashboard, check out this [troubleshooting page](doc:dashboard-troubleshooting).

## Integrations

You can install Fingerprint via an Integration or SDK.  If you would like to use our integrations, navigate to **App Settings** in the left-hand menu, and then click on **Integrations Keys**.  Our [Cloudflare Integration](https://dev.fingerprint.com/docs/cloudflare-integration)  is especially popular!  

Keep reading to learn how to use our JavaScript SDK below. 

> You can also learn more about our [Integrations](https://fingerprint.com/integrations/) and [SDKs](https://fingerprint.com/sdk-libraries/) on our public site. 

## JavaScript SDK / Agent Setup

### Generate API Key

After you've [created an account](https://dashboard.fingerprint.com/signup?utm_source=https://dev.fingerprint.com/docs/quick-start-guide), please do the following: 

1. In the Dashboard, navigate to **App Settings** in the left-hand menu, and then click on **API Keys**.
2. Click the **+ Create Key** to generate a new _public_ API key. 
3. Save your brand new _public_ API key to run the examples below.

### JS Agent Installation

Once you've created your account, you need to install the JavaScript agent. The agent is required to send requests to the Fingerprint Platform. We refer to the JavaScript agent as "JS agent" further in this guide.

Full JS agent reference is available [here](doc:js-agent). If you need to start with a mobile platform, please use either [Android](doc:native-android-integration) or [iOS](doc:native-ios-integration) guide.

You can install the JS agent from a CDN into an HTML code directly, or as a Node module. 

To install the Node module, use NPM or Yarn:

```bash NPM
npm install @fingerprintjs/fingerprintjs-pro
```

Or:

```bash Yarn
yarn add @fingerprintjs/fingerprintjs-pro
```

Afterward, add the code snippet below to all pages where you want to identify visitors or devices.

```html CDN
<script>
  // Initialize the agent at application startup.
  // Some ad blockers or browsers will block Fingerprint CDN URL.
  // To fix this, please use the NPM package instead.
  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => FingerprintJS.load());

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get())
    .then(result => console.log(result.visitorId));
</script>
```
```javascript NPM
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({ apiKey: '<<browserToken>>' })

// Get the visitor identifier when you need it.
fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.visitorId))
```

Note that you need to use your subscription _public_ API key in the JS agent configuration. You can find your public API key in the dashboard under **App Settings** -> **API Keys** (see image below).

Every identification request will return a unique <<glossary:visitorId>> value for the current visitor. The `visitorId` accuracy is **99.5%** (it means that out of 1,000 random unique visitors, up to 5 identifiers may be incorrect).

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6c3f800-api-keys.png",
        "api-keys.png",
        3022
      ],
      "align": "center",
      "caption": "Screenshot of API keys in Fingerprint dashboard"
    }
  ]
}
[/block]

### EU Region users

If you chose the EU region during registration, please add this to the JS agent initialization:

```diff
FingerprintJS.load({
  apiKey: '<<browserToken>>',
+ region: 'eu'
})
```

This will guarantee that your data will always be kept in the EU (Germany) and will not be replicated to other data centers. 

```html CDN
<script>
  // Initialize the agent at application startup.
  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => FingerprintJS.load({
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

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({
  apiKey: '<<browserToken>>',
  region: 'eu'
})

// Get the visitor identifier when you need it.
fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.visitorId))
```

### Asia (Mumbai) Region users

Similarly to the EU Region, if you choose the Asia (Mumbai) region during registration, configure the JS agent:

```html CDN
<script>
  // Initialize the agent at application startup.
  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => FingerprintJS.load({
      region: 'ap'
    }));

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get())
    .then(result => console.log(result.visitorId));
</script>
```
```javascript NPM
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({
  apiKey: '<<browserToken>>',
  region: 'ap'
})

// Get the visitor identifier when you need it.
fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.visitorId))
```

## Custom subdomain setup

Setting up a custom subdomain allows you to use your own domain with the Fingerprint Platform. It is required that you set up a subdomain for several reasons:

- Improved Safari identification accuracy.
- Extended lifetime of `visitorID` value by enabling secure first-party cookies.
- Preventing ad blockers from blocking the API calls to our backend.
- Increased difficulty for malicious users to detect that your website is using Fingerprint.

After creating and verifying your subdomain, a Fingerprint server will be connected directly to it.

To create a custom subdomain, open your subscription, navigate to **App Settings**, and switch to the **Subdomains** tab.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0a17317-add-certificate.png",
        "add-certificate.png",
        2994
      ],
      "align": "center",
      "caption": "Screenshot of how to add an SSL certificate in the Fingerprint dashboard"
    }
  ]
}
[/block]

### Issue an SSL certificate for your new subdomain

Fingerprint will need to issue an SSL certificate for your subdomain. In order for Fingerprint to issue a certificate, you need to confirm that you own or control the domain by adding a special validating DNS record.

You can add up to 50 domains to a single certificate. Note that all of the domains will be visible in your certificate. For an example of how multiple domains are visible in a single SSL certificate, please see this wikipedia.org certificate below:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/503664a-Screen_Shot_2021-04-19_at_14.12.39.png",
        "Screen Shot 2021-04-19 at 14.12.39.png",
        1182
      ],
      "align": "center",
      "caption": "Screenshot of multiple domains for wikipedia.org"
    }
  ]
}
[/block]

If you need several certificates please contact support@fingerprint.com for pricing.

Please note that the certificate cannot be edited later. You will need to recreate the certificate from scratch if you want to change the list of domains. The domain ownership validation will fail if the DNS record is not added within 48 hours.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/db526c4-domain-name.png",
        "domain-name.png",
        2984
      ],
      "align": "center",
      "caption": "Screenshot of how to add a domain in the Fingerprint dashboard"
    }
  ]
}
[/block]

> 📘 Note:
> 
> - You need to own the top-level domain on which you’re creating the subdomain.
> - Certificates cannot be issued for subdomains on domains like heroku.com, azurewebsites.net, etc (those that are owned by other companies).
> - It should be a subdomain, not a domain. 
> - Our recommendation is to create a subdomain like `metrics.yourwebsite.com` for this integration. You must use a new subdomain that you are not currently using for anything else.

You will need to add one DNS record to prove ownership of your domain.  The record details will be provided on the second step of the Custom subdomain setup. 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a7a3acf-cname-records.png",
        "cname-records.png",
        2986
      ],
      "align": "center",
      "caption": "Screenshot of a CNAME record available in the Fingerprint dashboard"
    }
  ]
}
[/block]

Editing the DNS records is done in your domain registrar account, e.g. GoDaddy DNS, or AWS Route53. Once you add the domain ownership verification record, we’ll issue your certificate.

### Add a DNS record for your new subdomain

We will send you an email when your certificate is issued. When you receive this email, please click the link. That will bring you to the 3rd and final step of the custom domain creation wizard. For this step, you’ll need to add the 2nd DNS record to your DNS settings. This is necessary to point your custom subdomain to our server.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b270b0d-subdomain-step3.png",
        "subdomain-step3.png",
        2988
      ],
      "align": "center",
      "caption": "Screenshot of a completed SSL certificate process in the dashboard"
    }
  ]
}
[/block]

On page 3 of the wizard you will be provided with two **`A`** records for each subdomain listed. Make sure to add all **`A`** records to your DNS.

> 📘 Note:
> 
> Some DNS providers (like Route 53) allow you to add one record with two IP address values separated by a new line, while others require you to add one `A` record per IP address.

### Configuring JS Agent

When the certificate is issued and your subdomain points to our server, your JS agent configuration needs to be updated with your subdomain URL.

You will see a full JavaScript example with your new subdomain URL in the code snippet example on the 3rd page of the wizard.

```html CDN
<script>
  // Initialize the agent at application startup.
  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => FingerprintJS.load({
    	endpoint: 'https://metrics.yourwebsite.com'
    }));

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get())
    .then(result => console.log(result.visitorId));
</script>
```
```javascript NPM
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({
  apiKey: '<<browserToken>>',
  endpoint: 'https://fp.yourdomain.com'
})

// Get the visitor identifier when you need it.
fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.visitorId))
```

### Custom subdomain pricing

The custom subdomain is free for one SSL certificate. Contact support@fingerprint.com if you need more than one SSL certificate.

For a full custom subdomain guide please go to this page: [_Custom Subdomain Guide_](doc:subdomain-integration).

## Webhooks

We recommend creating and registering a webhook so that all events are sent securely and in real time to your server as they occur. 

You can register your webhook in the dashboard: Subscriptions -> Subscription name -> Webhooks. A webhook must use an https endpoint (it cannot use an IP address or an http endpoint).

You can read more information about webhooks [here](doc:webhooks).

![](https://files.readme.io/171f885-webhooks.png "webhooks.png")

## Server API

You can query identification events or visitor information using our [Server API](doc:server-api). To query the events, you will need a `requestId` value and the `secret` API key (it is different from the `public` API key). To query the visitor information, including the visitor history, you will need a `visitorId` value. You can find your `secret` API key on the `API Keys` page.

We support several official server-side SDKs to help you work with our server API in your favorite programming language: [**SDKs and Libraries**](https://fingerprint.com/sdk-libraries/).

> 📘 Public API key vs Secret API key
> 
> The public API key and secret API key are different API keys used in different parts of your integration. The public API key is used with the JS agent, the Android SDK and the iOS SDK. The secret API key is used to make requests to our [Server API](doc:server-api) to query events securely.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/05b1b7f-server-api-key.png",
        "server-api-key.png",
        2986
      ],
      "align": "center",
      "caption": "Screenshot of API keys in the Fingerprint dashboard"
    }
  ]
}
[/block]

## Tagging events

Sometimes you want to tag each event with a value that makes sense for your business, e.g. `userId` or `shoppingCartId` or a `transactionId`.  
You can attach a `linkedId` or a `tag`  value to an identification request, and it will be returned in a response. Tags and linkedIds are both available in the webhook and the server API responses.

An example of how to send a `linkedId` or a `tag` with your identification request:

```html CDN
<script>
  // Initialize the agent at application startup.
  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => FingerprintJS.load({
    	endpoint: 'https://metrics.yourwebsite.com'
    }));

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get({ linkedId: 'your-linked-id', tag: { shoppingSessionId: 123456 }}))
    .then(result => console.log(result.visitorId));
</script>
```
```javascript NPM
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({ apiKey: '<<browserToken>>' })

// Get the visitor identifier when you need it.
fpPromise
  .then(fp => fp.get({ linkedId: 'your-linked-id', tag: { yourTag: 123456 } }))
  .then(result => console.log(result.visitorId))
```

The webhook and the server API response will now contain the tag and/or linkedId:

```json
{
  "requestId": "Px6VxbRC6WBkA39yeNH3",
  "tag": { "shoppingSessionId": 123456 },
  "linkedId": "your-linked-id",
  …
}
```

You can find the difference between `linkedId` and `tag` on the below documentation pages.  
More information about `linkedId` can be found here: <https://dev.fingerprint.com/docs/js-agent#linkedid>.  
More information about tags is available here: <https://dev.fingerprint.com/docs/js-agent#tag>.

## Try the JS agent in your browser

Use the following code editors to try JS agent with your credentials.

[block:html]
{
  "html": "<style>\n  /* Any random identifier is ok to prevent collisions */\n  #fpjs-123-cdn, #fpjs-123-npm {\n    transform-origin: 0 0;\n    transform: scale(0.8);\n    width: 125%;\n    height: 550px;\n    margin-bottom: -110px;\n    border: none;\n  }\n</style>\n<!-- Uses the built-in Readme styles -->\n<div class=\"CodeTabs-toolbar\">\n  <button\n    type=\"button\"\n    class=\"CodeTabs_active\"\n    onclick=\"\n      document.querySelector('#fpjs-123-cdn').style.display = '';\n      document.querySelector('#fpjs-123-npm').style.display = 'none';\n\n      for (const button of this.parentNode.children) {\n        button.classList.remove('CodeTabs_active');\n      }\n      this.classList.add('CodeTabs_active');\n    \"\n  >\n    CDN\n  </button>\n  <button\n   \ttype=\"button\"\n    onclick=\"\n      const iframe = document.querySelector('#fpjs-123-npm');\n      if (!iframe.hasAttribute('src')) {\n        iframe.setAttribute('src', iframe.getAttribute('not-src'));\n      }\n      iframe.style.display = '';\n      document.querySelector('#fpjs-123-cdn').style.display = 'none';\n\n      for (const button of this.parentNode.children) {\n        button.classList.remove('CodeTabs_active');\n      }\n      this.classList.add('CodeTabs_active');\n    \"\n  >\n    NPM\n  </button>\n</div>\n<iframe\n  id=\"fpjs-123-cdn\"\n  src=\"https://stackblitz.com/edit/fpjs-pro-3-cdn?devtoolsheight=1000&embed=1&file=index.html&hideExplorer=1&hideNavigation=1&theme=light\"\n  loading=\"lazy\"\n></iframe>\n<iframe\n  id=\"fpjs-123-npm\"\n  not-src=\"https://stackblitz.com/edit/fpjs-pro-3-npm?devtoolsheight=1000&embed=1&file=index.js&hideExplorer=1&hideNavigation=1&theme=light\"\n  loading=\"lazy\"\n  style=\"display: none;\"\n></iframe>"
}
[/block]