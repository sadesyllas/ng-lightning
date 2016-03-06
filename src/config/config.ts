import {provide, OpaqueToken, Provider} from 'angular2/core';

export interface IConfig {
    svgPath?: string;
};

const DEFAULT_CONFIG: IConfig = {
  svgPath: 'assets/icons/utility-sprite/svg',
};

export const NGL_CONFIG = new OpaqueToken('ngl.config');

export function provideNglConfig(config: IConfig = {}): Provider[] {
  const useValue = Object.assign({}, DEFAULT_CONFIG, config || {});
  return [ provide(NGL_CONFIG, {useValue}) ];
}
