import {provide, Provider} from '@angular/core';

export class NglConfig {
  svgPath = 'assets/icons';
  picklist = {
    filterPlaceholder: '',
  };
}

const defaultConfig = new NglConfig();

function mergeConfigs(configA: any, configB: any) {
  const mergedConfig = Object.assign({}, configA);
  Object.getOwnPropertyNames(configB || {}).forEach(p => {
    if (typeof(configB[p]) !== 'object' || configB[p] instanceof Array) {
      mergedConfig[p] = configB[p];
      return;
    }
    mergedConfig[p] = mergedConfig[p] || {};
    Object.assign(mergedConfig[p], configB[p]);
  });
  return mergedConfig;
}

export function provideNglConfig(config?: any): Provider[] {
  const useValue = mergeConfigs(defaultConfig, config);
  return [ provide(NglConfig, {useValue}) ];
}
