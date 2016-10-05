import {Component, Input, ChangeDetectionStrategy, ContentChild, ChangeDetectorRef, ElementRef, Renderer} from '@angular/core';
import {NglFormElement} from './element';
import {NglFormCheckbox} from './input';
import {NglFormLabelTemplate} from '../form-label';

@Component({
  selector: 'ngl-form-checkbox',
  templateUrl: './checkbox.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ {provide: NglFormElement, useExisting: NglFormElementCheckbox} ],
  styles: [`:host { display: block; }`],
})
export class NglFormElementCheckbox extends NglFormElement {
  @ContentChild(NglFormCheckbox) contentEl: NglFormCheckbox;

  @Input('label') labelStr: string;
  @ContentChild(NglFormLabelTemplate) labelTpl: NglFormLabelTemplate;

  @Input() error: string;

  required = false;

  constructor(detector: ChangeDetectorRef, element: ElementRef, renderer: Renderer) {
    super(detector, element, renderer);
  }
};
