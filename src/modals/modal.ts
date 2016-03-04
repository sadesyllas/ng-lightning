import {Component, Input, Output, ElementRef, Renderer, ChangeDetectionStrategy, EventEmitter} from 'angular2/core';
import {toBoolean} from '../util/util';
import {NglButtonIcon} from '../buttons/button-icon';
import {NglIconButton} from '../buttons/icon';

@Component({
  selector: 'ngl-modal',
  directives: [NglButtonIcon, NglIconButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="open" (click)="$event.stopPropagation()" tabindex="0" (keyup.esc)="close()">
      <div class="slds-modal slds-fade-in-open" [ngClass]="[size ? 'slds-modal--' + size : '']" aria-hidden="false" role="dialog">
        <div class="slds-modal__container">
          <div class="slds-modal__header">
            <button type="button" nglButtonIcon="inverse" class="slds-modal__close" (click)="close()">
              <ngl-icon-button icon="close" size="large" alt="Close"></ngl-icon-button>
            </button>
            <h2 class="slds-text-heading--medium">{{header}}</h2>
            <ng-content select="[tagline]"></ng-content>
          </div>
          <div class="slds-modal__content slds-p-around--medium">
            <ng-content select="[body]"></ng-content>
          </div>
          <div class="slds-modal__footer">
            <ng-content select="button"></ng-content>
          </div>
        </div>
      </div>
      <div tabindex="0" (focus)="focusFirst()"></div>
      <div class="slds-backdrop slds-backdrop--open"></div>
    </div>`,
})
export class NglModal {
  @Input() header: string = '';
  @Input() size: 'large';

  _open: boolean = false;
  @Input() set open(_open: any) {
    _open = toBoolean(_open);
    if (_open === this.open) return;

    if (_open) {
      setTimeout(() => this.focusFirst());
    }
    this._open = _open;
  }
  get open() {
    return this._open;
  }
  @Output() openChange = new EventEmitter(false);

  constructor(public element: ElementRef, public renderer: Renderer) {}

  close(event: string | boolean = false) {
    this.openChange.emit(event);
  }

  focusFirst() {
    this.element.nativeElement.children[0].focus();
  }
};
