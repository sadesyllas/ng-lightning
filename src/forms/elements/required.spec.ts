import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglFormElement} from './element';
import {NglFormInput} from './input';
import {NglFormElementRequired} from './required';
import {getRequiredElement} from './input.spec';


describe('`NglFormElementRequired`', () => {

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
  }));

  it('should not leak outside parent', testAsync((fixture: ComponentFixture<TestComponent>) => {
    expect(true).toBe(true); // Expect just to compile correctly and reach here
  }, `<input required="required">`));

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
  directives: [NglFormElement, NglFormInput, NglFormElementRequired],
  template: `<ngl-form-element><input type="text" [required]="required"></ngl-form-element>`,
})
export class TestComponent {}
