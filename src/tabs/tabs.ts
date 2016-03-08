import {Component, Input, QueryList, ContentChildren, Output, EventEmitter} from 'angular2/core';
import {isInt} from '../util/util';
import {NglTab} from './tab';

@Component({
  selector: 'ngl-tabs',
  template: `
    <ul [ngClass]="'slds-tabs--' + type + '__nav'" role="tablist" (keyup.ArrowLeft)="move(-1)" (keyup.ArrowRight)="move(1)">
      <li *ngFor="var tab of tabs"
          [ngClass]="'slds-tabs--' + type + '__item'"
          class="slds-text-heading--label"
          (click)="select(tab)"
          [class.slds-active]="tab.active"
          role="presentation">
        <a [tabindex]="tab.active ? 0 : -1"
           [attr.aria-selected]="tab.active"
           [ngClass]="'slds-tabs--' + type + '__link'"
           role="tab">{{tab.heading}}</a>
      </li>
    </ul>
    <div [ngClass]="'slds-tabs--' + type + '__content'" role="tabpanel">
          <ng-content></ng-content>
    </div>`,
  styles: ['a { cursor: pointer; }'],
})
export class NglTabs {
  @Input() type: 'default' | 'scoped' = 'default';

  @ContentChildren(NglTab) tabs: QueryList<NglTab>;

  _selected: string | number | NglTab;
  @Input() set selected(_selected: string | number | NglTab) {
    if (_selected === this.selected) return;

    this._selected = _selected;

    if (!this.tabs) return; // Wait for content to initialize

    const tab = this.findTab();
    this.tabs.forEach((t: NglTab) => t.active = t === tab);
  }
  get selected() {
    return this._selected;
  }
  @Output() selectedChange: EventEmitter<NglTab> = new EventEmitter();

  ngAfterContentInit() {
    // if there is no active tab yet, activate first one
    if (!this.tabs.toArray().some((tab: NglTab) => tab.active)) {
      this.select(this.selected ? this.findTab() : this.tabs.first);
    }
  }

  select(tab: NglTab) {
    this.selectedChange.emit(tab);
  }

  move(moves: number) {
    const tabs = this.tabs.toArray();
    const selectedIndex = tabs.indexOf( this.findTab() );
    this.select( tabs[(tabs.length + selectedIndex + moves) % tabs.length] );
  }

  private findTab(value: any = this.selected): NglTab {
    if (value instanceof NglTab) {
      return value;
    }
    if (isInt(value)) {
      return this.tabs.toArray()[+value];
    }
    return this.tabs.toArray().find((t: NglTab) => {
      return t.id && t.id === value;
    });
  }
}
