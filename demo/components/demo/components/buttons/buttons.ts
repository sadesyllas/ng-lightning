import {Component} from '@angular/core';

@Component({
  selector: 'demo-buttons',
  template: require('./buttons.html'),
})
export class DemoButtons {

  selected: boolean = true;
  iconType: string = 'border';
  sizes: string[] = ['x-small', 'small', 'large'];

  change() {
    this.selected = !this.selected;
    this.iconType = this.iconType === 'border' ? 'container' : 'border';
  }
}
