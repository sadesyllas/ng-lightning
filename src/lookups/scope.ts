import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';
import {NglLookupScopeItem} from './scope-item';
import {NGL_DROPDOWN_DIRECTIVES} from '../menus/directives';
import {NglIconSvg} from '../icons/svg';

@Component({
  selector: 'ngl-internal-lookup-scope',
  templateUrl: './scope.jade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [NglIconSvg, NGL_DROPDOWN_DIRECTIVES],
})
export class NglInternalLookupScope {
  @Input() scope: NglLookupScopeItem;
  @Output() scopeChange = new EventEmitter();

  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter();

  constructor(element: ElementRef, renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'slds-align-middle', true);
    renderer.setElementClass(element.nativeElement, 'slds-m-left--xx-small', true);
    renderer.setElementClass(element.nativeElement, 'slds-shrink-none', true);
  }

  onScopeChange(scope: any) {
    this.scopeChange.emit(scope);
  }
};
