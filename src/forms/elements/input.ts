import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: 'ngl-form-element input',
  host: {
    '[class.slds-input]': 'true',
  },
})
export class NglFormInput {
  @HostBinding('attr.aria-describedby') describedBy: string;
  @HostBinding('attr.id') id: string;
};
