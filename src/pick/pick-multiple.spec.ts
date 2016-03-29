import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {selectElements} from '../../test/helpers';
import {Component} from 'angular2/core';
import {NglPick} from './pick';
import {NglPickOption} from './pick-option';

function expectState(element: HTMLElement, state: boolean[], activeClass = 'slds-button--brand') {
  const options = selectElements(element, 'button');
  expect(options.length).toBe(state.length);
  expect(state).toEqual(options.map(o => o.classList.contains(activeClass)));
}

let HTML: string;

describe('Pick multiple array', () => {
  HTML = `
    <div [(nglPick)]="selected" nglPickMultiple>
      <button type="button" nglPickOption="op1"></button>
      <button type="button" *ngFor="#option of options" [nglPickOption]="option"></button>
    </div>
  `;

  it('should have proper options selected based on input', testAsync(({fixture, done}) => {
    fixture.detectChanges();
    expectState(fixture.nativeElement, [true, false, true, false]);

    fixture.componentInstance.selected = ['op2', 'op3'];
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, true, true, false]);
    done();
  }));

  it('should have proper selected value when `nglPickOption` is clicked', testAsync(({fixture, done}) => {
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
    done();
  }));

  it('should have proper option selected when a new option is added', testAsync(({fixture, done}) => {
    fixture.componentInstance.selected = ['op5'];
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, false, false, false]);

    fixture.componentInstance.options.push('op5');
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, false, false, false, true]);
    done();
  }));
});

describe('Pick multiple object', () => {
  HTML = `
    <div [(nglPick)]="selectedObject" nglPickMultiple>
      <button type="button" nglPickOption="op1"></button>
      <button type="button" *ngFor="#option of options" [nglPickOption]="option"></button>
    </div>
  `;

  it('should have proper options selected based on input', testAsync(({fixture, done}) => {
    fixture.detectChanges();
    expectState(fixture.nativeElement, [true, false, true, false]);

    fixture.componentInstance.selectedObject = {op2: true, op3: true};
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, true, true, false]);
    done();
  }));

  it('should have proper selected value when `nglPickOption` is clicked', testAsync(({fixture, done}) => {
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
    done();
  }));

  it('should have proper option selected when a new option is added', testAsync(({fixture, done}) => {
    fixture.componentInstance.selectedObject = {op5: true};
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, false, false, false]);

    fixture.componentInstance.options.push('op5');
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, false, false, false, true]);
    done();
  }));
});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(fn: Function, html: string = HTML) {
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
  directives: [NglPick, NglPickOption],
  template: '',
})
export class TestComponent {
  selected = ['op1', 'op3'];
  selectedObject = {'op1': true, 'op2': false, 'op3': true, 'op4': false};
  options = ['op2', 'op3', 'op4'];
}
