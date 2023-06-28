---
title: "Request filtering"
slug: "request-filtering"
hidden: false
metadata: 
  title: "Using request filtering rules | FingerprintJS Pro Docs"
  description: "Filter out unwanted identification requests or blacklist and whitelist application token origins using custom request filtering rules."
  image: 
    0: "https://files.readme.io/908cfbb-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-12-15T11:21:09.370Z"
updatedAt: "2023-03-17T16:20:14.706Z"
---
You can filter out unwanted visitor identifications using the request filtering rules.
[block:callout]
{
  "type": "info",
  "body": "Billable identification requests are performed each time your application invokes the `FingerprintJS.get()` method of the JS agent.",
  "title": ""
}
[/block]
# Origin filtering

You can either whitelist or blacklist websites that use your application API Key. To do this, navigate to the **App settings** -> **Request Filtering** section of the dashboard and click **Configure**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7c3001c-request_filtering.png",
        "request_filtering.png",
        2984,
        1624,
        "#000000"
      ],
      "caption": "Screenshot of how to configure request filtering in the FingerprintJS dashboard"
    }
  ]
}
[/block]
## Origin blacklisting

Blacklisting is best used for FingerprintJS clients that need to allow a large number of origins to use their API key. Origins that are suspected of API key-stealing can be blacklisted, preventing that select list from running up your bill.

1 - Click the **Configure** button to open the configuration panel.
2 - Select **Allow all websites besides exceptions** as default behavior.
3 - Fill the **Exceptions** field with the list of blacklisted origins.
[block:callout]
{
  "type": "info",
  "body": "A website origin is defined by the scheme and the domain name of the URL used to access it.\nYou can use the wildcard character (*) as a subdomain name."
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0e9f465-Allow_Sites_Except.png",
        "Allow Sites Except.png",
        747,
        503,
        "#f7ebe7"
      ],
      "caption": "Screenshot of the form required to set up origin filtering"
    }
  ]
}
[/block]
## Origin whitelisting

Whitelisting is best used for Fingerprint clients who only want a select few origins to use their API key. Whitelisting prevents API key-stealing by only allowing the select origins API key access. 

1 - Click the **Configure** button to open the configuration panel.
2 - Select **Forbid all websites besides exceptions** as default behavior.
3 - Fill the **Exceptions** field with the list of whitelisted origins.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/dc46daf-Forbid_Sites_Except.png",
        "Forbid Sites Except.png",
        747,
        506,
        "#f6ebe7"
      ],
      "caption": "Screenshot of the form required to set up origin whitelisting"
    }
  ]
}
[/block]
# HTTP header filtering

In some cases it is useful to filter out identification requests by HTTP headers. Identifications that you might want to filter out include server-side rendering applications, crawlers, search indexing bots, or website availability monitors.
[block:callout]
{
  "type": "success",
  "body": "Fingerprint ignores some popular bots such as Googlebot, Bingbot, DuckDuckBot, and others by default and does not bill for those requests."
}
[/block]
To create a new header rule, go into the **Request Filtering** section of the dashboard and click on the **Add Rule** button to the right of the Forbidden HTTP Headers section title.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3a4b721-Screenshot_2020-12-15_at_20.01.44.png",
        "Screenshot 2020-12-15 at 20.01.44.png",
        2030,
        376,
        "#f7f6f7"
      ],
      "caption": "Screenshot of where to configure forbidden HTTP headers in the Fingerprint dashboard"
    }
  ]
}
[/block]
A header rule is determined by the **Header** name, **Match Rule**, and **Value**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2efde32-Create_HTTP_Header_Rule.png",
        "Create HTTP Header Rule.png",
        748,
        625,
        "#f8eeeb"
      ],
      "caption": "Screenshot of the form required to create an HTTP header rule"
    }
  ]
}
[/block]
Keep in mind that the regular expression (regex) match rule is defined by [RE2](https://github.com/google/re2) notation.

Consider using the Regex101.com tool to obtain regular expression match rule strings:
1 - Open this [link](https://regex101.com/).
2 - Select the **Golang Flavor** option on the left panel.
3 - Debug the regular expression to suit your needs.
4 - Copy the **regular expression string** and paste it into the **value** field as-is.

# Update policy and rule priority

It can take up to 5 minutes to start filtering incoming requests after creating or editing a website or header rule.

Origins rules are checked first and HTTP header rules are checked second.