import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {selectElements, dispatchKeyEvent} from '../../test/helpers';
import {NglDatepicker} from './datepicker';

// Microsoft Edge hack
function removeNonPrintable(str: string) {
  return str.replace(/[^\x20-\x7E]+/g, '');
}

function getDayElements(element: HTMLElement): HTMLElement[] {
  return selectElements(element, '.slds-day');
}

function getDayHeaders(element: HTMLElement) {
  return selectElements(element, 'th').map(e => e.textContent.trim()).map(removeNonPrintable);
}

function getYearOptions(element: HTMLElement) {
  return selectElements(element, 'option');
}

function chooseYear(element: HTMLElement, year: number) {
  const select = <HTMLSelectElement>element.querySelector('select');
  select.value = '' + year;

  const evt = document.createEvent('HTMLEvents');
  evt.initEvent('change', false, true);
  select.dispatchEvent(evt);
}

function clickButton(element: HTMLElement, isNext = false) {
  const buttons = selectElements(element, 'button');
  buttons[+isNext].click();
}

function dispatchKey(fixture: ComponentFixture<any>, key: string) {
  dispatchKeyEvent(fixture.nativeElement.firstElementChild, key);
  fixture.detectChanges();
}

function expectCalendar(element: HTMLElement, expectedDates: any[], expectedMonth: string, expectedYear: string) {
  const dates = selectElements(element, 'tbody > tr').map((trElement: HTMLElement, row: number) => {
    return selectElements(trElement, 'td').map((td: HTMLElement, column: number) => {
      let text = td.textContent.trim();
      if (td.classList.contains('slds-is-selected')) {
        text = '*' + text;
      }
      if (td.classList.contains('slds-is-today')) {
        text += '+';
      }
      if (td.classList.contains('slds-disabled-text')) {
        text += '-';
      }
      return text;
    });
  });
  expect(dates).toEqual(expectedDates);

  const month = element.querySelector('h2.slds-align-middle').textContent.trim();
  expect(expectedMonth).toEqual(removeNonPrintable(month));

  const year = (<HTMLSelectElement>element.querySelector('select.slds-select')).value;
  expect(expectedYear).toEqual(year);
}

function expectYearOptions(element: HTMLElement, expectedYears: any[]) {
  expect(getYearOptions(element).map((e: HTMLOptionElement) => e.value)).toEqual(expectedYears);
}

