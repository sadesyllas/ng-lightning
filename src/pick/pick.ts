import { Directive, Input, Output, EventEmitter, ElementRef, Renderer } from 'angular2/core';
import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';

@Directive({
  selector: '[nglPick]',
})
export class NglPick {

  selected: string;
  values = new BehaviorSubject(null);

  @Output() nglPickChange = new EventEmitter(false);

  @Input('nglPick') set setSelected(selected: string) {
    this.selected = selected;
    this.ngAfterContentInit();
  }

  constructor(private element: ElementRef, private renderer: Renderer) { }

  ngAfterContentInit() {
    this.values.next(this.selected);
  }

  optionRemoved(value: any) {
    if (this.selected !== value) return;
    setTimeout(() => this.nglPickChange.emit(undefined));
  }
}
