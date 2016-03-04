import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-images',
  directives: [NGL_DIRECTIVES],
  template: require('./images.html'),
})
export class DemoAvatars {
  type = 'rectangle';
  size = 'medium';
  src = 'assets/images/avatar1.jpg';

  private types: string[] = ['circle', 'rectangle'];
  private sizes: string[] = ['x-small', 'small', 'medium', 'large'];

  changeType() {
    this.type = this.types[(this.types.indexOf(this.type) + 1) % 2];
  }

  changeSize() {
    this.size = this.sizes[(this.sizes.indexOf(this.size) + 1) % 4];
  }
};
