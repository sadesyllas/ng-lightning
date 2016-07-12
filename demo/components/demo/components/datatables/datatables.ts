import {Component} from '@angular/core';
import {NGL_DIRECTIVES, INglDatatableSort} from '../../../../../dist/ng-lightning';

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

  // Initial sort
  sort: INglDatatableSort = { key: 'rank', order: 'asc' };

  // Custom sort function
  onSort($event: INglDatatableSort) {
    const { key, order } = $event;
    this.data.sort((a: any, b: any) => {
      return (key === 'rank' ? b[key] - a[key] : b[key].localeCompare(a[key])) * (order === 'desc' ? 1 : -1);
    });
  }
}
