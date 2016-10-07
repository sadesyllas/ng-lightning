# `<ngl-modal>`

### Content

  * `[body]`: Body content.
  * `[tagline]`: If you need to provide additional context inside the header.
  * `template[ngl-modal-footer]`: Contains buttons displayed on modal's footer.

### Input

  * `header?: string`: Heading text.
  * `open?: boolean`: Whether modal is visible or not.
  * `size?: 'large'`:  Whether modal has large or default size.
  * `directional: boolean = false`:  Whether buttons inside footer spread to both left and right.

### Output

  * `openChange: EventEmitter<boolean>`: emitted when modal's visibility is going to change to `false`

# `template[nglModalHeader]`

### Variables

  * `id: string`: Auto generated unique ID used for accessibility.
