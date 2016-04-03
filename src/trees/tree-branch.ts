import {Directive, Input, ElementRef, Renderer, HostListener, EventEmitter} from 'angular2/core';
import {toBoolean} from '../util/util';

@Directive({
  selector: '[nglTreeBranch]',
  host: {
    'tabindex': '0',
    '[attr.aria-expanded]': 'isExpanded.toString()',
  },
})
export class NglTreeBranch {
  @Input('nglTreeBranch') set isExpanded(isExpanded: any) {
    isExpanded = toBoolean(isExpanded, false);
    this._isExpanded = isExpanded;
  };
  get isExpanded() {
    return this._isExpanded;
  }
  focusEventEmitter = new EventEmitter(false);

  private isFocused = false;
  private _isExpanded = false;
  private hasTrigger = false;
  private isTriggerFocused = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {}

  @HostListener('focus', ['true'])
  @HostListener('blur', ['false'])
  handleFocusedState(isFocused: boolean) {
    if (this.hasTrigger) {
      this.focusEventEmitter.emit(null);
      return;
    }
    this.isFocused = isFocused;
  }
  @HostListener('keydown.arrowright', ['$event', 'true'])
  @HostListener('keydown.arrowleft', ['$event', 'false'])
  toggleOnKeyboardEvent($event: Event, toggle?: boolean) {
    $event.preventDefault();
    if (!this.hasTrigger) {
      return;
    }
    if (!this.isTriggerFocused) {
      this.focusEventEmitter.emit(null);
      return;
    }
    this.toggle(toggle);
  }

  modifyAsTriggerHandled() {
    this.hasTrigger = true;
    // remove ability to focus since we are interested only on the item's trigger
    this.renderer.setElementAttribute(this.elementRef.nativeElement, 'tabindex', '-1');
  }

  setTriggerFocus(isFocused = true) {
    this.isTriggerFocused = isFocused;
    this.isFocused = isFocused;
  }

  toggle(toggle: boolean = !this.isExpanded) {
    this.isExpanded = toggle;
  }

  hasFocus() {
    if (this.hasTrigger) {
      return this.isTriggerFocused;
    }
    return this.isFocused;
  }

  focus() {
    if (this.hasTrigger) {
      this.focusEventEmitter.emit(null);
      return;
    }
    this.elementRef.nativeElement.focus();
  }
}
