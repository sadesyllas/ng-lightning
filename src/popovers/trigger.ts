import {Directive, Input, ElementRef} from '@angular/core';
import * as Tether from 'tether';
import {NglPopover, Direction} from './popover';
import {placement} from './placements';

@Directive({
  selector: '[nglPopoverTrigger]',
})
export class NglPopoverTrigger {

  private popover: NglPopover;
  private placement: Direction = 'top';
  private tether: Tether;

  constructor(public element: ElementRef) {}

  @Input() set nglPopoverTrigger(_popover: NglPopover) {
    this.popover = _popover;
    this.setTether(true);
  }

  @Input() set nglPlacement(_placement: Direction) {
    this.placement = _placement || 'top';
    this.setTether();
  }

  @Input() set nglOpen(_open: boolean) {
    this.popover.open = _open;
    if (_open) {
      setTimeout(() => this.tether.position());
    }
  }

  private setTether(create = false) {
    const { attachment, targetAttachment, offset, opposite } = placement(this.placement);
    const options = {
      element: this.popover.element.nativeElement,
      target: this.element.nativeElement,
      attachment,
      targetAttachment,
      offset,
    };

    if (create) {
      this.tether = new Tether(options);
    } else {
      this.tether.setOptions(options);
    }

    this.popover.nubbin = opposite;
  }
};
