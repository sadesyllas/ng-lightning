# `<ngl-icon>`

### Input

  * `icon`: You can find the values on the [icon page](https://www.lightningdesignsystem.com/resources/icons/#utility).
  * `type?: 'default' | 'warning' | 'error' = 'default'`:  Icon's color.
  * `size: 'x-small' | 'small' | 'large'`: Icon's size.
  * `svgClass: string | string[] = ''`: Extra class(es) you want to apply to SVG element.
  * `alt: string`: Assistive text.

### Attribute

  * `button? boolean`: Whether it lives inside a button, in order to apply the appropriate styles. If not explicitly set, it will try to determine it based on the parent directives, `nglButton` or `nglButtonIcon`.
