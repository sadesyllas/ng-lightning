import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglFormElement} from './element';
import {NglFormTextarea} from './input';
import {NglFormElementRequired} from './required';
import {getLabelElement, getRequiredElement} from './input.spec';

function getInputElement(element: Element): HTMLInputElement {
  return <HTMLInputElement>element.querySelector('textarea');
}

describe('`NglFormTextarea`', () => {

  it('should render correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const element = fixture.nativeElement.firstElementChild;
    expect(element).toHaveCssClass('slds-form-element');

    const labelEl = getLabelElement(element);
    expect(labelEl.textContent).toBe('My label');

    const inputEl = getInputElement(element);
    expect(inputEl).toHaveCssClass('slds-textarea');

    const inputId = inputEl.getAttribute('id');
    expect(inputId).toMatch(/form_element_/);
    expect(inputId).toEqual(labelEl.getAttribute('for'));
  }));

  it('should hook label indication on input required', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expect(getRequiredElement(fixture.nativeElement)).toBeFalsy();

    fixture.componentInstance.required = true;
    fixture.detectChanges();
    const abbrEl = getRequiredElement(fixture.nativeElement);
    expect(abbrEl).toHaveCssClass('slds-required');

    fixture.componentInstance.required = false;
    fixture.detectChanges();
    expect(getRequiredElement(fixture.nativeElement)).toBeFalsy();
  }, `<ngl-form-element><textarea [required]="required"></textarea></ngl-form-element>`));

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
  directives: [NglFormElement, NglFormTextarea, NglFormElementRequired],
  template: `
    <ngl-form-element [nglFormLabel]="label">
      <textarea></textarea>
    </ngl-form-element>
  `,
})
export class TestComponent {
  label: string = 'My label';
}
