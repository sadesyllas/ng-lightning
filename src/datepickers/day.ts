import {Component, Input, HostBinding, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'td[nglDay]',
  templateUrl: './day.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'gridcell',
  },
})
export class NglDay {

  @Input('nglDay') day: string | number;

  @HostBinding('class.slds-disabled-text')
  @HostBinding('attr.aria-disabled')
  @Input() nglDayDisabled: boolean;

  @HostBinding('class.slds-is-selected')
  @HostBinding('attr.aria-selected')
  @Input() nglDaySelected: boolean;

  get label() {
    return this.day < 10 ? `0${this.day}` : this.day;
  }
}
