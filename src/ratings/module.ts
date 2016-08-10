import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NglRating} from './rating';
import {NglIconsModule} from '../icons/module';

@NgModule({
  imports: [CommonModule, NglIconsModule],
  declarations: [NglRating],
  exports: [NglRating],
})
export class NglRatingsModule {}
