import {Component, Input} from '@angular/core';
import {uniqueId} from '../util/util';

@Component({
 selector: 'ngl-breadcrumbs',
 templateUrl: './breadcrumbs.jade',
})
export class NglBreadcrumbs {
  labelId = uniqueId('breadcrumb');
  @Input() assistiveText: string;
}
