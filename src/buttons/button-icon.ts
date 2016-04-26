import {Directive, Input, ElementRef, Renderer} from '@angular/core';
import {replaceClass} from '../util/util';

const DEFAULT_TYPE: string = 'border';

@Directive({
  selector: '[nglButtonIcon]',
})
export class NglButtonIcon {

  private _type: string;

  @Input() set nglButtonIcon(type: 'container' | 'border' | 'border-filled' | 'small' | '') {
    replaceClass(this, this.normalize(this._type), this.normalize(type));
    this._type = type;
  }

  constructor(public element: ElementRef, public renderer: Renderer) {
    this.renderer.setElementClass(this.element.nativeElement, 'slds-button', true);
    this.renderer.setElementClass(this.element.nativeElement, this.normalize(), true);
  }

  private normalize(type?: string): string {
    return `slds-button--icon${type === `''` ? '' : `-${type || DEFAULT_TYPE}`}`;
  }
}
