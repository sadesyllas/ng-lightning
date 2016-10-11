import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from './routes';

import {NglModule} from 'ng-lightning/ng-lightning';

import {AppComp} from './app';
import {IntroComponent} from './components/intro/intro';
import {DemoRoute} from './components/demo/demo';
import {NglDemoComponentsModule} from './components/demo';
import {SupportComponent} from './components/support/support';


@NgModule({
  imports: [
    BrowserModule,
    routing,
    NglModule.forRoot(),
    NglDemoComponentsModule,
  ],
  declarations: [
    AppComp,
    IntroComponent,
    DemoRoute,
    SupportComponent,
  ],
  bootstrap: [AppComp],
})
export class NglDemoModule {}
