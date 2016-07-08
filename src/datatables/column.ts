import {Directive, Input, ContentChild} from '@angular/core';
import {NglDatatableCell} from './cell';

@Directive({
  selector: 'ngl-datatable-column',
})
export class NglDatatableColumn {
  @Input() heading: string;
  @Input() key: string;
  @ContentChild(NglDatatableCell) cellTpl: NglDatatableCell;
};
