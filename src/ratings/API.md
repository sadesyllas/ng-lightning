# `<ngl-rating>`

### Attribute

  * `max?: number = 5`: Maximum rate number.

### Input

  * `rate: number`: Current rate.
  * `isReadonly?: boolean = false`: Prevent user's interaction.
  * `icon?: string = 'favorite'`: Icon used to display the available rates.

### Output

  * `rateChange: EventEmitter<number>`: the clicked rate
  * `hover: EventEmitter<number>`: the currently hovered rate
