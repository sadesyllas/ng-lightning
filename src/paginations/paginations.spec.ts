import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
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
    let html = `<ngl-pagination [page]="page" [total]="total"></ngl-pagination>`;

    it('should render the pages correctly', testAsync(html, ({fixture, done}) => {
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '+2', '3', '4', 'Next' ]);
      done();
    }));

    it('should disbale pages correctly when on limits', testAsync(html, ({fixture, done}) => {
      fixture.componentInstance.page = 1;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ '-Previous', '+1', '2', '3', '4', 'Next' ]);

      fixture.componentInstance.page = 4;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '2', '3', '+4', '-Next' ]);
      done();
    }));
  });

  describe('with limit settings', () => {
    let html = `<ngl-pagination [page]="page" [total]="total" limit="2"></ngl-pagination>`;

    it('should render the pages correctly', testAsync(html, ({fixture, done}) => {
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '+2', 'Next' ]);
      done();
    }));

    it('should disbale pages correctly when on limits', testAsync(html, ({fixture, done}) => {
      fixture.componentInstance.page = 1;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ '-Previous', '+1', '2', 'Next' ]);

      fixture.componentInstance.page = 4;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '3', '+4', '-Next' ]);
      done();
    }));
  });

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
  directives: [NglPagination],
  template: '',
})
export class TestComponent {
  page = 2;
  total = 33;
}
