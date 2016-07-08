import {Component, Input, ElementRef, ComponentRef, TemplateRef, ViewContainerRef, Renderer, ComponentFactoryResolver, Injector, EmbeddedViewRef, ComponentFactory} from '@angular/core';
import * as Tether from 'tether';
import {NglPopover, Direction} from './popover';
import {placement} from './placements';

// Use `@Component` instead of `@Directive` to support `precompile`
@Component({
  selector: '[nglPopover]',
  template: `<ng-content></ng-content>`,
  precompile: [NglPopover],
})
export class NglPopoverTrigger {

  @Input() nglPopover: string | TemplateRef<any>;

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
  private popoverFactory: ComponentFactory<NglPopover>;
  private componentRef: ComponentRef<NglPopover>;
  private placement: Direction = 'top';
  private theme: string;
  private tether: Tether;

  constructor(private element: ElementRef, private viewContainer: ViewContainerRef, private injector: Injector,
              private renderer: Renderer, componentFactoryResolver: ComponentFactoryResolver) {
    this.popoverFactory = componentFactoryResolver.resolveComponentFactory(NglPopover);
  }

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
      this.tether.position();
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

    this.componentRef = this.viewContainer.createComponent(this.popoverFactory, 0, this.injector, [this.projectableNodes]);
    this.popover = this.componentRef.instance;
    this.setTether(true);

    // To avoid unexpected behavior when template "lives" inside an OnPush
    // component, explicitlly request change detection to run on creation.
    this.popover.changeDetector.markForCheck();
  }

  private get projectableNodes() {
    if (this.nglPopover instanceof TemplateRef) {
      const view: EmbeddedViewRef<any> = this.viewContainer.createEmbeddedView(<TemplateRef<any>>this.nglPopover);
      return view.rootNodes;
    } else {
      return [this.renderer.createText(null, <string>this.nglPopover)];
    }
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
