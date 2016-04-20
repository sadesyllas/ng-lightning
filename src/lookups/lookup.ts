import {Component, ChangeDetectionStrategy, Input, Attribute, Output, EventEmitter, ElementRef, Renderer, ChangeDetectorRef, ViewChild} from 'angular2/core';
import {Control} from 'angular2/common';
import {Observable} from 'rxjs/Rx';
import {NglPill} from '../pills/pill';
import {NglPillRemove} from '../pills/pill-remove';
import {uniqueId, isObject} from '../util/util';

@Component({
  selector: 'ngl-lookup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lookup.jade',
  directives: [NglPill, NglPillRemove],
  styles: [
    `.slds-dropdown__item--active > a {
        outline: 0;
        text-decoration: none;
        background-color: #f4f6f9;
    }`,
  ],
})
export class NglLookup {

  @Input() placeholder: string;

  @Input() set value(value: string) {
    if (value !== this.input.value) {
      this.input.updateValue(value);
    }
  }
  @Output() valueChange = new EventEmitter<string>(false);

  @Input() lookup: Function;
  @Input() field: string;

  pick: any;
  @Input('pick') set setPick(pick: any) {
    this.input.updateValue(this.resolveLabel(pick), {emitEvent: false});
    this.pick = pick;
  }
  @Output() pickChange = new EventEmitter(false);

  @ViewChild('lookupInput') inputEl: ElementRef;

  inputId = uniqueId('lookup_input');

  private globalClickUnsubscriber: Function = null;
  private _open = false;
  @Input() set open(_open: boolean) {
    if (this.open === _open) return;
    if (_open) {
      this.globalClickUnsubscriber = this.renderer.listenGlobal('document', 'click', ($event: MouseEvent) => {
        this.globalClickHandler($event);
        this.detector.markForCheck();
      });
    } else {
      this.activeIndex = -1;
      if (this.globalClickUnsubscriber) {
        this.globalClickUnsubscriber();
        this.globalClickUnsubscriber = null;
      }
    }
    this._open = _open;
  }
  get open(): boolean {
    return this._open;
  }
  private input = new Control();
  private suggestions: any[];
  private noResults: boolean = false;
  private activeIndex: number = -1;
  private lastUserInput: string;
  private pendingFocus = false;

  constructor(private element: ElementRef, private renderer: Renderer, private detector: ChangeDetectorRef,
              @Attribute('debounce') private debounce: number) {
    if (this.debounce === null) {
      this.debounce = 200;
    }
  }

  handlePick(item: any) {
    this.pickChange.emit(item);
  }

  ngOnInit() {
    let valueStream = this.input.valueChanges
      .do((value: string) => {
        this.lastUserInput = value;
        this.activeIndex = -1;
        this.valueChange.emit(value);
      });

    if (this.debounce > 0) {
      valueStream = valueStream.debounceTime(this.debounce);
    }

    const suggestions$ = valueStream
      .distinctUntilChanged()
      .switchMap((value: string) => {
        const suggestions = this.lookup(value);
        return suggestions instanceof Observable ? suggestions : Observable.of(suggestions);
      })
      .publish().refCount(); // Single instance

    suggestions$.subscribe((suggestions: any[]) => {
      this.suggestions = suggestions;
      this.noResults = Array.isArray(suggestions) && !suggestions.length;
      this.open = !!suggestions;
      this.detector.markForCheck();
    });
  }

  resolveLabel(item: any) {
    return this.field && isObject(item) ? item[this.field] : item;
  }

  close(evt: KeyboardEvent) {
    evt.preventDefault();
    this.open = false;
  }

  globalClickHandler($event: MouseEvent) {
    const { nativeElement } = this.element;
    if ($event.target === nativeElement || nativeElement.contains($event.target)) {
      return;
    }
    this.open = false;
  }

  optionId(index: number) {
    return index < 0 ? null : `${this.inputId}_active_${index}`;
  }

  pickActive(evt: KeyboardEvent) {
    if (this.activeIndex < 0) return;
    this.handlePick(this.suggestions[this.activeIndex]);
  }

  moveActive(evt: KeyboardEvent, moves: number) {
    evt.preventDefault();
    if (!this.expanded) return;

    this.activeIndex = Math.max(-1, Math.min(this.activeIndex + moves, this.suggestions.length - 1));

    // Update input value based on active option
    const value = this.activeIndex === -1 ? this.lastUserInput : this.resolveLabel(this.suggestions[this.activeIndex]);
    this.input.updateValue(value, {emitEvent: false});
  }

  ngAfterViewChecked() {
    if (this.pendingFocus && !this.pick) {
      this.focus();
    }
    this.pendingFocus = false;
  }

  clear() {
    this.pickChange.emit(null);
    this.pendingFocus = true;
  }

  focus() {
    this.renderer.invokeElementMethod(this.inputEl.nativeElement, 'focus', []);
  }

  // Whether menu is expanded
  get expanded(): boolean {
    return this.open && !this.pick;
  }

  ngOnDestroy() {
    if (this.globalClickUnsubscriber) {
      this.globalClickUnsubscriber();
      this.globalClickUnsubscriber = null;
    }
  }
}
