import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglInternalOutlet} from './outlet';

function getElement(fixture: ComponentFixture<TestComponent>) {
  return fixture.nativeElement.firstElementChild;
}

describe('`NglInternalOutlet`', () => {

  it('should render string', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.componentInstance.isTemplate = false;
    fixture.detectChanges();
    expect(getElement(fixture)).toHaveText('String content');
  }));

  it('should render template', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expect(getElement(fixture)).toHaveText('Template content. Count is 10');
  }));

  it('could switch between string and template', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expect(getElement(fixture)).not.toHaveText('String content');

    fixture.componentInstance.isTemplate = false;
    fixture.detectChanges();
    expect(getElement(fixture)).toHaveText('String content');
  }));

  it('should be able to update variables in template', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    fixture.componentInstance.count = 15;
    fixture.detectChanges();
    expect(getElement(fixture)).toHaveText('Template content. Count is 15');
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
  directives: [NglInternalOutlet],
  template: `
    <template #tpl>Template content. Count is {{ count }}</template>
    <span [nglInternalOutlet]="isTemplate ? tpl : str"></span>
  `,
})
export class TestComponent {
  isTemplate = true;
  str = 'String content';
  count = 10;
}
