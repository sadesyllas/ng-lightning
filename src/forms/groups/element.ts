import {Component, Input, ChangeDetectionStrategy, ContentChild} from '@angular/core';
import {NglFormGroupCheckbox} from './input';

@Component({
  selector: 'ngl-form-group-element',
  templateUrl: './element.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglFormGroupElement {
  @ContentChild(NglFormGroupCheckbox) contentEl: NglFormGroupCheckbox;
  @Input('nglFormLabel') label: string;
};
