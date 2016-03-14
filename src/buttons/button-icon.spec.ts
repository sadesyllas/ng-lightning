import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglButtonIcon} from './button-icon';

function getButtonElement(element: Element): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('button');
}

describe('`nglButtonIcon`', () => {

  it('should render the appropriate button icon class based on input', testAsync(({fixture, done}) => {
    const {componentInstance, nativeElement} = fixture;
    const button = getButtonElement(nativeElement);

    fixture.detectChanges();
    expect(button).toHaveCssClass('slds-button');
    expect(button).toHaveCssClass('slds-button--icon-border');

    componentInstance.style = '';
    fixture.detectChanges();
    expect(button).not.toHaveCssClass('slds-button--icon');
    expect(button).toHaveCssClass('slds-button--icon-border');

    componentInstance.style = 'container';
    fixture.detectChanges();
    expect(button).toHaveCssClass('slds-button--icon-container');
    expect(button).not.toHaveCssClass('slds-button--icon');

    componentInstance.style = null;
    fixture.detectChanges();
    expect(button).toHaveCssClass('slds-button--icon-border');
    expect(button).not.toHaveCssClass('slds-button--icon-container');
    done();
  }));

  it('should render the default button icon when attribute value is empty', testAsync(({fixture, done}) => {
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    expect(button).toHaveCssClass('slds-button--icon-border');
    expect(button).not.toHaveCssClass('slds-button--icon');
    done();
  }, `<button nglButtonIcon=""></button>`));


  it('should render the default button icon when attribute value is not set', testAsync(({fixture, done}) => {
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    expect(button).not.toHaveCssClass('slds-button--icon');
    expect(button).toHaveCssClass('slds-button--icon-border');
    done();
  }, `<button nglButtonIcon></button>`));

  it('should render the bare button for \'\'', testAsync(({fixture, done}) => {
    fixture.detectChanges();

    const button = getButtonElement(fixture.nativeElement);
    expect(button).toHaveCssClass('slds-button--icon');
    expect(button).not.toHaveCssClass('slds-button--icon-border');
    done();
  }, `<button nglButtonIcon="''"></button>`));
});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(fn: Function, html: string = null ) {
  return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return new Promise((done: Function) => {
      if (html) {
        tcb = tcb.overrideTemplate(TestComponent, html);
      }
      tcb.createAsync(TestComponent).then((fixture) => fn({fixture, done}));
    });
  });
}

@Component({
  directives: [NglButtonIcon],
  template: `<button [nglButtonIcon]="style"></button>`,
})
export class TestComponent {
  style: string;
}
