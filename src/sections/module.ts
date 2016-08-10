import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NglSection} from './section';
import {NglIconsModule} from '../icons/module';

@NgModule({
  declarations: [NglSection],
  exports: [NglSection],
  imports: [CommonModule, NglIconsModule],
})
export class NglSectionsModule {}
