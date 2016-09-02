export class NglConfig {
  svgPath = 'assets/icons';
}

const defaultConfig = new NglConfig();

export function provideNglConfig(config: NglConfig = <NglConfig>{}) {
  const useValue = Object.assign({}, defaultConfig, config || {});
  return [ {provide: NglConfig, useValue} ];
}
