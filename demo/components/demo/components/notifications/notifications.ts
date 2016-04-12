import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
    selector: 'demo-notifications',
    directives: [NGL_DIRECTIVES],
    template: require('./notifications.html'),
})
export class DemoNotifications {
  showAlert = false;
}
