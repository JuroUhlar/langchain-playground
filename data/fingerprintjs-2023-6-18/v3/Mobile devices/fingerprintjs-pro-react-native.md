---
title: "React Native"
slug: "fingerprintjs-pro-react-native"
hidden: false
createdAt: "2022-03-30T14:53:25.361Z"
updatedAt: "2023-06-05T23:05:12.898Z"
---
### Using the Fingerprint React Native library

Fingerprint React Native is an official [open-source](https://github.com/fingerprintjs/fingerprintjs-pro-react-native) library for projects written in React Native for iOS and Android platforms. This library allows developers to use Fingerprint capabilities in the React Native context. All Fingerprint agent capabilities are fully supported.

### Example Use Case

1. Add `@fingerprintjs/fingerprintjs-pro-react-native` as a dependency to your application via npm or yarn.

```shell
npm install @fingerprintjs/fingerprintjs-pro-react-native --save
```

```shell
yarn add @fingerprintjs/fingerprintjs-pro-react-native
```

2. Wrap your application (or component) in `FingerprintJsProProvider`. You can specify multiple configuration options.

```javascript
// src/index.js
import React from 'react';
import { AppRegistry } from 'react-native';
import { FingerprintJsProProvider } from '@fingerprintjs/fingerprintjs-pro-react-native';
import App from './App';

AppRegistry.registerComponent(
  'AppName',
  <FingerprintJsProProvider
      apiKey="fingerprintjs-pro-public-api-key"
  >
    <App />
  </FingerprintJsProProvider>
);
```

3. Use the `useVisitorData` hook in your components to perform visitor identification and get the data.

```javascript
// src/App.js
import React, { useEffect } from 'react';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react-native';

function App() {
  const {
    isLoading,
    error,
    data,
    getData,
  } = useVisitorData();

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  if (!data) {
   return null
	}
  
  // perform some logic based on the visitor data
  return (
    <div>
      Visitor id is {data.visitorId}
    </div>
  );
}

export default App;
```

### Documentation

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-react-native). The repository also contains [an example app](https://github.com/fingerprintjs/fingerprintjs-pro-react-native/tree/main/TestProject) demonstrating usage of the library.

### Limitations

- Fingerprint [request filtering](https://dev.fingerprintjs.com/docs/request-filtering) is not supported right now. Allowed and forbidden origins cannot be used.
- Using inside [Expo environment](https://docs.expo.dev) is not supported right now.