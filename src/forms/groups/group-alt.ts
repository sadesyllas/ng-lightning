import {Component, Input, ChangeDetectionStrategy, HostBinding, ContentChild} from '@angular/core';
import {NglFormGroup} from './group';
import {NglFormLabelTemplate} from '../form-label';

@Component({
  selector: 'fieldset[ngl-form-group-alt]',
  templateUrl: './group-alt.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.slds-form-element]': 'true',
  },
})
export class NglFormGroupAlternate extends NglFormGroup {

  @Input('label') labelStr: string;
  @ContentChild(NglFormLabelTemplate) labelTpl: NglFormLabelTemplate;

  @HostBinding('class.slds-has-error')
  @Input() error: string;

  @Input() required: boolean;

  @Input() type: string;
};
