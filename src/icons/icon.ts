import {Component, Input, ElementRef, Renderer, ChangeDetectionStrategy, Attribute, Optional} from 'angular2/core';
import {NglConfig} from '../config/config';
import {toBoolean} from '../util/util';
import {NglButton} from '../buttons/button';
import {NglButtonIcon} from '../buttons/button-icon';

@Component({
  selector: 'ngl-icon',
  templateUrl: './icon.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglIcon {
  @Input() icon: string;
  @Input() type: 'default' | 'warning' | 'error' = 'default';
  @Input() align: 'left' | 'right';
  @Input() size: 'x-small' | 'small' | 'large';
  @Input() alt: string;
  @Input() svgClass: string | string[];

  private button: boolean;

  constructor(private config: NglConfig, element: ElementRef, renderer: Renderer,
              @Attribute('state') private state: 'not-selected' | 'selected' | 'selected-focus',
              @Attribute('button') button: 'not-selected' | 'selected' | 'selected-focus',
              @Optional() private nglButton: NglButton, @Optional() private nglButtonIcon: NglButtonIcon ) {

    this.button = button === null ? !!(this.nglButton || this.nglButtonIcon) : toBoolean(button);
    if (state) {
      renderer.setElementClass(element.nativeElement, `slds-text-${state}`, true);
    }
  }

  protected svgClasses() {
    const classes = Array.isArray(this.svgClass) ? <string[]>this.svgClass : [this.svgClass || ''];

    const prefix = this.button ? 'slds-button__icon' : 'slds-icon';
    classes.push(this.state ? 'slds-button__icon--stateful' : prefix);

    if (this.size) {
      classes.push(`${prefix}--${this.size}`);
    }

    if (!this.button && this.type) {
      classes.push(`slds-icon-text-${this.type}`);
    }

    if (this.align || this.state) {
      classes.push(`slds-button__icon--${this.align || 'left'}`);
    }

    return classes;
  }
};
