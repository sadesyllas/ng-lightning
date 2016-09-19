# `ngl-picklist[nglPick]`

### Input

  * `open: boolean`: Whether the dropdown should be open or not.
  * `data: any[]`: Data to be displayed as options in the dropdown menu.
  * `disabled?: boolean = false`: Whether trigger is disabled.
  * `fluid?: boolean = false`: Whether width of label and dropdown inherit width of its content.
  * `filter?: string | function | ''`: The method used to filter the displayed items.
  * `filterPlaceholder?: string`: The placeholder to display for the filter input field.

### Output

  * `openChange: EventEmitter<boolean>`: Whether the dropdown is open.

### Content

  * `ng-content`: Label.
  * `<template nglPicklistItem>`: Template used to render each option.
