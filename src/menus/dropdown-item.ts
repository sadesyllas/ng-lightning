import {Directive, ElementRef, HostListener} from 'angular2/core';

@Directive({
  selector: '[nglDropdownItem]',
  host: {
    'tabindex': '0',
  },
})
export class NglDropdownItem {
  private isFocused = false;

  @HostListener('focus') onFocus() {
    this.isFocused = true;
  }
  @HostListener('blur') onBlur() {
    this.isFocused = false;
  }

  constructor(private elementRef: ElementRef) {}

  hasFocus() {
    return this.isFocused;
  }

  focus() {
    this.elementRef.nativeElement.focus();
  }
}
