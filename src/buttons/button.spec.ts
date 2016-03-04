import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglButton} from './button';

function getButtonElement(element: Element): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('button');
}

describe('`nglButton`', () => {

  it('should render the default button', testAsync(`<button nglButton>Go</button>`, ({fixture, done}) => {
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    expect(button).toHaveCssClass('slds-button');
    done();
  }));

  it('should render dynamic style', testAsync(`<button [nglButton]="style">Go</button>`, ({fixture, done}) => {
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
function testAsync(html: string, fn: Function) {
  return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return new Promise((done: Function) => {
      tcb.overrideTemplate(TestComponent, html).createAsync(TestComponent).then((fixture) => fn({ fixture, done}));
    });
  });
}

@Component({
  directives: [NglButton],
  template: '',
})
export class TestComponent {
  style: string = 'brand';
  size: string;
}
