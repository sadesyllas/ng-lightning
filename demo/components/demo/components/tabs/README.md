An *intuitive*, *efficient* and *fully accessible* implementation of tabset/tabs.

Each pane is only instantiated while it is visible. Panes which are not visible are released and do not have associated memory, DOM and change detection cost.

Tab's header can contain HTML either by passing a template reference as `heading` or by using the more verbose syntax, with `<ngl-tab>`, `<ngl-tab-heading>` and `<ngl-tab-content>`. 

**Accessibility and Keyboard interactions**:

  * Selected tab’s anchor has `aria-selected="true"` and `tabindex="0"`, all other tabs’ anchors have `aria-selected="false"` and `tabindex="-1"`
  * Arrow keys, when focus is on selected tab, cycle selection to the next or previous tab
  * `Tab` key, when focus is before the tab list, moves focus to the selected tab
  * `Tab` key, when focus is on selected tab, moves focus into the selected tab’s associated tab panel or to the next focusable element on the page if that panel has no focusable elements
  * `Shift+Tab` keys, when focus is on first element in a tab panel, move focus to the selected tab
