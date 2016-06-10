import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ContentChild} from '@angular/core';
import {NglPicklistItemTemplate} from './item';
import {NglDropdownTrigger} from '../dropdown-trigger';
import {NglDropdown} from '../dropdown';
import {NglDropdownItem} from '../dropdown-item';
import {NglPick} from '../../pick/pick';
import {NglPickOption} from '../../pick/pick-option';
import {NglPickAll} from '../../pick/pick-all';
import {NglIcon} from '../../icons/icon';
import {toBoolean} from '../../util/util';

@Component({
  selector: 'ngl-picklist[nglPick]',
  templateUrl: './picklist.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [NglDropdown, NglDropdownTrigger, NglDropdownItem, NglPickOption, NglPickAll, NglIcon],
})
export class NglPicklist {

  @Input() data: any[];

  @Input() set fluid(fluid: boolean | string) {
    this._fluid = toBoolean(fluid);
  }
  get fluid() {
    return this._fluid;
  }

  @Input() set disabled(disabled: boolean | string) {
    this._disabled = toBoolean(disabled);
  }
  get disabled() {
    return this._disabled;
  }

  @Input() dropdownListClass: any;

  @Input() open: boolean;
  @Output() openChange = new EventEmitter();

  @Input() set nglPickAll(value: string | {label: string, icon: string}) {
    if (!value) {
      return;
    }
    if (typeof(value) === 'string') {
      this._nglPickAll.label = <string>value;
    } else {
      this._nglPickAll = Object.assign(this._nglPickAll, value);
    }
  }
  get nglPickAll() {
    return this._nglPickAll;
  }

  @Input() set nglPickNone(value: string | {label: string, icon: string}) {
    if (!value) {
      return;
    }
    if (typeof(value) === 'string') {
      this._nglPickNone.label = <string>value;
    } else {
      this._nglPickNone = Object.assign(this._nglPickNone, value);
    }
  }
  get nglPickNone() {
    return this._nglPickNone;
  }

  @ContentChild(NglPicklistItemTemplate) itemTemplate: NglPicklistItemTemplate;

  private _changeSubscription: any;
  private _disabled = false;
  private _fluid = false;
  private _nglPickAll = {
    label: 'Select All',
    icon: 'check',
  };
  private _nglPickNone = {
    label: 'Select None',
    icon: 'close',
  };

  constructor(private pick: NglPick) {}

  ngAfterContentInit() {
    this._changeSubscription = this.pick.nglPickChange.filter(() => !this.pick.isMultiple)
                                .subscribe(() => this.openChange.emit(false));
  }

  ngOnDestroy() {
    if (this._changeSubscription) {
      this._changeSubscription.unsubscribe();
      this._changeSubscription = null;
    }
  }
}
