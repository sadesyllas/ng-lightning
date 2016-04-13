import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglSection} from './section';

function getSectionEl(element: HTMLElement) {
  return element.firstElementChild;
}
function getTitleEl(element: HTMLElement) {
  return <HTMLDivElement>element.querySelector('.slds-section__title-action');
}


describe('Section Component', () => {

  it('should render correctly', testAsync(({fixture, done}) => {
    const { nativeElement } = fixture;
    const sectionEl = getSectionEl(nativeElement);

    fixture.detectChanges();
    expect(sectionEl).toHaveCssClass('slds-section');
    expect(sectionEl).not.toHaveCssClass('slds-is-open');
    expect(getTitleEl(nativeElement).textContent.trim()).toBe('Section title');
    expect(nativeElement.querySelector('.slds-section__content').textContent).toBe('Body');
    done();
  }));

  it('should toggle based on input', testAsync(({fixture, done}) => {
    const { nativeElement, componentInstance } = fixture;
    const sectionEl = getSectionEl(nativeElement);

    componentInstance.open = true;
    fixture.detectChanges();
    expect(sectionEl).toHaveCssClass('slds-is-open');

    componentInstance.open = false;
    fixture.detectChanges();
    expect(sectionEl).not.toHaveCssClass('slds-is-open');
    done();
  }));

  it('should toggle when clicking on title', testAsync(({fixture, done}) => {
    const sectionEl = getSectionEl(fixture.nativeElement);
    const titleEl = getTitleEl(fixture.nativeElement);

    titleEl.click();
    fixture.detectChanges();
    expect(sectionEl).toHaveCssClass('slds-is-open');

    titleEl.click();
    fixture.detectChanges();
    expect(sectionEl).not.toHaveCssClass('slds-is-open');
    done();
  }));

});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(fn: Function, html: string = null) {
  return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return new Promise((done: Function) => {
      if (html) {
        tcb = tcb.overrideTemplate(TestComponent, html);
      }
      tcb.createAsync(TestComponent).then((fixture) => fn({ fixture, done}));
    });
  });
}

@Component({
  directives: [NglSection],
  template: `<ngl-section [(open)]="open" title="Section title">Body</ngl-section>`,
})
export class TestComponent {
  open = false;
}
