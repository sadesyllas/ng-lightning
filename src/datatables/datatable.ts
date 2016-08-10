import {Component, Input, ChangeDetectorRef, ContentChildren, QueryList, ElementRef, Renderer, HostBinding, Output, EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {NglDatatableColumn} from './column';

export interface INglDatatableSort {
  key: string;
  order: 'asc' | 'desc';
};

@Component({
  selector: 'table[ngl-datatable]',
  templateUrl: './datatable.jade',
})
export class NglDatatable {

  @Input() data: any[] = [];
  @Input() trackByKey: string;

  @HostBinding('class.slds-table--bordered')
  @Input() bordered = true;

  @HostBinding('class.slds-table--striped')
  @Input() striped = true;

  @Input() sort: INglDatatableSort;
  @Output() sortChange = new EventEmitter<INglDatatableSort>();

  @ContentChildren(NglDatatableColumn) columns: QueryList<NglDatatableColumn>;

  private _columnsSubscription: Subscription;

  constructor(private detector: ChangeDetectorRef, element: ElementRef, renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'slds-table', true);
  }

  columnTrackBy(index: number, column: NglDatatableColumn) {
    return column.key || index;
  }

  dataTrackBy(index: number, data: any) {
    return this.trackByKey ? data[this.trackByKey] : index;
  }

  onColumnSort(column: NglDatatableColumn, order: 'asc' | 'desc') {
    const key = column.key;
    if (!key) {
      throw new Error(`ng-lightning: No "key" property is set for sortable column "${column.heading}"`);
    }
    this.sortChange.emit({key, order});
  }

  getColumnSortOrder(column: NglDatatableColumn) {
    return this.sort && column.key === this.sort.key ? this.sort.order : null;
  }

  ngAfterContentInit() {
    this._columnsSubscription = this.columns.changes.subscribe(() => this.detector.markForCheck());
  }

  ngOnDestroy() {
    this._columnsSubscription.unsubscribe();
  }
};
