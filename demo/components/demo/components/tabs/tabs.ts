import {Component} from '@angular/core';

@Component({
  selector: 'demo-tabs',
  template: require('./tabs.html'),
})
export class DemoTabs {

  type: string = 'scoped';
  id: number = 0;
  selectedTab: any = 'sum';
  private details: number[] = [];

  change() {
    this.type = this.type === 'scoped' ? 'default' : 'scoped';
  }

  addDetail() {
    this.details.push(this.id++);
  }

  isDisabled() {
    return this.selectedTab === 'sum' || this.selectedTab.id === 'sum';
  }

  protected tabChange(detail: number, event: string) {
    console.log('detail', detail, event);
  }

  protected removeDetail(detail: Object) {
    this.details = this.details.filter((d) => d !== detail);
    setTimeout(() => this.selectedTab = 'sum');
  }
}
