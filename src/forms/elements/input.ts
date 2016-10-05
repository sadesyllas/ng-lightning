import {Directive, HostBinding, Optional} from '@angular/core';
import {NglFormGroup} from '../groups/group';
import {NglFormGroupAlternate} from '../groups/group-alt';


@Directive({
  selector: 'input[nglFormControl]:not([type=checkbox]), input[nglFormControl]:not([type=radio])',
  host: {
    '[class.slds-input]': 'true',
  },
})
export class NglFormInput {
  @HostBinding('id') id: string;
  @HostBinding('attr.aria-describedby') describedBy: string;
};

@Directive({
  selector: 'textarea[nglFormControl]',
  providers: [ {provide: NglFormInput, useExisting: NglFormTextarea} ],
  host: {
    '[class.slds-textarea]': 'true',
  },
})
export class NglFormTextarea {
  @HostBinding('id') id: string;
  @HostBinding('attr.aria-describedby') describedBy: string;
}

@Directive({
  selector: 'select[nglFormControl]',
  providers: [ {provide: NglFormInput, useExisting: NglFormSelect} ],
  host: {
    '[class.slds-select]': 'true',
  },
})
export class NglFormSelect {
  @HostBinding('id') id: string;
  @HostBinding('attr.aria-describedby') describedBy: string;
}

@Directive({
  selector: 'input[nglFormControl][type=checkbox]',
})
export class NglFormCheckbox {
  type = 'checkbox';

  @HostBinding('id') id: string;
  @HostBinding('attr.aria-describedby') describedBy: string;
}

@Directive({
  selector: 'input[nglFormControl][type=radio]',
  providers: [ {provide: NglFormCheckbox, useExisting: NglFormRadio} ],
})
export class NglFormRadio {
  type = 'radio';

  @HostBinding('id') id: string;
  @HostBinding('attr.name') name: string;

  constructor(@Optional() formGroup: NglFormGroup, @Optional() formGroupAlt: NglFormGroupAlternate) {
    this.name = `name_${(formGroup || formGroupAlt).uid}`;
  }
}
