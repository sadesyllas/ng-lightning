import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglPill} from './pill';
import {NglPillImage} from './pill-image';
import {provideNglConfig} from '../config/config';

function getPill(root: HTMLElement): any {
  return root.childNodes[1];
}

function getIcon(pill: HTMLElement): any {
  return pill.childNodes[1];
}

function getText(pill: HTMLElement): any {
  return pill.childNodes[2];
}

function getRemoveButton(pill: HTMLElement): any {
   return pill.childNodes[4];
}

describe('NglPill', () => {

  it('should have the proper css classes and text content', testAsync(({fixture, done}) => {
    fixture.detectChanges();
    const pill = getPill(fixture.nativeElement);
    const icon = getIcon(pill);
    const text = getText(pill);
    const removeButton = getRemoveButton(pill);
    expect(pill).toHaveCssClass('slds-pill');
    expect(icon).toHaveCssClass('slds-pill__icon');
    expect(text.textContent.trim()).toBe('I am a pill!');
    expect(removeButton).toHaveCssClass('slds-pill__remove');
    done();
  }));

  it('should not render the remove button when [removable] is falsy', testAsync(({fixture, done}) => {
    fixture.componentInstance.removable = false;
    fixture.detectChanges();
    const pill = getPill(fixture.nativeElement);
    const removeButton = getRemoveButton(pill);
    expect(removeButton.childNodes.length).toBe(0);
    done();
  }));

  it('should trigger the remove event whenever the remove button is clicked', testAsync(({fixture, done}) => {
    fixture.detectChanges();
    const pill = getPill(fixture.nativeElement);
    const removeButton = getRemoveButton(pill);
    spyOn(fixture.componentInstance, 'onRemove').and.callFake(function() {
      done();
    });
    removeButton.click();
  }));

});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(fn: Function, html: string = null) {
  return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return new Promise((done: Function) => {
      if (html) {
        tcb = tcb.overrideTemplate(TestComponent, html);
      }
      tcb.createAsync(TestComponent).then((fixture) => fn({ fixture, done}));
    });
  });
}

@Component({
  directives: [NglPill, NglPillImage],
  template: `
    <span nglPill (remove)="onRemove()" [removable]="removable">
      <svg aria-hidden="true" class="slds-icon slds-icon-standard-account" nglPillImage>
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"></use>
      </svg>
      I am a pill!
    </span>
  `,
  providers: [provideNglConfig()],
})
export class TestComponent {
  removable = true;
  onRemove() {}
}
