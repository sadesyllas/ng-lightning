import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NglIconsModule} from '../icons/module';
import {NglMenusModule} from '../menus/module';
import {NglPickModule} from '../pick/module';

import {NglPicklist} from './picklist';
import {NglPicklistItemTemplate} from './item';

const NGL_PICKLIST_DIRECTIVES = [
  NglPicklist,
  NglPicklistItemTemplate,
];

@NgModule({
  declarations: [NGL_PICKLIST_DIRECTIVES],
  exports: [NGL_PICKLIST_DIRECTIVES, NglPickModule],
  imports: [CommonModule, FormsModule, NglIconsModule, NglPickModule, NglMenusModule],
})
export class NglPicklistModule {}
