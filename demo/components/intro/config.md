import {NglConfig} from 'ng-lightning/ng-lightning';

@Component({
  ...
  providers: [NglConfig]
})
export class AppComponent {

  constructor(private config: NglConfig) {
    config.svgPath = '/my/path'; // Override this specific property
  }

}
