---
title: "Android"
slug: "native-android-integration"
excerpt: "Fingerprint Identification in native Android apps"
hidden: false
createdAt: "2021-10-21T05:01:27.916Z"
updatedAt: "2023-06-15T09:48:29.283Z"
---
Fingerprint's native Android integration allows developers to integrate device identification into native Android apps. Visit the [official GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-android) for examples and package downloads.

Please note that these Fingerprint integrations require using our Fingerprint API and thus need a public API key. 

For native device identification for iOS, please go to [iOS agent](doc:native-ios-integration).

## Installing the agent

### Add the repository to Gradle

If your version of Gradle is earlier than 7, add these lines to your `build.gradle`:

```groovy
allprojects {	
  repositories {
  ...
  maven { url 'https://maven.fpregistry.io/releases' }
  maven { url 'https://jitpack.io' }
}}
```

If your version of Gradle is 7 or newer, add these lines to your `settings.gradle`:

```groovy
repositories {
  ...
  maven { url 'https://maven.fpregistry.io/releases' }
  maven { url 'https://jitpack.io' }
}
```

### Add dependencies to your `build.gradle` file

```groovy
dependencies {

  implementation "com.fingerprint.android:pro:2.3.1"

}
```

Note: Fingerprint Android uses [FingerprintJS Android](https://github.com/fingerprintjs/fingerprintjs-android) and [kotlin-stdlib](https://kotlinlang.org/api/latest/jvm/stdlib/) as dependencies.

Lastly, sync Gradle to synchronize all the dependencies to your Android project.

## Get the visitor identifier

Retrieve the visitor identifier using your public API key. You can find your public API key in [your dashboard](https://dashboard.fingerprintjs.com/login).

Kotlin example:

```kotlin 3.1 Kotlin example
import com.fingerprintjs.android.fpjs_pro.Configuration
import com.fingerprintjs.android.fpjs_pro.FingerprintJSFactory
...

// Initialization
val factory = FingerprintJSFactory(applicationContext)
val configuration = Configuration(
    apiKey = "<<your_public_api_key>>"
  )
 
val fpjsClient = factory.createInstance(
    configuration
)

// Usage
fpjsClient.getVisitorId { result ->
  	val visitorId = result.visitorId
    // Use the visitorId
}
```

Java example:

```java 3.2 Java example
import com.fingerprintjs.android.fpjs_pro.Configuration;
import com.fingerprintjs.android.fpjs_pro.FingerprintJS;
import com.fingerprintjs.android.fpjs_pro.FingerprintJSFactory;
...

FingerprintJSFactory factory = new FingerprintJSFactory(this.getApplicationContext());
Configuration configuration = new Configuration(
    "your-public-api-key"
    );

FingerprintJS fpjsClient = factory.createInstance(
    configuration
);

fpjsClient.getVisitorId(visitorIdResponse -> {
    // Use the ID
    String visitorId = visitorIdResponse.getVisitorId();
    return null;
});
```

### How unique and stable is the visitorId?

The ID is completely unique for every device. It is the same for different applications and it does not change after the application is reinstalled. Only a factory reset can wipe it out – which is a common and legal case (the device may be resold or gifted to another person).

### Configuration

When you create an instance of the FingerprintJS class there are options that can be configured:

```kotlin
class Configuration @JvmOverloads constructor(
    val apiToken: String,
    val region: Region = Region.US,
    val endpointUrl: String = region.endpointUrl,
    val extendedResponseFormat: Boolean = false
)
```

### Response format

If `extendedResponseFormat` flag is set in the Configuration class the response will contain the following fields:

```kotlin
data class FingerprintJSProResponse(
    val requestId: String,
    val visitorId: String,
    val confidenceScore: ConfidenceScore,
    val visitorFound: Boolean, // Available with extendedResponseFormat == true
    val ipAddress: String, // Available with extendedResponseFormat == true
    val ipLocation: IpLocation?, // Available with extendedResponseFormat == true
    val osName: String, // Available with extendedResponseFormat == true
    val osVersion: String, // Available with extendedResponseFormat == true
    val firstSeenAt: Timestamp, // Available with extendedResponseFormat == true
    val lastSeenAt: Timestamp // Available with extendedResponseFormat == true
)

data class IpLocation(
    val accuracyRadius: Int,
    val latitude: Double,
    val longitude: Double,
    val postalCode: String,
    val timezone: String,
    val city: City,
    val country: Country,
    val continent: Continent,
    val subdivisions: List<Subdivisions>
) {

    data class City(
        val name: String
    )

    data class Country(
        val code: String,
        val name: String
    )

    data class Continent(
        val code: String,
        val name: String
    )

    data class Subdivisions(
        val isoCode: String,
        val name: String
    )
}

data class ConfidenceScore(
    val score: Double
)
  
  
data class Timestamp(
    val global: String,
    val subscription: String
)
```

### Error handling

```kotlin
fpjsClient.getVisitorId(
          listener = { result ->
            // Handle ID
          },
          errorListener = { error ->
            when(error){
            	is ApiKeyRequired -> {
                	val requestId = error.requestId
                  // Handle error
              }
            	...
          	}
          })
```

Error is a sealed class

```kotlin

sealed class Error(
    val requestId: String = UNKNOWN,
    val description: String? = UNKNOWN
)

```

 and it might me one of:

- ApiKeyRequired
- ApiKeyNotFound
- ApiKeyExpired
- RequestCannotBeParsed
- Failed
- RequestTimeout
- TooManyRequest
- OriginNotAvailable
- HeaderRestricted
- NotAvailableForCrawlBots
- NotAvailableWithoutUA
- WrongRegion
- SubscriptionNotActive
- UnsupportedVersion
- InstallationMethodRestricted
- ResponseCannotBeParsed
- NetworkError
- UnknownError

### [Tag](https://dev.fingerprintjs.com/docs/js-agent#tag) support to store custom data with each identification

```kotlin
fpjsClient.getVisitorId(
      tags = mapOf("sessionId" to sessionId),
      listener = { result ->
          // Handle ID
      },
      errorListener = { error ->
          // Handle error
      })
```

Tags are returned in the webhook response so make sure the map you are passing to the library represents a valid JSON.

### [Linked ID](https://dev.fingerprint.com/docs/js-agent#linkedid) support

````kotlin
```kotlin
 fpjsClient.getVisitorId(
      linkedId = "your_linked_id",
      listener = { result ->
          // Handle ID
      },
      errorListener = { error ->
          // Handle error
      })
```
````

You can use both tags and linked id:

```kotlin
fpjsClient.getVisitorId(
     tags = mapOf("sessionId" to sessionId),
     linkedId = "your_linked_id",
     listener = { result ->
          // Handle ID
      },
      errorListener = { error ->
          // Handle error
      })
```

## Smart signals

- Fingerprint PRO now supports a Smart Signals functionality, including Android Root Detection and Android Emulator detection. The results are available in the response of the `GET /events` [Server API method](https://dev.fingerprint.com/docs/server-api#get-events-identification--bot-detection--aev).
- Access to the Smart signals functionality is currently available upon request for Enterprise customers. Contact Support ([support@fingerprint.com](mailto:support@fingerprint.com)) to enable it for your account.

## Additional Resources

- [Fingerprint Android Demo application](https://github.com/fingerprintjs/fingerprintjs-pro-android-demo)
- [Fingerprint Android (client-side Android fingerprinting only)](https://github.com/fingerprintjs/fingerprint-android)