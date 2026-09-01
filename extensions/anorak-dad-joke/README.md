# Anorak Dad Joke

Shows a random dad joke on the left side of the status bar, fetched live from [icanhazdadjoke.com](https://icanhazdadjoke.com) when VS Code starts. Click it to fetch a new one on demand.

## How it works

- On launch, the extension calls `GET https://icanhazdadjoke.com/` with an `Accept: application/json` header and displays the returned joke.
- The status bar item is clickable — clicking it runs the `Anorak Dad Joke: Get a New Joke` command, which fetches a fresh joke.
- If the request fails (no internet, API down, timeout), the status bar shows a short failure message instead of crashing; hover for the actual error, and click to retry.
- Long jokes are truncated in the status bar (configurable) but always shown in full on hover.

## Configuring

`Cmd/Ctrl+,` → search "anorak dad joke" → or edit directly in `settings.json`:

```json
"anorakDadJoke.enabled": true,
"anorakDadJoke.maxLength": 80
```

- `anorakDadJoke.enabled` — set to `false` to hide the item without uninstalling.
- `anorakDadJoke.maxLength` — how many characters to show before truncating with `…`. Hover always shows the full joke regardless of this setting.

## Local development

**Package and install locally**

From this directory, run `pnpm package` to create a `.vsix`, then install it with VS Code or `code --install-extension`.

**Development symlink**

```
ln -s /path/to/anorak-dad-joke ~/.vscode/extensions/anorak-dad-joke
```

Then reload VS Code. After that, edits to `extension.js` just need `Developer: Reload Window`.

## Notes

- Requires internet access at launch and on each click — this extension intentionally does not bundle an offline joke list, per the live-API design.
- icanhazdadjoke.com is a free public API with no key required; the extension sends a descriptive `User-Agent` per their API etiquette guidelines.
- No telemetry, no other network calls — the only outbound request this extension makes is the joke fetch itself.
