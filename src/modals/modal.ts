import {Component, Input, Output, ElementRef, Renderer, ChangeDetectionStrategy, EventEmitter} from 'angular2/core';
import {toBoolean, uniqueId} from '../util/util';
import {NglButtonIcon} from '../buttons/button-icon';
import {NglIconButton} from '../buttons/icon';

@Component({
  selector: 'ngl-modal',
  directives: [NglButtonIcon, NglIconButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.jade',
})
export class NglModal {
  @Input() header: string = '';
  @Input() size: 'large';

  headingId = uniqueId('modal_header');

  open: boolean = false;
  @Input('open') set _open(_open: any) {
    _open = toBoolean(_open);
    if (_open === this.open) return;

    if (_open) {
      setTimeout(() => this.focusFirst());
    }
    this.open = _open;
  }
  @Output() openChange = new EventEmitter(false);

  constructor(private element: ElementRef, private renderer: Renderer) {}

  close(event: string | boolean = false) {
    this.openChange.emit(event);
  }

  focusFirst() {
    this.renderer.invokeElementMethod(this.element.nativeElement.children[0], 'focus', []);
  }
};
