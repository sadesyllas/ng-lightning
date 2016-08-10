import { Component } from '@angular/core';

@Component({
  selector: 'demo-pills',
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
