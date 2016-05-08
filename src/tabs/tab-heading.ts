import {Component, Input, HostBinding, TemplateRef, ChangeDetectionStrategy} from '@angular/core';
import {NglTab} from './tab';

@Component({
  selector: '[nglTabHeading]',
  templateUrl: './tab-heading.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`:host { cursor: pointer; }`],
})
export class NglTabHeading {
  @Input('nglTabHeading') tab: NglTab;

  @HostBinding('attr.aria-selected')
  get active() {
    return this.tab.active;
  }

  @HostBinding('attr.tabindex')
  get tabindex() {
    return this.active ? 0 : -1;
  }

  get heading() {
    return this.tab.heading instanceof TemplateRef ? '' : this.tab.heading;
  }

  get headingTemplate() {
    return this.tab.heading instanceof TemplateRef ? this.tab.heading : null;
  }
};
