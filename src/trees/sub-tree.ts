import {
  Component, Directive, Input, ContentChild, ContentChildren, QueryList,
  HostListener, EventEmitter, ElementRef, AfterContentInit, OnDestroy,
  forwardRef, Renderer, DoCheck,
} from 'angular2/core';
import {NglTreeRegistrationService} from './tree-registration.service';
import {NglTreeHeading} from './tree-heading';
import {NglTreeBranch} from './tree-branch';
import {toBoolean, uniqueId} from '../util/util';

/* START -- NglSubTree */

@Component({
  selector: '[nglSubTree]',
  templateUrl: './sub-tree.jade',
  directives: [forwardRef(() => NglSubTreeTrigger)],
  host: {
    'role': 'treeitem',
    'tabindex': '-1',
    '[attr.aria-level]': 'level',
    '[attr.aria-expanded]': 'isExpanded',
    '[id]': '"ngl-sub-tree-" + uniqueId',
  },
})
export class NglSubTree implements AfterContentInit, OnDestroy {
  @Input('expanded') set setIsExpanded(isExpanded: any) {
    this.isExpanded = toBoolean(isExpanded);
  }
  @Input('disabled') set isDisabled(isDisabled: any) {
    this._isDisabled = toBoolean(isDisabled);
  }
  get isDisabled() {
    return this._isDisabled;
  }

  @ContentChild(NglTreeHeading) myHeading: NglTreeHeading;
  @ContentChildren(NglTreeBranch) myBranches = new QueryList<NglTreeBranch>();
  @ContentChildren(NglSubTree) mySubTrees = new QueryList<NglSubTree>();

  focusEvent = new EventEmitter(false);
  actionEvent = new EventEmitter<'collapse' | 'expand'>(false);
  /* tslint:disable */
  uniqueId = uniqueId();
  /* tslint:enable */

  private isExpanded = false;
  private _isDisabled = false;
  private level = 0;
  private _isTriggerFocused = false;

  constructor(private elementRef: ElementRef, private registrationService: NglTreeRegistrationService) {
    this.registrationService.register(this);
  }

  ngAfterContentInit() {
    if (this.myHeading) {
      setTimeout(() => this.myHeading.id = `ngl-sub-tree-heading-${this.uniqueId}`);
    }
  }

  ngOnDestroy() {
    this.registrationService.unregister(this);
  }

  @HostListener('click', ['$event', '"click"'])
  @HostListener('focus', ['$event', '"focus"'])
  @HostListener('blur', ['$event', '"blur"'])
  handleFocus($event: Event, eventName: 'click' | 'focus' | 'blur') {
    if (eventName === 'click') {
      $event.preventDefault();
      $event.stopPropagation();
    }
    if (eventName !== 'blur') {
      this.focus();
    }
  }

  @HostListener('keydown.arrowleft', ['$event', '"collapse"'])
  @HostListener('keydown.arrowright', ['$event', '"expand"'])
  onKeydown($event: Event, action: 'collapse' | 'expand') {
    $event.preventDefault();
    if (action === 'expand' || this.isExpanded) {
      $event.stopPropagation();
      this.actionEvent.emit(action);
    }
  }

  setLevel(level: number) {
    this.level = level;
    this.myBranches.forEach(myBranch => myBranch.setLevel(this.level + 1));
    this.mySubTrees.filter(mySubTree => mySubTree !== this).forEach(mySubTree => mySubTree.setLevel(this.level + 1));
  }

  toggleExpanded(isExpanded = !this.isExpanded) {
    this.isExpanded = isExpanded;
  }

  focus() {
    if (this.isDisabled) {
      return false;
    }
    this.focusEvent.emit(null);
    return true;
  }

  isFocused() {
    return this._isTriggerFocused;
  }

  setTriggerFocus(isTriggerFocused: boolean) {
    this._isTriggerFocused = isTriggerFocused;
  }
}

/* END -- NglSubTree */

/* START -- NglSubTreeTrigger */

@Directive({
  selector: '[nglSubTreeTrigger]',
  host: {
    'tabindex': '0',
    '[attr.aria-controls]': '"ngl-sub-tree-trigger-" + subTree.uniqueId',
  },
})
export class NglSubTreeTrigger implements OnDestroy, DoCheck {
  private isFocused = false;
  private focusSubscription: any;
  private actionSubscription: any;

  @HostListener('focus', ['true'])
  @HostListener('blur', ['false'])
  handleFocus(isFocused: boolean) {
    this.isFocused = isFocused;
    this.subTree.setTriggerFocus(this.isFocused);
  }

  @HostListener('click', ['$event'])
  toggle($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.subTree.toggleExpanded();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer, private subTree: NglSubTree) {
    this.focusSubscription = this.subTree.focusEvent.subscribe(() => this.focus());
    this.actionSubscription = this.subTree.actionEvent.subscribe(this.onActionEvent.bind(this));
  }

  ngDoCheck() {
    if (this.subTree.isDisabled) {
      this.renderer.setElementAttribute(this.elementRef.nativeElement, 'disabled', 'disabled');
    } else {
      this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'removeAttribute', ['disabled']);
    }
  }

  ngOnDestroy() {
    this.focusSubscription.unsubscribe();
    this.actionSubscription.unsubscribe();
  }

  onActionEvent(action: 'collapse' | 'expand') {
    switch (action) {
      case 'collapse':
        this.isFocused ? this.subTree.toggleExpanded(false) : this.focus();
        break;
      case 'expand':
        if (this.isFocused) {
          this.subTree.toggleExpanded(true);
        }
        break;
    }
  }

  private focus() {
    this.elementRef.nativeElement.focus();
  }
}

/* END -- NglSubTreeTrigger */
