import {Component, Input, ChangeDetectionStrategy, ElementRef, Renderer, Optional} from 'angular2/core';
import {replaceClass} from '../util/util';
import {NglPillImage} from '../pills/pill-image';

export type AvatarSize = 'x-small' | 'small' | 'medium' | 'large';
export type AvatarType = 'rectangle' | 'circle';

@Component({
  selector: 'ngl-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar.jade',
})
export class NglAvatar {
  @Input() src: string = '';
  @Input() alt: string = '';

  @Input('size') set setSize(value: AvatarSize) {
    this.updateClass(this._size, value);
    this._size = value;
  }

  @Input('type') set setType(value: AvatarType) {
    this.updateClass(this._type, value);
    this._type = value;
  }

  private _type: AvatarType;
  private _size: AvatarSize;

  constructor(public element: ElementRef, public renderer: Renderer, @Optional() private nglPillImage: NglPillImage) {
    renderer.setElementClass(element.nativeElement, 'slds-avatar', true);
  }

  ngOnInit() {
    if (!this._type) {
      this.renderer.setElementClass(this.element.nativeElement, 'slds-avatar--rectangle', true);
    }

    if (!this._size && !this.nglPillImage) {
      this.renderer.setElementClass(this.element.nativeElement, 'slds-avatar--medium', true);
    }
  }

  private updateClass(oldValue: string, newValue: string) {
    replaceClass(this, `slds-avatar--${oldValue}`, newValue ? `slds-avatar--${newValue}` : '');
  }
};
