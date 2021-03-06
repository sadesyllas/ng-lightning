import 'core-js/client/shim';
import 'zone.js/dist/zone';

import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {NglDemoModule} from './app.module';

if (__ENV__.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(NglDemoModule);
