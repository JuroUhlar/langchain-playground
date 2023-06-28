---
title: "Saving visitor information"
slug: "saving-visitor-information"
hidden: false
createdAt: "2022-02-27T20:47:26.465Z"
updatedAt: "2022-11-25T14:04:45.741Z"
---
While the server API is sufficient for checking recent visit history, the data is only available for a limited time (30 days). To keep a full copy of every identification, we recommend setting up [webhooks](https://dev.fingerprint.com/docs/webhooks) to automatically receive each identification response at a custom endpoint of your choosing.

Upon a browser API request, Fingerprint servers send an HTTP POST request to your webhook URL, including an [identification object](https://dev.fingerprint.com/docs/webhooks#identification-webhook-object-format). The endpoint receiving the webhook response may be used to automatically write to a database.

More information on setting up webhooks can be found here: https://dev.fingerprint.com/docs/webhooks
[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "Enterprise [plans](https://fingerprint.com/pricing/) include unlimited server-side storage of visit history."
}
[/block]