/// <reference path="../typings/main.d.ts"/>

import {NglSpinner} from './spinners/spinner';
import {NglTabs} from './tabs/tabs';
import {NglTab} from './tabs/tab';

export {NglSpinner} from './spinners/spinner';
export {NglTabs} from './tabs/tabs';
export {NglTab} from './tabs/tab';

export const NGL_DIRECTIVES = [
  NglSpinner,
  NglTabs, NglTab,
];

export {NGL_CONFIG} from './config/config';
