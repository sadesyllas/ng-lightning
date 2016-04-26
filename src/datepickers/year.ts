import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'ngl-date-year',
  templateUrl: './year.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglDatepickerYear {

  @Input() size = 15;

  year: number;
  @Input('year') set setYear(year: string | number) {
    this.year = +year;
  }
  @Output() yearChange = new EventEmitter(false);

  get range(): number[] {
    return Array.apply(null, {length: this.size}).map((value: any, index: number) => +this.year - Math.floor(this.size / 2) + index);
  }

  change($event: string) {
    this.yearChange.emit($event);
  }
}
