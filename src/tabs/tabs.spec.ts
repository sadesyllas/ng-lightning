import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglTabs} from './tabs';
import {NglTab} from './tab';

function getTabsElement(element: Element): HTMLUListElement {
  return <HTMLUListElement>element.querySelector('ul');
}

function getTabHeaders(element: Element): HTMLLIElement[] {
  return [].slice.call(element.querySelectorAll('li'));
}

describe('Tabs Component', () => {

  it('should render the tabs container', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const tabs = getTabsElement(fixture.nativeElement);
    expect(tabs).toBeDefined();
    expect(tabs.tagName).toBe('UL');
    expect(tabs).toHaveCssClass('slds-tabs--default__nav');
  }));

  it('should render the tab headers', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const headers = getTabHeaders(fixture.nativeElement);
    expect(headers.length).toBe(3);
    expect(headers.map((h: HTMLElement) => h.textContent.trim())).toEqual(['First', 'Second',  'Third tab']);
  }));

  it('should activate tab based on id', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { componentInstance } = fixture;

    spyOn(componentInstance, 'change').and.callFake((tab: NglTab) => {
      expect(tab.id).toBe('two');
    });

    fixture.detectChanges();
  }));

  it('should request tab activation on header click', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    spyOn(componentInstance, 'change').and.callFake((tab: NglTab) => {
      if (componentInstance.change.calls.count() !== 2) return;
      expect(tab.id).toBe('three');
    });

    const headers = getTabHeaders(nativeElement);
    headers[2].click();
  }));


  it('should allow activating tab from outside', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { componentInstance, nativeElement } = fixture;
    const button = nativeElement.querySelector('button');

    spyOn(componentInstance, 'change').and.callFake((tab: NglTab) => {
      expect(tab.id).toBe('another');
    });
    button.click();
  }, `
    <ngl-tabs [selected]="selectedTab" (selectedChange)="change($event)">
      <template ngl-tab></template>
      <template ngl-tab="another" #anotherTab="nglTab"></template>
    </ngl-tabs>
    <button (click)="selectedTab = anotherTab"></button>
  `));

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
  directives: [NglTabs, NglTab],
  template: `
    <ngl-tabs [selected]="selectedTab" (selectedChange)="change($event)">
      <template ngl-tab heading="First">Tab 1</template>
      <template ngl-tab="two" heading="Second">Tab 2</template>
      <template ngl-tab="three" heading="Third tab">Tab 3</template>
    </ngl-tabs>
  `,
})
export class TestComponent {
  selectedTab = 'two';
  change() {}
}
