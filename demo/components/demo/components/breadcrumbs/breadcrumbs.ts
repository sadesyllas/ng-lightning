import {Component} from '@angular/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-breadcrumbs',
  directives: [NGL_DIRECTIVES],
  template: require('./breadcrumbs.html'),
})
export class DemoBreadcrumbs {}
