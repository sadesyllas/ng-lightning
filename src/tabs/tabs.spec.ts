import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglTabs} from './tabs';
import {NglTab} from './tab';
import {NglTabVerbose, NglTabContent, NglTabHeading} from './tab-verbose';
import {selectElements, dispatchKeyEvent} from '../../test/util/helpers';
import {By} from '@angular/platform-browser';

function getTabsElement(element: Element): HTMLUListElement {
  return <HTMLUListElement>element.querySelector('ul');
}

function getTabHeaders(element: HTMLElement): HTMLElement[] {
  return selectElements(element, 'li > a');
}

function getTabContent(element: HTMLElement): string {
  return element.querySelector('.slds-tabs--default__content').textContent;
}

function expectHeaders(element: HTMLElement, expected: string[]) {
  const headers = getTabHeaders(element);
  expect(headers.map((h: HTMLElement) => h.innerHTML.replace(/<!--[\s\S]*?-->/g, '').trim())).toEqual(expected);
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
    expectHeaders(fixture.nativeElement, ['First', 'Second',  'Third tab', 'Fourth tab']);
  }));

  it('should render tab headers based on template', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expectHeaders(fixture.nativeElement, ['<b>My header</b>', 'Simple', '<i>Another</i> header']);
  }, `<ngl-tabs [(selected)]="selectedTab">
        <template #h><b>My header</b></template>
        <template ngl-tab [heading]="h"></template>
        <ngl-tab heading="Simple">
          <template ngl-tab-content></template>
        </ngl-tab>
        <ngl-tab>
          <template ngl-tab-heading><i>Another</i> header</template>
          <template ngl-tab-content></template>
        </ngl-tab>
      </ngl-tabs>`));

  it('should activate tab based on id', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(getTabContent(fixture.nativeElement)).toBe('Tab 2');
    });
  }));

  it('should request tab activation on header click', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const headers = getTabHeaders(fixture.nativeElement);
    headers[2].click();
    fixture.detectChanges();
    expect(getTabContent(fixture.nativeElement)).toBe('Tab 3');

    headers[3].click();
    fixture.detectChanges();
    expect(getTabContent(fixture.nativeElement)).toBe('Tab 4');
  }));

  it('should activate tab based on keyboard', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const predicate = By.css('ul[role=tablist]');

    dispatchKeyEvent(fixture, predicate, `keydown.ArrowLeft`);
    fixture.detectChanges();
    expect(getTabContent(fixture.nativeElement)).toBe('Tab 1');

    dispatchKeyEvent(fixture, predicate, `keydown.ArrowRight`);
    fixture.detectChanges();
    expect(getTabContent(fixture.nativeElement)).toBe('Tab 2');

    dispatchKeyEvent(fixture, predicate, `keydown.ArrowRight`);
    fixture.detectChanges();
    expect(getTabContent(fixture.nativeElement)).toBe('Tab 3');
  }));

  it('should call activate/deactivate methods accordingly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { componentInstance } = fixture;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(componentInstance.activate).not.toHaveBeenCalled();
      componentInstance.selectedTab = 'three';
      fixture.detectChanges();
      expect(componentInstance.activate).toHaveBeenCalledWith(true);

      componentInstance.selectedTab = 3; // index based
      fixture.detectChanges();
      expect(componentInstance.activate).toHaveBeenCalledWith(false);
      expect(componentInstance.activate).toHaveBeenCalledWith(4, true);

      componentInstance.selectedTab = 'two';
      fixture.detectChanges();
      expect(componentInstance.activate).toHaveBeenCalledWith(4, false);
    });
  }));

  it('should allow activating tab from outside', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');

    fixture.whenStable().then(() => {
      expect(getTabContent(fixture.nativeElement)).not.toBe('Another tab');
      button.click();
      fixture.detectChanges();
      expect(getTabContent(fixture.nativeElement)).toBe('Another tab');
    });
  }, `
    <ngl-tabs [selected]="selectedTab" (selectedChange)="change($event)">
      <template ngl-tab></template>
      <template ngl-tab nglTabId="another" #anotherTab="nglTab">Another tab</template>
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
  directives: [NglTabs, NglTab, NglTabVerbose, NglTabContent, NglTabHeading],
  template: `
    <ngl-tabs [selected]="selectedTab" (selectedChange)="change($event)">
      <template ngl-tab heading="First">Tab 1</template>
      <template ngl-tab nglTabId="two" heading="Second">Tab 2</template>
      <template ngl-tab nglTabId="three" heading="Third tab" (onActivate)="activate(true)"
            (onDeactivate)="activate(false)">Tab 3</template>
      <ngl-tab (onActivate)="activate(4, true)" (onDeactivate)="activate(4, false)">
        <template ngl-tab-heading>Fourth tab</template>
        <template ngl-tab-content>Tab 4</template>
      </ngl-tab>
    </ngl-tabs>
  `,
})
export class TestComponent {
  selectedTab = 'two';
  change = jasmine.createSpy('selectedChange').and.callFake(($event: any) => {
    this.selectedTab = $event;
  });
  activate = jasmine.createSpy('activate');
}
