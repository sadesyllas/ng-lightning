import { Directive, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import {toBoolean} from '../util/util';

@Directive({
  selector: '[nglPick]',
})
export class NglPick {

  selected: any;
  values = new BehaviorSubject(null);
  isMultiple = false;

  @Input('nglPick') set setSelected(selected: string) {
    this.selected = selected;
    this.ngAfterContentInit();
  }

  @Input() nglPickActiveClass: string;

  @Output() private nglPickChange = new EventEmitter();
  @Output() private nglOptionDestroyed = new EventEmitter();

  @Input('nglPickMultiple') set setIsMultiple(isMultiple: any) {
    this.isMultiple = toBoolean(isMultiple);
  }

  constructor(public element: ElementRef, private renderer: Renderer) {}

  ngAfterContentInit() {
    this.values.next(this.selected);
  }

  selectOption(value: any) {
    let next: any;
    if (this.isMultiple) {
      if (Array.isArray(this.selected)) {
        // Remove if already there or add to selection
        const index = this.selected.indexOf(value);
        next = index > -1
                ? [...this.selected.slice(0, index), ...this.selected.slice(index + 1)]
                : [...this.selected, value];
      } else {
        next = Object.assign({}, this.selected, {[value]: !this.selected[value]});
      }
    } else {
      next = value;
    }

    this.nglPickChange.emit(next);
  }

  optionRemoved(value: any) {
    if (this.isMultiple && !this.selected) return;

    let emit: boolean;

    if (this.isMultiple) {
      emit = Array.isArray(this.selected) ? this.selected.indexOf(value) > -1 : !!this.selected[value];
    } else {
      emit = this.selected === value;
    }

    if (emit) {
      setTimeout(() => this.nglOptionDestroyed.emit(value));
    }
  }
}
