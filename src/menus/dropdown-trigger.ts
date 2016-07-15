import {Directive, HostListener, ElementRef, Renderer, OnDestroy} from '@angular/core';
import {NglDropdown} from './dropdown';

@Directive({
  selector: '[nglDropdownTrigger]',
  host: {
    'aria-haspopup': 'true',
  },
})
export class NglDropdownTrigger implements OnDestroy {
  private parentFocusEventSubscription: any;

  constructor(private element: ElementRef, private renderer: Renderer, private dropdown: NglDropdown) {
    this.parentFocusEventSubscription = this.dropdown.triggerFocusEventEmitter.subscribe(this.focus.bind(this));
  }

  ngOnDestroy() {
    this.parentFocusEventSubscription.unsubscribe();
  }

  @HostListener('click') toggleOpen() {
    this.dropdown.toggle();
  }
  @HostListener('keydown.arrowdown', ['$event'])
  onKeyDownOpen($event: Event) {
    $event.preventDefault();
    this.dropdown.toggle(true);
  }

  focus() {
    this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
  }
}
