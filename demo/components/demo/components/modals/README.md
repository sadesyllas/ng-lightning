Modals are used to display content in a layer above the application.

Their size and visibility can be toggled by the user and their position inside  DOM is irrelevant, making it's usage in a component architecture a breeze.

If you want to display a totally custom header, just use a `<template nglModalHeader>` inside the `<ngl-modal>`.

**Accessibility and Keyboard interactions**:

  * Focus is trapped, meaning that `Tab` key at bottom of modal cycles focus back to first focusable element at top of modal
  * `Esc` key closes the modal
