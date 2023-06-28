---
title: "Understanding your confidence score"
slug: "understanding-your-confidence-score"
hidden: false
createdAt: "2021-09-30T06:04:40.563Z"
updatedAt: "2023-06-05T23:06:56.560Z"
---
Fingerprint performs browser identification, which is by nature probability-based. The confidence score reflects the system's degree of certainty that the visitor identifier is correct.

**The confidence score is a floating-point number between `0` and `1` that represents the probability of accurate identification.**

The closer this number is to `1`, the more sure we are that the `visitorID` is correct. The closer it is to `0`, the more uncertainty we have about the identification results.

### How it works

The confidence score is a statistical estimation of how often we were correct in cases similar to the one in question. For instance, a confidence score of `0.97` means that 97% of similar requests were identified correctly. New Fingerprint users do not undergo any calibration or stabilization period and will receive an accurate confidence score immediately.

### Fingerprint Identification vs. Open Source

Both the Fingerprint Identification and open source agent work by collecting multiple device/browser signals to create a unique device fingerprint. In the case of Fingerprint, the agent sends the signals to the API for backend processing; in response, the API returns the `visitorID` along with the confidence score (i.e., the probability of the identification being accurate). In contrast, the open source agent calculates the confidence score based on the current browser name. Since this happens strictly on the client side, results are less accurate than with the Fingerprint Identification version.

### Use Cases

A common use case of the confidence score is for setting thresholds — for example, if the result is below a certain threshold, 2FA may be invoked for the visitor in question. Alternatively, a captcha or additional challenge can be presented to the visitor in this case.

### Confidence score vs Accuracy

Confidence score and accuracy are different metrics. Accuracy is the overall number that measures how accurate Fingerprint Identification is in identifying anonymous traffic. Fingerprint Identification accuracy is 99.5%.  
A confidence score is an individual number that is associated with each identification API call. It can be 100% or can be 99% depending on a specific end-user situation.