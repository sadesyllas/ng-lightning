# `<ngl-pagination>`

### Input

  * `page: number`: Current page number.
  * `total: number`: Total number of items in all pages.
  * `limit?: number = 0`:  Limit number of visible pages. A value less than one indicates that there is no limitation.
  * `perPage?: number = 10`: Maximum number of items per page.

### Output

  * `pageChange: EventEmitter<number>`: the page clicked in order to select
