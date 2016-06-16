import {Component, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import {NglButtonIcon} from '../buttons/button-icon';
import {NglIcon} from '../icons/icon';

@Component({
  selector: 'ngl-pill',
  templateUrl: './pill.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [NglButtonIcon, NglIcon],
  host: {
    '[class.slds-pill]': 'true',
  },
})
export class NglPill {
  removable: boolean;
  unlinked: boolean = true;

  @Output() nglPillRemove = new EventEmitter();

  constructor(public detector: ChangeDetectorRef) {}

  remove() {
    this.nglPillRemove.emit(null);
  }
}
