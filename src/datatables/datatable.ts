import {Component, Input, ChangeDetectorRef, ContentChild, ContentChildren, QueryList, ElementRef, Renderer, HostBinding, Output, EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {NglDatatableColumn} from './column';
import {NglDatatableLoadingOverlay, NglDatatableNoRowsOverlay} from './overlays';

export interface INglDatatableSort {
  key: string;
  order: 'asc' | 'desc';
};

export interface INglDatatableRowClick {
  event: Event;
  data: any;
};

@Component({
  selector: 'table[ngl-datatable]',
  templateUrl: './datatable.jade',
  host: {
    '[class.slds-is-relative]': 'loading',
  },
  styles: [`
    .ngl-datatable-loading {
      position: absolute;
      z-index: 1;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(255, 255, 255, 0.5)
    }
  `],
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

  @Input() loading: boolean = false;
  @ContentChild(NglDatatableLoadingOverlay) loadingOverlay: NglDatatableLoadingOverlay;
  get showLoading() {
    return this.loading && this.loadingOverlay;
  }

  @ContentChild(NglDatatableNoRowsOverlay) noRowsOverlay: NglDatatableNoRowsOverlay;

  get hasRows() {
    return this.data && this.data.length > 0;
  }

  @ContentChildren(NglDatatableColumn) columns: QueryList<NglDatatableColumn>;

  @Output() onRowClick = new EventEmitter<INglDatatableRowClick>();

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

  rowClick(event: Event, data: any) {
    this.onRowClick.emit({ event, data });
  }

  ngAfterContentInit() {
    this._columnsSubscription = this.columns.changes.subscribe(() => this.detector.markForCheck());
  }

  ngOnDestroy() {
    this._columnsSubscription.unsubscribe();
  }
};
