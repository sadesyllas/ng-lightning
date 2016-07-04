import 'ts-helpers';

import {NglAvatar} from './images/avatar';
import {NglBadge} from './badges/badge';
import {NglBreadcrumbs} from './breadcrumbs/breadcrumbs';
import {NglBreadcrumb} from './breadcrumbs/breadcrumb';
import {NglButton} from './buttons/button';
import {NglButtonState} from './buttons/button-state';
import {NglButtonIcon} from './buttons/button-icon';
import {NGL_DATATABLE_DIRECTIVES} from './datatables/directives';
import {NglIcon} from './icons/icon';
import {NGL_LOOKUP_DIRECTIVES} from './lookups/directives';
import {NglDatepicker} from './datepickers/datepicker';
import {NGL_FORM_DIRECTIVES} from './forms/form';
import {NglDropdownTrigger} from './menus/dropdown-trigger';
import {NglDropdown} from './menus/dropdown';
import {NglDropdownItem} from './menus/dropdown-item';
import {NglModal} from './modals/modal';
import {NglNotification} from './notifications/notification';
import {NglNotificationClose} from './notifications/notification-close';
import {NglPagination} from './paginations/pagination';
import {NglPick} from './pick/pick';
import {NglPickOption} from './pick/pick-option';
import {NglPill} from './pills/pill';
import {NglPillImage} from './pills/pill-image';
import {NglPillLink} from './pills/pill-link';
import {NglPillRemove} from './pills/pill-remove';
import {NGL_POPOVER_DIRECTIVES} from './popovers/directives';
import {NglRating} from './ratings/rating';
import {NglSection} from './sections/section';
import {NglSpinner} from './spinners/spinner';
import {NglTabs} from './tabs/tabs';
import {NglTab} from './tabs/tab';
import {NglTabVerbose, NglTabContent, NglTabHeading} from './tabs/tab-verbose';

export {NglAvatar} from './images/avatar';
export {NglBadge} from './badges/badge';
export {NglBreadcrumbs} from './breadcrumbs/breadcrumbs';
export {NglBreadcrumb} from './breadcrumbs/breadcrumb';
export {NglButton} from './buttons/button';
export {NglButtonState} from './buttons/button-state';
export {NglButtonIcon} from './buttons/button-icon';
export {NGL_DATATABLE_DIRECTIVES} from './datatables/directives';
export {NglIcon} from './icons/icon';
export {NGL_LOOKUP_DIRECTIVES} from './lookups/directives';
export {NglDatepicker} from './datepickers/datepicker';
export {NGL_FORM_DIRECTIVES} from './forms/form';
export {NglDropdownTrigger} from './menus/dropdown-trigger';
export {NglDropdown} from './menus/dropdown';
export {NglDropdownItem} from './menus/dropdown-item';
export {NglModal} from './modals/modal';
export {NglNotification} from './notifications/notification';
export {NglNotificationClose} from './notifications/notification-close';
export {NglPagination} from './paginations/pagination';
export {NglPick} from './pick/pick';
export {NglPickOption} from './pick/pick-option';
export {NglPill} from './pills/pill';
export {NglPillImage} from './pills/pill-image';
export {NglPillLink} from './pills/pill-link';
export {NglPillRemove} from './pills/pill-remove';
export {NGL_POPOVER_DIRECTIVES} from './popovers/directives';
export {NglRating} from './ratings/rating';
export {NglSection} from './sections/section';
export {NglSpinner} from './spinners/spinner';
export {NglTabs} from './tabs/tabs';
export {NglTab} from './tabs/tab';
export {NglTabVerbose, NglTabContent, NglTabHeading} from './tabs/tab-verbose';

export const NGL_DIRECTIVES = [
  NglAvatar,
  NglBadge,
  NglBreadcrumbs, NglBreadcrumb,
  NglButton, NglButtonState, NglButtonIcon,
  NGL_DATATABLE_DIRECTIVES,
  NglIcon,
  NGL_LOOKUP_DIRECTIVES,
  NglDatepicker,
  NGL_FORM_DIRECTIVES,
  NglDropdownTrigger, NglDropdown, NglDropdownItem,
  NglModal,
  NglNotification, NglNotificationClose,
  NglPagination,
  NglPick, NglPickOption,
  NglPill, NglPillImage, NglPillLink, NglPillRemove,
  NGL_POPOVER_DIRECTIVES,
  NglRating,
  NglSection,
  NglSpinner,
  NglTabs, NglTab, NglTabVerbose, NglTabContent, NglTabHeading,
];

export {provideNglConfig} from './config/config';
