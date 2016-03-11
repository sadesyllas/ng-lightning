import {Directive, HostListener, ElementRef, OnDestroy} from 'angular2/core';
import {NglDropdown} from './dropdown';

@Directive({
  selector: '[nglDropdownTrigger]',
})
export class NglDropdownTrigger implements OnDestroy {
  private parentFocusEventSubscription: any;

  constructor(private elementRef: ElementRef, private dropdown: NglDropdown) {
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
    this.elementRef.nativeElement.focus();
  }
}
