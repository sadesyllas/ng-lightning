import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglDropdown} from './dropdown';
import {NglDropdownTrigger} from './dropdown-trigger';
import {NglPick} from '../pick/pick';
import {dispatchKeyEvent} from '../../test/helpers';

function getDropdownTrigger(fixtureElement: HTMLElement): HTMLElement {
  return <HTMLElement>fixtureElement.childNodes[0].childNodes[0];
}

describe('`nglDropdownTrigger`', () => {

  it('should have the attribute `aria-haspopup` set to `true`', testAsync(({fixture, done}) => {
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    fixture.detectChanges();
    expect(dropdownTrigger.getAttribute('aria-haspopup')).toBe('true');
    done();
  }));

  it('should toggle the dropdown when it is clicked', testAsync(({fixture, done}) => {
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'setOpen');

    dropdownTrigger.click();
    expect(fixture.componentInstance.setOpen).toHaveBeenCalledWith(true);

    fixture.componentInstance.open = true;
    fixture.detectChanges();

    dropdownTrigger.click();
    expect(fixture.componentInstance.setOpen).toHaveBeenCalledWith(false);

    done();
  }));

  it('should open the dropdown when the down arrow key is pressed while it is focused', testAsync(({fixture, done}) => {
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'setOpen').and.callFake((isOpen: boolean) => {
      expect(isOpen).toBe(true);

      done();
    });

    dispatchKeyEvent(dropdownTrigger, 'ArrowDown');
    fixture.detectChanges();
  }));

  it('should have the `slds-picklist__label` class when belonging to a picklist', testAsync(({fixture, done}) => {
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    fixture.detectChanges();
    expect(dropdownTrigger).toHaveCssClass('slds-picklist__label');
    done();
  }, '<div nglDropdown nglPick><button type="button" nglDropdownTrigger></button></div>'));

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
  directives: [NglDropdown, NglDropdownTrigger, NglPick],
  template: ['<div nglDropdown [open]="open" (openChange)="setOpen($event)">',
    '<button type="button" nglDropdownTrigger></button>',
    '</div>',
  ].join(''),
})
export class TestComponent {
  open: boolean = false;
  setOpen(open: boolean) {
    this.open = open;
  }
}
