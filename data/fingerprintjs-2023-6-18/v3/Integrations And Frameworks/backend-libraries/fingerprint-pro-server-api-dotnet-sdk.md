---
title: ".NET Server API SDK"
slug: "fingerprint-pro-server-api-dotnet-sdk"
hidden: false
createdAt: "2023-01-25T15:17:50.016Z"
updatedAt: "2023-06-05T21:50:12.960Z"
---
The [Fingerprint Server C#/.NET SDK](https://github.com/fingerprintjs/fingerprint-pro-server-api-dotnet-sdk/) is an easy way to interact with our Server API from your .NET application. You can retrieve visitor history or individual fingerprinting events.

### How to install

Install the package from NuGet.

```shell shell
dotnet add package FingerprintPro.ServerSdk
```

Initialize the client instance and use it to make API requests. You need to specify your secret API key and region (if it is not US/Global).

```csharp
using FingerprintPro.ServerSdk.Api;
using FingerprintPro.ServerSdk.Client;

var configuration = new Configuration("<SECRET_API_KEY>");
// configuration.Region = Region.Eu;

var api = new FingerprintApi(
    configuration
);

// Get visit history of a specific visitor
var visits = api.GetVisits("<visitorId>");
Console.WriteLine(visits);

// Get a specific fingerprinting event
var events = api.GetEvent("<requestId>");
Console.WriteLine(events);
```

### Documentation

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprint-pro-server-api-dotnet-sdk/).