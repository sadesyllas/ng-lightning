# `<ngl-notification>`

### Input

  * `type: 'toast' | 'alert' = 'toast'`: The type of this notification.
  * `severity?: string`: The severity of the displayed message for theming.
  * `assistiveText?: string`:  The component's assistive text element.
  * `closeAssistiveText?: string = 'Close'`: The component's assistive text for the close button element.
  * `timeout?: number`: The number of milliseconds after which, the close event will be triggered with an emitted reason of `'timeout'`.
  If anything other than a positive integer is provided, any active timeout will be canceled.

### Output

  * `nglNotificationClose: EventEmitter<string>`: Emits the close event, whenever the close button is clicked,
  with the `$event` set to `'button'`. If not bound, the close button will not be shown.

### API <em style="font-size: .75rem;">(`<ngl-notification>` is exported to the containing scope as `nglNotification`)</em>

  * `close(reason?: string)`: Emits the close event and passes the provided `reason` string.
