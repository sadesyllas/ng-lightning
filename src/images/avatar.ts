import {Component, Input, ChangeDetectionStrategy, ElementRef, Renderer} from '@angular/core';
import {replaceClass} from '../util/util';

@Component({
  selector: 'ngl-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar.jade',
})
export class NglAvatar {
  @Input() src: string = '';
  @Input() alt: string = '';

  @Input('size') set setSize(value: string) {
    this.updateClass(this._size, value);
    this._size = value;
  }

  @Input('type') set setType(value: string) {
    this.updateClass(this._type, value);
    this._type = value;
  }

  private _type: string;
  private _size: string;

  constructor(public element: ElementRef, public renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'slds-avatar', true);
  }

  ngOnInit() {
    if (!this._type) {
      this.renderer.setElementClass(this.element.nativeElement, 'slds-avatar--rectangle', true);
    }

    if (!this._size) {
      this.renderer.setElementClass(this.element.nativeElement, 'slds-avatar--medium', true);
    }
  }

  private updateClass(oldValue: string, newValue: string) {
    replaceClass(this, `slds-avatar--${oldValue}`, newValue ? `slds-avatar--${newValue}` : '');
  }
};
