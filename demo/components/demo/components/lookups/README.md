Lookup is an advanced inline search form.

You should provide a `lookup` method to query for suggestions. If you want to let user choose between objects, you should define the `field` property that will be used as suggestion's label.

<div class="slds-box slds-box--small slds-m-bottom--small">
**Heads up!**  Use an arrow function for lookup methods, since they are *expected* to be passed around and you want to keep the `this` binding.
</div>

If you want to create a **polymorphic** lookup, you have to provide a `nglPolymorphicItem` template to be rendered for each scope in the dropdown. The element having `nglPolymorphicLabel` attribute, will be used as the content of the active scope.

**Accessibility and Keyboard interactions**:

  * Input field has an `aria-expanded` attribute whose value is false when the results list is hidden, true when the results list is visible
  * Input field has an `aria-activedescendant` attribute whose value is the id of the highlighted results list option, no value if nothing’s highlighted in the list
  * `Up` and `Down` arrow keys cycle through the available options in the list and update the input field’s `aria-activedescendant` value
  * `Enter` key selects highlighted option and collapses the results list
  * `Escape` key collapses the results list
