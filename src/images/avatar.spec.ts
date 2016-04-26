import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglAvatar} from './avatar';
import {NglPillImage} from '../pills/pill-image';

function getAvatarElement(element: Element): HTMLElement {
  return <HTMLElement>element.firstElementChild;
}

function getImageElement(element: Element): HTMLImageElement {
  return <HTMLImageElement>element.querySelector('img');
}

describe('Avatar Component', () => {

  it('should render the avatar element with default classes', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const avatar = getAvatarElement(fixture.nativeElement);
    const image = getImageElement(avatar);
    expect(image.getAttribute('src')).toBe('image1.jpg');
    expect(avatar).toHaveCssClass('slds-avatar--rectangle');
    expect(avatar).toHaveCssClass('slds-avatar--medium');
    expect(avatar).toHaveCssClass('slds-avatar');
    expect(avatar).toHaveCssClass('custom-class');
  }, `<ngl-avatar src="image1.jpg" class="custom-class"></ngl-avatar>`));

  it('should change the type of the avatar element based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const avatar = getAvatarElement(fixture.nativeElement);

    expect(avatar).toHaveCssClass('slds-avatar--circle');
    expect(avatar).toHaveCssClass('custom-class');

    fixture.componentInstance.type = 'rectangle';
    fixture.detectChanges();
    expect(avatar).toHaveCssClass('slds-avatar--rectangle');
    expect(avatar).not.toHaveCssClass('slds-avatar--circle');
    expect(avatar).toHaveCssClass('custom-class');
  }, `<ngl-avatar [type]="type" src="image1.jpg" [ngClass]="{'custom-class': true}"></ngl-avatar>`));

  it('should change the size of the avatar element based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const avatar = getAvatarElement(fixture.nativeElement);

    expect(avatar).toHaveCssClass('slds-avatar--small');
    expect(avatar).not.toHaveCssClass('slds-avatar--large');
    expect(avatar).not.toHaveCssClass('slds-avatar--x-small');
    expect(avatar).not.toHaveCssClass('slds-avatar--medium');

    fixture.componentInstance.size = 'large';
    fixture.detectChanges();
    expect(avatar).toHaveCssClass('slds-avatar--large');
    expect(avatar).not.toHaveCssClass('slds-avatar--small');
  }, `<ngl-avatar [size]="size" src="image1.jpg"></ngl-avatar>`));

  it('should render the avatar element with assistive text', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const avatar = getAvatarElement(fixture.nativeElement);
    const image = getImageElement(avatar);
    expect(image.getAttribute('alt')).toEqual('assistive text');
  }, `<ngl-avatar alt="assistive text" src="image1.jpg"></ngl-avatar>`));

  it('should be able to render as a pill image', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();

    const avatar = getAvatarElement(fixture.nativeElement);
    expect(avatar).toHaveCssClass('slds-pill__icon');
    expect(avatar).not.toHaveCssClass('slds-avatar--medium');
  }, `<ngl-avatar src="image1.jpg" nglPillImage></ngl-avatar>`));
});


// Shortcut function for less boilerplate on each `it`
function testAsync(fn: (value: ComponentFixture<TestComponent>) => void, html: string = null) {
  return async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.overrideTemplate(TestComponent, html).createAsync(TestComponent).then(fn);
  }));
}

@Component({
  directives: [NglAvatar, NglPillImage],
  template: ``,
})
export class TestComponent {
  type: string = 'circle';
  size: string = 'small';
}
