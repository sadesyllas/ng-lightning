import {it, describe, expect, injectAsync, fakeAsync, tick, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglNotification} from './notification';
import {NglNotificationClose} from './notification-close';
import {provideNglConfig} from '../config/config';

function getCloseButton(fixture: any): HTMLElement {
  return fixture.nativeElement.querySelector('button');
}

describe('`nglNotification`', () => {

  it('should have the proper classes and attributes', testAsync(({fixture, done}) => {
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
    done();
  }));

  it('should have the proper assistive texts', testAsync(({fixture, done}) => {
    fixture.componentInstance.assistiveText = 'Test of assistive text';
    fixture.componentInstance.closeAssistiveText = 'Test of close assistive text';

    fixture.detectChanges();

    const assistiveTexts = fixture.nativeElement.querySelectorAll('.slds-assistive-text');
    expect(assistiveTexts.length).toBe(2);
    expect(assistiveTexts[0].textContent).toBe(fixture.componentInstance.assistiveText);
    expect(assistiveTexts[1].textContent).toBe(fixture.componentInstance.closeAssistiveText);
    done();
  }));

  it('should not have a close button when the nglNotificationClose attribute is absent', testAsync(({fixture, done}) => {
    fixture.detectChanges();

    const closeButton = getCloseButton(fixture);
    expect(closeButton).toBeFalsy();
    done();
  }, '<ngl-notification [type]="type" [severity]="severity">'));

  it('should emit a close event when the close button is clicked', testAsync(({fixture, done}) => {
    fixture.detectChanges();

    const closeButton = getCloseButton(fixture);

    spyOn(fixture.componentInstance, 'onClose').and.callFake((reason: string) => {
      expect(reason).toBe('button');
      done();
    });

    closeButton.click();
  }));

  it('should emit a close event when its `close` method is called', testAsync(({fixture, done}) => {
    fixture.detectChanges();

    const externalCloseButton = fixture.nativeElement.querySelector('.boundVarCloser');

    spyOn(fixture.componentInstance, 'onClose').and.callFake((reason: string) => {
      expect(reason).toBe('api');
      done();
    });

    externalCloseButton.click();
  }));

  it('should emit a close event when the specified timeout has passed', testAsync(fakeAsync(({fixture, done}) => {
    fixture.componentInstance.timeout = 500;
    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'onClose');

    tick(400);
    expect(fixture.componentInstance.onClose).not.toHaveBeenCalled();

    tick(100);
    expect(fixture.componentInstance.onClose).toHaveBeenCalledWith('timeout');
    done();
  })));

  it('should set the timeout anew when the binding changes', testAsync(fakeAsync(({fixture, done}) => {
    fixture.componentInstance.timeout = 500;
    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'onClose');

    tick(400);
    fixture.componentInstance.timeout = 300;
    fixture.detectChanges();

    tick(100);
    expect(fixture.componentInstance.onClose).not.toHaveBeenCalled();

    tick(200);
    expect(fixture.componentInstance.onClose).toHaveBeenCalledWith('timeout');
    done();
  })));

  it('should cancel the active timeout after the close button has been clicked', testAsync(fakeAsync(({fixture, done}) => {
    fixture.componentInstance.timeout = 500;
    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'onClose');

    tick(400);
    getCloseButton(fixture).click();

    tick(100);
    expect(fixture.componentInstance.onClose).toHaveBeenCalledWith('button');
    expect(fixture.componentInstance.onClose).not.toHaveBeenCalledWith('timeout');
    done();
  })));

});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(fn: Function, html: string = null) {
  return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return new Promise((done: Function) => {
      if (html) {
        tcb = tcb.overrideTemplate(TestComponent, html);
      }
      tcb.createAsync(TestComponent).then(fixture => fn({ fixture, done})).catch(err => console.error(err.stack || err));
    });
  });
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
  onClose($event: Event) {}
}
