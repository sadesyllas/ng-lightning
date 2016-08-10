import {TestBed, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {createGenericTestComponent} from '../../../test/util/helpers';
import {NglFormsModule} from '../module';
import {getLabelElement, getRequiredElement} from './input.spec';

const createTestComponent = (html?: string, detectChanges?: boolean) =>
  createGenericTestComponent(TestComponent, html, detectChanges) as ComponentFixture<TestComponent>;

describe('`NglFormCheckbox`', () => {

  beforeEach(() => TestBed.configureTestingModule({declarations: [TestComponent], imports: [NglFormsModule]}));

  it('should render correctly', () => {
    const fixture = createTestComponent();
    const element = fixture.nativeElement.firstElementChild;
    expect(element).toHaveCssClass('slds-form-element');

    const labelEl = getLabelElement(element);
    expect(labelEl).toHaveText('My label');
    expect(labelEl).toHaveCssClass('slds-checkbox');

    expect(element.querySelector('input[type=checkbox]')).not.toBeNull();
  });

  it('should hook label indication on input required', () => {
    const fixture = createTestComponent(`<ngl-form-element><input type="checkbox" [required]="required" /></ngl-form-element>`);
    expect(getRequiredElement(fixture.nativeElement)).toBeFalsy();

    fixture.componentInstance.required = true;
    fixture.detectChanges();
    const abbrEl = getRequiredElement(fixture.nativeElement);
    expect(abbrEl).toHaveCssClass('slds-required');

    fixture.componentInstance.required = false;
    fixture.detectChanges();
    expect(getRequiredElement(fixture.nativeElement)).toBeFalsy();
  });

});

@Component({
  template: `
    <ngl-form-element [nglFormLabel]="label">
      <input type="checkbox" />
    </ngl-form-element>
  `,
})
export class TestComponent {
  label: string = 'My label';
  required: boolean;
}
