import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglButtonState} from './button-state';

function getButtonElement(element: Element): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('button');
}

describe('`nglButtonState`', () => {

  it('should toggle state based on input', testAsync(`
    <button type="button" [(nglButtonState)]="selected"></button>
  `, ({ fixture, done }) => {
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

  it('should emit the appopriate state on click', testAsync(`
    <button type="button" [nglButtonState]="selected" (nglButtonStateChange)="change($event)"></button>
  `, ({ fixture, done }) => {
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
function testAsync(html: string, fn: Function) {
  return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return new Promise((done: Function) => {
      tcb.overrideTemplate(TestComponent, html).createAsync(TestComponent).then((fixture) => fn({ fixture, done}));
    });
  });
}

@Component({
  directives: [NglButtonState],
  template: '',
})
export class TestComponent {
  selected: boolean = false;
  change() {}
}
