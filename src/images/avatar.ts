import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';

@Component({
  selector: 'ngl-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar.jade',
})
export class NglAvatar {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() size: 'x-small' | 'small' | 'medium' | 'large' = 'medium';
  @Input() type: 'rectangle' | 'circle' = 'rectangle';
};
