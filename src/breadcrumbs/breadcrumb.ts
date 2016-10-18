import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[nglBreadcrumb]',
})
export class NglBreadcrumb {
  constructor(public templateRef: TemplateRef<any>) {}
}
