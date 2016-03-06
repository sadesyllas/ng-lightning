import {provideNglConfig} from 'ng-lightning/ng-lightning';

bootstrap(App, [
  ...
  provideNglConfig( /* optional configuration object with overrides */ ),
  ...
]);
