import {Component, Input, ChangeDetectionStrategy, HostBinding} from '@angular/core';
import {NglFormGroup} from './group';

@Component({
  selector: 'fieldset[ngl-form-group-alt]',
  templateUrl: './group-alt.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.slds-form-element]': 'true',
  },
})
export class NglFormGroupAlternate extends NglFormGroup {

  @Input('nglFormLabel') label: string;

  @HostBinding('class.slds-has-error')
  @Input('nglFormError') error: string;

  @Input('nglFormRequired') required: boolean;

  @Input() type: string;
};
