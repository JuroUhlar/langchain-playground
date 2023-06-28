---
title: "Usage with Server-side Rendering Frameworks"
slug: "usage-with-server-side-rendering-frameworks"
hidden: false
createdAt: "2023-01-25T16:46:16.248Z"
updatedAt: "2023-06-05T21:23:14.648Z"
---
You can use Fingerprint with any frontend framework or meta-framework, whether your page is rendered in the browser, on the server, or statically generated. You just need to ensure that loading the Fingerprint JS agent and performing the **visitor analysis happens on the client and not on the server**. 

Since fingerprinting relies on signals from various browser APIs it cannot run outside the browser. Each (meta-)framework has its own way of specifying which code is client-only. If you use any of our [client SDKs](frontend-libraries), it typically handles this for you automatically, but the details can vary depending on the SDK. You can find more information in the respective framework sections below.

This guide will demonstrate the common patterns for Next.js, Nuxt, Gatsby, and Angular Universal.

## Next.js

> 👍 Using our React SDK
> 
> We recommend using the [Fingerprint React SDK](https://github.com/fingerprintjs/fingerprintjs-pro-react) which exposes the `getData` function and its result in a `useVisitorData()` hook. Since hooks cannot be used inside server components or server-side functions, you are forced to do the right thing by default.
> 
> ```typescript
> import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
> 
> export default function Page() {
>   const { data } = useVisitorData();
>   return <div>Your visitorId: {data?.visitorId}</div>;
> }
> ```

In Next.js, the boundary between client and server is defined differently depending on if you are using the `pages` directory (how Next.js worked traditionally) or the new `app` directory (introduced in Next.js 13).

### The `pages` directory

You can import and use the JS agent inside components but not inside `getStaticProps` or `getServerSideProps`. You can still use the JS agent on a page that is server-side rendered or statically generated, just do it in the component itself.

> Note: In this context, "inside the component" means inside an event handler (e.g., `onClick`), a life cycle method (e.g, `componentDidMount`).  or an effect (e.g.,`useEffect`).  Calling the JS agent at the base of the component definition or its render method would also result in `document is not defined` error on server-side rendered pages. 

Examples of correct JS agent usage in a static page (with or without static props) and a server-rendered page:

```typescript src/pages/default.tsx
import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs-pro';
import { useEffect, useState } from 'react';

export default function Fingerprint() {
  const [fingerprintData, setFingerprintData] = useState<GetResult | null>(null);

  // ✅ This works, effects run in the browser only
  useEffect(() => {
    (async () => {
      const fpPromise = FingerprintJS.load({
        apiKey: '<YOUR_PUBLIC_API_KEY>',
        endpoint: '<CUSTOM_SUBDOMAIN_ENDPOINT>',
      });
      const fp = await fpPromise;
      const data = await fp.get({ extendedResult: true });
      setFingerprintData(data);
    })();
  }, []);

  return <div>Your visitorId: {fingerprintData?.visitorId}</div>;
}
```
```typescript src/pages/staticPage.tsx
import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs-pro';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';

export default function ServerSide({ message }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [fingerprintData, setFingerprintData] = useState<GetResult | null>(null);

  // ✅ This works, effects run in the browser only
  useEffect(() => {
    (async () => {
      const fpPromise = FingerprintJS.load({
        apiKey: '<YOUR_PUBLIC_API_KEY>',
        endpoint: '<CUSTOM_SUBDOMAIN_ENDPOINT>',
      });
      const fp = await fpPromise;
      const data = await fp.get({ extendedResult: true });
      setFingerprintData(data);
    })();
  }, []);

  return (
    <>
      <p>{message}</p>
      <p> Your visitorId: {fingerprintData?.visitorId}</p>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  message: string;
}> = async () => {
  return { props: { message: 'This page was statically generated' } };
};
```
```typescript src/pages/serverSide.tsx
import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs-pro';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';

export default function ServerSide({ message }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [fingerprintData, setFingerprintData] = useState<GetResult | null>(null);

  // ✅ This works, effects run in the browser only
  useEffect(() => {
    (async () => {
      const fpPromise = FingerprintJS.load({
        apiKey: '<YOUR_PUBLIC_API_KEY>',
        endpoint: '<CUSTOM_SUBDOMAIN_ENDPOINT>',
      });
      const fp = await fpPromise;
      const data = await fp.get({ extendedResult: true });
      setFingerprintData(data);
    })();
  }, []);

  return (
    <>
      <p>{message}</p>
      <p> Your visitorId: {fingerprintData?.visitorId}</p>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  message: string;
}> = async () => {
  return { props: { message: 'This page was rendered server side' } };
};
```

Some examples of antipatterns: 

```typescript src/pages/serverAntipattern.tsx
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";

// This is an antipattern 
// It's not possible to call Fingerprint agent on the server
// It will result in `document is not defined` ReferenceError
export default function AntipatternGetServerSidePropsPage({ data }) {
  return <pre>{JSON.stringify(data)}</pre>;
}

// ❌ This won't work, this code will run server-side at runtime
export async function getServerSideProps() {
  let data;
  const fpPromise = FingerprintJS.load({
    apiKey: '<YOUR_PUBLIC_API_KEY>',
    endpoint: '<CUSTOM_SUBDOMAIN_ENDPOINT>',
  });

  fpPromise
    .then((fp) => fp.get())
    .then((result) => {
      data = result;
    });

  return {
    props: {
      data: data ?? "document is not defined",
    },
  };
}
```
```typescript src/pages/staticAntipattern.tsx
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";

// This is an antipattern 
// It's not possible to call Fingerprint Pro agent on the server
// It will result in `document is not defined` ReferenceError
export default function AntipatternGetStaticPropsPage({ data }) {
  return <pre>{JSON.stringify(data)}</pre>;
}

// ❌ This won't work, this code will run server-side at build time
export async function getStaticProps() {
  let data;
  const fpPromise = FingerprintJS.load({
    apiKey: '<YOUR_PUBLIC_API_KEY>',
    endpoint: '<CUSTOM_SUBDOMAIN_ENDPOINT>',
  });

  fpPromise
    .then((fp) => fp.get())
    .then((result) => {
      data = result;
    });

  return {
    props: {
      data: data ?? "document is not defined",
    },
  };
}
```
```typescript src/pages/insideRenderAntipattern.tsx
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function AntipatternRenderMethod({
  message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  // ❌ This won't work, this code will run server-side at runtime
  const fpPromise = FingerprintJS.load({
  	apiKey: '<YOUR_PUBLIC_API_KEY>',
  	endpoint: '<CUSTOM_SUBDOMAIN_ENDPOINT>',
  });

  fpPromise
    .then((fp) => fp.get())
    .then((result) => {
      console.log(result.visitorId);
  });

  return (
      <p>{message}</p>
  );
}

export const getServerSideProps: GetServerSideProps<{
  message: string;
}> = async () => {
  return { props: { message: 'This page was rendered on the server at runtime.' } };
};
```

### The `app` directory

All components inside the `app` directory are [server-side by default](https://beta.nextjs.org/docs/rendering/server-and-client-components). To use the JS agent, wrap it inside a component that begins with the `'use client';` directive. This tells Next.js to render the component in the browser only. Then you can use it on a page inside `app`. 

```typescript src/app/yourPage/visitorData.tsx
'use client';

import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs-pro';
import { useEffect, useState } from 'react';

export default function VisitorData() {
  const [fingerprintData, setFingerprintData] = useState<GetResult | null>(null);

  // ✅ This works, effects run in the browser only and
  // you can use useEffect here because of the `use client` directive
  useEffect(() => {
    (async () => {
      const fpPromise = FingerprintJS.load({
        apiKey: '<YOUR_PUBLIC_API_KEY>',
        endpoint: '<CUSTOM_SUBDOMAIN_ENDPOINT>',
      });
      const fp = await fpPromise;
      const data = await fp.get({ extendedResult: true });
      setFingerprintData(data);
    })();
  }, []);

  return (
    <>
      <div>Your visitorId: {fingerprintData?.visitorId}</div>
    </>
  );
};
```
```typescript src/app/yourPage/page.tsx
import VisitorData from './visitorData';

export default async function ServerPage() {
  return (
    <main>
    	<h1>This page in the `app` directory was rendered server-side.</h1>
    	<VisitorData />
    </main>
  );
}
```

If you are using the [Fingerprint React SDK](https://github.com/fingerprintjs/fingerprintjs-pro-react), you need to wrap your app (or the part of it that uses Fingerprint) inside `FpjsProvider`. You can do this by putting the provider in a `layout.tsx` file. Since the provider uses Context under the hood, you either need to turn the entire layout into a client-side component with `'use client';` or wrap the `FpjsProvider` inside a client component:

```typescript src/components/MyFpjsProvider.tsx
'use client';

import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import { PropsWithChildren } from 'react';

export function MyFpjsProvider({ children }: PropsWithChildren) {
  return (
    <FpjsProvider
      loadOptions={{
      	apiKey: '<YOUR_PUBLIC_API_KEY>',
    		endpoint: '<CUSTOM_SUBDOMAIN_ENDPOINT>',
      }}
    >
      {children}
    </FpjsProvider>
  );
}
```
```typescript src/app/layout.tsx
import { MyFpjsProvider } from '../components/FpjsProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <MyFpjsProvider>{children}</MyFpjsProvider>
      </body>
    </html>
  );
}
```
```typescript src/app/yourPage/visitorData.tsx
'use client';

import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

export default function VisitorData() {
  const { data } = useVisitorData();
  return <div>Your visitorId: {data?.visitorId}</div>;
}
```

See the [Next.js documentation](https://beta.nextjs.org/docs) for more details on client and server-side rendering. 

## Nuxt

> 👍 Using our Vue SDK
> 
> Instead of importing the JS agent directly, we recommend you take advantage of the [Fingerprint Vue SDK](https://github.com/fingerprintjs/fingerprintjs-pro-vue). The same principle applies here: 
> 
> - Register Fingerprint as a _client-side_ plugin by creating a `fingerprintjs.client.ts` file inside the `plugins` folder (the `client` suffix is important).
> - Wrap the component using Fingerprint inside the `<ClientOnly>` tag in your app template. 
> 
> See the [SDK Documentation for Vue 3](https://github.com/fingerprintjs/fingerprintjs-pro-vue/blob/main/packages/fingerprintjs-pro-vue-v3/README.md#nuxt) or [Vue 2](https://github.com/fingerprintjs/fingerprintjs-pro-vue/blob/main/packages/fingerprintjs-pro-vue-v2/README.md#nuxt) for more details and examples.

When using Nuxt, make sure to import and call the Fingerprint JS agent in client-side code only. For example, you can create a component that calls the JS client inside its `<script setup>` tag, then wrap the component inside `<ClientOnly>`. 

```html app.vue
<template>
  <div>
    <h1>This Nuxt page is rendered server-side by default</h1>
    <ClientOnly>
      // ✅ This works, `VisitorData` will be rendered in the browser only
      // thanks to the `ClientOnly` wrapper
      <VisitorData />
    </ClientOnly>
  </div>
</template>
```
```html VisitorData.vue
<script>
  const visitorId = ref();
  const fpPromise = import('https://fpjscdn.net/v3/<YOUR_PUBLIC_API_KEY>')
    .then(FingerprintJS => FingerprintJS.load());

  fpPromise
    .then(fp => fp.get())
    .then(result => {
      visitorId.value = result.visitorId
    });
</script>

<template>
  <div>
    <p>Your visitorId is {{visitorId}}</p>
  </div>
</template>
```

Learn more in [Nuxt documentation](https://nuxt.com/docs/api/components/client-only).

## Gatsby

Similar to Next.js, you can use the Fingerprint JS agent inside component effects, event handlers and lifecycle methods. Using it inside `getServerData()`, component render functions and other server-side code will not work.

```typescript index.tsx
import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import FingerprintJS, {GetResult} from '@fingerprintjs/fingerprintjs-pro';

const IndexPage: React.FC<PageProps> = () => {
  const [fingerprintData, setFingerprintData] = React.useState<GetResult | null>(null);

  // ✅ This works, effects run in the browser only
  React.useEffect(() => {
    (async () => {
      const fpPromise = FingerprintJS.load({
        apiKey: '<YOUR_PUBLIC_API_KEY>',
        endpoint: '<CUSTOM_SUBDOMAIN_ENDPOINT>',
      });
      const fp = await fpPromise;
      const data = await fp.get({ extendedResult: true });
      setFingerprintData(data);
    })();
  }, []);

  return (
    <main>
      <h1>This site was statically generated by Gatsby</h1>
      <p>Your visitor id is {fingerprintData?.visitorId}</p>
    </main>
  );
};

export default IndexPage;
```
```typescript serverDataAntipattern.tsx
import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs-pro';

const IndexPage: React.FC<PageProps> = (props) => {
  return (
    <main>
      <h1>This site was statically generated by Gatsby</h1>
      <p>Your visitor id is {props.serverData.visitorData.visitorId}</p>
    </main>
  );
};

// ❌ This will result in a `document is not defined` error
export async function getServerData() {
  const fpPromise = FingerprintJS.load({
    apiKey: '<YOUR_PUBLIC_API_KEY>',
    endpoint: '<CUSTOM_SUBDOMAIN_ENDPOINT>',
  });
  const fp = await fpPromise;
  const visitorData = await fp.get({ extendedResult: true });
  return { props: visitorData };
}

export default IndexPage;
```
```typescript renderMethodAntipattern.tsx
import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import FingerprintJS, { GetResult } from "@fingerprintjs/fingerprintjs-pro";

const IndexPage: React.FC<PageProps> = () => {
  // ❌ This results in `document is not defined` error 
  // during static site generation
  const fpPromise = FingerprintJS.load({
    apiKey: "2UZgp3skqLzfJpFUGUrw",
    endpoint: '<CUSTOM_SUBDOMAIN_ENDPOINT>',
  });

  fpPromise
    .then((fp) => fp.get())
    .then((result) => {
      console.log(result.visitorId);
    });

  return (
    <main>
      <h1>This site was statically generated by Gatsby</h1>
      <p>Your visitor id is {fingerprintData?.visitorId}</p>
    </main>
  );
};

export default IndexPage;
```

See the [Gatsby documentation](https://www.gatsbyjs.com/docs/using-client-side-only-packages/) for more details and alternative approaches to running client-side-only code. For a smoother development experience, consider using the `useVisitorData()` hook from the [Fingerprint React SDK](https://github.com/fingerprintjs/fingerprintjs-pro-react).  

## Angular Universal

> 👍 Using our Angular SDK
> 
> Instead of importing the JS agent directly, you can take advantage of the [Fingerprint Angular SDK](https://github.com/fingerprintjs/fingerprintjs-pro-angular) which supports Angular Universal out of the box. See the [GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-angular) for more details.

When using server-side rendering with Angular Universal, you can use Fingerprint in component constructors and methods as these are executed in the browser only: 

```typescript app.component.ts
import { Component } from '@angular/core';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-angular-app';
  visitorId: string = 'Waiting...';
  
  // ✅ Both of these work 
  constructor() {
    this.getVisitorId();
  }
  
  // ✅ getVisitorId is executed only in the browser 
  handler = () => {
    this.getVisitorId();
  };

  getVisitorId() {
    FingerprintJS.load({
      apiKey: '<YOUR_PUBLIC_API_KEY>',
      endpoint: '<CUSTOM_SUBDOMAIN_ENDPOINT>',
    })
      .then((fp) => fp.get())
      .then((result) => {
        this.visitorId = result.visitorId;
        console.log(result);
      });
  }

}
```

If you need to [check](https://angular.io/api/common/isPlatformBrowser) for the current environment explicitly, you can inject the Angular-provided [`PLATFORM_ID`](https://angular.io/api/core/PLATFORM_ID) constant into your function.

```typescript app.component.ts
import { isPlatformBrowser } from '@angular/common';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

//...
export class AppComponent {
  constructor( @Inject(PLATFORM_ID) platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      this.getVisitorId();
    }
  }
  
 // ...
}
```

Learn more about server-side rendering in the [Angular Universal documentation](https://angular.io/guide/universal).

## Other frameworks

- **Astro** is a multi-page application framework where all pages are static by default with "islands" of client-side interactivity. Use Fingerprint inside an island. Read more about [Astro's island architecture](https://docs.astro.build/en/concepts/islands/). 
- **Remix** is a React meta-framework similar to Next.js.  For information on how to avoid running browser-only code on the server with Remix, see their [Module constraints documentation](https://remix.run/docs/en/v1/guides/constraints#browser-only-code-on-the-server).  
- **SvelteKit** is a Svelte meta-framework providing static generation and server-side rendering capabilities. You can run Fingerprint client-side only inside [event handlers](https://svelte.dev/docs#template-syntax-element-directives-on-eventname), lifecycle methods like [`onMount`](https://svelte.dev/docs#run-time-svelte-onmount) or by checking the `browser` constant in the [`@app/environment` module](https://kit.svelte.dev/docs/modules#$app-environment-browser).

Regardless of the framework you use, the principle is the same. Fingerprint relies on browser-only APIs so you can only run it in the browser, not on the server.