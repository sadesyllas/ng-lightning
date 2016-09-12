import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NglRating} from './rating';
import {NglRatingIconTemplate} from './icons';
import {NglIconsModule} from '../icons/module';

const DIRECTIVES = [
  NglRating,
  NglRatingIconTemplate,
];

@NgModule({
  imports: [CommonModule, NglIconsModule],
  declarations: [ ...DIRECTIVES ],
  exports: [ ...DIRECTIVES ],
})
export class NglRatingsModule {}
