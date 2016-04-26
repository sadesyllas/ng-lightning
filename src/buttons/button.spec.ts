import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglButton} from './button';
import {NglIcon} from '../icons/icon';

function getButtonElement(element: Element): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('button');
}

describe('`nglButton`', () => {

  it('should render the default button', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    expect(button).toHaveCssClass('slds-button');
  }));

  it('should render icon correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    const icon = button.querySelector('svg');
    expect(icon).toHaveCssClass('slds-button__icon');
    expect(icon).toHaveCssClass('slds-button__icon--left');
  }, `<button [nglButton]="style"><ngl-icon icon="download" align="left"></ngl-icon> Download</button>`));

  it('should render dynamic style', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { componentInstance } = fixture;
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    expect(button).toHaveCssClass('slds-button');
    expect(button).toHaveCssClass('slds-button--brand');

    componentInstance.style = 'destructive';
    fixture.detectChanges();
    expect(button).toHaveCssClass('slds-button');
    expect(button).toHaveCssClass('slds-button--destructive');
    expect(button).not.toHaveCssClass('slds-button--brand');

    componentInstance.style = null;
    fixture.detectChanges();
    expect(button).toHaveCssClass('slds-button');
    expect(button).not.toHaveCssClass('slds-button--destructive');
    expect(button).not.toHaveCssClass('slds-button--brand');
  }));

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
  directives: [NglButton, NglIcon],
  template: `<button [nglButton]="style">Go <</button>`,
})
export class TestComponent {
  style: string = 'brand';
  size: string;
}
