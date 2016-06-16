import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'ngl-date-year',
  templateUrl: './year.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglDatepickerYear {

  // How many years before and after the current one are selectable in dropdown
  @Input() numYearsBefore: number = 100;
  @Input() numYearsAfter: number = 10;

  year: number;
  @Input('year') set setYear(year: string | number) {
    this.year = +year;
  }
  @Output() yearChange = new EventEmitter();

  get range(): number[] {
    const currentYear = (new Date()).getFullYear();
    const firstYear = Math.min(currentYear - this.numYearsBefore, this.year);
    const size = Math.max(currentYear + this.numYearsAfter, this.year) - firstYear;
    return Array.apply(null, {length: size + 1}).map((value: any, index: number) => firstYear + index);
  }

  change($event: string) {
    this.yearChange.emit($event);
  }
}
