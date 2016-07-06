import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';
import {Component} from '@angular/core';
import {NglBadge} from './badge';

function getBadgeElement(element: Element): HTMLSpanElement {
  return <HTMLSpanElement>element.querySelector('span');
}

describe('Badge Component', () => {

  it('should render the badge element with default class', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const badge = getBadgeElement(fixture.nativeElement);
    expect(badge).toBeDefined();
    expect(badge.classList.toString()).toEqual('slds-badge');
  }, `<ngl-badge></ngl-badge>`));

  it('should have the appropriate classes for the selected type', testAsync((fixture: ComponentFixture<TestComponent>) => {
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
  }, `<ngl-badge [type]="type"></ngl-badge>`));

});


// Shortcut function for less boilerplate on each `it`
function testAsync(fn: (value: ComponentFixture<TestComponent>) => void, html: string = null) {
  return async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.overrideTemplate(TestComponent, html).createAsync(TestComponent).then(fn);
  }));
}

@Component({
  directives: [NglBadge],
  template: ``,
})
export class TestComponent {
  type: string = 'default';
}
