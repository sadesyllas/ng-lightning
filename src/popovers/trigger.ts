import {Directive, Input, ElementRef, ComponentRef, TemplateRef, ViewContainerRef, ComponentResolver, Injector, EmbeddedViewRef, ComponentFactory} from '@angular/core';
import * as Tether from 'tether';
import {NglPopover, Direction} from './popover';
import {placement} from './placements';

@Directive({
  selector: '[nglPopover]',
})
export class NglPopoverTrigger {

  @Input('nglPopover') template: TemplateRef<any>;

  @Input() set nglPopoverPlacement(_placement: Direction) {
    this.placement = _placement || 'top';
    this.setTether();
  }

  @Input() set nglPopoverTheme(theme: string) {
    this.theme = theme;
    this.setPopover();
  }

  @Input() nglTooltip: string | boolean;

  @Input() set nglOpen(_open: boolean) {
    if (_open) {
      this.show();
    } else {
      this.destroy();
    }
  }

  private popover: NglPopover;
  private componentRef: ComponentRef<any>;
  private placement: Direction = 'top';
  private theme: string;
  private tether: Tether;

  constructor(private element: ElementRef, private viewContainer: ViewContainerRef,
              private componentResolver: ComponentResolver, private injector: Injector) {}

  private setTether(create = false) {
    if (!this.tether && !create) return;

    const { attachment, targetAttachment, offset } = placement(this.placement);
    const options = {
      element: this.popover.element.nativeElement,
      target: this.element.nativeElement,
      attachment,
      targetAttachment,
      offset,
    };

    if (create) {
      this.tether = new Tether(options);
    } else {
      this.tether.setOptions(options);
    }

    this.setPopover();
  }

  private setPopover() {
    if (!this.popover) return;

    const { opposite } = placement(this.placement);
    this.popover.nubbin = opposite;
    this.popover.theme = this.theme;
    this.popover.nglTooltip = this.nglTooltip;
  }

  private show() {
    this.componentResolver.resolveComponent(NglPopover).then((cf: ComponentFactory<NglPopover>) => {
      const view: EmbeddedViewRef<any> = this.viewContainer.createEmbeddedView(this.template);
      this.componentRef = this.viewContainer.createComponent(cf, 0, this.injector, [view.rootNodes]);
      this.popover = this.componentRef.instance;
      this.setTether(true);
    });
  }

  private destroy() {
    if (!this.componentRef) return;

    this.tether.destroy();
    this.tether = null;
    this.componentRef.destroy();
    this.componentRef = null;
    this.popover = null;
  }
};
