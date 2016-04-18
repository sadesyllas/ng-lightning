Notifications keep the user apprised of application state changes or
action results.

Notifications are divided into toasts and alerts with the former
destined to be used mostly for application global events. Toasts are more
suitable for single action results.

Use `<ngl-notification>` as the container of a single notification passing in
the desired type (*toast* or *alert*) and the proper severity of the conveyed
message for proper theming. If it's just an informational message you can omit
passing in a severity keyword (*info*, *success*, *error* and *offline*).

By default, notifications are shown relative to where they have been specified
in markup. For *fixed-to-the-top* notifications just place the
`<ngl-notification>` elements inside a `<div>` decorated with the
`'slds-notify_container'` class.

You can bind to `(nglNotificationClose)` to be apprised of when the close
button has been clicked.

You can set the `[timeout]` attribute to a positive integer (in milliseconds,
including 0) to set a timeout for automatically closing the notification. If the
binding changes, any previous timeout is canceled and if the new binding is
valid as described above, a new timeout is set to that number.
