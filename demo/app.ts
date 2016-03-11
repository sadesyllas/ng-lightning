import './vendor';
import {Component, provide, enableProdMode} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {bootstrap} from 'angular2/platform/browser';

import {provideNglConfig} from '../dist/ng-lightning';

import {IntroRoute} from './components/intro/intro';
import {DemoRoute} from './components/demo/demo';
import {SupportRoute} from './components/support/support';

declare const __ENV__: any;
if (__ENV__.production) {
  enableProdMode();
}

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    template: require('./app.jade')(__ENV__),
})
@RouteConfig([
  { path: '/', name: 'Intro', component: IntroRoute, useAsDefault: true },
  { path: '/components', name: 'Components', component: DemoRoute },
  { path: '/support', name: 'Support', component: SupportRoute },
])
export class App {}

bootstrap(App, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  provideNglConfig(),
]);
