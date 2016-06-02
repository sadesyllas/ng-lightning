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

@Directive({
  selector: 'ngl-form-element textarea',
  host: {
    '[class.slds-textarea]': 'true',
  },
  providers: [ {provide: NglFormInput, useExisting: NglFormTextarea} ],
})
export class NglFormTextarea extends NglFormInput {}

@Directive({
  selector: 'ngl-form-element select',
  host: {
    '[class.slds-select]': 'true',
  },
  providers: [ {provide: NglFormInput, useExisting: NglFormSelect} ],
})
export class NglFormSelect extends NglFormInput {}
