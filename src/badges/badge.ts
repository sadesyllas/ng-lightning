import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';

@Component({
  selector: 'ngl-badge',
  template: `
    <span class="slds-badge" [ngClass]="type ? 'slds-theme--' + type : ''">
      <ng-content></ng-content>
    </span>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglBadge {
  @Input() type: 'default' | 'shade' | 'inverse';
};
