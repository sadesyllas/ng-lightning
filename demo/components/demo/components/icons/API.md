# `<ngl-icon>`

### Input

  * `icon`: You can find the values on the [icon page](https://www.lightningdesignsystem.com/resources/icons/#utility).
  * `category: 'action' | 'custom' | 'doctype' | 'standard' | 'utility' = 'utility'`: Category sprite to use.
  * `type?: 'default' | 'warning' | 'error'`:  Icon's color.
  * `size: 'x-small' | 'small' | 'large'`: Icon's size.
  * `svgClass: string | string[] = ''`: Extra class(es) you want to apply to SVG element.
  * `alt: string`: Assistive text.

### Attribute

  * `button? boolean`: Whether it lives inside a button, in order to apply the appropriate styles. If not explicitly set, it will try to determine it based on the parent directives, `nglButton` or `nglButtonIcon`.


# `<svg nglIcon>`

### Input

  * `nglIcon`: You can find the values on the [icon page](https://www.lightningdesignsystem.com/resources/icons/#utility).
  * `nglIconCategory = 'utility'`: Category sprite to use.
