import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglButton} from './button';
import {NglIcon} from '../icons/icon';

function getButtonElement(element: Element): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('button');
}

describe('`nglButton`', () => {

  it('should render the default button', testAsync(({fixture, done}) => {
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    expect(button).toHaveCssClass('slds-button');
    done();
  }));

  it('should render icon correctly', testAsync(({fixture, done}) => {
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    const icon = button.querySelector('svg');
    expect(icon).toHaveCssClass('slds-button__icon');
    expect(icon).toHaveCssClass('slds-button__icon--left');
    done();
  }, `<button [nglButton]="style"><ngl-icon icon="download" align="left"></ngl-icon> Download</button>`));

  it('should render dynamic style', testAsync(({fixture, done}) => {
    const { componentInstance } = fixture;
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    expect(button).toHaveCssClass('slds-button');
    expect(button).toHaveCssClass('slds-button--brand');

    componentInstance.style = 'destructive';
    fixture.detectChanges();
    expect(button).toHaveCssClass('slds-button');
    expect(button).toHaveCssClass('slds-button--destructive');
    expect(button).not.toHaveCssClass('slds-button--brand');

    componentInstance.style = null;
    fixture.detectChanges();
    expect(button).toHaveCssClass('slds-button');
    expect(button).not.toHaveCssClass('slds-button--destructive');
    expect(button).not.toHaveCssClass('slds-button--brand');
    done();
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
  directives: [NglButton, NglIcon],
  template: `<button [nglButton]="style">Go <</button>`,
})
export class TestComponent {
  style: string = 'brand';
  size: string;
}
