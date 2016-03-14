import { Directive, Input, HostListener, ElementRef, Renderer } from 'angular2/core';
import { Subscription } from 'rxjs/Subscription';
import { NglButtonGroup } from './button-group';

@Directive({
  selector: '[nglButtonRadio]',
})
export class NglButtonRadio {

  @Input('nglButtonRadio') set setValue(value: any) {
    this.value = value;
  }

  @Input() activeClass = 'slds-button--brand';

  private value: any;
  private _subscription: Subscription;

  constructor(private element: ElementRef, private renderer: Renderer, public group: NglButtonGroup) {}

  @HostListener('click')
  onSelectChange() {
    this.group.selectedChange.emit(this.value);
  }

  ngOnInit() {
    this._subscription = this.group.values.subscribe((_value) => {
      this.renderer.setElementClass(this.element.nativeElement, this.activeClass, this.value === _value);
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this.group.optionRemoved(this.value);
  }
}
