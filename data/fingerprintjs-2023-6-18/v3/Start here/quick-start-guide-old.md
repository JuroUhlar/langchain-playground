---
title: "🚀 Quick start guide (deprecated)"
slug: "quick-start-guide-old"
hidden: true
metadata: 
  title: "Quick Start Instructions | FingerprintJS Pro Documentation"
  description: "This article covers how to install the JavaScript agent, server API and region, subdomain integration, webhooks, and tagging requests. More links within text."
  image: 
    0: "https://files.readme.io/2b9bf76-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-10-16T15:03:28.337Z"
updatedAt: "2023-06-05T19:14:58.924Z"
---
Click this link to start your free Fingerprint Pro subscription:  [**Fingerprint Pro signup**](https://dashboard.fingerprint.com/signup). 
*\(if you have issues accessing our dashboard, go to this [troubleshooting page](doc:dashboard-troubleshooting)\)*

Once you've started your free subscription, go to the API keys section on the left sidebar to get your public API key that you'll need to run examples on this page.
No credit card is required to start your subscription, but you'll need a credit card if you want to upgrade to a paid plan. 
[block:callout]
{
  "type": "info",
  "title": "Integrations and SDKs",
  "body": "To view the list of supported integrations, please visit this page: https://fingerprint.com/integrations/\nFor SDKs and framework libraries, go to this page: https://fingerprint.com/sdk-libraries/"
}
[/block]
## JS Agent

Once you start your subscription, you need to install the JavaScript agent.  The agent is required to send requests to our identification API. We refer to the JavaScript agent as "JS agent" further in this guide.

Full JS agent reference is available [here](doc:js-agent). If you need to start with a mobile platform, please use either [Android](doc:native-android-integration) or [iOS](doc:native-ios-integration) guide.

You can install the JS agent from a CDN into an HTML code directly, or as a Node module. 

In order to install the Node module, you can use NPM:

```bash NPM
npm install @fingerprintjs/fingerprintjs-pro
```

Or you can install with Yarn:

```bash Yarn
yarn add @fingerprintjs/fingerprintjs-pro
```

Afterwards, add the code snippet below to all pages where you want to identify visitors.
[block:code]
{
  "codes": [
    {
      "code": "<script>\n  // Initialize the agent at application startup.\n  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')\n    .then(FingerprintJS => FingerprintJS.load());\n\n  // Get the visitor identifier when you need it.\n  fpPromise\n    .then(fp => fp.get())\n    .then(result => console.log(result.visitorId));\n</script>",
      "language": "html",
      "name": "CDN"
    },
    {
      "code": "import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'\n\n// Initialize an agent at application startup.\nconst fpPromise = FingerprintJS.load({ apiKey: '<<browserToken>>' })\n\n// Get the visitor identifier when you need it.\nfpPromise\n  .then(fp => fp.get())\n  .then(result => console.log(result.visitorId))",
      "language": "javascript",
      "name": "NPM"
    }
  ]
}
[/block]
Note that you need to use your subscription `public` API key in the JS agent configuration. You can find your public API key in the dashboard under **API Keys** (see image below).

Every identification request will return a unique <<glossary:visitorId>> value for the current visitor. The `visitorId` accuracy is **99.5%** (it means that out of 1,000 random unique visitors, up to 5 identifiers may be incorrect).
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5c70705-public-api-key-location.png",
        "public-api-key-location.png",
        3000,
        1502,
        "#cfd0da"
      ],
      "caption": "Screenshot of API keys in Fingerprint Pro dashboard"
    }
  ]
}
[/block]
### EU Region users

