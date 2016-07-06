import {inject, async, TestComponentBuilder, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {NglFormGroup} from './group';

function getLabelElement(element: Element): HTMLLabelElement {
  return <HTMLLabelElement>element.querySelector('legend');
}

function getErrorElement(element: Element): HTMLDivElement {
  return <HTMLDivElement>element.querySelector('.slds-form-element__help');
}

function getRequiredElement(element: Element): HTMLDivElement {
  return <HTMLDivElement>element.querySelector('abbr');
}

describe('`NglFormGroup`', () => {

  it('should render correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const element = fixture.nativeElement.firstElementChild;
    expect(element).toHaveCssClass('slds-form-element');

    const labelEl = getLabelElement(element);
    expect(labelEl).toHaveText('Group Label');
  }));

  it('should be able to change label', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    fixture.componentInstance.label = 'Another label';
    fixture.detectChanges();

    const labelEl = getLabelElement(fixture.nativeElement);
    expect(labelEl).toHaveText('Another label');
  }));

  it('should render error message', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const element = fixture.nativeElement.firstElementChild;

    expect(element).not.toHaveCssClass('slds-has-error');
    expect(getErrorElement(element)).toBeFalsy();
    fixture.componentInstance.error = 'This is an error!';
    fixture.detectChanges();

    const errorEl = getErrorElement(element);
    expect(element).toHaveCssClass('slds-has-error');
    expect(errorEl).toHaveText('This is an error!');
  }, `<fieldset ngl-form-group [nglFormError]="error"></fieldset>`));

  it('should show required label indication', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expect(getRequiredElement(fixture.nativeElement)).toBeFalsy();

    fixture.componentInstance.required = true;
    fixture.detectChanges();
    const abbrEl = getRequiredElement(fixture.nativeElement);
    expect(abbrEl).toHaveCssClass('slds-required');

    fixture.componentInstance.required = false;
    fixture.detectChanges();
    expect(getRequiredElement(fixture.nativeElement)).toBeFalsy();
  }, `<fieldset ngl-form-group [nglFormRequired]="required"></fieldset>`));

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
  directives: [NglFormGroup],
  template: `
    <fieldset ngl-form-group [nglFormLabel]="label"></fieldset>
  `,
})
export class TestComponent {
  label: string = 'Group Label';
}
