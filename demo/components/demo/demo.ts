import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../dist/ng-lightning';
import {Plunker} from './playground/plunker';

import {DemoBadges} from './components/badges/badges';
import {DemoBreadcrumbs} from './components/breadcrumbs/breadcrumbs';
import {DemoButtons} from './components/buttons/buttons';
import {DemoIcons} from './components/icons/icons';
import {DemoAvatars} from './components/images/images';
import {DemoLookups} from './components/lookups/lookups';
import {DemoMenus} from './components/menus/menus';
import {DemoModals} from './components/modals/modals';
import {DemoNotifications} from './components/notifications/notifications';
import {DemoPaginations} from './components/paginations/paginations';
import {DemoPick} from './components/pick/pick';
import {DemoPills} from './components/pills/pills';
import {DemoPopovers} from './components/popovers/popovers';
import {DemoRatings} from './components/ratings/ratings';
import {DemoSections} from './components/sections/sections';
import {DemoSpinners} from './components/spinners/spinners';
import {DemoTabs} from './components/tabs/tabs';
import {DemoTrees} from './components/trees/trees';

export interface IComponent {
  key: string;
  component: any;
  title?: string;
  readme?: string;
  html?: string;
  htmlRaw?: string;
  ts?: string;
  tsRaw?: string;
  api?: string;
};

const components: any[] = [
  { key: 'trees', component: DemoTrees },
  { key: 'badges', component: DemoBadges },
  { key: 'breadcrumbs', component: DemoBreadcrumbs },
  { key: 'buttons', component: DemoButtons },
  { key: 'icons', component: DemoIcons },
  { key: 'images', component: DemoAvatars },
  { key: 'lookups', component: DemoLookups },
  { key: 'menus', component: DemoMenus },
  { key: 'modals', component: DemoModals },
  { key: 'notifications', component: DemoNotifications },
  { key: 'paginations', component: DemoPaginations },
  { key: 'pick', component: DemoPick },
  { key: 'pills', component: DemoPills },
  { key: 'popovers', component: DemoPopovers },
  { key: 'ratings', component: DemoRatings },
  { key: 'sections', component: DemoSections },
  { key: 'spinners', component: DemoSpinners },
  { key: 'tabs', component: DemoTabs },
];

const content = {};
components.forEach(component => {
  const { key } = component;
  const path = 'components/' + key + '/' + key;
  component.html = require('!!prismjs?lang=markup!./' + path + '.html');
  component.ts = require('!!string-replace?search=../../../../../dist&replace=ng-lightning!prismjs?lang=typescript!./' + path + '.ts');
  if (!component.title) {
    component.title = key.charAt(0).toUpperCase() + key.slice(1);
  }
  if (!component.readme) {
    component.readme = require('./components/' + key + '/README.md');
  }
  if (!component.api) {
    component.api = require('./components/' + key + '/API.md');
  }

  // Retrieve raw for live editing in plunker
  component.htmlRaw = require('!!raw!./' + path + '.html');
  component.tsRaw = require('!!raw!./' + path + '.ts');
});


@Component({
  template: require('./demo.jade')({ content, components }),
  directives: [NGL_DIRECTIVES, Plunker].concat(components.map((c: any) => c.component)),
})
export class DemoRoute {
  selectedTab: string[] = [];

  getComponent(key: string): IComponent {
    for (var i = 0, ii = components.length; i < ii; i++) {
      if (components[i].key === key) {
        return components[i];
      }
    }
  }

}
