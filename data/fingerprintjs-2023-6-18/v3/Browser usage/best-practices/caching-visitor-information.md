---
title: "Caching visitor information"
slug: "caching-visitor-information"
hidden: false
createdAt: "2022-02-27T20:53:03.436Z"
updatedAt: "2023-06-05T22:55:07.799Z"
---
A `visitorId` generated per page view across all pages on a site can lead to unexpected and excess API usage. We recommend storing the visitorId per browser session to minimize the identifications of a visitor as they navigate your site from one browser tab.

> 📘 Note
> 
> Values stored in sessionStorage, localStorage, and cookies are not available from Incognito mode, so these caching attempts will not work if a visitor switches from normal to private browsing (or vice versa).

### Caching methods

#### sessionStorage

sessionStorage is one solution to cache the Fingerprint Identification `visitorId` per user session. Unlike localStorage, this property is automatically cleared when the page session ends (i.e. closing the browser tab or window).

First, perform a check whether sessionStorage contains a `visitorId` by wrapping an if statement around `fpPromise`. If `visitorId` does not exist (condition is false), perform a Fingerprint API request using the `fp.get()` method. When the promise is resolved, write the `visitorId` to sessionStorage.

Learn more about sessionStorage here: <https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage>

#### Cookies

An alternative approach to sessionStorage is to store information by JavaScript-set cookies. The concept is similar where a check for an existing `visitorId` is performed, and if the cookie does not exist only then is a request made to Fingerprint. The difference is that cookies require an expiration date defined by the developer. We recommend storing a visitorId no longer than 24 hours.

Learn more about cookies here: <https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie>

#### Single-Page Applications

If you are using Fingerprint in a single-page application built with frameworks like React, Vue, or Angular, we recommend using our dedicated open-source packages. These wrappers offers caching options for sessionStorage or localStorage.

- [Angular](https://dev.fingerprint.com/docs/angular)
- [Next.js](https://dev.fingerprint.com/docs/fingerprintjs-pro-nextjs)
- [Preact](https://dev.fingerprint.com/docs/preact)
- [React](https://dev.fingerprint.com/docs/fingerprintjs-pro-react)
- [Svelte](https://dev.fingerprint.com/docs/svelte)
- [Vue](https://dev.fingerprint.com/docs/vuejs)

> 🚧 Important Note
> 
> For high identification [accuracy](https://dev.fingerprintjs.com/docs/understanding-our-995-accuracy), we recommend caching the `visitorId` for no longer than 24 hours.