import {Component, Input, QueryList, ContentChildren, Output, EventEmitter} from 'angular2/core';
import {isInt} from '../util/util';
import {NglTab} from './tab';

@Component({
  selector: 'ngl-tabs',
  templateUrl: './tabs.jade',
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

  move(evt: Event, moves: number) {
    evt.preventDefault();

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
