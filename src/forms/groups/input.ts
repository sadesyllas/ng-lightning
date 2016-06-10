import {Directive, HostBinding, Optional} from '@angular/core';
import {NglFormGroup} from './group';
import {NglFormGroupAlternate} from './group-alt';

@Directive({
  selector: 'input([type=checkbox])',
})
export class NglFormGroupCheckbox {
  type = 'checkbox';
}

@Directive({
  selector: 'input([type=radio])',
  providers: [ {provide: NglFormGroupCheckbox, useExisting: NglFormGroupRadio} ],
})
export class NglFormGroupRadio {
  type = 'radio';

  @HostBinding('attr.name') name: string;

  constructor(@Optional() formGroup: NglFormGroup, @Optional() formGroupAlt: NglFormGroupAlternate) {
    if (!formGroup && !formGroupAlt) return;
    this.name = `name_${(formGroup || formGroupAlt).uid}`;
  }
}
