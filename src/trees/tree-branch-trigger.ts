import {Directive, HostListener, OnDestroy, ElementRef} from 'angular2/core';
import {NglTreeBranch} from './tree-branch';

@Directive({
  selector: '[nglTreeBranchTrigger]',
})
export class NglTreeBranchTrigger implements OnDestroy {
  private branchFocusSubscription: any;

  constructor(private elementRef: ElementRef, private branch: NglTreeBranch) {
    this.branch.modifyAsTriggerHandled();
    this.branchFocusSubscription = this.branch.focusEventEmitter.subscribe(() => this.elementRef.nativeElement.focus());
  }

  ngOnDestroy() {
    this.branchFocusSubscription.unsubscribe();
  }

  @HostListener('focus', ['true'])
  @HostListener('blur', ['false'])
  handleFocus(isFocused: boolean) {
    this.branch.setTriggerFocus(isFocused);
  }
  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  toggle($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.branch.toggle();
  }
}
