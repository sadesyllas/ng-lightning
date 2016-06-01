import {Directive, Input} from '@angular/core';
import {toBoolean} from '../../util/util';
import {NglFormElement} from './element';

@Directive({
  selector: 'ngl-form-element input[required]',
})
export class NglFormElementRequired {

  constructor(private nglFormElement: NglFormElement) {}

  @Input() set required(required: string | boolean) {
    this.nglFormElement.required = toBoolean(required);
    this.nglFormElement.detector.markForCheck();
  }
};
