import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';

@Component({
  selector: 'ngl-badge',
  templateUrl: './badge.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglBadge {
  @Input() type: 'default' | 'shade' | 'inverse';
};
