import {Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ContentChild, ElementRef, Renderer, TemplateRef} from '@angular/core';
import {uniqueId} from '../../util/util';
import {NglFormInput, NglFormCheckbox} from './input';
import {NglFormLabelTemplate, getFormLabel} from '../form-label';

@Component({
  selector: 'ngl-form-element',
  templateUrl: './element.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`:host { display: block; }`],
})
export class NglFormElement {
  @ContentChild(NglFormInput) contentEl: NglFormInput;

  @Input('label') labelStr: string;
  @ContentChild(NglFormLabelTemplate) labelTpl: NglFormLabelTemplate;

  @Input() error: string;

  uid = uniqueId('form_element');

  required = false;

  _label: TemplateRef<any> | string;

  get isCheckbox() {
    return this.contentEl instanceof NglFormCheckbox;
  }

  constructor(public detector: ChangeDetectorRef, private element: ElementRef, private renderer: Renderer) {}

  ngOnInit() {
    this.renderer.setElementClass(this.element.nativeElement, 'slds-form-element', true);
  }

  ngOnChanges() {
    this.setFormLabel();
    this.setInputErrorId();
    this.renderer.setElementClass(this.element.nativeElement, 'slds-has-error', !!this.error);
  }

  ngAfterContentInit() {
    this.contentEl.setup(this.uid);
    this.setInputErrorId();
    this.setFormLabel();
  }

  private setInputErrorId() {
    if (!this.contentEl) return;
    this.contentEl.describedBy = this.error ? `error_${this.uid}` : null;
  }

  private setFormLabel() {
    this._label = getFormLabel(this.labelStr, this.labelTpl);
  }
};
