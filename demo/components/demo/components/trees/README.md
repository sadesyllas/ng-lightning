Trees provide an intuitive way of displaying hierarchical structures
using folding and indentation to control what is shown at any given moment.

A tree has a single root component (`ngl-tree`) under which any number of
branch (`ngl-tree-branch`) and sub-tree (`ngl-sub-tree`) components may be
nested in any number of levels.

A sub-tree (`ngl-sub-tree`) component has a
user specified trigger, decorated with the attribute `nglSubTreeTrigger`. This
trigger is responsible for collapsing and expanding the sub-tree. Typical
triggers are buttons with an icon inside them, in which case, the `nglButton`
directive along with the `ngl-icon-button` component are an excellent choice.

All tree elements have user specified headings whose root elements are decorated
with the `nglTreeHeading` directive.

**Accessibility and Keyboard interactions**:

  * Selected tab’s anchor has `aria-selected="true"` and `tabindex="0"`, all other tabs’ anchors have `aria-selected="false"` and `tabindex="-1"`
  * Arrow keys, when focus is on selected tab, cycle selection to the next or previous tab
  * `Tab` key, when focus is before the tab list, moves focus to the selected tab
  * `Tab` key, when focus is on selected tab, moves focus into the selected tab’s associated tab panel or to the next focusable element on the page if that panel has no focusable elements
  * `Shift+Tab` keys, when focus is on first element in a tab panel, move focus to the selected tab
