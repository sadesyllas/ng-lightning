import './vendor';
import {Component, enableProdMode} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {APP_ROUTER_PROVIDERS} from './routes';

import {provideNglConfig} from '../dist/ng-lightning';

if (__ENV__.production) {
  enableProdMode();
}

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  template: require('./app.jade')(__ENV__),
})
export class App {}

bootstrap(App, [
  APP_ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  provideNglConfig({ picklist: { filterPlaceholder: 'Filter Options' } }),
]);
