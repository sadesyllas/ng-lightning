import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'plunker',
  template: require('./plunker.jade')(__ENV__),
  exportAs: 'playground',
})
export class Plunker {
  component: any;

  index() {
    if (!this.component) return '';
    return require('!!jade?pretty=true!./files/index.jade')(__ENV__);
  }

  ts() {
    if (!this.component) return '';

    const ts = this.component.tsRaw
                .replace('../../../../../dist/ng-lightning', 'ng-lightning/ng-lightning')
                .replace(/selector: '(.*)'/, 'selector: \'my-app\'')
                .replace(/template: require(.*)/, 'templateUrl: \'app/demo.html\',')
                .replace(/class Demo(.*) {/, 'class AppComponent {');
    return `${ts}`;
  }

  html() {
    if (!this.component) return '';
    return this.component.htmlRaw;
  }

  lib() {
    return require('!!raw!dist/ng-lightning.bundle.js');
  }

  raw(filename: string) {
    return require('!!raw!./files/' + filename);
  }

  open(component: any) {
    this.component = component;
    setTimeout(() => this.element.nativeElement.querySelector('form').submit());
  }

  constructor(public element: ElementRef) {}
}
