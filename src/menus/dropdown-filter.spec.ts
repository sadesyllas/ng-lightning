import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {NglDropdown} from './dropdown';
import {NglDropdownTrigger} from './dropdown-trigger';
import {NglDropdownFilter} from './dropdown-filter';
import {NglDropdownItem} from './dropdown-item';
import {dispatchKeyEvent} from '../../test/helpers';

function getDropdownTrigger(fixtureElement: HTMLElement): HTMLElement {
  return <HTMLElement>fixtureElement.childNodes[0].childNodes[0];
}

function getDropdownFilter(fixtureElement: HTMLElement): HTMLElement {
  return <HTMLElement>fixtureElement.childNodes[0].childNodes[1];
}

function getDropdownItem(fixtureElement: HTMLElement, index: number): HTMLElement {
  return <HTMLElement>fixtureElement.childNodes[0].childNodes[2 + index];
}

function getDisplayedItems(fixtureElement: HTMLElement): string[] {
  return [0, 1, 2].map((index: number) => getDropdownItem(fixtureElement, index))
    .filter((item: HTMLElement) => !item.hidden)
    .map((item: HTMLElement) => item.textContent);
}

describe('`nglDropdownFilter`', () => {

  it('should be focused when the dropdown is opened by clicking', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    const dropdownFilter = getDropdownFilter(fixture.nativeElement);
    fixture.detectChanges();

    dropdownTrigger.click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(dropdownFilter).toBe(document.activeElement);
    });
  }));

  it('should not be focused when the drodown is opened by pressing the down arrow key', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    const dropdownFilter = getDropdownFilter(fixture.nativeElement);
    const dropdownItem = getDropdownItem(fixture.nativeElement, 0);
    fixture.detectChanges();

    dropdownTrigger.click();
    fixture.detectChanges();

    dispatchKeyEvent(fixture, By.css('[nglDropdown]'), 'keydown.arrowdown');
    expect(dropdownItem).toBe(document.activeElement);
    expect(dropdownFilter).not.toBe(document.activeElement);
  }));

  it('should show only matching items when the filter value changes', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    const dropdownFilter = <HTMLInputElement>getDropdownFilter(fixture.nativeElement);
    fixture.detectChanges();

    dropdownTrigger.click();
    fixture.detectChanges();

    dropdownFilter.value = 'item';
    dispatchKeyEvent(fixture, By.css('[nglDropdownFilter]'), 'keyup');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture.nativeElement)).toEqual(['Item 1', 'Item 2', 'Item 3']);

    dropdownFilter.value = '1';
    dispatchKeyEvent(fixture, By.css('[nglDropdownFilter]'), 'keyup');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture.nativeElement)).toEqual(['Item 1']);

    dropdownFilter.value = '2';
    dispatchKeyEvent(fixture, By.css('[nglDropdownFilter]'), 'keyup');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture.nativeElement)).toEqual(['Item 2']);

    dropdownFilter.value = '4';
    dispatchKeyEvent(fixture, By.css('[nglDropdownFilter]'), 'keyup');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture.nativeElement)).toEqual([]);

    dropdownFilter.value = '';
    dispatchKeyEvent(fixture, By.css('[nglDropdownFilter]'), 'keyup');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture.nativeElement)).toEqual(['Item 1', 'Item 2', 'Item 3']);
  }));

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
  directives: [NglDropdown, NglDropdownTrigger, NglDropdownItem, NglDropdownFilter],
  template: ['<div nglDropdown [open]="open" (openChange)="setOpen($event)">',
    '<button type="button" nglDropdownTrigger></button>',
    '<input type="text" nglDropdownFilter />',
    '<div nglDropdownItem>Item 1</div>',
    '<div nglDropdownItem>Item 2</div>',
    '<div nglDropdownItem>Item 3</div>',
    '</div>',
  ].join(''),
})
export class TestComponent {
  open: boolean = false;
  setOpen(open: boolean) {
    this.open = open;
  }
}
