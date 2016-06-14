import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: '[nglInternalOutlet]',
  template: `{{content}}<template [ngTemplateOutlet]="contentTemplate"></template>`,
})
export class NglInternalOutlet {
  @Input() nglInternalOutlet: string | TemplateRef<any>;

  get content() {
    return this.nglInternalOutlet instanceof TemplateRef ? '' : this.nglInternalOutlet;
  }

  get contentTemplate() {
    return this.nglInternalOutlet instanceof TemplateRef ? this.nglInternalOutlet : null;
  }
};
