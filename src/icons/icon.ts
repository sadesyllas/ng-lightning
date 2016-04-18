import {Component, Input, ElementRef, Renderer, ChangeDetectionStrategy, Attribute, Optional} from 'angular2/core';
import {NglConfig} from '../config/config';
import {toBoolean, replaceClass} from '../util/util';
import {NglButton} from '../buttons/button';
import {NglButtonIcon} from '../buttons/button-icon';
import {NglPillImage} from '../pills/pill-image';

export type NglIconCategory = 'action' | 'custom' | 'doctype' | 'standard' | 'utility';

@Component({
  selector: 'ngl-icon',
  templateUrl: './icon.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglIcon {
  @Input() icon: string;
  @Input('category') set setCategory(category: NglIconCategory) {
    this.category = category || 'utility';
  }
  @Input() type: 'default' | 'warning' | 'error';
  @Input() align: 'left' | 'right';
  @Input() size: 'x-small' | 'small' | 'large';
  @Input() alt: string;
  @Input() svgClass: string | string[];

  private category: NglIconCategory = 'utility';
  private button: boolean;
  private _containerClass: string[];

  constructor(private config: NglConfig, public element: ElementRef, public renderer: Renderer,
              @Attribute('state') private state: 'not-selected' | 'selected' | 'selected-focus',
              @Attribute('button') button: 'not-selected' | 'selected' | 'selected-focus',
              @Optional() private nglButton: NglButton, @Optional() private nglButtonIcon: NglButtonIcon,
              @Optional() private nglPillImage: NglPillImage) {

    this.button = button === null ? !!(this.nglButton || this.nglButtonIcon) : toBoolean(button);
    if (state) {
      renderer.setElementClass(element.nativeElement, `slds-text-${state}`, true);
    }
    if (this.nglPillImage) {
      this.nglPillImage.applyClass = false;
    }
  }

  iconPath() {
    const icon = this.category === 'custom' ? `custom${this.icon}` : this.icon;
    return `${this.config.svgPath}/${this.category}-sprite/svg/symbols.svg#${icon}`;
  }

  ngOnChanges() {
    if (!this.nglPillImage) {
      const { containerClass } = this;
      replaceClass(this, this._containerClass, containerClass);
      this._containerClass = containerClass;
    }
  }

  svgClasses() {
    const classes = Array.isArray(this.svgClass) ? <string[]>this.svgClass : [this.svgClass || ''];

    const prefix = this.button ? 'slds-button__icon' : 'slds-icon';
    classes.push(this.state ? 'slds-button__icon--stateful' : prefix);

    if (this.size) {
      classes.push(`${prefix}--${this.size}`);
    }

    if (this.type || (this.category === 'utility' && !this.button)) {
      classes.push(`slds-icon-text-${this.type || 'default'}`);
    }

    if (this.align || this.state) {
      classes.push(`slds-button__icon--${this.align || 'left'}`);
    }

    if (this.nglPillImage) {
      classes.push('slds-pill__icon');
      Array.prototype.push.apply(classes, this.containerClass);
    }

    return classes;
  }

  private get containerClass() {
    return /^(action|custom|standard)$/.test(this.category)
            ? ['slds-icon_container', `slds-icon-${this.category}-${this.icon.replace('_', '-')}`]
            : null;
  }
};
