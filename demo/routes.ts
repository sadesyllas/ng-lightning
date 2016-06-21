import { provideRouter, RouterConfig } from '@angular/router';

import {IntroRoute} from './components/intro/intro';
import {DemoRoute} from './components/demo/demo';
import {SupportRoute} from './components/support/support';

export const routes: RouterConfig = [
  { path: '', component: IntroRoute },
  { path: 'components', component: DemoRoute},
  { path: 'support', component: SupportRoute},
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
