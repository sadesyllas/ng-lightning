import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglSpinner} from './spinner';

function getSpinnerElement(element: Element): HTMLDivElement {
  return <HTMLDivElement>element.querySelector('.slds-spinner');
}

describe('Spinner Component', () => {

  it('should render a medium spinner', testAsync(`<ngl-spinner></ngl-spinner>`, ({fixture, done}) => {
    fixture.detectChanges();

    const spinner = getSpinnerElement(fixture.nativeElement);
    const image: HTMLImageElement = <HTMLImageElement>spinner.firstChild;

    expect(spinner).toBeDefined();
    expect(spinner).toHaveCssClass('slds-spinner--medium');
    expect(image).toBeDefined();
    done();
  }));

  it('should render a large spinner based on input', testAsync(`<ngl-spinner [size]="'large'" ></ngl-spinner>`, ({fixture, done}) => {
    fixture.detectChanges();
    const spinner = getSpinnerElement(fixture.nativeElement);
    expect(spinner).toHaveCssClass('slds-spinner--large');
    done();
  }));

  it('should render a themed spinner based on input', testAsync(`<ngl-spinner type="brand" ></ngl-spinner>`, ({fixture, done}) => {
    fixture.detectChanges();
    const spinner = getSpinnerElement(fixture.nativeElement);
    expect(spinner).toHaveCssClass('slds-spinner--brand');
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
  directives: [NglSpinner],
  template: '',
})
export class TestComponent {
}
