import {Component} from '@angular/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
    selector: 'demo-spinners',
    directives: [NGL_DIRECTIVES],
    template: require('./spinners.html'),
})
export class DemoSpinners {

    type: string = null;
    size: string = 'large';

    change() {
      this.type = this.type === 'brand' ? null : 'brand';
      this.size = this.size === 'large' ? 'small' : 'large';
    }
}
