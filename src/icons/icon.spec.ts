import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component, provide} from 'angular2/core';
import {NglIcon} from './icon';
import {NGL_CONFIG} from '../config/config';

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
    expect(use.getAttribute('xlink:href')).toContain('#warning');
    expect(getAssistiveText(nativeElement)).toEqual('Help!');
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
  providers: [provide(NGL_CONFIG, {useValue: {}})],
})
export class TestComponent {
  size = 'small';
}
