---
title: "Server API"
slug: "pro-server-api"
hidden: false
createdAt: "2023-05-11T14:47:21.234Z"
updatedAt: "2023-06-05T23:09:09.233Z"
---
Server API allows you to get information about visitors (using the [`/visitors`](doc:server-api#get-visitor-history-identification-only) endpoint) or about individual events (using the [`/events`](doc:server-api#get-events-identification--bot-detection--aev) endpoint) in a server environment. 

Server API is only for server-side usage, it's not intended to be used from the client side, whether it's a browser or a mobile device.

If you want to identify browsers in your web application, read our [JS Agent guide](doc:js-agent).  
If you want to identify mobile devices using native mobile SDKs, see [Android](doc:native-android-integration) or [iOS](doc:ios).

Server API requests do not count toward your monthly plan and are not billed.

## Regions

The server API is available in the **Global**, **EU** and **Asia (Mumbai)** regions:

| Region        | Base URL                 | Server Location     |
| :------------ | :----------------------- | :------------------ |
| Global        | `https://api.fpjs.io`    | Global              |
| EU            | `https://eu.api.fpjs.io` | Frankfurt,  Germany |
| Asia (Mumbai) | `https://ap.api.fpjs.io` | Mumbai,  India      |

Use the **Base URL** dropdown in the right column of each endpoint to select the correct base URL according to your application's region.

## Authentication

There are 2 ways to authenticate with the API: with auth header or with a query parameter. All unauthenticated requests will return `HTTP 403 Forbidden` response.

### Auth header

This is the recommended way of API authentication. When making an API request, add `Auth-API-Key` HTTP header with your [secret API key](doc:quick-start-guide#server-api).

### API key query parameter

This method of authentication is easy to use when you want to test it in the browser.  However, we don't recommend using it in production.

Example request with an API key query parameter:

```http
// Paste this URL into your browser
// replace the API key with your real secret API key
https://api.fpjs.io/visitors/someVisitorId?api_key=<<apiKey>>
```

## Server API SDKs

For a smoother developer experience, we offer typed SDKs for these languages:

- [Node SDK](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk)
- [PHP SDK](https://github.com/fingerprintjs/fingerprint-pro-server-api-php-sdk)
- [Python SDK](https://github.com/fingerprintjs/fingerprint-pro-server-api-python-sdk)
- [C# SDK](https://github.com/fingerprintjs/fingerprint-pro-server-api-dotnet-sdk/)
- [Java SDK](https://github.com/fingerprintjs/fingerprint-pro-server-api-java-sdk)
- [Go SDK](https://dev.fingerprint.com/docs/fingerprint-pro-server-api-go-sdk)

Pick one of them as the **Language** on the endpoint page's top right corner to see an example request using that SDK. 

The SDKs (and this reference) are based on a Server API OpenAPI schema, which is also available on Github: 

- [Server API OpenAPI schema ](https://github.com/fingerprintjs/fingerprint-pro-server-api-openapi)

## Trying it out

You can try calling the Server API directly from this reference: 

1. You are going to need your Secret API Key. You can find it in your Fingerprint [Dashboard](https://dashboard.fingerprint.com/) > **App Settings** > **API Keys**.
2. To make a request you will need either a `visitorId` or `requestId` of an identification event associated with your application. Go to [Dashboard](https://dashboard.fingerprint.com/) > **Fingerprint** to see your identification events.
3. Scroll down to one of the endpoints, for example [Get visits by visitorId](ref:getvisits). 
4. Set **Authentication** to your secret API key.
5. Set the **visitor_id** path parameter to some `visitorId` from your dashboard (or `requestId` in the case of [Get event by requestId](ref:getevent)).
6. Make sure the **Base URL** corresponds to your application's region.
7. Click **Try it!**

A real API response will appear in the **Response** section. Alternatively, you can view the prepared response examples there.