import {Component, ElementRef} from 'angular2/core';

@Component({
  selector: 'plunker',
  template: require('./plunker.jade')(),
  exportAs: 'playground',
})
export class Plunker {
  component: any;

  index() {
    if (!this.component) return '';
    return require('!!jade?pretty=true!./plunker-html.jade')();
  }

  ts() {
    if (!this.component) return '';

    const ts = this.component.tsRaw
                .replace('../../../../../dist/', 'ng-lightning/')
                .replace('NGL_DIRECTIVES', 'NGL_DIRECTIVES, provideNglConfig')
                .replace(/selector: '(.*)'/, 'selector: \'demo\'')
                .replace(/template: require(.*)/, 'templateUrl: \'app/demo.html\'')
                .replace(/class Demo(.*) {/, 'class Demo {');
    return `import {bootstrap}  from 'angular2/platform/browser';\n${ts}\nbootstrap(Demo, [provideNglConfig()]);`;
  }

  html() {
    if (!this.component) return '';
    return this.component.htmlRaw;
  }

  lib() {
    return require('!!raw!dist/ng-lightning.bundle.js');
  }

  open(component: any) {
    this.component = component;
    setTimeout(() => this.element.nativeElement.querySelector('form').submit());
  }

  constructor(public element: ElementRef) {}
}
