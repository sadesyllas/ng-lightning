import {Component, ElementRef, HostListener, OnDestroy} from 'angular2/core';
import {NglTreeRegistrationService} from './tree-registration.service';

@Component({
  selector: '[nglTreeBranch]',
  templateUrl: './tree-branch.jade',
  host: {
    'role': 'treeitem',
    'tabindex': '0',
    '[attr.aria-level]': 'level',
  },
})
export class NglTreeBranch implements OnDestroy {
  private level = 0;
  private _isFocused = false;

  @HostListener('click', ['$event'])
  onClick($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.focus();
  }

  @HostListener('focus', ['true'])
  @HostListener('blur', ['false'])
  handleFocus(isFocused: boolean) {
    this._isFocused = isFocused;
  }

  constructor(private elementRef: ElementRef, private registrationService: NglTreeRegistrationService) {
    this.registrationService.register(this);
  }

  ngOnDestroy() {
    this.registrationService.unregister(this);
  }

  setLevel(level: number) {
    this.level = level;
  }

  focus() {
    this.elementRef.nativeElement.focus();
    return true;
  }

  isFocused() {
    return this._isFocused;
  }
}
