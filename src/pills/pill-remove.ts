import {Directive, Input} from 'angular2/core';
import {toBoolean} from '../util/util';
import {NglPill} from './pill';

@Directive({
  selector: '[nglPillRemove]',
})
export class NglPillRemove {

  @Input() set nglPillRemovable(removable: any) {
    this.pill.removable = toBoolean(removable);
  }

  constructor(private pill: NglPill) {}

  ngOnInit() {
    if (this.pill.removable === undefined) {
      this.pill.removable = true;
    }
  }
}
