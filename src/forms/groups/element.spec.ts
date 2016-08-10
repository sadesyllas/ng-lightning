import {TestBed, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {createGenericTestComponent, selectElements} from '../../../test/util/helpers';
import {NglFormsModule} from '../module';

const createTestComponent = (html?: string, detectChanges?: boolean) =>
  createGenericTestComponent(TestComponent, html, detectChanges) as ComponentFixture<TestComponent>;

function getLabelElements(element: HTMLElement): HTMLElement[] {
  return selectElements(element, 'label');
}

function getInputElements(element: HTMLElement): HTMLElement[] {
  return selectElements(element, 'input');
}

describe('`NglFormGroupElement`', () => {

  beforeEach(() => TestBed.configureTestingModule({declarations: [TestComponent], imports: [NglFormsModule]}));

  it('should render checkbox group correctly', () => {
    const fixture = createTestComponent(`<fieldset ngl-form-group>
          <label ngl-form-group-element [nglFormLabel]="label"><input type="checkbox" /></label>
          <label ngl-form-group-element nglFormLabel="Checkbox Label Two"><input type="checkbox" /></label>
        </fieldset>`);
    const labelEls = getLabelElements(fixture.nativeElement);
    expect(labelEls.map(e => e.textContent.trim())).toEqual(['Label One', 'Checkbox Label Two']);

    labelEls.forEach(e => {
      expect(e).toHaveCssClass('slds-checkbox');

      const fauxEl = e.querySelector('.slds-checkbox--faux');
      expect(fauxEl).toBeTruthy();
    });
  });

  it('should render radio group correctly', () => {
    const fixture = createTestComponent(`
      <fieldset ngl-form-group>
        <label ngl-form-group-element [nglFormLabel]="label"><input type="radio" /></label>
        <label ngl-form-group-element nglFormLabel="Radio Label Two"><input type="radio" /></label>
      </fieldset>`);
    const labelEls = getLabelElements(fixture.nativeElement);
    expect(labelEls.map(e => e.textContent.trim())).toEqual(['Label One', 'Radio Label Two']);

    labelEls.forEach(e => {
      expect(e).toHaveCssClass('slds-radio');

      const fauxEl = e.querySelector('.slds-radio--faux');
      expect(fauxEl).toBeTruthy();
    });

    const names = getInputElements(fixture.nativeElement).map(e => e.getAttribute('name'));
    expect(names[0]).toMatch(/form_group_/);
    expect(names[0]).toEqual(names[1]);
  });

  it('should not leak outside parent', () => {
    const fixture = createTestComponent(`<input type="radio" />`);
    const inputEl = fixture.nativeElement.querySelector('input');
    expect(inputEl.getAttribute('name')).toBeNull();
  });
});

@Component({ template: '' })
export class TestComponent {
  label: string = 'Label One';
}
