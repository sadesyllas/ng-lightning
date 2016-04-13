import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglButtonState} from './button-state';
import {NglIcon} from '../icons/icon';
import {selectElements} from '../../test/helpers';

function getButtonElement(element: Element): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('button');
}

describe('`nglButtonState`', () => {

  it('should render correctly', testAsync(({ fixture, done }) => {
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
    done();
  }));

  it('should toggle state based on input', testAsync(({ fixture, done }) => {
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
    done();
  }));

  it('should emit the appopriate state on click', testAsync(({ fixture, done }) => {
    const { nativeElement, componentInstance } = fixture;

    spyOn(componentInstance, 'change').and.callFake(() => {
      expect(componentInstance.change).toHaveBeenCalledWith(true);
      done();
    });

    const button = getButtonElement(nativeElement);
    button.click();
  }));

});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(fn: Function, html: string = null) {
  return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return new Promise((done: Function) => {
      if (html) {
        tcb = tcb.overrideTemplate(TestComponent, html);
      }
      tcb.createAsync(TestComponent).then(fixture => fn({ fixture, done})).catch(err => console.error(err.stack || err));
    });
  });
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
