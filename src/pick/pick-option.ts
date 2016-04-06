import { Directive, Input, HostListener, ElementRef, Renderer } from 'angular2/core';
import { Subscription } from 'rxjs/Subscription';
import { NglPick } from './pick';

@Directive({
  selector: '[nglPickOption]',
})
export class NglPickOption {

  @Input('nglPickOption') set setValue(value: any) {
    this.value = value;
  }

  @Input() activeClass = 'slds-button--brand';

  private value: any;
  private _subscription: Subscription;

  constructor(private element: ElementRef, private renderer: Renderer, private nglPick: NglPick) {}

  @HostListener('click')
  pick() {
    this.nglPick.selectOption(this.value);
  }

  ngOnInit() {
    this._subscription = this.nglPick.values.subscribe(value => {
      const active = this._isActive(value);
      this.renderer.setElementClass(this.element.nativeElement, this.activeClass, active);
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
