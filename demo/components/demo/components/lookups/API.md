# `<ngl-lookup>`

### Input

  * `pick: any`: currently selected
  * `lookup: (value: string): Observable<any[]> | any[]`: callback to invoke to search for suggestions
  * `value?: string`: input filter value
  * `field?: string`: field of a suggested object to use as label
  * `debounce?: number = 200`:  delay so that the actual value update only takes place when a timer expires. A value of 0 triggers an immediate update
  * `searchIcon?: boolean = true`: whether search icon is displayed inside the input
  * `noResultsText? = 'No results found'`: message to be displayed when no match

### Output

  * `valueChange: EventEmitter<string>`: current input value
  * `pickChange: EventEmitter<any>`: callback when a suggestion is selected

### Content

  * `template[nglLookupItem]?`: Custom suggestion template inside popup menu.
  * `template[nglPolymorphicLabel]`: Label for selected scope of a polymorphic lookup.

# template[nglPolymorphicItem]

### Input

  * `scopes: any[]`: available scope items

### Output

  * `scopeChange: EventEmitter<any>`: selected scope item
