import {Component} from '@angular/core';

import {DemoBadges} from './components/badges/badges';
import {DemoBreadcrumbs} from './components/breadcrumbs/breadcrumbs';
import {DemoButtons} from './components/buttons/buttons';
import {DemoDatatables} from './components/datatables/datatables';
import {DemoDatepickers} from './components/datepickers/datepickers';
import {DemoForms} from './components/forms/forms';
import {DemoIcons} from './components/icons/icons';
import {DemoAvatars} from './components/images/images';
import {DemoLookups} from './components/lookups/lookups';
import {DemoMenus} from './components/menus/menus';
import {DemoModals} from './components/modals/modals';
import {DemoNotifications} from './components/notifications/notifications';
import {DemoPaginations} from './components/paginations/paginations';
import {DemoPick} from './components/pick/pick';
import {DemoPicklist} from './components/picklist/picklist';
import {DemoPills} from './components/pills/pills';
import {DemoPopovers} from './components/popovers/popovers';
import {DemoRatings} from './components/ratings/ratings';
import {DemoSections} from './components/sections/sections';
import {DemoSpinners} from './components/spinners/spinners';
import {DemoTabs} from './components/tabs/tabs';

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

export const components: any[] = [
  { key: 'badges', component: DemoBadges },
  { key: 'breadcrumbs', component: DemoBreadcrumbs },
  { key: 'buttons', component: DemoButtons },
  { key: 'datatables', component: DemoDatatables },
  { key: 'datepickers', component: DemoDatepickers },
  { key: 'forms', component: DemoForms },
  { key: 'icons', component: DemoIcons },
  { key: 'images', component: DemoAvatars },
  { key: 'lookups', component: DemoLookups },
  { key: 'menus', component: DemoMenus },
  { key: 'modals', component: DemoModals },
  { key: 'notifications', component: DemoNotifications },
  { key: 'paginations', component: DemoPaginations },
  { key: 'pick', component: DemoPick },
  { key: 'picklist', component: DemoPicklist },
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
  component.ts = require('!!prismjs?lang=typescript!./' + path + '.ts')
                  .replace('../../../../../dist/ng-lightning', 'ng-lightning/ng-lightning')
                  .replace(/\{/g, `&#x007b;`).replace(/\}/g, `&#x007d;`);
  if (!component.title) {
    component.title = key.charAt(0).toUpperCase() + key.slice(1);
  }
  if (!component.readme) {
    component.readme = require('./components/' + key + '/README.md').replace(/\{/g, `&#x007b;`).replace(/\}/g, `&#x007d;`);
  }
  if (!component.api) {
    component.api = require('./components/' + key + '/API.md').replace(/\{/g, `&#x007b;`).replace(/\}/g, `&#x007d;`);
  }

  // Retrieve raw for live editing in plunker
  component.htmlRaw = require('!!raw!./' + path + '.html');
  component.tsRaw = require('!!raw!./' + path + '.ts');
});


@Component({
  template: require('./demo.jade')({ content, components }),
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
