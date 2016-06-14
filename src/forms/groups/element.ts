import {Component, Input, ChangeDetectionStrategy, ContentChild, Optional, ElementRef, Renderer, TemplateRef} from '@angular/core';
import {NglFormGroupAlternate} from './group-alt';
import {NglFormGroupCheckbox} from './input';
import {NglFormLabelTemplate, getFormLabel} from '../form-label';
import {NglInternalOutlet} from '../../util/outlet';

@Component({
  selector: 'label[ngl-form-group-element]',
  templateUrl: './element.jade',
  directives: [NglInternalOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglFormGroupElement {
  @ContentChild(NglFormGroupCheckbox) contentEl: NglFormGroupCheckbox;

  @Input('nglFormLabel') label: string;
  @ContentChild(NglFormLabelTemplate) labelTpl: NglFormLabelTemplate;

  get _label(): TemplateRef<any> | string {
    return getFormLabel(this.label, this.labelTpl);
  }

  constructor(@Optional() private groupAlt: NglFormGroupAlternate, private element: ElementRef, private renderer: Renderer) {}

  ngAfterContentInit() {
    const { type } = this.contentEl;

    if (this.groupAlt) {
      this.groupAlt.type = type;
      this.renderer.setElementClass(this.element.nativeElement, 'slds-button' , true);
      this.renderer.setElementClass(this.element.nativeElement, `slds-${type}--button`, true);
    } else {
      this.renderer.setElementClass(this.element.nativeElement, `slds-${type}`, true);
    }
  }
};
