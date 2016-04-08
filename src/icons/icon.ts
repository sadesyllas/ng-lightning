import {Component, Input, ElementRef, Renderer, ChangeDetectionStrategy, Inject} from 'angular2/core';
import {NGL_CONFIG, IConfig} from '../config/config';

@Component({
  selector: 'ngl-icon',
  templateUrl: './icon.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglIcon {
  @Input() icon: string;
  @Input() type: 'default' | 'warning' | 'error' = 'default';
  @Input() size: 'x-small' | 'small' | 'large';
  @Input() alt: string;
  @Input() svgClass: string | string[] = '';

  constructor(@Inject(NGL_CONFIG) public config: IConfig, element: ElementRef, renderer: Renderer) {}

  protected svgClasses() {
    const classes = Array.isArray(this.svgClass) ? <string[]>this.svgClass : [this.svgClass || ''];

    if (this.size) {
      classes.push(`slds-icon--${this.size}`);
    }

    if (this.type) {
      classes.push(`slds-icon-text-${this.type}`);
    }

    return classes;
  }
};
