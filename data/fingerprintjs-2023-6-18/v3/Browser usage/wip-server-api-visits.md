---
title: "[WIP] Server API (visits)"
slug: "wip-server-api-visits"
hidden: true
createdAt: "2021-11-06T01:42:31.470Z"
updatedAt: "2021-12-09T11:34:17.269Z"
---
## Regions

The server API is available in the **Global** and **EU** regions.

Use these base URLs in those regions:


| Region | Base URL | Server Location |
| :--- | :--- | :--- |
| Global | `https://api.fpjs.io` | Global |
| EU | `https://eu.api.fpjs.io` | Frankfurt,  Germany |

## Authentication

There are 2 ways to authenticate with the API: auth header and token query parameter. All unauthenticated requests will return HTTP 403 \(forbidden\) response.

### Auth header

This is the recommended way of API authentication. When making an API request, add `Auth-Token` HTTP header with your API token.

### Token query parameter

This method of authentication is easy to use when you want to test it in the browser. However we don't recommend using it in production.

Example request with a token query parameter:

```
// Paste this URL into your browser
// replace the token with your real API token
https://api.fpjs.io/visitors/someVisitorID?token=<<apiKey>>
```

## Visitor endpoint
`get` **/visitors/:id** - get visitor history
> api-base-url**/visitors/:id**

This endpoint allows you to get a history of visits with all available information. Use the `visitorID` as a URL path parameter. This API method is scoped to a visitor, i.e. all returned information is by visitorID.

### Request

#### Path parameters
[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Required/Optional",
    "h-2": "Type",
    "0-0": "id",
    "0-1": "required",
    "0-2": "`string`",
    "h-3": "Description",
    "0-3": "VisitorID"
  },
  "cols": 4,
  "rows": 1
}
[/block]
#### Query parameters
[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Required/Optional",
    "h-2": "Type",
    "h-3": "Description",
    "0-0": "request_id",
    "0-1": "optional",
    "0-2": "`string`",
    "0-3": "Filter events by `requestId`, see `requestId` for details.",
    "1-0": "linked_id",
    "1-1": "optional",
    "1-2": "`string`",
    "1-3": "Filter events by custom identifier.",
    "2-0": "limit",
    "2-1": "optional",
    "2-2": "`number`",
    "2-3": "Limit scanned results (see limiting for details).",
    "3-0": "before",
    "3-2": "`integer`",
    "3-3": "Used to paginate results (see pagination for details).",
    "3-1": "optional"
  },
  "cols": 4,
  "rows": 4
}
[/block]
### Response

`200: OK`

```javascript visitor-found
// visitor found and recent visits history is available
{
  "visitorId": "Ibk1527CUFmcnjLwIs4A9",
  "visits": [
    {
      "requestId": "0KSh65EnVoB85JBmloQK",
      "incognito": true,
      "linkedId": "somelinkedId",
      "time": "2019-05-21T16:40:13Z",
      // timestamp of the event with millisecond precision
      "timestamp": 1582299576512,
      "url": "https://www.example.com/login",
      "ip": "61.127.217.15",
      "ipLocation": {
        "accuracyRadius": 10,
        "latitude": 49.982,
        "longitude": 36.2566,
        "postalCode": "61202",
        "timezone": "Europe/Dusseldorf",
        "city": {
          "name": "Dusseldorf"
        },
        "continent": {
          "code": "EU",
          "name": "Europe"
        },
        "country": {
          "code": "DE",
          "name": "Germany"
        },
        "subdivisions": [
          {
            "isoCode": "63",
            "name": "North Rhine-Westphalia"
          }
        ],
      },
      "browserDetails": {
        "browserName": "Chrome",
        "browserMajorVersion": "74",
        "browserFullVersion": "74.0.3729",
        "os": "Windows",
        "osVersion": "7",
        "device": "Other",
        "userAgent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) ....",
      }
    }
  ],
  // optional, if more results are available for pagination.
  "lastTimestamp": 1582299576512
}
```
```javascript visitor-found-no-visits
// visitor found, but has no recent visits
// by default, visits are returned from last 10 days
{
  "visitorId": "Ibk1527CUFmcnjLwIs4A9",
  "visits": []
}
```
`429: Too Many Requests`

