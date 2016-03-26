import { Component } from 'angular2/core';
import { NGL_DIRECTIVES } from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-pick',
  directives: [NGL_DIRECTIVES],
  template: require('./pick.html'),
})
export class DemoPick {
  selected = 'middle';
}
