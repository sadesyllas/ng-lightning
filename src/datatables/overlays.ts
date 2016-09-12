import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[nglLoadingOverlay]'})
export class NglDatatableLoadingOverlay {
  constructor(public templateRef: TemplateRef<any>) {}
}
