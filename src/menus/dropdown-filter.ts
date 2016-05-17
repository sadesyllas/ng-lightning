import {Directive, HostListener, ElementRef, Renderer} from '@angular/core';
import {Observable, Observer} from 'rxjs/Rx';

@Directive({
  selector: 'input[nglDropdownFilter]',
})
export class NglDropdownFilter {
  value = Observable.create((observer: Observer<string>) => {
    this.onKeyupDelegate = (value: string) => observer.next(value);
  }).distinctUntilChanged().publish().refCount();

  @HostListener('keyup') onKeyup() {
    this.onKeyupDelegate(this.element.nativeElement.value);
  }

  constructor(private element: ElementRef, private renderer: Renderer) {}

  focus() {
    this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
  }

  /*
   * onKeyupDelegate will be properly initialized when the NglDropdownFilter
   * instance registers with the keydown observable
   */
  private onKeyupDelegate: Function = () => {};
}
