import {Directive, HostListener} from '@angular/core';
import {NglPopoverTrigger} from './trigger';

@Directive({
  selector: '[nglPopover][nglPopoverBehavior]',
})
export class NglPopoverBehavior {

  constructor(private trigger: NglPopoverTrigger) {}

  @HostListener('mouseenter')
  @HostListener('focus')
  onMouseOver() {
    this.trigger.nglOpen = true;
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  onMouseOut() {
    this.trigger.nglOpen = false;
  }
};
