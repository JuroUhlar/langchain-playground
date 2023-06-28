---
title: "Azure Proxy Integration"
slug: "azure-proxy-integration"
hidden: false
createdAt: "2023-04-26T11:06:38.631Z"
updatedAt: "2023-06-14T11:31:21.306Z"
---
Fingerprint Azure Proxy Integration is responsible for proxying identification and agent-download requests between your website and Fingerprint through your Azure infrastructure.

Your website does not need to use Azure or Front Door to use this integration, it can run anywhere. 

This guide explains the benefits and components of the Azure proxy integration and shows how to set it up step-by-step. It assumes a basic familiarity with Azure. 

![](https://files.readme.io/41125c4-image.png)

The integration consists of several components:

- Your website, which may be running on Azure Front Door but doesn’t have to.
- [Azure functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview)
  - `fingerprintjs-pro-azure-function` — responsible for proxying requests to our CDN and API.
  - `fingerprintjs-pro-azure-function-management` — updates the main integration function. 
- Usually, a [Front Door distribution](https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview) which delivers the functions through Microsoft’s content delivery network:
  - If your website is already running on Front Door, you can use the same distribution for the proxy integration.
  - If your website is not running on Front Door, you can create a new Front Door distribution just for the proxy integration (see [Step 5](#step-5-configure-front-door-to-deliver-the-proxy-function)).
  - Alternatively, if your website is running on [Azure Web Apps](https://learn.microsoft.com/en-us/azure/app-service/overview) you configure Fingerprint using [App Service](https://learn.microsoft.com/en-us/azure/application-gateway/configure-web-app?tabs=customdomain%2Cazure-portal).
- [Azure storage](https://learn.microsoft.com/en-us/azure/storage/common/storage-introduction) account stores the functions’ source code. The source code is uploaded to storage during [deployment ](https://github.com/fingerprintjs/fingerprint-pro-azure-integration/blob/main/azuredeploy.json) and then kept up to date by the management Azure function.
- [Application Insights](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview?tabs=net) monitors your Azure function
- [App Service Plan](https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans) defines the operating system, the number and size of virtual machine instances, and the pricing tier used by the functions.

The proxy integration source code is 100% open-source and [available on GitHub](https://github.com/fingerprintjs/fingerprint-pro-azure-integration).

## The benefits of using the Azure Integration

- Significant increase in accuracy in browsers with strict privacy features such as Safari or Firefox.
- Cookies are now recognized as “first-party.” This means they can live longer in the browser and extend the lifetime of visitor information.
- Ad blockers will not block the Fingerprint JS agent from loading or performing identification requests. Ad-blockers can block requests to Fingerprint domains but will allow requests to your own domain or subdomain.
- Insight and control over the identification requests in your own infrastructure.
- With the Azure Integration, you can manage an unlimited number of subdomains or paths and provide Fingerprint services to all your customers at any scale while benefiting from all the 1st-party integration improvements.
- Cookie security: Azure integration drops all the cookies sent from the origin website. The Azure function code is open-source so this behavior can be transparently verified and audited.
- Easy to meet compliance and auditing requirements.

## Prerequisites

- An Azure account.
- If you have an existing Front Door distribution that serves the web app's content you can use it to also serve the proxy function. Otherwise, you will create a new Front Door distribution that is configured to serve the proxy function on a subdomain of your website. Both scenerios are covered in [Step 5](#step-5-configure-front-door-to-deliver-the-proxy-function).

> Using Front Door to serve the proxy function is optional but recommended to ensure fast API responses for visitors throughout the globe.

## Integration setup overview

The integration setup consists of several manual and automatic steps. Each of the following steps is discussed in detail in a separate section below.

1. Issue a _Proxy Pre-Shared Secret_ in the Fingerprint dashboard.
2. Create path variables used by the Azure configuration and JS agent configuration on your website. 
3. Deploy the Azure function and other related resources using our deployment template.
4. Verify the Azure function deployment.
5. Configure your Front Door distribution to deliver the proxy Azure function.
6. Configure the Fingerprint JS Agent on your website. 

If you run into trouble implementing the integration, you can [contact our support](mailto:support@fingerprint.com) for assistance.

## Step 1. Issue a proxy pre-shared secret

You need to issue a _Proxy Pre-Shared Secret_ to authenticate requests to Fingerprint API from your Azure function.

1. Go to the Fingerprint [dashboard](https://dashboard.fingerprint.com/) and select your application.
2. In the left-side menu, click **App settings** and switch to **API keys**.
3. Click **Create key** and select **Proxy Pre-Shared Secret\***.\*
4. Click **Create**.

You will later use this value in the `FPJS_PRE_SHARED_SECRET` variable.

## Step 2. Create path variables

You need to set the path variables you will use throughout your Azure configuration (Steps 3,4,5) and the JS agent configuration on your website ([Step 6](#step-6-configure-the-fingerprint-pro-javascript-agent-on-your-website)). These values are arbitrary. Just decide what your values are and write them down somewhere. 

In this guide, we will use readable values corresponding to the variable names just to keep things easier to follow:  

```
FPJS_ROUTE_PREFIX="FPJS_ROUTE_PREFIX"
FPJS_AGENT_DOWNLOAD_PATH="FPJS_AGENT_DOWNLOAD_PATH"
FPJS_GET_RESULT_PATH="FPJS_GET_RESULT_PATH"
```

However, your values used in production should look more like random strings: 

```
FPJS_ROUTE_PREFIX="ore54guier"
FPJS_AGENT_DOWNLOAD_PATH="vbcnkxb654"
FPJS_GET_RESULT_PATH="5yt489hgfj"
```

That is because some adblockers might automatically block requests from any URL containing fingerprint-related terms like "fingerprint", "fpjs", "track", etc. Random strings are the safest. So whenever you see a value like `FPJS_ROUTE_PREFIX` in this guide, you should use your own random value instead.

## Step 3. Deploy the Azure function

You can use a [deployment template](https://github.com/fingerprintjs/fingerprint-pro-azure-integration/blob/main/azuredeploy.json) to deploy the Azure function automatically using the Resource Manager.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8ced676-image.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "500px"
    }
  ]
}
[/block]

1. [Click here to open the template deployment dialog.](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Ffingerprintjs%2Ffingerprint-pro-azure-integration%2Fmain%2Fazuredeploy.json)
2. Select your Azure **Subscription**.
3. Select or create a **Resource group** (we suggest using a separate resource group for the integration).
4. Specify **Region** and **Location**.
5. Set **Function App Name,** for example, `fingerprint-pro-azure-integration-app`. The final function name will have the resource group ID at the end of it, for example, `fingerprint-pro-azure-integration-appi4fghxf32z36q`.
6. The following values were generated in [Step 2](#step-2-create-path-variables).
   1. Set **Route Prefix** to your chosen value of `FPJS_ROUTE_PREFIX`.
   2. Set **Agent Download Path** to your chosen value of `FPJS_AGENT_DOWNLOAD_PATH`.
   3. Set **Get Result Path** to your chosen value of `FPJS_GET_RESULT_PATH`.
7. Set **Pre Shared Secret** to the value of `FPJS_PRE_SHARED_SECRET` generated in Step 1.
8. Click **Review + Create** to validate the function.
9. Click **Create** to deploy the function.

> 📘 Other deployment options
> 
> The function code is available on [GitHub](https://github.com/fingerprintjs/fingerprint-pro-azure-integration) so you can build the function locally and use [Azure Function Core Tools](https://github.com/Azure/azure-functions-core-tools) to publish it on your Azure infrastructure. See the official [Azure guide here](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Clinux%2Ccsharp%2Cportal%2Cbash#publish).
> 
> Also, you can automate the deployment by using the [deployment template](https://github.com/fingerprintjs/fingerprint-pro-azure-integration/blob/develop/azuredeploy.json) in infrastructure-as-code tools like [Terraform](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/template_deployment).

## Step 4. Verify your deployment

Once deployed, you can use the function in your web resources.

![](https://files.readme.io/6338e8e-image.png)

1. Click **Go to resource group** to open a resource group with Fingerprint resources.

![](<>)

1. ![](https://files.readme.io/4f98a16-small-azure-integration-step4.png)

2. In the resources list, use the **Type** column to find your  **Function App**. Its name will match the name given in [Step 3](#step-3-deploy-the-azure-function). Click on it.

3. Inside the function app page, click **Functions** in the left-side menu.

   The functions list has two functions:

   - `fingerprintjs-pro-azure-function` — the main integration function responsible for proxying requests from your website to our CDN and API.
   - `fingerprintjs-pro-azure-function-management` — responsible for updating the main integration function. By default it uses [timer](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?pivots=programming-language-javascript&tabs=python-v2%2Cin-process) trigger to check for new releases every 30 minutes.

   Note: Azure Functions are set to a timeout of 10 minutes, which is necessary for the management function to perform updates correctly with each new release.

   Click **fingerprints-pro-azure-function** to open the function.

   ![](https://files.readme.io/304b71d-image.png)

4. Inside the function page, click **Get Function Url** and copy the `default (function key)` URL. It will look like this: `https://fingerprint-pro-azure-integration-appi4fghxf32z36q.azurewebsites.net/{*restOfPath}`.

5. Build the function’s status page URL by replacing [`{*restOfPath}`](https://fingerprint-pro-azure-integration-appi4fghxf32z36q.azurewebsites.net/fpjs/%7B*restOfPath%7D) with `FPJS_ROUTE_PREFIX/status`.  
   For example `https://fp-pro-integration-appi4fghxf32z36q.azurewebsites.net/FPJS_ROUTE_PREFIX/status`.

6. Open the status page in your browser. If your function is running and the pre-shared secret and path variables are configured, it will say: “_All environment variables are set_".

## Step 5. Configure Front Door to deliver the proxy function

There are multiple ways how to access the proxy Azure function from your website. To get the first-party accuracy benefits of the integration, you need to access the proxy function through your website’s domain or subdomain.

You could add CNAME (alias) record to your website’s DNS records to create a subdomain pointing directly to the proxy function (and also [configure the relevant Azure Function settings](https://learn.microsoft.com/en-us/azure/dns/dns-custom-domain#azure-function-app)). However, visitors outside the proxy function’s region would experience high latency.

To ensure fast API responses for all visitors, we recommend using a CDN service like Azure Front Door. Front Door replicates the Azure function to data centers across the globe and delivers it to visitors based on their geographic location. 

- If your website is already running on Front Door, you can use the same distribution and domain for the proxy integration → Follow only [Step 5.2](#step-52-add-a-route-to-front-door).
- If your website is not running on Front Door, you can create a new Front Door distribution and website subdomain just for the proxy integration → Follow steps 5.1, 5.2, and 5.3.

> 📘 Other deployment options
> 
> If your website is running on [Azure Web Apps](https://learn.microsoft.com/en-us/azure/app-service/overview) you can configure Fingerprint using [App Service](https://learn.microsoft.com/en-us/azure/application-gateway/configure-web-app?tabs=customdomain%2Cazure-portal). This scenario is not covered in this guide, please follow the [Azure App Service documentation](https://learn.microsoft.com/en-us/azure/application-gateway/configure-web-app?tabs=customdomain%2Cazure-portal) for more details.
> 
> Using Azure CDN instead of Front Door is also possible but not covered in this guide, please follow the [Azure CDN documentation](https://learn.microsoft.com/en-us/azure/cdn/cdn-add-to-web-app?toc=%2Fazure%2Ffrontdoor%2FTOC.json) for more details.

### Step 5.1 Create a FrontDoor distribution

If your website is already behind Front Door, you can skip this step. 

1. Go to the **Front Door and CDN profiles** service.

2. Click **Create** to create a new Front Door instance.
   1. Set offering to **Azure Front Door**.
   2. Set Front Door options to **Custom create**.
   3. Click **Continue to create a Front Door**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/facbe3c-image.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "350px"
    }
  ]
}
[/block]

3. Switch to the **Basics** tab. 
   1. Select the **Resource group** with your Fingerprint integration (or create a new one).
   2. Set **Name** for the Front Door profile, for example, `fp-proxy-frontdoor`.
   3. Select a **Tier** according to your requirements. The **Standard** tier is enough for typical Fingerprint integration scenarios.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/390a443-image.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "600px"
    }
  ]
}
[/block]

4. Switch to the **Endpoint** tab.
   1. Click **Add an endpoint**.
   2. Set **Endpoint name**.
   3. Keep **Enable this endpoint** selected. 
   4. Click **Add** to save the endpoint. Your endpoint will show up as a tile in the **Endpoint** tab.  
      ![](https://files.readme.io/16ede50-image.png)
   5. Inside the endpoint, click **Add a route**.
   6. Configure the route according to [Step 5.2](#step-52-add-a-route-to-front-door), including the subdomain setup. You can then skip Step 5.2.
   7. Click **Add** to save the route.

5. Click **Review + create** to validate your Front Door configuration.

6. Review the profile’s summary and click **Create**.

### Step 5.2 Add a route to Front Door

1. Open your Front Door distribution.

2. On the left-side menu, go to **Settings** → **Front Door manager**.

3. Inside your Front Door endpoint, click **Add a route**.

4. Set **Name** to something descriptive like `fingerprint-integration-route`.

5. Keep **Enable route** selected (only applicable when creating a route on a pre-existing FrontDoor distribution, don't worry if you don't see the checkbox).

6. Set **Domains** to all domains you want the access the integration from. If your website is already behind Front Door, pick your existing domain. Azure might complain about the routes overlapping until you set **Patterns to match**.  
   Alternatively, if you need to create a new subdomain for the integration, click **Add a new domain** instead.
   1. If your DNS is managed outside Azure, switch **DNS management** to **All other DNS services**.
   2. Set **Custom domain** to the subdomain your want to use for your integration, for example: `metrics.yourwebsite.com`. Use something general, not `fingerprint.yourwebsite.com` or similar which could be blocked by ad-blockers.
   3. Keep the other default settings and click **Add** to save the custom domain.

7. Set **Patterns to match** to `/FPJS_ROUTE_PREFIX/*`.

8. Set **Accepted protocols** to `HTTPS only`.

9. Keep **Redirect all traffic to use HTTPS** selected.

10. Click **Add a new origin group.**

    1. Set the **Name** to something descriptive like `fp-pro-origin-group`.

    2. Click **Add an origin**. A new form will open on top of the current one. 
       1. Set the origin **Name** to something descriptive, like `fp-pro-origin`.
       2. Set **Origin type** to `App services`.
       3. Set **Host name** to the Fingerprint integration Function app created in Step 3. The origin host header will be filled automatically.
       4. Keep the default values for all other settings. 
       5. Click **Add** to save the origin.

    3. Back inside the **Add an origin group** form, keep **Enable health probes** selected.

    4. Set health probe **Path** to `/FPJS_ROUTE_PREFIX/status`.

    5. Set **Protocol** to `HTTPS`.

    6. Set **Probe method** to `GET`.

    7. Click **Add** to save the origin group.

11. Set **Forwarding protocol** to `HTTPS only`.

12. Click **Add** to save the route.

If you used the same domain and Front Door as your website for the integration, continue to Step 6. If you created a new Front Door and subdomain for the integration, you still need to verify your subdomain in Step 5.3.

### Step 5.3 Verify the integration subdomain

If you are using your website’s domain for the integration, you can skip this step. 

1. Inside **Front Door manager** → **Endpoint** → **Routes**, open your newly created subdomain.

   ![](https://files.readme.io/5a72e75-image.png)

2. Under **Validation state**, click **Pending.**

3. Take the displayed **Record type** and **Record name** and add them as a `TXT` record into your website’s DNS records. This proves your ownership of the domain to Azure.

4. Inside your website’s DNS records, add a `CNAME` record with your chosen subdomain (for example `metrics.yourwebsite.com`) pointing to the endpoint of your Front Door distribution (for example `your-endpoint-cugsapgvd4c9epg9.z01.azurefd.net`). This redirects traffic from your subdomain to FrontDoor.

5. Wait until the DNS changes propagate and the domain validation state switches to **Approved**.

## Step 6. Configure the Fingerprint JavaScript agent on your website

Use the path variables created in [Step 2](#step-2-create-path-variables) to construct the agent-download and result-endpoint URLs.

If your website and the proxy integration are behind the same Front Door distribution and domain, the JS Agent configuration will use URLs inside your domain, for example:

```javascript
const url = 'https://yourwebsite.com/FPJS_ROUTE_PREFIX/FPJS_AGENT_DOWNLOAD_PATH?apiKey=PUBLIC_API_KEY';
const fpPromise = import(url)
  .then(FingerprintJS => FingerprintJS.load({
    endpoint: 'https://yourwebsite.com/FPJS_ROUTE_PREFIX/FPJS_GET_RESULT_PATH?region=us'
  }));
```

If your website is not behind Front Door and you have set up a new Front Door distribution on a subdomain according to steps [5.1](#step-51-create-a-frontdoor-distribution), [5.2.5](#step-52-add-a-route-to-front-door), [5.3](53-verify-the-integration-subdomain), the JS Agent configuration will use that subdomain to interact with Fingerprint, for example:

```javascript
const url = 'https://metrics.yourwebsite.com/FPJS_ROUTE_PREFIX/FPJS_AGENT_DOWNLOAD_PATH?apiKey=PUBLIC_API_KEY';
const fpPromise = import(url)
  .then(FingerprintJS => FingerprintJS.load({
    endpoint: 'https://metrics.yourwebsite.com/FPJS_ROUTE_PREFIX/FPJS_GET_RESULT_PATH?region=us'
  }));
```

If everything is configured correctly, you should receive Fingerprint data through the Azure Function successfully.

## Updating routes and pre-shared secret

To change the Function App parameters:

1. Open your Function App page.
2. Using the left-side menu, go to **Configuration.** 
3. Edit parameter values inside the **Application settings**.
4. Click **Save**.

The function will restart with the new settings applied.

![](https://files.readme.io/864ee2a-image.png)

## Caching and compression for the Front Door route

Enable caching for the Front Door route that points to the Fingerprint proxy Azure function.

1. Go to your Front Door distribution.

2. In the left side menu, under **Settings**, go to **Optimizations**.

   ![](https://files.readme.io/8db15d0-image.png)

3. Find the route that points to the proxy function and click **Context menu (⋯)** → **Configure route**.

   ![](https://files.readme.io/286fa58-image.png)

4. On the Update route page, select **Enable caching.**

5. Set **Query string caching behavior** to `Include Specified Query Strings`.

6. Set **Query parameters** to `version,loaderVersion`.

7. Select **Enable compression**.

8. Click **Update**.

   ![](https://files.readme.io/8742ad1-image.png)

## Azure cost calculation

You can use the [Azure pricing calculator](https://azure.microsoft.com/en-us/pricing/calculator/) to estimate your expenses.

### Azure Functions

- The number of executions is roughly equal to visitor identification events multiplied by two.
- Memory size is 128 Mb.
- Execution time depends on your availability settings.
  - The typical duration of the agent download request is 200ms.
  - The typical duration of the Fingerprint Identification API \*\*request is 300-500ms.

### Storage account

- A Storage account is used to store function code in your infrastructure.
- Our template has the following settings:
  - The storage type is `Block Blob Storage`.
  - Performance is `Standard`.
  - Storage Account Type is `General Purpose V2`.
  - Redundancy is `LRS`.
- The capacity used is approximately 10 Mb.

### Azure Front Door (optional)

1. The number of requests from your client to Front Door is roughly equal to visitor identification events multiplied by two.
2. Data transfer from Front Door edge to origin (your Azure Function):
   - Each identification request has a payload size of 5-10 Kb.
3. Data transfer from the origin to Front Door is not charged.
4. Data transfer from Front Door to the client: 
   - The agent size is 36 Kb (compressed).
   - The identification result size is up to 1kB per request.
   - Enabling compression on the Front Door route will reduce the cost of data transfer to the client.

See [Azure Front Door billing](https://learn.microsoft.com/en-us/azure/frontdoor/billing) in the Azure documentation for more details.