import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglPill} from './pill';
import {NglPillImage} from './pill-image';
import {NglPillRemove} from './pill-remove';

function getPill(root: HTMLElement): any {
  return root.firstElementChild;
}

function getIcon(pill: HTMLElement): any {
  return pill.childNodes[1];
}

function getText(pill: HTMLElement): any {
  return pill.childNodes[2];
}

function getRemoveButton(pill: HTMLElement): any {
   return <HTMLButtonElement>pill.querySelector('button');
}

describe('NglPill', () => {

  it('should have the proper css classes and text content', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const pill = getPill(fixture.nativeElement);
    const icon = getIcon(pill);
    const text = getText(pill);
    const removeButton = getRemoveButton(pill);
    expect(pill).toHaveCssClass('slds-pill');
    expect(icon).toHaveCssClass('slds-pill__icon');
    expect(text.textContent.trim()).toBe('I am a pill!');
    expect(removeButton).toHaveCssClass('slds-pill__remove');
    expect(removeButton).toBe(pill.childNodes[4]);
  }));

  it('should not render the remove button without `nglPillRemove`', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const pill = getPill(fixture.nativeElement);
    expect(getRemoveButton(pill)).toBeNull();
  }, `<span nglPill></span>`));

  it('should not render the remove button without `nglPillRemove` even with `nglPillRemovable`', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    const pill = getPill(fixture.nativeElement);
    expect(getRemoveButton(pill)).toBeNull();
  }, `<span nglPill nglPillRemovable="true"></span>`));

  it('should toggle the remove button based on `nglPillRemovable`', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const pill = getPill(fixture.nativeElement);

    fixture.componentInstance.removable = false;
    fixture.detectChanges();
    expect(getRemoveButton(pill)).toBeNull();

    fixture.componentInstance.removable = true;
    fixture.detectChanges();
    expect(getRemoveButton(pill)).not.toBeNull();
  }, `<span nglPill (nglPillRemove)="onRemove()" [nglPillRemovable]="removable"></span>`));

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
  directives: [NglPill, NglPillImage, NglPillRemove],
  template: `
    <span nglPill (nglPillRemove)="onRemove()">
      <svg nglPillImage></svg>
      I am a pill!
    </span>
  `,
})
export class TestComponent {
  removable = true;
  onRemove() {}
}
