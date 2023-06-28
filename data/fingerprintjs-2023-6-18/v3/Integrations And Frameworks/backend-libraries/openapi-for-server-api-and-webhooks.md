---
title: "OpenAPI for Server API and Webhooks"
slug: "openapi-for-server-api-and-webhooks"
hidden: false
createdAt: "2022-07-23T10:19:30.863Z"
updatedAt: "2023-06-05T23:00:57.750Z"
---
[OpenAPI Specification](https://swagger.io/docs/specification/about/) (formerly _Swagger Specification_) is an API description format for REST APIs. With Fingerprint Server API and Webhooks open-source [OpenAPI Specifications](https://github.com/fingerprintjs/fingerprint-pro-server-api-openapi) and its public data contract, one can easily integrate with Fingerprint's [Server API](https://dev.fingerprint.com/docs/server-api) and [Webhooks](https://dev.fingerprint.com/docs/webhooks). Our OpenAPI specification conforms to [OpenAPI Specification version 3.0.3](https://swagger.io/specification/).

[Visual Swagger UI](https://swagger.io/tools/swagger-ui/) representation of the OpenAPI definition can be found on the [demo page](https://fingerprintjs.github.io/fingerprint-pro-server-api-openapi/). The latest version of the Specification is published on [GitHub](https://fingerprintjs.github.io/fingerprint-pro-server-api-openapi/schemes/fingerprint-server-api.yaml).

## Webhooks Specification

OpenAPI Specification supports Fingerprint Webhooks through the SwaggerUI's [_callback_ feature](https://swagger.io/docs/specification/callbacks/). Since callbacks cannot exist without an initial request, there is an explicit`/webhook` path with the `TRACE` method in the Specification.

## Server API Specification

Server API supports  two types of authentication.

- `api_key` as a query parameter. This mode is supported in the SwaggerUI demo.
- `Auth-API-Key` as an HTTP header. This mode is not supported in the SwaggerUI demo because of the Same Origin Policy.