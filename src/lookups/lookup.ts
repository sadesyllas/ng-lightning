import {Component, ChangeDetectionStrategy, Input, Attribute, Output, EventEmitter, ElementRef, Renderer, ChangeDetectorRef} from 'angular2/core';
import {Control} from 'angular2/common';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {uniqueId, isObject} from '../util/util';

@Component({
  selector: 'ngl-lookup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lookup.jade',
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
  @Output() pick = new EventEmitter(false);

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
    } else if (this.globalClickUnsubscriber) {
      this.globalClickUnsubscriber();
      this.globalClickUnsubscriber = null;
    }
    this._open = _open;
  }
  get open(): boolean {
    return this._open;
  }
  private input = new Control();
  private suggestions$: Observable<any[]>;
  private noResults: boolean = false;

  constructor(private element: ElementRef, private renderer: Renderer, private detector: ChangeDetectorRef,
              @Attribute('debounce') private debounce: number) {
    if (this.debounce === null) {
      this.debounce = 200;
    }
  }

  handlePick(item: any) {
    this.pick.emit(item);
    this.open = false;
    this.input.updateValue(this.resolveLabel(item), {emitEvent: false});
  }

  ngOnInit() {
    let valueStream = this.input.valueChanges
      .do((value: string) => this.valueChange.emit(value));

    if (this.debounce > 0) {
      valueStream = valueStream.debounceTime(this.debounce);
    }

    this.suggestions$ = valueStream
      .distinctUntilChanged()
      .switchMap((value: string) => {
        const suggestions = this.lookup(value);
        return suggestions instanceof Observable ? suggestions : Observable.of(suggestions);
      })
      .publish().refCount();

    this.suggestions$.subscribe((suggestions: any) => {
      this.noResults = Array.isArray(suggestions) && !suggestions.length;
      this.open = !!suggestions;
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

  ngOnDestroy() {
    if (this.globalClickUnsubscriber) {
      this.globalClickUnsubscriber();
      this.globalClickUnsubscriber = null;
    }
  }
}
