import {Component} from '@angular/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-datatables',
  directives: [NGL_DIRECTIVES],
  template: require('./datatables.html'),
})
export class DemoDatatables {

  data = [
    { rank: 1, name: 'Kareem', surname: 'Abdul-Jabbar', points: 38387 },
    { rank: 2, name: 'Karl', surname: 'Malone', points: 36928 },
    { rank: 3, name: 'Kobe', surname: 'Bryant', points: 33643 },
    { rank: 4, name: 'Michael', surname: 'Jordan', points: 32292 },
    { rank: 5, name: 'Wilt', surname: 'Chamberlain', points: 31419 },
  ];
}
