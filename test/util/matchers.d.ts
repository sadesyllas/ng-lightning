declare module jasmine {
  interface Matchers {
    toHaveCssClass(expected: string): boolean;
    toHaveCssStyle(expected: Object): boolean;
    toHaveText(expected: string): boolean;
  }
}
