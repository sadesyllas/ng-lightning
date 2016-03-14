import { Component } from 'angular2/core';
import { NGL_DIRECTIVES } from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-button-groups',
  directives: [NGL_DIRECTIVES],
  template: require('./button-groups.html'),
})
export class DemoButtonGroups {
  selected = 'middle';
}
