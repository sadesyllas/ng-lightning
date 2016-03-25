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

  it('uniqueId', () => {
    const [ id, count] = util.uniqueId('pr1').split('_');
    expect(id).toBe('pr1');
    expect(count).toBeGreaterThan(0);

    expect(util.uniqueId('pr1')).toBe(`pr1_${+count + 1}`);
    expect(util.uniqueId('pr2')).toBe(`pr2_${+count + 2}`);
    expect(util.uniqueId()).toBe(`uid_${+count + 3}`);
  });

});
