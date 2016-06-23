import {Component} from '@angular/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-modals',
  directives: [NGL_DIRECTIVES],
  template: require('./modals.html'),
})
export class DemoModals {

  opened: boolean = false;
  size: string;

  open(size: string) {
    this.size = size;
    this.opened = !this.opened;
  }

  cancel() {
    this.opened = false;
  }
}
