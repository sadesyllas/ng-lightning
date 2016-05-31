import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {selectElements, dispatchKeyEvent} from '../../test/helpers';
import {By} from '@angular/platform-browser';
import {NglLookup} from './lookup';

function getElements(element: HTMLElement) {
  return {
    label: <HTMLLabelElement>element.querySelector('label'),
    input: <HTMLInputElement>element.querySelector('input'),
    menu: <HTMLInputElement>element.querySelector('.slds-lookup__menu'),
    options: selectElements(element, '.slds-lookup__item'),
    pill: getPill(element),
  };
}

function getPill(element: HTMLElement) {
  return <HTMLAnchorElement>element.querySelector('a');
}

function clickRemove(element: HTMLElement) {
  const button = <HTMLButtonElement>element.querySelector('button');
  button.click();
}

function expectOptions(fixture: any, expectedOptions: any[], cb = function() {}) {
  setTimeout(() => {
    fixture.detectChanges();
    const { menu, options } = getElements(fixture.nativeElement);
    expect(menu).not.toHaveCssClass('slds-hide');
    expect(options.map(e => e.textContent.trim())).toEqual(expectedOptions);
    cb();
  });
}

function expectMenuExpanded(element: HTMLElement, isOpen: boolean) {
  const { menu, input } = getElements(element);
  expect(input.getAttribute('aria-expanded')).toBe(isOpen.toString());
  if (isOpen) {
    expect(menu).not.toHaveCssClass('slds-hide');
  } else {
    expect(menu).toHaveCssClass('slds-hide');
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
  }, `<ngl-lookup [lookup]="filter" [placeholder]="placeholder"></ngl-lookup>`));

  it('should toggle pill and input based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const { input } = getElements(fixture.nativeElement);
    expect(input).not.toHaveCssClass('slds-hide');
    expect(getPill(fixture.nativeElement)).toBeFalsy();

    fixture.componentInstance.selection = 'my selection';
    fixture.detectChanges();

    expect(input).toHaveCssClass('slds-hide');
    expect(getPill(fixture.nativeElement).textContent.trim()).toBe('my selection');

    fixture.componentInstance.selection = null;
    fixture.detectChanges();
    expect(input).not.toHaveCssClass('slds-hide');
    expect(input.value).toBe('');
    expect(getPill(fixture.nativeElement)).toBeFalsy();
  }, `<ngl-lookup [lookup]="filter" [pick]="selection"></ngl-lookup>`));

  it('should remove selection when clicking on pill button', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.selection = 'my selection';
    fixture.detectChanges();

    const { input } = getElements(fixture.nativeElement);

    spyOn(input, 'focus');

    clickRemove(fixture.nativeElement);
    expect(fixture.componentInstance.selection).toBe(null);

    fixture.detectChanges();
    expect(input.focus).toHaveBeenCalled();
  }, `<ngl-lookup [lookup]="filter" [(pick)]="selection"></ngl-lookup>`));

  it('should close menu when there is selection', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    componentInstance.value = 'DE';
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      expectMenuExpanded(nativeElement, true);

      fixture.componentInstance.selection = 'my selection';
      fixture.detectChanges();
      expectMenuExpanded(nativeElement, false);
    });
  }, `<ngl-lookup [value]="value" [lookup]="filter" [pick]="selection" debounce="0"></ngl-lookup>`));

  it('should trigger lookup function when value changes', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { componentInstance } = fixture;
    fixture.detectChanges();

    spyOn(componentInstance, 'filter').and.callFake((value: string) => {
      switch (componentInstance.filter.calls.count()) {
        case 1:
          expect(componentInstance.filter).toHaveBeenCalledWith('ABC');
          break;
        case 2:
          expect(componentInstance.filter).toHaveBeenCalledWith('ABCDE');
          break;
      }
    });

    componentInstance.value = 'ABC';
    fixture.detectChanges();

    componentInstance.value = 'ABCDE';
    fixture.detectChanges();
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
    expectOptions(fixture, ['ABCDE', 'DEFGH'], () => {
      const { options } = getElements(nativeElement);
      options[1].click();
      expect(componentInstance.onSelect).toHaveBeenCalledWith('DEFGH');
    });
  }));

  it('should close menu on escape key', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    expectMenuExpanded(nativeElement, false);

    componentInstance.value = 'DE';
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      expectMenuExpanded(nativeElement, true);

      dispatchKeyEvent(fixture, By.css('input'), 'keydown.Esc');
      fixture.detectChanges();
      expectMenuExpanded(nativeElement, false);
    });
  }));

  it('should close menu on outside click', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    const { input } = getElements(nativeElement);

    expectMenuExpanded(nativeElement, false);

    componentInstance.value = 'DE';
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      expectMenuExpanded(nativeElement, true);

      input.click();
      fixture.detectChanges();
      expectMenuExpanded(nativeElement, true);

      document.body.click();
      fixture.detectChanges();
      expectMenuExpanded(nativeElement, false);
    });
  }));

  it('should handle objects using `field` property', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    spyOn(componentInstance, 'onSelect');

    componentInstance.value = 'DE';
    fixture.detectChanges();
    expectOptions(fixture, ['ABCDE', 'DEFGH'], () => {
      const { options } = getElements(nativeElement);
      options[1].click();
      expect(componentInstance.onSelect).toHaveBeenCalledWith({id: 2, name: 'DEFGH'});
    });
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
    expectOptions(fixture, ['ABCDE', 'DEFGH'], () => {
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
    });
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
  directives: [NglLookup],
  template: `
    <ngl-lookup [value]="value" [lookup]="filter" [pick]="selection" (pickChange)="onSelect($event)" debounce="0">
      <span nglLookupLabel>Lookup:</span>
    </ngl-lookup>`,
})
export class TestComponent {

  selection: any;

  value = '';

  filter(value: string) {
    const data = ['ABCDE', 'DEFGH', 'EHIJ'];
    return data.filter((d: string) => d.indexOf(value) > -1);
  }

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
