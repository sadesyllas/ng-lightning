import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglTabs} from './tabs';
import {NglTab} from './tab';
import {selectElements} from '../../test/helpers';

function getTabsElement(element: Element): HTMLUListElement {
  return <HTMLUListElement>element.querySelector('ul');
}

function getTabHeaders(element: HTMLElement): HTMLElement[] {
  return selectElements(element, 'li > a');
}

function getTabContent(element: HTMLElement): string {
  return element.querySelector('.slds-tabs--default__content').textContent.trim();
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

  it('should render tab header based on template', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const headers = getTabHeaders(fixture.nativeElement);
    expect(headers[0].innerHTML).toContain('<b>My header</b>');
  }, `<ngl-tabs [(selected)]="selectedTab">
        <template #h><b>My header</b></template>
        <template ngl-tab [heading]="h"></template>
      </ngl-tabs>`));

  it('should activate tab based on id', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(getTabContent(fixture.nativeElement)).toBe('Tab 2');
    });
  }));

  it('should request tab activation on header click', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const headers = getTabHeaders(fixture.nativeElement);
      headers[2].click();
      fixture.detectChanges();
      expect(getTabContent(fixture.nativeElement)).toBe('Tab 3');
    });
  }));

  it('should call activate/deactivate methods accordingly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { componentInstance } = fixture;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(componentInstance.activate).not.toHaveBeenCalled();
      componentInstance.selectedTab = 'three';
      fixture.detectChanges();
      expect(componentInstance.activate).toHaveBeenCalledWith(true);

      componentInstance.selectedTab = 'two';
      fixture.detectChanges();
      expect(componentInstance.activate).toHaveBeenCalledWith(false);
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
      <template ngl-tab="another" #anotherTab="nglTab">Another tab</template>
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
      <template ngl-tab="three" heading="Third tab" (onActivate)="activate(true)"
            (onDeactivate)="activate(false)">Tab 3</template>
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
