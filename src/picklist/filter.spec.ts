import {TestBed, ComponentFixture, async}  from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Component, DebugElement} from '@angular/core';
import {createGenericTestComponent, dispatchEvent, dispatchKeyEvent} from '../../test/util/helpers';
import {NglPicklistModule} from './module';
import {getOptionElements} from './picklist.spec';

const createTestComponent = (html?: string, detectChanges?: boolean) =>
  createGenericTestComponent(TestComponent, html, detectChanges) as ComponentFixture<TestComponent>;

function getDropdownTrigger(fixture: ComponentFixture<TestComponent>): HTMLElement {
  return fixture.debugElement.query(By.css('[nglDropdownTrigger]')).nativeElement;
}

function getDropdownFilter(fixture: ComponentFixture<TestComponent>): HTMLInputElement {
  return fixture.debugElement.query(By.css('input')).nativeElement;
}

function getDisplayedItems(fixture: ComponentFixture<TestComponent>): string[] {
  return fixture.debugElement.queryAll(By.css('[nglDropdownItem]'))
    .map((item: DebugElement) => item.nativeElement.textContent.trim());
}

describe('Picklist filter', () => {

  beforeEach(() => TestBed.configureTestingModule({declarations: [TestComponent], imports: [NglPicklistModule]}));

  it('should be focused when the dropdown is opened', async(() => {
    const fixture = createTestComponent();
    const dropdownFilter = getDropdownFilter(fixture);
    expect(dropdownFilter).not.toBe(document.activeElement);

    fixture.componentInstance.open = true;
    fixture.detectChanges();
    setTimeout(() => {
      expect(dropdownFilter).toBe(document.activeElement);
    });
  }));

  it('should show only items matching the filter value', () => {
    const fixture = createTestComponent();
    const dropdownTrigger = getDropdownTrigger(fixture);
    const dropdownFilter = getDropdownFilter(fixture);

    dropdownTrigger.click();
    fixture.detectChanges();

    expect(getDisplayedItems(fixture)).toEqual(['Item 1', 'Item 2', 'Item 3']);

    dropdownFilter.value = 'item';
    dispatchEvent(dropdownFilter, 'input');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture)).toEqual(['Item 1', 'Item 2', 'Item 3']);

    dropdownFilter.value = 'Item';
    dispatchEvent(dropdownFilter, 'input');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture)).toEqual(['Item 1', 'Item 2', 'Item 3']);

    dropdownFilter.value = '1';
    dispatchEvent(dropdownFilter, 'input');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture)).toEqual(['Item 1']);

    dropdownFilter.value = '2';
    dispatchEvent(dropdownFilter, 'input');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture)).toEqual(['Item 2']);

    dropdownFilter.value = '4';
    dispatchEvent(dropdownFilter, 'input');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture)).toEqual([]);

    dropdownFilter.value = '';
    dispatchEvent(dropdownFilter, 'input');
    fixture.detectChanges();

    expect(getDisplayedItems(fixture)).toEqual(['Item 1', 'Item 2', 'Item 3']);
  });

  it('should be able to select with keyboard', () => {
    const fixture = createTestComponent();
    fixture.componentInstance.open = true;
    fixture.detectChanges();

    const options = getOptionElements(fixture.nativeElement);
    expect(options[0]).toHaveCssClass('slds-is-active');

    dispatchKeyEvent(fixture, By.css('input'), 'keydown.arrowdown');
    fixture.detectChanges();
    expect(options[0]).not.toHaveCssClass('slds-is-active');
    expect(options[1]).toHaveCssClass('slds-is-active');

    expect(fixture.componentInstance.pick).toEqual([]);
    dispatchKeyEvent(fixture, By.css('input'), 'keydown.enter');
    fixture.detectChanges();
    expect(fixture.componentInstance.pick).toBe(fixture.componentInstance.items[1]);
  });

  it('should update active option when hovered', () => {
    const fixture = createTestComponent();
    fixture.componentInstance.open = true;
    fixture.detectChanges();

    const inputFilter = getDropdownFilter(fixture);
    dispatchEvent(inputFilter, 'focus');

    const options = getOptionElements(fixture.nativeElement);
    expect(options[2]).not.toHaveCssClass('slds-is-active');

    dispatchEvent(options[2], 'mouseover');
    fixture.detectChanges();
    expect(options[2]).toHaveCssClass('slds-is-active');
  });

  it('should not select with keyboard if not valid', () => {
    const fixture = createTestComponent(null, false);
    fixture.componentInstance.open = true;
    fixture.detectChanges();

    const dropdownFilter = getDropdownFilter(fixture);

    dropdownFilter.value = 'nothing';
    dispatchEvent(dropdownFilter, 'input');
    fixture.detectChanges();

    dispatchKeyEvent(fixture, By.css('input'), 'keydown.enter');
    fixture.detectChanges();
    expect(fixture.componentInstance.pick).toEqual([]);
  });
});

@Component({
  template: `
    <ngl-picklist [data]="items" [(nglPick)]="pick" [open]="open" (openChange)="openChange($enent)" filter="value">
      <template nglPicklistItem let-item>{{item.value}}</template>
    </ngl-picklist>'
  `,
})
export class TestComponent {
  pick: any = [];
  items = [
    { value: 'Item 1' },
    { value: 'Item 2' },
    { value: 'Item 3' },
  ];
  open: boolean = false;
  openChange = jasmine.createSpy('openChange');
}
