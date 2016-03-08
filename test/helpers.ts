/**
 * Testing helpers
 */

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
