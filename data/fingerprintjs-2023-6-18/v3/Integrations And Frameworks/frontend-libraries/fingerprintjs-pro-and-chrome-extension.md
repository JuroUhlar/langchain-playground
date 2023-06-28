---
title: "Google Chrome Extension"
slug: "fingerprintjs-pro-and-chrome-extension"
hidden: false
createdAt: "2022-05-18T11:40:22.841Z"
updatedAt: "2023-06-05T21:51:27.689Z"
---
### Using Fingerprint in Google Chrome Extensions

A typical use-case represents getting a valid [`visitorId`](https://dev.fingerprintjs.com/docs/quick-start-guide) among other result data via your extension. After validating it with the [Server API](https://dev.fingerprintjs.com/docs/server-api) or [webhooks](https://dev.fingerprintjs.com/docs/webhooks), data provided by Fingerprint might be crucial for your internal decision making, user scoring, and protecting sensitive actions for your business.

There are two general strategies to integrate Fingerprint into an extension. You can get Fingerprint `result` by opening your website temporarily in a new window. Another way demonstrates injecting the [FingerprintJS JavaScript agent](https://dev.fingerprintjs.com/docs/js-agent) into the website's iframe and performing fingerprinting there.

Both solutions are showcased in the [Chrome extension repository](https://github.com/fingerprintjs/fingerprintjs-pro-chrome-extension-example). The example extension is also available on the [Chrome Web Store](https://chrome.google.com/webstore/detail/fingerprintjs-example-bro/knppbjgkegnlbhddedbilnfmnkdocekn).

### New window strategy

With this approach, the Chrome extension creates a new window that points to an external website hosted by you. This website uses our Fingerprint agent to obtain the `result`. This data is then passed back to the extension using a [native communication channel](https://developer.chrome.com/docs/extensions/mv3/messaging/#external-webpage).

#### Sample use

1. Configure and serve a publicly available web page containing the Fingerprint JavaScript agent. It's recommended to use the [Custom subdomain](https://dev.fingerprintjs.com/docs/subdomain-integration). This website must be served over HTTPS. 

```javascript
// Script on your website

// Your chrome extension id
const extensionId = "your-chrome-extension-id";

// Initialize the agent
const fpPromise = import('https://fpjscdn.net/v3/your-public-api-key')
  .then(FingerprintJS => FingerprintJS.load({
    endpoint: 'https://fp.yourdomain.com' // Subdomain setup URL
  }));

fpPromise
  .then(fp => fp.get())
  .then(result => {
    // Pass the result back to the chrome extension
		// Note: this API is only available in chromium based browsers and only on pages served via HTTPS
	  chrome.runtime.sendMessage(extensionId, {
	    type: "fpjs-result",
	    data: result,
	  });
	});
```

2. In the extension's `manifest.json`,  add the `externally_connectable` manifest property. Make sure you've specified the `service_worker` property in the `background` section as well.

```javascript
// manifest.json of your chrome extension
{
...
"externally_connectable": {
	// URL to the external site that uses our Agent
  "matches": ["https://your-website.com/*"]
},
...
"background": {
  // Name of your background script file
  "service_worker": "background.js"
},
...
}
```

3. Add the following code snippet into your background script. It will allow you to obtain results from Fingerprint  inside your extension's codebase.

```javascript
let currentWindow;

async function closeCurrentWindow() {
  if (currentWindow?.id) {
    try {
      await chrome.windows.remove(currentWindow.id);
      currentWindow = undefined;
    } catch (error) {
      // Handle error
    }
  }
}

async function getFingerprint() {
  await closeCurrentWindow();

  currentWindow = await chrome.windows.create({
    url: 'your_website_url',
    type: 'popup',
    focused: false,
  });

  return new Promise(resolve => {
    const handleExternalMsg = async (externalMessage) => {
      if (externalMessage?.type === 'fpjs-result' && externalMessage?.data?.visitorId) {
        resolve(externalMessage.data);

        chrome.runtime.onMessageExternal.removeListener(handleExternalMsg);

        // Close created window after receving result
        await closeCurrentWindow();
      }
    };
   
    // Register listener for messages from our website
    chrome.runtime.onMessageExternal.addListener(handleExternalMsg);
  });
}

// Add a listener for messages from your extension requesting data from the JavaScript agent
chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    if (message.type === 'get-visitor-id') {
      getFingerprint().then(sendResponse);

      // Required for async operations, otherwise, chrome won't pass the result back to the sender
      return true;
    }
  },
);
```

4. Receive and use the `result` data in your extension's logic.

```javascript
export function getFingerprintJsResult() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        type: 'get-visitor-id',
      },
      message => {
        if (message?.visitorId) {
          resolve(message);
        } else {
          reject(new Error('Failed to get visitor data'));
        }
      },
    );
  });
}

getFingerprintJsResult().then(result => {
 // Use result
});
```

### Iframe strategy

With this strategy, the extension appends an iframe into the DOM with the URL of the external website and communicates with it using [Window.postMessage() API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). 

Alternatively, you can append the iframe into the DOM served on the extension page (e.g. in the popup). There are several benefits of not using a content script:

- Other extensions don't have access to the iframe content (e.g. adblockers).
- There are no required special permissions in the `manifest.json`.
- Several anti-fingerprinting techniques and tracking protections can't identify and block this approach.

#### Sample use

1. Configure and serve a publicly available web page containing the Fingerprint JavaScript agent. It's recommended to use the [Custom subdomain](https://dev.fingerprintjs.com/docs/subdomain-integration). The website must be served over HTTPS. 

```javascript
// Script on your website

// Check if we are in iframe
if (window.parent !== window) {
  // Initialize the agent
  const fpPromise = import('https://fpjscdn.net/v3/your-public-api-key')
    .then(FingerprintJS => FingerprintJS.load({
      endpoint: 'https://fp.yourdomain.com' // Subdomain setup URL
    }));

  fpPromise
    .then(fp => fp.get())
    .then(result => {
      // Send the result to parent window
      window.parent.postMessage({
        type: 'fpjs-result',
        data: result,
      }, '*');
    });
}
```

2. Add the following code to your extension where you need to get `result` data.

> 📘 DOM API and background scripts
> 
> With this approach, your extension needs access to the DOM API, therefore, according to the [Manifest v3 limitations](https://developer.chrome.com/docs/extensions/mv3/intro/), it's not possible to use the following snippet in the background script.

```javascript
export function getFingerprintJsResult(container) {
  const iframe = document.createElement('iframe');

  // Apply styles to the iframe
  iframe.style.width = '100%';
  iframe.style.height = '200px';
  iframe.style.border = 'none';

  iframe.src = 'your_website_url';

  return new Promise(resolve => {
    const handler = (event) => {
      const eventData = event.data;

      if (eventData?.type === 'fpjs-result' && eventData?.data?.visitorId) {
        window.removeEventListener('message', handler);
        iframe.remove();
        resolve(eventData.data.visitorId);
      }
    };
    
    // Listen for messages from iframe
    window.addEventListener('message', handler);
    container.appendChild(iframe);
  });
}

const container = document.querySelector('.main');

getFingerprintJsResult(container).then(result => {
 // Use result
});
```

### Documentation

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-chrome-extension-example).