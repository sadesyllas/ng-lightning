import {Component} from '@angular/core';

@Component({
  selector: 'demo-menus',
  template: require('./menus.html'),
})
export class DemoMenus {
  open: boolean;
  multiple: boolean = true;
  pick: any = [];

  items = [
    { value: 'Item 1', icon: 'kanban' },
    { value: 'Item 2', icon: 'side_list' },
    { value: 'Item 3', icon: 'table' },
  ];

  onToggle($event: Event) {
    $event.stopPropagation();
    this.open = true;
  }

  get pickLabel() {
    if (this.multiple) {
      return this.pick && this.pick.length ? `${this.pick.length} options selected` : 'Select option(s)';
    } else {
      return this.pick.value || 'Select an option';
    }
  }

  toggleMultiple() {
    this.multiple = !this.multiple;
    this.pick = this.multiple ? [] : '';
  }
}
