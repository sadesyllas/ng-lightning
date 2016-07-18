import {inject, async, TestComponentBuilder, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {selectElements} from '../../test/util/helpers';
import {NGL_LOOKUP_DIRECTIVES} from './directives';
import {expectMenuExpanded, getPill} from './lookup.spec';


function getScopeLabelText(element: HTMLElement) {
  return element.querySelector('[nglpolymorphiclabel]').textContent.trim();
}

function getScopeOptions(element: HTMLElement) {
  return selectElements(element, '.slds-align-middle .slds-dropdown__item > a');
}

function expectScopeOptions(element: HTMLElement, expected: any[]) {
  const options = getScopeOptions(element);
  expect(options.map(e => e.textContent.trim())).toEqual(expected);
}

function expectPlaceholder(element: HTMLElement, expected: string) {
  const input = <HTMLInputElement>element.querySelector('input');
  expect(input.placeholder).toEqual(expected);
}

function clickScopeMenuTrigger(fixture: ComponentFixture<any>) {
  const triggerEl = <HTMLButtonElement>fixture.nativeElement.querySelector('[ngldropdowntrigger]');
  triggerEl.click();
  fixture.detectChanges();
}

function expectScopeMenuOpen(element: HTMLElement, isOpen: boolean) {
  const dropdownEl = element.querySelector('.slds-align-middle > span');
  if (isOpen) {
    expect(dropdownEl).toHaveCssClass('slds-is-open');
  } else {
    expect(dropdownEl).not.toHaveCssClass('slds-is-open');
  }
}


describe('Lookup Polymorphic', () => {

  it('should render correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    expect(getScopeLabelText(fixture.nativeElement)).toBe('Approvals');
    expectPlaceholder(fixture.nativeElement, 'Search Approvals');

    expectScopeMenuOpen(fixture.nativeElement, false);
    expectScopeOptions(fixture.nativeElement, []);
    expectMenuExpanded(fixture.nativeElement, false);

    expect(getPill(fixture.nativeElement)).toBeFalsy();
  }));

  it('shoulp open menu on trigger click', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    clickScopeMenuTrigger(fixture);
    expectScopeMenuOpen(fixture.nativeElement, true);
    expectScopeOptions(fixture.nativeElement, [ '1. Accounts', '2. Approvals', '3. Lead' ]);
  }));

  it('shoulp change scope based on click', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    clickScopeMenuTrigger(fixture);
    const options = getScopeOptions(fixture.nativeElement);
    options[2].click();
    fixture.detectChanges();
    expectScopeMenuOpen(fixture.nativeElement, false);
    expect(getScopeLabelText(fixture.nativeElement)).toBe('Lead');
    expectPlaceholder(fixture.nativeElement, 'Search Lead');
  }));

  it('should close results menu when scope menu opens', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    fixture.componentInstance.value = 'DE';
    fixture.detectChanges();
    expectMenuExpanded(fixture.nativeElement, true);

    clickScopeMenuTrigger(fixture);
    fixture.detectChanges();
    expectScopeMenuOpen(fixture.nativeElement, true);
    expectMenuExpanded(fixture.nativeElement, false);
  }));
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
  directives: [NGL_LOOKUP_DIRECTIVES],
  template: `
    <ngl-lookup [value]="value" [lookup]="filter" [(pick)]="selection" debounce="0" [placeholder]="'Search ' + scope.label">
      <span nglLookupLabel>Lookup:</span>
      <span nglPolymorphicLabel>{{scope.label}}</span>
      <template nglPolymorphicItem [scopes]="scopes" (scopeChange)="scope = $event" let-scope>
        {{ scope.icon }}. {{ scope.label }}
      </template>
    </ngl-lookup>`,
})
export class TestComponent {

  selection: any;

  scopes = [
    { label: 'Accounts', icon: '1' },
    { label: 'Approvals', icon: '2' },
    { label: 'Lead', icon: '3' },
  ];

  scope = this.scopes[1];

  filter = jasmine.createSpy('filter').and.callFake(() => ['ABCDE', 'DEFGH', 'EHIJ']);
}
