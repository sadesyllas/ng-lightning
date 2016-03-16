import {Component, Input, ElementRef, Renderer, ChangeDetectionStrategy, Inject} from 'angular2/core';
import {NGL_CONFIG, IConfig} from '../config/config';

@Component({
  selector: 'ngl-icon',
  templateUrl: './icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglIcon {
  @Input() icon: string;
  @Input() type: 'default' | 'warning' | 'error';
  @Input() size: 'x-small' | 'small' | 'large';
  @Input() alt: string;

  constructor(@Inject(NGL_CONFIG) public config: IConfig, element: ElementRef, renderer: Renderer) {}

  protected svgClasses() {
    let classes: string[] = [];

    if (this.size) {
      classes.push(`slds-icon--${this.size}`);
    }
    classes.push(`slds-icon-text-${this.type || 'default'}`);

    return classes;
  }
};
