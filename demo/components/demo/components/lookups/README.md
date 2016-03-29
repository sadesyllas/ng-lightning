Lookup is an advanced inline search form.

You should provide a `lookup` method to query for suggestions. If you want to let user choose between objects, you should define the `field` property that will be used as suggestion's label.

**Accessibility and Keyboard interactions**:

  * Input field has an `aria-expanded` attribute whose value is false when the results list is hidden, true when the results list is visible
  * Escape key collapses the results list
