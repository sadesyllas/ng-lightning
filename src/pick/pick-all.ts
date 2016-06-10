import { Directive, HostListener, Input } from '@angular/core';
import { NglPick } from './pick';
import { toBoolean } from '../util/util';

@Directive({
  selector: '[nglPickAll]',
  host: {
    'role': 'button',
  },
})
export class NglPickAll {
  @Input() nglPickAll: string;

  constructor(private nglPick: NglPick) {}

  @HostListener('click')
  @HostListener('keydown.Space', ['$event'])
  @HostListener('keydown.Enter', ['$event'])
  pick(evt: Event) {
    if (evt) {
      evt.preventDefault();
    }
    if (!this.nglPick || !this.nglPick.isMultiple) {
      return;
    }
    this.nglPick.pickAll(toBoolean(this.nglPickAll));
  }
}
