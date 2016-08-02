import {inject, async, fakeAsync, tick, TestComponentBuilder, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {NglNotification} from './notification';
import {NglNotificationClose} from './notification-close';
import {provideNglConfig} from '../config/config';

function getCloseButton(fixture: any): HTMLElement {
  return fixture.nativeElement.querySelector('button');
}

describe('`nglNotification`', () => {

  it('should have the proper classes and attributes', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const notificationElement = fixture.nativeElement.querySelector('.slds-notify');

    expect(notificationElement.getAttribute('role')).toBe('alert');

    fixture.componentInstance.type = 'toast';
    fixture.componentInstance.severity = 'error';
    fixture.detectChanges();

    expect(notificationElement).toHaveCssClass('slds-notify--toast');
    expect(notificationElement).toHaveCssClass('slds-theme--error');

    fixture.componentInstance.type = 'alert';
    fixture.componentInstance.severity = null;
    fixture.detectChanges();

    expect(notificationElement).toHaveCssClass('slds-notify--alert');
    expect(notificationElement).not.toHaveCssClass('slds-theme--error');

    const closeButton = getCloseButton(fixture);
    expect(closeButton).toHaveCssClass('slds-notify__close');
  }));

  it('should have the proper assistive texts', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.assistiveText = 'Test of assistive text';
    fixture.componentInstance.closeAssistiveText = 'Test of close assistive text';

    fixture.detectChanges();

    const assistiveTexts = fixture.nativeElement.querySelectorAll('.slds-assistive-text');
    expect(assistiveTexts.length).toBe(2);
    expect(assistiveTexts[0].textContent).toBe(fixture.componentInstance.assistiveText);
    expect(assistiveTexts[1].textContent).toBe(fixture.componentInstance.closeAssistiveText);
  }));

  it('should not have a close button when the nglNotificationClose attribute is absent', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const closeButton = getCloseButton(fixture);
    expect(closeButton).toBeFalsy();
  }, '<ngl-notification [type]="type" [severity]="severity">'));

  it('should emit a close event when the close button is clicked', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const closeButton = getCloseButton(fixture);
    closeButton.click();
    expect(fixture.componentInstance.onClose).toHaveBeenCalledWith('button');
  }));

  it('should emit a close event when its `close` method is called', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const externalCloseButton = fixture.nativeElement.querySelector('.boundVarCloser');
    externalCloseButton.click();
    expect(fixture.componentInstance.onClose).toHaveBeenCalledWith('api');
  }));

  it('should emit a close event when the specified timeout has passed', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.timeout = 500;
    fixture.detectChanges();

    tick(400);
    expect(fixture.componentInstance.onClose).not.toHaveBeenCalled();

    tick(100);
    expect(fixture.componentInstance.onClose).toHaveBeenCalledWith('timeout');
  }, null, true));

  it('should set the timeout anew when the binding changes', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.timeout = 500;
    fixture.detectChanges();

    tick(400);
    fixture.componentInstance.timeout = 300;
    fixture.detectChanges();

    tick(299);
    expect(fixture.componentInstance.onClose).not.toHaveBeenCalled();

    tick(1);
    expect(fixture.componentInstance.onClose).toHaveBeenCalledWith('timeout');
  }, null, true));

  it('should cancel the active timeout after the close button has been clicked', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.timeout = 500;
    fixture.detectChanges();

    tick(400);
    getCloseButton(fixture).click();

    tick(100);
    expect(fixture.componentInstance.onClose).toHaveBeenCalledWith('button');
    expect(fixture.componentInstance.onClose).not.toHaveBeenCalledWith('timeout');
  }, null, true));

});

// Shortcut function for less boilerplate on each `it`
function testAsync(fn: (value: ComponentFixture<TestComponent>) => void, html: string = null, fake = false) {
  const injectFn = inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    if (html) {
      tcb = tcb.overrideTemplate(TestComponent, html);
    }
    return tcb.createAsync(TestComponent).then(fn);
  });
  return fake ? fakeAsync(injectFn) : async(injectFn);
}

@Component({
  directives: [NglNotification, NglNotificationClose],
  template: `
    <ngl-notification [type]="type" [severity]="severity" (nglNotificationClose)="onClose($event)"
      [assistiveText]="assistiveText" [closeAssistiveText]="closeAssistiveText"
      [timeout]="timeout"
      #notification="nglNotification">
      <h2>Base System Alert</h2>
    </ngl-notification>
    <button type="button" (click)="notification.close('api')" class="boundVarCloser"></button>
  `,
  providers: [provideNglConfig()],
})
export class TestComponent {
  type = 'toast';
  severity = 'error';
  assistiveText: '';
  closeAssistiveText: '';
  timeout: any = null;
  onClose = jasmine.createSpy('onClose');
}
