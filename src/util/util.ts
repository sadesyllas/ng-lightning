import {ElementRef, Renderer} from 'angular2/core';

export function toBoolean(value: any, allowEmpty = true): boolean {
  switch (value) {
    case '':
      return allowEmpty;

    case 'false':
    case '0':
      return false;

    default:
      return !!value;
  }
}

// Check if given value is integer. Cast strings as potential integers as well.
// See: http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
export function isInt(value: any): boolean {
  if (isNaN(value)) {
    return false;
  }
  var x = parseFloat(value);
  return (x | 0) === x;
}

// Similar to `lodash.isobject`
export function isObject(value: any): boolean {
  const type = typeof value;
  return !!value && (type === 'object' || type === 'function');
}

// Generate a unique id (unique within the entire client session).
// Useful for temporary DOM ids.
let idCounter = 0;
export function uniqueId(prefix = 'uid') {
  return `${prefix}_${++idCounter}`;
}

export interface IReplaceClass {
  renderer: Renderer;
  element: ElementRef;
};
export function replaceClass(instance: IReplaceClass, oldClass: string | string[], newClass?: string | string[]) {
  if (oldClass && oldClass !== newClass) {
    setClass(instance, oldClass, false);
  }
  if (newClass) {
    setClass(instance, newClass, true);
  }
}

function setClass(instance: IReplaceClass, klasses: string | string[], isAdd: boolean) {
  if (klasses) {
    (Array.isArray(klasses) ? klasses : [klasses]).forEach(k => {
      instance.renderer.setElementClass(instance.element.nativeElement, k, isAdd);
    });
  }
}
