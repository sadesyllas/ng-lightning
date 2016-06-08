import {Directive, HostBinding, Optional} from '@angular/core';
import {NglFormGroup} from './group';

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

  constructor(@Optional() formGroup: NglFormGroup) {
    if (!formGroup) return;
    this.name = `name_${formGroup.uid}`;
  }
}
