import {Directive, Input, ElementRef, ComponentRef, TemplateRef, ViewContainerRef,
        Renderer, ComponentFactoryResolver, Injector, EmbeddedViewRef, ComponentFactory,
        Output, EventEmitter} from '@angular/core';
import * as Tether from 'tether';
import {NglPopover, Direction} from './popover';
import {placement} from './placements';

@Directive({
  selector: '[nglPopover]',
  exportAs: 'nglPopover',
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

  @Input() set nglPopoverDelay(delay: any | any[]) {
    delay = Array.isArray(delay) ? delay : [delay, delay];
    [this.openDelay, this.closeDelay] = delay.map(Number);
  }

  @Input() set nglOpen(open: boolean) {
    this.toggle(open, open ? this.openDelay : this.closeDelay);
  }

  // Emit an event when actual popover is shown or hidden
  @Output() nglPopoverToggled = new EventEmitter<boolean>();

  private popover: NglPopover;
  private popoverFactory: ComponentFactory<NglPopover>;
  private componentRef: ComponentRef<NglPopover>;
  private placement: Direction = 'top';
  private theme: string;
  private tether: Tether;
  private openDelay = 0;
  private closeDelay = 0;
  private toggleTimeout: any = null;

  constructor(private element: ElementRef, private viewContainer: ViewContainerRef, private injector: Injector,
              private renderer: Renderer, componentFactoryResolver: ComponentFactoryResolver) {
    this.popoverFactory = componentFactoryResolver.resolveComponentFactory(NglPopover);
  }

  // Expose open method
  open(delay = this.openDelay) {
    this.toggle(true, delay);
  }

  // Expose close method
  close(delay = this.closeDelay) {
    this.toggle(false, delay);
  }

  ngOnDestroy() {
    this.destroy();
  }

  private toggle(open: boolean, delay: number) {
    if (this.toggleTimeout) {
      clearTimeout(this.toggleTimeout);
      this.toggleTimeout = null;
    }

    const toggleFn = (open ? this.create : this.destroy).bind(this);

    if (delay > 0) {
      this.toggleTimeout = setTimeout(() => {
        this.toggleTimeout = null;
        toggleFn();
      }, delay);
    } else {
      toggleFn();
    }
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
    this.popover.afterViewInit.subscribe(() => this.tether.position()).unsubscribe();
    this.setTether(true);

    // To avoid unexpected behavior when template "lives" inside an OnPush
    // component, explicitlly request change detection to run on creation.
    this.popover.changeDetector.markForCheck();

    this.nglPopoverToggled.emit(true);
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

    this.nglPopoverToggled.emit(false);
  }
};
