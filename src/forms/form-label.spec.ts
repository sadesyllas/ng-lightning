import {TestBed, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {createGenericTestComponent} from '../../test/util/helpers';
import {NglFormsModule} from './module';

const createTestComponent = (html?: string, detectChanges?: boolean) =>
  createGenericTestComponent(TestComponent, html, detectChanges) as ComponentFixture<TestComponent>;

export function getLabelElement(element: Element): HTMLLabelElement {
  return <HTMLLabelElement>element.querySelector('.slds-form-element__label');
}

describe('`NglFormLabelTemplate`', () => {

  beforeEach(() => TestBed.configureTestingModule({declarations: [TestComponent], imports: [NglFormsModule]}));

  it('should render correctly inside form element', () => {
    const fixture = createTestComponent(`
      <ngl-form-element>
        <template nglFormLabel>{{ label }}</template>
        <input nglFormControl type="text">
      </ngl-form-element>`);
    const labelEl = getLabelElement(fixture.nativeElement);
    expect(labelEl).toHaveText('My Label');
  });

  it('should render correctly inside form group', () => {
    const fixture = createTestComponent(`<fieldset ngl-form-group-alt><template nglFormLabel>{{ label }}</template></fieldset>`);
    const labelEl = getLabelElement(fixture.nativeElement);
    expect(labelEl).toHaveText('My Label');
  });

  it('should render correctly inside form group element', () => {
    const fixture = createTestComponent(`
      <fieldset ngl-form-group-alt>
        <template nglFormLabel>{{ label }}</template>
        <ngl-form-group-element><template nglFormLabel>Checkbox label</template><input nglFormControl type="checkbox" /></ngl-form-group-element>
      </fieldset>`);

    const labelEl = getLabelElement(fixture.nativeElement);
    expect(labelEl).toHaveText('My Label');
    expect(fixture.nativeElement.querySelector('label').textContent.trim()).toBe('Checkbox label');
  });
});


@Component({ template: '' })
export class TestComponent {
  label = 'My Label';
}
