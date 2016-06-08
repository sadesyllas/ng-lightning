import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglFormElement} from './element';
import {NglFormInput} from './input';

export function getLabelElement(element: Element): HTMLLabelElement {
  return <HTMLLabelElement>element.querySelector('label');
}

function getInputElement(element: Element): HTMLInputElement {
  return <HTMLInputElement>element.querySelector('input');
}

function getErrorElement(element: Element): HTMLDivElement {
  return <HTMLDivElement>element.querySelector('.slds-form-element__help');
}

export function getRequiredElement(element: Element): HTMLDivElement {
  return <HTMLDivElement>element.querySelector('abbr');
}

describe('`NglFormInput`', () => {

  it('should render correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const element = fixture.nativeElement.firstElementChild;
    expect(element).toHaveCssClass('slds-form-element');

    const labelEl = getLabelElement(element);
    expect(labelEl.textContent).toBe('My label');

    const inputEl = getInputElement(element);
    expect(inputEl).toHaveCssClass('slds-input');

    const inputId = inputEl.getAttribute('id');
    expect(inputId).toMatch(/form_element_/);
    expect(inputId).toEqual(labelEl.getAttribute('for'));
  }));

  it('should be able to change label', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    fixture.componentInstance.label = 'Another label';
    fixture.detectChanges();

    const labelEl = getLabelElement(fixture.nativeElement);
    expect(labelEl.textContent).toBe('Another label');
  }));

  it('should render error message', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const element = fixture.nativeElement.firstElementChild;

    expect(element).not.toHaveCssClass('slds-has-error');
    expect(getErrorElement(element)).toBeFalsy();
    fixture.componentInstance.error = 'This is an error!';
    fixture.detectChanges();

    const errorEl = getErrorElement(element);
    const inputEl = getInputElement(element);
    expect(element).toHaveCssClass('slds-has-error');
    expect(errorEl.id).toEqual(inputEl.getAttribute('aria-describedby'));
    expect(errorEl.textContent).toBe('This is an error!');
  }, `<ngl-form-element [nglFormError]="error"><input type="text"></ngl-form-element>`));

  it('should not leak outside parent', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.out')).not.toHaveCssClass('slds-input');
    expect(fixture.nativeElement.querySelector('.in')).toHaveCssClass('slds-input');
  }, `<input class="out"><ngl-form-element><input class="in"></ngl-form-element>`));

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
  directives: [NglFormElement, NglFormInput],
  template: `
    <ngl-form-element [nglFormLabel]="label">
      <input type="text">
    </ngl-form-element>
  `,
})
export class TestComponent {
  label: string = 'My label';
}
