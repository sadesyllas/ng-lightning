# `[nglPick]`

### Input
  * `nglPick`: currently selected option value.
  * `nglPickMultiple?: boolean = false`: whether multiple options can be selected. In this case `nglPick` value should be an array or object.
  * `nglPickActiveClass: string`: define a custom class to be used when any of the options is selected

### Output
  * `nglPickChange`: the value that is going to be selected when a `nglPickOption` is clicked.
  * `nglOptionDestroyed`: emits the value of any *selected* option that is destroyed (ie `*ngIf`)


# `[nglPickOption]`

### Input

  * `nglPickOption: any`: option's value.
  * `nglPickActiveClass: string`: define a custom class to be used when the option is selected. Overrides parent's `nglPick` active class if defined.
