# `<ngl-form-element>`

### Input
  * `label?: string | TemplateRef`: Input label.
  * `error?: string`: Error message.

### Content

  * `<input> | <textarea> | <select>`: Native element. `required` value will be used to toggle label's indicator.
  * `template[nglFormLabel]?`: Input template label.


# `<ngl-form-checkbox> | <ngl-form-checkbox-toggle>`

### Input
  * `label?: string | TemplateRef`: Input label.
  * `error?: string`: Error message.
  * `enabledText?: string = 'Enabled'`: Displayed string when enabled (ngl-form-checkbox-toggle only).
  * `disabledText?: string = 'Disabled'`: Displayed string when disabled (ngl-form-checkbox-toggle only).

### Content

  * `<input>`: Native element. `required` value will be used to toggle label's indicator.
  * `template[nglFormLabel]?`: Input template label.


# `<fieldset[ngl-form-group], fieldset[ngl-form-group-alt]>`

### Input
  * `label?: string`: Group label.
  * `error?: string`: Error message.
  * `required?: boolean = false`: Whether it is required.

### Content

  * `template[nglFormLabel]?`: Group template label.

# `<ngl-form-group-element>`

### Content

  * `<input type="checkbox|radio">`: Native element checkbox or radio element. For radio input name will automatically be set to same value for all.
  * `template[nglFormLabel]?`: Input template label.
