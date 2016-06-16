import {Directive, Input, TemplateRef, Output, EventEmitter} from '@angular/core';

/*
 * <template ngl-tab heading="...">
 *    Content goes here...
 * </template>
 */
@Directive({
  selector: 'template[ngl-tab]',
  exportAs: 'nglTab',
})
export class NglTab {
  @Input('nglTabId') id: string;
  @Input() heading: string | TemplateRef<any>;
  @Output() onActivate = new EventEmitter<NglTab>();
  @Output() onDeactivate = new EventEmitter<NglTab>();

  private _active: boolean = false;

  constructor(public templateRef: TemplateRef<any>) {}

  set active(active: boolean) {
    if (active ===  this._active) return;
    this._active = active;
    if (active) {
      this.onActivate.emit(this);
    } else {
      this.onDeactivate.emit(this);
    }
  }

  get active(): boolean {
    return this._active;
  }
}