describe('`Datepicker` Component', () => {

  it('should render correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expectCalendar(fixture.nativeElement, [
      ['29-', '30-', '31-', '01', '02', '03', '04'],
      ['05', '06', '07', '08', '09', '10', '11'],
      ['12', '13', '14', '15', '16', '17', '18'],
      ['19', '20', '21', '22', '23', '24', '25'],
      ['26', '27', '28', '29', '*30+', '01-', '02-'],
    ], 'September', '2010');
    expect(getDayHeaders(fixture.nativeElement)).toEqual([ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]);
    expectYearOptions(fixture.nativeElement, ['2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017' ]);
  }));

  it('should change view when input date is changing', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    fixture.componentInstance.date = '2013/08/11';
    fixture.detectChanges();
    expectCalendar(fixture.nativeElement, [
      [ '28-', '29-', '30-', '31-', '01', '02', '03' ],
      [ '04', '05', '06', '07', '08', '09', '10' ],
      [ '*11+', '12', '13', '14', '15', '16', '17' ],
      [ '18', '19', '20', '21', '22', '23', '24' ],
      [ '25', '26', '27', '28', '29', '30', '31' ],
    ], 'August', '2013');

    fixture.componentInstance.date = '2014/10/23';
    fixture.detectChanges();
    expectCalendar(fixture.nativeElement, [
      [ '28-', '29-', '30-', '01', '02', '03', '04' ],
      [ '05', '06', '07', '08', '09', '10', '11' ],
      [ '12', '13', '14', '15', '16', '17', '18' ],
      [ '19', '20', '21', '22', '*23+', '24', '25' ],
      [ '26', '27', '28', '29', '30', '31', '01-' ],
    ], 'October', '2014');
  }));

  it('does not change current view when model is cleared', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    fixture.componentInstance.date = null;
    fixture.detectChanges();
    expectCalendar(fixture.nativeElement, [
      ['29-', '30-', '31-', '01', '02', '03', '04'],
      ['05', '06', '07', '08', '09', '10', '11'],
      ['12', '13', '14', '15', '16', '17', '18'],
      ['19', '20', '21', '22', '23', '24', '25'],
      ['26', '27', '28', '29', '30+', '01-', '02-'],
    ], 'September', '2010');
  }));

  it('should show current date if none is set', testAsync((fixture: ComponentFixture<TestComponent>) => {
    var currentDate = new Date(2013, 7, 11); // 11 August 2013
    jasmine.clock().mockDate(currentDate);

    fixture.componentInstance.date = null;
    fixture.detectChanges();

    expectCalendar(fixture.nativeElement, [
      ['28-', '29-', '30-', '31-', '01', '02', '03'],
      ['04', '05', '06', '07', '08', '09', '10'],
      ['11+', '12', '13', '14', '15', '16', '17'],
      ['18', '19', '20', '21', '22', '23', '24'],
      ['25', '26', '27', '28', '29', '30', '31'],
    ], 'August', '2013');

    jasmine.clock().uninstall();
  }));

  it('updates the model when a day is clicked', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const days = getDayElements(fixture.nativeElement);
    days[25].click();
    expect(fixture.componentInstance.dateChange).toHaveBeenCalledWith('2010/9/23');
  }));

  it('do nothing when a disabled day is clicked', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const days = getDayElements(fixture.nativeElement);
    days[1].click();
    expect(fixture.componentInstance.dateChange).not.toHaveBeenCalled();
  }));

  it('moves to previous month correctly when button is clicked', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    clickButton(fixture.nativeElement, false);
    fixture.detectChanges();
    expectCalendar(fixture.nativeElement, [
      ['01', '02', '03', '04', '05', '06', '07'],
      ['08', '09', '10', '11', '12', '13', '14'],
      ['15', '16', '17', '18', '19', '20', '21'],
      ['22', '23', '24', '25', '26', '27', '28'],
      ['29', '30+', '31', '01-', '02-', '03-', '04-'],
    ], 'August', '2010');
    expect(fixture.componentInstance.dateChange).not.toHaveBeenCalled();
  }));

  it('moves to next month correctly when button is clicked', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    clickButton(fixture.nativeElement, true);
    fixture.detectChanges();
    expectCalendar(fixture.nativeElement, [
      ['26-', '27-', '28-', '29-', '*30-', '01', '02'],
      ['03', '04', '05', '06', '07', '08', '09'],
      ['10', '11', '12', '13', '14', '15', '16'],
      ['17', '18', '19', '20', '21', '22', '23'],
      ['24', '25', '26', '27', '28', '29', '30+'],
      ['31', '01-', '02-', '03-', '04-', '05-', '06-'],
    ], 'October', '2010');
    expect(fixture.componentInstance.dateChange).not.toHaveBeenCalled();
  }));

  it('should not "jump" months and keep current day in limits', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.date = '2016/01/30';
    fixture.detectChanges();
    clickButton(fixture.nativeElement, true);
    fixture.detectChanges();
    expectCalendar(fixture.nativeElement, [
      [ '31-', '01', '02', '03', '04', '05', '06' ],
      [ '07', '08', '09', '10', '11', '12', '13' ],
      [ '14', '15', '16', '17', '18', '19', '20' ],
      [ '21', '22', '23', '24', '25', '26', '27' ],
      [ '28', '29+', '01-', '02-', '03-', '04-', '05-' ],
    ], 'February', '2016');
  }));

  it('should change year based on selection', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    chooseYear(fixture.nativeElement, 2014);

    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      expectCalendar(fixture.nativeElement, [
        [ '31-', '01', '02', '03', '04', '05', '06' ],
        [ '07', '08', '09', '10', '11', '12', '13' ],
        [ '14', '15', '16', '17', '18', '19', '20' ],
        [ '21', '22', '23', '24', '25', '26', '27' ],
        [ '28', '29', '30+', '01-', '02-', '03-', '04-' ],
      ], 'September', '2014');
      expectYearOptions(fixture.nativeElement, ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021']);
    });
  }));

  describe('keyboard navigation', () => {

    it('will be able to activate appropriate day', testAsync((fixture: ComponentFixture<TestComponent>) => {
      fixture.detectChanges();

      dispatchKey(fixture, 'ArrowDown');
      expectCalendar(fixture.nativeElement, [
        ['26-', '27-', '28-', '29-', '*30-', '01', '02'],
        ['03', '04', '05', '06', '07+', '08', '09'],
        ['10', '11', '12', '13', '14', '15', '16'],
        ['17', '18', '19', '20', '21', '22', '23'],
        ['24', '25', '26', '27', '28', '29', '30'],
        ['31', '01-', '02-', '03-', '04-', '05-', '06-'],
      ], 'October', '2010');

      dispatchKey(fixture, 'ArrowLeft');
      dispatchKey(fixture, 'ArrowLeft');
      expectCalendar(fixture.nativeElement, [
        ['26-', '27-', '28-', '29-', '*30-', '01', '02'],
        ['03', '04', '05+', '06', '07', '08', '09'],
        ['10', '11', '12', '13', '14', '15', '16'],
        ['17', '18', '19', '20', '21', '22', '23'],
        ['24', '25', '26', '27', '28', '29', '30'],
        ['31', '01-', '02-', '03-', '04-', '05-', '06-'],
      ], 'October', '2010');

      dispatchKey(fixture, 'ArrowUp');
      expectCalendar(fixture.nativeElement, [
        ['29-', '30-', '31-', '01', '02', '03', '04'],
        ['05', '06', '07', '08', '09', '10', '11'],
        ['12', '13', '14', '15', '16', '17', '18'],
        ['19', '20', '21', '22', '23', '24', '25'],
        ['26', '27', '28+', '29', '*30', '01-', '02-'],
      ], 'September', '2010');

      dispatchKey(fixture, 'ArrowRight');
      expectCalendar(fixture.nativeElement, [
        ['29-', '30-', '31-', '01', '02', '03', '04'],
        ['05', '06', '07', '08', '09', '10', '11'],
        ['12', '13', '14', '15', '16', '17', '18'],
        ['19', '20', '21', '22', '23', '24', '25'],
        ['26', '27', '28', '29+', '*30', '01-', '02-'],
      ], 'September', '2010');
    }));

    it('will be able to activate appropriate edge day', testAsync((fixture: ComponentFixture<TestComponent>) => {
      fixture.detectChanges();

      dispatchKey(fixture, 'Home');
      expectCalendar(fixture.nativeElement, [
        ['29-', '30-', '31-', '01+', '02', '03', '04'],
        ['05', '06', '07', '08', '09', '10', '11'],
        ['12', '13', '14', '15', '16', '17', '18'],
        ['19', '20', '21', '22', '23', '24', '25'],
        ['26', '27', '28', '29', '*30', '01-', '02-'],
      ], 'September', '2010');

      dispatchKey(fixture, 'End');
      expectCalendar(fixture.nativeElement, [
        ['29-', '30-', '31-', '01', '02', '03', '04'],
        ['05', '06', '07', '08', '09', '10', '11'],
        ['12', '13', '14', '15', '16', '17', '18'],
        ['19', '20', '21', '22', '23', '24', '25'],
        ['26', '27', '28', '29', '*30+', '01-', '02-'],
      ], 'September', '2010');
    }));

    it('will be able to select active day', testAsync((fixture: ComponentFixture<TestComponent>) => {
      fixture.detectChanges();

      dispatchKey(fixture, 'ArrowDown');
      dispatchKey(fixture, 'ArrowLeft');
      dispatchKey(fixture, 'ArrowLeft');
      expect(fixture.componentInstance.dateChange).not.toHaveBeenCalled();
      dispatchKey(fixture, 'Enter');
      expect(fixture.componentInstance.dateChange).toHaveBeenCalledWith('2010/10/5');
    }));
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
  directives: [NglDatepicker],
  template: `<ngl-datepicker [date]="date" (dateChange)="dateChange($event)"></ngl-datepicker>`,
})
export class TestComponent {
  date = '2010/09/30';
  dateChange = jasmine.createSpy('dateChange');
}
