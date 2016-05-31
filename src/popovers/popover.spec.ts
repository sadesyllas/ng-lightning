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
    fixture.detectChanges();

    setTimeout(() => {
      const popoverEl = getPopoverElement(fixture.nativeElement);
      expect(popoverEl).toHaveCssClass('slds-popover');
      expect(popoverEl).toHaveCssClass('slds-nubbin--bottom'); // Top placement
      expect(popoverEl.textContent.trim()).toBe('I am a tooltip');
    });
  }));

  it('should change visibility based on trigger', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    setTimeout(() => {
      fixture.componentInstance.open = false;
      fixture.detectChanges();

      const popoverEl = getPopoverElement(fixture.nativeElement);
      expect(popoverEl).toBeFalsy();
    });
  }));

  it('should change nubbin based on placement', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    setTimeout(() => {
      const { nativeElement, componentInstance } = fixture;
      const popoverEl = getPopoverElement(nativeElement);

      componentInstance.placement = 'left';
      fixture.detectChanges();
      expect(popoverEl).toHaveCssClass('slds-nubbin--right');
      expect(popoverEl).not.toHaveCssClass('slds-nubbin--bottom');

      componentInstance.placement = 'bottom';
      fixture.detectChanges();
      expect(popoverEl).toHaveCssClass('slds-nubbin--top');
      expect(popoverEl).not.toHaveCssClass('slds-nubbin--right');
    });
  }));

  it('should change theme based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    setTimeout(() => {
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
    });
  }));

  it('should have tooltip appearence', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    setTimeout(() => {
      const popoverEl = getPopoverElement(fixture.nativeElement);
      expect(popoverEl).toHaveCssClass('slds-popover--tooltip');
    });
  }, `<template #tip></template><span [nglPopover]="tip" nglOpen="true" nglTooltip></span>`));

  it('should destroy popover when host is destroyed', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.exists = true;
    fixture.detectChanges();

    setTimeout(() => {
      expect(getPopoverElement(fixture.nativeElement)).toBeTruthy();

      fixture.componentInstance.exists = false;
      fixture.detectChanges();
      expect(getPopoverElement(fixture.nativeElement)).toBeFalsy();
    });
  }, `<template #tip></template><span *ngIf="exists" [nglPopover]="tip" nglOpen="true"></span>`));
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
    <template #tip>I am a tooltip</template>
    <span [nglPopover]="tip" [nglPopoverPlacement]="placement" [nglPopoverTheme]="theme" [nglOpen]="open">Open here</span>
  `,
})
export class TestComponent {
  placement: string;
  open = true;
  theme: string;
}
