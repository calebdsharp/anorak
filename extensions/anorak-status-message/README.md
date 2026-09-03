# Anorak Status Message

A small VS Code extension that adds a custom text message to the left side of the status bar.

## Changing the message

Click the Anorak status bar message to change it directly.

You can also run **Anorak: Change Status Message** from the Command Palette.

## Configuring

For additional configuration, open Settings with `Cmd/Ctrl+,` and search for "anorak status", or edit `settings.json` directly:

```json
"anorakStatusMessage.text": "[Anorak]",
"anorakStatusMessage.enabled": true
```

- `anorakStatusMessage.text` — the exact string shown. Supports emoji. No length limit, but very long strings will crowd out other status bar items.
- `anorakStatusMessage.enabled` — set to `false` to hide it without uninstalling.

Changes apply immediately — no reload needed.
