# `<ngl-form-element>`

### Input
  * `nglFormLabel: string`: Input label.
  * `nglFormError?: string`: Error message.

### Content

  * `<input> | <textarea> | <select>`: Native element. `required` value will be used to toggle label's indicator.


# `<fieldset[ngl-form-group]>`

### Input
  * `nglFormLabel: string`: Input label.
  * `nglFormError?: string`: Error message.
  * `nglFormRequired?: boolean = false`: Wheter it is required.

# `<ngl-form-group-element>`

### Content

  * `<input type="checkbox|radio">`: Native element checkbox or radio element. For radio input name will automatically be set to same value.
