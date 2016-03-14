# `[nglButton]`

### Input

  * `nglButton?: 'neutral' | 'brand' | 'destructive' | 'inverse'`: Buttons theme.


# `[nglButtonIcon]`

### Input

  * `nglButtonIcon?: 'container' | 'border' | 'border-filled' | 'small' | '' = 'border'`: Buttons container.


# `[nglButtonState]`

### Input

  * `nglButtonState: boolean`: Whether button is active or not.

### Output

  * `nglButtonStateChange: EventEmitter<boolean>`: the requested state change.

# `<ngl-icon-button>`

### Input

  * `icon`: You can find the values on the [icon page](https://www.lightningdesignsystem.com/resources/icons/#utility).
  * `size: 'x-small' | 'small' | 'large'`: Icon's size.
  * `align: 'left' | 'right'`: Apply the correct amount of space between the icon and the text.
  * `alt: string`: Assistive text.
