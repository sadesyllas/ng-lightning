import {inject, async, TestComponentBuilder, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {NglIconSvg} from './svg';
import {provideNglConfig} from '../config/config';

describe('SVG icon Component', () => {

  it('should render correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const svg = fixture.nativeElement.firstElementChild;
    const use = svg.querySelector('use');

    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(use.getAttribute('xlink:href')).toBe('/mypath/utility-sprite/svg/symbols.svg#warning');
  }, `<svg nglIcon="warning"></svg>`));

  it('should change `use` path based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.icon = 'icon1';
    fixture.componentInstance.category = 'custom';
    fixture.detectChanges();

    const use = fixture.nativeElement.firstElementChild.querySelector('use');
    expect(use.getAttribute('xlink:href')).toBe('/mypath/custom-sprite/svg/symbols.svg#icon1');

    fixture.componentInstance.icon = 'icon2';
    fixture.componentInstance.category = 'standard';
    fixture.detectChanges();
    expect(use.getAttribute('xlink:href')).toBe('/mypath/standard-sprite/svg/symbols.svg#icon2');
  }, `<svg [nglIcon]="icon" [nglIconCategory]="category"></svg>`));

});

// Shortcut function for less boilerplate on each `it`
function testAsync(fn: (value: ComponentFixture<TestComponent>) => void, html: string = null) {
  return async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.overrideTemplate(TestComponent, html).createAsync(TestComponent).then(fn);
  }));
}

@Component({
  directives: [NglIconSvg],
  template: '',
  providers: [provideNglConfig({svgPath: '/mypath'})],
})
export class TestComponent {}
