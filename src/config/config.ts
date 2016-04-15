import {provide, Provider} from 'angular2/core';

export class NglConfig {
  svgPath = 'assets/icons';
}

const defaultConfig = new NglConfig();

export function provideNglConfig(config: NglConfig = <NglConfig>{}): Provider[] {
  const useValue = Object.assign({}, defaultConfig, config || {});
  return [ provide(NglConfig, {useValue}) ];
}
