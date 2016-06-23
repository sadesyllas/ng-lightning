import {Component} from '@angular/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-buttons',
  directives: [NGL_DIRECTIVES],
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
