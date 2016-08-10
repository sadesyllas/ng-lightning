import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NglNotification} from './notification';
import {NglNotificationClose} from './notification-close';
import {NglIconsModule} from '../icons/module';

const NGL_NOTIFICATION_DIRECTIVES = [
  NglNotification,
  NglNotificationClose,
];

@NgModule({
  declarations: [NGL_NOTIFICATION_DIRECTIVES],
  exports: [NGL_NOTIFICATION_DIRECTIVES],
  imports: [CommonModule, NglIconsModule],
})
export class NglNotificationsModule {}
