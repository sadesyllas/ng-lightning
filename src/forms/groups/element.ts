import {Component, Input, ChangeDetectionStrategy, ContentChild, Optional, ElementRef, Renderer, TemplateRef} from '@angular/core';
import {NglFormGroupAlternate} from './group-alt';
import {NglFormCheckbox} from '../elements/input';
import {NglFormLabelTemplate, getFormLabel} from '../form-label';
import {uniqueId} from '../../util/util';

@Component({
  selector: 'ngl-form-group-element',
  templateUrl: './element.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglFormGroupElement {
  @ContentChild(NglFormCheckbox) contentEl: NglFormCheckbox;

  @Input('label') labelStr: string;
  @ContentChild(NglFormLabelTemplate) labelTpl: NglFormLabelTemplate;

  _label: TemplateRef<any> | string;

  uid = uniqueId('form_element');

  get labelClass() {
    return `slds-${this.contentEl.type}${this.groupAlt ? '--button' : ''}__label`;
  }

  constructor(@Optional() private groupAlt: NglFormGroupAlternate, private element: ElementRef, private renderer: Renderer) {}

  ngOnChanges() {
    this.setFormLabel();
  }

  ngAfterContentInit() {
    if (!this.contentEl) {
      throw Error(`Couldn't find an input radio or checkbox with [nglFormControl] attribute inside <ngl-form-group-element>`);
    }

    const { type } = this.contentEl;

    if (this.groupAlt) {
      this.groupAlt.type = type;
      this.renderer.setElementClass(this.element.nativeElement, 'slds-button' , true);
      this.renderer.setElementClass(this.element.nativeElement, `slds-${type}--button`, true);
    } else {
      this.renderer.setElementClass(this.element.nativeElement, `slds-${type}`, true);
    }

    this.contentEl.id = this.uid;
    this.setFormLabel();
  }

  private setFormLabel() {
    this._label = getFormLabel(this.labelStr, this.labelTpl);
  }
};
