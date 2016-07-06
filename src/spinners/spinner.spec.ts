import {inject, async, TestComponentBuilder, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {NglSpinner} from './spinner';

function getSpinnerElement(element: Element): HTMLDivElement {
  return <HTMLDivElement>element.querySelector('.slds-spinner');
}

function getSpinnerContainer(element: Element): HTMLDivElement {
  return <HTMLDivElement>element.firstElementChild;
}

describe('Spinner Component', () => {

  it('should render a medium spinner', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const spinner = getSpinnerElement(fixture.nativeElement);
    const image: HTMLImageElement = <HTMLImageElement>spinner.firstChild;
    const container = getSpinnerContainer(fixture.nativeElement);

    expect(spinner).toBeDefined();
    expect(spinner).toHaveCssClass('slds-spinner--medium');
    expect(container).not.toHaveCssClass('slds-spinner_container');
    expect(image).toBeDefined();
  }));

  it('should render a large spinner based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const spinner = getSpinnerElement(fixture.nativeElement);
    expect(spinner).toHaveCssClass('slds-spinner--large');
  }, `<ngl-spinner [size]="'large'" ></ngl-spinner>`));

  it('should render a themed spinner based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const spinner = getSpinnerElement(fixture.nativeElement);
    expect(spinner).toHaveCssClass('slds-spinner--brand');
  }, `<ngl-spinner type="brand" ></ngl-spinner>`));

  it('should apply container class if attribute exists', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const container = getSpinnerContainer(fixture.nativeElement);
    fixture.detectChanges();
    expect(container).toHaveCssClass('slds-spinner_container');
  }, `<ngl-spinner container></ngl-spinner>`));

  it('should apply container class based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const {nativeElement, componentInstance} = fixture;
    const container = getSpinnerContainer(nativeElement);
    fixture.detectChanges();
    expect(container).toHaveCssClass('slds-spinner_container');

    componentInstance.container = false;
    fixture.detectChanges();
    expect(container).not.toHaveCssClass('slds-spinner_container');
  }, `<ngl-spinner [container]="container"></ngl-spinner>`));

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
  directives: [NglSpinner],
  template: `<ngl-spinner></ngl-spinner>`,
})
export class TestComponent {
  container = true;
}
