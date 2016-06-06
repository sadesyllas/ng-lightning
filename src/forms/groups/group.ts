import {Component, Input, ChangeDetectionStrategy, HostBinding} from '@angular/core';
import {uniqueId} from '../../util/util';

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

  @HostBinding('class.slds-has-error')
  @Input('nglFormError') error: string;

  @Input('nglFormRequired') required: boolean;

  uid = uniqueId('form_group');
};
