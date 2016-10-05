import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NglInternalOutletModule} from '../util/outlet.module';

import {NglFormElement} from './elements/element';
import {NglFormElementCheckbox} from './elements/checkbox';
import {NglFormInput, NglFormTextarea, NglFormSelect, NglFormCheckbox, NglFormRadio} from './elements/input';
import {NglFormElementRequired} from './elements/required';
import {NglFormGroup} from './groups/group';
import {NglFormGroupAlternate} from './groups/group-alt';
import {NglFormGroupElement} from './groups/element';
import {NglFormLabelTemplate} from './form-label';

const NGL_FORM_DIRECTIVES = [
  NglFormElement, NglFormElementCheckbox,
  NglFormInput, NglFormTextarea, NglFormSelect, NglFormCheckbox, NglFormRadio,
  NglFormElementRequired,
  NglFormGroup,
  NglFormGroupAlternate,
  NglFormGroupElement,
  NglFormLabelTemplate,
];

@NgModule({
  declarations: NGL_FORM_DIRECTIVES,
  exports: NGL_FORM_DIRECTIVES,
  imports: [CommonModule, NglInternalOutletModule],
})
export class NglFormsModule {}
