---
title: "Matomo / Piwik"
slug: "matomo-piwik"
excerpt: "Matomo analytics (formerly Piwik)"
hidden: false
metadata: 
  title: "Combining Matomo and FingerprintJS | FingerprintJS Pro Docs"
  description: "Matomo creates multiple visitors to represent a single visitor when it can't detect cookies. To avoid this, link Matomo to the visitorID value with this guide."
  image: 
    0: "https://files.readme.io/9fd8ab5-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-10-08T22:59:28.175Z"
updatedAt: "2023-06-05T23:00:24.382Z"
---
### Why use Matomo with Fingerprint

Matomo uses cookies to identify visitors. When cookies are not available or visitors use incognito mode, Matomo will create multiple visitors for one actual visitor.  Depending on your website traffic, this can pose a significant issue as it will incorrectly count your visitors.   

Fingerprint makes it easy to identify your website visitors with Matomo by linking them to the Fingerprint's `visitorID` value.  

Matomo has a limitation, which doesn't allow to replace their cookie-based identifier, but it has a `userID` [functionality](https://matomo.org/docs/user-id/), that can be used to link Matomo visitors with Fingerprint visitors. 

To do this, you would need to use a slightly different configuration for Matomo [JavaScript tracking client](https://developer.matomo.org/guides/tracking-javascript-guide).

### Configuration

Here is a full working example that will link Fingerprint's visitorID with Matomo visitorID using userID functionality:

```html
<head>
  <script>
  // This is the Matomo tracking client JavaScript snippet
  // with two modifications, wrapped in a function.
  // (the rest of the configuration is the default one)
  var initMatomo = function (fpjsVisitorId) {
    var _paq = window._paq || [];
    // Modification #1 (one new line).
    // Note, how we set the userID with `setUserId` configuration here
    _paq.push(['setUserId', fpjsVisitorId]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    // Modification #2 (one new line).
    // An important step is to attach the _paq to `window`. 
    // Otherwise, the Matomo client will not find this `_paq` array.
    window._paq = _paq;
    (function () {
      var u = "https://your.matomo.cloud/";
      _paq.push(['setTrackerUrl', u + 'matomo.php']);
      _paq.push(['setSiteId', '1']);
      var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
      g.type = 'text/javascript'; g.async = true; g.defer = true; g.src = '//cdn.matomo.cloud/your.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g, s);
    })();
  }

  // Now, the Fingerprint configuration
  import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => FingerprintJS.load())
  	.then(fp => fp.get())
    .then(result => initMatomo(result.visitorId))
    .catch(error => {
      // use your favorite error reporting tool
      reportError(err);
    })
    .finally(function () {
      // optional
      // do some guaranteed post-processing here
    });
  </script>
</head>
```

After you have configured it, you will start seeing UserID values in Matomo dashboard:  

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/73de507-matomo-fpjs.png",
        "matomo-fpjs.png",
        550
      ],
      "align": "center",
      "caption": "Screenshot of a correctly configured Matomo instance with token"
    }
  ]
}
[/block]

It's also possible to add additional information from Fingerprint to Matomo visits, such as incognito mode detection.