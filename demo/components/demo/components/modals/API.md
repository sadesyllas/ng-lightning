# `<ngl-modal>`

### Content

  * `[body]`: Body content.
  * `[tagline]`: If you need to provide additional context inside the header.
  * `button`: Action buttons displayed on modal's footer.

### Input

  * `header: string`: Heading text.
  * `open: boolean`: Whether modal is visible or not.
  * `size?: 'large'`:  Whether modal has large or default size.

### Output

  * `openChange: EventEmitter<boolean>`: emitted when modal's visibility is going to change to `false`
