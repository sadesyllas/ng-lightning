import {Component, Input} from 'angular2/core';

@Component({
 selector: 'ngl-breadcrumbs',
 templateUrl: './breadcrumbs.jade',
})
export class NglBreadcrumbs {
  @Input() assistiveText: string;
}
