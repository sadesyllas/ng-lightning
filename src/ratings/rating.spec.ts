import {it, describe, expect, injectAsync, TestComponentBuilder} from 'angular2/testing';
import {Component} from 'angular2/core';
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

  it('should render the stars correctly', testAsync(({fixture, done}) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();
    expectState(nativeElement, '**---');

    componentInstance.value = 4;
    fixture.detectChanges();
    expectState(nativeElement, '****-');
    done();
  }));

  it('prevents stars from wrapping', testAsync(({fixture, done}) => {
    fixture.detectChanges();
    expect(fixture.nativeElement.firstElementChild).toHaveCssStyle({'white-space': 'nowrap', 'background-color': 'red'});
    done();
  }, `<ngl-rating [(rate)]="value" style="background: red;"></ngl-rating>`));

  it('should change rate based on click', testAsync(({fixture, done}) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    const stars = getStars(nativeElement);
    spyOn(componentInstance, 'change');
    expect(componentInstance.change).not.toHaveBeenCalled();

    stars[1].click();
    expect(componentInstance.change).not.toHaveBeenCalled();

    stars[3].click();
    expect(componentInstance.change).toHaveBeenCalledWith(4);
    done();
  }));

  it('should notify when hovering over a specific rate', testAsync(({fixture, done}) => {
    const { nativeElement, componentInstance } = fixture;
    fixture.detectChanges();

    const stars = getStars(nativeElement);
    spyOn(componentInstance, 'change');
    expect(componentInstance.change).not.toHaveBeenCalled();

    stars[3].dispatchEvent(new Event('mouseenter'));
    expect(componentInstance.change).toHaveBeenCalledWith(4);

    stars[0].dispatchEvent(new Event('mouseenter'));
    expect(componentInstance.change).toHaveBeenCalledWith(1);
    done();
  }, `<ngl-rating [rate]="value" (hover)="change($event)"></ngl-rating>`));

  describe(`max`, () => {
    it('defines the available stars', testAsync(({fixture, done}) => {
      fixture.detectChanges();
      expectState(fixture.nativeElement, '*****-----');
      done();
    }, '<ngl-rating rate="5" max="10"></ngl-rating>'));
  });

  it('should not change when is readonly', testAsync(({fixture, done}) => {
    const { nativeElement, componentInstance } = fixture;
    componentInstance.readonly = true;
    fixture.detectChanges();

    const stars = getStars(nativeElement);
    spyOn(componentInstance, 'change');
    expect(componentInstance.change).not.toHaveBeenCalled();

    stars[3].click();
    expect(componentInstance.change).not.toHaveBeenCalled();
    done();
  }));

  it('should not change when is readonly', testAsync(({fixture, done}) => {
    const { nativeElement, componentInstance } = fixture;
    componentInstance.readonly = true;
    fixture.detectChanges();

    const stars = getStars(nativeElement);
    spyOn(componentInstance, 'change');
    expect(componentInstance.change).not.toHaveBeenCalled();

    stars[3].click();
    expect(componentInstance.change).not.toHaveBeenCalled();
    done();
  }));

  describe('keyboard interaction', () => {
    it('will change value apropriately', testAsync(({fixture, done}) => {
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
      done();
    }));

    it('will keep value in limits', testAsync(({fixture, done}) => {
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
      done();
    }));
  });

  it('should change icons size based on input', testAsync(({fixture, done}) => {
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
    done();
  }, `<ngl-rating [(rate)]="value" [size]="size"></ngl-rating>`));

});

// Shortcut function to use instead of `injectAsync` for less boilerplate on each `it`
function testAsync(fn: Function, html: string = null) {
  return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return new Promise((done: Function) => {
      tcb.overrideTemplate(TestComponent, html).createAsync(TestComponent).then((fixture) => fn({ fixture, done}));
    });
  });
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
