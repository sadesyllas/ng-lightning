import {Component} from '@angular/core';

@Component({
  selector: 'app',
  template: require('./app.jade')(__ENV__),
})
export class AppComp {}
