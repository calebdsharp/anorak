# Anorak Status Message

A small VS Code extension that adds a custom text message to the left side of the status bar. Static display only — not clickable, doesn't run any command.

## Configuring

`Cmd/Ctrl+,` → search "anorak status" → or edit directly in `settings.json`:

```json
"anorakStatusMessage.text": "✨ Anorak",
"anorakStatusMessage.enabled": true
```

- `anorakStatusMessage.text` — the exact string shown. Supports emoji. No length limit, but very long strings will crowd out other status bar items.
- `anorakStatusMessage.enabled` — set to `false` to hide it without uninstalling.

Changes apply immediately — no reload needed.
