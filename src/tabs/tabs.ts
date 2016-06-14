import {Component, Input, QueryList, ContentChildren, Output, EventEmitter} from '@angular/core';
import {isInt} from '../util/util';
import {NglTab} from './tab';
import {NglInternalOutlet} from '../util/outlet';

@Component({
  selector: 'ngl-tabs',
  templateUrl: './tabs.jade',
  directives: [NglInternalOutlet],
})
export class NglTabs {
  @Input() type: 'default' | 'scoped' = 'default';

  @ContentChildren(NglTab) tabs: QueryList<NglTab>;

  activeTab: NglTab;
  selected: string | number | NglTab;
  @Input('selected') set setSelected(selected: string | number | NglTab) {
    if (selected === this.selected) return;

    this.selected = selected;

    if (!this.tabs) return; // Wait for content to initialize

    this.activate();
  }

  @Output() selectedChange = new EventEmitter<NglTab>(false);

  ngAfterContentInit() {
    // Initial selection after all tabs are created
    this.activate();
    if (!this.activeTab) {
      setTimeout(() => this.select(this.tabs.first));
    }
  }

  select(tab: NglTab) {
    this.selectedChange.emit(tab);
  }

  move(evt: Event, moves: number) {
    evt.preventDefault();

    const tabs = this.tabs.toArray();
    const selectedIndex = tabs.indexOf( this.activeTab );
    this.select( tabs[(tabs.length + selectedIndex + moves) % tabs.length] );
  }

  private activate() {
    this.activeTab = this.findTab();
    this.tabs.forEach((t: NglTab) => t.active = (t === this.activeTab));
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
