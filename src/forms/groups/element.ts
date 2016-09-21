import {Component, Input, ChangeDetectionStrategy, ContentChild, Optional, ElementRef, Renderer, TemplateRef} from '@angular/core';
import {NglFormGroupAlternate} from './group-alt';
import {NglFormGroupCheckbox} from './input';
import {NglFormLabelTemplate, getFormLabel} from '../form-label';

@Component({
  selector: 'label[ngl-form-group-element]',
  templateUrl: './element.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglFormGroupElement {
  @ContentChild(NglFormGroupCheckbox) contentEl: NglFormGroupCheckbox;

  @Input('label') labelStr: string;
  @ContentChild(NglFormLabelTemplate) labelTpl: NglFormLabelTemplate;

  _label: TemplateRef<any> | string;

  constructor(@Optional() private groupAlt: NglFormGroupAlternate, private element: ElementRef, private renderer: Renderer) {}

  ngOnChanges() {
    this.setFormLabel();
  }

  ngAfterContentInit() {
    const { type } = this.contentEl;

    if (this.groupAlt) {
      this.groupAlt.type = type;
      this.renderer.setElementClass(this.element.nativeElement, 'slds-button' , true);
      this.renderer.setElementClass(this.element.nativeElement, `slds-${type}--button`, true);
    } else {
      this.renderer.setElementClass(this.element.nativeElement, `slds-${type}`, true);
    }

    this.setFormLabel();
  }

  private setFormLabel() {
    this._label = getFormLabel(this.labelStr, this.labelTpl);
  }
};
