---
title: "Content Security Policy (CSP)"
slug: "js-agent-csp"
hidden: false
createdAt: "2021-10-12T08:23:47.928Z"
updatedAt: "2023-05-02T11:28:18.383Z"
---
If you have a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) on your website, it can block the JS agent. JS agent will throw a special error in this case:

```javascript
const fpPromise = FingerprintJS.load({ apiKey: '<<browserToken>>' })

try {
  const fp = await fpPromise
  await fp.get()
} catch (error) {
  if (error.message === FingerprintJS.ERROR_CSP_BLOCK) {
    // Your CSP blocks the JS agent
    // Can be thrown by both `load` and `get`
  }
}
```



Add the following directives to your policy to unblock the JS agent:

```text CDN installation
script-src https://fpjscdn.net;
connect-src https://*.fptls.com https://*.fptls3.com https://api.fpjs.io https://*.api.fpjs.io;
```
```text NPM installation
script-src https://fpnpmcdn.net;
connect-src https://*.fptls.com https://*.fptls3.com https://api.fpjs.io https://*.api.fpjs.io;
```



If you already have such directives in your policy, add the given addresses to the directives. An example of combining a couple of policies:

```text Current policy
default-src 'self';
connect-src 'self' example.com;
style-src 'self' 'unsafe-inline';
```
```text JS agent policy
connect-src https://*.fptls.com https://*.fptls3.com https://api.fpjs.io https://*.api.fpjs.io;
```
```text Combined policy
default-src 'self';
connect-src 'self' example.com https://*.fptls.com https://*.fptls3.com https://api.fpjs.io https://*.api.fpjs.io;
style-src 'self' 'unsafe-inline';
```



An example of an HTML code with a Content Security Policy that lets JS agent work:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Security-Policy" content="
      default-src 'self';
      script-src 'self' https://fpjscdn.net;
      connect-src 'self' https://*.fptls.com https://*.fptls3.com https://api.fpjs.io https://*.api.fpjs.io;
    ">
  </head>
  ...
</html>
```



## Automatic updates

The default endpoints used by JS agent may change with automatic updates. JS agent uses fallback endpoints to evade ad blockers that block JS agent. The fallback endpoints are changed when they get to ad blocker lists. So you should check this guide from time to time for up-to-date CSP recommendations to ensure your CSP doesn't block the fallback endpoints.

The primary endpoint (`https://api.fpjs.io` or `https://*.api.fpjs.io`) and the primary TLS endpoint (`https://*.fptls.com`) are never changed automatically to prevent JS agent from being blocked by your CSP.

## Subdomain setup

If you've set up JS agent to use [a custom endpoint](doc:subdomain-integration), add the endpoint to the policy instead of the built-in endpoint. For example, if your custom endpoint is `https://fp.yourdomain.com`, your policy is:

```text
script-src https://fpjscdn.net;
connect-src https://*.fptls.com https://*.fptls3.com https://fp.yourdomain.com;
```



If you use [a custom `tlsEndpoint`](doc:js-agent#tlsendpoint), add the endpoint to the policy instead of the built-in endpoint. For example, if your custom endpoint is `https://tls.yourdomain.com`, your policy is:

```text
script-src https://fpjscdn.net;
connect-src https://tls.yourdomain.com https://api.fpjs.io https://*.api.fpjs.io;
```