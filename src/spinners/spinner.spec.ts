import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglSpinner} from './spinner';

function getSpinnerElement(element: Element): HTMLDivElement {
  return <HTMLDivElement>element.querySelector('.slds-spinner');
}

function getSpinnerContainer(element: Element): HTMLDivElement {
  return <HTMLDivElement>element.firstElementChild;
}

describe('Spinner Component', () => {

  it('should render a medium spinner', testAsync(({fixture, done}) => {
    fixture.detectChanges();

    const spinner = getSpinnerElement(fixture.nativeElement);
    const image: HTMLImageElement = <HTMLImageElement>spinner.firstChild;
    const container = getSpinnerContainer(fixture.nativeElement);

    expect(spinner).toBeDefined();
    expect(spinner).toHaveCssClass('slds-spinner--medium');
    expect(container).not.toHaveCssClass('slds-spinner_container');
    expect(image).toBeDefined();
    done();
  }));

  it('should render a large spinner based on input', testAsync(({fixture, done}) => {
    fixture.detectChanges();
    const spinner = getSpinnerElement(fixture.nativeElement);
    expect(spinner).toHaveCssClass('slds-spinner--large');
    done();
  }, `<ngl-spinner [size]="'large'" ></ngl-spinner>`));

  it('should render a themed spinner based on input', testAsync(({fixture, done}) => {
    fixture.detectChanges();
    const spinner = getSpinnerElement(fixture.nativeElement);
    expect(spinner).toHaveCssClass('slds-spinner--brand');
    done();
  }, `<ngl-spinner type="brand" ></ngl-spinner>`));

  it('should apply container class if attribute exists', testAsync(({fixture, done}) => {
    const container = getSpinnerContainer(fixture.nativeElement);
    fixture.detectChanges();
    expect(container).toHaveCssClass('slds-spinner_container');
    done();
  }, `<ngl-spinner container></ngl-spinner>`));

  it('should apply container class based on input', testAsync(({fixture, done}) => {
    const {nativeElement, componentInstance} = fixture;
    const container = getSpinnerContainer(nativeElement);
    fixture.detectChanges();
    expect(container).toHaveCssClass('slds-spinner_container');

    componentInstance.container = false;
    fixture.detectChanges();
    expect(container).not.toHaveCssClass('slds-spinner_container');
    done();
  }, `<ngl-spinner [container]="container"></ngl-spinner>`));

});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(fn: Function, html: string = '') {
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
  directives: [NglSpinner],
  template: `<ngl-spinner></ngl-spinner>`,
})
export class TestComponent {
  container = true;
}
