---
title: "Useful timestamps"
slug: "useful-timestamps"
hidden: false
createdAt: "2022-03-17T05:48:43.853Z"
updatedAt: "2023-06-05T21:36:04.185Z"
---
Most of our APIs, including Server API, Webhooks, and JavaScript agent, support useful timestamps related to a visitor in the response formats. All these timestamps are presented as `ISO-8601` strings (UTC timezone, millisecond precision). The majority of popular programming languages support `ISO-8601` time format in their standard libraries.

### Format

That's what those timestamps look like in the responses of the corresponding APIs:

```javascript Useful timestamps
{
  // ...
  "firstSeenAt": {
    "global": "2022-03-16T11:26:45.362Z",
    "subscription": "2022-03-16T11:31:01.101Z"
  },
  "lastSeenAt": {
    "global": "2022-03-16T11:28:34.023Z",
    "subscription": null
  },
  // ...
}
```

### Definitions

- `firstSeenAt.subscription` - time of the first visit of the visitor within the current application.
- `firstSeenAt.global` - time of the first visit of the visitor across all Fingerprint accounts.
- `lastSeenAt.subscription` - time of the previous visit of the visitor within the current application.
- `lastSeenAt.global` - time of the previous visit of the visitor across all Fingerprint accounts.

Those timestamps can be `null`. For instance, in case a completely new visitor comes,  
both `lastSeenAt` timestamps will be equal to `null`, because there is no previous visit before the first visit. In case a visitor comes for the first time within your application, but has been seen within another application, `lastSeenAt.subscription` will be `null` and `lastSeenAt.global` won't.

You can also use the [`visitorFound` property](https://dev.fingerprint.com/suggested-edits/64060d15b3c1a7003e79213e/preview#visitorfound) of the identification result to check if the visitor has ever been identified globally.