import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[ngl-modal-footer]'})
export class NglModalFooter {
  constructor(public templateRef: TemplateRef<any>) {}
}
