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

  constructor(private element: ElementRef, private renderer: Renderer, public pick: NglPick) {}

  @HostListener('click')
  onSelectChange() {
    this.pick.selectedChange.emit(this.value);
  }

  ngOnInit() {
    this._subscription = this.pick.values.subscribe((_value) => {
      this.renderer.setElementClass(this.element.nativeElement, this.activeClass, this.value === _value);
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this.pick.optionRemoved(this.value);
  }
}
