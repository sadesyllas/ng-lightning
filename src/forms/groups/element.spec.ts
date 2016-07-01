import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglFormGroup} from './group';
import {NglFormGroupElement} from './element';
import {NglFormGroupCheckbox, NglFormGroupRadio} from './input';
import {selectElements} from '../../../test/util/helpers';

function getLabelElements(element: HTMLElement): HTMLElement[] {
  return selectElements(element, 'label');
}

function getInputElements(element: HTMLElement): HTMLElement[] {
  return selectElements(element, 'input');
}

describe('`NglFormGroupElement`', () => {

  it('should render checkbox group correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const labelEls = getLabelElements(fixture.nativeElement);
    expect(labelEls.map(e => e.textContent.trim())).toEqual(['Label One', 'Checkbox Label Two']);

    labelEls.forEach(e => {
      expect(e).toHaveCssClass('slds-checkbox');

      const fauxEl = e.querySelector('.slds-checkbox--faux');
      expect(fauxEl).toBeTruthy();
    });
  }, `<fieldset ngl-form-group>
        <label ngl-form-group-element [nglFormLabel]="label"><input type="checkbox" /></label>
        <label ngl-form-group-element nglFormLabel="Checkbox Label Two"><input type="checkbox" /></label>
      </fieldset>`));

  it('should render radio group correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const labelEls = getLabelElements(fixture.nativeElement);
    expect(labelEls.map(e => e.textContent.trim())).toEqual(['Label One', 'Radio Label Two']);

    labelEls.forEach(e => {
      expect(e).toHaveCssClass('slds-radio');

      const fauxEl = e.querySelector('.slds-radio--faux');
      expect(fauxEl).toBeTruthy();
    });

    const names = getInputElements(fixture.nativeElement).map(e => e.getAttribute('name'));
    expect(names[0]).toMatch(/form_group_/);
    expect(names[0]).toEqual(names[1]);
  }, `<fieldset ngl-form-group>
        <label ngl-form-group-element [nglFormLabel]="label"><input type="radio" /></label>
        <label ngl-form-group-element nglFormLabel="Radio Label Two"><input type="radio" /></label>
      </fieldset>`));

  it('should not leak outside parent', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const inputEl = fixture.nativeElement.querySelector('input');
    expect(inputEl.getAttribute('name')).toBeNull();
  }, `<input type="radio" />`));
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
  directives: [NglFormGroup, NglFormGroupElement, NglFormGroupCheckbox, NglFormGroupRadio],
  template: '',
})
export class TestComponent {
  label: string = 'Label One';
}
