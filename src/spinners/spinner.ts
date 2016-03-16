import {Component, Input, ChangeDetectionStrategy, ElementRef, Renderer} from 'angular2/core';

@Component({
  selector: 'ngl-spinner',
  templateUrl: './spinner.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglSpinner {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: 'brand' |  'inverse';

  constructor(public element: ElementRef, public renderer: Renderer) {
    this.renderer.setElementClass(this.element.nativeElement, 'slds-spinner_container', true);
  }
};
