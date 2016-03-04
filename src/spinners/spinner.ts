import {Component, Input, ChangeDetectionStrategy, ElementRef, Renderer} from 'angular2/core';

@Component({
  selector: 'ngl-spinner',
  template: `
    <div class="slds-spinner" [ngClass]="['slds-spinner--' + size, type ? 'slds-spinner--' + type : '']" aria-hidden="false" role="alert">
      <div class="slds-spinner__dot-a"></div>
      <div class="slds-spinner__dot-b"></div>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglSpinner {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: 'brand' |  'inverse';

  constructor(public element: ElementRef, public renderer: Renderer) {
    this.renderer.setElementClass(this.element.nativeElement, 'slds-spinner_container', true);
  }
};
