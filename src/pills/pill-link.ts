import {Directive, ElementRef, Renderer, Optional} from '@angular/core';
import {NglPill} from './pill';

@Directive({
  selector: 'a',
})
export class NglPillLink {

  constructor(@Optional() pill: NglPill, element: ElementRef, renderer: Renderer) {
    if (!pill) return;

    renderer.setElementClass(element.nativeElement, 'slds-pill__label', true);
    pill.unlinked = false;
  }

}
