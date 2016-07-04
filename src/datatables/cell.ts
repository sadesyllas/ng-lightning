import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[nglDatatableCell]'})
export class NglDatatableCell {
  constructor(public templateRef: TemplateRef<any>) {}
}
