/**
 * Testing helpers
 */
import {addProviders, ComponentFixture} from '@angular/core/testing';
import {provideNglConfig} from '../../src/config/config';

// Default configuration for every TestComponent
beforeEach(() => {
  addProviders([provideNglConfig()]);
});

export function dispatchKeyEvent(fixture: ComponentFixture<any>, predicate: any, key: string, indexOf: number = -1) {
  const { debugElement } = fixture;
  const _debugElement = indexOf > -1 ? debugElement.queryAll(predicate)[indexOf] : debugElement.query(predicate);
  const event = document.createEvent('KeyboardEvent');
  event.initEvent(key === 'input' ? 'input' : '', true, true);
  if (key === 'input') {
    _debugElement.nativeElement.dispatchEvent(event);
  } else {
    _debugElement.triggerEventHandler(key, event);
  }
}

export function selectElements(element: HTMLElement, selector: string): HTMLElement[] {
  return [].slice.call(element.querySelectorAll(selector));
}

/**
 * IE11 doesn't support dispatching new Event directly -- must utilize document.createEvent method.
 */
export function dispatchEvent(el: HTMLElement, type: string, canBubble = true) {
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent(type, canBubble, true);
  el.dispatchEvent(evt);
}
