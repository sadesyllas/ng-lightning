import {Component, Input, Output, ElementRef, Renderer, ChangeDetectionStrategy, EventEmitter, HostListener, ViewChild} from '@angular/core';
import {toBoolean, uniqueId} from '../util/util';
import {NglButtonIcon} from '../buttons/button-icon';
import {NglIcon} from '../icons/icon';

@Component({
  selector: 'ngl-modal',
  directives: [NglButtonIcon, NglIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.jade',
  host: {
    'tabindex': '0',
  },
})
export class NglModal {
  @Input() header: string = '';
  @Input() size: 'large';

  @ViewChild('closeButton') closeButton: ElementRef;

  headingId = uniqueId('modal_header');

  open: boolean = true;
  @Input('open') set _open(_open: any) {
    _open = toBoolean(_open);
    if (_open === this.open) return;

    if (_open) {
      setTimeout(() => this.focusFirst());
    }
    this.open = _open;
  }
  @Output() openChange = new EventEmitter();

  constructor(private element: ElementRef, private renderer: Renderer) {}

  @HostListener('keydown.esc', ['$event'])
  close(evt: Event) {
    if (evt) {
      evt.stopPropagation();
    }
    this.openChange.emit(false);
  }

  @HostListener('click', ['$event'])
  stopPropagation(evt: Event) {
    evt.stopPropagation();
  }

  focusFirst() {
    this.renderer.invokeElementMethod(this.closeButton.nativeElement, 'focus', []);
  }
};
