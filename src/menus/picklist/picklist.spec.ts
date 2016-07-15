import {inject, async, TestComponentBuilder, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {NglPicklist} from './picklist';
import {NglPicklistItemTemplate} from './item';
import {NglPick} from '../../pick/pick';
import {selectElements} from '../../../test/util/helpers';

function isOpen(fixture: ComponentFixture<TestComponent>) {
  return fixture.nativeElement.querySelector('.slds-picklist').classList.contains('slds-is-open');
}

function getDropdownTrigger(element: HTMLElement): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('button');
}

function getOptionElements(element: HTMLElement): HTMLElement[] {
  return selectElements(element, 'li');
}

function expectOptions(element: HTMLElement, expected: any[]) {
  const options = getOptionElements(element);

  expect(options.map(e => e.textContent.trim()).map((text, i) => {
    return options[i].classList.contains('slds-is-selected') ? `+${text}` : text;
  })).toEqual(expected);
}

describe('`NglPicklist`', () => {

  it('should render correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    expect(isOpen(fixture)).toBe(false);

    const trigger = getDropdownTrigger(fixture.nativeElement);
    expect(trigger.textContent.trim()).toBe('Select option(s)');

    expectOptions(fixture.nativeElement, [ 'Item 1', 'Item 2', 'Item 3' ]);
  }));

  it('should open based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.open = true;
    fixture.detectChanges();
    expect(isOpen(fixture)).toBe(true);

    fixture.componentInstance.open = false;
    fixture.detectChanges();
    expect(isOpen(fixture)).toBe(false);
  }));

  it('should render selected items', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { componentInstance } = fixture;
    componentInstance.picks = [ componentInstance.items[0], componentInstance.items[2] ];
    fixture.detectChanges();

    expectOptions(fixture.nativeElement, [ '+Item 1', 'Item 2', '+Item 3' ]);

    componentInstance.picks = [ componentInstance.items[1] ];
    fixture.detectChanges();
    expectOptions(fixture.nativeElement, [ 'Item 1', '+Item 2', 'Item 3' ]);
  }));

  it('should toggle option selection', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { componentInstance, nativeElement } = fixture;
    componentInstance.open = true;
    componentInstance.picks = [ componentInstance.items[0], componentInstance.items[2] ];
    fixture.detectChanges();

    const options = getOptionElements(nativeElement);

    options[0].click();
    fixture.detectChanges();
    expectOptions(fixture.nativeElement, [ 'Item 1', 'Item 2', '+Item 3' ]);

    options[1].click();
    fixture.detectChanges();
    expectOptions(fixture.nativeElement, [ 'Item 1', '+Item 2', '+Item 3' ]);

    expect(isOpen(fixture)).toBe(true);
  }));

  it('should toggle option selection and close when not multiple', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { componentInstance, nativeElement } = fixture;
    componentInstance.open = true;
    componentInstance.multiple = false;
    componentInstance.picks = componentInstance.items[0];
    fixture.detectChanges();

    expectOptions(fixture.nativeElement, [ '+Item 1', 'Item 2', 'Item 3' ]);

    const options = getOptionElements(nativeElement);
    options[1].click();
    fixture.detectChanges();
    expectOptions(fixture.nativeElement, [ 'Item 1', '+Item 2', 'Item 3' ]);
    expect(isOpen(fixture)).toBe(false);
  }));

  it('should render trigger disabled', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();

    const triggerEl = getDropdownTrigger(fixture.nativeElement);
    expect(triggerEl.disabled).toBe(true);

    fixture.componentInstance.disabled = false;
    fixture.detectChanges();
    expect(triggerEl.disabled).toBe(false);
  }, `
    <ngl-picklist [data]="items" [(nglPick)]="picks" [disabled]="disabled">
      <template nglPicklistItem let-item>{{item.value}}</template>
    </ngl-picklist>
  `));

  it('should render as fluid', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.fluid = true;
    fixture.detectChanges();

    const picklistEl = fixture.nativeElement.querySelector('.slds-picklist');
    expect(picklistEl).toHaveCssClass('slds-picklist--fluid');

    fixture.componentInstance.fluid = false;
    fixture.detectChanges();
    expect(picklistEl).not.toHaveCssClass('slds-picklist--fluid');
  }, `
    <ngl-picklist [data]="items" [(nglPick)]="picks" [fluid]="fluid">
      <template nglPicklistItem let-item>{{item.value}}</template>
    </ngl-picklist>
  `));
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
  directives: [NglPicklist, NglPicklistItemTemplate, NglPick],
  template: `
    <ngl-picklist [data]="items" [(nglPick)]="picks" [(open)]="open" [nglPickMultiple]="multiple">
      <span class="slds-truncate">{{picks.length ? picks.length + ' options selected' : 'Select option(s)'}}</span>
      <template nglPicklistItem let-item>{{item.value}}</template>
    </ngl-picklist>
  `,
})
export class TestComponent {
  open: boolean;
  multiple: boolean = true;
  picks: any[] = [];

  items = [
    { value: 'Item 1', icon: 'kanban' },
    { value: 'Item 2', icon: 'side_list' },
    { value: 'Item 3', icon: 'table' },
  ];
}
