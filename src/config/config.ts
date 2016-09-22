import {Injectable, EventEmitter, ChangeDetectorRef} from '@angular/core';

@Injectable()
export class NglConfig {

  svgPath = 'assets/icons';

  private _emitter = new EventEmitter();

  refresh() {
    this._emitter.emit();
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
