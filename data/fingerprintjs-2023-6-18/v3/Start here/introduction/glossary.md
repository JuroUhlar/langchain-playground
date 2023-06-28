---
title: "Glossary"
slug: "glossary"
hidden: false
createdAt: "2023-02-02T11:23:35.263Z"
updatedAt: "2023-06-14T18:17:44.028Z"
---
## Android agent

A native Android integration that collects multiple device signals and sends them to the Identification API for processing and identification.

## BotD

BotD is an open-source library that we created to make it easy for every developer to detect basic bots in their web apps. BotD is available under a permissive MIT license and will always be free for developers.

## Bot Detection

Fingerprint Bot Detection is a production-grade product that detects automated activity on your website. This product can detect a wide range of bots, headless browsers, and automation tools — and distinguish bad bots from useful ones, for example, search engine crawlers.

## Fingerprinting

The process of generating a unique and stable identifier of a browser or a device from a combination of its software and hardware attributes. On the web, Fingerprint Identification issues a visitor identifier tied to the browser. On Android and iOS, the identifier is tied to the visitor’s device.

## FingerprintJS

An open-source version of our identification JavaScript agent. It uses only browser-related attributes for generating fingerprints, which results in smaller accuracy.

## Fingerprint Identification

A commercially developed device identification platform for fraud detection, user identification, marketing attribution, and analytics that has numerous advantages, compared to the open-source version.

## Identification API

A part of our platform that is responsible for identifying devices or browsers. It performs the analysis of your visitors that you can later query using Server API. It is used by our JavaScript and Native agents. Requests count towards your plan billing.

## Incognito mode

Incognito or private browsing is a privacy feature in some web browsers. When operating in such a mode, the browser creates a temporary session that is isolated from the browser's main session and user data.

## iOS Agent

A native iOS integration that collects multiple device signals and sends them to the Identification API for processing and identification.

## JavaScript agent

The client-side agent is a high-performance JavaScript agent that collects multiple device and browser signals and sends them to the Identification API for processing, identification, and bot detection.

## Fingerprint Plans

The Fingerprint Platform consists of three plans: [Pro, Pro Plus, and Enterprise](https://fingerprint.com/pricing/?utm_source=https://dev.fingerprint.com/docs/quick-start-guide).

> Check out our [Pricing & Packaging](https://fingerprint.com/pricing/) to learn which plan is best for your needs.

## Proxy cloud integration

The practice of routing Identification API and agent-download requests through a proxy on a specific cloud provider. Direct requests to Identification API and our CDN can be blocked by browsers and privacy extensions. Using a proxy cloud integration, the requests are considered "same-site", greatly increasing identification accuracy.

## Proxy Secret

A Proxy Pre-Shared Secret is a secret key used to authenticate with third-party integrations. For example, when using a [CloudFront](https://dev.fingerprint.com/docs/cloudfront-proxy-integration) proxy integration, you use this key in your AWS configuration. You can find and manage your secret API keys in the Dashboard -> App Settings -> API Keys.

## Public API Key

The public API key associated with your application. Use this API key to load the JavaScript or mobile agent and make requests to Identification API. You can manage your public API keys in the Dashboard -> App Settings -> API Keys. The key is exposed to the public as it must be used in the client-side code of your website. To prevent its misuse, you can use [Request filtering](https://dev.fingerprint.com/docs/request-filtering) to only allow Fingerprint Identification API requests from your website's origin.

## Regions

Fingerprint Identification is available in the following regions: Global (US), EU, and Asia. Usually, you should select the region from which most of your site traffic originates.

## Request Filtering

A Fingerprint Identification feature that allows you to filter out unwanted visitor identification requests by origin or HTTP headers. This can prevent bad actors from misusing your public API key and making requests to the Identification API using your subscription.

## requestId

Unique identifier for every request made to our API by our JavaScript or native agent. It is usually used in further server-side request processing, using our Server API.

## Secret API Key

The secret API key associated with your application. Use this API key to make requests to the [Server API](https://dev.fingerprint.com/docs/server-api). Do not expose this key to the public, only call the Server API from the server-side code. You can find and manage your secret API keys in the Dashboard -> App Settings -> API Keys.

## Server API

Fingerprint Platform Server API allows you to get information about visitors and individual events in a server environment. This API can be used for data exports, decision-making, and data analysis scenarios. Requests do not count towards your plan billing.

## Subdomain setup

The practice of routing Identification API requests through a proxy on the site’s subdomain. Direct requests to Identification API can be blocked by browsers and privacy extensions. Using a subdomain proxy, the requests are considered “same-site”, greatly increasing identification accuracy. Using some form of subdomain proxy is required for correct identification when using Fingerprint.

## Webhooks

A webhook is when Fingerprint makes an HTTP POST request to your application’s API when a visitor identification event occurs. It is an alternative to actively requesting data from the Server API. Webhooks are asynchronous and don't incur performance overhead when enabled.

## visitorId

Unique and stable identifier calculated by the Fingerprint Identification product. When Fingerprint Identification is used in browsers through one of our JavaScript libraries, it identifies the specific browser environment. In the native mobile contexts (iOS and Android), this identifier is scoped to the device.

## Zero Trust mode

Mode of running the identification without exposing the visitorId to the visitor. Instead, you get back a random requestId value that you can use later to read the actual visitorId using our Server API. Zero Trust Mode is implemented internally by identification result hiding and strict origin-checking features.