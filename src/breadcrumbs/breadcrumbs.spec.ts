import {it, describe, expect, inject, async} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglBreadcrumbs} from './breadcrumbs';
import {NglBreadcrumb} from './breadcrumb';

function getBreadcrumbsLinks(element: HTMLElement): HTMLLinkElement[] {
 return [].slice.call(element.querySelectorAll('a'));
}

function getAssistiveText(element: HTMLElement): string {
  const el = <HTMLElement>element.querySelector('nav');
  return el.getAttribute('aria-label');
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
    fixture.detectChanges();
    expect(getAssistiveText(fixture.nativeElement)).toEqual('Here you are:');
  }, `<ngl-breadcrumbs [assistiveText]="text"></ngl-breadcrumbs>`));
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
