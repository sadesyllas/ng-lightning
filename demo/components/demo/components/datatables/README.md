Datatables are an enhanced version of an HTML table and are used to display tabular data.

You should provide an array of objects in the `[data]` property and define each column using a `ngl-datatable-column` component.

Optionally, you can specify a template inside a column, that will be used to render each cell of this column. Inside this template you can have access to the implicit value of the cell, it's `index` and the `row`'s' data.

You can easily support sorting by adding the `sortable` on each column that you want to be sortable, and listen to `sortChange` events that produce event objects like `<INglDatatableSort>{ key: 'key of sorted column', order: 'asc or desc'}`.

You can optionally specify a `template[nglLoadingOverlay]` thats gets displayed when it is `loading` data, and a `template[nglNoRowsOverlay]` to be displayed when there are no rows to show.
