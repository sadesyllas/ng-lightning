import {it, describe, expect, inject, async} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglBreadcrumbs} from './breadcrumbs';
import {NglBreadcrumb} from './breadcrumb';

function getBreadcrumbsLinks(element: HTMLElement): HTMLLinkElement[] {
 return [].slice.call(element.querySelectorAll('a'));
}

function getAssistiveText(element: HTMLElement): HTMLElement {
  return <HTMLElement>element.querySelector('.slds-assistive-text');
}

describe('Breadcrumbs Component', () => {

  it('should have anchor across the path', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const anchors: HTMLLinkElement[] = getBreadcrumbsLinks(fixture.nativeElement);

    fixture.detectChanges();
    expect(anchors.map(el => el.getAttribute('href'))).toEqual(['/here', '/there']);
    expect(anchors.map(el => el.textContent)).toEqual(['Here I am!', 'There I was!']);
    anchors.forEach(el => expect(el.parentElement).toHaveCssClass('slds-list__item'));
  }));

  it('should render assistive text correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const assistiveText = getAssistiveText(fixture.nativeElement);
    fixture.detectChanges();
    expect(assistiveText).toHaveText('Here you are:');
  }, `<ngl-breadcrumbs [assistiveText]="text"></ngl-breadcrumbs>`));

  it('should set `aria-labelledby`', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const assistiveText = getAssistiveText(fixture.nativeElement);
    const breadcrumbEl = fixture.nativeElement.querySelector('.slds-breadcrumb');
    expect(assistiveText.id).toEqual(breadcrumbEl.getAttribute('aria-labelledby'));
  }));
});

// Shortcut function for less boilerplate on each `it`
function testAsync(fn: (value: ComponentFixture<TestComponent>) => void, html: string = null) {
  return async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.overrideTemplate(TestComponent, html).createAsync(TestComponent).then(fn);
  }));
}

@Component({
  directives: [NglBreadcrumbs, NglBreadcrumb],
  template: `
    <ngl-breadcrumbs [assistiveText]="text">
      <ngl-breadcrumb href="/here">Here I am!</ngl-breadcrumb>
      <ngl-breadcrumb href="/there">There I was!</ngl-breadcrumb>
    </ngl-breadcrumbs>`,
})
export class TestComponent {
  text: string = 'Here you are:';
}
