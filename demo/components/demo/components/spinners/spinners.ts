import {Component} from '@angular/core';

@Component({
  selector: 'demo-spinners',
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
