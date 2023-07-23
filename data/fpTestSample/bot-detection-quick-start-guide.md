---
title: "🤖 Browser Bot Detection guide"
slug: "bot-detection-quick-start-guide"
hidden: false
createdAt: "2022-10-11T23:44:48.294Z"
updatedAt: "2023-06-14T11:17:41.592Z"
---
## What is Fingerprint Browser Bot Detection?

Fingerprint Browser Bot Detection is Smart Signal on Pro Plus plan that detects automated activity on your website. It analyses a variety of browser attributes and gives you a bot detection signal with one of three values:

- **Good bot** - usually a bot that belongs to a well-known search engine (Google, Amazon, Bing). It crawls websites to create a searchable content index. Good bots can also be monitoring or uptime-checking tools.

- **Bad bot** - usually an automation tool like Selenium, Puppeteer, Playwright, or anything that pretends to be a good search bot. It can take over accounts, submit spam, steal passwords, scrape data, waste resources, etc.

- **Bot not detected** - the visitor is likely a human using a regular browser.

You can use the provided bot detection signal to implement protective measures against malicious bots on your site.

We also provide an [open-source](doc:bot-detection-vs-botd) bot detection JavaScript library, called [BotD](https://github.com/fingerprintjs/BotD), which has fewer features and is able to detect basic automation tools only.

## How to enable Fingerprint Bot Detection?

If you want to use Fingerprint Bot Detection, reach out to support at [support@fingerprint.com](mailto:support@fingerprint.com?subject=Enable%20Bot%20Detection) or enable the Pro Plus plan in the dashboard. 

## Integrating Bot Detection

Typical integration into a project consists of 3 steps:

1. Add a [JavaScript agent](https://dev.fingerprint.com/docs/js-agent) on the frontend part of your web application.
2. Get the [`requestId`](doc:js-agent#requestid) from the JavaScript agent response and pass it to your server.
3. Call [GET /events](https://dev.fingerprint.com/docs/server-api#get-events) endpoint from your server-side environment to retrieve the Bot Detection result. Use the information about possible bots in your business logic.

### JavaScript agent

The JavaScript agent is a universal client-side SDK that collects different browser information and then sends it to the Fingerprint backend. The library returns an object with multiple fields, but for Bot Detection scenario, only the `requestId` is important for further server-side request processing. Other information is specific to the Identification product and is useful if this product is activated for your application.

> 📘 Bot Detection and JavaScript agent versions
> 
> Bot Detection works only with JS agent version 3.7.0 or newer. Check your version and [update](doc:migrating-from-previous-versions) it if needed.

### Bot Detection results on the client side

Since the data from the client browser might be spoofed by fraudulent parties, we strongly recommend server verification using the [Server API](doc:server-api).

Bad actors can replace the `requestId` with a fake value or completely delete this field. Check the request timestamp returned by the Server API – it shouldn't be older than several seconds or minutes depending on the implemented scenario. If the `requestId` doesn't pass the verification, you need to ask your users for additional verification (Captcha, 2FA) or deny access to the requested resource.

Additionally, the most secure way of using the Fingerprint platform is [Zero Trust Mode](doc:zero-trust-mode) which makes only `requestId` available to your frontend application.

### Bot Detection webhook

Adding Bot Detection results into the Webhook feature is a work in progress. You can use the Server API ([GET /events](https://dev.fingerprint.com/docs/server-api#get-events)) to get the results on your server in the meantime.

### Native mobile libraries

Bot Detection doesn't have native mobile libraries, but it’s on our long-term feature roadmap.

### Fingerprint's SDKs and libraries

Bot Detection is supported by all [provided client and server-side libraries](https://fingerprint.com/sdk-libraries/).

## Identification and Bot Detection

Fingerprint Identification and Bot Detection produce best results when used together. Bot Detection will try to detect if current activity is done by a bot and then run the identification if it's not a bot.

A combination of Identification and Bot Detection gives you a powerful tool to prevent online fraud. Activating both products instead of using a single one doesn't have any drawbacks. You will still have one JavaScript agent in the client browser that makes one request to pass browser information for all products, a single `requestId` used by two products under the hood, and one server-to-server request to retrieve the results of both products.

If you use two signals, Bot Detection will add additional protection for the Identification. In case a request is made by a good or bad bot, `visitorId` won't be generated and we won't charge you for Identification for this particular request. It also means that you won't get the identification field in the [GET /events](https://dev.fingerprint.com/docs/server-api#get-events) response if Bot Detection found a bot.