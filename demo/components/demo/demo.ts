import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../dist/ng-lightning';

import {DemoSpinners} from './components/spinners/spinners';
import {DemoTabs} from './components/tabs/tabs';

interface IComponent {
  key: string;
  title: string;
  component: any;
  readme: string;
  html?: string;
  ts?: string;
  api?: string;
};

const components: IComponent[] = [
  { key: 'spinners', title: 'Spinners', component: DemoSpinners, readme: require('src/spinners/README.md'), api: require('src/spinners/API.md') },
  { key: 'tabs', title: 'Tabs', component: DemoTabs, readme: require('src/tabs/README.md'), api: require('src/tabs/API.md') },
].sort((a, b) => a.key.localeCompare(b.key));

const content = {};
components.forEach(component => {
  const { key } = component;
  const path = 'components/' + key + '/' + key;
  component.html = require('!!prismjs?lang=markdown!./' + path + '.html');
  component.ts = require('!!string-replace?search=../../../../../dist&replace=ng-lightning!prismjs?lang=typescript!./' + path + '.ts');
});


@Component({
  template: require('./demo.jade')({ content, components }),
  directives: [NGL_DIRECTIVES].concat(components.map((c: any) => c.component)),
})
export class DemoRoute { }
