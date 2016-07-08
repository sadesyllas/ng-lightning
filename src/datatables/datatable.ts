import {Component, Input, ChangeDetectorRef, ContentChildren, QueryList, ElementRef, Renderer, HostBinding} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {NglDatatableColumn} from './column';
import {NglInternalDatatableCell} from './_cell';

@Component({
  selector: 'table[ngl-datatable]',
  templateUrl: './datatable.jade',
  directives: [NglInternalDatatableCell],
})
export class NglDatatable {

  @Input() data: any[] = [];
  @Input() trackByKey: string;

  @HostBinding('class.slds-table--bordered')
  @Input() bordered = true;

  @HostBinding('class.slds-table--striped')
  @Input() striped = true;

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

  ngAfterContentInit() {
    this._columnsSubscription = this.columns.changes.subscribe(() => this.detector.markForCheck());
  }

  ngOnDestroy() {
    this._columnsSubscription.unsubscribe();
  }
};