This response code is returned if the limit on API token requests per second has been exceeded.

#### requestId

Every identification event has a unique identifier, associated with it, called `requestId`. This identifier is returned back into the browser during the identification API call and is also available in API responses.   
It is a convenient way to return the exact identification event that you need. When you filter events with `requestId`, only one event will be returned, because every event has a unique `requestId`.

#### linkedId: adding a custom identifier to events

If you need to associate events with your own identifier, use `linkedId`. You can use it in different scenarios: e.g. identify by sessionID, identify by purchaseID or by your custom transaction number. You should use `requestId` to get a single event, whereas you should use `linkedId` to retrieve several events, associated with your custom identifier.

#### Limit: limiting scanned results

For performance reasons, visitors API first performs events scanning and then filtering. Filtering always happens after the results are scanned.   
`Limit` is a parameter to specify how many events should be scanned.   
Results are always returned sorted by the timestamp in descending order \(most recent first\), so scanning the results limits how many events are scanned back in the past.   
By default, the visits API scans 100 events. However you can specify a different `limit` parameter, to scan fewer or more results. A maximum value of 500 results can be scanned and returned.

After the results were scanned, the filtering is applied to them, e.g. filtering by `requestId` or by `linkedId`. 

**Using limit example**: your website visitor was identified 120 times and 120 events are stored in our database. Last 10 events are associated with a sessionID = 1234ADF; You want to scan last 50 events and filter them by your sessionID = 1234ADF. You can achieve this by using this query:  
  
```
/visitors/:visitorId?limit=50&linked_id=1234ADF
```

Only 10 rows from the most recent 50 will be returned.

#### Pagination

When more results are available \(e.g. you scanned 200 results using `limit` parameter, but a total of 600 results are available\), a special `lastTimestamp` top-level attribute is added to the response. You should use the value of this attribute, if you want to paginate the results further in the past, to return the events that happened before that timestamp.

Example of using `before` parameter:

```
// 1st request, returning most recent 200 events:
GET api-base-url/visitors/:visitorId?limit=200
// Note that the response has lastTimestamp attribute in the response.
// Use that attribute to return the events that happened before, i.e
// next page of 200 events
GET api-base-url/visitors/:visitorId?limit=200&before=1582232027567
```

Note that pagination happens during scanning of the results, so if you used pagination + filtering, you can have just a few results back, with potentially more results available for pagination. These timestamps are stored with a millisecond precision. When there are no more results available for scanning, the `lastTimestamp` attribute will not be returned.

