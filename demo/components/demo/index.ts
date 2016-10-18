import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {NglModule} from 'ng-lightning/ng-lightning';

import {Plunker} from './playground/plunker';
import {components} from './demo';
const DEMO_COMPONENTS = components.map(c => c.component);

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NglModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    ...DEMO_COMPONENTS,
    Plunker,
  ],
  exports: [
    ...DEMO_COMPONENTS,
    Plunker,
  ],
})
export class NglDemoComponentsModule {}
