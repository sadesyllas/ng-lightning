import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
    selector: 'demo-ratings',
    directives: [NGL_DIRECTIVES],
    template: require('./ratings.html'),
})
export class DemoRatings {
  value = 4;
  readonly = false;
}
