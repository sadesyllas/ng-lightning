import {Component, Input, ElementRef, Renderer, ChangeDetectionStrategy, Attribute, Optional} from '@angular/core';
import {NglIconSvg} from './svg';
import {toBoolean, replaceClass} from '../util/util';
import {NglButton} from '../buttons/button';
import {NglButtonIcon} from '../buttons/button-icon';

export type NglIconCategory = 'action' | 'custom' | 'doctype' | 'standard' | 'utility';

@Component({
  selector: 'ngl-icon, [ngl-icon]',
  templateUrl: './icon.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [NglIconSvg],
})
export class NglIcon {
  _icon: string;
  @Input('icon') set setIcon(icon: string) {
    this._icon = icon;
  }
  get icon() {
    return this.category === 'custom' ? `custom${this._icon}` : this._icon;
  }

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

  constructor(public element: ElementRef, public renderer: Renderer,
              @Attribute('state') private state: 'not-selected' | 'selected' | 'selected-focus',
              @Attribute('button') button: 'not-selected' | 'selected' | 'selected-focus',
              @Optional() private nglButton: NglButton, @Optional() private nglButtonIcon: NglButtonIcon) {

    this.button = button === null ? !!(this.nglButton || this.nglButtonIcon) : toBoolean(button);
    if (state) {
      renderer.setElementClass(element.nativeElement, `slds-text-${state}`, true);
    }
  }

  ngOnChanges() {
    const { containerClass } = this;
    replaceClass(this, this._containerClass, containerClass);
    this._containerClass = containerClass;
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

    return classes;
  }

  private get containerClass() {
    return /^(action|custom|standard)$/.test(this.category)
            ? ['slds-icon_container', `slds-icon-${this.category}-${this.icon.replace('_', '-')}`]
            : null;
  }
};
