---
title: "Safari Intelligent Tracking Prevention"
slug: "safari-itp"
hidden: false
metadata: 
  title: "Mitigating Safari ITP issues | FingerprintJS Pro Docs"
  description: "FingerprintJS Pro uses third-party and client-side cookies, so to avoid issues with Safari ITP we recommend using our CNAME or CloudFlare integration."
  image: 
    0: "https://files.readme.io/af83cc8-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-10-08T22:59:28.181Z"
updatedAt: "2023-06-05T21:17:28.152Z"
---
Apple Safari has an on-by-default privacy protection feature called [Intelligent Tracking Protection](https://webkit.org/blog/9521/intelligent-tracking-prevention-2-3/), or ITP.  ITP has been very effective in preventing cross-site tracking by disabling 3rd-party cookies completely and capping the lifetime of all script-writable website data.

By default, Fingerprint API uses 3rd party cookies (both client-side set with `document.cookie` and server-side set with the `Set-Cookie` HTTP header) and script-writable website data (localStorage) to more reliably identify returning visitors. All of these methods are affected by ITP, lowering identification accuracy. 

To keep a high identification accuracy of Safari users, you need to use a [Custom subdomain setup](https://dev.fingerprint.com/docs/subdomain-integration) or a cloud proxy integration like [Cloudflare](https://dev.fingerprint.com/docs/cloudflare-integration) or [Cloudfront](https://dev.fingerprint.com/docs/cloudfront-proxy-integration), which makes cookies set by Fingerprint considered "first-party". See [Protecting the JavaScript agent from ad-blockers](https://dev.fingerprint.com/docs/protecting-the-javascript-agent-from-adblockers) for more details.