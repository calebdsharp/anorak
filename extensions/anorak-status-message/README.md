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

## Local development

**Package and install locally**

From this directory, run `pnpm package` to create a `.vsix`, then install it with VS Code or `code --install-extension`.

**Development symlink**

```
ln -s /path/to/anorak-status-message ~/.vscode/extensions/anorak-status-message
```

Then reload VS Code. After that, edits to `extension.js` just need `Developer: Reload Window`.

## How it works

`extension.js` creates one `StatusBarItem` aligned left (`vscode.StatusBarAlignment.Left`) on activation, sets its text from the `anorakStatusMessage.text` setting, and shows it. It listens for configuration changes and re-renders whenever `anorakStatusMessage.*` settings change, so edits in Settings take effect without a reload.

No `command` is assigned to the item, so it isn't clickable — hovering shows the plain text with no action.
