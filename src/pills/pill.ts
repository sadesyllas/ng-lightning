import {Component, Output, EventEmitter} from '@angular/core';
import {NglButtonIcon} from '../buttons/button-icon';
import {NglIcon} from '../icons/icon';

@Component({
  selector: '[nglPill]',
  templateUrl: './pill.jade',
  directives: [NglButtonIcon, NglIcon],
  host: {
    '[class.slds-pill]': 'true',
  },
})
export class NglPill {
  removable: boolean;

  @Output() nglPillRemove = new EventEmitter(false);

  remove() {
    this.nglPillRemove.emit(null);
  }
}
