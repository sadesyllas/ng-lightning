import {TestBed, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {createGenericTestComponent} from '../../../test/util/helpers';
import {NglFormsModule} from '../module';
import {getLabelElement, getRequiredElement} from './input.spec';

const createTestComponent = (html?: string, detectChanges?: boolean) =>
  createGenericTestComponent(TestComponent, html, detectChanges) as ComponentFixture<TestComponent>;

function getInputElement(element: Element): HTMLTextAreaElement {
  return <HTMLTextAreaElement>element.querySelector('textarea');
}

describe('`NglFormTextarea`', () => {

  beforeEach(() => TestBed.configureTestingModule({declarations: [TestComponent], imports: [NglFormsModule]}));

  it('should render correctly', () => {
    const fixture = createTestComponent();
    const element = fixture.nativeElement.firstElementChild;
    expect(element).toHaveCssClass('slds-form-element');

    const labelEl = getLabelElement(element);
    expect(labelEl).toHaveText('My label');

    const inputEl = getInputElement(element);
    expect(inputEl).toHaveCssClass('slds-textarea');

    const inputId = inputEl.getAttribute('id');
    expect(inputId).toMatch(/form_element_/);
    expect(inputId).toEqual(labelEl.getAttribute('for'));
  });

  it('should hook label indication on input required', () => {
    const fixture = createTestComponent(`<ngl-form-element><textarea [required]="required"></textarea></ngl-form-element>`);
    expect(getRequiredElement(fixture.nativeElement)).toBeFalsy();

    fixture.componentInstance.required = true;
    fixture.detectChanges();
    const abbrEl = getRequiredElement(fixture.nativeElement);
    expect(abbrEl).toHaveCssClass('slds-required');

    fixture.componentInstance.required = false;
    fixture.detectChanges();
    expect(getRequiredElement(fixture.nativeElement)).toBeFalsy();
  });

  it('should not leak outside parent', () => {
    const fixture = createTestComponent(`<textarea class="out"></textarea><ngl-form-element><textarea class="in"></textarea></ngl-form-element>`);
    expect(fixture.nativeElement.querySelector('.out')).not.toHaveCssClass('slds-textarea');
    expect(fixture.nativeElement.querySelector('.in')).toHaveCssClass('slds-textarea');
  });

});

@Component({
  template: `
    <ngl-form-element [nglFormLabel]="label">
      <textarea></textarea>
    </ngl-form-element>
  `,
})
export class TestComponent {
  label: string = 'My label';
  required: boolean;
}
