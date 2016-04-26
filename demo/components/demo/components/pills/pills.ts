import { Component } from '@angular/core';
import { NGL_DIRECTIVES } from '../../../../../dist/ng-lightning';

@Component({
  selector: 'demo-pills',
  directives: [NGL_DIRECTIVES],
  template: require('./pills.html'),
})
export class DemoPills {
  private pillCounter = 1;
  private pills = <any[]>[];

  ngOnInit() {
    for (let x = 5; x > 0; x--) {
      this.add();
    }
  }

  add() {
    this.pills.push(`Pill ${this.pillCounter++}`);
  }

  remove(pill: string) {
    this.pills = this.pills.filter(_pill => _pill !== pill);
  }
}
