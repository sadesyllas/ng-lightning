import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[nglPicklistItem]'})
export class NglPicklistItemTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
