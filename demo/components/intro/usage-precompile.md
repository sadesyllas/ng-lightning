import {NGL_DIRECTIVES, NGL_PRECOMPILE} from 'ng-lightning/ng-lightning';

@Component({
  ...
  precompile: [NGL_PRECOMPILE],
  ...
})
export class App {
  ...
}
