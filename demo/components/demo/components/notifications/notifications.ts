import {Component} from '@angular/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-notifications',
  directives: [NGL_DIRECTIVES],
  template: require('./notifications.html'),
})
export class DemoNotifications {
  showAlert = false;

  show() {
    this.showAlert = true;
  }

  onClose(reason: string) {
    console.log(`Alert closed by ${reason}`);
    this.showAlert = false;
  }
}
