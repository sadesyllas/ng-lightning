import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter, HostListener, HostBinding, ElementRef, Renderer, Attribute, ContentChild} from '@angular/core';
import {NglRatingIconTemplate} from './icons';
import {toBoolean} from '../util/util';

@Component({
  selector: 'ngl-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rating.jade',
  host: {
    'style': 'white-space: nowrap;',
  },
})
export class NglRating {

  range: number[] = [];
  currentRate: number;

  @Input() icon = 'favorite';
  @Input() size: 'x-small' | 'small' | 'large';
  @Input() set isReadonly(readonly: any) {
    this.readonly = toBoolean(readonly);
  }
  @Input() set rate(rate: number) {
    this.inputRate = rate;
    this.currentRate = rate;
  }

  @ContentChild(NglRatingIconTemplate) iconTemplate: NglRatingIconTemplate;

  private max: number = 5;
  private readonly = false;
  private inputRate: number;

  @Output() private rateChange = new EventEmitter<number>();
  @Output() private hover = new EventEmitter<number>();

  constructor(element: ElementRef, renderer: Renderer, @Attribute('max') max: string | number) {
    if (max) this.max = +max;
    this.range = Array.apply(null, {length: this.max}).map((value: any, index: number) => index + 1);

    const { nativeElement } = element;
    renderer.setElementAttribute(nativeElement, 'tabindex', '0');
    renderer.setElementAttribute(nativeElement, 'aria-valuemin', '0');
    renderer.setElementAttribute(nativeElement, 'aria-valuemax', this.max.toString());
  }

  update(value: number) {
    if (value < 1 || value > this.max || this.readonly || value === this.inputRate) return;
    this.rateChange.emit(value);
  }

  enter(value: number): void {
    if (this.readonly) return;

    this.currentRate = value;
    this.hover.emit(value);
  }

  @HostListener('mouseleave') reset() {
    this.currentRate = this.inputRate;
  }

  // Keyboard interactions
  @HostListener('keydown.ArrowUp', ['$event'])
  @HostListener('keydown.ArrowRight', ['$event'])
  keyboardIncrease(evt: KeyboardEvent) {
    evt.preventDefault();
    this.update(this.inputRate + 1);
  }

  @HostListener('keydown.ArrowDown', ['$event'])
  @HostListener('keydown.ArrowLeft', ['$event'])
  keyboardDecrease(evt: KeyboardEvent) {
    evt.preventDefault();
    this.update(this.inputRate - 1);
  }

  // ARIA
  @HostBinding('attr.aria-valuenow') get ariaValuenow() {
    return this.inputRate;
  }

};
