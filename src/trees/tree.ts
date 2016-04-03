import {Directive, ContentChildren, QueryList, HostListener, Optional} from 'angular2/core';
import {NglTreeBranch} from './tree-branch';

@Directive({
  selector: '[nglTree]',
  host: {
    '[class.slds-is.expanded]': '!isRoot && branch.isExpanded',
    '[class.slds-is-collapsed]': '!isRoot && !branch.isExpanded',
  },
})
export class NglTree {
  @ContentChildren(NglTreeBranch, {descendants: true}) children = new QueryList<NglTreeBranch>();

  private isRoot = false;

  @HostListener('keydown.arrowup', ['$event', '"up"'])
  @HostListener('keydown.arrowdown', ['$event', '"down"'])
  handleFocusedState($event: Event, focusDirection: 'up' | 'down') {
    if (!this.isRoot) {
      return;
    }
    // this is the tree's root
    $event.preventDefault();
    const isFocusUp = focusDirection === 'up';
    const children = this.children.toArray();
    const focusedChildIndex = children.findIndex(child => child.hasFocus());
    if (focusedChildIndex === -1) {
      return;
    }
    const nextFocusedChildIndex = Math.min(focusedChildIndex + (isFocusUp ? -1 : 1), (children.length || 1) - 1);
    children[nextFocusedChildIndex].focus();
  }

  constructor(@Optional() private branch?: NglTreeBranch) {
    if (!this.branch) {
      this.isRoot = true;
    }
  }

  ngAfterContentInit() {
    this.children.toArray().forEach(c => console.log(c));
  }
}
