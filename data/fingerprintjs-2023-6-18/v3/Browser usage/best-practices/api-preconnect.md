---
title: "API preconnect"
slug: "api-preconnect"
excerpt: "Performance tip"
hidden: false
metadata: 
  title: "API preconnect performance tip  | FingerprintJS Pro Docs"
  description: "API preconnect improves request timings. To enable it, place the 'preconnect' directive as early as possible inside the 'head' tag."
  image: 
    0: "https://files.readme.io/83d1765-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-10-08T22:59:28.181Z"
updatedAt: "2022-10-25T13:42:03.544Z"
---
API preconnect is recommended for improved request timings. To enable it, place the `preconnect` directive as early as possible in your head tag:
[block:code]
{
  "codes": [
    {
      "code": "<html>\n<head>\n  <link rel=\"preconnect\" href=\"https://fpcdn.io\">\n  <link rel=\"preconnect\" href=\"https://use1.fptls.com\">\n  <link rel=\"preconnect\" href=\"https://api.fpjs.io\">\n  ... styles, js etc",
      "language": "html",
      "name": "CDN installation"
    },
    {
      "code": "<html>\n<head>\n  <link rel=\"preconnect\" href=\"https://fpnpmcdn.net\">\n  <link rel=\"preconnect\" href=\"https://use1.fptls.com\">\n  <link rel=\"preconnect\" href=\"https://api.fpjs.io\">\n  ... styles, js etc",
      "language": "html",
      "name": "NPM installation"
    }
  ]
}
[/block]
Note that you always need to preconnect to `use1.fptls.com` and `api.fpjs.io`.
  
- If you're using the EU API, use this preconnect URLs: `https://eun1.fptls.com` and `https://eu.api.fpjs.io`.
- If you're using the Mumbai API, use this preconnect URLs: `https://aps1.fptls.com` and `https://ap.api.fpjs.io`
- If you're using the [Custom subdomain](doc:subdomain-integration), use your subdomain in the preconnect, instead of `https://api.fpjs.io`

Example with the Custom subdomain enabled on `https://fp.mydomain.com`:
[block:code]
{
  "codes": [
    {
      "code": "<html>\n<head>\n  <!-- only if you load the script from the CDN -->\n  <link rel=\"preconnect\" href=\"https://fpcdn.io\">\n  <link rel=\"preconnect\" href=\"https://use1.fptls.com\">\n  <link rel=\"preconnect\" href=\"https://fp.mydomain.com\">",
      "language": "html"
    }
  ]
}
[/block]