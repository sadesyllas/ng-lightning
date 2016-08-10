import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NglPick} from './pick';
import {NglPickOption} from './pick-option';

const NGL_PICK_DIRECTIVES = [
  NglPick,
  NglPickOption,
];

@NgModule({
  declarations: [NGL_PICK_DIRECTIVES],
  exports: [NGL_PICK_DIRECTIVES],
  imports: [CommonModule],
})
export class NglPickModule {}
