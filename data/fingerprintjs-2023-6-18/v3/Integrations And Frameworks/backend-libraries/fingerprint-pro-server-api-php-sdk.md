---
title: "PHP Server API SDK"
slug: "fingerprint-pro-server-api-php-sdk"
hidden: false
createdAt: "2022-11-11T08:27:22.388Z"
updatedAt: "2023-06-05T21:49:48.554Z"
---
The [Fingerprint Server PHP SDK](https://github.com/fingerprintjs/fingerprint-pro-server-api-php-sdk) is an easy way to interact with our Server API from your PHP application. You can retrieve visitor history or individual fingerprinting events.

### How to install

Add the package to your `composer.json` file as a dependency:

```bash
composer require fingerprint/fingerprint-pro-server-api-sdk
```

Initialize the client instance and use it to make API requests. You need to specify your secret API key and region (if it is not US/Global).

```php
<?php

require_once(__DIR__ . '/vendor/autoload.php');
use Fingerprint\ServerAPI\Api\FingerprintApi;
use Fingerprint\ServerAPI\Configuration;
use GuzzleHttp\Client;

$config = Configuration::getDefaultConfiguration(
  "<SECRET_API_KEY>",
  // Configuration::REGION_EUROPE
);
$client = new FingerprintApi(
  new Client(),
  $config
);

// Get visit history of a specific visitor
try {
  $response = $client->getVisits("<visitorId>");
  echo "<pre>" . $response->__toString() . "</pre>";
} catch (Exception $e) {
  echo $e->getMessage(), PHP_EOL;
}

// Get a specific fingerprinting event
try {
  $response = $client->getEvent("<requestId>");
  echo "<pre>" . $response->__toString() . "</pre>";
} catch (Exception $e) {
  echo $e->getMessage(), PHP_EOL;
}
```

### Documentation

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprint-pro-server-api-php-sdk).