# `table[ngl-datatable]`

### Input

  * `data: any[]`: Data to be displayed as rows in the table.
  * `dataTrackByKey?: string`: Unique object property of data, useful for internal tracking.
  * `bordered: boolean = true`: Adds borders to the table.
  * `striped: boolean = true`: Adds stripes to alternating rows.


# `ngl-datatable-column`

### Input

  * `heading: string`: Header text of column.
  * `dataKey?: string`: Object property of data. If not specified you should provide a custom template.

# `template[nglDatatableCell]`

### Variables

  * `$implicit`: Cell value, if `dataKey` has been defined for this column.
  * `row: any`: Object data.
  * `index: number`: Row index.
