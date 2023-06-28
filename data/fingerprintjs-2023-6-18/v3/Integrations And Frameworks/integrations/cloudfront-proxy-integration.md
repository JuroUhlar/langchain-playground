---
title: "AWS CloudFront Proxy Integration"
slug: "cloudfront-proxy-integration"
excerpt: "Fingerprint JS agent v3.6.0 or later is required."
hidden: false
createdAt: "2022-12-21T13:43:47.054Z"
updatedAt: "2023-06-14T15:08:51.802Z"
---
_Fingerprint CloudFront Proxy Integration_ is responsible for proxying identification and agent-download requests between your website and Fingerprint through your AWS infrastructure. Your website does not need to be behind CloudFront or run on AWS to use this proxy integration, it can run anywhere.

![](https://files.readme.io/6e66f00-Cloudfront-diagram.png "Cloudfront-diagram.png")

The integration consists of several components: 

- Your website, which may be running on AWS Cloudfront but it doesn't have to.
- An [AWS CloudFront](https://aws.amazon.com/cloudfront/) distribution
  - If your website is already running on CloudFront, you can use the same distribution for the proxy integration.
  - If your website is not running on CloudFront, you can create a new CloudFront distribution just for the proxy integration (see [Step 5](#step-5---configure-the-cloudfront-distribution)).
- [AWS Lambda@Edge Function](https://aws.amazon.com/lambda/edge/) that handles proxying requests to Fingerprint resources.
- Management Lambda function that is responsible for updating the integration.
- Additional cache behavior that enables using _Lambda@Edge_ function for proxying requests.
- Other supporting resources such as _CodeBuildServiceRole_ or _Artifact Storage_ that are defined in the [CloudFormation stack](https://us-east-1.console.aws.amazon.com/lambda/home#/create/app?applicationId=arn:aws:serverlessrepo:us-east-1:708050157146:applications/fingerprint-pro-cloudfront-integration).

_Fingerprint CloudFormation_ stack creates a _Lambda@Edge Function_ that's available on the specific path on your site. The rest of your site is not affected.

This guide will refer to _Lambda@Edge Function_ and _Lambda_ function interchangeably.

The _Lambda_ function code and the whole _CloudFormation_ stack are 100% open-source and available on [GitHub](https://github.com/fingerprintjs/fingerprint-pro-cloudfront-integration). Once the Fingerprint JavaScript agent is configured on your site correctly, the _Lambda_ function is responsible for delivering the latest fingerprinting client-side logic as well as proxying identification requests and responses between your site and Fingerprint's APIs.

## The benefits of using the CloudFront Integration

- Significant increase in accuracy in browsers with strict privacy features such as Safari or Firefox.
- Cookies are now recognized as “first-party.” This means they can live longer in the browser and extend the lifetime of visitor information.
- Ad blockers will not block our Fingerprint JS agent from loading. Attempts to connect to an external URL will be stopped by most ad blockers while attempts to connect to the same site URL will be allowed.
- Ad blockers will not block our identification requests since they are sent to the specific path or subdomain that belongs to the same site.
- Insight and control over the identification requests that can be combined with other AWS features like [CloudWatch](https://aws.amazon.com/cloudwatch/).
- With the CloudFront Integration, you can manage an unlimited number of subdomains and paths and provide Fingerprint services to all your customers at any scale while benefiting from all the 1st-party integration improvements.
- Easy to meet compliance and auditing requirements.

## Prerequisites

- An AWS account.
- An existing CloudFront distribution that serves the web app's content OR a new CloudFront distribution that is configured to serve content on the [same eTLD + 1 or on any of its subdomains](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html) - see [Step 5](#step-5---configure-the-cloudfront-distribution).

## Integration setup overview

The integration setup consists of several manual and automatic steps. Each of the following steps is discussed in detail in a separate section below.

1. Issue a _Proxy Pre-Shared Secret_ in the dashboard.
2. Create path variables used by the AWS configuration and JS agent configuration on your website.
3. Create a new secret in the [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) to store path variables and the _Proxy Pre-Shared Secret_.
4. Install the _CloudFormation_ application containing all the necessary resources for the integration.
5. Configure the CloudFront distribution with the Lambda function and the cache behavior.
6. Configure _Fingerprint JavaScript agent_ on your client side.

## Step 1 - Issue a Proxy Pre-Shared Secret

You need to issue a _Proxy Pre-Shared Secret_ to authenticate requests from your Lambda@Edge function.

1. Go to the _Fingerprint_ [dashboard](https://dashboard.fingerprint.com) and select your application.
2. In the left menu, click _App settings_ a switch to the _API keys_ tab.
3. Click _Create key_ and select _Proxy Pre-Shared Secret._
4. Click _Create_. 

This _Proxy Pre-Shared Secret_ value will be used later in the `FPJS_PRE_SHARED_SECRET` variable.

## Step 2 - Create path variables

You need to set the path variables you will use throughout your AWS configuration (Steps 3 and 5) and the JS agent configuration on your website ([Step 6](#step-6-configure-the-fingerprint-pro-javascript-agent-on-your-website)). These values are arbitrary. Just decide what your values are and write them down somewhere. 

In this guide, we will use readable values corresponding to the variable names just to keep things easier to follow:  

```
FPJS_BEHAVIOR_PATH="FPJS_BEHAVIOR_PATH"
FPJS_AGENT_DOWNLOAD_PATH="FPJS_AGENT_DOWNLOAD_PATH"
FPJS_GET_RESULT_PATH="FPJS_GET_RESULT_PATH"
```

However, your values used in production should look more like random strings: 

```
FPJS_BEHAVIOR_PATH="ore54guier"
FPJS_AGENT_DOWNLOAD_PATH="vbcnkxb654"
FPJS_GET_RESULT_PATH="5yt489hgfj"
```

That is because some adblockers might automatically block requests from any URL containing fingerprint-related terms like "fingerprint", "fpjs", "track", etc. Random strings are the safest. So whenever you see a value like `FPJS_BEHAVIOR_PATH` in this guide, you should use your own random value instead.

## Step 3 - Create a new secret in the AWS Secrets Manager

1. Go to AWS Secrets Manager and click _Store a new secret_.
2. Choose _Other type of secret_ as the secret type.
3. Add the 4 required values in the _Key/value pairs_ section:
   - The key `FPJS_PRE_SHARED_SECRET` with value the of the `Proxy Pre-Shared Secret` which was issued in **Step 1**.
   - `FPJS_BEHAVIOR_PATH`, `FPJS_AGENT_DOWNLOAD_PATH`, and `FPJS_GET_RESULT_PATH` you decided on in **Step 2**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/03b2687-CloudfrontFix.png",
        null,
        "Secrets Manager configuration."
      ],
      "align": "center",
      "caption": "Secrets Manager configuration."
    }
  ]
}
[/block]

4. Click _Next_.
5. Specify the secret name — it will be used further in the configuration. Click _Next_.  
6. Leave _Automatic rotation_ disabled and click _Next_.
7. Click _Store_.
8. Your secret is created. Remember the _Secret name_ and which _Region_ it was created in (see the upper-right corner of the screen)

## Step 4 - Install the CloudFormation application

_Lambda@Edge_ function and corresponding settings (_AWS Lambda execution role_ and c_ache policy_ for CDN) are provided as a _CloudFormation_ application. Go to the [application page](https://us-east-1.console.aws.amazon.com/lambda/home#/create/app?applicationId=arn:aws:serverlessrepo:us-east-1:708050157146:applications/fingerprint-pro-cloudfront-integration) to open the deployment dialog.

> 📘 Lambda region
> 
> Lambda@Edge functions that are used to handle requests to CloudFront and responses from CloudFront must be deployed to the `us-east-1` region. Make sure that you’ve selected this region before deploying the application.

Fill in the required values to the application settings and deploy the application to your AWS account.

- The`DistributionId` is the identifier of your CloudFront distribution.
- The `SecretName` is the name of the secret you created in the previous step.
- The `SecretRegion` is the region where the secret is stored e.g.: `us-east-1`.

> 📘 Custom IAM roles
> 
> This application creates the custom IAM roles that allow us to modify CloudFront distribution to keep the Lambda@Edge function up to date. You can review these policies in the [SAM template](https://github.com/fingerprintjs/fingerprint-pro-cloudfront-integration/blob/main/cloudformation/template.yml).

After deployment, you will be redirected to the application page where you can see a list of resources created by the application.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/085c915-cloudformation-resources.png",
        "cloudformation-resources.png",
        3010
      ],
      "align": "center",
      "caption": "CloudFormation stack resources."
    }
  ]
}
[/block]

Open the Deployments tab (see the screenshot below) and wait for the `CREATE_COMPLETE` status message.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/62766d7-deployment-status.png",
        "deployment-status.png",
        3000
      ],
      "align": "center",
      "caption": "Deployment status."
    }
  ]
}
[/block]

> 📘 Deployment status
> 
> The _Status_ indicates the current state of deployment. It starts from `REVIEW_IN_PROGRESS` to `CREATE_IN_PROGRESS`, and finally `CREATE_COMPLETE`. If you see a different status (`CREATE_FAILED`, `ROLLBACK_IN_PROGRESS`, `ROLLBACK_COMPLETE`, etc), please contact our [support](support@fingerprint.com).

Once the application is fully deployed (AWS Stack has status `CREATE_COMPLETE`), you can click _CloudFormation stack_, switch to the _Outputs_ tab, and find the names of created entities.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9504721-cloudformation-outputs.png",
        "cloudformation-outputs.png",
        2062
      ],
      "align": "center",
      "caption": "CloudFormation outputs."
    }
  ]
}
[/block]

