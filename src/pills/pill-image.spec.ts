import {inject, async, TestComponentBuilder, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {NglPill} from './pill';
import {NglPillImage} from './pill-image';
import {NglAvatar} from '../images/avatar';
import {getPill} from './pill.spec';

function getIcon(element: HTMLElement): any {
  const pill = getPill(element);
  return pill.childNodes[1];
}

describe('NglPill', () => {

  it('should render correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    setTimeout(() => {
      const icon = getIcon(fixture.nativeElement);
      expect(icon).toHaveCssClass('slds-pill__icon');
    });
  }));

  it('should not conflict with avatars', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    setTimeout(() => {
      const icon = getIcon(fixture.nativeElement);
      expect(icon).toHaveCssClass('slds-pill__icon');
      expect(icon).toHaveCssClass('slds-avatar');
      expect(icon).not.toHaveCssClass('slds-avatar--medium');
    });
  }, `<ngl-pill><ngl-avatar nglPillImage></ngl-avatar>I am a pill!</ngl-pill>`));

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
  directives: [NglPill, NglPillImage, NglAvatar],
  template: `
    <ngl-pill>
      <svg nglPillImage></svg>
      I am a pill!
    </ngl-pill>
  `,
})
export class TestComponent {}
