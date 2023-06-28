---
title: "Webhooks"
slug: "webhooks"
excerpt: "This page provides an overview of server-to-server network communication known as 'webhooks.'"
hidden: false
metadata: 
  title: "Webhooks, identification, and testing  | FingerprintJS Pro Docs"
  description: "FingerprintJS webhooks are HTTP POST requests to your app's API that alert you when a new event occurs without performing extra steps like polling."
  image: 
    0: "https://files.readme.io/cf7521a-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-10-20T11:29:14.694Z"
updatedAt: "2023-06-14T14:01:28.085Z"
---
### What is a webhook?

A webhook is when Fingerprint makes an HTTP POST request to _**your**_ application’s API when an event occurs. This way, Fingerprint is able to immediately notify you when an event occurs and your application doesn’t have to perform complicated polling to determine if something new happened. Webhooks are asynchronous and don't incur performance overhead when enabled.

> 📘 Note:
> 
> When multiple webhooks are enabled, events are delivered to each of them simultaneously.

### Protecting your webhook

There are two ways of protecting your webhook: _basic HTTP authentication_ and unique URLs.

#### 1 - HTTP basic authentication

An easy way to protect your API is through basic HTTP authentication. Almost all web servers can be configured to require a \_username \_and \_password \_to access a URL.

#### 2 - Unique URL

A URL can be unique and no one except you should know it. This doesn't secure the URL itself but it won't be searchable on the internet. To ensure your data is encrypted, we require using HTTPS for all webhook communication.

### Webhook

Webhook occurs every time you make a device intelligence API request, by calling the JavaScript agent's `get()` method.

As soon as we receive the request, our servers process the received information and make an HTTP POST request to your webhook URL.

#### **Registering the webhook**

You can register webhooks from your Fingerprint account as follows:

1 -  [Log in to your Fingerprint account.](https://dashboard.fingerprint.com/login)  
2 - Click on the subscription you want to register the webhook for.  
3 - Navigate to **App Settings** -> **Webhooks**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/db6d460-webhooks.png",
        "webhooks.png",
        2984
      ],
      "align": "center",
      "caption": "Screenshot of how to add a webhook in the Fingerprint dashboard"
    }
  ]
}
[/block]

4 - Click **New Webhook**. A _New Webhook_ window will be displayed. 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f441326-Screenshot_2020-10-20_181613.png",
        "Screenshot 2020-10-20 181613.png",
        981
      ],
      "align": "center",
      "caption": "Screenshot of the form required to create a new webhook"
    }
  ]
}
[/block]

5 - Fill in the `URL` field. Note that a webhook must use an HTTPS domain. It cannot be an IP or a non-HTTPS domain. The rest of the fields in the New Webhook window, i.e. `Basic authentication user,` `Basic authentication password` and `Description`, are optional. 

> 📘 Note:
> 
> As in the screenshot above, webhooks are set to **Active **by default. You can manually deactivate your webhooks by toggling the **Active **switch off.

6 - Click **Save**.  

### Webhook object format.

The webhook format is shared between all activated products.  
Fields can be specified as:  

- optional (can be absent)  
- nullable (can be null)  
- empty (can be empty: `""` or `{}`)  

For example `requestId` is not optional, it can't be null, it can't be empty.

