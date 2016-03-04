import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-badges',
  directives: [NGL_DIRECTIVES],
  template: require('./badges.html'),
})
export class DemoBadges {

  type = 'inverse';

  private types: string[] = ['default', 'shade', 'inverse'];

  change() {
    this.type = this.types[(this.types.indexOf(this.type) + 1) % 3];
  }
}
