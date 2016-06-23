import {Component} from '@angular/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-popovers',
  directives: [NGL_DIRECTIVES],
  template: require('./popovers.html'),
})
export class DemoPopovers {
  placement: string;
  open = true;

  change(placement: string) {
    this.open = true;
    this.placement = placement;
  }
}
