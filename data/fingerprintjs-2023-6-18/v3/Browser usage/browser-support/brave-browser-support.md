---
title: "Brave Browser Support"
slug: "brave-browser-support"
excerpt: "How to set up Fingerprint to run smoothly in Brave"
hidden: false
createdAt: "2022-10-06T22:57:13.278Z"
updatedAt: "2023-06-05T22:51:45.925Z"
---
[Brave](https://brave.com/) is a privacy-focused browser based on Chromium. For our purposes, it behaves similarly to Chrome with a strict ad-blocking extension installed. That means it blocks the agent-download and identification requests to Fingerprint CDN and API.

To reliably identify Brave users, you need to use a cloud proxy integration like [Cloudflare](https://dev.fingerprint.com/docs/cloudflare-integration) or [Cloudfront](https://dev.fingerprint.com/docs/cloudfront-proxy-integration). Using a proxy integration allows you to route Fingerprint HTTP requests through your own domain, which prevents Brave from blocking them. See [Protecting the JavaScript agent from ad-blockers](https://dev.fingerprint.com/docs/protecting-the-javascript-agent-from-adblockers) for more details.

## Related topics

If you want to dive deeper into Brave + Fingerprint, we recommend reading these articles on our blog:

1. [Why browser anti-fingerprinting techniques are not effective](https://fingerprint.com/blog/browser-anti-fingerprinting-techniques/)
2. [How the Web Audio API is used for fingerprinting](https://fingerprint.com/blog/audio-fingerprinting/)
3. [Can you prevent browser fingerprinting?](https://fingerprint.com/blog/browser-fingerprint-prevention/)
4. [How does canvas fingerprinting work?](https://fingerprint.com/blog/canvas-fingerprinting/)
5. [The top browser fingerprinting techniques explained](https://fingerprint.com/blog/browser-fingerprinting-techniques/)