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

  @Input() set nglOpen(open: boolean) {
    if (open) {
      this.create();
    } else {
      this.destroy();
    }
  }

  private popover: NglPopover;
  private componentRef: ComponentRef<any>;
  private placement: Direction = 'top';
  private theme: string;
  private tether: Tether;
  private initPositionTimeout: number;

  constructor(private element: ElementRef, private viewContainer: ViewContainerRef,
              private componentResolver: ComponentResolver, private injector: Injector) {}

  ngOnDestroy() {
    this.destroy();
  }

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
      this.initPositionTimeout = setTimeout(() => this.tether.position());
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

  private create() {
    if (this.componentRef) return;

    this.componentResolver.resolveComponent(NglPopover).then((cf: ComponentFactory<NglPopover>) => {
      const view: EmbeddedViewRef<any> = this.viewContainer.createEmbeddedView(this.template);
      this.componentRef = this.viewContainer.createComponent(cf, 0, this.injector, [view.rootNodes]);
      this.popover = this.componentRef.instance;
      this.setTether(true);

      // To avoid unexpected behavior when template "lives" inside an OnPush
      // component, explicitlly request change detection to run on creation.
      this.popover.changeDetector.markForCheck();
    });
  }

  private destroy() {
    if (!this.componentRef) return;

    this.tether.destroy();
    this.tether = null;
    clearTimeout(this.initPositionTimeout);
    this.componentRef.destroy();
    this.componentRef = null;
    this.popover = null;
  }
};
