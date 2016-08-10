import {Component, Input, ChangeDetectionStrategy, HostBinding, ContentChild, TemplateRef} from '@angular/core';
import {uniqueId} from '../../util/util';
import {NglFormLabelTemplate, getFormLabel} from '../form-label';

@Component({
  selector: 'fieldset[ngl-form-group]',
  templateUrl: './group.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.slds-form-element]': 'true',
  },
})
export class NglFormGroup {

  @Input('nglFormLabel') label: string;
  @ContentChild(NglFormLabelTemplate) labelTpl: NglFormLabelTemplate;

  @HostBinding('class.slds-has-error')
  @Input('nglFormError') error: string;

  @Input('nglFormRequired') required: boolean;

  uid = uniqueId('form_group');

  get _label(): TemplateRef<any> | string {
    return getFormLabel(this.label, this.labelTpl);
  }
};
