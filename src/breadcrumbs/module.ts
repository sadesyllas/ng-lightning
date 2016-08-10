import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NglBreadcrumbs} from './breadcrumbs';
import {NglBreadcrumb} from './breadcrumb';

const NGL_BREADCRUMB_DIRECTIVES = [
  NglBreadcrumbs,
  NglBreadcrumb,
];

@NgModule({
  declarations: [NGL_BREADCRUMB_DIRECTIVES],
  exports: [NGL_BREADCRUMB_DIRECTIVES],
  imports: [CommonModule],
})
export class NglBreadcrumbsModule {}
