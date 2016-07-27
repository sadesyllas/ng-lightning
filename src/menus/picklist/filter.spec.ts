import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {By} from '@angular/platform-browser';
import {Component, DebugElement} from '@angular/core';
import {NglDropdownTrigger} from '../dropdown-trigger';
import {NglPick} from '../../pick/pick';
import {NglPicklist} from './picklist';
import {NglPicklistItemTemplate} from './item';
import {dispatchKeyEvent} from '../../../test/util/helpers';
import {provideNglConfig} from '../../config/config';

function getDropdownTrigger(fixture: ComponentFixture<TestComponent>): HTMLElement {
  return fixture.debugElement.query(By.css('[nglDropdownTrigger]')).nativeElement;
}

function getDropdownFilter(fixture: ComponentFixture<TestComponent>): HTMLElement {
  return fixture.debugElement.query(By.css('input')).nativeElement;
}

function getDisplayedItems(fixture: ComponentFixture<TestComponent>): string[] {
  return fixture.debugElement.queryAll(By.css('[nglDropdownItem]'))
    .map((item: DebugElement) => item.nativeElement.textContent.trim());
}

describe('`nglPicklistFilter`', () => {

  it('should be focused when the dropdown is opened by clicking', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const dropdownTrigger = getDropdownTrigger(fixture);
    const dropdownFilter = getDropdownFilter(fixture);

    dropdownTrigger.click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(dropdownFilter).toBe(document.activeElement);
    });
  }));

  it('should be focused when the dropdown is opened by pressing the down arrow', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const dropdownFilter = getDropdownFilter(fixture);

    spyOn(fixture.componentInstance, 'setOpen').and.callFake((isOpen: boolean) => {
      fixture.componentInstance.open = isOpen;
      fixture.detectChanges();
      setTimeout(() => {
        expect(dropdownFilter).toBe(document.activeElement);
      });
    });

    dispatchKeyEvent(fixture, By.directive(NglDropdownTrigger), 'keydown.arrowdown');
  }));

  it('should show only items matching the filter value', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const dropdownTrigger = getDropdownTrigger(fixture);
    const dropdownFilter = <HTMLInputElement>getDropdownFilter(fixture);

    dropdownTrigger.click();
    fixture.detectChanges();

    dropdownFilter.value = 'item';
    dispatchKeyEvent(fixture, By.css('input'), 'keyup');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture)).toEqual(['Item 1', 'Item 2', 'Item 3']);

    dropdownFilter.value = '1';
    dispatchKeyEvent(fixture, By.css('input'), 'input');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture)).toEqual(['Item 1']);

    dropdownFilter.value = '2';
    dispatchKeyEvent(fixture, By.css('input'), 'input');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture)).toEqual(['Item 2']);

    dropdownFilter.value = '4';
    dispatchKeyEvent(fixture, By.css('input'), 'input');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture)).toEqual([]);

    dropdownFilter.value = '';
    dispatchKeyEvent(fixture, By.css('input'), 'input');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture)).toEqual(['Item 1', 'Item 2', 'Item 3']);
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
  directives: [NglPick, NglPicklist, NglPicklistItemTemplate],
  template: `
    <ngl-picklist [data]="items" [(nglPick)]="pick" [open]="open" (openChange)="setOpen($event)" filter="value">
      <template nglPicklistItem let-item>{{item.value}}</template>
    </ngl-picklist>'
  `,
  providers: [provideNglConfig({picklist: {filterPlaceholder: 'Filter Options'}})],
})
export class TestComponent {
  pick: any = [];
  items = [
    { value: 'Item 1' },
    { value: 'Item 2' },
    { value: 'Item 3' },
  ];
  open: boolean = false;
  setOpen(open: boolean) {
    this.open = open;
  }
}
