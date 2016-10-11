import {Component, ContentChild, ChangeDetectionStrategy, Input, Output, EventEmitter, ElementRef, Renderer, ChangeDetectorRef, ViewChild, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publish';
import {NglLookupItemTemplate, NglLookupLabelTemplate} from './item';
import {NglLookupScopeItem} from './scope-item';
import {uniqueId, isObject} from '../util/util';

@Component({
  selector: 'ngl-lookup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lookup.jade',
  styles: [
    `.slds-dropdown__item--active > a {
        outline: 0;
        text-decoration: none;
        background-color: #f4f6f9;
    }`,
  ],
})
export class NglLookup {

  @ContentChild(NglLookupItemTemplate) itemTemplate: NglLookupItemTemplate;
  @ContentChild(NglLookupScopeItem) polymorphic: NglLookupScopeItem;

  @Input() placeholder: string;
  @Input() noResultsText = 'No results found';
  @Input() searchIcon: boolean = true;

  openScope: boolean = false;

  @Input() set value(value: string) {
    if (value !== this.inputSubject.getValue()) {
      this.inputValue = value;
      this.inputSubject.next(value);
    }
  }
  @Output() valueChange = new EventEmitter<string>();

  @Input() lookup: Function;
  @Input() field: string;

  pick: any;
  @Input('pick') set setPick(pick: any) {
    this.inputValue = this.resolveLabel(pick);
    this.pick = pick;
  }
  @Output() pickChange = new EventEmitter();

  @Input() label: string;
  @ContentChild(NglLookupLabelTemplate) labelTemplate: NglLookupLabelTemplate;

  @ViewChild('lookupInput') inputEl: ElementRef;

  @Input() debounce: number = 200;

  inputId = uniqueId('lookup_input');

  _label: string | TemplateRef<any>;

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
      this.unsubscribeGlobalClick();
    }
    this._open = _open;
  }
  get open(): boolean {
    return this._open;
  }
  private inputValue = '';
  private inputSubject = new BehaviorSubject(undefined);
  private suggestions: any[];
  private noResults: boolean = false;
  private activeIndex: number = -1;
  private lastUserInput: string;
  private pendingFocus = false;

  constructor(private element: ElementRef, private renderer: Renderer, private detector: ChangeDetectorRef) {}

  handlePick(item: any) {
    this.pickChange.emit(item);
  }

  onInputChange(value: string) {
    this.inputSubject.next(value);
  }

  ngOnInit() {
    let valueStream = this.inputSubject.skip(1)
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

  ngOnChanges() {
    this._label = this.labelTemplate ? this.labelTemplate.templateRef : (this.label || '');
  }

  resolveLabel(item: any) {
    return this.field && isObject(item) ? item[this.field] : item;
  }

  close(evt: KeyboardEvent = null) {
    if (evt) {
      evt.preventDefault();
    }
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
    this.inputValue = value;
  }

  onScopeOpen(open: boolean) {
    if (open) {
      this.close();
    }
    this.openScope = open;
  }

  scopeSelect(scope: any) {
    this.openScope = false;
    this.focus();
    this.polymorphic.scopeChange.emit(scope);
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
    this.unsubscribeGlobalClick();
  }

  private unsubscribeGlobalClick() {
    if (!this.globalClickUnsubscriber) return;
    this.globalClickUnsubscriber();
    this.globalClickUnsubscriber = null;
  }
}
