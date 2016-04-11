import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
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

  it('should render correctly', testAsync(({fixture, done}) => {
    fixture.detectChanges();

    const dropdownEl = getDropdownElement(fixture.nativeElement);
    expect(dropdownEl).toHaveCssClass('slds-dropdown-trigger');
    expect(dropdownEl).toHaveCssClass('slds-dropdown-trigger--click');
    done();
  }));

  it('should be closed when initialized as closed', testAsync(({fixture, done}) => {
    fixture.detectChanges();

    const dropdownEl = getDropdownElement(fixture.nativeElement);

    expect(dropdownEl).not.toHaveCssClass('slds-is-open');
    expect(dropdownEl.getAttribute('aria-expanded')).toBe('false');

    done();
  }));

  it('should be opened when input variable `open` is set to true', testAsync(({fixture, done}) => {
    fixture.componentInstance.open = true;
    fixture.detectChanges();

    const dropdownEl = getDropdownElement(fixture.nativeElement);

    expect(dropdownEl).toHaveCssClass('slds-is-open');
    expect(dropdownEl.getAttribute('aria-expanded')).toBe('true');

    done();
  }));

  it('should be closed when anything outside the dropdown is clicked', testAsync(({fixture, done}) => {
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    const outsideDropdownElement = getOutsideDropdownElement(fixture.nativeElement);
    fixture.detectChanges();

    const setOpen = fixture.componentInstance.setOpen;
    spyOn(fixture.componentInstance, 'setOpen').and.callFake((isOpen: boolean) => {
      expect(isOpen).toBe(true);

      fixture.componentInstance.setOpen = setOpen;
      fixture.componentInstance.setOpen(true);
      fixture.detectChanges();

      spyOn(fixture.componentInstance, 'setOpen').and.callFake((isOpen: boolean) => {
        expect(isOpen).toBe(false);

        fixture.componentInstance.setOpen = setOpen;
        fixture.componentInstance.setOpen(false);

        done();
      });

      setTimeout(() => {
        outsideDropdownElement.click();
        fixture.detectChanges();
      });
    });

    dropdownTrigger.click();
    fixture.detectChanges();
  }));

  it('should be closed when the ESC key is pressed', testAsync(({fixture, done}) => {
    const dropdown = getDropdownElement(fixture.nativeElement);
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    fixture.detectChanges();

    const setOpen = fixture.componentInstance.setOpen;
    spyOn(fixture.componentInstance, 'setOpen').and.callFake((isOpen: boolean) => {
      expect(isOpen).toBe(true);

      fixture.componentInstance.setOpen = setOpen;
      fixture.componentInstance.setOpen(true);
      fixture.detectChanges();

      spyOn(fixture.componentInstance, 'setOpen').and.callThrough().and.callFake((isOpen: boolean) => {
        expect(isOpen).toBe(false);

        fixture.componentInstance.setOpen = setOpen;
        fixture.componentInstance.setOpen(false);

        setTimeout(() => {
          expect(dropdownTrigger).toEqual(document.activeElement);

          done();
        });
      });

      dispatchKeyEvent(dropdown, 'Escape');
      fixture.detectChanges();
    });

    dropdownTrigger.click();
    fixture.detectChanges();
  }));

  it('should be focus on the first item onced opened and the down arrow key is pressed', testAsync(({fixture, done}) => {
    const dropdown = getDropdownElement(fixture.nativeElement);
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    const dropdownItem = getDropdownItem(fixture.nativeElement);
    fixture.detectChanges();

    const setOpen = fixture.componentInstance.setOpen;
    spyOn(fixture.componentInstance, 'setOpen').and.callFake((isOpen: boolean) => {
      expect(isOpen).toBe(true);

      fixture.componentInstance.setOpen = setOpen;
      fixture.componentInstance.setOpen(true);
      fixture.detectChanges();

      dispatchKeyEvent(dropdown, 'ArrowDown');
      fixture.detectChanges();

      expect(dropdownItem).toEqual(document.activeElement);

      done();
    });

    dropdownTrigger.click();
    fixture.detectChanges();
  }));

  it('should have the `slds-picklist` class when it is also a picklist', testAsync(({fixture, done}) => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.slds-dropdown-trigger')).toHaveCssClass('slds-picklist');
    done();
  }, '<div nglPick nglDropdown></div>'));

});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(fn: Function, html: string = null) {
  return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return new Promise((done: Function) => {
      if (html) {
        tcb = tcb.overrideTemplate(TestComponent, html);
      }
      tcb.createAsync(TestComponent).then(fixture => fn({ fixture, done})).catch(err => console.error(err.stack));
    });
  });
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
