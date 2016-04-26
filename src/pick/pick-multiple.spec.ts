import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {selectElements} from '../../test/helpers';
import {Component} from '@angular/core';
import {NglPick} from './pick';
import {NglPickOption} from './pick-option';

function expectState(element: HTMLElement, state: boolean[], activeClass = 'slds-button--brand') {
  const options = selectElements(element, 'button');
  expect(options.length).toBe(state.length);
  expect(state).toEqual(options.map(o => o.classList.contains(activeClass)));
}

describe('Pick multiple array', () => {
  let HTML = `
    <div [(nglPick)]="selected" nglPickMultiple nglPickActiveClass="slds-button--brand">
      <button type="button" nglPickOption="op1"></button>
      <button type="button" *ngFor="let option of options" [nglPickOption]="option"></button>
    </div>
  `;

  it('should have proper options selected based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expectState(fixture.nativeElement, [true, false, true, false]);

    fixture.componentInstance.selected = ['op2', 'op3'];
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, true, true, false]);
  }, HTML));

  it('should have proper selected value when `nglPickOption` is clicked', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const elements = selectElements(fixture.nativeElement, 'button');

    elements[2].click();
    expect(fixture.componentInstance.selected).toEqual(['op1']);

    fixture.detectChanges();
    elements[2].click();
    expect(fixture.componentInstance.selected).toEqual(['op1', 'op3']);

    fixture.detectChanges();
    elements[1].click();
    expect(fixture.componentInstance.selected).toEqual(['op1', 'op3', 'op2']);
  }, HTML));

  it('should have proper option selected when a new option is added', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.selected = ['op5'];
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, false, false, false]);

    fixture.componentInstance.options.push('op5');
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, false, false, false, true]);
  }, HTML));
});

describe('Pick multiple object', () => {
  let HTML = `
    <div [(nglPick)]="selectedObject" nglPickMultiple nglPickActiveClass="slds-button--brand">
      <button type="button" nglPickOption="op1"></button>
      <button type="button" *ngFor="let option of options" [nglPickOption]="option"></button>
    </div>
  `;

  it('should have proper options selected based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expectState(fixture.nativeElement, [true, false, true, false]);

    fixture.componentInstance.selectedObject = {op2: true, op3: true};
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, true, true, false]);
  }, HTML));

  it('should have proper selected value when `nglPickOption` is clicked', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const elements = selectElements(fixture.nativeElement, 'button');

    elements[2].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedObject).toEqual({ op1: true, op2: false, op3: false, op4: false });

    elements[2].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedObject).toEqual({ op1: true, op2: false, op3: true, op4: false });

    fixture.detectChanges();
    elements[1].click();
    expect(fixture.componentInstance.selectedObject).toEqual({ op1: true, op2: true, op3: true, op4: false });
  }, HTML));

  it('should have proper option selected when a new option is added', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.selectedObject = {op5: true};
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, false, false, false]);

    fixture.componentInstance.options.push('op5');
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, false, false, false, true]);
  }, HTML));
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
  directives: [NglPick, NglPickOption],
  template: '',
})
export class TestComponent {
  selected = ['op1', 'op3'];
  selectedObject = {'op1': true, 'op2': false, 'op3': true, 'op4': false};
  options = ['op2', 'op3', 'op4'];
}
