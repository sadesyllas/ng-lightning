import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[nglLoadingOverlay]'})
export class NglDatatableLoadingOverlay {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({selector: 'template[nglNoRowsOverlay]'})
export class NglDatatableNoRowsOverlay {
  constructor(public templateRef: TemplateRef<any>) {}
}
