import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglPill} from './pill';
import {NglPillLink} from './pill-link';
import {NglPillRemove} from './pill-remove';

export function getPill(root: HTMLElement): any {
  return root.firstElementChild;
}

function getLabelEl(pill: HTMLElement): HTMLElement {
  return <HTMLElement>pill.querySelector('.slds-pill__label');
}

function getRemoveButton(pill: HTMLElement): any {
   return <HTMLButtonElement>pill.querySelector('button');
}

describe('NglPill', () => {

  it('should have the proper css classes and text content', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    setTimeout(() => {
      const pill = getPill(fixture.nativeElement);
      const text = getLabelEl(pill);
      const removeButton = getRemoveButton(pill);
      expect(pill).toHaveCssClass('slds-pill');
      expect(text.tagName).toBe('A');
      expect(text.textContent.trim()).toBe('I am a pill!');
      expect(removeButton).toHaveCssClass('slds-pill__remove');
    });
  }));

  it('should render unlinked correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    setTimeout(() => {
      const pill = getPill(fixture.nativeElement);
      const text = getLabelEl(pill);
      expect(text.tagName).toBe('SPAN');
      expect(text.textContent.trim()).toBe('I am unlinked!');
    });
  }, `<ngl-pill>I am unlinked!</ngl-pill>`));

  it('should not render the remove button without `nglPillRemove`', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const pill = getPill(fixture.nativeElement);
    expect(getRemoveButton(pill)).toBeNull();
  }, `<ngl-pill></ngl-pill>`));

  it('should not render the remove button without `nglPillRemove` even with `nglPillRemovable`', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const pill = getPill(fixture.nativeElement);
    expect(getRemoveButton(pill)).toBeNull();
  }, `<ngl-pill nglPillRemovable="true"></ngl-pill>`));

  it('should toggle the remove button based on `nglPillRemovable`', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const pill = getPill(fixture.nativeElement);

    fixture.componentInstance.removable = false;
    fixture.detectChanges();
    expect(getRemoveButton(pill)).toBeNull();

    fixture.componentInstance.removable = true;
    fixture.detectChanges();
    expect(getRemoveButton(pill)).not.toBeNull();
  }, `<ngl-pill (nglPillRemove)="onRemove()" [nglPillRemovable]="removable"></ngl-pill>`));

  it('should trigger the remove event whenever the remove button is clicked', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const pill = getPill(fixture.nativeElement);
    const removeButton = getRemoveButton(pill);
    spyOn(fixture.componentInstance, 'onRemove');
    expect(fixture.componentInstance.onRemove).not.toHaveBeenCalled();
    removeButton.click();
    expect(fixture.componentInstance.onRemove).toHaveBeenCalled();
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
  directives: [NglPill, NglPillLink, NglPillRemove],
  template: `
    <ngl-pill (nglPillRemove)="onRemove()">
      <a>I am a pill!</a>
    </ngl-pill>
  `,
})
export class TestComponent {
  removable = true;
  onRemove() {}
}
