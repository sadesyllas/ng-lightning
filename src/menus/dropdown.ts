import {Directive, Input, Output, EventEmitter, HostBinding, HostListener, ElementRef, OnInit, OnDestroy, ContentChildren, QueryList, Renderer, Optional} from 'angular2/core';
import {NglDropdownItem} from './dropdown-item';
import {NglPick} from '../pick/pick';
import {toBoolean} from '../util/util';

const openEventEmitter = new EventEmitter<any>(false);

@Directive({
  selector: '[nglDropdown]',
  host: {
    '[class.slds-dropdown-trigger]': 'true',
    '[class.slds-dropdown-trigger--click]': 'true',
    '[class.slds-picklist]': 'isPicklist',
  },
})
export class NglDropdown implements OnInit, OnDestroy {
  @Input('open') set isOpen(isOpen: boolean | string) {
    isOpen = toBoolean(isOpen);
    if (isOpen) {
      this._subscribeToGlobalClickEvents();
      this.handleGlobalClickEvents = false;
      setTimeout(() => this.handleGlobalClickEvents = true);
    } else {
      this._unsubscribeFromGlobalClickEvents();
    }
    this._isOpen = <boolean>isOpen;
  }
  get isOpen() {
    return this._isOpen;
  }
  @Input() handlePageEvents = true;
  @ContentChildren(NglDropdownItem) items = new QueryList<NglDropdownItem>();
  @Output('openChange') isOpenChange = new EventEmitter<boolean>(false);
  @HostBinding('class.slds-is-open')
  @HostBinding('attr.aria-expanded')
  get __isOpen() {
    return this.isOpen;
  }
  triggerFocusEventEmitter = new EventEmitter(false);
  isPicklist = false;

  private handleGlobalClickEvents = true;
  private _isOpen = false;
  private openEventSubscription: any;
  private clickEventUnsubscriber: Function = null;

  @HostListener('keydown.esc', ['"esc"'])
  @HostListener('keydown.tab', ['"tab"'])
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

  constructor(private elementRef: ElementRef, private renderer: Renderer, @Optional() private pick: NglPick) {
    this.isPicklist = this.pick && this.pick.element === this.elementRef;
  }

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
        $event.target === this.elementRef.nativeElement || this.elementRef.nativeElement.contains($event.target)) {
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
    items[activeElementIndex].focus();
  }

  private handleDropdownOpenEvent(dropdown: NglDropdown) {
    if (dropdown !== this) {
      this.toggle(false);
    }
  }

}
