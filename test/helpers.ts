/**
 * Testing helpers
 */

import {beforeEachProviders} from 'angular2/testing';
import {provideNglConfig} from '../src/config/config';

// Default configuration for every TestComponent
beforeEachProviders(() => [provideNglConfig()]);

export function dispatchKeyEvent(target: HTMLElement, key: string) {
  let event: KeyboardEvent;
  if (navigator.userAgent.search('Firefox') > -1) {
    event = new KeyboardEvent('keydown', { key });
  } else {
    event = document.createEvent('KeyboardEvent');
    event.initKeyboardEvent('keydown', true, true, window, key, 0, '', false, '');
  }
  target.dispatchEvent(event);
}

export function selectElements(element: HTMLElement, selector: string): HTMLElement[] {
  return [].slice.call(element.querySelectorAll(selector));
}
