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
      this.clearGlobalClickTimeout();
      this.globalClickTimeout = setTimeout(() => {
        if (this.handlePageEvents) {
          this._subscribeToClickEvents();
        }
      });
    } else {
      this._unsubscribeFromClickEvents();
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

  private _isOpen = false;
  private openEventSubscription: any;
  private globalClickEventUnsubscriber: Function = null;
  private clickEventUnsubscriber: Function = null;
  private globalClickTimeout: number;

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

  constructor(public element: ElementRef, public renderer: Renderer) {}

  ngOnInit() {
    this.openEventSubscription = openEventEmitter.subscribe(this.handleDropdownOpenEvent.bind(this));
  }

  ngOnDestroy() {
    this.clearGlobalClickTimeout();
    this.openEventSubscription.unsubscribe();
    this._unsubscribeFromClickEvents();
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

  private handleGlobalClickEvent($event: any) {
    if (!this.handlePageEvents || $event.$nglStop) {
      return;
    }
    this.toggle(false);
  }

  private _subscribeToClickEvents() {
    this._unsubscribeFromClickEvents();

    // Prevent document listener to close it, since click happened inside
    this.clickEventUnsubscriber = this.renderer.listen(this.element.nativeElement, 'click', ($event: any) => $event.$nglStop = true);

    this.globalClickEventUnsubscriber = this.renderer.listenGlobal('document', 'click', this.handleGlobalClickEvent.bind(this));
  }

  private _unsubscribeFromClickEvents() {
    if (this.clickEventUnsubscriber) {
      this.clickEventUnsubscriber();
      this.clickEventUnsubscriber = null;
    }

    if (this.globalClickEventUnsubscriber) {
      this.globalClickEventUnsubscriber();
      this.globalClickEventUnsubscriber = null;
    }
  }

  private clearGlobalClickTimeout() {
    clearTimeout(this.globalClickTimeout);
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
    this.renderer.invokeElementMethod(items[activeElementIndex], 'focus', []);
  }

  private handleDropdownOpenEvent(dropdown: NglDropdown) {
    if (dropdown !== this) {
      this.toggle(false);
    }
  }

}
