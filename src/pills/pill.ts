import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {NglButtonIcon} from '../buttons/button-icon';
import {NglIconButton} from '../buttons/icon';
import {toBoolean} from '../util/util';

@Component({
  selector: '[nglPill]',
  templateUrl: './pill.ng.jade',
  directives: [NglButtonIcon, NglIconButton],
  host: {
    '[class.slds-pill]': 'true',
  },
})
export class NglPill {
  @Input('removable') set setRemovable(removable: any) {
    this.removable = toBoolean(removable);
  }

  @Output('remove') private _remove = new EventEmitter(false);

  private removable = true;

  remove() {
    this._remove.emit(null);
  }
}
