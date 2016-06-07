import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
 selector: 'ngl-breadcrumbs',
 templateUrl: './breadcrumbs.jade',
 changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglBreadcrumbs {
  @Input() assistiveText: string;
}
