import {NGL_CONFIG} from 'ng-lightning/ng-lightning';

bootstrap(App, [
  ...
  provide(NGL_CONFIG, {useValue: {}}),
  ...
]);
