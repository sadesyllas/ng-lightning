import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-breadcrumbs',
  directives: [NGL_DIRECTIVES],
  template: require('./breadcrumbs.html'),
})
export class DemoBreadcrumbs {}
