import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ContentChild} from '@angular/core';
import {NglPicklistItemTemplate} from './item';
import {NglDropdownTrigger} from '../dropdown-trigger';
import {NglDropdown} from '../dropdown';
import {NglDropdownItem} from '../dropdown-item';
import {NglPick} from '../../pick/pick';
import {NglPickOption} from '../../pick/pick-option';
import {NglIcon} from '../../icons/icon';
import {toBoolean} from '../../util/util';

@Component({
  selector: 'ngl-picklist[nglPick]',
  templateUrl: './picklist.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [NglDropdown, NglDropdownTrigger, NglDropdownItem, NglPickOption, NglIcon],
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

  @ContentChild(NglPicklistItemTemplate) itemTemplate: NglPicklistItemTemplate;

  private _changeSubscription: any;
  private _disabled = false;
  private _fluid = false;

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
