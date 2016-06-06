import {NglFormElement} from './elements/element';
import {NglFormInput, NglFormTextarea, NglFormSelect, NglFormCheckbox} from './elements/input';
import {NglFormElementRequired} from './elements/required';
import {NglFormGroup} from './groups/group';
import {NglFormGroupElement} from './groups/element';
import {NglFormGroupCheckbox, NglFormGroupRadio} from './groups/input';

export {NglFormElement} from './elements/element';
export {NglFormInput, NglFormTextarea, NglFormSelect, NglFormCheckbox} from './elements/input';
export {NglFormElementRequired} from './elements/required';
export {NglFormGroup} from './groups/group';
export {NglFormGroupElement} from './groups/element';
export {NglFormGroupCheckbox, NglFormGroupRadio} from './groups/input';


export const NGL_FORM_DIRECTIVES: Array<any> = [
  NglFormElement,
  NglFormInput, NglFormTextarea, NglFormSelect, NglFormCheckbox,
  NglFormElementRequired,
  NglFormGroup,
  NglFormGroupElement,
  NglFormGroupCheckbox, NglFormGroupRadio,
];
