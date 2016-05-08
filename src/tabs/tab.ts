import {Directive, Input, Attribute, ViewContainerRef, TemplateRef, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[ngl-tab]',
  exportAs: 'nglTab',
})
export class NglTab {
  @Input() heading: string | TemplateRef<any>;
  @Output() onActivate = new EventEmitter<NglTab>(false);
  @Output() onDeactivate = new EventEmitter<NglTab>(false);

  private _active: boolean = false;

  constructor(@Attribute('ngl-tab') public id: string,
              public viewContainer: ViewContainerRef, public templateRef: TemplateRef<any>) {}

  set active(active: boolean) {
    if (active ===  this._active) return;
    this._active = active;
    if (active) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.onActivate.emit(this);
    } else {
      this.viewContainer.remove(0);
      this.onDeactivate.emit(this);
    }
  }

  get active(): boolean {
    return this._active;
  }
}
