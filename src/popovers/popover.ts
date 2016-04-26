import {Component, Input, ChangeDetectionStrategy, ElementRef, Renderer} from '@angular/core';
import {replaceClass} from '../util/util';

export type Direction = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'ngl-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './popover.jade',
})
export class NglPopover {

  theme: 'info' | 'success' | 'warning' | 'error';
  @Input('theme') set setTheme(theme: any) {
    replaceClass(this, `slds-theme--${this.theme}`, theme ? `slds-theme--${theme}` : '');
    this.theme = theme;
  }

  set open(isOpen: boolean) {
    this.renderer.setElementClass(this.element.nativeElement, 'slds-hide', !isOpen);
  }

  private _nubbin: Direction;
  set nubbin(direction: Direction) {
    replaceClass(this, `slds-nubbin--${this._nubbin}`, direction ? `slds-nubbin--${direction}` : '');
    this._nubbin = direction;
  }

  constructor(public element: ElementRef, public renderer: Renderer) {
    this.renderer.setElementClass(this.element.nativeElement, 'slds-popover', true);
    this.open = false;
  }

}
