import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';
import {Component} from '@angular/core';
import {NglButtonState} from './button-state';
import {NglIcon} from '../icons/icon';
import {selectElements} from '../../test/util/helpers';

function getButtonElement(element: Element): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('button');
}

describe('`nglButtonState`', () => {

  it('should render correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    expect(button.getAttribute('aria-live')).toBe('assertive');

    const icons = selectElements(button, 'svg');
    expect(icons.length).toBe(3);
    icons.forEach((icon) => {
      expect(icon).toHaveCssClass('slds-button__icon--stateful');
      expect(icon).not.toHaveCssClass('slds-icon');
      expect(icon).not.toHaveCssClass('slds-button__icon');
      expect(icon).toHaveCssClass('slds-button__icon--left');
    });
  }));

  it('should toggle state based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const { componentInstance } = fixture;
    const button = getButtonElement(fixture.nativeElement);
    expect(button).toHaveCssClass('slds-not-selected');

    componentInstance.selected = true;
    fixture.detectChanges();
    expect(button).not.toHaveCssClass('slds-not-selected');
    expect(button).toHaveCssClass('slds-is-selected');

    componentInstance.selected = false;
    fixture.detectChanges();
    expect(button).toHaveCssClass('slds-not-selected');
    expect(button).not.toHaveCssClass('slds-is-selected');
  }));

  it('should emit the appopriate state on click', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    spyOn(componentInstance, 'change');

    const button = getButtonElement(nativeElement);
    button.click();
    expect(componentInstance.change).toHaveBeenCalledWith(true);
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
  directives: [NglButtonState, NglIcon],
  template: `
    <button type="button" [nglButtonState]="selected" (nglButtonStateChange)="change($event)">
      <ngl-icon icon="add" state="not-selected">Follow</ngl-icon>
      <ngl-icon icon="check" state="selected">Following</ngl-icon>
      <ngl-icon icon="close" state="selected-focus">Unfollow</ngl-icon>
    </button>
  `,
})
export class TestComponent {
  selected: boolean = false;

  change($event: boolean) {
    this.selected = $event;
  }
}
