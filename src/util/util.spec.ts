import {it, describe, expect} from 'angular2/testing';
import * as util from './util';

describe('utility', () => {

  it('`isInt`', () => {
    expect(util.isInt(10)).toBe(true);
    expect(util.isInt('10')).toBe(true);
    expect(util.isInt('0')).toBe(true);

    expect(util.isInt(10.5)).toBe(false);
    expect(util.isInt('10.5')).toBe(false);
    expect(util.isInt(null)).toBe(false);
    expect(util.isInt(undefined)).toBe(false);
  });

});
