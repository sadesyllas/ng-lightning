import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NglPill} from './pill';
import {NglPillImage} from './pill-image';
import {NglPillLink} from './pill-link';
import {NglPillRemove} from './pill-remove';
import {NglIconsModule} from '../icons/module';

const NGL_PILL_DIRECTIVES = [
  NglPill,
  NglPillImage,
  NglPillLink,
  NglPillRemove,
];

@NgModule({
  declarations: [NGL_PILL_DIRECTIVES],
  exports: [NGL_PILL_DIRECTIVES],
  imports: [CommonModule, NglIconsModule],
})
export class NglPillsModule {}
