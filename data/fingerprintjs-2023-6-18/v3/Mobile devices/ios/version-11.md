---
title: "1.1"
slug: "version-11"
excerpt: "Fingerprint Identification in native iOS apps"
hidden: true
createdAt: "2022-08-24T11:56:47.377Z"
updatedAt: "2023-06-05T22:57:05.301Z"
---
Fingerprint's native iOS integration allows developers to integrate device identification logic into native iOS apps. Visit the [official GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-iOS) for examples and package downloads.

Please note that this agent requires your public API key because it's using Fingerprint identification API internally. 

For native device fingerprinting for Android, please go to [Android agent](doc:native-android-integration)

## Installing the agent

### CocoaPods

Specify the following dependency in your Podfile:

```text
pod 'FingerprintJSPro', '~> 1.1.0'
```

### Swift Package Manager

Add the following dependency to your Package.swift.

```text
dependencies: [
    .package(url: "https://github.com/fingerprintjs/fingerprintjs-pro-ios-integrations", .upToNextMajor(from: "1.1.0"))
]
```

## Import in the code

```swift
import FingerprintJSPro
```

## Get the visitor identifier

Retrieve the visitor identifier using your public API key. You can find your public API key in [your dashboard](https://dashboard.fingerprintjs.com/login).

```swift
FingerprintJSProFactory
    .getInstance(
        token: "<<browserToken>>",
        endpoint: nil, // optional
        region: nil // optional
    )
    .getVisitorId { result in
        switch result {
        case let .failure(error):
            print("Error: ", error.localizedDescription)
        case let .success(visitorId):
            print("Success: ", visitorId)
        }
    }
```

### How unique and stable is the visitorId?

The ID is completely unique for every device and it remains the same after the application is reinstalled. Only factory reset can wipe it out – which is a common and legal case (the device may be resold or gifted to another person).

### Params

- `token: string` - public API key from the [FingerprintJS dashboard](https://dashboard.fingerprintjs.com/)
- `endpoint: URL?` - `nil` for default endpoint, possible format for custom endpoint: `URL(string: "https://fp.yourdomain.com")`
- `region: String?` - `nil` for the Global region, `eu` for the European region

## [Tag](https://dev.fingerprintjs.com/v2/docs/js-agent#tag) support to associate custom data with each identification event

```swift
FingerprintJSProFactory
    .getInstance(
        token: "<<browserToken>>",
        endpoint: nil, // optional
        region: nil // optional
    )
    .getVisitorId(tags: ["sessionId": sessionId]) { result in
        switch result {
        case let .failure(error):
            print("Error: ", error.localizedDescription)
        case let .success(visitorId):
            print("Success: ", visitorId)
        }
    }
```

**Params**  
You can find your public API key in your dashboard. Params format and properties are the same as in JS agent

The full example content view for SwiftUI with configured iOS agent looks like:

```swift
import SwiftUI
import WebKit
 
struct ContentView: View {
    var body: some View {
        Webview(url: URL(string: "https://eager-hermann-4ea017.netlify.app")!) // this URL should refer to the webpage with injected and configured fingerprintjs-pro
    }
}
 
struct Webview: UIViewRepresentable {
    let url: URL
 
    func makeUIView(context: UIViewRepresentableContext<Webview>) -> WKWebView {
        let webview = WKWebView()
 
        let vendorId = UIDevice.current.identifierForVendor.flatMap { "'\($0.uuidString)'" } ?? "undefined"
        
        let script = WKUserScript(source: "window.fingerprintjs = { 'vendorId' : \(vendorId) }", injectionTime: .atDocumentStart, forMainFrameOnly: false)
 
        webview.configuration.userContentController.addUserScript(script) 
 
        let request = URLRequest(url: self.url, cachePolicy: .returnCacheDataElseLoad)
        webview.load(request)
 
        return webview
    }
 
    func updateUIView(_ webview: WKWebView, context: UIViewRepresentableContext<Webview>) {
        let request = URLRequest(url: self.url, cachePolicy: .returnCacheDataElseLoad)
        webview.load(request)
    }
}
```

## Additional resources

- [FingerprintJS Pro iOS on GitHub](https://github.com/fingerprintjs/fingerprintjs-pro-ios)