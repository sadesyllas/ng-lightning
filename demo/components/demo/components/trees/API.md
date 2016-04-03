# `<ngl-tabs>`

### Input

  * `selected: string | number | NglTab`: The tab to activate. This can be either the `index` number, the tabs id *(nglTab="myid")* or the actual `NglTab` instance.
  * `type?: 'default' | 'scoped' = 'default'`: Whether the tabset is [scoped](https://www.lightningdesignsystem.com/components/tabs#scoped) or not.

### Output

  * `selectedChange: EventEmitter<NglTab>`: the tab clicked in order to activate


# `<template ngl-tab>`

### Input

  * `heading: string = ''`: Header text.
  * `ngl-tab?: string`: Tab's ID in case you want to preselect or programmatically manipulate it.

### Output

  * `onActivate: EventEmitter<NglTab>`: called when tab becomes active.
  * `onDeactivate: EventEmitter<NglTab>`: called when tab becomes inactive.
