---
title: "Open Source Components"
slug: "open-source-components"
hidden: true
createdAt: "2022-04-21T13:51:25.771Z"
updatedAt: "2022-04-21T15:00:02.922Z"
---
If your application requires [open source components](https://github.com/fingerprintjs/fingerprintjs/blob/master/docs/api.md#api) after migrating to FingerprintJS Pro, you can still use them! To enable `components` please contact [support@fingerprintjs.com](mailto:support@fingerprintjs.com) and request that the `components` feature be added to your subscription. After this, the `components` attribute will automatically appear in webhook responses, if you have webhooks configured.

### Components Format
`components` is a dictionary of identification attributes that are used in open source identification. The keys are named by a specific identifying attribute. `value` represents a component value (in case of success) that can be of `any` type. `error` is an error object (this handles cases of unexpected errors when calculating component values).

Here is an example of a component (`audio`) that contains an error, alongside two other components with successful values (`canvas` and `colorDepth`). As we can see in the example below, the value can be of `any` type since the type changes depending on the component.
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"components\": {\n    \"audio\": {\n      \"error\": {\n        \"name\": \"TypeError\",\n        \"message\": \"u.getChannelData(...) is undefined\"\n      }\n    },\n    \"canvas\": {\n      \"value\": {\n        \"geometry\": \"cf68232c5fbd5b39af468f30c681d3bf\",\n        \"text\": \"09ee476606178700b9f3b52766dc41f7\",\n        \"winding\": true\n      }\n    },\n    \"colorDepth\": {\n      \"value\": 32\n    },\n    //...\n  }\n}",
      "language": "javascript"
    }
  ]
}
[/block]
### Enabling on JS Agent
In order to receive the `components` attribute inside the JS Agent result, add the `exposeComponents: true` configuration option.
[block:code]
{
  "codes": [
    {
      "code": "const result = await fp.get({\n  exposeComponents: true\n})\nconsole.log(result);\n// Prints the following:\n{\n  \"visitorId\":\"DefLU3ZQLkMBteKJ2tio\",\n  \"components\": {\n    \"canvas\": {\n      \"value\": {\n        \"geometry\": \"cf68232c5fbd5b39af468f30c681d3bf\",\n        \"text\": \"09ee476606178700b9f3b52766dc41f7\",\n        \"winding\": true\n      }\n     //...\n    },\n  // ...\n}\n",
      "language": "javascript"
    }
  ]
}
[/block]
### Enabling on Server API
In order to receive components in the [Server API](doc:server-api), add the query parameter `expose_components=true`. An example would be: `/visitors/Ibk1527CUFmcnjLwIs4A9?limit=50&expose_components=true` with a corresponding example response shown below:
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"visitorId\": \"Ibk1527CUFmcnjLwIs4A9\",\n  \"visits\": [\n    {\n      \"requestId\": \"0KSh65EnVoB85JBmloQK\",\n      \"components\": {\n        \"audio\": {\n          \"value\": 124.04344968475198\n        },\n        \"canvas\": {\n          \"value\": {\n            \"geometry\": \"cf68232c5fbd5b39af468f30c681d3bf\",\n            \"text\": \"09ee476606178700b9f3b52766dc41f7\",\n            \"winding\": true\n          }\n        },\n        //...\n      },\n      //...\n    }\n  ],\n  \"lastTimestamp\": 1582299576512\n}",
      "language": "javascript"
    }
  ]
}
[/block]