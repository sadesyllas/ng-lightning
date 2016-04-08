import {it, describe, expect, injectAsync, TestComponentBuilder, FunctionWithParamTokens} from 'angular2/testing';
import {Component} from 'angular2/core';
import {NglAvatar} from './avatar';

function getAvatarElement(element: Element): HTMLElement {
  return <HTMLElement>element.firstElementChild;
}

function getImageElement(element: Element): HTMLImageElement {
  return <HTMLImageElement>element.querySelector('img');
}

describe('Avatar Component', () => {

  it('should render the avatar element with default classes', testAsync((tcb: TestComponentBuilder) => {
    return createFixture(tcb, `<ngl-avatar src="image1.jpg" class="custom-class"></ngl-avatar>`).then((fixture) => {
      fixture.detectChanges();

      const avatar = getAvatarElement(fixture.nativeElement);
      const image = getImageElement(avatar);
      expect(image.getAttribute('src')).toBe('image1.jpg');
      expect(avatar).toHaveCssClass('slds-avatar--rectangle');
      expect(avatar).toHaveCssClass('slds-avatar--medium');
      expect(avatar).toHaveCssClass('slds-avatar');
      expect(avatar).toHaveCssClass('custom-class');
    });
  }));

  it('should change the type of the avatar element based on input', testAsync((tcb: TestComponentBuilder) => {
    return createFixture(tcb, `<ngl-avatar [type]="type" src="image1.jpg" [ngClass]="{'custom-class': true}"></ngl-avatar>`).then((fixture) => {
      fixture.detectChanges();

      const avatar = getAvatarElement(fixture.nativeElement);

      expect(avatar).toHaveCssClass('slds-avatar--circle');
      expect(avatar).toHaveCssClass('custom-class');

      fixture.componentInstance.type = 'rectangle';
      fixture.detectChanges();
      expect(avatar).toHaveCssClass('slds-avatar--rectangle');
      expect(avatar).not.toHaveCssClass('slds-avatar--circle');
      expect(avatar).toHaveCssClass('custom-class');
    });
  }));

  it('should change the size of the avatar element based on input', testAsync((tcb: TestComponentBuilder) => {
    return createFixture(tcb, `<ngl-avatar [size]="size" src="image1.jpg"></ngl-avatar>`).then((fixture) => {
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
    });
  }));

  it('should render the avatar element with assistive text', testAsync((tcb: TestComponentBuilder) => {
    return createFixture(tcb, `<ngl-avatar alt="assistive text" src="image1.jpg"></ngl-avatar>`).then((fixture) => {
      fixture.detectChanges();

      const avatar = getAvatarElement(fixture.nativeElement);
      const image = getImageElement(avatar);
      expect(image.getAttribute('alt')).toEqual('assistive text');
    });
  }));
});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(fn: Function): FunctionWithParamTokens {
  return injectAsync([TestComponentBuilder], fn);
}

function createFixture(tcb: TestComponentBuilder, html: string) {
  return tcb.overrideTemplate(TestComponent, html).createAsync(TestComponent);
}

@Component({
  directives: [NglAvatar],
  template: ``,
})
export class TestComponent {
  type: string = 'circle';
  size: string = 'small';
}
