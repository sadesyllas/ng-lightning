# `[nglDropdown]`

### Input

  * `open: boolean`: Whether the dropdown should be open or not.
  * `handlePageEvents?: boolean`: Whether the dropdown should handle page events (e.g., clicking on the page closes the dropdown).

### Output

  * `openChange: EventEmitter<boolean>`: Whether the dropdown is open.

# `[nglDropdownTrigger]`

### Input

  * *None*

### Output

  * *None*

# `[nglDropdownItem]`

### Input

  * *None*

### Output

  * *None*

# `ngl-picklist[nglPick]`

### Input

  * `open: boolean`: Whether the dropdown should be open or not.
  * `data: any[]`: Data to be displayed as options in the dropdown menu.
  * `disabled?: boolean = false`: Whether trigger is disabled.
  * `fluid?: boolean = false`: Whether width of label and dropdown inherit width of its content.

### Output

  * `openChange: EventEmitter<boolean>`: Whether the dropdown is open.

### Content

  * `ng-content`: Label.
  * `<template nglPicklistItem>`: Template used to render each option.
