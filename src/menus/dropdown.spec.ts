import {inject, async, TestComponentBuilder, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {NglDropdown} from './dropdown';
import {NglDropdownTrigger} from './dropdown-trigger';
import {NglDropdownItem} from './dropdown-item';
import {dispatchKeyEvent} from '../../test/util/helpers';
import {By} from '@angular/platform-browser';

function getDropdownElement(element: HTMLElement): HTMLElement {
  return <HTMLElement>element.firstElementChild;
}

function getDropdownTrigger(element: HTMLElement): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('button');
}

function getDropdownItem(element: HTMLElement): HTMLElement {
  return <HTMLElement>element.querySelector('[nglDropdownItem]');
}

function getOutsideDropdownElement(element: HTMLElement): HTMLElement {
  return <HTMLElement>element.children[1];
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

  describe('when anything outside the dropdown is clicked', function () {
    it('should close', testAsync((fixture: ComponentFixture<TestComponent>) => {
      const outsideDropdownElement = getOutsideDropdownElement(fixture.nativeElement);
      fixture.componentInstance.open = true;
      fixture.detectChanges();

      spyOn(fixture.componentInstance, 'setOpen').and.callThrough();
      expect(fixture.componentInstance.setOpen).not.toHaveBeenCalled();

      fixture.whenStable().then(() => {
        outsideDropdownElement.click();
        expect(fixture.componentInstance.setOpen).toHaveBeenCalledWith(false);
      });
    }));

    it('should not close when handlePageEvents is false', testAsync((fixture: ComponentFixture<TestComponent>) => {
      const outsideDropdownElement = getOutsideDropdownElement(fixture.nativeElement);
      fixture.componentInstance.handlePageEvents = false;
      fixture.componentInstance.open = true;
      fixture.detectChanges();

      spyOn(fixture.componentInstance, 'setOpen').and.callThrough();
      expect(fixture.componentInstance.setOpen).not.toHaveBeenCalled();

      fixture.whenStable().then(() => {
        outsideDropdownElement.click();
        expect(fixture.componentInstance.setOpen).not.toHaveBeenCalled();
      });
    }, `
      <div nglDropdown [open]="open" (openChange)="setOpen($event)" [handlePageEvents]="handlePageEvents">
        <button type="button" nglDropdownTrigger></button>
        <div nglDropdownItem></div>
      </div>
      <div></div>`));
  });

  it('should be closed when the ESC key is pressed', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    fixture.componentInstance.open = true;
    fixture.detectChanges();


    spyOn(fixture.componentInstance, 'setOpen').and.callThrough();
    expect(fixture.componentInstance.setOpen).not.toHaveBeenCalled();
    expect(dropdownTrigger).not.toEqual(document.activeElement);

    dispatchKeyEvent(fixture, By.directive(NglDropdown), 'keydown.esc');
    expect(fixture.componentInstance.setOpen).toHaveBeenCalledWith(false);
    expect(dropdownTrigger).toEqual(document.activeElement);
  }));

  it('should focus on the first item onced opened and the down arrow key is pressed', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const dropdownTrigger = getDropdownTrigger(fixture.nativeElement);
    const dropdownItem = getDropdownItem(fixture.nativeElement);
    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'setOpen').and.callThrough();

    dropdownTrigger.click();
    expect(fixture.componentInstance.setOpen).toHaveBeenCalledWith(true);

    dispatchKeyEvent(fixture, By.directive(NglDropdown), 'keydown.arrowdown');
    expect(dropdownItem).toEqual(document.activeElement);
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
  directives: [NglDropdown, NglDropdownTrigger, NglDropdownItem],
  template: `
    <div nglDropdown [open]="open" (openChange)="setOpen($event)">
      <button type="button" nglDropdownTrigger></button>
      <div nglDropdownItem></div>
    </div>
    <div></div>`,
})
export class TestComponent {
  open: boolean = false;
  setOpen(open: boolean) {
    this.open = open;
  }
}
