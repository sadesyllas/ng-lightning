import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: '[nglInternalOutlet]',
  template: `{{content}}<template [ngTemplateOutlet]="contentTemplate"></template>`,
})
export class NglInternalOutlet {
  @Input() nglInternalOutlet: string | TemplateRef<any>;

  content: string;
  contentTemplate: TemplateRef<any>;

  ngOnChanges() {
    [this.content, this.contentTemplate] = this.nglInternalOutlet instanceof TemplateRef
                                            ? ['', <TemplateRef<any>>this.nglInternalOutlet]
                                            : [<string>this.nglInternalOutlet, null];
  }
}
