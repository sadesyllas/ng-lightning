import {Directive, HostBinding} from '@angular/core';
import {NglFormGroup} from './group';

@Directive({
  selector: 'ngl-form-group-element input([type=checkbox])',
})
export class NglFormGroupCheckbox {
  type = 'checkbox';
}

@Directive({
  selector: 'ngl-form-group-element input([type=radio])',
  providers: [ {provide: NglFormGroupCheckbox, useExisting: NglFormGroupRadio} ],
})
export class NglFormGroupRadio {
  type = 'radio';

  @HostBinding('attr.name') name: string;

  constructor(formGroup: NglFormGroup) {
    this.name = `name_${formGroup.uid}`;
  }
}
