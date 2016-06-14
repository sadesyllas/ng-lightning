import {Component, Input, ChangeDetectionStrategy, HostBinding, ContentChild} from '@angular/core';
import {NglFormGroup} from './group';
import {NglFormLabelTemplate} from '../form-label';
import {NglInternalOutlet} from '../../util/outlet';

@Component({
  selector: 'fieldset[ngl-form-group-alt]',
  templateUrl: './group-alt.jade',
  directives: [NglInternalOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.slds-form-element]': 'true',
  },
})
export class NglFormGroupAlternate extends NglFormGroup {

  @Input('nglFormLabel') label: string;
  @ContentChild(NglFormLabelTemplate) labelTpl: NglFormLabelTemplate;

  @HostBinding('class.slds-has-error')
  @Input('nglFormError') error: string;

  @Input('nglFormRequired') required: boolean;

  @Input() type: string;
};
