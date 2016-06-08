import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglIcon} from './icon';
import {provideNglConfig} from '../config/config';


function getElements(element: Element) {
  const assistiveEl = element.querySelector('.slds-assistive-text');

  return {
    host: <HTMLElement>element.firstElementChild,
    icon: <HTMLElement>element.querySelector('svg'),
    assistiveText: assistiveEl ? assistiveEl.textContent.trim() : null,
  };
}

describe('Icon Component', () => {

  it('should render all the icon elements', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const { nativeElement } = fixture;
    const { host, icon, assistiveText } = getElements(nativeElement);
    const use = icon.querySelector('use');

    expect(host).not.toHaveCssClass('slds-icon_container');
    expect(icon).toHaveCssClass('slds-icon');
    expect(icon).toHaveCssClass('slds-icon-text-default');
    expect(use.getAttribute('xlink:href')).toBe('/mypath/utility-sprite/svg/symbols.svg#warning');
    expect(assistiveText).toEqual('Help!');
  }, `<ngl-icon icon="warning" alt="Help!"></ngl-icon>`));

  it('should set type based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    const { icon } = getElements(nativeElement);

    componentInstance.type = 'warning';
    fixture.detectChanges();
    expect(icon).toHaveCssClass('slds-icon-text-warning');
    expect(icon).not.toHaveCssClass('slds-icon-text-default');

    componentInstance.type = 'error';
    fixture.detectChanges();
    expect(icon).toHaveCssClass('slds-icon-text-error');
    expect(icon).not.toHaveCssClass('slds-icon-text-warning');

    componentInstance.type = 'false';
    fixture.detectChanges();
    expect(icon).not.toHaveCssClass('slds-icon-text-error');
    expect(icon).not.toHaveCssClass('slds-icon-text-warning');
    expect(icon).not.toHaveCssClass('slds-icon-text-default');
  }, `<ngl-icon icon="warning" [type]="type"></ngl-icon>`));

  it('should set size based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const { nativeElement, componentInstance } = fixture;
    const { icon } = getElements(nativeElement);
    expect(icon).toHaveCssClass('slds-icon--small');

    componentInstance.size = 'large';
    fixture.detectChanges();
    expect(icon).not.toHaveCssClass('slds-icon--small');
    expect(icon).toHaveCssClass('slds-icon--large');
  }, `<ngl-icon icon="warning" [size]="size"></ngl-icon>`));

  it('should allow extra svg classes', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const { nativeElement, componentInstance } = fixture;
    const { icon } = getElements(nativeElement);
    expect(icon).toHaveCssClass('anextra');
    expect(icon).toHaveCssClass('fancy');
    expect(icon).toHaveCssClass('one');

    componentInstance.svgClass = ['another', 'one'];
    fixture.detectChanges();
    expect(icon).not.toHaveCssClass('anextra');
    expect(icon).not.toHaveCssClass('fancy');
    expect(icon).toHaveCssClass('one');
    expect(icon).toHaveCssClass('another');

    componentInstance.svgClass = null;
    fixture.detectChanges();
    expect(icon).not.toHaveCssClass('one');
    expect(icon).not.toHaveCssClass('another');
    expect(icon).toHaveCssClass('slds-icon');
  }, `<ngl-icon [svgClass]="svgClass"></ngl-icon>`));

  it('should support sprite category', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;

    componentInstance.category = 'standard';
    fixture.detectChanges();

    const { host, icon } = getElements(nativeElement);
    const use = icon.querySelector('use');

    expect(host).toHaveCssClass('slds-icon_container');
    expect(host).toHaveCssClass('slds-icon-standard-add');
    expect(icon).not.toHaveCssClass('slds-icon-text-default');
    expect(use.getAttribute('xlink:href')).toBe('/mypath/standard-sprite/svg/symbols.svg#add');

    componentInstance.category = 'utility';
    fixture.detectChanges();
    expect(host).not.toHaveCssClass('slds-icon_container');
    expect(host).not.toHaveCssClass('slds-icon-standard-add');
    expect(icon).toHaveCssClass('slds-icon-text-default');
    expect(use.getAttribute('xlink:href')).toBe('/mypath/utility-sprite/svg/symbols.svg#add');
  }, `<ngl-icon [category]="category" icon="add"></ngl-icon>`));

  it('should handle icons with underscore', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;

    componentInstance.category = 'standard';
    componentInstance.icon = 'work_order';
    fixture.detectChanges();

    const { host, icon } = getElements(nativeElement);
    const use = icon.querySelector('use');

    expect(host).toHaveCssClass('slds-icon-standard-work-order');
    expect(use.getAttribute('xlink:href')).toBe('/mypath/standard-sprite/svg/symbols.svg#work_order');
  }, `<ngl-icon [category]="category" [icon]="icon"></ngl-icon>`));

  it('should handle custom icons', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const { host, icon } = getElements(fixture.nativeElement);
    const use = icon.querySelector('use');
    expect(host).toHaveCssClass('slds-icon-custom-custom1');
    expect(use.getAttribute('xlink:href')).toBe('/mypath/custom-sprite/svg/symbols.svg#custom1');
  }, `<ngl-icon category="custom" icon="1"></ngl-icon>`));
});

// Shortcut function for less boilerplate on each `it`
function testAsync(fn: (value: ComponentFixture<TestComponent>) => void, html: string = null) {
  return async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.overrideTemplate(TestComponent, html).createAsync(TestComponent).then(fn);
  }));
}

@Component({
  directives: [NglIcon],
  template: '',
  providers: [provideNglConfig({svgPath: '/mypath'})],
})
export class TestComponent {
  size = 'small';
  type: string;
  svgClass = 'anextra fancy one';
}
