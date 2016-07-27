import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ContentChild, ViewChild, ElementRef} from '@angular/core';
import {NglPicklistItemTemplate} from './item';
import {NglDropdownTrigger} from '../dropdown-trigger';
import {NglDropdown} from '../dropdown';
import {NglDropdownItem} from '../dropdown-item';
import {NglPick} from '../../pick/pick';
import {NglPickOption} from '../../pick/pick-option';
import {NglIconSvg} from '../../icons/svg';
import {toBoolean} from '../../util/util';

@Component({
  selector: 'ngl-picklist[nglPick]',
  templateUrl: './picklist.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [NglDropdown, NglDropdownTrigger, NglDropdownItem, NglPickOption, NglIconSvg],
  styles: [`
    li.slds-is-active {
      background-color: #F4F6F9;
    }`,
  ],
})
export class NglPicklist {

  data: any[];

  filteredData: any[];

  @Input('data') private set _data(data: any[]) {
    this.data = data;
    this.filterData();
  }

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

  @Input('filter') filterType: string | Function;
  @Input() filterPlaceholder: string = 'custom';

  @Input() set open(value: boolean) {
    this._open = value;
    if (this.open && this.hasFilter) {
      setTimeout(() => this.focusFilter());
    }
  }
  get open() {
    return this._open;
  }
  @Output() openChange = new EventEmitter();

  @ContentChild(NglPicklistItemTemplate) itemTemplate: NglPicklistItemTemplate;

  @ViewChild('filterInput') filterInput: ElementRef;

  get hasFilter() {
    return typeof(this.filterType) !== 'undefined';
  }

  private _open = false;
  private _changeSubscription: any;
  private _disabled = false;
  private _fluid = false;
  private filter = '';
  private filterActiveIndex: number = 0;
  private hasFilterFocus: boolean = false;

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

  filterData() {
    this.filteredData = this._filterData();
    this.setFilterActive(); // Keep active index in bounds
  }

  _filterData() {
    if (!this.data || !this.filterType) {
      return this.data;
    }
    const filter = <any>this.filterType;
    switch (typeof(filter)) {
      case 'string':
        return this.data.filter(d => (filter ? d[filter] : d.toString()).toLowerCase().indexOf(this.filter) !== -1);
      case 'function':
        return this.data.filter(filter);
      default:
        throw new Error(`Invalid NglPicklist filter type (${typeof(this.filterType)}). The filter must be empty, a field name or a filter function.`);
    }
  }

  isOptionActive(index: number) {
    return this.hasFilter && this.filterActiveIndex === index;
  }

  onOptionHover(index: number) {
    if (!this.hasFilterFocus) return;
    this.filterActiveIndex = index;
  }

  filterChange(filter: string) {
    this.filter = filter;
    this.filterData();
  }

  setFilterActive(moves: number = 0, evt?: Event) {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    this.filterActiveIndex = Math.max(Math.min(this.filterActiveIndex + moves, this.filteredData.length - 1), 0);
  }

  onFilterPick() {
    if (!this.filteredData.length || this.filterActiveIndex < 0) return;
    this.pick.selectOption(this.filteredData[this.filterActiveIndex]);
  }

  focusFilter() {
    this.filterInput.nativeElement.focus();
  }

  onFilterFocus() {
    this.filterActiveIndex = 0;
    this.hasFilterFocus = true;
  }

  onFilterBlur() {
    this.filterActiveIndex = -1;
    this.hasFilterFocus = false;
  }
}
