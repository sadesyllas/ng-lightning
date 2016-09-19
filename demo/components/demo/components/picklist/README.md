You can easily create a picklist just by combining the `<ngl-picklist>` with the `nglPick` directive. Picklists, commonly known as dropdown menus, allow the user to select one or multiple options from a list.

When using the `ngl-picklist` component you can use the `filter` attribute to
set a filtering method for the items. The available options are a `string`,
which is taken to be a property or each item's backing object, a user provided
`function` to be used for filtering or no value at all. In the latter case,
each item is assumed to provide an implementation of the `toString` method.
