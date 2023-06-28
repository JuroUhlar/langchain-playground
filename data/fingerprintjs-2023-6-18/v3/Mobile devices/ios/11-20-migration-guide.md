---
title: "1.1 -> 2.0 Migration Guide"
slug: "11-20-migration-guide"
excerpt: "Although we tried to keep the API as stable as possible, we’ve made some changes in the name of simplification and new feature support. This guide should help with an effortless migration from previous version (1.1) to 2.0."
hidden: false
createdAt: "2022-08-22T12:16:01.203Z"
updatedAt: "2022-08-23T16:28:39.976Z"
---
## Dependency Management
We started to distribute the library as a XCFramework binary instead of source code. Although that translates to a significant change under the hood, the upgrade should be as easy as with any other major version. Following our branding change, we have also renamed the library to **FingerprintPro** instead of the old FingerprintJSPro. The name change has to be reflected when using package management tools.
[block:code]
{
  "codes": [
    {
      "code": "// Example dependency in Package.swift\nlet package = Package(\n  // ...\n  dependencies: [\n        .package(url: \"https://github.com/fingerprintjs/fingerprintjs-pro-ios\", from: \"2.0.0\")\n  ],\n  // ...\n)",
      "language": "swift",
      "name": "SPM"
    },
    {
      "code": "# Podfile\npod 'FingerprintPro', '~> 2.0' # Do not forget about the name change",
      "language": "ruby",
      "name": "CocoaPods"
    }
  ]
}
[/block]
## Naming Changes
Following our company branding change, we’ve renamed all references to the library itself and everything else we could in our codebase to reflect the new brand name.

* Factory class  `FingerprintJSProFactory` has been renamed to `FingerprintProFactory`.
* The main client protocol `FingerprintJSProClient` has been renamed to `FingerprintClientProviding`
* Library/Module is now `FingerprintPro` (was `FingerprintJSPro` before)

## `Region` and Custom Domains
Region configuration in the factory has been refactored into an `enum`. The enum now includes specific case for custom domains. Because there are now more options, a `Configuration` object was added as a parameter to the factory API.

### Setting a `Region`
[block:code]
{
  "codes": [
    {
      "code": "let client = FingerprintJSProFactory.getInstance(\n  token: \"<apiKey>\",\n  url: nil,\n  region: \"eu\"\n)",
      "language": "swift",
      "name": "Before (1.1)"
    },
    {
      "code": "let configuration = Configuration(apiKey: \"apiKey\", region: .eu)\nlet client = FingerprintProFactory.getInstance(configuration)",
      "language": "swift",
      "name": "After (2.0)"
    }
  ]
}
[/block]
### Setting a Custom Domain
[block:code]
{
  "codes": [
    {
      "code": "let client = FingerprintJSProFactory.getInstance(\n  token: \"<apiKey>\",\n  url: \"https://customdomain.com/\",\n  region: nil\n)",
      "language": "swift",
      "name": "Before (1.1)"
    },
    {
      "code": "let customDomain: Region = .custom(domain: \"https://customdomain.com\")\nlet configuration = Configuration(apiKey: \"<apiKey>\", region: customDomain)\nlet client = FingerprintProFactory.getInstance(configuration)",
      "language": "swift",
      "name": "After (2.0)"
    }
  ]
}
[/block]
## Sending Tags
The tags object has been reworked and moved to a new `Metadata` structure. The API for tags is also now limited to support only objects that can be encoded into JSON. The API had looser type restrictions before that allowed the programmer to send objects that weren’t encodable into JSON, leading to an exception. That should be impossible now and should be caught during compilation.
[block:code]
{
  "codes": [
    {
      "code": "let tags: Tags = [\"sessionCount\": 10, \"sessionId\": \"abcefgh\"] \nclient.getVisitorId(tags) { result in\n\t// process result\n}",
      "language": "swift",
      "name": "Before (1.1)"
    },
    {
      "code": "var metadata = Metadata()\nmetadata.setTag(10, forKey: \"sessionCount\")\nmetadata.setTag(\"abcdefgh\", forKey: \"sessionId\")\n\nclient.getVisitorId(metadata) { result in\n\t// process result\n}",
      "language": "swift",
      "name": "After (2.0)"
    }
  ]
}
[/block]
## Optional: Start Using the `async/await` API
The library now has `async/await` support, further simplifying the usage of the API. Instead of processing a result, the `async/await` API throws an error instead, letting the programmer to handle the exception in a `do/catch` block.
[block:code]
{
  "codes": [
    {
      "code": "client.getVisitorId() { result in\n  switch(result) {\n\tcase .success(let visitorId):\n\t\t// process visitorId\n\tcase .failure(let error):\n\t\t// process error\n\t}\n}",
      "language": "swift",
      "name": "Before (1.1)"
    },
    {
      "code": "do {\n   let visitorId = try await client.getVisitorId()\n} catch {\n // process FPJSError\n}",
      "language": "swift",
      "name": "After (2.0)"
    }
  ]
}
[/block]
## New Features
We have introduced several new features that weren’t included in the previous version. Most notably:

* [Linked id](https://dev.fingerprint.com/docs/server-api#linkedid-adding-a-custom-identifier-to-events) support
* Extended result contains confidence score and other useful information