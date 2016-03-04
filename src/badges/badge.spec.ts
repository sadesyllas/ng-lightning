import {it, describe, expect, injectAsync, TestComponentBuilder, FunctionWithParamTokens} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglBadge} from './badge';

function getBadgeElement(element: Element): HTMLSpanElement {
  return <HTMLSpanElement>element.querySelector('span');
}

describe('Badge Component', () => {

  it('should render the badge element with default class', testAsync((tcb: TestComponentBuilder) => {
    return createFixture(tcb, `<ngl-badge></ngl-badge>`).then((fixture) => {
      fixture.detectChanges();

      const badge = getBadgeElement(fixture.nativeElement);
      expect(badge).toBeDefined();
      expect(badge.classList.toString()).toEqual('slds-badge');
    });
  }));

  it('should have the appropriate classes for the selected type', testAsync((tcb: TestComponentBuilder) => {
    return createFixture(tcb, `<ngl-badge [type]="type"></ngl-badge>`).then((fixture) => {
      fixture.detectChanges();

      const { componentInstance, nativeElement } = fixture;

      const badge = getBadgeElement(nativeElement);
      expect(badge.classList.toString()).toEqual('slds-badge slds-theme--default');

      componentInstance.type = 'shade';
      fixture.detectChanges();
      expect(badge.classList.toString()).toEqual('slds-badge slds-theme--shade');

      componentInstance.type = null;
      fixture.detectChanges();
      expect(badge.classList.toString()).toEqual('slds-badge');
    });
  }));

});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(fn: Function): FunctionWithParamTokens {
  return injectAsync([TestComponentBuilder], fn);
}

function createFixture(tcb: TestComponentBuilder, html: string) {
  return tcb.overrideTemplate(TestComponent, html).createAsync(TestComponent);
}

@Component({
  directives: [NglBadge],
  template: ``,
})
export class TestComponent {
  type: string = 'default';
}
