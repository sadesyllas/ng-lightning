import {Component, Input, Attribute, ElementRef, Renderer, ChangeDetectionStrategy, Inject} from 'angular2/core';
import {NGL_CONFIG, IConfig} from '../config/config';

@Component({
  selector: 'ngl-icon-button',
  template: `
    <svg aria-hidden="true" [ngClass]="svgClasses()">
      <use [attr.xlink:href]="config.svgPath + '/symbols.svg#' + icon"></use>
    </svg>
    <span class="slds-assistive-text" *ngIf="alt">{{alt}}</span>
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglIconButton {
  @Input() icon: string;
  @Input() align: 'left' | 'right';
  @Input() size: 'x-small' | 'small' | 'large';
  @Input() alt: string;

  constructor(@Attribute('state') public state: 'not-selected' | 'selected' | 'selected-focus',
              @Inject(NGL_CONFIG) public config: IConfig, element: ElementRef, renderer: Renderer) {

    if (this.state) {
      renderer.setElementClass(element.nativeElement, `slds-text-${this.state}`, true);
    }
  }

  protected svgClasses() {
    let classes: string[] = [];

    if (this.size) {
      classes.push(`slds-button__icon--${this.size}`);
    }

    if (this.align || this.state) {
      classes.push(`slds-button__icon--${this.align || 'left'}`);
    }

    classes.push(this.state ? 'slds-button__icon--stateful' : 'slds-button__icon');

    return classes;
  }
};
