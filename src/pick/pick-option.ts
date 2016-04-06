import { Directive, Input, HostListener, ElementRef, Renderer } from 'angular2/core';
import { Subscription } from 'rxjs/Subscription';
import { NglPick } from './pick';

@Directive({
  selector: '[nglPickOption]',
  host: {
    'role': 'button',
  },
})
export class NglPickOption {

  @Input('nglPickOption') set setValue(value: any) {
    this.value = value;
  }

  @Input() nglPickActiveClass: string;

  private value: any;
  private _subscription: Subscription;

  constructor(private element: ElementRef, private renderer: Renderer, private nglPick: NglPick) {}

  @HostListener('click')
  @HostListener('keydown.Space', ['$event'])
  @HostListener('keydown.Enter', ['$event'])
  pick(evt: Event) {
    if (evt) {
      evt.preventDefault();
    }
    this.nglPick.selectOption(this.value);
  }

  ngOnInit() {
    this._subscription = this.nglPick.values.subscribe(value => {
      const active = this._isActive(value);

      const activeClass = this.nglPickActiveClass || this.nglPick.nglPickActiveClass;
      if (activeClass) {
        this.renderer.setElementClass(this.element.nativeElement, activeClass, active);
      }
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this.nglPick.optionRemoved(this.value);
  }

  private _isActive(value: any) {
    if (this.nglPick.isMultiple) {
      return Array.isArray(value) ? value.indexOf(this.value) > -1 : !!value[this.value];
    } else {
      return this.value === value;
    }
  }
}
