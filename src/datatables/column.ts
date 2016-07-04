import {Directive, Input, ContentChild} from '@angular/core';
import {NglDatatableCell} from './cell';

@Directive({
  selector: 'ngl-datatable-column',
})
export class NglDatatableColumn {
  @Input() heading: string;
  @Input() dataKey: string;
  @ContentChild(NglDatatableCell) cellTpl: NglDatatableCell;
};