The export name of the `LambdaFunctionName` is a unique name of the created _Lambda@Edge_ function.

The export name of the `CachePolicyName` is a unique name of the _CloudFront cache policy_, which will be applied in a cache behavior for Fingerprint requests.

## Step 5 - Configure the CloudFront distribution

### Step 5.0 - Create a new CloudFront distribution if necessary

If your website is already running on CloudFront, you can use your existing CloudFront distribution, skip the following step, and start with [Step 5.1](#step-51---create-a-new-origin).

If your website is not running on CloudFront, you can create a new CloudFront distribution for the proxy and set up a subdomain on your website that points to it, for example: `metrics.yourwebsite.com`

1. Go to your AWS Console and open _CloudFront_.
2. Click _Create distribution_.
3. Set up the distribution's _Origin_ according to [Step 5.1](#step-51---create-a-new-origin) of this guide (you can then skip this step).
4. Set up the distribution's _Cache behavior_ according to [Step 5.2](#step-52---create-a-cache-behavior) of this guide (you can then skip this step).
5. Click "Create distribution".
6. In your newly created distribution, inside _General_ → _Settings_, click _Edit_. 
7. Under _Alternate domain name (CNAME) - optional_ click _Add item_. 
8. Add an alternate domain to your distribution, for example `metrics.yourwebsite.com`. You will need to add an SSL certificate for it.
   1. To create the SSL certificate, click _Request certificate_. AWS Certificate Manager will open in a new tab. 
   2. Set the domain name to your alternate domain, for example, `*.yourwebsite.com` or  `metrics.yourwebsite.com`.
   3. Keep _DNS validation_ as a way to [prove ownership](https://docs.aws.amazon.com/acm/latest/userguide/domain-ownership-validation.html) of the domain.
   4. Click _Request_ and then _View certificate_.
   5. Use the `CNAME name` and `CNAME value` to create a subdomain CNAME record in the DNS settings of your domain. Do this using your DNS provider, which could be AWS but also GoDaddy, Netlify, BlueHost, DigitalOcean, Vercel, etc...
9. It will take a while for AWS to verify the ownership of the domain and issue the certificate. Feel free to continue with the rest of the setup and come back here later.
10. Once the certificate is issued, attach it to the distribution's alternate domain and click _Save changes_. 

Your CloudFront distribution is now accessible from your website's subdomain, for example, `metrics.yourwebsite.com`. You will use it in [Step 6](#step-6---configure-the-fingerprint-pro-javascript-agent-on-your-client) to configure the Fingerprint JS Agent. 

### Step 5.1 - Create a new origin

1. Go to your CloudFront distribution, switch to the _Origins_ tab, and click _Create origin_.
2. Fill required fields in the wizard:
   1. Set the origin domain to `fpcdn.io`.
   2. Set the protocol to `HTTPS only`.
   3. Set minimum origin SSL protocol to `TLSv1.2`.
   4. Set name to `fpcdn.io`.
   5. Add the following custom headers:
      - `FPJS_SECRET_NAME` is the name of the secret created in step 3.
      - `FPJS_SECRET_REGION` is the region where the secret is stored, for example, `us-east-1`.
   6. Finally, click _Create origin_. 

### Step 5.2 - Create a cache behavior

In this step, you will create a cache behavior to proxy requests to Fingerprint API.

1. Go to your CloudFront distribution.
2. Switch to the _Behaviors_ tab and click _Create behavior_.
3. Fill in the required fields in the wizard
   1. Set _Path pattern_ to a value that matches all routes under `FPJS_BEHAVIOR_PATH`. For example, for `FPJS_BEHAVIOR_PATH=random-path` you need to use `random-path/*`.
   2. Set _Origin and origin groups_ to `fpcdn.io`.
   3. Set the _Viewer protocol policy_ to `Redirect HTTP to HTTPS`.
   4. Set the  _Allowed HTTP methods_ to `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`.
   5. Set _Cache key and origin requests_ to `Cache policy and origin request policy (recommended)`.
   6. Set _Cache policy_ to a _Custom_ policy named `FingerprintProCDNCachePolicy-{id}` (you can find the name of your cache policy on the _AWS Stack’s_ output of the application).
   7. Set _Origin request policy_ to `AllViewer`.
   8. Click _Create behavior_.

### Step 5.3 - Attach the Lambda function to the cache behavior

1. Go to your AWS [Lambda Applications](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/applications) and open the newly created application.
2. On the _Overview_ tab, scroll down to _Resources_ a click `FingerprintProCloudfrontLambda`.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/dd4794d-cloudformation-lambda.png",
        "cloudformation-lambda.png",
        3012
      ],
      "align": "center",
      "caption": "CloudFormation Lambda function."
    }
  ]
}
[/block]

