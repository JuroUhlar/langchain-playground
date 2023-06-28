---
title: "Java Server API SDK"
slug: "java-server-api-sdk"
hidden: false
createdAt: "2023-02-23T09:22:56.205Z"
updatedAt: "2023-06-05T21:45:38.686Z"
---
The [Fingerprint Server Java SDK](https://github.com/fingerprintjs/fingerprint-pro-server-api-java-sdk) is an easy way to interact with our Server API from your Java application. You can retrieve visitor history or individual fingerprinting events.

### How to install

#### Using Maven

Add this dependency to your project's POM:

```xml
<repositories>
  <repository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
  </repository>
</repositories> 
```

```xml
<dependency>
  <groupId>com.github.fingerprintjs</groupId>
  <artifactId>fingerprint-pro-server-api-java-sdk</artifactId>
  <version>v1.0.0</version>
</dependency>
```

#### Using Gradle

Add this dependency to your project's build file:

```groovy
repositories {
   maven { url 'https://jitpack.io' }
}

dependencies {
   implementation "com.github.fingerprintjs:fingerprint-pro-server-api-java-sdk:v1.0.0"
}
```

#### Others

Generate the JAR file:

```bash
./gradlew jar
```

Then manually install `target/fingerprint-pro-server-api-sdk-1.0.0.jar`.

### Usage

Initialize the client instance and use it to make API requests. You need to specify your secret API key and region (if it is not US/Global).

```java
import com.fingerprint.api.FingerprintApi;
import com.fingerprint.models.EventResponse;
import com.fingerprint.models.Response;
import com.fingerprint.sdk.ApiClient;
import com.fingerprint.sdk.ApiException;
import com.fingerprint.sdk.Configuration;
import com.fingerprint.sdk.Region;

public class FingerprintApiExample {
  public static void main(String... args) {
    ApiClient client = Configuration.getDefaultApiClient(
      "<SECRET_API_KEY>",
      // Region.EUROPE
    );
    FingerprintApi api = new FingerprintApi(client);

    // Get visit history of a specific visitor
    try {
      Response response = api.getVisits("<visitorID>");
      System.out.println(response.getVisits().toString());
    } catch (ApiException e) {
      System.err.println(e.getMessage());
    }

    // Get a specific fingerprinting event
    try {
      EventResponse response = api.getEvent("<requestID>");
      System.out.println(response.getProducts().toString());
    } catch (ApiException e) {
      System.err.println(e.getMessage());
    }
  }
}
```

### Documentation

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprint-pro-server-api-java-sdk/).