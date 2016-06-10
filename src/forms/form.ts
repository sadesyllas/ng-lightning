import {NglFormElement} from './elements/element';
import {NglFormInput, NglFormTextarea, NglFormSelect, NglFormCheckbox} from './elements/input';
import {NglFormElementRequired} from './elements/required';
import {NglFormGroup} from './groups/group';
import {NglFormGroupAlternate} from './groups/group-alt';
import {NglFormGroupElement} from './groups/element';
import {NglFormGroupCheckbox, NglFormGroupRadio} from './groups/input';

export {NglFormElement} from './elements/element';
export {NglFormInput, NglFormTextarea, NglFormSelect, NglFormCheckbox} from './elements/input';
export {NglFormElementRequired} from './elements/required';
export {NglFormGroup} from './groups/group';
export {NglFormGroupAlternate} from './groups/group-alt';
export {NglFormGroupElement} from './groups/element';
export {NglFormGroupCheckbox, NglFormGroupRadio} from './groups/input';


export const NGL_FORM_DIRECTIVES: Array<any> = [
  NglFormElement,
  NglFormInput, NglFormTextarea, NglFormSelect, NglFormCheckbox,
  NglFormElementRequired,
  NglFormGroup,
  NglFormGroupAlternate,
  NglFormGroupElement,
  NglFormGroupCheckbox, NglFormGroupRadio,
];
