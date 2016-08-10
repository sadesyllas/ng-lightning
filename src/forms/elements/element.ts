import {Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ContentChild, HostBinding, TemplateRef} from '@angular/core';
import {uniqueId} from '../../util/util';
import {NglFormInput, NglFormCheckbox} from './input';
import {NglFormLabelTemplate, getFormLabel} from '../form-label';

@Component({
  selector: 'ngl-form-element',
  templateUrl: './element.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.slds-form-element]': 'true',
  },
  styles: [`:host { display: block; }`],
})
export class NglFormElement {
  @ContentChild(NglFormInput) contentEl: NglFormInput;

  @Input('nglFormLabel') label: string;
  @ContentChild(NglFormLabelTemplate) labelTpl: NglFormLabelTemplate;

  @Input('nglFormError') set setError(error: string) {
    this.error = error;
    if (this.contentEl) {
      this.setInputErrorId();
    }
  }

  @HostBinding('class.slds-has-error') error: string;

  uid = uniqueId('form_element');

  required = false;

  get _label(): TemplateRef<any> | string {
    return getFormLabel(this.label, this.labelTpl);
  }

  get isCheckbox() {
    return this.contentEl instanceof NglFormCheckbox;
  }

  constructor(public detector: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.contentEl.setup(this.uid);
    this.setInputErrorId();
  }

  private setInputErrorId() {
    this.contentEl.describedBy = this.error ? `error_${this.uid}` : null;
  }
};
