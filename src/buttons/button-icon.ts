import {Directive, Input, ElementRef, Renderer} from 'angular2/core';
import {replaceClass} from '../util/util';

@Directive({
  selector: '[nglButtonIcon]',
})
export class NglButtonIcon {

  private _type: string = 'slds-button--icon-border';

  @Input() set nglButtonIcon(type: 'container' | 'border' | 'border-filled' | 'small') {
    replaceClass(this, this.normalize(this._type), this.normalize(type));
    this._type = type;
  }

  constructor(public element: ElementRef, public renderer: Renderer) {
    this.renderer.setElementClass(this.element.nativeElement, 'slds-button', true);
    this.renderer.setElementClass(this.element.nativeElement, 'slds-button--icon-border', true);
  }

  private normalize(type: string): string {
    if (!type && type !== '') return 'slds-button--icon-border';
    return `slds-button--icon${type ? `-${type}` : type}`;
  }
}
