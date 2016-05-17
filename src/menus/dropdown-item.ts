import {Directive, ElementRef, Renderer, HostListener} from '@angular/core';

@Directive({
  selector: '[nglDropdownItem]',
  host: {
    'tabindex': '0',
    '[hidden]': 'isHidden',
  },
})
export class NglDropdownItem {
  isHidden = false;

  get text() {
    return this.element.nativeElement.textContent;
  }

  private isFocused = false;

  @HostListener('focus') onFocus() {
    this.isFocused = true;
  }
  @HostListener('blur') onBlur() {
    this.isFocused = false;
  }

  constructor(private element: ElementRef, private renderer: Renderer) {}

  hasFocus() {
    return this.isFocused;
  }

  focus() {
    this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
  }
}
