import {Component} from '@angular/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
    selector: 'demo-tabs',
    directives: [NGL_DIRECTIVES],
    template: require('./tabs.html'),
})
export class DemoTabs {

    type: string = 'scoped';
    id: number = 0;
    selectedTab: any = 'sum';
    private details: Object[] = [];

    change() {
      this.type = this.type === 'scoped' ? 'default' : 'scoped';
    }

    addDetail() {
      const text = `Some detail text for ${this.id++}...`;
      const title = `Detail ${this.id}`;
      this.details.push({ title, text });
    }

    isDisabled() {
      return this.selectedTab === 'sum' || this.selectedTab.id === 'sum';
    }

    protected tabChange(detail: Object, event: string) {
      console.log('detail', detail, event);
    }

    protected removeDetail(detail: Object) {
      this.details = this.details.filter((d) => d !== detail);
      setTimeout(() => this.selectedTab = 'sum');
    }
}
