import {Component, Input, ChangeDetectionStrategy, ContentChild, ChangeDetectorRef, ElementRef, Renderer} from '@angular/core';
import {NglFormElement} from './element';
import {NglFormCheckbox} from './input';
import {NglFormLabelTemplate} from '../form-label';

@Component({
  selector: 'ngl-form-checkbox-toggle',
  templateUrl: './checkbox-toggle.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ {provide: NglFormElement, useExisting: NglFormElementCheckboxToggle} ],
  styles: [`:host { display: block; }`],
})
export class NglFormElementCheckboxToggle extends NglFormElement {
  @ContentChild(NglFormCheckbox) contentEl: NglFormCheckbox;

  @Input('label') labelStr: string;
  @ContentChild(NglFormLabelTemplate) labelTpl: NglFormLabelTemplate;

  @Input() error: string;
  @Input() enabledText: string = 'Enabled';
  @Input() disabledText: string = 'Disabled';

  required = false;

  constructor(detector: ChangeDetectorRef, element: ElementRef, renderer: Renderer) {
    super(detector, element, renderer);
  }
};
