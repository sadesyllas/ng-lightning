import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglPopover} from './popover';
import {NglPopoverTrigger} from './trigger';

function getPopoverElement(element: HTMLElement): HTMLElement {
  return <HTMLElement>element.querySelector('ngl-popover');
}

describe('Popovers', () => {

  it('should render the popover correctly', testAsync(({fixture, done}) => {
    const popoverEl = getPopoverElement(fixture.nativeElement);

    fixture.detectChanges();
    expect(popoverEl).toHaveCssClass('slds-popover');
    expect(popoverEl).toHaveCssClass('slds-nubbin--bottom'); // Top placement
    expect(popoverEl.textContent.trim()).toBe('I am a tooltip');
    done();
  }));

  it('should change visibility based on trigger', testAsync(({fixture, done}) => {
    const { nativeElement, componentInstance } = fixture;
    const popoverEl = getPopoverElement(nativeElement);

    fixture.detectChanges();
    expect(popoverEl).toHaveCssClass('slds-hide');

    componentInstance.open = true;
    fixture.detectChanges();
    expect(popoverEl).not.toHaveCssClass('slds-hide');

    done();
  }));

  it('should change nubbin based on placement', testAsync(({fixture, done}) => {
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
    done();
  }));
});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(fn: Function, html: string = null) {
  return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return new Promise((done: Function) => {
      if (html) {
        tcb = tcb.overrideTemplate(TestComponent, html);
      }
      tcb.createAsync(TestComponent).then((fixture) => fn({ fixture, done}));
    });
  });
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
