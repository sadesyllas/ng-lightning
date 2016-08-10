import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NglModule, provideNglConfig } from 'ng-lightning/ng-lightning';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './demo';

@NgModule({
  imports:      [ BrowserModule, HttpModule, NglModule ],
  declarations: [ AppComponent ],
  providers:    [ provideNglConfig() ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
