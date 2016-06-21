import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

const install = require('!!prismjs?lang=bash!./install.md');
const bundle = require('!!prismjs?lang=markup!./bundle.md').replace('x.x.x', __ENV__.version);
const usageApp = require('!!prismjs?lang=typescript!./usage-app.md');
const usageCmp = require('!!prismjs?lang=typescript!./usage-cmp.md');

@Component({
  template: require('./intro.jade')({ install, bundle, usageApp, usageCmp }),
  directives: [ROUTER_DIRECTIVES],
})
export class IntroRoute {}
