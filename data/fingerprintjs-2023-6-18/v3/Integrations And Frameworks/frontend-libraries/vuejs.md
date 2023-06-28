---
title: "Vue.js"
slug: "vuejs"
hidden: false
createdAt: "2022-06-14T07:46:44.367Z"
updatedAt: "2023-06-05T21:52:55.321Z"
---
The [Fingerprint Vue SDK](https://github.com/fingerprintjs/fingerprintjs-pro-vue) is an easy way to integrate Fingerprint into your Vue or Nuxt application. Both Vue 2.6.x and Vue 3.1.x are supported. The SDK supports all capabilities of the JS agent and provides a built-in caching mechanism.

### How to install

Add `@fingerprintjs/fingerprintjs-pro-vue-v3` or `@fingerprintjs/fingerprintjs-pro-vue-v2`  as a dependency to your application via npm or yarn.

```shell Vue v3
npm install @fingerprintjs/fingerprintjs-pro-vue-v3
```
```shell Vue v2
npm install @fingerprintjs/fingerprintjs-pro-vue-v2
```

```bash Vue v3
yarn add @fingerprintjs/fingerprintjs-pro-vue-v3
```
```Text Vue v2
yarn add @fingerprintjs/fingerprintjs-pro-vue-v2
```

Register the plugin in your Vue.js application. You need to specify your public API key and other configuration options based on your chosen region and active integration.

```javascript Vue v3
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import {
  fpjsPlugin
} from '@fingerprintjs/fingerprintjs-pro-vue-v3';

const app = createApp(App);
app
  .use(fpjsPlugin, {
  	loadOptions: {
      apiKey: "<PUBLIC_API_KEY>",
      // region: "eu",
      // endpoint: "<CUSTOM_ENDPOINT>",
      // scriptUrlPattern: "<CUSTOM_SCRIPT_URL>"
  	},
  })
  .mount('#app');
```
```javascript Vue v2
// src/main.js
import Vue from 'vue';
import App from './App.vue';
import {
  fpjsPlugin
} from '@fingerprintjs/fingerprintjs-pro-vue-v2';

const app = new Vue(App);
Vue.use(fpjsPlugin, {
  loadOptions: {
    apiKey: "<PUBLIC_API_KEY>",
    // region: "eu",
    // endpoint: "<CUSTOM_ENDPOINT>",
    // scriptUrlPattern: "<CUSTOM_SCRIPT_URL>"
  },
});

app.$mount('#app');
```

Use the `useVisitorData` hook (Vue v3) or the `fpjsGetVisitorDataExtendedMixin` mixin (Vue v2) in your components to identify visitors.

```html Vue v3
<!-- src/App.vue -->
<script setup lang='js'>
import {useVisitorData} from '@fingerprintjs/fingerprintjs-pro-vue-v3';

const {data, error, isLoading, getData} = useVisitorData(
  {extendedResult: true},
  {immediate: false}
);
</script>

<template>
  <div>
    <button @click='getData({ignoreCache: true})'>Get visitor data</button>
    <p v-if="isLoading">Loading...</p>
    <p v-else>VisitorId: {{ data?.visitorId }}</p>
    <p v-if="error">{{ error.message }}</p>
    <pre v-if="data">{{ data }}</pre>
  </div>
</template>
```
```html Vue v2
<!-- src/App.vue -->
<script setup lang='js'>
import Vue from 'vue';
import {
  fpjsGetVisitorDataExtendedMixin
} from '@fingerprintjs/fingerprintjs-pro-vue-v2';

export default Vue.extend({
  mixins: [fpjsGetVisitorDataExtendedMixin],
  async mounted() {
    await this.$getVisitorDataExtended();
  }
});
</script>

<template>
  <div>
    <button @click='$getVisitorDataExtended({ignoreCache: true})'>
      Get visitor data
    </button>
    <p v-if='visitorDataExtended?.isLoading'>Loading...</p>
    <p v-else>VisitorId: {{ visitorDataExtended?.data?.visitorId }}</p>
    <p v-if='visitorDataExtended?.error'>
      {{ visitorDataExtended.error.message }}
    </p>
    <pre v-else>{{ visitorDataExtended.data }}</pre>
  </div>
</template>
```

### Documentation

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-vue/). The repository also contains [example applications](https://github.com/fingerprintjs/fingerprintjs-pro-vue/tree/main/examples) demonstrating the usage of the library.