import {Component} from '@angular/core';

const install = require('!!prismjs?lang=bash!./install.md');
const bundle = require('!!prismjs?lang=markup!./bundle.md').replace('x.x.x', __ENV__.version);
const usageApp = require('!!prismjs?lang=typescript!./usage-app.md').replace(/\{/g, `&#x007b;`).replace(/\}/g, `&#x007d;`);
const config = require('!!prismjs?lang=typescript!./config.md').replace(/\{/g, `&#x007b;`).replace(/\}/g, `&#x007d;`);

@Component({
  template: require('./intro.jade')({ install, bundle, usageApp, config }),
})
export class IntroComponent {}
