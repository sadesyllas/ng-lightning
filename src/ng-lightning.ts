/// <reference path="../typings/main.d.ts"/>

import {NglBadge} from './badges/badge';
import {NglButton} from './buttons/button';
import {NglButtonState} from './buttons/button-state';
import {NglButtonIcon} from './buttons/button-icon';
import {NglIconButton} from './buttons/icon';
import {NglIcon} from './icons/icon';
import {NglModal} from './modals/modal';
import {NglPagination} from './paginations/pagination';
import {NglSpinner} from './spinners/spinner';
import {NglTabs} from './tabs/tabs';
import {NglTab} from './tabs/tab';

export {NglBadge} from './badges/badge';
export {NglButton} from './buttons/button';
export {NglButtonState} from './buttons/button-state';
export {NglButtonIcon} from './buttons/button-icon';
export {NglIconButton} from './buttons/icon';
export {NglIcon} from './icons/icon';
export {NglModal} from './modals/modal';
export {NglPagination} from './paginations/pagination';
export {NglSpinner} from './spinners/spinner';
export {NglTabs} from './tabs/tabs';
export {NglTab} from './tabs/tab';

export const NGL_DIRECTIVES = [
  NglBadge,
  NglButton, NglButtonState, NglButtonIcon, NglIconButton,
  NglIcon,
  NglModal,
  NglPagination,
  NglSpinner,
  NglTabs, NglTab,
];

export {NGL_CONFIG} from './config/config';
