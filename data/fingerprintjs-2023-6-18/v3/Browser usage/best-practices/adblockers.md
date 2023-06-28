---
title: "Ad Blockers (old page redirect)"
slug: "adblockers"
hidden: true
metadata: 
  title: "How to avoid ad blocker issues | FingerprintJS Pro Docs"
  description: "Ad blockers can prevent the FingerprintJS Pro JavaScript agent from sending data to the API. To avoid problems, use our CNAME or Cloudflare integration."
  image: 
    0: "https://files.readme.io/4480b7a-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-10-08T22:59:28.181Z"
updatedAt: "2023-05-10T11:44:21.078Z"
type: "link"
link_url: "https://dev.fingerprint.com/docs/protecting-the-javascript-agent-from-adblockers"
---
Ad blockers, such as uBlock Origin or Adblock Plus, can interfere with how the Fingerprint Pro agent works.  
If you use our [CDN](doc:js-agent#cdn) to add the JS agent to your pages, ad blockers can block the [CDN URL](https://fpjscdn.net) and prevent browsers from downloading the agent script to your pages.  
To fix the CDN blocking, we recommend using the [Cloudflare](doc:cloudflare-integration) or [CloudFront](https://dev.fingerprint.com/docs/cloudfront-proxy-integration) proxy integration. With a proxy integration, the script will be downloaded through a proxy without getting blocked.

After the JS agent is already there in your HTML, you will typically call the agent's `load()`  function to initialize the agent and then the `get()` function to make the API call.

Fingerprint Pro backend uses `fpjs.io` API base URL by default, which can also be blocked by ad blockers or privacy-focused browsers, such as [Brave](doc:brave-browser-support).  
To make the `get()` function work and be immune to blocking, we require using either one of the proxy integrations or the [Custom subdomain](doc:subdomain-integration) functionality.  
If you have any questions regarding both options, please contact our friendly support at support@fingerprint.com