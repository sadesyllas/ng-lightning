import { Directive, Input, Output, EventEmitter, ElementRef, Renderer } from 'angular2/core';
import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';

@Directive({
  selector: '[nglButtonGroup]',
})
export class NglButtonGroup {

  selected: string;
  values = new BehaviorSubject(null);

  @Output() selectedChange = new EventEmitter(false);

  @Input('selected') set setSelected(selected: string) {
    this.selected = selected;
    this.ngAfterContentInit();
  }

  constructor(private element: ElementRef, private renderer: Renderer) { }

  ngAfterContentInit() {
    this.values.next(this.selected);
  }

  optionRemoved(value: any) {
    if (this.selected !== value) return;
    setTimeout(() => this.selectedChange.emit(undefined));
  }
}
