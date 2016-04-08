import {Component, Input, ChangeDetectionStrategy, ElementRef, Renderer} from 'angular2/core';
import {replaceClass} from '../util/util';

@Component({
  selector: 'ngl-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar.jade',
})
export class NglAvatar {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() size: 'x-small' | 'small' | 'medium' | 'large';

  @Input('size') set setSize(value: 'x-small' | 'small' | 'medium' | 'large') {
    this.updateClass(this._size, value);
    this._size = value;
  }

  @Input('type') set setType(value: 'rectangle' | 'circle') {
    this.updateClass(this._type, value);
    this._type = value;
  }

  private _type: 'rectangle' | 'circle';
  private _size: 'x-small' | 'small' | 'medium' | 'large';

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
