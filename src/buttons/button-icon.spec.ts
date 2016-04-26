import {it, describe, expect, inject, async} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglButtonIcon} from './button-icon';
import {NglIcon} from '../icons/icon';

function getButtonElement(element: Element): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('button');
}

describe('`nglButtonIcon`', () => {

  it('should render the appropriate button icon class based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const {componentInstance, nativeElement} = fixture;
    const button = getButtonElement(nativeElement);

    fixture.detectChanges();
    expect(button).toHaveCssClass('slds-button');
    expect(button).toHaveCssClass('slds-button--icon-border');

    componentInstance.style = '';
    fixture.detectChanges();
    expect(button).not.toHaveCssClass('slds-button--icon');
    expect(button).toHaveCssClass('slds-button--icon-border');

    componentInstance.style = 'container';
    fixture.detectChanges();
    expect(button).toHaveCssClass('slds-button--icon-container');
    expect(button).not.toHaveCssClass('slds-button--icon');

    componentInstance.style = null;
    fixture.detectChanges();
    expect(button).toHaveCssClass('slds-button--icon-border');
    expect(button).not.toHaveCssClass('slds-button--icon-container');
  }));

  it('should render the appropriate icon', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const button = getButtonElement(fixture.nativeElement);
    const icon = button.querySelector('svg');
    expect(icon).toHaveCssClass('slds-button__icon');
  }));

  it('should render the default button icon when attribute value is empty', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    expect(button).toHaveCssClass('slds-button--icon-border');
    expect(button).not.toHaveCssClass('slds-button--icon');
  }, `<button nglButtonIcon=""></button>`));


  it('should render the default button icon when attribute value is not set', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    expect(button).not.toHaveCssClass('slds-button--icon');
    expect(button).toHaveCssClass('slds-button--icon-border');
  }, `<button nglButtonIcon></button>`));

  it('should render the bare button for \'\'', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    expect(button).toHaveCssClass('slds-button--icon');
    expect(button).not.toHaveCssClass('slds-button--icon-border');
  }, `<button nglButtonIcon="''"></button>`));
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
  directives: [NglButtonIcon, NglIcon],
  template: `<button [nglButtonIcon]="style"><ngl-icon icon="add"></ngl-icon></button>`,
})
export class TestComponent {
  style: string;
}
