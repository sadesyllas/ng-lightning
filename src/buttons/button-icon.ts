import {Directive, Input, ElementRef, Renderer} from 'angular2/core';
import {replaceClass} from '../util/util';

@Directive({
  selector: '[nglButtonIcon]',
})
export class NglButtonIcon {

  private prefix = `slds-button--icon-`;

  private _type: string;
  @Input() set nglButtonIcon(type: 'container' | 'border' | 'border-filled' | 'small') {
    replaceClass(this, `${this.prefix}${this._type}`, `${this.prefix}${type || 'border'}`);
    this._type = type;
  }

  constructor(public element: ElementRef, public renderer: Renderer) {
    this.renderer.setElementClass(this.element.nativeElement, 'slds-button', true);
  }

};
