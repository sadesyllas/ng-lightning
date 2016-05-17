import {Directive, Input, Output, EventEmitter, HostBinding, HostListener, ElementRef, OnInit, OnDestroy, AfterContentInit, ContentChildren, ContentChild, QueryList, Renderer, Optional} from '@angular/core';
import {NglDropdownItem} from './dropdown-item';
import {NglDropdownFilter} from './dropdown-filter';
import {NglPick} from '../pick/pick';
import {toBoolean, escapeRegExp} from '../util/util';

const openEventEmitter = new EventEmitter<any>();

@Directive({
  selector: '[nglDropdown]',
  host: {
    '[class.slds-dropdown-trigger]': 'true',
    '[class.slds-dropdown-trigger--click]': 'true',
    '[class.slds-picklist]': 'isPicklist',
  },
})
export class NglDropdown implements OnInit, OnDestroy, AfterContentInit {
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
  @ContentChild(NglDropdownFilter) filter: NglDropdownFilter;
  @ContentChildren(NglDropdownItem, {descendants: true}) items: QueryList<NglDropdownItem>;
  @Output('openChange') isOpenChange = new EventEmitter<boolean>();
  @HostBinding('class.slds-is-open')
  @HostBinding('attr.aria-expanded')
  get __isOpen() {
    return this.isOpen;
  }
  triggerFocusEventEmitter = new EventEmitter();
  isPicklist = false;

  private handleGlobalClickEvents = true;
  private _isOpen = false;
  private openEventSubscription: any;
  private clickEventUnsubscriber: Function = null;
  private filterSubscription: any = null;

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

  constructor(public element: ElementRef, public renderer: Renderer, @Optional() private pick: NglPick) {
    this.isPicklist = this.pick && this.pick.element.nativeElement === this.element.nativeElement;
  }

  ngOnInit() {
    this.openEventSubscription = openEventEmitter.subscribe(this.handleDropdownOpenEvent.bind(this));
  }

  ngOnDestroy() {
    this.openEventSubscription.unsubscribe();
    this._unsubscribeFromGlobalClickEvents();
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  ngAfterContentInit() {
    if (this.filter && !this.filterSubscription) {
      this.filterSubscription = this.filter.value.subscribe((value: string) => this.filterItems(value));
    }
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

  focusFilter() {
    if (this.filter) {
      this.filter.focus();
    }
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
      this.focusFilter();
      return;
    }
    const items = this.items.toArray();
    const activeElementIndex = items.findIndex(item => item.hasFocus()) + (direction === 'next' ? 1 : -1);
    if (activeElementIndex === items.length || activeElementIndex < 0) {
      if (activeElementIndex < 0) {
        this.focusFilter();
      }
      return;
    }
    this.renderer.invokeElementMethod(items[activeElementIndex], 'focus', []);
  }

  private handleDropdownOpenEvent(dropdown: NglDropdown) {
    if (dropdown !== this) {
      this.toggle(false);
    }
  }

  private filterItems(value: string) {
    if (!this.items.length) {
      return;
    }
    this.items.toArray().forEach((item: NglDropdownItem) => {
      item.isHidden = item.text.toLowerCase().search(escapeRegExp(value.toLowerCase())) === -1;
    });
  }

}
