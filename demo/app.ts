import 'angular2/bundles/angular2-polyfills';
import {Component, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {bootstrap} from 'angular2/platform/browser';

import {NGL_CONFIG} from '../dist/ng-lightning';

import {IntroRoute} from './components/intro/intro';
import {DemoRoute} from './components/demo/demo';
import {SupportRoute} from './components/support/support';


@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    template: require('./app.jade')({ now: __NOW__, version: __VERSION__ }),
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
  provide(NGL_CONFIG, { useValue: {} }),
]);
