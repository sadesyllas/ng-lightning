import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';
import {Component} from '@angular/core';
import {selectElements} from '../../test/util/helpers';
import {NGL_DATATABLE_DIRECTIVES} from './directives';

function getHeadings(element: HTMLElement) {
  return selectElements(element, 'thead th').map(e => e.textContent);
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

describe('`NglDatatable`', () => {

  it('should render head and body correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const tableEl = fixture.nativeElement.firstElementChild;
    expect(tableEl).toHaveCssClass('slds-table');
    expect(tableEl).toHaveCssClass('slds-table--bordered');
    expect(tableEl).toHaveCssClass('slds-table--striped');

    expect(getHeadings(fixture.nativeElement)).toEqual(['ID', 'Name', 'Number']);
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

    expect(getHeadings(fixture.nativeElement)).toEqual(['ID', 'Number']);
    expect(getData(fixture.nativeElement)).toEqual([
      [ '1', '80' ],
      [ '2', '10' ],
      [ '3', '13' ],
      [ '4', '14' ],
    ]);

    fixture.componentInstance.exists = true;
    fixture.detectChanges();
    expect(getHeadings(fixture.nativeElement)).toEqual(['ID', 'Name', 'Number']);
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
        <ngl-datatable-column dataKey="id">
          <template nglDatatableCell let-value>{{value}}:</template>
        </ngl-datatable-column>
        <ngl-datatable-column>
          <template nglDatatableCell let-row="row" let-i="index">{{i}} = {{row.name}}</template>
        </ngl-datatable-column>
        <ngl-datatable-column dataKey="number"></ngl-datatable-column>
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
      <ngl-datatable-column heading="ID" dataKey="id"></ngl-datatable-column>
      <ngl-datatable-column heading="Name" dataKey="name" *ngIf="exists"></ngl-datatable-column>
      <ngl-datatable-column heading="Number" dataKey="number"></ngl-datatable-column>
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
