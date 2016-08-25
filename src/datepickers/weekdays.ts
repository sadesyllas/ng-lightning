import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'tr[nglWeekdays]',
  templateUrl: './weekdays.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglDatepickerWeekdays {

  @Input() dayNamesShort: string[];
  @Input() dayNamesLong: string[];

  weekdays: any[] = [];

  ngOnChanges() {
    for (let i = 0; i < 7; i++) {
      this.weekdays.push({
        id: `weekday-${i}`,
        label: this.dayNamesShort[i],
        title: this.dayNamesLong[i],
      });
    }
  }
}
