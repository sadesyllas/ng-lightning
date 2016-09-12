import {Component} from '@angular/core';

@Component({
  selector: 'demo-ratings',
  template: require('./ratings.html'),
})
export class DemoRatings {
  value = 4;
  readonly = false;
  size = 'small';

  private sizes = ['x-small', 'small', '', 'large'];

  changeSize() {
    this.size = this.sizes[(this.sizes.indexOf(this.size) + 1) % this.sizes.length];
  }

  customImage(isActive: boolean) {
    return `assets/images/avatar${isActive ? 3 : 2}.jpg`;
  }
}
