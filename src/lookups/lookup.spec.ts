import {inject, async, TestComponentBuilder, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {selectElements, dispatchKeyEvent} from '../../test/util/helpers';
import {By} from '@angular/platform-browser';
import {NGL_LOOKUP_DIRECTIVES} from './directives';

function getElements(element: HTMLElement) {
  return {
    lookup: <HTMLDivElement>element.querySelector('.slds-lookup'),
    label: <HTMLLabelElement>element.querySelector('label'),
    input: <HTMLInputElement>element.querySelector('input'),
    menu: <HTMLInputElement>element.querySelector('.slds-lookup__menu'),
    options: selectElements(element, '.slds-lookup__list > li'),
    pill: getPill(element),
  };
}

function getPill(element: HTMLElement) {
  return <HTMLAnchorElement>element.querySelector('.slds-pill_container');
}

function clickRemove(element: HTMLElement) {
  const button = <HTMLButtonElement>element.querySelector('button');
  button.click();
}

function expectSearchIcon(element: HTMLElement, exists: boolean) {
  const containerEl = element.querySelector('.slds-input-has-icon');
  const svg = containerEl.querySelector('svg.slds-input__icon');
  if (exists) {
    expect(containerEl).toHaveCssClass('slds-input-has-icon--right');
    expect(svg).toBeTruthy();
  } else {
    expect(containerEl).not.toHaveCssClass('slds-input-has-icon--right');
    expect(svg).toBeFalsy();
  }
}

function expectOptions(fixture: any, expectedOptions: any[]) {
  fixture.detectChanges();
  const { options } = getElements(fixture.nativeElement);
  expect(options.map(e => e.textContent.trim())).toEqual(expectedOptions);
}

function expectMenuExpanded(element: HTMLElement, isOpen: boolean) {
  const { lookup, menu, input } = getElements(element);

  if (isOpen) {
    expect(input.getAttribute('aria-expanded')).toBe('true');
    expect(lookup).toHaveCssClass('slds-is-open');
    expect(menu).toBeTruthy();
  } else {
    if (input) {
      expect(input.getAttribute('aria-expanded')).toBe('false');
    }
    expect(lookup).not.toHaveCssClass('slds-is-open');
    expect(menu).toBeFalsy();
  }
}

describe('Lookup Component', () => {

  it('should render correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const { label, input, options, pill } = getElements(fixture.nativeElement);
    expect(label.textContent.trim()).toEqual('Lookup:');
    expect(label.getAttribute('for')).toEqual(input.id);

    expect(input.value).toBe('');
    expect(input.placeholder).toBe('');
    expect(pill).toBeFalsy();

    expectMenuExpanded(fixture.nativeElement, false);
    expect(options.length).toBe(0);
  }));

  it('should update placeholder based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const { input } = getElements(fixture.nativeElement);
    expect(input.placeholder).toBe('');

    fixture.componentInstance.placeholder = 'my placeholder';
    fixture.detectChanges();
    expect(input.placeholder).toBe('my placeholder');
    expectSearchIcon(fixture.nativeElement, true);
  }, `<ngl-lookup [lookup]="filter" [placeholder]="placeholder"></ngl-lookup>`));

  it('should render search icon based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.icon = false;
    fixture.detectChanges();
    expectSearchIcon(fixture.nativeElement, false);

    fixture.componentInstance.icon = true;
    fixture.detectChanges();
    expectSearchIcon(fixture.nativeElement, true);
  }, `<ngl-lookup [searchIcon]="icon" debounce="0"></ngl-lookup>`));

  it('should toggle pill and <input> based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    function expectInputToExist(exists: boolean) {
      const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('input');
      if (exists) {
        expect(inputEl).toBeTruthy();
      } else {
        expect(inputEl).toBeFalsy();
      }
      return inputEl;
    }

    expectInputToExist(true);
    expect(getPill(fixture.nativeElement)).toBeFalsy();

    fixture.componentInstance.selection = 'my selection';
    fixture.detectChanges();

    expectInputToExist(false);
    expect(getPill(fixture.nativeElement).textContent.trim()).toBe('my selection');

    fixture.componentInstance.selection = null;
    fixture.detectChanges();
    const input = expectInputToExist(true);
    expect(input.value).toBe('');
    expect(getPill(fixture.nativeElement)).toBeFalsy();
  }, `<ngl-lookup [lookup]="filter" [pick]="selection"></ngl-lookup>`));

  it('should remove selection when clicking on pill button and focus input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.selection = 'my selection';
    fixture.detectChanges();

    clickRemove(fixture.nativeElement);
    expect(fixture.componentInstance.selection).toBe(null);

    fixture.detectChanges();
    const { input } = getElements(fixture.nativeElement);
    expect(input).toBe(document.activeElement);
  }, `<ngl-lookup [lookup]="filter" [(pick)]="selection"></ngl-lookup>`));

  it('should close menu when there is selection', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    componentInstance.value = 'DE';
    fixture.detectChanges();
    expectMenuExpanded(nativeElement, true);

    fixture.componentInstance.selection = 'my selection';
    fixture.detectChanges();
    expectMenuExpanded(nativeElement, false);
  }, `<ngl-lookup [value]="value" [lookup]="filter" [pick]="selection" debounce="0"></ngl-lookup>`));

  it('should trigger lookup function when value changes', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { componentInstance } = fixture;
    fixture.detectChanges();

    componentInstance.value = 'ABC';
    fixture.detectChanges();
    expect(componentInstance.filter).toHaveBeenCalledWith('ABC');

    componentInstance.value = 'ABCDE';
    fixture.detectChanges();
    expect(componentInstance.filter).toHaveBeenCalledWith('ABCDE');
  }));

  it('should change suggestions based on lookup result', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { componentInstance } = fixture;
    fixture.detectChanges();

    componentInstance.value = 'DE';
    fixture.detectChanges();
    expectOptions(fixture, ['ABCDE', 'DEFGH']);

    componentInstance.value = 'DEF';
    fixture.detectChanges();
    expectOptions(fixture, ['DEFGH']);

    componentInstance.value = 'NO MATCH';
    fixture.detectChanges();
    expectOptions(fixture, ['No results found']);
  }));

  it('should update input with selection and close menu', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    spyOn(componentInstance, 'onSelect');

    componentInstance.value = 'DE';
    fixture.detectChanges();
    expectOptions(fixture, ['ABCDE', 'DEFGH']);

    const { options } = getElements(nativeElement);
    options[1].click();
    expect(componentInstance.onSelect).toHaveBeenCalledWith('DEFGH');
  }));

  it('should close menu on escape key', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    expectMenuExpanded(nativeElement, false);

    componentInstance.value = 'DE';
    fixture.detectChanges();
    expectMenuExpanded(nativeElement, true);

    dispatchKeyEvent(fixture, By.css('input'), 'keydown.Esc');
    fixture.detectChanges();
    expectMenuExpanded(nativeElement, false);
  }));

  it('should close menu on outside click', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    const { input } = getElements(nativeElement);

    expectMenuExpanded(nativeElement, false);

    componentInstance.value = 'DE';
    fixture.detectChanges();
    expectMenuExpanded(nativeElement, true);

    input.click();
    fixture.detectChanges();
    expectMenuExpanded(nativeElement, true);

    document.body.click();
    fixture.detectChanges();
    expectMenuExpanded(nativeElement, false);
  }));

  it('should handle objects using `field` property', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    spyOn(componentInstance, 'onSelect');

    componentInstance.value = 'DE';
    fixture.detectChanges();
    expectOptions(fixture, ['ABCDE', 'DEFGH']);

    const { options } = getElements(nativeElement);
    options[1].click();
    expect(componentInstance.onSelect).toHaveBeenCalledWith({id: 2, name: 'DEFGH'});
  }, `<ngl-lookup [value]="value" [lookup]="filterObject" field="name" (pickChange)="onSelect($event)" debounce="0"></ngl-lookup>`));

  it('should support keyboard navigation and selection', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    const { input } = getElements(nativeElement);

    function expectActiveOption(keyEvent: string, option: HTMLElement = null) {
      dispatchKeyEvent(fixture, By.css('input'), `keydown.${keyEvent}`);
      fixture.detectChanges();

      if (option) {
        expect(input.getAttribute('aria-activedescendant')).toBe(option.children[0].id);
        expect(input.value).toBe(option.children[0].textContent);
      } else {
        expect(input.getAttribute('aria-activedescendant')).toBeNull();
      }
    }

    expect(input.getAttribute('aria-activedescendant')).toBeNull();

    spyOn(componentInstance, 'onSelect');

    componentInstance.value = 'DE';
    fixture.detectChanges();
    expectOptions(fixture, ['ABCDE', 'DEFGH']);

    const { options } = getElements(nativeElement);

    expectActiveOption('ArrowDown', options[0]);
    expectActiveOption('ArrowDown', options[1]);
    expectActiveOption('ArrowDown', options[1]);

    expectActiveOption('ArrowUp', options[0]);
    expectActiveOption('ArrowUp', null);
    expectActiveOption('ArrowUp', null);

    dispatchKeyEvent(fixture, By.css('input'), `keydown.Enter`);
    expect(componentInstance.onSelect).not.toHaveBeenCalled();

    expectActiveOption('ArrowDown', options[0]);

    dispatchKeyEvent(fixture, By.css('input'), `keydown.Enter`);
    expect(componentInstance.onSelect).toHaveBeenCalledWith('ABCDE');
  }));

  it('should support custom item template', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { componentInstance, nativeElement } = fixture;
    componentInstance.filter = () => [
      { foo: 'foo_1', bar: 'bar_1' },
      { foo: 'foo_2', bar: 'bar_2' },
    ];
    fixture.detectChanges();

    componentInstance.value = 'DE';
    fixture.detectChanges();

    const { options } = getElements(nativeElement);
    expect(options[0]).toHaveText('foo_1 - bar_1 DE');
    expect(options[1]).toHaveText('foo_2 - bar_2 DE');
  }, `<ngl-lookup [value]="value" [lookup]="filter" [pick]="selection" (pickChange)="onSelect($event)" debounce="0">
        <span nglLookupLabel>Lookup:</span>
        <template nglLookupItem let-ctx>{{ctx.foo}} - {{ctx.bar}} {{value}}</template>
      </ngl-lookup>`));
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
  directives: [NGL_LOOKUP_DIRECTIVES],
  template: `
    <ngl-lookup [value]="value" [lookup]="filter" [pick]="selection" (pickChange)="onSelect($event)" debounce="0">
      <span nglLookupLabel>Lookup:</span>
    </ngl-lookup>`,
})
export class TestComponent {

  selection: any;

  value = '';

  filter = jasmine.createSpy('filter').and.callFake((value: string) => {
    const data = ['ABCDE', 'DEFGH', 'EHIJ'];
    return data.filter((d: string) => d.indexOf(value) > -1);
  });

  filterObject(value: string) {
    const data = [
      {id: 1, name: 'ABCDE'},
      {id: 2, name: 'DEFGH'},
      {id: 3, name: 'EHIJ'},
    ];
    return data.filter((d: any) => d.name.indexOf(value) > -1);
  }

  onSelect(selection: any) {
    this.selection = selection;
  }
}
