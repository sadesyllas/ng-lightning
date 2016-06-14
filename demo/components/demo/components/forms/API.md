# `<ngl-form-element>`

### Input
  * `nglFormLabel?: string | TemplateRef`: Input label.
  * `nglFormError?: string`: Error message.

### Content

  * `<input> | <textarea> | <select>`: Native element. `required` value will be used to toggle label's indicator.
  * `template[nglFormLabel]?`: Input template label.


# `<fieldset[ngl-form-group], fieldset[ngl-form-group-alt]>`

### Input
  * `nglFormLabel?: string`: Group label.
  * `nglFormError?: string`: Error message.
  * `nglFormRequired?: boolean = false`: Wheter it is required.

### Content

  * `template[nglFormLabel]?`: Group template label.

# `<label[ngl-form-group-element]>`

### Content

  * `<input type="checkbox|radio">`: Native element checkbox or radio element. For radio input name will automatically be set to same value for all.
  * `template[nglFormLabel]?`: Input template label.
