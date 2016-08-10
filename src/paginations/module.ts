import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NglPagination} from './pagination';

@NgModule({
  declarations: [NglPagination],
  exports: [NglPagination],
  imports: [CommonModule],
})
export class NglPaginationsModule {}
