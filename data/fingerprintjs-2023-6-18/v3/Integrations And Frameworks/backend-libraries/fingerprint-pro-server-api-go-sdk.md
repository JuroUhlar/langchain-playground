---
title: "Go Server API SDK"
slug: "fingerprint-pro-server-api-go-sdk"
hidden: false
createdAt: "2022-09-01T11:08:06.410Z"
updatedAt: "2023-06-05T21:45:23.393Z"
---
The [Fingerprint Server Go SDK](https://github.com/fingerprintjs/fingerprint-pro-server-api-go-sdk) is an easy way to interact with our Server API from your Go application. You can retrieve visitor history or individual fingerprinting events.

### How to install

Get the package from GitHub using `go get`.

```bash
go get github.com/fingerprintjs/fingerprint-pro-server-api-go-sdk
```

Initialize the client instance and use it to make API requests. You need to specify your secret API key and region (if it is not US/Global). 

```go
package main

import (
  "context"
  "fmt"
  "github.com/antihax/optional"
  "github.com/fingerprintjs/fingerprint-pro-server-api-go-sdk/v3/sdk"
  "log"
)

func main() {
  cfg := sdk.NewConfiguration()
  client := sdk.NewAPIClient(cfg)

  auth := context.WithValue(
    context.Background(),
    sdk.ContextAPIKey,
    sdk.APIKey{Key: "<SECRET_API_KEY>"},
  )
  // cfg.ChangeRegion(sdk.RegionEU)

  // Get visit history of a specific visitor
  getVisitsOpts := sdk.FingerprintApiGetVisitsOpts{
    Limit: optional.NewInt32(10),
  }
  history, historyHttpRes, historyErr :=
    client.FingerprintApi.GetVisits(auth, "<visitorId", &getVisitsOpts)
  if err != nil {
    log.Fatal(err)
  }
  fmt.Printf("Visitor history: %s", history)

  // Get a specific fingerprinting event
  event, eventHttpRes, eventErr :=
    client.FingerprintApi.GetEvent(auth, "<requestId>")
  if eventErr != nil {
    log.Fatal(eventErr)
  }
  fmt.Printf("Event: %s", event)
}
```

### Documentation

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprint-pro-server-api-go-sdk). The repository also contains [an example app](https://github.com/fingerprintjs/fingerprint-pro-server-api-go-sdk/tree/main/example) demonstrating the usage of the library.