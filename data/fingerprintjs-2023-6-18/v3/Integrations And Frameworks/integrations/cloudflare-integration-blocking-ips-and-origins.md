---
title: "Cloudflare Proxy Integration — Blocking Origins and IPs"
slug: "cloudflare-integration-blocking-ips-and-origins"
hidden: false
createdAt: "2023-03-06T11:09:24.167Z"
updatedAt: "2023-06-05T21:42:22.482Z"
---
Fingerprint allows you to [filter requests](https://dev.fingerprint.com/docs/request-filtering) to prevent bad actors from making identification requests using your  account. Filtered-out requests do not count toward your Fingerprint billing. However, if you use a Cloudflare integration, those requests can still be proxied through your Cloudflare worker, potentially increasing your Cloudflare costs. 

To prevent this, you can block specific IPs or origins at the Cloudflare worker level, using Cloudflare's Web Application Firewall. 

> 📘 Cloudflare Web Application Firewall
> 
> - WAF rules are available on paid Cloudflare plans, starting with [Pro](https://www.cloudflare.com/en-gb/plans/).
> - In this guide, we use the Cloudflare dashboard to manually create WAF rules. You can also create and modify WAF rules programmatically using the [Cloudflare API](https://api.cloudflare.com/#firewall-rules-create-firewall-rules).

## 1. Find URIs to be blocked

Your Fingerprint Cloudfare worker exposes two endpoints — one for downloading the JavaScript agent and one for retrieving identification results. Their paths are random strings compiled from variables provided during the integration setup. You can find these values in the worker's environment variables: 

1. Go to your Cloudflare account.
2. Using the left-hand menu, navigate to **Workers**  → **Overview** and select your Fingerprint Cloudflare worker.
3. On the worker page, switch to the **Settings** tab and select **Variables**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/af07439-Screenshot_2023-02-23_at_11.46.22_PM_1.png",
        "Screenshot 2023-02-23 at 11.46.22 PM (1).png",
        1206
      ],
      "align": "center",
      "caption": "In the worker's environment variables, you will see four variables with random string values."
    }
  ]
}
[/block]

The worker has two endpoints: 

- `/<WORKER_PATH>/<AGENT_SCRIPT_DOWLOAD_PATH>` for downloading the agent
- `/<WORKER_PATH>/<GET_RESULT_PATH>` for getting identification results

Replace placeholders in the endpoint patterns above with your worker's environment variables. Using the example in the screenshot, you get the following:

- agent download URI is `/icXhT6JSJ2MhAdk6/fJAWyfftg5eFq3v0`
- identification result URI is `/icXhT6JSJ2MhAdk6/Dq1xi7XG7TLS8nVo`

## 2. Create a firewall rule

Create a [custom rule](https://developers.cloudflare.com/waf/custom-rules/) in your Cloudflare WAF. 

1. Inside your Cloudflare dashboard, navigate to **Websites** → **Your website** → **Security** → **WAF** → **Custom rules**.
2. Click **Create rule**.
3. Enter a name for the rule.
4. Use the provided editor to define your rule or click **Edit expression** to define the rule using the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/) (examples below). 
5. Choose `Block` as the rule action.
6. Click **Deploy**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c25f18a-Screenshot_2023-02-23_at_11.52.43_PM.png",
        "Screenshot 2023-02-23 at 11.52.43 PM.png",
        2094
      ],
      "align": "center",
      "caption": "Creating a firewall rule"
    }
  ]
}
[/block]

### Block requests from specific IP addresses

For example, to block IPs `111.111.112.113`, `114.112.222.33`, and the entire  `211.12.82.0/24` subnet for worker routes `/icXhT6JSJ2MhAdk6/fJAWyfftg5eFq3v0` and `/icXhT6JSJ2MhAdk6/Dq1xi7XG7TLS8nVo` , use the following expression:

```
( 
  ip.src in {111.111.112.113, 114.112.222.33, 211.12.82.0/24} 
  and 
  (
    http.request.uri.path eq "/icXhT6JSJ2MhAdk6/fJAWyfftg5eFq3v0"
    or
    http.request.uri.path eq "/icXhT6JSJ2MhAdk6/Dq1xi7XG7TLS8nVo"
  )
)
```

### Block requests from a specific `origin` and `referer`

For example, to block requests from `example1.com` for the same worker routes, use the following expression: 

```
(
  (
    http.request.uri.path eq "/icXhT6JSJ2MhAdk6/fJAWyfftg5eFq3v0" 
    or 
    http.request.uri.path eq "/icXhT6JSJ2MhAdk6/Dq1xi7XG7TLS8nVo"
  )
  and
  (
    any(http.request.headers["origin"][*] == "https://example1.com")
    or
    any(http.request.headers["referer"][*] contains "https://example1.com/")
  )
)
```

You need to block requests by `referer` in addition to `origin` because some types of requests [do not include the `origin` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin#description).

See [Cloudflare documentation](https://developers.cloudflare.com/ruleset-engine/rules-language/) for more details.

### Cloudflare limitations

- Each rule’s expression can contain up to 4096 symbols.
- The number of rules depends on a [customer plan](https://developers.cloudflare.com/firewall/#availability).
- Regex support is available on Business and Enterprise plans.