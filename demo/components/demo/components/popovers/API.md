# `[nglPopover]`

### Input

   * `nglPopover: string | TemplateRef`: The content as string or the connected template reference to show.
   * `nglOpen: boolean = false`: Whether popover is visible.
   * `nglPopoverPlacement: 'top' | 'right' | 'bottom' | 'left' = 'top'`: Position relative to host element.
   * `nglPopoverDelay?: number | number[]`: Delay in milliseconds until it opens/closes. If you wish to specify different delays for opening and closing, you may provide an array of two different values.
   * `nglTooltip?: boolean`: Whether popover looks like tooltip.
   * `nglPopoverTheme?: string`: Theme you want to apply. [See available themes.](https://www.lightningdesignsystem.com/components/utilities/themes/#flavor-color)

### Export (nglPopover)

  * `open(delay?: number)`: "Manually" trigger open. Optionally specify a `delay` different than `nglPopoverDelay`'s'.
  * `close(delay?: number)`: "Manually" trigger close. Optionally specify a `delay` different than `nglPopoverDelay`'s'.


# `[nglPopover][nglPopoverBehavior]`
