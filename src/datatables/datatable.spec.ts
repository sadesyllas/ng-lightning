import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';
import {Component} from '@angular/core';
import {selectElements} from '../../test/util/helpers';
import {NGL_DATATABLE_DIRECTIVES} from './directives';

function getHeadings(element: HTMLElement) {
  return selectElements(element, 'thead th');
}

function getHeadingText(element: HTMLElement) {
  return element.querySelector('.slds-truncate').textContent;
}

function getHeadingsText(element: HTMLElement) {
  return getHeadings(element).map(getHeadingText);
}

function getRows(element: HTMLElement): HTMLTableRowElement[] {
  return <HTMLTableRowElement[]>selectElements(element, 'tbody tr');
}

function getRowData(element: HTMLTableRowElement) {
  return selectElements(element, 'td').map(e => e.textContent.trim());
}

function getData(element: HTMLElement) {
  return getRows(element).map(row => getRowData(row));
}

function expectSortedHeadings(element: HTMLElement, expected: string[]) {
  const headings = getHeadings(element);

  headings.map((e: HTMLElement, index: number) => {
    const text = getHeadingText(e);
    const expectation = expected[index];
    if (expectation.startsWith('+')) {
      expect(e).toHaveCssClass('slds-is-sorted');
      expect(e).toHaveCssClass('slds-is-sorted--asc');
      expect(e.getAttribute('aria-sort')).toEqual('ascending');
      expect(expectation).toEqual(`+${text}`);
    } else if (expectation.startsWith('-')) {
      expect(e).toHaveCssClass('slds-is-sorted');
      expect(e).toHaveCssClass('slds-is-sorted--desc');
      expect(e.getAttribute('aria-sort')).toEqual('descending');
      expect(expectation).toEqual(`-${text}`);
    } else {
      expect(e).not.toHaveCssClass('slds-is-sorted');
      expect(e.getAttribute('aria-sort')).toBeNull();
      expect(expectation).toEqual(text);
    }
  });
}

