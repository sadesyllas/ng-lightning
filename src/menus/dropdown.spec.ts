import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglDropdown} from './dropdown';
import {NglDropdownTrigger} from './dropdown-trigger';
import {NglDropdownItem} from './dropdown-item';
import {NglPick} from '../pick/pick';
import {dispatchKeyEvent} from '../../test/helpers';

function getDropdownElement(fixtureElement: HTMLElement): HTMLElement {
  return <HTMLElement>fixtureElement.childNodes[0];
}

function getDropdownTrigger(fixtureElement: HTMLElement): HTMLElement {
  return <HTMLElement>fixtureElement.childNodes[0].childNodes[0];
}

function getDropdownItem(fixtureElement: HTMLElement): HTMLElement {
  return <HTMLElement>fixtureElement.childNodes[0].childNodes[1];
}

function getOutsideDropdownElement(fixtureElement: HTMLElement): HTMLElement {
  return <HTMLElement>fixtureElement.childNodes[1];
}

describe('`nglDropdown`', () => {

  it('should render correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const dropdownEl = getDropdownElement(fixture.nativeElement);
    expect(dropdownEl).toHaveCssClass('slds-dropdown-trigger');
    expect(dropdownEl).toHaveCssClass('slds-dropdown-trigger--click');
  }));

  it('should be closed when initialized as closed', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const dropdownEl = getDropdownElement(fixture.nativeElement);
    expect(dropdownEl).not.toHaveCssClass('slds-is-open');
    expect(dropdownEl.getAttribute('aria-expanded')).toBe('false');
  }));

  it('should be opened when input variable `open` is set to true', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.open = true;
    fixture.detectChanges();

    const dropdownEl = getDropdownElement(fixture.nativeElement);
    expect(dropdownEl).toHaveCssClass('slds-is-open');
    expect(dropdownEl.getAttribute('aria-expanded')).toBe('true');
  }));

  it('should be closed when anything outside the dropdown is clicked', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const outsideDropdownElement = getOutsideDropdownElement(fixture.nativeElement);
    fixture.componentInstance.open = true;
    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'setOpen').and.callThrough();
    expect(fixture.componentInstance.setOpen).not.toHaveBeenCalled();

    setTimeout(() => {
      outsideDropdownElement.click();
      expect(fixture.componentInstance.setOpen).toHaveBeenCalledWith(false);
    });
  }));

  it('should be closed when the ESC key is pressed', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const dropdown = getDropdownElement(fixture.nativeElement);
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    fixture.componentInstance.open = true;
    fixture.detectChanges();


    spyOn(fixture.componentInstance, 'setOpen').and.callThrough();
    expect(fixture.componentInstance.setOpen).not.toHaveBeenCalled();
    expect(dropdownTrigger).not.toEqual(document.activeElement);

    dispatchKeyEvent(dropdown, 'Escape');
    expect(fixture.componentInstance.setOpen).toHaveBeenCalledWith(false);
    expect(dropdownTrigger).toEqual(document.activeElement);
  }));

  it('should focus on the first item onced opened and the down arrow key is pressed', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const dropdown = getDropdownElement(fixture.nativeElement);
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    const dropdownItem = getDropdownItem(fixture.nativeElement);
    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'setOpen').and.callThrough();

    dropdownTrigger.click();
    expect(fixture.componentInstance.setOpen).toHaveBeenCalledWith(true);

    dispatchKeyEvent(dropdown, 'ArrowDown');
    expect(dropdownItem).toEqual(document.activeElement);
  }));

  it('should have the `slds-picklist` class when it is also a picklist', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.slds-dropdown-trigger')).toHaveCssClass('slds-picklist');
  }, '<div nglPick nglDropdown></div>'));

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
  directives: [NglDropdown, NglDropdownTrigger, NglDropdownItem, NglPick],
  template: ['<div nglDropdown [open]="open" (openChange)="setOpen($event)">',
    '<button type="button" nglDropdownTrigger></button>',
    '<div nglDropdownItem></div>',
    '</div>',
    '<div></div>',
  ].join(''),
})
export class TestComponent {
  open: boolean = false;
  setOpen(open: boolean) {
    this.open = open;
  }
}
