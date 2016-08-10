import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NglPopover} from './popover';
import {NglPopoverTrigger} from './trigger';
import {NglPopoverBehavior} from './behavior';

const NGL_POPOVER_DIRECTIVES = [
  NglPopover,
  NglPopoverTrigger,
  NglPopoverBehavior,
];

@NgModule({
  declarations: [NGL_POPOVER_DIRECTIVES],
  exports: [NGL_POPOVER_DIRECTIVES],
  imports: [CommonModule],
  entryComponents: [NglPopover],
})
export class NglPopoversModule {}
