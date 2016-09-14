# `table[ngl-datatable]`

### Input

  * `data: any[]`: Data to be displayed as rows in the table.
  * `sort: INglDatatableSort`: Sorting state object as `{ key: '<column key>', order: '<asc|desc>'}`
  * `trackByKey?: string`: Unique object property of data, useful for internal tracking.
  * `loading?: boolean`: Whether loading overlay should be displayed.
  * `bordered: boolean = true`: Adds borders to the table.
  * `striped: boolean = true`: Adds stripes to alternating rows.

### Output

  * `sortChange: EventEmitter<INglDatatableSort>`: Requested sort as `{ key: '<column key>', order: '<asc|desc>'}`
  * `onRowClick: EventEmitter<INglDatatableRowClick>`: Invoked when a row is clicked passing original `Event` and row's data, as `{event: Event, data: any}`

# `ngl-datatable-column`

### Input

  * `heading: string`: Header text of column. It will also be used as `title` and as header on small screens even if a custom header template is used.
  * `key?: string`: Object property of data. If not specified you should provide a custom template.
  * `sortable?: boolean`: Whether it is sortable or not. `key` should be always defined for sortable columns
  * `cellClass?: string | string[]`: Style class(es) for each cell of this column. Use as `ngClass`

# `template[nglDatatableCell]`

### Variables

  * `$implicit`: Cell value, if `key` has been defined for this column.
  * `row: any`: Object data.
  * `index: number`: Row index.

# `template[nglLoadingOverlay]`

# `template[nglNoRowsOverlay]`

# `template[nglDatatableHeading]`

 * Used inside a `<ngl-datatable-column>` to provide a custom header template.
