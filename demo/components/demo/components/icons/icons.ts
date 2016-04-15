import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-icons',
  directives: [NGL_DIRECTIVES],
  template: require('./icons.html'),
})
export class DemoIcons {

  icons = [
    { icon: 'announcement' },
    { category: 'standard', icon: 'case_comment', size: 'large' },
    { category: 'custom', icon: '2', size: 'large' },
  ];

  icon = this.icons[0];

  change() {
    this.icon = this.icons[(this.icons.indexOf(this.icon) + 1) % this.icons.length];
  }
}
