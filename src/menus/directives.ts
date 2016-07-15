import {NglDropdownTrigger} from './dropdown-trigger';
import {NglDropdown} from './dropdown';
import {NglDropdownItem} from './dropdown-item';
import {NglPicklist} from './picklist/picklist';
import {NglPicklistItemTemplate} from './picklist/item';

export const NGL_DROPDOWN_DIRECTIVES: Array<any> = [
  NglDropdown,
  NglDropdownTrigger,
  NglDropdownItem,
];

export const NGL_PICKLIST_DIRECTIVES: Array<any> = [
  NglPicklist,
  NglPicklistItemTemplate,
];

export const NGL_MENU_DIRECTIVES: Array<any> = [
  ...NGL_DROPDOWN_DIRECTIVES,
  ...NGL_PICKLIST_DIRECTIVES,
];
