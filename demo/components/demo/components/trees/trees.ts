import {Component} from 'angular2/core';
import {NGL_DIRECTIVES} from '../../../../../dist/ng-lightning';

@Component({
    selector: 'demo-trees',
    directives: [NGL_DIRECTIVES],
    template: require('./trees.html'),
})
export class DemoTrees {}
