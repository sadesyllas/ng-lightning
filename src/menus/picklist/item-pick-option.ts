import {Directive} from '@angular/core';
import {NglDropdownItem} from '../dropdown-item';
import {NglPickOption} from '../../pick/pick-option';

@Directive({selector: '[nglDropdownItem][nglPickOption]'})
export class NglPicklistItemPickOption {
  constructor(public item: NglDropdownItem, public pick: NglPickOption) {}
}
