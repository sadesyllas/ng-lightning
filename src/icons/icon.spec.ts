import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
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

  it('should render all the icon elements', testAsync(`<ngl-icon icon="warning" alt="Help!"></ngl-icon>`, ({fixture, done}) => {
    fixture.detectChanges();

    const { nativeElement } = fixture;
    const { host, icon, assistiveText } = getElements(nativeElement);
    const use = icon.querySelector('use');

    expect(host).not.toHaveCssClass('slds-icon_container');
    expect(icon).toHaveCssClass('slds-icon');
    expect(icon).toHaveCssClass('slds-icon-text-default');
    expect(use.getAttribute('xlink:href')).toBe('/mypath/utility-sprite/svg/symbols.svg#warning');
    expect(assistiveText).toEqual('Help!');
    done();
  }));

  it('should set type based on input', testAsync(`<ngl-icon icon="warning" [type]="type"></ngl-icon>`, ({fixture, done}) => {
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
    done();
  }));

  it('should set size based on input', testAsync(`<ngl-icon icon="warning" [size]="size"></ngl-icon>`, ({fixture, done}) => {
    fixture.detectChanges();

    const { nativeElement, componentInstance } = fixture;
    const { icon } = getElements(nativeElement);
    expect(icon).toHaveCssClass('slds-icon--small');

    componentInstance.size = 'large';
    fixture.detectChanges();
    expect(icon).not.toHaveCssClass('slds-icon--small');
    expect(icon).toHaveCssClass('slds-icon--large');
    done();
  }));

  it('should allow extra svg classes', testAsync(`<ngl-icon [svgClass]="svgClass"></ngl-icon>`, ({fixture, done}) => {
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
    fixture.detectChanges();
    done();
  }));

  it('should support sprite category', testAsync(`<ngl-icon [category]="category" icon="add"></ngl-icon>`, ({fixture, done}) => {
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
    done();
  }));

  it('should handle icons with underscore', testAsync(`<ngl-icon [category]="category" [icon]="icon"></ngl-icon>`, ({fixture, done}) => {
    const { nativeElement, componentInstance } = fixture;

    componentInstance.category = 'standard';
    componentInstance.icon = 'work_order';
    fixture.detectChanges();

    const { host, icon } = getElements(nativeElement);
    const use = icon.querySelector('use');

    expect(host).toHaveCssClass('slds-icon-standard-work-order');
    expect(use.getAttribute('xlink:href')).toBe('/mypath/standard-sprite/svg/symbols.svg#work_order');
    done();
  }));

  it('should handle custom icons', testAsync(`<ngl-icon category="custom" icon="1"></ngl-icon>`, ({fixture, done}) => {
    fixture.detectChanges();

    const { host, icon } = getElements(fixture.nativeElement);
    const use = icon.querySelector('use');
    expect(host).toHaveCssClass('slds-icon-custom-1');
    expect(use.getAttribute('xlink:href')).toBe('/mypath/custom-sprite/svg/symbols.svg#custom1');
    done();
  }));

});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(html: string, fn: Function) {
  return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return new Promise((done: Function) => {
      tcb.overrideTemplate(TestComponent, html).createAsync(TestComponent).then((fixture) => fn({ fixture, done}));
    });
  });
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
