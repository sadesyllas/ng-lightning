import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglPagination} from './pagination';

function getPageElements(element: HTMLElement): HTMLButtonElement[] {
  return [].slice.call(element.querySelectorAll('button'));
}

function expectPages(element: HTMLElement, definitions: string[]): void {
  const activeClass = 'slds-button--brand';

  const pages = getPageElements(element).map((el: HTMLButtonElement) => {
    let text = el.textContent.trim();
    if (el.classList.contains(activeClass)) {
      text = '+' + text;
    }
    if (el.disabled) {
      text = '-' + text;
    }
    return text;
  });

  expect(pages).toEqual(definitions);
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

  describe('with `boundaryNumbers`', () => {
    let html = `<ngl-pagination [page]="page" boundaryNumbers="2" total="102" limit="3"></ngl-pagination>`;

    it('should render the pages correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
      fixture.componentInstance.page = 6;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '2', '-...', '5', '+6', '7', '-...', '10', '11', 'Next' ]);
    }, html));

    it('should render gaps on start correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '+2', '3', '-...', '10', '11', 'Next' ]);

      fixture.componentInstance.page = 3;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '2', '+3', '4', '-...', '10', '11', 'Next' ]);

      fixture.componentInstance.page = 4;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '2', '3', '+4', '5', '-...', '10', '11', 'Next' ]);

      fixture.componentInstance.page = 5;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '2', '3', '4', '+5', '6', '-...', '10', '11', 'Next' ]);
    }, html));

    it('should render gaps on end correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
      fixture.componentInstance.page = 7;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '2', '-...', '6', '+7', '8', '9', '10', '11', 'Next' ]);

      fixture.componentInstance.page = 8;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '2', '-...', '7', '+8', '9', '10', '11', 'Next' ]);

      fixture.componentInstance.page = 9;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '2', '-...', '8', '+9', '10', '11', 'Next' ]);

      fixture.componentInstance.page = 10;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '2', '-...', '9', '+10', '11', 'Next' ]);

      fixture.componentInstance.page = 11;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, [ 'Previous', '1', '2', '-...', '9', '10', '+11', '-Next' ]);
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
