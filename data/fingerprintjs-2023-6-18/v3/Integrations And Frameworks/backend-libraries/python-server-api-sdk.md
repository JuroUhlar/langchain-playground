---
title: "Python Server API SDK"
slug: "python-server-api-sdk"
hidden: false
createdAt: "2022-08-24T14:28:12.982Z"
updatedAt: "2023-06-05T21:50:01.534Z"
---
[Fingerprint Server Python SDK](https://github.com/fingerprintjs/fingerprint-pro-server-api-python-sdk) is an easy way to interact with our Server API from your Python application. You can retrieve visitor history or individual fingerprinting events.

### How to install

Add `fingerprint_pro_server_api_sdk` as a dependency to your application via `pip` from GitHub or PyPI.

```shell
pip install git+https://github.com/fingerprintjs/fingerprint-pro-server-api-python-sdk.git
```

```shell
pip install fingerprint_pro_server_api_sdk
```

Initialize the client instance and use it to make API requests. You need to specify your secret API key and region (if it is not US/Global).

```python
import fingerprint_pro_server_api_sdk
from fingerprint_pro_server_api_sdk import EventResponse
from fingerprint_pro_server_api_sdk import Response
from fingerprint_pro_server_api_sdk.rest import ApiException

configuration = fingerprint_pro_server_api_sdk.Configuration(
  api_key="<SECRET_API_KEY>",
  # region="eu"
)
api_instance = fingerprint_pro_server_api_sdk.FingerprintApi(configuration)

# Get visit history of a specific visitor
try:
    visits: Response = api_instance.get_visits("<visitorId>", limit=10)
    print(visits)
except ApiException as e:
    print("Exception when getting visits: %s\n" % e)

# Get a specific fingerprinting event
try:
    event: EventResponse = api_instance.get_event("<requestId>")
    print(event)
except ApiException as e:
    print("Exception when getting an event: %s\n" % e)
```

### Documentation

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprint-pro-server-api-python-sdk).