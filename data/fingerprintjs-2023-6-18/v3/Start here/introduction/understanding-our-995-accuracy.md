---
title: "Understanding our 99.5% accuracy"
slug: "understanding-our-995-accuracy"
hidden: false
metadata: 
  title: "FingerprintJS Pro’s 99.5% accuracy | FingerprintJS Pro Docs"
  description: "FingerprintJS Pro combines dozens of attributes to create a visitorIDs. We can recognize a returning browser through its visitorID 99.5% of the time."
  image: 
    0: "https://files.readme.io/99bf08f-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2021-02-08T17:12:23.531Z"
updatedAt: "2023-06-05T22:30:55.977Z"
---
Fingerprint Identification combines dozens of browser attributes to create a unique and stable `visitorId`. Attributes include screen resolution, operating system, IP address, loaded fonts, and other information that your browser can access. Individual attributes may not be accurate on their own, but when many are added together the result is unique for most website visitors. For example, lots of browsers run on Macs, but not as many have an IP address in Nebraska, and fewer still have a Wingdings font – each of these attributes add up to help make a fingerprint. With the help of a machine learning system and a few other identifiers, Fingerprint Identification can recognize a returning browser through its `visitorId` 99.5% of the time.

### How Fingerprint Identification tests accuracy

As part of its normal operation, Fingerprint Identification saves a cookie to each visitor’s browser. 

We can identify cookied browsers with 100% accuracy and can use that as a reference to check the accuracy of all other identification methods. Below are the formulas for the accuracy of visitorIDs without a cookie, and the total accuracy of the Fingerprint Identification system.  

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/90c4e56-Screen_Shot_2021-02-08_at_11.09.54_AM.png",
        "Screen Shot 2021-02-08 at 11.09.54 AM.png",
        731
      ],
      "align": "center",
      "caption": "A calculation showing how Fingerprint Identification's accuracy is determined using cookies"
    }
  ]
}
[/block]

Across all our customers, the `visitorId` method gives an average accuracy of 99.5%.

### Why Fingerprint Identification is better than cookies alone

Cookies are accurate but are not always available. Users can delete cookies or browse in incognito mode. Fingerprint Identification is a better way to identify browsers because it can generate a unique `visitorId` without cookies. Another benefit is that Fingerprint can store the history of every attribute that we use to identify browsers. If a user switches to incognito mode, all those attributes remain the same and identification is easy. If a user upgrades their browser some attributes change, but enough remain the same that we can still identify the browser.

### Factors that influence accuracy

Sometimes a visitor to a website will have all the same browser attributes as another different visitor. If we aren’t able to find a difference between the two visitors, we may give that visitor’s browser the same `visitorId`. This situation is known as a false positive. Fingerprint customers typically see a false positive rate around 0.5%.

### Accuracy of the open source version

The FingerprintJS open source version is a JavaScript library that puts together browser attributes to generate a unique and stable hash. The open source version is less accurate than the Fingerprint Identification version because it does not store any history or use the server side identification methods included in the Identification version. The open source version might not be able to tell the difference between two or more browsers of the same version on the same platform because the attributes available to JavaScript are all the same. The Fingerprint Identification version has techniques to solve for this. See other differences between open source and Fingerprint Identification versions [here](doc:pro-vs-open-source).

### Fingerprint Identification, the market leader

In a [recent browser fingerprinting study](https://hal.inria.fr/hal-01718234v2) from KTH Royal Institute of Technology, only 33.6% of users were correctly identified. [Other studies](https://www.researchgate.net/publication/332873650_Browser_Fingerprinting_A_survey) from the Electronic Frontier Foundation and Inria saw fingerprint accuracy between 80-90%, but those studies predate current web privacy policies and technologies. Fingerprint Identification's 99.5% accuracy is higher than any other service on the market. Through browser fingerprinting and other techniques, Fingerprint Identification provides best-in-class identification accuracy while complying with GDPR and CCPA rules.