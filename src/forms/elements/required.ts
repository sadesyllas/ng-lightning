import {Directive, Input, Optional} from '@angular/core';
import {toBoolean} from '../../util/util';
import {NglFormElement} from './element';

@Directive({
  selector: 'input[required], textarea[required], select[required]',
})
export class NglFormElementRequired {

  constructor(@Optional() private nglFormElement: NglFormElement) {}

  @Input() set required(required: string | boolean) {
    if (!this.nglFormElement) return;

    this.nglFormElement.required = toBoolean(required);
    this.nglFormElement.detector.markForCheck();
  }
};
