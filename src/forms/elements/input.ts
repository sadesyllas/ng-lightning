import {Directive, HostBinding, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: 'input:not([type=checkbox]), input:not([type=radio])',
})
export class NglFormInput {
  @HostBinding('attr.aria-describedby') describedBy: string;

  protected hostClass = 'slds-input';

  constructor(protected element: ElementRef, protected renderer: Renderer) {}

  setup(id: string) {
    this.renderer.setElementAttribute(this.element.nativeElement, 'id', id);

    if (this.hostClass) {
      this.renderer.setElementClass(this.element.nativeElement, this.hostClass, true);
    }
  }
};

@Directive({
  selector: 'textarea',
  providers: [ {provide: NglFormInput, useExisting: NglFormTextarea} ],
})
export class NglFormTextarea extends NglFormInput {
  protected hostClass = 'slds-textarea';

  constructor(protected element: ElementRef, protected renderer: Renderer) {
    super(element, renderer);
  }
}

@Directive({
  selector: 'select',
  providers: [ {provide: NglFormInput, useExisting: NglFormSelect} ],
})
export class NglFormSelect extends NglFormInput {
  protected hostClass = 'slds-select';

  constructor(protected element: ElementRef, protected renderer: Renderer) {
    super(element, renderer);
  }
}

@Directive({
  selector: 'input[type=checkbox]',
  providers: [ {provide: NglFormInput, useExisting: NglFormCheckbox} ],
})
export class NglFormCheckbox extends NglFormInput {
  protected hostClass: string = null;

  constructor(protected element: ElementRef, protected renderer: Renderer) {
    super(element, renderer);
  }
}
