import {Component} from '@angular/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-datepickers',
  directives: [NGL_DIRECTIVES],
  template: require('./datepickers.html'),
  styles: [`ngl-datepicker { width: 310px; }`],
})
export class DemoDatepickers {
  date: string;
}