If you chose the EU region during registration, please add this to the JS agent initialization:
[block:code]
{
  "codes": [
    {
      "code": "FingerprintJS.load({\n  apiKey: '<<browserToken>>',\n+ region: 'eu'\n})",
      "language": "diff"
    }
  ]
}
[/block]
This will guarantee that your data will always be kept in EU (Germany) and will not be replicated to other data centers. 
[block:code]
{
  "codes": [
    {
      "code": "<script>\n  // Initialize the agent at application startup.\n  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')\n    .then(FingerprintJS => FingerprintJS.load({\n      region: 'eu'\n    }));\n\n  // Get the visitor identifier when you need it.\n  fpPromise\n    .then(fp => fp.get())\n    .then(result => console.log(result.visitorId));\n</script>",
      "language": "html",
      "name": "CDN"
    },
    {
      "code": "import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'\n\n// Initialize an agent at application startup.\nconst fpPromise = FingerprintJS.load({\n  apiKey: '<<browserToken>>',\n  region: 'eu'\n})\n\n// Get the visitor identifier when you need it.\nfpPromise\n  .then(fp => fp.get())\n  .then(result => console.log(result.visitorId))",
      "language": "javascript",
      "name": "NPM"
    }
  ]
}
[/block]
### Asia (Mumbai) Region users

Similarly to the EU Region, if you choose the Asia (Mumbai) region during registration, configure the JS agent:
[block:code]
{
  "codes": [
    {
      "code": "<script>\n  // Initialize the agent at application startup.\n  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')\n    .then(FingerprintJS => FingerprintJS.load({\n      region: 'ap'\n    }));\n\n  // Get the visitor identifier when you need it.\n  fpPromise\n    .then(fp => fp.get())\n    .then(result => console.log(result.visitorId));\n</script>",
      "language": "html",
      "name": "CDN"
    },
    {
      "code": "import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'\n\n// Initialize an agent at application startup.\nconst fpPromise = FingerprintJS.load({\n  apiKey: '<<browserToken>>',\n  region: 'ap'\n})\n\n// Get the visitor identifier when you need it.\nfpPromise\n  .then(fp => fp.get())\n  .then(result => console.log(result.visitorId))",
      "language": "javascript",
      "name": "NPM"
    }
  ]
}
[/block]
## Custom subdomain setup

Setting up a custom subdomain allows you to use your own domain with the Fingerprint Pro platform. It is required that you set up a subdomain for several reasons:

- Improved Safari identification accuracy.
- Extended lifetime of `visitorID` value by enabling secure first-party cookies.
- Preventing ad blockers from blocking the API calls to our fraud-detection API.
- Increased difficulty for malicious users to detect that your website is using Fingerprint Pro.

After creating and verifying your subdomain, a Fingerprint server will be connected directly to it.

To start the custom subdomain creation process, open your subscription and click the "Custom Subdomain" link in the sidebar.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/bcdf99d-CustomSubdomainInit.png",
        "CustomSubdomainInit.png",
        1263,
        700,
        "#000000"
      ],
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
        1182,
        1150,
        "#dbdee2"
      ],
      "caption": "Screenshot of multiple domains for wikipedia.org"
    }
  ]
}
[/block]
If you need several certificates please contact support@fingerprint.com for pricing.

Please note that the certificate cannot be edited later. You will need to recreate the certificate from scratch if you want to change the list of domains. The domain ownership validation will fail if the record is not added during 48 hours.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7c7fc47-SubInt2.png",
        "SubInt2.png",
        2950,
        1452,
        "#e9e9eb"
      ],
      "caption": "Screenshot of how to add a domain in the Fingerprint dashboard"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "* You need to own the top-level domain on which you’re creating the subdomain.\n* Certificates cannot be issued for subdomains on domains like heroku.com, azurewebsites.net etc (those, that are owned by other companies.)\n* It should be a subdomain, not a domain. \n* Our recommendation is to create a subdomain like `fp.yourdomain.com` for this integration. You must use a new subdomain that you are not currently using for anything else.",
  "title": "Note:"
}
[/block]
You will need to add one DNS record to prove ownership of your domain.  The record details will be provided on the second step of the Custom subdomain setup. 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ad7b323-CnameRecords.png",
        "CnameRecords.png",
        1256,
        765,
        "#000000"
      ],
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
        "https://files.readme.io/0b54b4d-SubInt4.png",
        "SubInt4.png",
        2946,
        1418,
        "#e6e6ea"
      ],
      "caption": "Screenshot of a completed SSL certificate process in the dashboard"
    }
  ]
}
[/block]
On page 3 of the wizard you will be provided with two **`A`** records for each subdomain listed. Make sure to add all **`A`** records to your DNS.
[block:callout]
{
  "type": "info",
  "body": "Some DNS providers (like Route 53) allow you to add one record with two IP address values separated by a new line, while others require you to add one `A` record per IP address.",
  "title": "Note:"
}
[/block]
### Configuring JS Agent

