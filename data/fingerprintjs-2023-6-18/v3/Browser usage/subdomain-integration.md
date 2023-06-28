---
title: "Custom subdomain setup"
slug: "subdomain-integration"
hidden: false
metadata: 
  title: "Custom subdomain setup  | FingerprintJS Pro Docs"
  description: "To get the most out of FingerprintJS Pro, hosts should set up custom subdomains. Follow these steps to get an SSL certificate and enable your subdomain."
  image: 
    0: "https://files.readme.io/57ba262-fingerprintjs-documentation.png"
    1: "fingerprintjs-documentation.png"
    2: 2000
    3: 878
    4: "#faf9fa"
createdAt: "2020-10-16T15:24:13.262Z"
updatedAt: "2023-06-16T15:49:56.099Z"
---
Using a custom subdomain is required for correct identification while using Fingerprint. 

## The benefits of using a custom subdomain

- Significant increase in accuracy in browsers with strict privacy features such as Safari or Firefox.
- Cookies are now recognized as “first-party.” This means they can live longer in the browser and extend the lifetime of visitorIds.
- Ad blockers will not block our JS Agent from sending identification API requests to our server. Sending data to an external URL will be stopped by most ad blockers while sending data to a an internal URL (like a subdomain) is allowed.
- Fingerprint becomes harder to detect. Requests made directly to our website domain can be easily detected. By routing through a subdomain on your domain, Fingerprint becomes harder for automated blockers and fraudsters to detect.

> 📘 Limitations of the subdomain integration
> 
> - Even though setting a custom subdomain will help you with making the API requests in the browser, ad blockers and some browsers may still block our CDN and prevent the JS agent from being downloaded to the web page. To work around that, you can use a proxy integration like [Cloudflare](doc:cloudflare-integration-new-accounts) or [Cloudfront](doc:cloudfront-proxy-integration).
> - To obtain a [TLS fingerprint](https://fingerprint.com/blog/what-is-tls-fingerprinting-transport-layer-security/) of the browser, Fingerprint Identification also makes a separate request to our TLS endpoint. Due to technical limitations, this request is also not protected by the custom subdomain and can be blocked by ad blockers. While the TLS data is useful, Fingerprint can still generate an accurate visitor identifier without it. A custom TLS endpoint domain is available for enterprise plans, contact [our support](https://fingerprint.com/support/) for more details.

> 📘 A note on DNS setup:
> 
> This process requires adding DNS records to your site. Please make sure you have access to your DNS through your DNS provider. Here are some guides to accessing your DNS with some of the most popular hosting sites:
> 
> - Cloudflare: <https://support.cloudflare.com/hc/en-us/articles/360019093151-Managing-DNS-records-in-Cloudflare>
> - Route53: <https://aws.amazon.com/premiumsupport/knowledge-center/route-53-create-alias-records/>
> - GoDaddy: <https://www.godaddy.com/help/add-a-cname-record-19236>
> - Netlify: <https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/>
> - Dreamhost: <https://help.dreamhost.com/hc/en-us/articles/360035516812-Adding-custom-DNS-records>
> - Bluehost: <https://my.bluehost.com/hosting/help/resource/714>

### 1. Register your custom subdomains

In order to use a custom subdomain, we need to ensure the connection between your site and our server is secure. To do this, we register all subdomains with SSL certificates. For each application, we provide one free SSL certificate which can hold up to 50 unique subdomains. If you would like to purchase additional SSL certificates, please let us know by messaging [our support team](https://fingerprint.com/support/).

You can begin the setup process by navigating to **App Settings** -> **Subdomain** and clicking **Add Certificate**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/bdcea88-add-certificate.png",
        "add-certificate.png",
        2994
      ],
      "align": "center",
      "caption": "Screenshot of the Custom Subdomain setup in the Fingerprint dashboard"
    }
  ]
}
[/block]

Next, you will be able to add all of the subdomains you require. For most purposes, one subdomain is all you need.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0a9350f-domain-name.png",
        "domain-name.png",
        2984
      ],
      "align": "center",
      "caption": "Screenshot of the SSL Certificate Creation in the Fingerprint dashboard"
    }
  ]
}
[/block]

When entering a subdomain, remember these guidelines:

- The subdomain should **ONLY** be used for sending requests to our servers.
- The subdomain’s primary domain should be the same as the request origin (e.g.: “metrics.yourwebsite.com” where “yourwebsite.com” is the website where you want to set up FingerprintJS). 
- Do not use “fingerprintjs.yourwebsite.com” or “fingerprint.yourwebsite.com” as your subdomain. Instead, use a subdomain like “fp.yourwebsite.com” or “metrics.yourwebsite.com”. This will make it harder for ad blockers to detect and disable the package from loading.

