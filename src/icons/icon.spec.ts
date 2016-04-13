import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglIcon} from './icon';
import {provideNglConfig} from '../config/config';

function getIconElement(element: Element): HTMLElement {
  return <HTMLDivElement>element.querySelector('svg');
}

function getAssistiveText(element: Element): string {
  return element.querySelector('.slds-assistive-text').textContent.trim();
}

describe('Icon Component', () => {

  it('should render all the icon elements', testAsync(`<ngl-icon icon="warning" alt="Help!"></ngl-icon>`, ({fixture, done}) => {
    fixture.detectChanges();

    const { nativeElement } = fixture;

    const icon = getIconElement(nativeElement);
    const use = icon.querySelector('use');

    expect(icon).toHaveCssClass('slds-icon');
    expect(icon).toHaveCssClass('slds-icon-text-default');
    expect(use.getAttribute('xlink:href')).toBe('/mypath/symbols.svg#warning');
    expect(getAssistiveText(nativeElement)).toEqual('Help!');
    done();
  }));

  it('should set type based on input', testAsync(`<ngl-icon icon="warning" [type]="type"></ngl-icon>`, ({fixture, done}) => {
    const { nativeElement, componentInstance } = fixture;
    const icon = getIconElement(nativeElement);

    componentInstance.type = 'warning';
    fixture.detectChanges();
    expect(icon).toHaveCssClass('slds-icon-text-warning');
    expect(icon).not.toHaveCssClass('slds-icon-text-default');

    componentInstance.type = 'error';
    fixture.detectChanges();
    expect(icon).toHaveCssClass('slds-icon-text-error');
    expect(icon).not.toHaveCssClass('slds-icon-text-warning');

    componentInstance.type = '';
    fixture.detectChanges();
    expect(icon).not.toHaveCssClass('slds-icon-text-error');
    expect(icon).not.toHaveCssClass('slds-icon-text-warning');
    expect(icon).not.toHaveCssClass('slds-icon-text-default');
    done();
  }));

  it('should set size based on input', testAsync(`<ngl-icon icon="warning" [size]="size"></ngl-icon>`, ({fixture, done}) => {
    fixture.detectChanges();

    const { nativeElement, componentInstance } = fixture;
    const icon = getIconElement(nativeElement);
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
    const icon = getIconElement(nativeElement);
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
