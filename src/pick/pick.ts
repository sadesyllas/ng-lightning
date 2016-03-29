import { Directive, Input, Output, EventEmitter, ElementRef, Renderer } from 'angular2/core';
import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';
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

  @Output() private nglPickChange = new EventEmitter(false);

  @Input('nglPickMultiple') set setIsMultiple(isMultiple: any) {
    this.isMultiple = toBoolean(isMultiple);
  }

  constructor(private element: ElementRef, private renderer: Renderer) { }

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
    if (this.selected !== value) return;
    setTimeout(() => this.nglPickChange.emit(undefined));
  }
}
