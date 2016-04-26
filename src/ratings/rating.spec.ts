import {it, describe, expect, inject, async}  from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {NglRating} from './rating';
import {dispatchKeyEvent} from '../../test/helpers';

function getStars(element: HTMLElement): HTMLElement[] {
  return [].slice.call(element.querySelectorAll('ngl-icon'));
}

function getICons(element: HTMLElement): SVGElement[] {
  return [].slice.call(element.querySelectorAll('svg'));
}

function expectState(element: HTMLElement, state: string) {
  const stars = getICons(element);
  expect(stars.length).toBe(state.length);
  expect(+element.firstElementChild.getAttribute('aria-valuemax')).toBe(state.length);
  expect(+element.firstElementChild.getAttribute('aria-valuenow')).toBe((state.match(/\*/g) || []).length);
  expect(stars.map(icon => icon.classList.contains('slds-icon-text-warning') ? '*' : '-').join('')).toBe(state);
}

describe('Rating Component', () => {

  it('should render the stars correctly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();
    expectState(nativeElement, '**---');

    componentInstance.value = 4;
    fixture.detectChanges();
    expectState(nativeElement, '****-');
  }));

  it('prevents stars from wrapping', testAsync((fixture: ComponentFixture<TestComponent>) => {
    fixture.detectChanges();
    expect(fixture.nativeElement.firstElementChild).toHaveCssStyle({'white-space': 'nowrap', 'background-color': 'red'});
  }, `<ngl-rating [(rate)]="value" style="background: red;"></ngl-rating>`));

  it('should change rate based on click', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    const stars = getStars(nativeElement);
    spyOn(componentInstance, 'change');
    expect(componentInstance.change).not.toHaveBeenCalled();

    stars[1].click();
    expect(componentInstance.change).not.toHaveBeenCalled();

    stars[3].click();
    expect(componentInstance.change).toHaveBeenCalledWith(4);
  }));

  it('should notify when hovering over a specific rate', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    const stars = getStars(nativeElement);
    spyOn(componentInstance, 'change');
    expect(componentInstance.change).not.toHaveBeenCalled();

    stars[3].dispatchEvent(new Event('mouseenter'));
    expect(componentInstance.change).toHaveBeenCalledWith(4);

    stars[0].dispatchEvent(new Event('mouseenter'));
    expect(componentInstance.change).toHaveBeenCalledWith(1);
  }, `<ngl-rating [rate]="value" (hover)="change($event)"></ngl-rating>`));

  describe(`max`, () => {
    it('defines the available stars', testAsync((fixture: ComponentFixture<TestComponent>) => {
      fixture.detectChanges();
      expectState(fixture.nativeElement, '*****-----');
    }, '<ngl-rating rate="5" max="10"></ngl-rating>'));
  });

  it('should not change when is readonly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    componentInstance.readonly = true;
    fixture.detectChanges();

    const stars = getStars(nativeElement);
    spyOn(componentInstance, 'change');
    expect(componentInstance.change).not.toHaveBeenCalled();

    stars[3].click();
    expect(componentInstance.change).not.toHaveBeenCalled();
  }));

  it('should not change when is readonly', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    componentInstance.readonly = true;
    fixture.detectChanges();

    const stars = getStars(nativeElement);
    spyOn(componentInstance, 'change');
    expect(componentInstance.change).not.toHaveBeenCalled();

    stars[3].click();
    expect(componentInstance.change).not.toHaveBeenCalled();
  }));

  describe('keyboard interaction', () => {
    it('will change value apropriately', testAsync((fixture: ComponentFixture<TestComponent>) => {
      const { nativeElement, componentInstance } = fixture;
      const ratingElement = nativeElement.firstElementChild;
      fixture.detectChanges();

      spyOn(componentInstance, 'change');
      expect(componentInstance.change).not.toHaveBeenCalled();

      dispatchKeyEvent(ratingElement, 'ArrowUp');
      expect(componentInstance.change).toHaveBeenCalledWith(3);
      dispatchKeyEvent(ratingElement, 'ArrowDown');
      expect(componentInstance.change).toHaveBeenCalledWith(1);

      componentInstance.change.calls.reset();

      dispatchKeyEvent(ratingElement, 'ArrowRight');
      expect(componentInstance.change).toHaveBeenCalledWith(3);
      dispatchKeyEvent(ratingElement, 'ArrowLeft');
      expect(componentInstance.change).toHaveBeenCalledWith(1);
    }));

    it('will keep value in limits', testAsync((fixture: ComponentFixture<TestComponent>) => {
      const { nativeElement, componentInstance } = fixture;
      const ratingElement = nativeElement.firstElementChild;
      componentInstance.value = 5;
      fixture.detectChanges();
      spyOn(componentInstance, 'change');

      dispatchKeyEvent(ratingElement, 'ArrowUp');
      expect(componentInstance.change).not.toHaveBeenCalled();

      componentInstance.value = 1;
      fixture.detectChanges();
      dispatchKeyEvent(ratingElement, 'ArrowDown');
      expect(componentInstance.change).not.toHaveBeenCalled();
    }));
  });

  it('should change icons size based on input', testAsync((fixture: ComponentFixture<TestComponent>) => {
    const { nativeElement, componentInstance } = fixture;
    componentInstance.size = 'small';
    fixture.detectChanges();

    const icons = getICons(nativeElement);
    icons.forEach(icon => expect(icon).toHaveCssClass('slds-icon--small'));

    componentInstance.size = 'large';
    fixture.detectChanges();
    icons.forEach(icon => {
      expect(icon).not.toHaveCssClass('slds-icon--small');
      expect(icon).toHaveCssClass('slds-icon--large');
    });

    componentInstance.size = null;
    fixture.detectChanges();
    icons.forEach(icon => {
      expect(icon).not.toHaveCssClass('slds-icon--small');
      expect(icon).not.toHaveCssClass('slds-icon--large');
    });
  }, `<ngl-rating [(rate)]="value" [size]="size"></ngl-rating>`));

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
  directives: [NglRating],
  template: `<ngl-rating [rate]="value" (rateChange)="change($event)" [isReadonly]="readonly"></ngl-rating>`,
})
export class TestComponent {
  value = 2;
  readonly = false;
  size: string;
  change() {}
}
