import 'ts-helpers';
import {NgModule} from '@angular/core';


import {NglBadgesModule} from './badges/module';
import {NglBreadcrumbsModule} from './breadcrumbs/module';
import {NglButtonsModule} from './buttons/module';
import {NglDatatablesModule} from './datatables/module';
import {NglDatepickersModule} from './datepickers/module';
import {NglFormsModule} from './forms/module';
import {NglIconsModule} from './icons/module';
import {NglImagesModule} from './images/module';
import {NglLookupsModule} from './lookups/module';
import {NglMenusModule} from './menus/module';
import {NglModalsModule} from './modals/module';
import {NglNotificationsModule} from './notifications/module';
import {NglPaginationsModule} from './paginations/module';
import {NglPickModule} from './pick/module';
import {NglPillsModule} from './pills/module';
import {NglPopoversModule} from './popovers/module';
import {NglRatingsModule} from './ratings/module';
import {NglSectionsModule} from './sections/module';
import {NglSpinnersModule} from './spinners/module';
import {NglTabsModule} from './tabs/module';
import {NglConfig} from './config/config';

export {INglDatatableSort, INglDatatableRowClick} from './datatables/module';
export {NglConfig} from './config/config';

@NgModule({
  exports: [
    NglBadgesModule,
    NglBreadcrumbsModule,
    NglButtonsModule,
    NglDatatablesModule,
    NglDatepickersModule,
    NglFormsModule,
    NglIconsModule,
    NglImagesModule,
    NglLookupsModule,
    NglMenusModule,
    NglModalsModule,
    NglNotificationsModule,
    NglPaginationsModule,
    NglPickModule,
    NglPillsModule,
    NglPopoversModule,
    NglRatingsModule,
    NglSectionsModule,
    NglSpinnersModule,
    NglTabsModule,
  ],
  providers: [
    NglConfig,
  ],
})
export class NglModule {}
