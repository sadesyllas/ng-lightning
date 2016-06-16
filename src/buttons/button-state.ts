import {Directive, Input, Output, EventEmitter, HostListener, ElementRef, Renderer} from '@angular/core';
import {toBoolean} from '../util/util';

@Directive({
  selector: '[nglButtonState]',
  host: {
    'aria-live': 'assertive',
  },
})
export class NglButtonState {

  _selected: boolean;
  @Input('nglButtonState') set selected(_selected) {
    this._selected = toBoolean(_selected);

    this.toggleClass('slds-is-selected', this._selected);
    this.toggleClass('slds-not-selected', !this._selected);
  }
  get selected() {
    return this._selected;
  }
  @Output('nglButtonStateChange') selectedChange = new EventEmitter<boolean>();

  constructor(public element: ElementRef, public renderer: Renderer) {}

  @HostListener('click', ['$event.target'])
  onSelectChange() {
    this.selectedChange.emit(!this.selected);
  }

  private toggleClass(className: string, isAdd: boolean) {
    this.renderer.setElementClass(this.element.nativeElement, className, isAdd);
  }
};
