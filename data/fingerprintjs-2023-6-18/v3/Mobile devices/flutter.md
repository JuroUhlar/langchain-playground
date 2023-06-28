---
title: "Flutter"
slug: "flutter"
hidden: false
createdAt: "2022-05-30T12:44:03.209Z"
updatedAt: "2023-06-05T23:03:24.650Z"
---
Fingerprint Flutter is an [official open-source library](https://github.com/fingerprintjs/fingerprintjs-pro-flutter) for the Flutter ecosystem. The package is also published at [pub.dev](https://pub.dev/packages/fpjs_pro_plugin) package repository. This library supports Android, iOS, and web platforms.

### Sample usage

1. Add `fpjs_pro_plugin` to the `pubspec.yaml` in your Flutter app.

```yaml
dependencies:
  flutter:
    sdk: flutter
  ...
  fpjs_pro_plugin: ^1.3.0
```

2. Identify the visitor

```dart
import 'package:fpjs_pro_plugin/fpjs_pro_plugin.dart';
// ...

// Initialization
class _MyAppState extends State<MyApp> {
  @override
  void initState() async {
    super.initState();
    await FpjsProPlugin.initFpjs('<public-api-key>'); // insert your public API key here
  }
  // ...

  void identify() async {
    try {
      visitorId = await FpjsProPlugin.getVisitorId() ?? 'Unknown';
      deviceData = await FpjsProPlugin.getVisitorData();
      // use the visitorId or deviceData with more info about the visitor
    } on PlatformException catch (e) {
      // process an error somehow
    }
  }
}
```

### Documentation

You can find the full documentation in the [official GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-flutter). The repository also contains [an example app](https://github.com/fingerprintjs/fingerprintjs-pro-flutter/tree/main/example) demonstrating usage of the library.