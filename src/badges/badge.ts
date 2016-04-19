import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';

@Component({
  selector: 'ngl-badge',
  templateUrl: './badge.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglBadge {
  @Input() type: string;
};
