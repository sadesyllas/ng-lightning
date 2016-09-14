import {Directive, Input, ContentChild} from '@angular/core';
import {NglDatatableCell} from './cell';
import {NglDatatableHeadingTemplate} from './heading';
import {toBoolean} from '../util/util';

@Directive({
  selector: 'ngl-datatable-column',
})
export class NglDatatableColumn {
  @Input() heading: string;
  @Input() key: string;
  @Input() cellClass: any;
  @ContentChild(NglDatatableCell) cellTpl: NglDatatableCell;
  @ContentChild(NglDatatableHeadingTemplate) headingTpl: NglDatatableHeadingTemplate;

  @Input() set sortable(sortable: string | boolean) {
    this._sortable = toBoolean(sortable);
  }
  get sortable() {
    return this._sortable;
  }

  private _sortable = false;
};
