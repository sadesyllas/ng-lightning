# `<ngl-pagination>`

### Input

  * `page: number`: Current page number.
  * `total: number`: Total number of items in all pages.
  * `limit?: number = 0`:  Limit number of visible pages. A value less than one indicates that there is no limitation.
  * `boundaryLinks?: boolean = false`: Whether to display First / Last buttons.
  * `boundaryNumbers?: number = 0`: Define how many of the first and last page numbers to always show.
  * `perPage?: number = 10`: Maximum number of items per page.

### Output

  * `pageChange: EventEmitter<number>`: the page clicked in order to select

### Export

  * `start: number`: Starting row index of current page
  * `end: number`: Last row index of current page
