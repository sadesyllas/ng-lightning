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

  @Input('label') labelStr: string;
  @ContentChild(NglFormLabelTemplate) labelTpl: NglFormLabelTemplate;

  @Input('error') set setError(error: string) {
    this.error = error;
    if (this.contentEl) {
      this.setInputErrorId();
    }
  }

  @HostBinding('class.slds-has-error') error: string;

  uid = uniqueId('form_element');

  required = false;

  _label: TemplateRef<any> | string;

  get isCheckbox() {
    return this.contentEl instanceof NglFormCheckbox;
  }

  constructor(public detector: ChangeDetectorRef) {}

  ngOnChanges() {
    this.setFormLabel();
  }

  ngAfterContentInit() {
    this.contentEl.setup(this.uid);
    this.setInputErrorId();
    this.setFormLabel();
  }

  private setInputErrorId() {
    this.contentEl.describedBy = this.error ? `error_${this.uid}` : null;
  }

  private setFormLabel() {
    this._label = getFormLabel(this.labelStr, this.labelTpl);
  }
};
