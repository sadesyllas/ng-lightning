import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglPagination} from './pagination';

function getPageElements(element: HTMLElement): HTMLButtonElement[] {
  return [].slice.call(element.querySelectorAll('button'));
}

function expectPages(element: HTMLElement, definitions: string[]): void {
  const pages = getPageElements(element);
  const activeClass = 'slds-button--brand';

  expect(pages.length).toEqual(definitions.length);

  definitions.forEach((definition, i) => {
    const indicator = definition.charAt(0);
    const pageElement = pages[i];
    const text = ['+', '-'].indexOf(indicator) > -1 ? definition.substr(1) : definition;

    if (indicator === '+') {
      expect(pageElement).toHaveCssClass(activeClass);
      expect(pageElement.disabled).toBeFalsy();
    } else if (indicator === '-') {
      expect(pageElement).not.toHaveCssClass(activeClass);
      expect(pageElement.disabled).toBeTruthy();
    } else {
      expect(pageElement).not.toHaveCssClass(activeClass);
      expect(pageElement.disabled).toBeFalsy();
    }

    expect(pageElement.textContent.trim()).toEqual(text);
  });
}

describe('Pagination Component', () => {

  describe('with default settings', () => {

    it('should render the pages correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '+2', '3', '4', 'Next' ]);
    }));

    it('should disbale pages correctly when on limits', testAsync((fixture: ComponentFixture<TestComponent>) => {
      fixture.componentInstance.page = 1;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ '-Previous', '+1', '2', '3', '4', 'Next' ]);

      fixture.componentInstance.page = 4;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '2', '3', '+4', '-Next' ]);
    }));
  });

  describe('with limit settings', () => {
    let html = `<ngl-pagination [page]="page" [total]="total" limit="2"></ngl-pagination>`;

    it('should render the pages correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '+2', 'Next' ]);
    }, html));

    it('should disbale pages correctly when on limits', testAsync((fixture: ComponentFixture<TestComponent>) => {
      fixture.componentInstance.page = 1;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ '-Previous', '+1', '2', 'Next' ]);

      fixture.componentInstance.page = 4;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '3', '+4', '-Next' ]);
    }, html));
  });

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
  directives: [NglPagination],
  template: `<ngl-pagination [page]="page" [total]="total"></ngl-pagination>`,
})
export class TestComponent {
  page = 2;
  total = 33;
}
