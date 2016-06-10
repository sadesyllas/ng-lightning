A form contains interactive controls to submit information to a web server.

We don't intend to re-create all the native HTML input elements, but take all the tedious work away from you and at the same time making sure that your native elements have all the appropriate styles and are fully accessible.

Use the `ngl-form-group-alt` to easily switch to the alternate checkbox and radio group style that looks like buttons.

**Accessibility and Keyboard interactions**:

  * `<label>` has a `for` attribute whose value is that input field’s `id`.
  * Input element with error, receives an `aria-describedby` attribute that references the `id` attribute of the error message.
