import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';

@Component({
  selector: 'ngl-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="slds-avatar"
      [ngClass]="[size ? 'slds-avatar--' + size : '',
                 type ? 'slds-avatar--' + type : '']">
      <img [src]="src" [alt]="alt" />
    </span>
  `,
})
export class NglAvatar {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() size: 'x-small' | 'small' | 'medium' | 'large' = 'medium';
  @Input() type: 'rectangle' | 'circle' = 'rectangle';
};
