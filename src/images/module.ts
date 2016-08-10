import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NglAvatar} from './avatar';

@NgModule({
  declarations: [NglAvatar],
  exports: [NglAvatar],
  imports: [CommonModule],
})
export class NglImagesModule {}
