---
title: "Fingerprint Identification vs OSS"
slug: "pro-vs-open-source"
hidden: false
createdAt: "2021-04-20T16:41:33.136Z"
updatedAt: "2023-06-05T22:45:05.695Z"
---
Fingerprint the company was started at the beginning of 2019 when the [creator](https://github.com/Valve) of the open-source [FingerprintJS](https://github.com/fingerprintjs/fingerprintjs) took feedback from existing users to implement a new professional version. 

**Fingerprint's Identification product is a fully commercially developed and designed for fraud detection, user identification, marketing attribution, and analytics that has numerous advantages, compared to the open-source version.**

The differences between the Identification and open-source versions are summarized in the table below.

[block:html]
{
  "html": "<table>\n    <tr>\n        <th></th>\n        <th>\n            <h2>OSS</h2>\n        </th>\n        <th>\n            <h2>Fingerprint Identification</h2>\n        </th>\n    </tr>\n    <tr>\n      <td colspan=\"3\"><h2>Core Features</h2></td>\n    </tr>\n  <tr>\n    \t<td>\n          <strong>Mobile Native SDKs</strong>\n          <div>\n            <i>Android, iOS, Flutter, React</i>\n          </div>\n       </td>\n       <td>\n            -</td>\n        <td>\n          <b>✓</b></td>\n  </tr>\n    <tr>\n        <td><strong>Standard fingerprint signals</strong>\n          <div><i>screen, os, device name</i></div>\n        </td>\n        <td>\n            ✓</td>\n        <td>\n            ✓</td>\n    </tr>\n    <tr>\n        <td><strong>Advanced fingerprint signals</strong>\n          <div><i>canvas, audio, fonts</i></div>\n        </td>\n        <td>\n            ✓</td>\n        <td>\n            ✓</td>\n    </tr>\n    <tr>\n        <td><strong>ID type</strong></td>\n        <td>fingerprint</td>\n        <td>visitorID**</td>\n    </tr>\n    <tr>\n        <td><strong>ID lifetime</strong></td>\n        <td>several weeks</td>\n        <td>months/years</td>\n    </tr>\n    <tr>\n        <td><strong>ID origin</strong></td>\n        <td>client</td>\n        <td>server</td>\n    </tr>\n    <tr>\n        <td><strong>ID collisions</strong></td>\n        <td>common</td>\n        <td>rare</td>\n    </tr>\n    <tr>\n      <td colspan=\"3\"><h2>Additional features</h2></td>\n    </tr>\n    <tr>\n        <td><strong>Incognito mode detection</strong>\n            <div><i>works in all modern browsers - see our full\n                list of <a href=\"https://dev.fingerprintjs.com/docs/browser-support/\" target=\"_blank\"\n                           rel=\"noreferrer\">browsers supported</a></i></div>\n        </td>\n        <td>\n            -</td>\n        <td>\n            ✓</td>\n    </tr>\n    <tr>\n        <td><strong>Server-side accuracy increase</strong>\n            <div><i>based on additional server-side signals,\n              such as TLS crypto support, ipv4/v6 data and others</i></div>\n        </td>\n        <td>\n            -</td>\n        <td>\n            ✓</td>\n    </tr>\n    <tr>\n        <td><strong>Query API &amp; realtime\n                Webhooks</strong>\n          <div><i>build flexible workflows</i></div>\n        </td>\n        <td>\n            -</td>\n        <td>\n            ✓</td>\n    </tr>\n    <tr>\n        <td><strong>Geolocation</strong>\n          <div><i>based on IP address</i></div>\n        </td>\n        <td>\n            -</td>\n        <td>\n            ✓</td>\n    </tr>\n    <tr>\n        <td>Operations</td>\n        <td></td>\n        <td></td>\n    </tr>\n    <tr>\n        <td><strong>Data security</strong></td>\n        <td>Your infrastructure</td>\n        <td>Encrypted at rest</td>\n    </tr>\n    <tr>\n        <td><strong>Storage</strong></td>\n        <td>Your infrastructure</td>\n        <td>Unlimited up to 1 yr</td>\n    </tr>\n    <tr>\n        <td><strong>Regions</strong></td>\n        <td>Your infrastructure</td>\n        <td>Global, EU and Asia data centers</td>\n    </tr>\n    <tr>\n        <td><strong>Compliance</strong></td>\n        <td>Your infrastructure</td>\n        <td>GDPR, CCPA compliant***</td>\n    </tr>\n    <tr>\n        <td><strong>SLA</strong></td>\n        <td>No SLA</td>\n        <td>99.8% Uptime</td>\n    </tr>\n    <tr>\n        <td><strong>Support</strong></td>\n        <td>GitHub community</td>\n        <td>Support team via email, chat, and call-back\n            within 1 business day</td>\n    </tr>\n    <tr>\n        <th></th>\n        <th><a href=\"https://github.com/fingerprintjs/fingerprintjs/\" aria-label=\"\"><span>Get it on GitHub</span></a>\n        </th>\n        <th><a href=\"https://dashboard.fingerprintjs.com/signup/\"><span>Create Free Account</span></a></th>\n    </tr>\n</table>\n<div><small>\n* The Fingerprint Identification product leverages both the open source fingerprinting library as well as proprietary technology for increased accuracy and stability.\n  </small></div>\n  <div><small>\n** VisitorIDs, in comparison to fingerprints, include server side techniques, are deduplicated and utilize fuzzy matching to result in a more accurate and stable identifier. Fingerprint hashes rely on an exact match across all browser attrributes, making them unstable across > 2 week time intervals.\n  </small></div>\n\n    <div><small>\n*** Fingerprint the company is GDPR and CCPA compliant as the data processor. You still need to be compliant as the data controller and use the identification for fraud under legitimate interest or ask for user consent.\n        </small></div>"
}
[/block]

### Fingerprint's Identification product leverages both open-source + server-side techniques

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/21b9f07-Screen_Shot_2021-04-19_at_18.40.21.png",
        "Screen Shot 2021-04-19 at 18.40.21.png",
        1876
      ],
      "align": "center",
      "caption": "Overview of the different layers of the Fingerprint Identification product"
    }
  ]
}
[/block]

The main difference between the open source and the Identification product is that the open source version is only a JavaScript file that queries browser attributes and computes a hash from them \(performs fingerprinting\). In a situation with identical browsers, it will generate identical fingerprints. If two different users use the same browser \(same vendor and version\) on the same phone model, you will get two identical fingerprints and will not be able to tell these two users apart.

To solve this, the Fingerprint Identification product processes the identification data on the server. In addition to regular fingerprinting, it analyzes vast amounts of auxiliary data \(IP addresses, time of visit patterns, URL changes and more\) to be able to reliably deduplicate different users that have identical devices.

**Other differences between Fingerprint Identification and open source versions are explained below.**

### Security

**Open source:** generates the fingerprints directly in the browser, which makes it vulnerable to spoofing and reverse engineering.

**Pro:** processes all the information server-side and transmits it securely to you servers using server-to-server APIs. Information is never exposed in the browser, which makes it much harder to tamper with. All the information that is collected is never shared with 3rd parties. The security of your data is our priority.

### SLA

**Open source:** provides no SLA or availability guarantees.

**Pro:** supports enterprise options with  99.9% uptime and availability SLA.

### Support

**Open source:** only GitHub issues/questions with no response time guarantee.

**Pro:** provides guaranteed same business day response on paid plans.  
Enterprise support options are available [on request](mailto:sales@fingerprint.com).