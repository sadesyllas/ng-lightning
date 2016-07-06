import {inject, async, TestComponentBuilder, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {NglSection} from './section';

function getSectionEl(element: HTMLElement) {
  return element.firstElementChild;
}
function getTitleEl(element: HTMLElement) {
  return <HTMLDivElement>element.querySelector('.slds-section__title-action');
}


describe('Section Component', () => {

  it('should render correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement } = fixture;
    const sectionEl = getSectionEl(nativeElement);

    fixture.detectChanges();
    expect(sectionEl).toHaveCssClass('slds-section');
    expect(sectionEl).not.toHaveCssClass('slds-is-open');
    expect(getTitleEl(nativeElement).textContent.trim()).toBe('Section title');
    expect(nativeElement.querySelector('.slds-section__content').textContent).toBe('Body');
  }));

  it('should toggle based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    const sectionEl = getSectionEl(nativeElement);

    componentInstance.open = true;
    fixture.detectChanges();
    expect(sectionEl).toHaveCssClass('slds-is-open');

    componentInstance.open = false;
    fixture.detectChanges();
    expect(sectionEl).not.toHaveCssClass('slds-is-open');
  }));

  it('should toggle when clicking on title', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const sectionEl = getSectionEl(fixture.nativeElement);
    const titleEl = getTitleEl(fixture.nativeElement);

    titleEl.click();
    fixture.detectChanges();
    expect(sectionEl).toHaveCssClass('slds-is-open');

    titleEl.click();
    fixture.detectChanges();
    expect(sectionEl).not.toHaveCssClass('slds-is-open');
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
  directives: [NglSection],
  template: `<ngl-section [(open)]="open" title="Section title">Body</ngl-section>`,
})
export class TestComponent {
  open = false;
}