3. Scroll down and switch to the _Configuration_ tab.
4. On the left, click _Triggers_, then click _Add trigger_.
5. Select `CloudFront` as the source and click _Deploy to Lambda@Edge_.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/100bd61-add-trigger.png",
        "add-trigger.png",
        1644
      ],
      "align": "center",
      "caption": "Add a trigger for the Lambda function."
    }
  ]
}
[/block]

6. Select an option to _Configure new CloudFront trigger._
   1. Select your distribution.
   2. Select the cache behavior you created in the previous step.
   3. Set _CloudFront event_ to `Origin Request`.
   4. Check _Include body_.
   5. Check _Confirm deploy to Lambda@Edge_.
   6. Click _Deploy_.

It may take up to several minutes to add a trigger to the CloudFront distribution.  
Go to the _General_ tab of your CloudFront distribution and check the _Last modified_ time.

## Step 6 - Configure the Fingerprint JavaScript agent on your client

Use the path variables created in [Step 2](#step-2---create-path-variables) to construct the agent-download and result-endpoint URLs. 

If your website and the proxy are behind the same CloudFront distribution, the JS Agent configuration will use randomized URLs inside your domain, for example: 

```javascript
const url = 'https://yourwebsite.com/FPJS_BEHAVIOR_PATH/FPJS_AGENT_DOWNLOAD_PATH?apiKey=<PUBLIC_API_KEY>';
const fpPromise = import(url)
  .then(FingerprintJS => FingerprintJS.load({
    endpoint: 'https://yourwebsite.com/FPJS_BEHAVIOR_PATH/FPJS_GET_RESULT_PATH?region=us'
  }));
```

If your website is not behind CloudFront and you have set up CloudFront distribution on your subdomain according to [Step 5.0](#step-50---create-a-new-cloudfront-distribution-if-necessary), the JS Agent configuration will use that subdomain to interact with Fingerprint, for example:  

```javascript
const url = 'https://metrics.yourwebsite.com/FPJS_BEHAVIOR_PATH/FPJS_AGENT_DOWNLOAD_PATH?apiKey=<PUBLIC_API_KEY>';
const fpPromise = import(url)
  .then(FingerprintJS => FingerprintJS.load({
    endpoint: 'https://metrics.yourwebsite.com/FPJS_BEHAVIOR_PATH/FPJS_GET_RESULT_PATH?region=us'
  }));
```

If everything is configured correctly, you should receive data through your CloudFront distribution successfully.

## Cost calculation for AWS

You can use [AWS Calculator](https://calculator.aws/) to estimate your expenses.

**Lambda@Edge service**

- The **number of requests** is roughly equal to visitor identification events multiplied by two.  
  There are up to 2 requests for each visitor identification. The first request downloads the agent script, and the second calls the identification endpoint. The download agent request is cached. Caching the identification request is up to you, but most of our [frontend libraries](https://dev.fingerprint.com/docs/frontend-libraries) have a caching mechanism built-in.
- The **duration of each request** depends on your CloudFront availability settings. The typical duration of the agent download request is 200ms, for identification requests it is 500ms.
- The **amount of memory allocated** is 128MB.

**Secrets Manager**

- The **number of secrets** is 1.
- The **number of API calls** is approximately 12 calls per hour per each used AWS region.

**Additional costs for the CloudFront distribution**

- Data transfer **from** CloudFront distribution to clients:
  - The agent’s size is about 36kB.
  - The identification request result is up to 1kB per request.
- Data transfer from clients **to** the CloudFront distribution:
  - The payload size for the identification requests is approximately 5-10kB.

## Troubleshooting

When troubleshooting the integration, please provide our support team with the following information.  
Open your CloudFormation stack, go to the _Events_ tab and copy the contents of the _Status reason_ column for any failed statuses.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0a39beb-cloudformation-errors.png",
        "cloudformation-errors.png",
        2052
      ],
      "align": "center",
      "caption": "CloudFormation errors."
    }
  ]
}
[/block]