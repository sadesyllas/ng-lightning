import 'ts-helpers';

import {NglAvatar} from './images/avatar';
import {NglBadge} from './badges/badge';
import {NglBreadcrumbs} from './breadcrumbs/breadcrumbs';
import {NglBreadcrumb} from './breadcrumbs/breadcrumb';
import {NGL_BUTTON_DIRECTIVES} from './buttons/directives';
import {NGL_DATATABLE_DIRECTIVES} from './datatables/directives';
import {NGL_ICON_DIRECTIVES} from './icons/directives';
import {NGL_LOOKUP_DIRECTIVES} from './lookups/directives';
import {NglDatepicker} from './datepickers/datepicker';
import {NGL_FORM_DIRECTIVES} from './forms/form';
import {NGL_MENU_DIRECTIVES} from './menus/directives';
import {NGL_MODAL_DIRECTIVES} from './modals/directives';
import {NGL_NOTIFICATION_DIRECTIVES} from './notifications/directives';
import {NglPagination} from './paginations/pagination';
import {NGL_PICK_DIRECTIVES} from './pick/directives';
import {NGL_PILL_DIRECTIVES} from './pills/directives';
import {NGL_POPOVER_DIRECTIVES, NGL_POPOVER_PRECOMPILE} from './popovers/directives';
import {NglRating} from './ratings/rating';
import {NglSection} from './sections/section';
import {NglSpinner} from './spinners/spinner';
import {NGL_TAB_DIRECTIVES} from './tabs/directives';

export {NglAvatar} from './images/avatar';
export {NglBadge} from './badges/badge';
export {NglBreadcrumbs} from './breadcrumbs/breadcrumbs';
export {NglBreadcrumb} from './breadcrumbs/breadcrumb';
export {NGL_BUTTON_DIRECTIVES} from './buttons/directives';
export {NGL_DATATABLE_DIRECTIVES, INglDatatableSort} from './datatables/directives';
export {NGL_ICON_DIRECTIVES} from './icons/directives';
export {NGL_LOOKUP_DIRECTIVES} from './lookups/directives';
export {NglDatepicker} from './datepickers/datepicker';
export {NGL_FORM_DIRECTIVES} from './forms/form';
export {NGL_MENU_DIRECTIVES} from './menus/directives';
export {NGL_MODAL_DIRECTIVES} from './modals/directives';
export {NGL_NOTIFICATION_DIRECTIVES} from './notifications/directives';
export {NglPagination} from './paginations/pagination';
export {NGL_PICK_DIRECTIVES} from './pick/directives';
export {NGL_PILL_DIRECTIVES} from './pills/directives';
export {NGL_POPOVER_DIRECTIVES, NGL_POPOVER_PRECOMPILE} from './popovers/directives';
export {NglRating} from './ratings/rating';
export {NglSection} from './sections/section';
export {NglSpinner} from './spinners/spinner';
export {NGL_TAB_DIRECTIVES} from './tabs/directives';

export const NGL_DIRECTIVES = [
  NglAvatar,
  NglBadge,
  NglBreadcrumbs, NglBreadcrumb,
  NGL_BUTTON_DIRECTIVES,
  NGL_DATATABLE_DIRECTIVES,
  NGL_ICON_DIRECTIVES,
  NGL_LOOKUP_DIRECTIVES,
  NglDatepicker,
  NGL_FORM_DIRECTIVES,
  NGL_MENU_DIRECTIVES,
  NGL_MODAL_DIRECTIVES,
  NGL_NOTIFICATION_DIRECTIVES,
  NglPagination,
  NGL_PICK_DIRECTIVES,
  NGL_PILL_DIRECTIVES,
  NGL_POPOVER_DIRECTIVES,
  NglRating,
  NglSection,
  NglSpinner,
  NGL_TAB_DIRECTIVES,
];

export const NGL_PRECOMPILE = [
  NGL_POPOVER_PRECOMPILE,
];

export {provideNglConfig} from './config/config';
