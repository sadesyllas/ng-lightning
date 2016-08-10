import {Component, Input, Output, EventEmitter, ElementRef, Renderer, HostBinding, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'ngl-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './section.jade',
})
export class NglSection {

  @Input() title: string;

  @HostBinding('class.slds-is-open')
  @Input() open = false;

  @Output() private openChange = new EventEmitter<boolean>();

  constructor(private element: ElementRef, private renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'slds-section', true);
  }

  toggle(event: Event) {
    event.preventDefault();
    this.openChange.emit(!this.open);
  }
}
