import {Component, ContentChild, ContentChildren, QueryList, AfterContentInit, OnDestroy, HostListener} from 'angular2/core';
import {NglTreeRegistrationService} from './tree-registration.service';
import {NglTreeHeading} from './tree-heading';
import {NglTreeBranch} from './tree-branch';
import {NglSubTree} from './sub-tree';
import {uniqueId} from '../util/util';

@Component({
  selector: 'ngl-tree',
  templateUrl: './tree.jade',
  host: {
    'tabindex': '-1',
  },
  providers: [NglTreeRegistrationService],
})
export class NglTree implements AfterContentInit, OnDestroy {
  @ContentChild(NglTreeHeading) myHeading: NglTreeHeading;
  @ContentChildren(NglTreeBranch) myBranches = new QueryList<NglTreeBranch>();
  @ContentChildren(NglSubTree) mySubTrees = new QueryList<NglSubTree>();

  private children: any[] = [];
  private level = 1;
  /* tslint:disable */
  private uniqueId = uniqueId();
  /* tslint:enable */
  private registrationServiceSubscriptions: any[] = [];

  @HostListener('keydown.arrowup', ['$event', '"previous"'])
  @HostListener('keydown.arrowdown', ['$event', '"next"'])
  handleFocusShift($event: Event, direction: 'previous' | 'next') {
    $event.preventDefault();
    let currentFocusIndex = this.children.findIndex(child => child.isFocused());
    if (currentFocusIndex === -1) {
      return;
    }
    const isDirectionNext = direction === 'next';
    let done = false;
    do {
      const nextFocusedIndex = Math.min(
        Math.max(currentFocusIndex + (isDirectionNext ? 1 : -1), 0),
        (this.children.length || 1) - 1
      );
      done = this.children[nextFocusedIndex].focus();
      if (!done) {
        currentFocusIndex += (isDirectionNext ? 1 : -1);
        if (currentFocusIndex === -1 || currentFocusIndex === this.children.length) {
          break;
        }
      }
    } while (!done);
  }

  constructor(private registrationService: NglTreeRegistrationService) {
    this.registrationServiceSubscriptions.push(
        this.registrationService.registerEvent.subscribe((child: any) => this.registerChild(child)),
        this.registrationService.unregisterEvent.subscribe((child: any) => this.unregisterChild(child))
    );
  }

  ngAfterContentInit() {
    setTimeout(() => {
      if (this.myHeading) {
        setTimeout(() => this.myHeading.id = `ngl-tree-heading-${this.uniqueId}`);
      }
      this.myBranches.forEach(myBranch => myBranch.setLevel(this.level));
      this.mySubTrees.forEach(mySubTree => mySubTree.setLevel(this.level));
    });
  }

  ngOnDestroy() {
    this.registrationServiceSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private registerChild(child: any) {
    const existingChild = this.children.filter(_child => _child === child);
    if (!existingChild.length) {
      this.children.push(child);
    }
  }

  private unregisterChild(child: any) {
    this.children = this.children.filter(_child => _child !== child);
  }
}
