import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglPopover} from './popover';
import {NglPopoverTrigger} from './trigger';

function getPopoverElement(element: HTMLElement): HTMLElement {
  return <HTMLElement>element.querySelector('ngl-popover');
}

describe('Popovers', () => {

  it('should render the popover correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const popoverEl = getPopoverElement(fixture.nativeElement);

    fixture.detectChanges();
    expect(popoverEl).toHaveCssClass('slds-popover');
    expect(popoverEl).toHaveCssClass('slds-nubbin--bottom'); // Top placement
    expect(popoverEl.textContent.trim()).toBe('I am a tooltip');
  }));

  it('should change visibility based on trigger', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    const popoverEl = getPopoverElement(nativeElement);

    fixture.detectChanges();
    expect(popoverEl).toHaveCssClass('slds-hide');

    componentInstance.open = true;
    fixture.detectChanges();
    expect(popoverEl).not.toHaveCssClass('slds-hide');
  }));

  it('should change nubbin based on placement', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    const popoverEl = getPopoverElement(nativeElement);

    fixture.detectChanges();

    componentInstance.placement = 'left';
    fixture.detectChanges();
    expect(popoverEl).toHaveCssClass('slds-nubbin--right');
    expect(popoverEl).not.toHaveCssClass('slds-nubbin--bottom');

    componentInstance.placement = 'bottom';
    fixture.detectChanges();
    expect(popoverEl).toHaveCssClass('slds-nubbin--top');
    expect(popoverEl).not.toHaveCssClass('slds-nubbin--right');
  }));

  it('should change theme based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    const popoverEl = getPopoverElement(nativeElement);

    fixture.detectChanges();
    expect(popoverEl).not.toHaveCssClass('slds-theme--info');

    componentInstance.theme = 'info';
    fixture.detectChanges();
    expect(popoverEl).toHaveCssClass('slds-theme--info');

    componentInstance.theme = 'error';
    fixture.detectChanges();
    expect(popoverEl).toHaveCssClass('slds-theme--error');
    expect(popoverEl).not.toHaveCssClass('slds-theme--info');

    componentInstance.theme = null;
    fixture.detectChanges();
    expect(popoverEl).not.toHaveCssClass('slds-theme--error');
  }, '<ngl-popover [theme]="theme">I am a tooltip</ngl-popover>'));
});

// Shortcut function for less boilerplate on each `it`
function testAsync(fn: (value: ComponentFixture<TestComponent>) => void, html: string = null) {
  return async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    if (html) {
      tcb = tcb.overrideTemplate(TestComponent, html);
    }
    return tcb.createAsync(TestComponent).then(fn);
  }));
}

@Component({
  directives: [NglPopover, NglPopoverTrigger],
  template: `
    <ngl-popover #tip>I am a tooltip</ngl-popover>
    <span [nglPopoverTrigger]="tip" [nglPlacement]="placement" [nglOpen]="open" (mouseenter)="open = true" (mouseleave)="open = false">Open here</span>
  `,
})
export class TestComponent {
  placement: string;
  open = false;
}
