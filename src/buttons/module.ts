import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NglButton} from './button';
import {NglButtonState} from './button-state';
import {NglButtonIcon} from './button-icon';

const NGL_BUTTON_DIRECTIVES = [
  NglButton,
  NglButtonState,
  NglButtonIcon,
];

@NgModule({
  declarations: NGL_BUTTON_DIRECTIVES,
  exports: NGL_BUTTON_DIRECTIVES,
  imports: [CommonModule],
})
export class NglButtonsModule {}
