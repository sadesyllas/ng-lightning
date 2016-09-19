import {Component} from '@angular/core';

@Component({
  selector: 'demo-menus',
  template: require('./menus.html'),
})
export class DemoMenus {
  open: boolean;

  items = [
    { value: 'Item 1', icon: 'kanban' },
    { value: 'Item 2', icon: 'side_list' },
    { value: 'Item 3', icon: 'table' },
  ];

  onToggle($event: Event) {
    $event.stopPropagation();
    this.open = true;
  }
}
