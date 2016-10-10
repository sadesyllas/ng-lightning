import {Injectable, EventEmitter, ChangeDetectorRef, OpaqueToken, Inject} from '@angular/core';
import {INglConfig} from './config.interface';

export const NGL_CONFIG = new OpaqueToken('NGL_CONFIG');

@Injectable()
export class NglConfig {

  private values: INglConfig = {
    svgPath: 'assets/icons',
  };

  private _emitter = new EventEmitter();

  constructor(@Inject(NGL_CONFIG) config: INglConfig = null) {
    this.values = Object.assign({}, this.values, config || {});
  }

  update(config: INglConfig) {
    this.values = Object.assign({}, this.values, config || {});
    this._emitter.emit();
  }

  get(key: string) {
    return (<any>this.values)[key];
  }

  _attach(cd: ChangeDetectorRef) {
    return this._emitter.subscribe(() => cd.markForCheck());
  }
}

// Intrenal decorator
export function NglConfigurable(config = {changeDetectorProperty: 'cd'}) {
  return function (constructor: Function) {
    let { ngOnInit, ngOnDestroy } = constructor.prototype;

    constructor.prototype.ngOnInit = function() {
      const changeDetectorRef = this[config.changeDetectorProperty];

      if (!changeDetectorRef || !changeDetectorRef.markForCheck) {
        throw Error(`NglConfig: invalid ChangeDetectorRef at property "${config.changeDetectorProperty}"`);
      }

      this.configSubscription = this.config._attach(changeDetectorRef);

      if (ngOnInit) {
        ngOnInit.call(this);
        ngOnInit = null;
      }
    };

    constructor.prototype.ngOnDestroy = function() {
      this.configSubscription.unsubscribe();
      this.configSubscription = null;

      if (ngOnDestroy) {
        ngOnDestroy.call(this);
        ngOnDestroy = null;
      }
    };
  };
};
