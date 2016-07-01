import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

function toHaveCssClass() {
  return {compare: buildError(false), negativeCompare: buildError(true)};

  function buildError(isNot: boolean) {
    return function(actual: HTMLElement, className: string) {
      return {
        pass: getDOM().hasClass(actual, className) === !isNot,
        get message() {
          return `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to contain the CSS class "${className}"`;
        },
      };
    };
  }
}

function toHaveText() {
  return {compare: buildError(false), negativeCompare: buildError(true)};

  function buildError(isNot: boolean) {
    return function(actual: HTMLElement, expectedText: string) {
      const actualText = actual.textContent;
      return {
        pass: (actualText === expectedText) === !isNot,
        get message() {
          return `Expected "${actualText}" ${isNot ? 'not ' : ''}to be equal to "${expectedText}"`;
        },
      };
    };
  }
}

function toHaveCssStyle() {
  return {compare: buildError(false), negativeCompare: buildError(true)};

  function buildError(isNot: boolean) {
    return function(actual: HTMLElement, style: any) {
      const styleName = <string>Object.keys(style)[0];
      const styleValue = <string>style[styleName];
      return {
        pass: getDOM().hasStyle(actual, styleName, styleValue) === !isNot,
        get message() {
          return `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to have CSS property "${styleName}" as "${styleValue}"`;
        },
      };
    };
  }
}

beforeEach(() => {
  jasmine.addMatchers({
    toHaveCssClass,
    toHaveText,
    toHaveCssStyle,
  });
});
