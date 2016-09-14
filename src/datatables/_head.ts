import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding} from '@angular/core';

@Component({
  selector: 'th[ngl-internal-datatatable-head]',
  templateUrl: './_head.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'scope': 'col',
    '[class.slds-is-sorted--asc]': `sortOrder === 'asc'`,
    '[class.slds-is-sorted--desc]': `sortOrder === 'desc'`,
    '[class.slds-is-sorted]': `!!sortOrder`,
  },
})
export class NglInternalDatatableHeadCell {

  @HostBinding('attr.title')
  @Input() heading: string;

  @HostBinding('class.slds-is-sortable')
  @Input() sortable: boolean;

  @Input() sortOrder: 'asc' | 'desc';

  @HostBinding('attr.aria-sort')
  get ariaSort() {
    return this.sortOrder ? `${this.sortOrder}ending` : null;
  }

  @Output() onSort = new EventEmitter();

  sortChange() {
    this.onSort.emit(this.sortOrder === 'desc' ? 'asc' : 'desc');
  }
}
