import {Directive, Input, Output, EventEmitter, HostBinding, HostListener, ElementRef, OnInit, OnDestroy, ContentChildren, QueryList, Renderer} from '@angular/core';
import {NglDropdownItem} from './dropdown-item';
import {toBoolean} from '../util/util';

const openEventEmitter = new EventEmitter<any>();

@Directive({
  selector: '[nglDropdown]',
  host: {
    '[class.slds-dropdown-trigger]': 'true',
    '[class.slds-dropdown-trigger--click]': 'true',
  },
})
export class NglDropdown implements OnInit, OnDestroy {
  @Input('open') set isOpen(isOpen: boolean | string) {
    isOpen = toBoolean(isOpen);
    if (isOpen) {
      this._subscribeToGlobalClickEvents();
      this.handleGlobalClickEvents = false;
      setTimeout(() => this.handleGlobalClickEvents = true);
      if (this.handleFocus && this.items && this.items.length) {
        this.items.forEach(item => this.handleFocus(item, false));
      }
    } else {
      this._unsubscribeFromGlobalClickEvents();
    }
    this._isOpen = <boolean>isOpen;
  }
  get isOpen() {
    return this._isOpen;
  }
  @Input() handlePageEvents = true;
  @ContentChildren(NglDropdownItem, {descendants: true}) items: QueryList<NglDropdownItem>;
  @Output('openChange') isOpenChange = new EventEmitter<boolean>();
  @HostBinding('class.slds-is-open')
  @HostBinding('attr.aria-expanded')
  get __isOpen() {
    return this.isOpen;
  }
  triggerFocusEventEmitter = new EventEmitter();

  handleFocus: (item: NglDropdownItem, isFocused: boolean) => void;

  private handleGlobalClickEvents = true;
  private _isOpen = false;
  private openEventSubscription: any;
  private clickEventUnsubscriber: Function = null;

  @HostListener('keydown.esc', ['"esc"'])
  @HostListener('keydown.tab', ['"tab"'])
  @HostListener('keydown.shift.tab', ['"shift.tab"'])
  onKeydownClose(eventName: string) {
    this.toggle(false);
    if (eventName === 'esc') {
      this.triggerFocusEventEmitter.emit(null);
    }
  }
  @HostListener('keydown.arrowdown', ['$event', '"next"'])
  @HostListener('keydown.arrowup', ['$event', '"previous"'])
  onKeydownFocusNext($event: Event, direction: 'next' | 'previous') {
    $event.preventDefault();
    this.focusItem(direction);
  }

  constructor(public element: ElementRef, public renderer: Renderer) {}

  ngOnInit() {
    this.openEventSubscription = openEventEmitter.subscribe(this.handleDropdownOpenEvent.bind(this));
  }

  ngOnDestroy() {
    this.openEventSubscription.unsubscribe();
    this._unsubscribeFromGlobalClickEvents();
  }

  toggle(toggle: boolean = !this.isOpen, focus: boolean = false) {
    if (toggle === this.isOpen) {
      return;
    }
    this.isOpenChange.emit(toggle);
    if (toggle) {
      openEventEmitter.emit(this);
      if (focus) {
        this.focusItem('next');
      }
    }
  }

  handleGlobalClickEvent($event: Event) {
    if (!this.handlePageEvents || !this.handleGlobalClickEvents ||
        $event.target === this.element.nativeElement || this.element.nativeElement.contains($event.target)) {
      return;
    }
    this.toggle(false);
  }

  private _subscribeToGlobalClickEvents() {
    if (this.handlePageEvents && this.clickEventUnsubscriber === null) {
      this.clickEventUnsubscriber = this.renderer.listenGlobal('document', 'click', this.handleGlobalClickEvent.bind(this));
    }
  }

  private _unsubscribeFromGlobalClickEvents() {
    if (this.clickEventUnsubscriber !== null) {
      this.clickEventUnsubscriber();
      this.clickEventUnsubscriber = null;
    }
  }

  private focusItem(direction: 'next' | 'previous') {
    if (!this.items.length) {
      return;
    }
    const items = this.items.toArray();
    const activeElementIndex = items.findIndex(item => item.hasFocus()) + (direction === 'next' ? 1 : -1);
    if (activeElementIndex === items.length || activeElementIndex < 0) {
      return;
    }
    if (this.handleFocus) {
      items.forEach((_, index) => {
        if (index !== activeElementIndex) {
          this.handleFocus(items[index], false);
        }
      });
      this.handleFocus(items[activeElementIndex], true);
      return;
    }
    this.renderer.invokeElementMethod(items[activeElementIndex], 'focus', []);
  }

  private handleDropdownOpenEvent(dropdown: NglDropdown) {
    if (dropdown !== this) {
      this.toggle(false);
    }
  }

}
