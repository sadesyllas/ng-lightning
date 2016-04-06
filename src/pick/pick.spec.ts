import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {selectElements, dispatchKeyEvent} from '../../test/helpers';
import {NglPick} from './pick';
import {NglPickOption} from './pick-option';

function getElements(element: HTMLElement): any {
  return {
    options: <HTMLButtonElement[]>selectElements(element, 'button'),
  };
}

function expectState(element: HTMLElement, state: boolean[], activeClass = 'slds-button--brand') {
  const { options } = getElements(element);
  expect(options.length).toBe(state.length);
  expect(options.map((o: HTMLElement) => o.classList.contains(activeClass))).toEqual(state);
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

  it('should render options with the appropriate aria role', testAsync(({fixture, done}) => {
    const { options } = getElements(fixture.nativeElement);
    options.forEach((o: HTMLElement) => expect(o.getAttribute('role')).toBe('button'));
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
    const { options } = getElements(fixture.nativeElement);

    fixture.componentInstance.selected = 'op1';
    fixture.detectChanges();
    expect(options[0]).toHaveCssClass('my-active-class');
    expect(options[0]).not.toHaveCssClass('slds-button--brand');
    expect(options[1]).not.toHaveCssClass('another-class');
    expect(options[0]).not.toHaveCssClass('slds-button--brand');

    fixture.componentInstance.selected = 'op2';
    fixture.detectChanges();
    expect(options[0]).not.toHaveCssClass('my-active-class');
    expect(options[0]).not.toHaveCssClass('slds-button--brand');
    expect(options[1]).toHaveCssClass('another-class');
    expect(options[0]).not.toHaveCssClass('slds-button--brand');
    done();
  }, `<div [nglPick]="selected" (nglPickChange)="selectedChange($event)">
        <button type="button" nglPickOption="op1" nglPickActiveClass="my-active-class"></button>
        <button type="button" nglPickOption="op2" nglPickActiveClass="another-class"></button>
      </div>
  `));

  it('should have proper selected value when `nglPickOption` is clicked', testAsync(({fixture, done}) => {
    fixture.detectChanges();
    const { options } = getElements(fixture.nativeElement);
    options[2].click();
    expect(fixture.componentInstance.selected).toBe('op3');
    done();
  }));

  it('should have proper selected value when `nglPickOption` is used with keyboard', testAsync(({fixture, done}) => {
    fixture.detectChanges();
    const { options } = getElements(fixture.nativeElement);
    dispatchKeyEvent(options[1], 'Enter');
    expect(fixture.componentInstance.selected).toBe('op2');
    dispatchKeyEvent(options[2], 'Space');
    expect(fixture.componentInstance.selected).toBe('op3');
    dispatchKeyEvent(options[1], 'ArrowDown');
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
    <div [nglPick]="selected" (nglPickChange)="selectedChange($event)" nglPickActiveClass="slds-button--brand">
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
