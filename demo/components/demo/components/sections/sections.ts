import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
    selector: 'demo-sections',
    directives: [NGL_DIRECTIVES],
    template: require('./sections.html'),
})
export class DemoSections {}
