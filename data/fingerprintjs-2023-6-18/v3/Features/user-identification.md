---
title: "User identification & fraud detection"
slug: "user-identification"
hidden: false
metadata: 
  title: "User identification for fraud detection | FingerprintJS Pro Docs"
  description: "Using fingerprinting technology, every site visitor receives a permanent visitor ID. This ID can be queried through our server API to detect suspicious activity"
  image: 
    0: "https://files.readme.io/1c903bb-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-10-08T22:59:28.175Z"
updatedAt: "2023-06-05T21:29:01.911Z"
---
Fingerprint is a platform that identifies devices or browsers, performs the analysis of your visitors, and provides a server-side API to query that information. The goal of the Fingerprint platform is to provide businesses with a reliable and trustworthy service to identify website visitors or mobile device users.  

Every visitor to your website is assigned a permanent `visitorId` identifier. This identifier acts as a `user_ID` that you can use in your system (but considering the 99.5% accuracy). The `visitorId` value is calculated with latest fingerprinting technology and machine learning algorithms to identify when people are trying to change their identity via proxies or other techniques.  

Once you have obtained a `visitorId` value, you can use it to perform fraud detection. Query visitor information using our [Server API](doc:server-api),  inspect visit history to get an idea if current activity is fraudulent or poses a threat to your website. It also can be used to get the geolocation \(based on IP\) and other types of useful information.

A high-performance fraud detection use case can be implemented as follows:

1. Identify every visitor using the Fingerprint identification API.
2. Configure webhooks to receive secure server-side events.
3. Whenever a specific visitor is known to do any fraudulent activity, record that fact inside the visitor `tag` (which acts as a visitor metadata).
4. In your webhook handler, read event tags and if you see fraudulent tags, send a notification email to be notified about this user visiting your website again.