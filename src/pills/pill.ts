import {Component, Output, EventEmitter} from 'angular2/core';
import {NglButtonIcon} from '../buttons/button-icon';
import {NglIconButton} from '../buttons/icon';

@Component({
  selector: '[nglPill]',
  templateUrl: './pill.ng.jade',
  directives: [NglButtonIcon, NglIconButton],
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