After you have entered your subdomains, click the submit button to go to the next step.

### 2. Add CNAME records to verify domain ownership

In order for Fingerprint to issue a certificate, you need to confirm that you are the subdomain owner by adding a special validating DNS record.

After clicking submit, we provide a CNAME record for each subdomain. When the record is added to your DNS, it will verify your ownership of the domain and allow the certificate to be issued. Below you can see what our instructions would look like for the example subdomain “metrics.yourwebsite.com”.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0f9f25f-cname-records.png",
        "cname-records.png",
        2986
      ],
      "align": "center",
      "caption": "Screenshot of CNAME records in the Fingerprint dashboard"
    }
  ]
}
[/block]

**At this point, you will need to add all the records seen on this page to your website’s DNS**. Please allow up to 24 hours for your CNAME records to be validated once they have been added.

You can check the status of your SSL certificate by returning to the customer dashboard. SSL certificates can have one of three statuses:

- **Waiting Validation**: At least one of the CNAME records is still “pending”. This can happen if the records haven’t been added yet or if the records were added incorrectly.

  To ensure the records are added correctly, you can run this command in the terminal using the host value of the CNAME record: `dig <host> +short`

  If the record was added correctly, the CNAME value will be returned.
- **Invalid**: The records have been found, but the certificate cannot be issued. This status occurs when there is a conflicting CAA record registered to the domain that is not allowing our SSL provider (AWS) to issue certificates.

  Fix this status by first adding the following CAA record to your DNS (replace \<metrics.yourwebsite.com> with your subdomain): `<metrics.yourwebsite.com>. CAA 0 issue "amazon.com"`

  Once the CAA record propagates, return to the Fingerprint Dashboard, delete the `Invalid` certificate, and repeat [step 1](https://dev.fingerprint.com/docs/subdomain-integration#1-register-your-custom-subdomains).
- **Issued**: The CNAME was added correctly and the certificate has been issued. When your certificate is issued you will receive an email prompting you to return to the dashboard to complete your subdomain setup.

> 📘 Note:
> 
> Using Cloudflare as your DNS provider?  
> 
> 1. Make sure to disable DNS Proxying for all records associated with your subdomain. 
> 2. Be aware that Cloudflare sometimes adds CAA records that are not visible in the DNS panel. To see these records, you can run the command below (just replace \<yourwebsite.com> with your domain): 
> 
> `$ dig caa <yourwebsite.com>`

### 3. Add A records for each subdomain

Once your certificate has been issued, an email will be sent with a link that will bring you to the next step of the setup.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8d18130-subdomain-step3.png",
        "subdomain-step3.png",
        2988
      ],
      "align": "center",
      "caption": "Screenshot of a completed SSL certificate creation process"
    }
  ]
}
[/block]

**Please navigate again to your DNS provider and enter the A records provided in the customer dashboard.**

Each subdomain has two corresponding A records. While only one is necessary to make the connection, we recommend adding both records to ensure coverage if one is temporarily unavailable. 

> 📘 Note:
> 
> Some DNS providers (like Route 53) allow you to add one record with two IP address values, while others will only allow one A record per IP address.

### 4. Adding the “endpoint” property to the JS Agent

Once the A records have been added, the JS Agent configuration needs to be updated with the “endpoint” property:

```html CDN
<script>
  // Initialize the agent at application startup.
  const fpPromise = import('https://fpjscdn.net/v3/<<browserToken>>')
    .then(FingerprintJS => FingerprintJS.load({
      endpoint: 'https://metrics.yourwebsite.com'
    }));

  // When you need the visitor identifier:
  fpPromise
    .then(fp => fp.get())
    .then(result => console.log(result.visitorId));
</script>
```
```javascript NPM
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

const fpPromise = FingerprintJS.load({
  apiKey: '<<browserToken>>',
  endpoint: 'https://fp.yourdomain.com'
})

// When you need the visitor identifier:
fpPromise
  .then(fp => fp.get())
  .then(result => console.log(result.visitorId))
```

This code snippet is also available on the final page of the subdomain setup (beneath the A records) and will include your custom subdomain for easy access. 

> 📘 Note:
> 
> The endpoint subdomain should match the domain of the website

> 📘 Note:
> 
> If you use a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) on your website, don't forget to add the custom subdomain to the `connect-src` directive of your policy. See [the CSP guide](doc:js-agent-csp) for more details.

## SSL Certificate pricing

With each application, we provide one free SSL certificate which can hold up to 50 unique subdomains. If you would like to purchase additional SSL certificates, please let us know by messaging [our support team](https://fingerprint.com/support/).