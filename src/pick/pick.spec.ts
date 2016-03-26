import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglPick} from './pick';
import {NglPickOption} from './pick-option';

function getOptionElements(element: HTMLElement): HTMLButtonElement[] {
  return [].slice.call(element.querySelectorAll('button'));
}

function expectState(element: HTMLElement, state: boolean[], activeClass = 'slds-button--brand') {
  const options = getOptionElements(element);
  expect(options.length).toBe(state.length);
  expect(options.map(o => o.classList.contains(activeClass))).toEqual(state);
}

describe('`Pick`', () => {

  it('should have proper option selected based on input', testAsync(({fixture, done}) => {
    fixture.detectChanges();
    expectState(fixture.nativeElement, [true, false, false, false]);

    fixture.componentInstance.selected = 'op2';
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, true, false, false]);
    done();
  }));

  it('should have proper option selected even if selected value is object', testAsync(({fixture, done}) => {
    const {nativeElement, componentInstance} = fixture;
    componentInstance.selected = componentInstance.options[2];
    fixture.detectChanges();
    expectState(nativeElement, [false, false, false, true]);
    done();
  }));

  it('should handle different active class', testAsync(({fixture, done}) => {
    const elements = getOptionElements(fixture.nativeElement);

    fixture.componentInstance.selected = 'op1';
    fixture.detectChanges();
    expect(elements[0]).toHaveCssClass('my-active-class');
    expect(elements[0]).not.toHaveCssClass('slds-button--brand');
    expect(elements[1]).not.toHaveCssClass('another-class');
    expect(elements[0]).not.toHaveCssClass('slds-button--brand');

    fixture.componentInstance.selected = 'op2';
    fixture.detectChanges();
    expect(elements[0]).not.toHaveCssClass('my-active-class');
    expect(elements[0]).not.toHaveCssClass('slds-button--brand');
    expect(elements[1]).toHaveCssClass('another-class');
    expect(elements[0]).not.toHaveCssClass('slds-button--brand');
    done();
  }, `<div nglPick [selected]="selected" (selectedChange)="selectedChange($event)">
        <button type="button" nglPickOption="op1" activeClass="my-active-class"></button>
        <button type="button" nglPickOption="op2" activeClass="another-class"></button>
      </div>
  `));

  it('should have proper selected value when `nglPickOption` is clicked', testAsync(({fixture, done}) => {
    fixture.detectChanges();
    const elements = getOptionElements(fixture.nativeElement);
    elements[2].click();
    expect(fixture.componentInstance.selected).toBe('op3');
    done();
  }));

  it('should have proper option selected when a new option is added', testAsync(({fixture, done}) => {
    fixture.componentInstance.selected = 'op5';
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, false, false, false]);

    fixture.componentInstance.options.push('op5');
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, false, false, false, true]);
    done();
  }));

  it('emit `undefined` when a selected option is removed', testAsync(({fixture, done}) => {
    fixture.componentInstance.selected = 'op2';
    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'selectedChange').and.callFake((event: any) => {
      expect(event).toBeUndefined();
      done();
    });

    fixture.componentInstance.options.splice(0, 1);
    fixture.detectChanges();
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
  directives: [NglPick, NglPickOption],
  template: `
    <div nglPick [selected]="selected" (selectedChange)="selectedChange($event)">
      <button type="button" nglPickOption="op1"></button>
      <button type="button" *ngFor="#option of options" [nglPickOption]="option"></button>
    </div>
  `,
})
export class TestComponent {
  selected = 'op1';
  options = ['op2', 'op3', {}];

  selectedChange(event: any) {
    this.selected = event;
  }
}
