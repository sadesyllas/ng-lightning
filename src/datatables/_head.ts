import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding, ElementRef, Renderer} from '@angular/core';

@Component({
  selector: 'th[ngl-internal-datatatable-head]',
  templateUrl: './_head.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'scope': 'col',
  },
})
export class NglInternalDatatableHeadCell {

  @HostBinding('attr.title')
  @Input() heading: string;

  @HostBinding('class.slds-is-sortable')
  @Input() sortable: boolean;

  @Input() set sortOrder(order: 'asc' | 'desc') {
    this._sortOrder = order;
    this.renderer.setElementClass(this.element.nativeElement, 'slds-is-sorted--asc', this.sortOrder === 'asc');
    this.renderer.setElementClass(this.element.nativeElement, 'slds-is-sorted--desc', this.sortOrder === 'desc');
  }
  get sortOrder() {
    return this._sortOrder;
  }

  @HostBinding('class.slds-is-sorted') get isSorted() {
    return !!this.sortOrder;
  }

  @HostBinding('attr.aria-sort')
  get ariaSort() {
    return this.sortOrder ? `${this.sortOrder}ending` : null;
  }

  @Output() onSort = new EventEmitter();

  private _sortOrder: 'asc' | 'desc';

  constructor(private element: ElementRef, private renderer: Renderer) {}

  sortChange() {
    this.onSort.emit(this.sortOrder === 'desc' ? 'asc' : 'desc');
  }
}
