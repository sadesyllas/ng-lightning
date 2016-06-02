import {NglFormElement} from './elements/element';
import {NglFormInput, NglFormTextarea} from './elements/input';
import {NglFormElementRequired} from './elements/required';

export {NglFormElement} from './elements/element';
export {NglFormInput, NglFormTextarea} from './elements/input';
export {NglFormElementRequired} from './elements/required';


export const NGL_FORM_DIRECTIVES: Array<any> = [
  NglFormElement,
  NglFormInput,
  NglFormTextarea,
  NglFormElementRequired,
];
