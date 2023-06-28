---
title: "JavaScript agent placement"
slug: "js-agent-placement"
hidden: false
createdAt: "2022-02-27T19:47:25.396Z"
updatedAt: "2023-06-14T15:06:54.571Z"
---
The JS agent is a client-side JavaScript snippet that collects browser attributes and sends these signals to Fingerprint servers for processing and identification. Depending on your use case, the placement of this script can range from all pages of your app to specific pages and events.

Fingerprint billing is based on API usage (device identifications), so it is important to make the most of your subscription’s monthly API limit. We recommend calling the API only when the `visitorId` will be processed or saved by your application.

> 📘 Using a JavaScript framework?
> 
> We offer framework-specific libraries for React, Next, Vue, Svelte, Preact, and Angular with a built-in `visitorId` caching mechanism. Use one of our [frontend libraries](https://dev.fingerprint.com/docs/frontend-libraries) to cache visitor identifiers and reduce the number of API requests.

The table below lists common use cases and recommended integration of the JavaScript agent.

| Use Case                                                                                                | JS Agent Placement                | API Call Event                                                   | Estimated Volume (per month)             |
| :------------------------------------------------------------------------------------------------------ | :-------------------------------- | :--------------------------------------------------------------- | :--------------------------------------- |
| **Anonymous Visitor Identification** - bulk information collection of anonymous visitors                | Landing page, checkout page, etc. | Page load or start of session (depending on your implementation) | 1:1 number of page loads/sessions        |
| **Account Takeover Prevention** - prevent account theft from malicious login attempts                   | Login page                        | "Login" button click                                             | 1:1 number of attempted logins           |
| **Securing Login & Reducing Friction** - reduce friction with conditional security checks at login      | Login page                        | "Login" button click                                             | 1:1 number of attempted logins           |
| **Account Sharing Prevention** - prevent users from sharing accounts                                    | Login page                        | "Login" button click                                             | 1:1 number of attempted logins           |
| **Multi-account Prevention** - prevent users from creating multiple accounts                            | Registration page                 | "Register" button click                                          | 1:1 number of attempted sign ups         |
| **Form & Survey Abuse** - protect forms from duplicate entries                                          | Form page                         | “Submit Form” button click                                       | 1:1 number of attempted form submissions |
| **Coupon & Promo Abuse** - protect profits from duplicate promotion abuse                               | Checkout page                     | “Apply coupon” button click                                      | 1:1 number "apply coupon" button clicks  |
| **Credit Card Fraud** - block users who repeatedly use faulty credit cards                              | Checkout page                     | “Checkout” button click                                          | 1:1 number of checkout attempts          |
| **E-commerce Tracking** - track orders made by anonymous visitors                                       | Checkout page                     | “Checkout” button click                                          | 1:1 number of checkout attempts          |
| **Paywall Circumvention** - detect Incognito mode and prevent unlimited views of your paywalled content | Paywalled pages                   | Page load                                                        | 1:1 number of paywalled page loads       |

> 📘 Device fingerprinting for native mobile apps
> 
> For mobile device identification, we highly recommend using our native SDKs for [Android](https://dev.fingerprintjs.com/docs/native-android-integration) and [iOS](https://dev.fingerprintjs.com/docs/native-ios-integration). For device identification that is scoped to the browser instance, a unique ID called `visitorId` is generated per browser. If a visitor switches to a different browser on the same device, a new `visitorId` is generated for that browser.