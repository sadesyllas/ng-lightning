import {Directive, ElementRef, Renderer, HostListener} from '@angular/core';

@Directive({
  selector: '[nglDropdownItem]',
  host: {
    'tabindex': '0',
  },
})
export class NglDropdownItem {
  private isFocused = false;

  @HostListener('focus') onFocus() {
    this.setFocused(true);
  }
  @HostListener('blur') onBlur() {
    this.setFocused(false);
  }

  constructor(private element: ElementRef, private renderer: Renderer) {}

  setFocused(isFocused: boolean) {
    this.isFocused = isFocused;
  }

  hasFocus() {
    return this.isFocused;
  }

  focus() {
    this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
  }
}
