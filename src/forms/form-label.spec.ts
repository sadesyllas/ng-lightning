import {inject, async, TestComponentBuilder, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {NglFormLabelTemplate} from './form-label';
import {NglFormElement} from './elements/element';
import {NglFormInput} from './elements/input';
import {NglFormGroupAlternate} from './groups/group-alt';
import {NglFormGroupElement} from './groups/element';
import {NglFormGroupCheckbox} from './groups/input';

export function getLabelElement(element: Element): HTMLLabelElement {
  return <HTMLLabelElement>element.querySelector('.slds-form-element__label');
}

describe('`NglFormLabelTemplate`', () => {

  it('should render correctly inside form element', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const labelEl = getLabelElement(fixture.nativeElement);
    expect(labelEl).toHaveText('My Label');
  }, `<ngl-form-element>
        <template nglFormLabel>{{ label }}</template>
        <input type="text">
      </ngl-form-element>`
  ));

  it('should render correctly inside form group', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const labelEl = getLabelElement(fixture.nativeElement);
    expect(labelEl).toHaveText('My Label');
  }, `<fieldset ngl-form-group-alt><template nglFormLabel>{{ label }}</template></fieldset>`));

  it('should render correctly inside form group element', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const labelEl = getLabelElement(fixture.nativeElement);
    expect(labelEl).toHaveText('My Label');

    expect(fixture.nativeElement.querySelector('label').textContent.trim()).toBe('Checkbox label');
  }, `<fieldset ngl-form-group-alt>
        <template nglFormLabel>{{ label }}</template>
        <label ngl-form-group-element><template nglFormLabel>Checkbox label</template><input type="checkbox" /></label>
      </fieldset>`));
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
  directives: [NglFormLabelTemplate, NglFormElement, NglFormInput, NglFormGroupAlternate, NglFormGroupElement, NglFormGroupCheckbox],
  template: '',
})
export class TestComponent {
  label = 'My Label';
}
