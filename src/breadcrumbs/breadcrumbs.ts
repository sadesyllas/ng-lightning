import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {uniqueId} from '../util/util';

@Component({
 selector: 'ngl-breadcrumbs',
 templateUrl: './breadcrumbs.jade',
 changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglBreadcrumbs {
  labelId = uniqueId('breadcrumb');
  @Input() assistiveText: string;
}
