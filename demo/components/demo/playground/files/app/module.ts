import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NglModule, provideNglConfig } from 'ng-lightning/ng-lightning';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './demo';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, NglModule ],
  declarations: [ AppComponent ],
  providers:    [ provideNglConfig() ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
