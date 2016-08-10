import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NglInternalOutletModule} from '../util/outlet.module';

import {NglFormElement} from './elements/element';
import {NglFormInput, NglFormTextarea, NglFormSelect, NglFormCheckbox} from './elements/input';
import {NglFormElementRequired} from './elements/required';
import {NglFormGroup} from './groups/group';
import {NglFormGroupAlternate} from './groups/group-alt';
import {NglFormGroupElement} from './groups/element';
import {NglFormGroupCheckbox, NglFormGroupRadio} from './groups/input';
import {NglFormLabelTemplate} from './form-label';

const NGL_FORM_DIRECTIVES = [
  NglFormElement,
  NglFormInput, NglFormTextarea, NglFormSelect, NglFormCheckbox,
  NglFormElementRequired,
  NglFormGroup,
  NglFormGroupAlternate,
  NglFormGroupElement,
  NglFormGroupCheckbox, NglFormGroupRadio,
  NglFormLabelTemplate,
];

@NgModule({
  declarations: NGL_FORM_DIRECTIVES,
  exports: NGL_FORM_DIRECTIVES,
  imports: [CommonModule, NglInternalOutletModule],
})
export class NglFormsModule {}
