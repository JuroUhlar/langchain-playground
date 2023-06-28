---
title: "Preloading the JavaScript agent"
slug: "js-agent-preloading"
hidden: false
createdAt: "2021-03-25T10:00:08.900Z"
updatedAt: "2023-06-05T21:18:21.970Z"
---
Identifying visitors on your website requires loading the Fingerprint JavaScript agent and requesting the visitor identifier. By separating these requests and timing them right, you can make visitor identification both faster and more cost-effective.

## Preloading the JavaScript agent

Generally, we recommend initialising the JS agent (by calling `FingerprintJS.load(...)`) as soon as possible, and requesting the visitor identifier (by calling `fp.get()`) only when you need it. A good moment to load the JS agent is when your application starts.

An example of a browser application improvement:

```diff JavaScript
// An instance is created when the page starts
  class MyApp {
    constructor() {
+     this.fpPromise = FingerprintJS.load({ token: '<<browserToken>>' }) 

      const button = document.querySelector('#button')
      button.addEventListener('click', this.handleClick)
    }
  
    handleClick = async () => {
-     const fp = await FingerprintJS.load({ token: '<<browserToken>>' })
+     const fp = await this.fpPromise
      const result = await fp.get()
      alert(`Your id: ${result.visitorId}`)
    }
  }
```

This decreases the time of getting the `visitorId` because the JS agent is already loaded and the browser signals are collected before the user clicks the button. 

> 👍 Loading the JavaScript agent is free
> 
> Don't worry, the agent load request [is not billed](https://dev.fingerprint.com/docs/pricing#api-request-as-a-billing-unit), only the identification `get` request counts towards your monthly plan.

## Pre-requesting the visitor identifier

You can decrease the time of getting the visitor identifier even more. You can call `fp.get()` a small time before you need the identifier. For example, when the visitor fills all the form fields or moves the cursor above the submit button. Getting the visitor identifier will be in progress or complete when you need it. For example:

```diff JavaScript
class MyApp {
    constructor() {
      this.fpPromise = FingerprintJS.load({ token: '<<browserToken>>' }) 

      const button = document.querySelector('#button')
+     button.addEventListener('mouseover', this.handleAboutToClick, { once: true })
      button.addEventListener('click', this.handleClick)
    }

+   handleAboutToClick = () => {
+     this.fpResultPromise = this.fpPromise.then(fp => fp.get())
+   }
  
    handleClick = async () => {
-     const fp = await this.fpPromise
-     const result = await fp.get()
+     const result = await this.fpResultPromise
      alert(`Your id: ${result.visitorId}`)
    }
  }
```