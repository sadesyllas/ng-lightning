import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglFormElement} from './element';
import {NglFormCheckbox} from './input';
import {NglFormElementRequired} from './required';
import {getLabelElement, getRequiredElement} from './input.spec';

describe('`NglFormCheckbox`', () => {

  it('should render correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const element = fixture.nativeElement.firstElementChild;
    expect(element).toHaveCssClass('slds-form-element');

    const labelEl = getLabelElement(element);
    expect(labelEl).toHaveText('My label');
    expect(labelEl).toHaveCssClass('slds-checkbox');

    expect(element.querySelector('input[type=checkbox]')).not.toBeNull();
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
  }, `<ngl-form-element><input type="checkbox" [required]="required" /></ngl-form-element>`));

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
  directives: [NglFormElement, NglFormCheckbox, NglFormElementRequired],
  template: `
    <ngl-form-element [nglFormLabel]="label">
      <input type="checkbox" />
    </ngl-form-element>
  `,
})
export class TestComponent {
  label: string = 'My label';
}
