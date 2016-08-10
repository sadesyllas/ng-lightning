import {Component} from '@angular/core';

@Component({
  selector: 'demo-datepickers',
  template: require('./datepickers.html'),
  styles: [`ngl-datepicker { width: 310px; }`],
})
export class DemoDatepickers {
  date: Date;

  gotoDate() {
    this.date = new Date(2005, 10, 9);
  }
}
