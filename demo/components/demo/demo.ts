import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../dist/ng-lightning';

import {DemoBadges} from './components/badges/badges';
import {DemoButtons} from './components/buttons/buttons';
import {DemoIcons} from './components/icons/icons';
import {DemoAvatars} from './components/images/images';
import {DemoModals} from './components/modals/modals';
import {DemoPaginations} from './components/paginations/paginations';
import {DemoSpinners} from './components/spinners/spinners';
import {DemoTabs} from './components/tabs/tabs';

interface IComponent {
  key: string;
  component: any;
  title?: string;
  readme?: string;
  html?: string;
  ts?: string;
  api?: string;
};

const components: any[] = [
  { key: 'badges', component: DemoBadges },
  { key: 'buttons', component: DemoButtons },
  { key: 'icons', component: DemoIcons },
  { key: 'images', component: DemoAvatars },
  { key: 'modals', component: DemoModals },
  { key: 'paginations', component: DemoPaginations },
  { key: 'spinners', component: DemoSpinners },
  { key: 'tabs', component: DemoTabs },
].sort((a, b) => a.key.localeCompare(b.key));

const content = {};
components.forEach(component => {
  const { key } = component;
  const path = 'components/' + key + '/' + key;
  component.html = require('!!prismjs?lang=markdown!./' + path + '.html');
  component.ts = require('!!string-replace?search=../../../../../dist&replace=ng-lightning!prismjs?lang=typescript!./' + path + '.ts');
  if (!component.title) {
    component.title = key.charAt(0).toUpperCase() + key.slice(1);
  }
  if (!component.readme) {
    component.readme = require('src/' + key + '/README.md');
  }
  if (!component.api) {
    component.api = require('src/' + key + '/API.md');
  }
});


@Component({
  template: require('./demo.jade')({ content, components }),
  directives: [NGL_DIRECTIVES].concat(components.map((c: any) => c.component)),
})
export class DemoRoute { }
