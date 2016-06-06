import {Component} from '@angular/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-forms',
  directives: [NGL_DIRECTIVES],
  template: require('./forms.html'),
})
export class DemoForms {
  error = 'The input has an error!';
}
