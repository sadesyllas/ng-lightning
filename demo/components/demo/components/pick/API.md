# `[nglPick]`

### Input
  * `nglPick`: currently selected option value.
  * `nglPickMultiple?: boolean = false`: whether multiple options can be selected. In this case `nglPick` value should be an array or object.

### Output
  * `nglPickChange`: the value that is going to be selected when a `nglPickOption` is clicked.


# `[nglPickOption]`

### Input

  * `nglPickOption: any`: option's value.
  * `activeClass: string = 'slds-button--brand'`: define a custom class to be used when the option is selected.
