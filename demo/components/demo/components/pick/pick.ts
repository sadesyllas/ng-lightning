import { Component } from '@angular/core';

@Component({
  selector: 'demo-pick',
  template: require('./pick.html'),
})
export class DemoPick {
  selected = 'middle';
  multiple = ['middle', 'right'];
  multipleObject = {
    left: true,
    middle: true,
  };
}
