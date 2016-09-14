import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[nglDatatableHeading]'})
export class NglDatatableHeadingTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
