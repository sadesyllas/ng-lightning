import {Component, ChangeDetectionStrategy} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'tr[nglWeekdays]',
  templateUrl: './weekdays.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglDatepickerWeekdays {

  weekdays: any[] = [];

  constructor(private datePipe: DatePipe) {
    this.render();
  }

  render() {
    let dayNumber = 11; // 11 August 2013 is Sunday

    for (let i = 0; i < 7; i++) {
      const date = new Date(2013, 7, dayNumber++, 12);
      this.weekdays.push({
        id: `weekday-${i}`,
        label: this.datePipe.transform(date, 'EEE'),
        title: this.datePipe.transform(date, 'EEEE'),
      });
    }
  }
}
