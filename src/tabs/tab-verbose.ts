import {Directive, Input, TemplateRef, Output, EventEmitter, ContentChild} from '@angular/core';
import {NglTab} from './tab';

/*
 * <ngl-tab [heading="..."]>
 *    <template ngl-tab-heading>...</template>
 *    <template ngl-tab-content>
 *       Content goes here...
 *    </template>
 * </ngl-tab>
 */
@Directive({selector: 'template[ngl-tab-heading]'})
export class NglTabHeading {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({selector: 'template[ngl-tab-content]'})
export class NglTabContent {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
  selector: 'ngl-tab',
  providers: [ {provide: NglTab, useExisting: NglTabVerbose} ],
})
export class NglTabVerbose extends NglTab {
  @Input('nglTabId') id: string;
  @Input() heading: string | TemplateRef<any>;
  @Output() onActivate = new EventEmitter<NglTab>(false);
  @Output() onDeactivate = new EventEmitter<NglTab>(false);

  @ContentChild(NglTabContent) contentTemplate: NglTabContent;
  @ContentChild(NglTabHeading) headingTemplate: NglTabHeading;

  ngAfterContentInit() {
    if (this.headingTemplate) {
      this.heading = this.headingTemplate.templateRef;
    }
    this.templateRef = this.contentTemplate.templateRef;
  }
}
