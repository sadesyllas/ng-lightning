import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
    selector: 'demo-paginations',
    directives: [NGL_DIRECTIVES],
    template: require('./paginations.html'),
})
export class DemoPaginations {
  total = 62;
}
