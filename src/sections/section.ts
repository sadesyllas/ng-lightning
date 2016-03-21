import {Component, Input, Output, EventEmitter, ElementRef, Renderer, HostBinding, ChangeDetectionStrategy} from 'angular2/core';
import {NglButtonIcon} from '../buttons/button-icon';
import {NglIconButton} from '../buttons/icon';

@Component({
  selector: 'ngl-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './section.jade',
  directives: [NglButtonIcon, NglIconButton],
})
export class NglSection {

  @Input() title: string;

  @HostBinding('class.slds-is-open')
  @Input() open = false;

  @Output() private openChange = new EventEmitter<boolean>(false);

  constructor(private element: ElementRef, private renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'slds-section', true);
  }

  toggle(event: Event) {
    event.preventDefault();
    this.openChange.emit(!this.open);
  }
}
