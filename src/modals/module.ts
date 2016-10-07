import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NglIconsModule} from '../icons/module';

import {NglModal} from './modal';
import {NglModalFooter} from './footer';
import {NglModalHeaderTemplate} from './header';

const NGL_MODAL_DIRECTIVES = [
  NglModal,
  NglModalFooter,
  NglModalHeaderTemplate,
];

@NgModule({
  declarations: [NGL_MODAL_DIRECTIVES],
  exports: [NGL_MODAL_DIRECTIVES],
  imports: [CommonModule, NglIconsModule],
})
export class NglModalsModule {}
