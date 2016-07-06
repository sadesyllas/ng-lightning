import {inject, async, TestComponentBuilder, ComponentFixture}  from '@angular/core/testing';
import {Component} from '@angular/core';
import {NGL_POPOVER_DIRECTIVES} from './directives';
import {getPopoverElement} from './popover.spec';

describe('`NglPopoverBehavior`', () => {

  it('should change visibility based on mouse', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const triggerEl = fixture.nativeElement.firstElementChild;
    triggerEl.dispatchEvent(new Event('mouseenter'));

    setTimeout(() => {
      expect(getPopoverElement(fixture.nativeElement)).toBeTruthy();

      triggerEl.dispatchEvent(new Event('mouseleave'));
      expect(getPopoverElement(fixture.nativeElement)).toBeFalsy();
    });
  }));

  it('should change visibility based on focus', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const triggerEl = fixture.nativeElement.firstElementChild;
    triggerEl.dispatchEvent(new Event('focus'));

    setTimeout(() => {
      expect(getPopoverElement(fixture.nativeElement)).toBeTruthy();

      triggerEl.dispatchEvent(new Event('blur'));
      expect(getPopoverElement(fixture.nativeElement)).toBeFalsy();
    });
  }));

  it('should create more than one instances', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const triggerEl = fixture.nativeElement.firstElementChild;
    triggerEl.dispatchEvent(new Event('focus'));

    setTimeout(() => {
      triggerEl.dispatchEvent(new Event('mouseenter'));
      expect(fixture.nativeElement.querySelectorAll('ngl-popover').length).toBe(1);
    });
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
  directives: [NGL_POPOVER_DIRECTIVES],
  template: `
    <template #tip>I am a tooltip</template>
    <span [nglPopover]="tip" nglPopoverBehavior>Open here</span>
  `,
})
export class TestComponent {}
