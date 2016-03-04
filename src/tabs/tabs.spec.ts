import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglTabs} from './tabs';
import {NglTab} from './tab';

function getTabsElement(element: Element): HTMLUListElement {
  return <HTMLUListElement>element.querySelector('ul');
}

function getTabHeaders(element: Element): HTMLLIElement[] {
  return [].slice.call(element.querySelectorAll('li'));
}

describe('Tabs Component', () => {

  let html = `
   <ngl-tabs [selected]="selectedTab" (selectedChange)="change($event)">
    <template ngl-tab heading="First">Tab 1</template>
    <template ngl-tab="two" heading="Second">Tab 2</template>
    <template ngl-tab="three" heading="Third tab">Tab 3</template>
   </ngl-tabs>
  `;

  it('should render the tabs container', testAsync(html, ({fixture, done}) => {
    fixture.detectChanges();

    const tabs = getTabsElement(fixture.nativeElement);
    expect(tabs).toBeDefined();
    expect(tabs.tagName).toBe('UL');
    expect(tabs).toHaveCssClass('slds-tabs--default__nav');
    done();
  }));

  it('should render the tab headers', testAsync(html, ({fixture, done}) => {
    fixture.detectChanges();

    const headers = getTabHeaders(fixture.nativeElement);
    expect(headers.length).toBe(3);
    expect(headers.map((h: HTMLElement) => h.textContent.trim())).toEqual(['First', 'Second',  'Third tab']);
    done();
  }));

  it('should activate tab based on id', testAsync(html, ({fixture, done}) => {
    const { componentInstance } = fixture;

    spyOn(componentInstance, 'change').and.callFake((tab: NglTab) => {
      expect(tab.id).toBe('two');
      done();
    });

    fixture.detectChanges();
  }));

  it('should request tab activation on header click', testAsync(html, ({fixture, done}) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    spyOn(componentInstance, 'change').and.callFake((tab: NglTab) => {
      if (componentInstance.change.calls.count() !== 2) return;
      expect(tab.id).toBe('three');
      done();
    });

    const headers = getTabHeaders(nativeElement);
    headers[2].click();
  }));

});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(html: string, fn: Function) {
  return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return new Promise((done: Function) => {
      tcb.overrideTemplate(TestComponent, html).createAsync(TestComponent).then((fixture) => fn({ fixture, done}));
    });
  });
}

@Component({
  directives: [NglTabs, NglTab],
  template: '',
})
export class TestComponent {
  selectedTab = 'two';
  change() {}
}