## Visits endpoint
`get` **/visits/** - get subscription visits
> api-base-url**/visits/**

This endpoint allows you to get the history of visits regardless of the visitorID to which they belong. You can also query one single visit by requestID without knowing the visitorID.

### Request

#### Query parameters
[block:parameters]
{
  "data": {
    "0-0": "limit",
    "h-0": "Parameter",
    "h-1": "Required/Optional",
    "h-2": "Type",
    "h-3": "Description",
    "1-0": "request_id",
    "1-1": "optional",
    "0-1": "required",
    "0-2": "`integer`",
    "0-3": "Limit scanned results (see limiting for details).",
    "1-3": "Query the visit with this `requestId`, see `requestId` for details.",
    "1-2": "`string`",
    "2-0": "visitor_id",
    "3-0": "reverse",
    "4-0": "since",
    "3-1": "optional",
    "3-2": "`boolean`",
    "4-1": "optional",
    "4-2": "`integer`",
    "2-2": "`string`",
    "2-1": "optional",
    "2-3": "Filter events by `visitorId`, see `visitorId` for details.",
    "3-3": "Reverse the order in which the events are scanned.",
    "4-3": "Used to paginate results (see pagination for details)."
  },
  "cols": 4,
  "rows": 5
}
[/block]
### Response

`200: OK`

```javascript visits-found
// visits found
{
  "visits": [
    {
      "visitorId": "Ibk1527CUFmcnjLwIs4A9",
      "requestId": "1631908980970.0xWFNm",
      "incognito": true,
      "linkedId": "somelinkedId",
      "time": "2019-05-21T16:40:13Z",
      // timestamp of the event with millisecond precision
      "timestamp": 1582299576512,
      "url": "https://www.example.com/login",
      "ip": "61.127.217.15",
      "ipLocation": {
        "accuracyRadius": 10,
        "latitude": 49.982,
        "longitude": 36.2566,
        "postalCode": "61202",
        "timezone": "Europe/Dusseldorf",
        "city": {
          "name": "Dusseldorf"
        },
        "continent": {
          "code": "EU",
          "name": "Europe"
        },
        "country": {
          "code": "DE",
          "name": "Germany"
        },
        "subdivisions": [
          {
            "isoCode": "63",
            "name": "North Rhine-Westphalia"
          }
        ],
      },
      "browserDetails": {
        "browserName": "Chrome",
        "browserMajorVersion": "74",
        "browserFullVersion": "74.0.3729",
        "os": "Windows",
        "osVersion": "7",
        "device": "Other",
        "userAgent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) ....",
      }
    }
  ],
  // optional, if more results are available for pagination.
  "lastTimestamp": 1582299576512
}
```
```javascript visits-not-found
// no visits found for the given query
{
  "visits": []
}
```
`429: Too Many Requests`

This response code is returned if the limit on API token requests per second has been exceeded.

#### Limit: limiting scanned results

For performance reasons, visits API first performs events scanning and then filtering. Filtering always happens after the results are scanned.   
`Limit` is a parameter to specify how many events should be scanned. It is required and Integers between 1 and 500 are allowed.

After the results were scanned, the filtering is applied to them, e.g. filtering by `visitorId`. 

**Using limit example**: 120 identification events were processed and stored in our database coming from several visitorIDs. Last 10 events are associated with a visitorID = Ibk1527CUFmcnjLwIs4A9; You want to scan the last 50 events and filter them by visitorID = Ibk1527CUFmcnjLwIs4A9. You can achieve this by using this query:
  
```
/visits?limit=50&visitor_id=Ibk1527CUFmcnjLwIs4A9
```

Only 10 rows from the most recent 50 will be returned.

#### requestId

Every identification event has a unique identifier, associated with it, called `requestId`. This identifier is returned back into the browser during the identification API call and is also available in API responses.   
It is a convenient way to return the exact identification event that you need. When you send the `requestId` parameter a query to retrieve the specific event with that `requestId` will be performed ignoring the rest of the parameters and only that event will be returned.

#### visitorId

Use this parameter to filter events that belong to a specific visitorID.

#### reverse

By default, events are scanned by the timestamp in descending order \(most recent first\), if you want to reverse the scan order set this parameter in `True`.

#### Pagination

When more results are available \(e.g. you scanned 200 results using `limit` parameter, but a total of 600 results are available\), a special `lastTimestamp` top-level attribute is added to the response. You should use the value of this attribute, if you want to paginate the results further in the past, to return the events that happened since that timestamp.

Example of using `since` parameter:

```
// 1st request, returning most recent 200 events:
GET api-base-url/visits?limit=200
// Note that the response has lastTimestamp attribute in the response.
// Use that attribute to return the events that happened next, i.e
// next page of 200 events
GET api-base-url/visits?limit=200&since=1582232027567
```

Note that pagination happens during scanning of the results, so if you used pagination + filtering, you can have just a few results back, with potentially more results available for pagination. These timestamps are stored with a millisecond precision. When there are no more results available for scanning, the `lastTimestamp` attribute will not be returned.

## Node.js SDK (Beta)

The FingerprintJS Node.js SDK is published using npm for streamlined integration into your existing workflow. Please visit the [GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk) to learn more.