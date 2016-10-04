Add non-modal overlays of content next to any element. Popovers can be used to show and behave anyway that you want, thus supporting many use cases, like classic tooltips, opening on click etc.

The popover directives support multiple placements.

Use a `string` or a `<template #ref>` to host your popover's content. `#` reference will be later used to "connect" with the desired `nglPopover` directive.

If you don't need to expicitly handle when a popover/tooltip is opened, you can just add `nglPopoverBehavior` attribute, that will take care to open it when the user hovers or tabs into the trigger and disappear it when the user hovers off or tabs away.

If you want to delay the opening and closing of the popover/tooltip, you can use the `nglPopoverDelay` to specify the amount of time in milliseconds.
