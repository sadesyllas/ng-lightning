import {Component, Input, ElementRef, Renderer, ChangeDetectionStrategy, Inject} from 'angular2/core';
import {NGL_CONFIG, IConfig} from '../config/config';

@Component({
  selector: 'ngl-icon',
  template: `
    <svg aria-hidden="true" class="slds-icon" [ngClass]="svgClasses()">
      <use [attr.xlink:href]="config.svgPath + '/symbols.svg#' + icon"></use>
    </svg>
    <span class="slds-assistive-text" *ngIf="alt">{{alt}}</span>
  `,
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
