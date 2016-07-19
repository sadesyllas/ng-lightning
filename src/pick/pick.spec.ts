import {inject, async, TestComponentBuilder, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {selectElements, dispatchKeyEvent} from '../../test/util/helpers';
import {By} from '@angular/platform-browser';
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

  it('should have proper option selected based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expectState(fixture.nativeElement, [true, false, false, false]);

    fixture.componentInstance.selected = 'op2';
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, true, false, false]);
  }));

  it('should render options with the appropriate aria role', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { options } = getElements(fixture.nativeElement);
    options.forEach((o: HTMLElement) => expect(o.getAttribute('role')).toBe('button'));
  }));

  it('should have proper option selected even if selected value is object', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const {nativeElement, componentInstance} = fixture;
    componentInstance.selected = componentInstance.options[2];
    fixture.detectChanges();
    expectState(nativeElement, [false, false, false, true]);
  }));

  it('should handle different active class', testAsync((fixture: ComponentFixture<TestComponent>) => {
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
  }, `<div [nglPick]="selected" (nglPickChange)="selectedChange($event)">
        <button type="button" nglPickOption="op1" nglPickActiveClass="my-active-class"></button>
        <button type="button" nglPickOption="op2" nglPickActiveClass="another-class"></button>
      </div>
  `));

  it('should have proper selected value when `nglPickOption` is clicked', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const { options } = getElements(fixture.nativeElement);
    options[2].click();
    expect(fixture.componentInstance.selected).toBe('op3');
  }));

  it('should have proper selected value when `nglPickOption` is used with keyboard', testAsync((fixture: ComponentFixture<TestComponent>) => {
    function dispatchKey(key: string, index: number) {
      dispatchKeyEvent(fixture, By.css('button'), `keydown.${key}`, index);
    }

    fixture.detectChanges();
    dispatchKey('Enter', 1);
    expect(fixture.componentInstance.selected).toBe('op2');
    dispatchKey('Space', 2);
    expect(fixture.componentInstance.selected).toBe('op3');
    dispatchKey('ArrowDown', 1);
    expect(fixture.componentInstance.selected).toBe('op3');
  }));

  it('should have proper option selected when a new option is added', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.selected = 'op5';
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, false, false, false]);

    fixture.componentInstance.options.push('op5');
    fixture.detectChanges();
    expectState(fixture.nativeElement, [false, false, false, false, true]);
  }));

  it('call `nglOptionDestroyed` when a selected option is removed', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.selected = 'option3';
    fixture.componentInstance.exists = true;
    fixture.componentInstance.destroyed = jasmine.createSpy('destroyed');
    fixture.componentInstance.selectedChange = jasmine.createSpy('destroyed');
    fixture.detectChanges();

    fixture.componentInstance.exists = false;
    fixture.detectChanges();
    setTimeout(() => {
        expect(fixture.componentInstance.selectedChange).not.toHaveBeenCalled();
        expect(fixture.componentInstance.destroyed).toHaveBeenCalledWith('option3');
    });
  }, `
    <div [nglPick]="selected" (nglPickChange)="selectedChange($event)" (nglOptionDestroyed)="destroyed($event)">
      <button type="button" nglPickOption="option1"></button>
      <button type="button" nglPickOption="option2"></button>
      <button type="button" nglPickOption="option3" *ngIf="exists"></button>
    </div>
  `));

  it('not call `nglOptionDestroyed` when a not selected option is removed', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.selected = 'option2';
    fixture.componentInstance.exists = true;
    fixture.componentInstance.destroyed = jasmine.createSpy('destroyed');
    fixture.componentInstance.selectedChange = jasmine.createSpy('destroyed');
    fixture.detectChanges();

    fixture.componentInstance.exists = false;
    fixture.detectChanges();
    setTimeout(() => {
        expect(fixture.componentInstance.selectedChange).not.toHaveBeenCalled();
        expect(fixture.componentInstance.destroyed).not.toHaveBeenCalled();
    });
  }, `
    <div [nglPick]="selected" (nglPickChange)="selectedChange($event)" (nglOptionDestroyed)="destroyed($event)">
      <button type="button" nglPickOption="option1"></button>
      <button type="button" nglPickOption="option2"></button>
      <button type="button" nglPickOption="option3" *ngIf="exists"></button>
    </div>
  `));

  it('should allow picking from outside and expose state', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const spanEl = <HTMLSpanElement>fixture.nativeElement.querySelector('span');
    const triggerEl = <HTMLButtonElement>fixture.nativeElement.querySelector('button.outside');

    fixture.detectChanges();
    expect(spanEl.textContent).toBe('true-false');

    spyOn(fixture.componentInstance, 'selectedChange');
    triggerEl.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedChange).toHaveBeenCalledWith('op2');
  }, `<div [nglPick]="selected" (nglPickChange)="selectedChange($event)" nglPickActiveClass="slds-button--brand">
      <button type="button" nglPickOption="op1" #opt1="nglPickOption"></button>
      <button type="button" nglPickOption="op2" #opt2="nglPickOption"></button>
    </div>
    <button type="button" (click)="opt2.pick()" class="outside">Trigger</button>
    <span>{{opt1.active}}-{{opt2.active}}</span>`
  ));
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
  template: `
    <div [nglPick]="selected" (nglPickChange)="selectedChange($event)" nglPickActiveClass="slds-button--brand">
      <button type="button" nglPickOption="op1"></button>
      <button type="button" *ngFor="let option of options" [nglPickOption]="option"></button>
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
