import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NglInternalOutlet} from './outlet';

@NgModule({
  imports: [CommonModule],
  declarations: [NglInternalOutlet],
  exports: [NglInternalOutlet],
})
export class NglInternalOutletModule {}
