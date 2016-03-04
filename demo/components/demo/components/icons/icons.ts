import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
    selector: 'demo-icons',
    directives: [NGL_DIRECTIVES],
    template: require('./icons.html'),
})
export class DemoIcons {

    icon: string = 'announcement';
    size: string = 'large';

    change() {
      this.size = this.size === 'large' ? 'small' : 'large';
    }
}
