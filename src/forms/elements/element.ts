import {Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ContentChild, HostBinding} from '@angular/core';
import {uniqueId} from '../../util/util';
import {NglFormInput, NglFormCheckbox} from './input';

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

  uid = uniqueId('form_element');

  @Input() label: string;

  @Input('error') set setError(error: string) {
    this._error = error;
    if (this.contentEl) {
      this.setInputErrorId();
    }
  }

  @HostBinding('class.slds-has-error')
  get error() {
    return this._error;
  }

  get isCheckbox() {
    return this.contentEl instanceof NglFormCheckbox;
  }

  @Input('_required') required: boolean;

  private _error: string;

  constructor(public detector: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.contentEl.id = this.uid;
    this.setInputErrorId();
  }

  private setInputErrorId() {
    this.contentEl.describedBy = this.error ? `error_${this.uid}` : null;
  }
};
