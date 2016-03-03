import {OpaqueToken} from 'angular2/core';

export interface IConfig {
    svgPath?: string;
};

const DEFAULT_CONFIG: IConfig = {
  svgPath: '/assets/icons/utility-sprite/svg',
};

export function getConfig(_config: IConfig = {}): IConfig {
  return Object.assign({}, DEFAULT_CONFIG, _config || {});
};

export const NGL_CONFIG = new OpaqueToken('ngl.config');