When the certificate is issued and your subdomain points to our server, your JS agent configuration needs to be updated with your subdomain URL.

You will see a full JavaScript example with your new subdomain URL in the code snippet example on the 3rd page of the wizard.
[block:code]
{
  "codes": [
    {
      "code": "<script>\n  // Initialize the agent at application startup.\n  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')\n    .then(FingerprintJS => FingerprintJS.load({\n    \tendpoint: 'https://fp.yourdomain.com'\n    }));\n\n  // Get the visitor identifier when you need it.\n  fpPromise\n    .then(fp => fp.get())\n    .then(result => console.log(result.visitorId));\n</script>",
      "language": "html",
      "name": "CDN"
    },
    {
      "code": "import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'\n\n// Initialize an agent at application startup.\nconst fpPromise = FingerprintJS.load({\n  apiKey: '<<browserToken>>',\n  endpoint: 'https://fp.yourdomain.com'\n})\n\n// Get the visitor identifier when you need it.\nfpPromise\n  .then(fp => fp.get())\n  .then(result => console.log(result.visitorId))",
      "language": "javascript",
      "name": "NPM"
    }
  ]
}
[/block]
### Custom subdomain pricing
The custom subdomain is free for one SSL certificate. Contact support@fingerprint.com if you need more than one SSL certificate.

For a full custom subdomain guide please go to this page: [*Custom Subdomain Guide*](doc:subdomain-integration)

## Webhooks

We recommend creating and registering a webhook so that all events are sent securely and in real time to your server as they occur. 

You can register your webhook in the dashboard: Subscriptions -> Subscription name -> Webhooks. A webhook must use an https endpoint (it cannot use an IP address or an http endpoint).

You can read more information about webhooks [here](doc:webhooks).
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c5f5e60-webhooks.png",
        "webhooks.png",
        2988,
        1486,
        "#cecfd9"
      ]
    }
  ]
}
[/block]
## Server API

You can query identification events or visitor information using our [Server API](doc:server-api). To query the events, you will need a `requestId` value and the `secret` API key (it is different from the `public` API key). To query the visitor information, including the visitor history, you will need a `visitorId` value. You can find your `secret` API key on the `API Keys` page.

We support several official server-side SDKs to help you work with our server API in your favorite programming language: [**SDKs and Libraries**](https://fingerprint.com/sdk-libraries/).
[block:callout]
{
  "type": "info",
  "title": "Public API key vs Secret API key",
  "body": "The public API key and secret API key are different API keys used in different parts of your integration. The public API key is used with the JS agent, the Android SDK and the iOS SDK. The secret API key is used to make requests to our [Server API](doc:server-api) to query events securely."
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0fa1e89-secret-api-key-location.png",
        "secret-api-key-location.png",
        3000,
        1502,
        "#cfd0da"
      ],
      "caption": "Screenshot of API keys in the Fingerprint dashboard"
    }
  ]
}
[/block]
## Tagging events

Sometimes you want to tag each event with a value that makes sense for your business, e.g. `userId` or `shoppingCartId` or a `transactionId`. 
You can attach a `linkedId` or a `tag`  value to an identification request, and it will be returned in a response. Tags and linkedIds are both available in the webhook and the server API responses.

