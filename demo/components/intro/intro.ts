import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

const install = require('!!prismjs?lang=bash!./install.md');
const usageApp = require('!!prismjs?lang=typescript!./usage-app.md');
const usageCmp = require('!!prismjs?lang=typescript!./usage-cmp.md');

@Component({
  template: require('./intro.jade')({ install, usageApp, usageCmp }),
  directives: [ROUTER_DIRECTIVES],
})
export class IntroRoute {}
