---
title: "Google Tag Manager"
slug: "fingerprintjs-pro-google-tag-manager"
hidden: false
createdAt: "2022-04-01T11:02:20.234Z"
updatedAt: "2023-06-05T23:00:16.078Z"
---
[The Fingerprint Google Tag Manager integration](https://github.com/fingerprintjs/fingerprintjs-pro-gtm) is an open-source [tag template](https://github.com/fingerprintjs/fingerprintjs-pro-gtm/blob/main/template.tpl) you can manually import into [Google Tag Manager](https://support.google.com/tagmanager/answer/6102821). It allows you to add and manage the Fingerprint [JS Agent](https://dev.fingerprint.com/docs/js-agent) script on your website without changing the website code or redeploying it. 

- Supports all standard functionality of the JS agent.
- Pushes data to the [GTM's data layer](https://developers.google.com/tag-platform/tag-manager/web/datalayer) which can be processed by other tags or by JavaScript code on your website.

Assuming you have already [signed up for Fingerprint](https://dashboard.fingerprint.com/signup/) and your website already has Google Tag Manager [installed](https://developers.google.com/tag-platform/tag-manager/web), here is how to add a Fingerprint tag:

## 1. Import the Fingerprint GTM template

You can install the template manually from the integration's [GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-gtm/blob/main/template.tpl).

1. [Download the template](https://raw.githubusercontent.com/fingerprintjs/fingerprintjs-pro-gtm/c53ce9c2a6985efbcc4bf4e8321f382b92637adc/template.tpl)  and make sure it is saved as `template.tpl` not `template.tpl.txt`. 
2. Open the Google Tag Manager workspace of your website.
3. Go to **Templates** and click **New** to create a new template. 
4. To [import](https://developers.google.com/tag-platform/tag-manager/templates#export_and_import) the template, click the **More actions (⋮)** button in the top right corner, select **Import** and pick the downloaded `template.tpl` file.
5. Click **Save**.

## 2. Add a Fingerprint tag to your website

1. Go to **Tags** and click **New** to create a new tag.
2. Click **Choose a tag type** and under **Custom**, pick your imported **Fingerprint** template.
3. Configure the tag:
   1. Choose your **Tag type**.  **Load and Identify** loads the script and identifies the visitor right after the tag is triggered. This is the recommended option if you want to identify visitors on page initialization.
      > Note: If you want to identify visitors after an event (e.g. form submission) with minimum latency, you might want to separate loading the JS agent from the identification request. In that case, you can create two separate Fingperprint tags: 
      >
      > - First, with tag type **Load**, which is triggered on page initialization.  
      > - Second, with tag type **Identify** which is triggered by another event. You can create your own [custom event trigger](https://support.google.com/tagmanager/answer/7679219?hl=en) and then fire it from a 3rd party tag or from your JavaScript code: `dataLayer.push({'event': 'identifyVisitor'});`
   2. Enter your [`public API key`](https://dev.fingerprint.com/docs/js-agent#apikey) and [`region`](https://dev.fingerprintjs.com/docs/js-agent#region). 
   3. In the **Additional fields** section, you can optionally configure the  [`endpoint`](https://dev.fingerprint.com/docs/js-agent#endpoint), [`scriptUrlPattern`](https://dev.fingerprint.com/docs/js-agent#scripturlpattern) [`tag`](https://dev.fingerprintjs.com/docs/js-agent#tag), [`linkedId`](https://dev.fingerprintjs.com/docs/js-agent#linkedid), [extendedResult](https://dev.fingerprintjs.com/docs/js-agent#extendedresult). You can change **Result custom name** to change the name of the `result` object in the _dataLayer_.  
      ![screenshot of tag configuration](https://files.readme.io/6669a64-image.png)
4. In the **Triggering** section, add a new trigger, for example:  **Initialization**.  
   ![screenshot of trigger section](https://files.readme.io/324154f-Screenshot_2022-04-01_at_13.26.31.png "Screenshot 2022-04-01 at 13.26.31.png")
5. Click **Save** to save your tag.
6. Click **Submit** and publish your workspace changes to your website.

If the tag is configured correctly, you will see identification events on your [Fingerprint dashboard](https://dashboard.fingerprint.com/).

## Using the Fingerprint result in custom JavaScript code

Fingerprint's data can be accessed through the GTM's [`dataLayer`](https://developers.google.com/tag-platform/tag-manager/web/datalayer) API in your JavaScript code. It's important to check if the result data (specified by _Result custom name_) is already present.

```javascript
window.dataLayer.push(function () {
  if (this.get("FingerprintJSProResult")) { // Make sure the page has already received result data
    const result = this.get("FingerprintJSProResult");
    console.log(JSON.stringify(result)); // Use Fingerprint result
  }
});
```

## Using the Fingerprint result in a custom variable

You can expose every piece of information provided in the `result` object as a [user-defined variable](https://support.google.com/tagmanager/answer/7683362?hl=en) and use it in the configuration fields of other tags. For example, you can use the [`visitorId`](https://dev.fingerprint.com/docs/js-agent#visitorid)  in the metadata of 3rd party tag.

> Note: To expose the all the available properties, you need to select _Extended result_ in the Fingerprint tag configuration.

1. Inside Google Tag Manager, go to **Variables**, and click **New** to create a new user-defined variable. 

2. Select the **Data Layer Variable** type.

3. Name your variable, for example `VisitorID`.

4. Set **Data Layer Variable Name ** to `FingerprintJSProResult.visitorId`. The data layer properties format follows the [result format](https://dev.fingerprintjs.com/docs/js-agent#extendedresult) provided by the JavaScript agent. 

5. Click **Save** to create the variable.

![screenshot of variable configuration](https://files.readme.io/7016e89-image.png)

Now you can use the `{{VisitorID}}` variable in the configuration of 3rd party tags within your container. However, the tags need to wait for the Fingerprint `result` data:

1. Add a new Trigger to the 3rd party tag. 
2. In the tag's configuration, add a new _Firing Trigger_, choose _Custom Event_, and enter `FingerprintJSPro.identified`.

![screenshot of trigger configuration](https://files.readme.io/25bea14-image.png)

For testing purposes, you can just create a [Custom HTML tag](https://support.google.com/tagmanager/answer/6107167?hl=en#) logging the variable to the console:

```
<script>
  console.log({{visitorId}}) // You can use the variable inside the configuration of any tag
<script>
```

## Using the Fingerprint result in Google Analytics

Assuming you have the Google Analytics tag [installed](https://support.google.com/tagmanager/answer/9442095?hl=en) and the [custom variable defined](#using-fingerprinnt-pro-result-in-a-custom-variable), you can pass the `visitorId` or other result data to Google Analytics and use them as dimensions.

1. In your Google Analytics tag configuration, add `visitorId` as a user property based on the `{{visitorId}}` custom variable.  
   ![screenshot of google analytics tag configuration](https://files.readme.io/e2dcf8c-image.png)
2. Inside Google Analytics, go to **Admin** > **Custom definitions** > **Create custom dimension**
3. Name your custom dimension, for example `visitorId`.
4. Set **Scope** to `User`.
5. Set **User property** to the one you defined in Step 1, for example `visitorId`.
6. Click **Save**.

You can now use`visitorId` as a dimension in your Google Analytics reports.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4e565eb-image.png",
        null,
        "screenshot of visitor Id dimension being used in a chart"
      ],
      "align": "center",
      "sizing": "200px"
    }
  ]
}
[/block]

## Code and documentation

You can find the [code and technical documentation](https://github.com/fingerprintjs/fingerprintjs-pro-gtm) in the official GitHub repository.

## Limitations

Some advanced JavaScript agent properties (`tlsEndpoint`, `disableTls`, `storageKey`) are not currently supported.  If you need to use these features, please contact [support](mailto:support@fingerprintjs.com).

Ad-blocking browser extensions such as AdBlock, uBlock Origin, etc., can block all scripts served by Google Tag Manager, including Fingerprint. If this is a problem for your use case, see Google Tag Manager documentation for [Server-side tagging](https://developers.google.com/tag-platform/tag-manager/server-side) and [Custom domain configuration](https://developers.google.com/tag-platform/tag-manager/server-side/custom-domain).