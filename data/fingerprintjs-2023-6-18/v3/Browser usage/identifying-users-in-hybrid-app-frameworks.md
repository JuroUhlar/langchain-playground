---
title: "Identifying users in hybrid app frameworks"
slug: "identifying-users-in-hybrid-app-frameworks"
hidden: false
metadata: 
  title: "Identifying users in hybrid apps | FingerprintJS Pro Docs"
  description: "FingerprintJS Pro can identify users through the webviews of Cordova, Capacitor, PhoneGap, and other hybrid app frameworks."
  image: 
    0: "https://files.readme.io/eee7d20-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2021-02-19T22:18:51.098Z"
updatedAt: "2023-06-12T11:58:12.144Z"
---
# User identification in Capacitor, Cordova, PhoneGap, and other hybrid app frameworks

Fingerprint was designed for fraud detection in the browser, but Fingerprint Identification can also accurately identify users in apps built with Adobe PhoneGap, Ionic Capacitor, Apache Cordova, and other hybrid app development frameworks. 

## How to Install Fingerprint on a Hybrid App

**1** - Sign up for a [free trial](https://dashboard.fingerprint.com/signup/), or [log in](https://dashboard.fingerprint.com/login/) to your Fingerprint account if you have one.  
**2** - Follow the directions on our [quick start guide](doc:quick-start-guide) to install our Javascript agent using the NPM package method but NOT the CDN method. The agent needs to be added to your JavaScript, not to an HTML page.  
**3** - Copy/paste this terminal command to add our NPM package to your project: 

```text
npm install @fingerprintjs/fingerprintjs-pro
```
If you use Yarn it will look like this: 

```text
yarn add @fingerprintjs/fingerprintjs-pro
```

**4** - Add the JavaScript agent code to your JavaScript codebase. It will pull identification signals from your app’s web view interface:

```javascript ECMAScript
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

const fpPromise = FingerprintJS.load({ apiKey: '<<browserToken>>' })

// When you need the visitor identifier:
fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.visitorId))
```
```javascript CommonJS
const FingerprintJS = require('@fingerprintjs/fingerprintjs-pro')

const fpPromise = FingerprintJS.load({ apiKey: '<<browserToken>>' })

// When you need the visitor identifier:
fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.visitorId))
```
Note that you should replace `your-public-api-key` with the alphanumeric public API key code from your customer dashboard (it's automatically replaced if you're logged in to the documentation portal):

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6cfab74-api-keys.png",
        "api-keys.png",
        3022
      ],
      "align": "center",
      "caption": "Screenshot of where to find your Public API keys"
    }
  ]
}
[/block]

**5** - Continue the quick start guide instructions for the Custom subdomain, webhooks, server API queries, and tagging requests. There are no special considerations for enabling these features in hybrid apps.

## Fingerprint Identification features that are compatible with hybrid apps

Apps that work through hybrid environments use web views, which are similar to browsers in that they use HTML, CSS, and JavaScript to show content and controls to the user. The Fingerprint JavaScript agent can collect enough attributes through web views for us to create a visitor ID. Most Fingerprint functions, like webhooks and geolocation, work as expected in this environment.

## Other considerations

- If one of your API keys is stolen, [request filtering](doc:request-filtering) cannot stop a thief from using that API key on their own app. This is because our filtering system checks requests against a blacklist of suspect origins or a limited whitelist of acceptable origins, and the default origin in many hybrid app web views is "localhost." So from our perspective, all requests look like they’re coming from the same origin. We also filter HTTP headers using specified rules, but like origins, the headers of different web views look the same, so the rules aren’t effective. A developer can change the web view origin or header, but then the thief can do the same. If you suspect your API key was stolen, reach out to [our support team](https://fingerprint.com/support/).
- Fingerprint Identification needs an internet connection to create and match visitor IDs. We cannot store information while the device is offline and send it to our server when the device turns the Internet back on.
- The app’s webview and the device’s browser are separate environments. In cases where the web view and browser share many attributes, our system can assign a single visitorID to both environments, but we cannot guarantee a consistent match. 

## Compliance and support

Fingerprint is fully compliant with GDPR and CCPA when used to detect and prevent fraud.

For specific questions about how Fingerprint could work for your hybrid app, reach out to [our support team](https://fingerprint.com/support/).