describe('`NglDatatable`', () => {

  it('should render head and body correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const tableEl = fixture.nativeElement.firstElementChild;
    expect(tableEl).toHaveCssClass('slds-table');
    expect(tableEl).toHaveCssClass('slds-table--bordered');
    expect(tableEl).toHaveCssClass('slds-table--striped');

    expect(getHeadingsText(fixture.nativeElement)).toEqual(['ID', 'Name', 'Number']);
    expect(getData(fixture.nativeElement)).toEqual([
      [ '1', 'PP', '80' ],
      [ '2', 'AB', '10' ],
      [ '3', 'KB', '13' ],
      [ '4', 'EB', '14' ],
    ]);
  }));

  it('should appy bordered and striped based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const tableEl = fixture.nativeElement.firstElementChild;
    expect(tableEl).toHaveCssClass('slds-table');
    expect(tableEl).not.toHaveCssClass('slds-table--bordered');
    expect(tableEl).not.toHaveCssClass('slds-table--striped');

    fixture.componentInstance.striped = true;
    fixture.detectChanges();
    expect(tableEl).toHaveCssClass('slds-table--striped');
    expect(tableEl).not.toHaveCssClass('slds-table--bordered');

    fixture.componentInstance.bordered = true;
    fixture.detectChanges();
    expect(tableEl).toHaveCssClass('slds-table--striped');
    expect(tableEl).toHaveCssClass('slds-table--bordered');
  }, `<table ngl-datatable [striped]="striped" [bordered]="bordered"></table>`));

  it('should appy bordered and striped based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const tableEl = fixture.nativeElement.firstElementChild;
    expect(tableEl).toHaveCssClass('slds-table');
    expect(tableEl).not.toHaveCssClass('slds-table--bordered');
    expect(tableEl).not.toHaveCssClass('slds-table--striped');

    fixture.componentInstance.striped = true;
    fixture.detectChanges();
    expect(tableEl).toHaveCssClass('slds-table--striped');
    expect(tableEl).not.toHaveCssClass('slds-table--bordered');

    fixture.componentInstance.bordered = true;
    fixture.detectChanges();
    expect(tableEl).toHaveCssClass('slds-table--striped');
    expect(tableEl).toHaveCssClass('slds-table--bordered');
  }, `<table ngl-datatable [striped]="striped" [bordered]="bordered"></table>`));

  it('should show/hide column correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.exists = false;
    fixture.detectChanges();

    expect(getHeadingsText(fixture.nativeElement)).toEqual(['ID', 'Number']);
    expect(getData(fixture.nativeElement)).toEqual([
      [ '1', '80' ],
      [ '2', '10' ],
      [ '3', '13' ],
      [ '4', '14' ],
    ]);

    fixture.componentInstance.exists = true;
    fixture.detectChanges();
    expect(getHeadingsText(fixture.nativeElement)).toEqual(['ID', 'Name', 'Number']);
    expect(getData(fixture.nativeElement)).toEqual([
      [ '1', 'PP', '80' ],
      [ '2', 'AB', '10' ],
      [ '3', 'KB', '13' ],
      [ '4', 'EB', '14' ],
    ]);
  }));

  it('should support custom cell template per column', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    expect(getData(fixture.nativeElement)).toEqual([
      [ '1:', '0 = PP', '80' ],
      [ '2:', '1 = AB', '10' ],
      [ '3:', '2 = KB', '13' ],
      [ '4:', '3 = EB', '14' ],
    ]);
  }, `<table ngl-datatable [data]="data">
        <ngl-datatable-column key="id">
          <template nglDatatableCell let-value>{{value}}:</template>
        </ngl-datatable-column>
        <ngl-datatable-column>
          <template nglDatatableCell let-row="row" let-i="index">{{i}} = {{row.name}}</template>
        </ngl-datatable-column>
        <ngl-datatable-column key="number"></ngl-datatable-column>
      </table>`
  ));

  it('should support custom cell class per column', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.class1 = 'custom-class1';
    fixture.detectChanges();

    const rows = getRows(fixture.nativeElement).map(row => selectElements(row, 'td'));
    rows.forEach(([first, second]) => {
      expect(first).toHaveCssClass('custom-class1');
      expect(second).not.toHaveCssClass('custom-class1');
    });

    fixture.componentInstance.class1 = null;
    fixture.componentInstance.class2 = ['apply-me', 'apply-this'];
    fixture.detectChanges();
    rows.forEach(([first, second]) => {
      expect(first).not.toHaveCssClass('custom-class1');
      expect(second).toHaveCssClass('apply-me');
      expect(second).toHaveCssClass('apply-this');
    });
  }, `<table ngl-datatable [data]="data">
        <ngl-datatable-column [cellClass]="class1"></ngl-datatable-column>
        <ngl-datatable-column [cellClass]="class2"></ngl-datatable-column>
      </table>`
  ));

  it('should handle sortable columns', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.sortable = false;
    fixture.detectChanges();

    const [first, second] = getHeadings(fixture.nativeElement);

    expect(first).toHaveCssClass('slds-is-sortable');
    expect(first.querySelector('a')).toBeDefined();

    expect(second).not.toHaveCssClass('slds-is-sortable');
    expect(second.querySelector('a')).toBeNull();

    fixture.componentInstance.sortable = true;
    fixture.detectChanges();
    expect(second).toHaveCssClass('slds-is-sortable');
    expect(second.querySelector('a')).toBeDefined();
  }, `<table ngl-datatable [data]="data">
        <ngl-datatable-column key="id" sortable></ngl-datatable-column>
        <ngl-datatable-column [sortable]="sortable"></ngl-datatable-column>
      </table>`
  ));

  it('should display sorting state', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.sort = {key: 'id', order: 'asc'};
    fixture.detectChanges();
    expectSortedHeadings(fixture.nativeElement, ['+ID', 'Name', 'Number']);

    fixture.componentInstance.sort = null;
    fixture.detectChanges();
    expectSortedHeadings(fixture.nativeElement, ['ID', 'Name', 'Number']);

    fixture.componentInstance.sort = {key: 'id', order: 'desc'};
    fixture.detectChanges();
    expectSortedHeadings(fixture.nativeElement, ['-ID', 'Name', 'Number']);

    fixture.componentInstance.sort = {key: 'name', order: 'asc'};
    fixture.detectChanges();
    expectSortedHeadings(fixture.nativeElement, ['ID', '+Name', 'Number']);
  }, `<table ngl-datatable [data]="data" [sort]="sort">
        <ngl-datatable-column heading="ID" key="id" sortable></ngl-datatable-column>
        <ngl-datatable-column heading="Name" key="name" sortable></ngl-datatable-column>
        <ngl-datatable-column heading="Number" key="number"></ngl-datatable-column>
      </table>`
  ));

  it('should sort when clicking on sortable header', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.sort = {key: 'id', order: 'desc'};
    fixture.componentInstance.sortChange = jasmine.createSpy('sortChange');
    fixture.detectChanges();
    expect(fixture.componentInstance.sortChange).not.toHaveBeenCalled();

    const headingLinks = getHeadings(fixture.nativeElement).map(e => <HTMLAnchorElement>e.querySelector('a'));

    headingLinks[0].click();
    expect(fixture.componentInstance.sortChange).toHaveBeenCalledWith({ key: 'id', order: 'asc' });

    headingLinks[1].click();
    expect(fixture.componentInstance.sortChange).toHaveBeenCalledWith({ key: 'name', order: 'desc' });
  }, `<table ngl-datatable [data]="data" [sort]="sort" (sortChange)="sortChange($event)">
        <ngl-datatable-column heading="ID" key="id" sortable></ngl-datatable-column>
        <ngl-datatable-column heading="Name" key="name" sortable></ngl-datatable-column>
        <ngl-datatable-column heading="Number" key="number"></ngl-datatable-column>
      </table>`
  ));

  it('should not re-render templates in cell if no input has changed', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.cb = jasmine.createSpy('cb').and.callThrough();
    fixture.detectChanges();
    expect(fixture.componentInstance.cb).not.toHaveBeenCalled();

    const button1 = fixture.nativeElement.querySelector('button');
    button1.click();
    fixture.detectChanges();

    const button2 = fixture.nativeElement.querySelector('button');
    expect(button1).toBe(button2);
    expect(fixture.componentInstance.cb).toHaveBeenCalled();
  }, `<table ngl-datatable [data]="data">
        <ngl-datatable-column>
          <template nglDatatableCell><button type="button" (click)="cb()"></button></template>
        </ngl-datatable-column>
      </table>`
  ));
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
  directives: [NGL_DATATABLE_DIRECTIVES],
  template: `
    <table ngl-datatable [data]="data">
      <ngl-datatable-column heading="ID" key="id"></ngl-datatable-column>
      <ngl-datatable-column heading="Name" key="name" *ngIf="exists"></ngl-datatable-column>
      <ngl-datatable-column heading="Number" key="number"></ngl-datatable-column>
    </table>`,
})
export class TestComponent {
  exists = true;

  data = [
    { id: 1, name: 'PP', number: 80 },
    { id: 2, name: 'AB', number: 10 },
    { id: 3, name: 'KB', number: 13 },
    { id: 4, name: 'EB', number: 14 },
  ];
}
