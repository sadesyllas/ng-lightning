import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NglIconsModule} from '../icons/module';
import {NglPickModule} from '../pick/module';

import {NglDropdownTrigger} from './dropdown-trigger';
import {NglDropdown} from './dropdown';
import {NglDropdownItem} from './dropdown-item';
import {NglPicklist} from './picklist/picklist';
import {NglPicklistItemTemplate} from './picklist/item';

const NGL_DROPDOWN_DIRECTIVES = [
  NglDropdown,
  NglDropdownTrigger,
  NglDropdownItem,
];

const NGL_PICKLIST_DIRECTIVES = [
  NglPicklist,
  NglPicklistItemTemplate,
];


@NgModule({
  declarations: [NGL_DROPDOWN_DIRECTIVES, NGL_PICKLIST_DIRECTIVES],
  exports: [NGL_DROPDOWN_DIRECTIVES, NGL_PICKLIST_DIRECTIVES, NglPickModule],
  imports: [CommonModule, FormsModule, NglIconsModule, NglPickModule],
})
export class NglMenusModule {}
