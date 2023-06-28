---
title: "Geolocation"
slug: "geolocation"
hidden: false
metadata: 
  title: "Using geolocation for fingerprinting | FingerprintJS Pro Docs"
  description: "Default geolocation settings for fingerprinting provide the location of a website visitor on a city level, specifying an accuracy method is not necessary."
  image: 
    0: "https://files.readme.io/41efe40-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-10-08T22:59:28.180Z"
updatedAt: "2022-05-17T13:17:26.851Z"
---
Geolocation provides the location of a visitor on a city level. Geolocation is based on IP address of the visit.
[block:code]
{
  "codes": [
    {
      "code": "await fp.get()\n// Webhook and Server API data will contain this information:\n{\n  \"ip\": \"89.112.151.14\",\n  \"ipLocation\": {\n    \"accuracyRadius\": 5, // The radius in kilometers around the specified location where the IP address is likely to be.\n    \"latitude\": 37.987,\n    \"longitude\": -1.13,\n    \"postalCode\": \"30006\",\n    \"timezone\": \"Europe/Madrid\",\n    \"city\": {\n      \"name\": \"Murcia\"\n    },\n    \"continent\": {\n      \"code\": \"EU\",\n      \"name\": \"Europe\"\n    },\n    \"country\": {\n      \"code\": \"ES\",\n      \"name\": \"Spain\"\n    },\n    \"subdivisions\": [\n      {\n        \"isoCode\": \"MC\",\n        \"name\": \"Murcia\"\n      },\n      {\n        \"isoCode\": \"MU\",\n        \"name\": \"Murcia\"\n      }\n    ]\n  },\n  // ...\n}",
      "language": "javascript"
    }
  ]
}
[/block]
In order to receive the geolocation information in the object returned by a JS agent, add the `extendedResult: true` option.
[block:code]
{
  "codes": [
    {
      "code": "const result = await fp.get({\n  extendedResult: true\n})\nconsole.log(result);\n// Prints the following:\n{\n  \"ip\": \"89.112.151.14\",\n  \"ipLocation\": {\n    // ...\n  },\n  // ...\n}",
      "language": "javascript"
    }
  ]
}
[/block]