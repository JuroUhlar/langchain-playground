---
title: "Fingerprint Identification"
slug: "introduction"
excerpt: "Fingerprint Identification introduction and quick start examples."
hidden: false
metadata: 
  title: "Introduction to FingerprintJS | FingerprintJS Pro Docs"
  description: "FingerprintJS uses a JavaScript agent, running in the browser, and a server-side API system to identify visitors and store information you need to detect fraud."
  image: 
    0: "https://files.readme.io/8f5424b-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-10-08T22:59:28.178Z"
updatedAt: "2023-06-05T22:46:10.013Z"
---
### Fingerprint provides the most accurate and stable device identification

It is a combination of a client-side agent, running on your end-users' mobile devices or browsers and a server-side event processing system that securely identifies devices or web visitors and stores all the information you need to use.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/297c99c-Screen_Shot_2021-04-19_at_18.40.21.png",
        "Screen Shot 2021-04-19 at 18.40.21.png",
        1876
      ],
      "align": "center",
      "caption": "Overview of the different layers of the Fingerprint identification process when used in the browser"
    }
  ]
}
[/block]

### How it works

To add Fingerprint Identification to your application, you'll need to add a JavaScript snippet to your webpages or add our mobile SDK to your native app. Once it's added, you will start receiving the identification information via webhooks \(on your server\) or directly in your application \(in the browser or on the device\). The format of identification messages is explained in [webhooks section](webhooks). Webhooks are delivered to your servers immediately after an identification event occurs. It's also possible to query the events server-side using our [Server API](server-api). 

### JavaScript Agent

Fingerprint Identification does not calculate fingerprints in the browser. Instead, it uses a lightweight JavaScript agent that collects multiple device signals and sends them to our servers. This helps prevent reverse engineering and spoofing of an identifier by advanced bots. The agent is hosted at edge locations around the world. It is only 12 KB in size and  20 ms away from your users. It is also possible to install the agent as an [NPM module](doc:js-agent#ecmascript-module).

### Mobile SDKs

Fingerprint supports a wide selection of mobile platforms and cross-platform development frameworks. You can easily integrate our SDK into Android, iOS, tvOS, and Android TV platforms. For cross-platform frameworks, we officially support React Native and Flutter. Mobile device identification accuracy is even higher than the JavaScript one and will generate identifiers that are almost 100% accurate.

### Server-side identification system

Server-side identification system provides a platform that processes and stores events to identify your application users or website visitors. It also provides many helpful features that are explained in more detail on dedicated documentation pages.

### Fingerprint security

For an overview of the Fingerprint security features, go to this page: <https://fingerprint.com/security/>

### Business scenarios where Fingerprint can help

**Catch users trying to automatically input many usernames and passwords into your login forms.**

Every visitor gets their unique `visitorID` value, which is calculated from multiple browser and device signals, including fingerprints. You can use that value to see if the current visitor had visited your website before.

**Confirm that someone buying an item is not the same user as someone a week ago that purchased an item with a stolen credit card.**

This time they think that with a different email address and IP you won’t catch them, but we know they have the same `visitorId`.

You can tag every visitor with custom data to be able to identify them later. You can also tell us \(through an API call\) that this visitor is a bad actor and be alerted when this visitor opens your website in the future.

**Catch users submitting fake forms and fake clicks.**

Identify such users with a `visitorId`. Tag them and be alerted when they visit you again. Make sure you're protected from click farms and bots.

**Build a metered paywall for premium content.**

Make your premium content protected with a metered paywall. Allow only a specified number of reads over a period of time. A paywall demo can be seen [here](https://paywall-example.fingerprintjs.com/). GitHub [repository is also available](https://github.com/fingerprintjs/paywall-demo).

### Quick start JavaScript examples

> These examples can help you get started quickly. They use the script from the [CDN](doc:js-agent#cdn).  
> For more information, visit the [Quick start guide](doc:quick-start-guide). If you're looking for the full JavaScript reference, please see the [JS agent documentation](/docs/js-agent).
>
> If you would like to start your free trial,  please sign up on <https://dashboard.fingerprint.com/signup>.

You should start by adding the JavaScript snippet to your `<head/>` tag and then configuring the agent with a `FingerprintJS.load(...)` call.

#### Sending data on page load and getting results back

```html
<head>
  <script>
    // Initialize the agent at application startup.
    const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
      .then(FingerprintJS => FingerprintJS.load());

    // Get the visitor identifier when you need it.
    fpPromise
      .then(fp => fp.get())
      .then(result => {
        // This is the visitor identifier:
        const visitorId = result.visitorId;
        console.log(visitorId);
      });
  </script>
</head>
<body>
  ...
</body>
```

[Run this code](https://stackblitz.com/edit/fpjs-pro-3-cdn?devtoolsheight=100&file=index.html)

> If you're testing from EU or Asia (Mumbai), add the `region` configuration parameter:

```diff EU
FingerprintJS.load({
  apiKey: '<<browserToken>>',
+ region: 'eu'
})
```
```diff Asia (Mumbai)
FingerprintJS.load({
  apiKey: '<<browserToken>>',
+ region: 'ap'
})
```

#### Sending data on user actions

```html
<head>
  <script>
    // Initialize the agent at application startup.
    const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
      .then(FingerprintJS => FingerprintJS.load());

    // FingerprintJS is ready. Start listening to user actions.
    document.querySelector('#login-btn').addEventListener('click', () => {
      fpPromise
        .then(fp => fp.get())
        .then(result => {
          // This is the visitor identifier:
          const visitorId = result.visitorId;
          console.log(visitorId);
        });
    });
  </script>
</head>
<body>
 <button id="login-btn">Log in</button>
</body>
```

[Run this code](https://stackblitz.com/edit/fpjs-pro-3-cdn-adhoc?devtoolsheight=50&file=index.html)