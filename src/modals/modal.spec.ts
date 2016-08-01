import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';
import {Component} from '@angular/core';
import {dispatchKeyEvent} from '../../test/util/helpers';
import {By} from '@angular/platform-browser';
import {NglModal} from './modal';


function getModal(element: HTMLElement): HTMLElement {
  return <HTMLElement>element.querySelector('.slds-modal');
}

function getHeader(element: HTMLElement) {
  return element.querySelector('.slds-modal__header > h2');
}

function getCloseButton(element: HTMLElement): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('.slds-modal__header > button.slds-modal__close');
}

function getBackdrop(element: HTMLElement) {
  return element.querySelector('.slds-backdrop');
}


describe('`NglModal`', () => {

  it('should render correctly if open', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const modal = getModal(fixture.nativeElement);
    expect(modal).toHaveCssClass('slds-fade-in-open');
    expect(modal.getAttribute('aria-hidden')).toBe('false');

    const header = getHeader(modal);
    expect(header).toHaveText('Modal Header');
    expect(header.id).toEqual(modal.getAttribute('aria-labelledby'));

    const content = modal.querySelector('.slds-modal__content');
    expect(content).toHaveText('Body content.');

    const backdrop = getBackdrop(fixture.nativeElement);
    expect(backdrop).toHaveCssClass('slds-backdrop--open');
  }));

  it('should render correctly if closed', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.open = false;
    fixture.detectChanges();

    const modal = getModal(fixture.nativeElement);
    expect(modal).not.toHaveCssClass('slds-fade-in-open');
    expect(modal.getAttribute('aria-hidden')).toBe('true');

    const backdrop = getBackdrop(fixture.nativeElement);
    expect(backdrop).not.toHaveCssClass('slds-backdrop--open');
  }));

  it('should render correctly without header', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const headerEl = fixture.nativeElement.querySelector('.slds-modal__header');
    expect(headerEl).not.toHaveCssClass('slds-modal__header--empty');
    expect(getHeader(fixture.nativeElement)).toBeTruthy();

    fixture.componentInstance.header = null;
    fixture.detectChanges();
    expect(headerEl).toHaveCssClass('slds-modal__header--empty');
    expect(getHeader(fixture.nativeElement)).toBeFalsy();
  }));

  it('should close when close button is clicked', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expect(fixture.componentInstance.openChange).not.toHaveBeenCalled();

    const button = getCloseButton(fixture.nativeElement);
    button.click();
    expect(fixture.componentInstance.openChange).toHaveBeenCalledWith(false);
  }));

  it('should close when escape is triggered', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expect(fixture.componentInstance.openChange).not.toHaveBeenCalled();

    dispatchKeyEvent(fixture, By.directive(NglModal), 'keydown.esc');
    expect(fixture.componentInstance.openChange).toHaveBeenCalledWith(false);
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
  directives: [NglModal],
  template: `
    <ngl-modal [header]="header" [open]="open" (openChange)="openChange($event)" [size]="size">
      <div body>Body content.</div>
      <button class="slds-button slds-button--neutral" (click)="cancel()">Cancel</button>
      <button class="slds-button slds-button--neutral slds-button--brand">Save</button>
    </ngl-modal>`,
})
export class TestComponent {
  open = true;
  openChange = jasmine.createSpy('openChange');

  header = 'Modal Header';
}