An example of how to send a `linkedId` or a `tag` with your identification request:
[block:code]
{
  "codes": [
    {
      "code": "<script>\n  // Initialize the agent at application startup.\n  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')\n    .then(FingerprintJS => FingerprintJS.load());\n\n  // Get the visitor identifier when you need it.\n  fpPromise\n    .then(fp => fp.get({ linkedId: 'your-linked-id', tag: { shoppingSessionId: 123456 }}))\n    .then(result => console.log(result.visitorId));\n</script>",
      "language": "html",
      "name": "CDN"
    },
    {
      "code": "import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'\n\n// Initialize an agent at application startup.\nconst fpPromise = FingerprintJS.load({ apiKey: '<<browserToken>>' })\n\n// Get the visitor identifier when you need it.\nfpPromise\n  .then(fp => fp.get({ linkedId: 'your-linked-id', tag: { yourTag: 123456 } }))\n  .then(result => console.log(result.visitorId))",
      "language": "javascript",
      "name": "NPM"
    }
  ]
}
[/block]
The webhook and the server API response will now contain the tag and/or linkedId:
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"requestId\": \"Px6VxbRC6WBkA39yeNH3\",\n  \"tag\": { \"shoppingSessionId\": 123456 },\n  \"linkedId\": \"your-linked-id\",\n  …\n}",
      "language": "json"
    }
  ]
}
[/block]
You can find the difference between `linkedId` and `tag` on the below documentation pages. 
More information about `linkedId` can be found here: https://dev.fingerprint.com/docs/js-agent#linkedid.
More information about tags is available here: https://dev.fingerprint.com/docs/js-agent#tag.

## Try the JS agent in your browser

Use the following code editors to try JS agent with your credentials.
[block:html]
{
  "html": "<style>\n  /* Any random identifier is ok to prevent collisions */\n  #fpjs-123-cdn, #fpjs-123-npm {\n    transform-origin: 0 0;\n    transform: scale(0.8);\n    width: 125%;\n    height: 550px;\n    margin-bottom: -110px;\n    border: none;\n  }\n</style>\n<!-- Uses the built-in Readme styles -->\n<div class=\"CodeTabs-toolbar\">\n  <button\n    type=\"button\"\n    class=\"CodeTabs_active\"\n    onclick=\"\n      document.querySelector('#fpjs-123-cdn').style.display = '';\n      document.querySelector('#fpjs-123-npm').style.display = 'none';\n\n      for (const button of this.parentNode.children) {\n        button.classList.remove('CodeTabs_active');\n      }\n      this.classList.add('CodeTabs_active');\n    \"\n  >\n    CDN\n  </button>\n  <button\n   \ttype=\"button\"\n    onclick=\"\n      const iframe = document.querySelector('#fpjs-123-npm');\n      if (!iframe.hasAttribute('src')) {\n        iframe.setAttribute('src', iframe.getAttribute('not-src'));\n      }\n      iframe.style.display = '';\n      document.querySelector('#fpjs-123-cdn').style.display = 'none';\n\n      for (const button of this.parentNode.children) {\n        button.classList.remove('CodeTabs_active');\n      }\n      this.classList.add('CodeTabs_active');\n    \"\n  >\n    NPM\n  </button>\n</div>\n<iframe\n  id=\"fpjs-123-cdn\"\n  src=\"https://stackblitz.com/edit/fpjs-pro-3-cdn?devtoolsheight=1000&embed=1&file=index.html&hideExplorer=1&hideNavigation=1&theme=light\"\n  loading=\"lazy\"\n></iframe>\n<iframe\n  id=\"fpjs-123-npm\"\n  not-src=\"https://stackblitz.com/edit/fpjs-pro-3-npm?devtoolsheight=1000&embed=1&file=index.js&hideExplorer=1&hideNavigation=1&theme=light\"\n  loading=\"lazy\"\n  style=\"display: none;\"\n></iframe>"
}
[/block]