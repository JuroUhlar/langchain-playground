---
title: "Incognito / private mode detection"
slug: "incognito-private-mode-detection"
hidden: false
metadata: 
  title: "Incognito and private browsing detection | FingerprintJS Pro Docs"
  description: "FingerprintJS Pro detects and identifies visitors regardless of private or incognito mode. Supported browsers: Safari, Chrome, Android, Firefox, Edge, and more."
  image: 
    0: "https://files.readme.io/5815b2d-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-10-08T22:59:28.181Z"
updatedAt: "2023-06-05T21:35:41.306Z"
---
Fingerprint analyzes every identification event and detects if it was made from the incognito tab.

These browsers are supported:

- Safari (macOS / iOS)
- Chrome (Windows / macOS / iOS / Android / Linux)
- Samsung Browser (Android)
- Firefox (Windows / macOS / iOS / Android / Linux)
- Edge (Windows / macOS / iOS / Android)
- Brave (Windows / macOS / iOS / Android / Linux)

Information about incognito mode and private browsing is included in [JS agent](js-agent), [Server API](server-api) and [Webhook](webhooks) documentation.

> 🚧 <iframe> note:
> 
> Incognito detection can give a false result when JS agent runs in an iframe. Make sure JS agent runs outside iframes to get the accurate result.