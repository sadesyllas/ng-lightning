import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'ngl-breadcrumb',
  templateUrl: './breadcrumb.jade',
  host: {
    '[class.slds-list__item]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglBreadcrumb {
  @Input() href: string;
}
