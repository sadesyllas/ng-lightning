declare module jasmine {
  interface Matchers {
    toHaveCssClass(expected: string): boolean;
    toHaveText(expected: string): boolean;
  }
}
