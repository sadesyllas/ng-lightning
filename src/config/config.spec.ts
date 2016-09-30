import {NglConfig} from './config';

describe('`NglConfig`', () => {

  it('should have default values', () => {
    const config = new NglConfig();
    expect(config.get('svgPath')).toBe('assets/icons');
  });

  it('should emit when changes happen', () => {
    const config = new NglConfig();

    const cd = { markForCheck: jasmine.createSpy('markForCheck') };
    config._attach(<any>cd);
    expect(cd.markForCheck).not.toHaveBeenCalled();

    config.update({ svgPath: 'new/path' });
    expect(config.get('svgPath')).toBe('new/path');
    expect(cd.markForCheck).toHaveBeenCalled();
  });

});
