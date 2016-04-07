import {Directive} from 'angular2/core';

@Directive({
  selector: '[nglPillImage]',
  host: {
    '[class.slds-pill__icon]': 'true',
  },
})
export class NglPillImage {}
