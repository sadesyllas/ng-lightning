import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[nglRatingIcon]'})
export class NglRatingIconTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}
