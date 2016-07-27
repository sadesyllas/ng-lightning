import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ContentChild, ViewChild, ViewChildren, ElementRef, QueryList, ChangeDetectorRef} from '@angular/core';
import {NglPicklistItemTemplate} from './item';
import {NglDropdownTrigger} from '../dropdown-trigger';
import {NglDropdown} from '../dropdown';
import {NglDropdownItem} from '../dropdown-item';
import {NglPick} from '../../pick/pick';
import {NglPickOption} from '../../pick/pick-option';
import {NglPicklistItemPickOption} from './item-pick-option';
import {NglIcon} from '../../icons/icon';
import {toBoolean} from '../../util/util';
import {NglConfig} from '../../config/config';

@Component({
  selector: 'ngl-picklist[nglPick]',
  templateUrl: './picklist.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [NglDropdown, NglDropdownTrigger, NglDropdownItem, NglPickOption, NglIcon, NglPicklistItemPickOption],
  styles: [ `
      li.slds-is-active,
      li.slds-is-active a:hover {
        background-color: #f0f8fc;
      }
    `,
  ],
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

  @Input() set open(value: boolean) {
    this._open = value;
    if (value) {
      setTimeout(() => {
        this.clearFocusedItem();
        this.focusFilter();
      });
    }
  }
  get open() {
    return this._open;
  }
  @Output() openChange = new EventEmitter();

  @Input('filter') filterType: string | Function;

  get hasFilter() {
    return typeof(this.filterType) !== 'undefined';
  }

  get filteredData() {
    if (!this.data || !this.filterType) {
      return this.data;
    }
    const filter = <any>this.filterType;
    switch (typeof(filter)) {
      case 'string':
        this.clearFocusedItem((item: any) => (filter ? item[filter] : item.toString()).toLowerCase().indexOf(this._filter) === -1);
        return this.data.filter(d => (filter ? d[filter] : d.toString()).toLowerCase().indexOf(this._filter) !== -1);
      case 'function':
        this.clearFocusedItem((item: any) => !filter(item));
        return this.data.filter(filter);
      default:
        throw new Error(`Invalid NglPicklist filter type (${typeof(this.filterType)}). The filter must be empty, a field name or a filter function.`);
    }
  }

  set filter(value: string) {
    this._filter = value;
  }
  get filter() {
    return this._filter;
  }

  @ContentChild(NglPicklistItemTemplate) itemTemplate: NglPicklistItemTemplate;
  @ViewChild('nglPicklistFilter') filterInput: ElementRef;
  @ViewChild(NglDropdown) dropdown: NglDropdown;
  @ViewChildren(NglPicklistItemPickOption) itemPicks: QueryList<NglPicklistItemPickOption>;

  private _open = false;
  private _changeSubscription: any;
  private _disabled = false;
  private _fluid = false;
  private _filter = '';
  private _filterPlaceholder: string;
  private _focusedItem: NglPicklistItemPickOption;

  constructor(private config: NglConfig, private pick: NglPick, private cdr: ChangeDetectorRef) {
    this._filterPlaceholder = config.picklist.filterPlaceholder;
  }

  ngAfterContentInit() {
    this._changeSubscription = this.pick.nglPickChange.filter(() => !this.pick.isMultiple)
                                .subscribe(() => this.openChange.emit(false));
    this.dropdown.handleFocus = (item: NglDropdownItem, isFocused: boolean) => this.handleFocus(item, isFocused);
  }

  ngOnDestroy() {
    if (this._changeSubscription) {
      this._changeSubscription.unsubscribe();
      this._changeSubscription = null;
    }
  }

  focusFilter() {
    if (this.filterInput) {
      this.filterInput.nativeElement.focus();
    }
  }

  filterPick() {
    if (!this._focusedItem) {
      return;
    }
    this._focusedItem.pick.pick();
  }

  private handleFocus(item: NglDropdownItem, isFocused: boolean) {
    item.setFocused(isFocused);
    if (!this.itemPicks || !this.itemPicks.length || !isFocused) {
      return;
    }
    this.focusFilter();
    this._focusedItem = this.itemPicks.filter(x => x.item === item)[0];
  }

  private clearFocusedItem(predicate?: (item: any) => boolean) {
    if (this._focusedItem && (!predicate || predicate(this._focusedItem.pick.value))) {
      this._focusedItem.item.setFocused(false);
      this._focusedItem = null;
      this.cdr.markForCheck();
    }
  }
}