To have the Bot detection results present [you need to have Bot detection enabled](https://dev.fingerprint.com/docs/bot-detection-quick-start-guide). The same applies to other Smart signals. 

JSON example:  

```javascript standard response
{
    // Unique request identifier
    // maxLength: 20
    "requestId": "Px6VxbRC6WBkA39yeNH3",
    // customer-provided data, for example requestType and yourCustomId
    // both the tag and the information it contains are optional
    // and only for the customer's need.
    // optional, maxLength: 16KB
    "tag": {
        "requestType": "signup",
        "yourCustomId": 45321
    },
    // user-provided scalar identifier
    // optional,maxLength: 256
    "linkedId": "any-string",
    // persistent visitor identifier
    // helpful to detect anonymous or private mode users
    // maxLength: 20
    "visitorId": "3HNey93AkBW6CRbxV6xP",
    // tells whether a visitor was found in a visits history
    "visitorFound": true,
    // timestamp in milliseconds (since unix epoch)
    // 
    "timestamp": 1554910997788,
    // time in RFC3339 format
    // 
    "time": "2019-10-12T07:20:50.52Z",
    // if the page view was made in incognito or private mode
    "incognito": false,
    // URL where the API was called in the browser
    // empty maxLength: 4096
    "url": "https://banking.example.com/signup",
    // The URL of a client-side referrer
    // optional, maxLength: 4096
    "clientReferrer": "https://google.com?search=banking+services",
    // maxLength: 40
    "ip": "216.3.128.12",
    // empty
    "ipLocation": {
        // kilometers
        // optional
        "accuracyRadius": 1,
        // optional
        "city": {
            // empty, maxLength: 4096
            "name": "Bolingbrook"
        },
        // optional
        "continent": {
            // empty, maxLength: 2
            "code": "NA",
            // empty, maxLength: 40
            "name": "North America"
        },
        // optional
        "country": {
            // empty, maxLength: 2
            "code": "US",
            // empty, maxLength: 250
            "name": "United States"
        },
        // optional
        "latitude": 41.12933,
        // optional
        "longitude": -88.9954,
        // optional, maxLength: 40
        "postalCode": "60547",
        // optional
        "subdivisions": [
            {
                // empty, maxLength: 250
                "isoCode": "IL",
                // empty, maxLength: 250
                "name": "Illinois"
            }
        ],
        // optional, maxLength: 250
        "timezone": "America/Chicago"
    },
    "browserDetails": {
        // empty, maxLength: 250
        "browserName": "Chrome",
        // empty, maxLength: 250
        "browserFullVersion": "73.0.3683.86",
        // empty, maxLength: 250
        "browserMajorVersion": "73",
        // empty, maxLength: 250
        "os": "Mac OS X",
        // empty, maxLength: 250
        "osVersion": "10.14.3",
        // empty, maxLength: 250
        "device": "Other",
        // empty, maxLength: 4096
        "userAgent": "(Macintosh; Intel Mac OS X 10_14_3) Chrome/73.0.3683.86"
    },
    // optional
    "confidence": {
        // 0 - 1
        "score": 0.97
    },
    "firstSeenAt": {
        // nullable
        "global": "2022-03-16T11:26:45.362Z",
        // nullable
        "subscription": "2022-03-16T11:31:01.101Z"
    },
    "lastSeenAt": {
        // nullable
        "global": "2022-03-16T11:28:34.023Z",
        // nullable
        "subscription": null
    },
    // optional, empty
    "bot": {
        // "good" | "bad" | "notDetected"
        // more info here https://dev.fingerprint.com/docs/server-api#botresult
        "result": "notDetected"
    },
    // optional, maxLength: 4096
    "userAgent": "(Macintosh; Intel Mac OS X 10_14_3) Chrome/73.0.3683.86"
    // optional, empty
    "rootApps": {
        "result": false
    },
    // optional, empty
    "emulator": {
        "result": false
    },
    // optional, empty
    "ipBlocklist": {
        "result": false,
        "details": {
            "emailSpam": false,
            "attackSource": false
        }
    },
    // optional, empty
    "tor": {
        "result": false
    },
    // optional, empty
    "vpn": {
        "result": false,
        "methods": {
            "timezoneMismatch": false,
            "publicVPN": false
        }
    },
    // optional, empty
    "proxy": {
        "result": false
    },
    // optional, empty
    "tampering": {
        "result": false,
        "anomalyScore": 0
    }
}
```

An explanation of individual Smart Signals fields can be found in the [Server API Documentation](https://dev.fingerprint.com/reference/getevent).

See more information on `firstSeenAt/lastSeenAt` timestamps [here](doc:useful-timestamps).

#### Testing your webhooks with CURL

Once you add the webhook to your system, you can test it as follows:

```bash
curl <your-webhook-url> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{ "tag": 2718281828, "visitorId": "3HNey93AkBW6CRbxV6xP", /* remaining fields here */}'
```

#### Retries

Every request is retried once if it timed out or returned a non-2XX response. The retry will take place 5 minutes after the non-2XX response is received or 5 minutes after the timeout takes place.  
The retry request will have the same request ID as the first request, so it's possible to use it as an idempotency key.

If you have multiple webhooks configured under one subscription, each request will be treated independently. This means if a timeout or non-2XX response takes place, a retry will only be triggered for the endpoint that caused the issue.

#### Timeout and errors

Fingerprint expects that integrations respond within 3 seconds of receiving the webhook payload with 2XX status code.  
Otherwise, the webhook will be shown as `failed` on the _Webhook events_ page, headers and response should be smaller than 4KB, otherwise, they're truncated.