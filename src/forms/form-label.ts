import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[nglFormLabel]'})
export class NglFormLabelTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}

export function getFormLabel(label: string, labelTemplate: NglFormLabelTemplate): string | TemplateRef<any> {
  if (label) return label;
  return labelTemplate ? labelTemplate.templateRef : '';
}
