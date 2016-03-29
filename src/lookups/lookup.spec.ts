import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {selectElements, dispatchKeyEvent} from '../../test/helpers';
import {NglLookup} from './lookup';

function getElements(element: HTMLElement) {
  return {
    label: <HTMLLabelElement>element.querySelector('label'),
    input: <HTMLInputElement>element.querySelector('input'),
    menu: <HTMLInputElement>element.querySelector('.slds-lookup__menu'),
    options: selectElements(element, '.slds-lookup__item'),
  };
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

  it('should render correctly', testAsync(({fixture, done}) => {
    fixture.detectChanges();

    const { label, input, options } = getElements(fixture.nativeElement);
    expect(label.textContent.trim()).toEqual('Lookup:');
    expect(label.getAttribute('for')).toEqual(input.id);

    expect(input.value).toBe('');
    expect(input.placeholder).toBe('');

    expectMenuExpanded(fixture.nativeElement, false);
    expect(options.length).toBe(0);
    done();
  }));

  it('should update placeholder based on input', testAsync(({fixture, done}) => {
    fixture.detectChanges();

    const { input } = getElements(fixture.nativeElement);
    expect(input.placeholder).toBe('');

    fixture.componentInstance.placeholder = 'my placeholder';
    fixture.detectChanges();
    expect(input.placeholder).toBe('my placeholder');
    done();
  }, `<ngl-lookup [lookup]="filter" [placeholder]="placeholder">`));

  it('should trigger lookup function when value changes', testAsync(({fixture, done}) => {
    const { componentInstance } = fixture;
    fixture.detectChanges();

    spyOn(componentInstance, 'filter').and.callFake((value: string) => {
      switch (componentInstance.filter.calls.count()) {
        case 1:
          expect(componentInstance.filter).toHaveBeenCalledWith('ABC');
          break;
        case 2:
          expect(componentInstance.filter).toHaveBeenCalledWith('ABCDE');
          done();
          break;
      }
    });

    componentInstance.value = 'ABC';
    fixture.detectChanges();

    componentInstance.value = 'ABCDE';
    fixture.detectChanges();
  }));

  it('should change suggestions based on lookup result', testAsync(({fixture, done}) => {
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
    expectOptions(fixture, ['No results found'], done);
  }));

  it('should update input with selection and close menu', testAsync(({fixture, done}) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    const { input } = getElements(nativeElement);

    spyOn(componentInstance, 'onSelect').and.callFake(() => {
      expect(componentInstance.onSelect).toHaveBeenCalledWith('DEFGH');
      setTimeout(() => {
        fixture.detectChanges();
        expect(input.value).toBe('DEFGH');
        expectMenuExpanded(nativeElement, false);
        done();
      });
    });

    componentInstance.value = 'DE';
    fixture.detectChanges();
    expectOptions(fixture, ['ABCDE', 'DEFGH'], () => {
      const { options } = getElements(nativeElement);
      options[1].click();
    });
  }));

  it('should close menu on escape key', testAsync(({fixture, done}) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    const { input } = getElements(nativeElement);

    expectMenuExpanded(nativeElement, false);

    componentInstance.value = 'DE';
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      expectMenuExpanded(nativeElement, true);

      dispatchKeyEvent(input, 'Escape');
      fixture.detectChanges();
      expectMenuExpanded(nativeElement, false);
      done();
    });
  }));

  it('should close menu on outside click', testAsync(({fixture, done}) => {
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
      done();
    });
  }));

  it('should handle objects using `field` property', testAsync(({fixture, done}) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    const { input } = getElements(nativeElement);

    spyOn(componentInstance, 'onSelect').and.callFake(() => {
      expect(componentInstance.onSelect).toHaveBeenCalledWith({id: 2, name: 'DEFGH'});
      setTimeout(() => {
        fixture.detectChanges();
        expect(input.value).toBe('DEFGH');
        done();
      });
    });

    componentInstance.value = 'DE';
    fixture.detectChanges();
    expectOptions(fixture, ['ABCDE', 'DEFGH'], () => {
      const { options } = getElements(nativeElement);
      options[1].click();
    });
  }, `<ngl-lookup [value]="value" [lookup]="filterObject" field="name" (pick)="onSelect($event)" debounce="0"></ngl-lookup>`));
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
  directives: [NglLookup],
  template: `
    <ngl-lookup [value]="value" [lookup]="filter" (pick)="onSelect($event)" debounce="0">
      <span nglLookupLabel>Lookup:</span>
    </ngl-lookup>`,
})
export class TestComponent {

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

  onSelect(selection: any) {}
}
