import {NglPopover} from './popover';
import {NglPopoverTrigger} from './trigger';
import {NglPopoverBehavior} from './behavior';

export {NglPopover} from './popover';
export {NglPopoverTrigger} from './trigger';
export {NglPopoverBehavior} from './behavior';

export const NGL_POPOVER_DIRECTIVES: Array<any> = [
  NglPopoverTrigger,
  NglPopoverBehavior,
];

export const NGL_POPOVER_PRECOMPILE: Array<any> = [
  NglPopover,
];
