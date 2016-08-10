import './vendor';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {NglDemoModule} from './app.module';

if (__ENV__.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(NglDemoModule);
