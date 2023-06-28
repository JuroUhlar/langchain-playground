---
title: "Angular SDK"
slug: "angular"
hidden: false
createdAt: "2022-06-08T07:09:01.250Z"
updatedAt: "2023-06-05T21:50:47.380Z"
---
The [Fingerprint Angular SDK](https://github.com/fingerprintjs/fingerprintjs-pro-angular) is an easy way to integrate Fingerprint into your Angular application. It supports all capabilities of the JS agent and provides a built-in caching mechanism. 

### How to install

Add `@fingerprintjs/fingerprintjs-pro-angular` as a dependency to your application via npm or yarn.

```
npm install @fingerprintjs/fingerprintjs-pro-angular
```

```
yarn add @fingerprintjs/fingerprintjs-pro-angular
```

Add `FingerprintjsProAngularModule.forRoot()` to the imports sections in your root application module. You need to specify your public API key and other configuration options based on your chosen region and active integration.

```typescript
// src/app/app.module.ts
import { NgModule } from '@angular/core'
import {
  FingerprintjsProAngularModule
} from '@fingerprintjs/fingerprintjs-pro-angular'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FingerprintjsProAngularModule.forRoot({
      loadOptions: {
        apiKey: "<PUBLIC_API_KEY>",
        // region: "eu",
        // endpoint: "<CUSTOM_ENDPOINT>",
        // scriptUrlPattern: "<CUSTOM_SCRIPT_URL>"
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Inject the `FingerprintjsProAngularService` in your component's constructor. Now you can identify visitors using the `getVisitorData()` method from the service.

```typescript
// src/app/home/home.component.ts
import {Component} from '@angular/core'
import {
  ExtendedGetResult,
  FingerprintjsProAngularService,
  GetResult,
} from '@fingerprintjs/fingerprintjs-pro-angular'

@Component({
  selector: 'app-home',
  template: `
    <div>
      <button (click)="onIdentifyButtonClick()">Identify</button>
      <p>VisitorId: {{ visitorId }}</p>
    </div>
  `,
})
export class HomeComponent {
  constructor(
    private fingerprintService: FingerprintjsProAngularService
  ) {}

  visitorId = 'Press "Identify" button to get visitorId'
  extendedResult: null | ExtendedGetResult | GetResult = null

  async onIdentifyButtonClick(): Promise<void> {
    const data = await this.fingerprintService.getVisitorData()
    this.visitorId = data.visitorId
    this.extendedResult = data
  }
}
```

### Documentation

You can find the full documentation in the official [GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-angular). The repository also contains [an example app](https://github.com/fingerprintjs/fingerprintjs-pro-angular/tree/main/src) demonstrating the usage of the library.