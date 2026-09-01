# Anorak Themes

A curated collection of VS Code color themes, organized into 18 design-led packs with light and dark variants (36 themes total). Each pack includes a matching editor font that can switch in automatically.

## Themes

| Theme | Palette | Font |
|---|---|---|
| **National Parks Field Guide** | Vintage WPA-poster. Cream paper + forest green + rust (light), deep pine + campfire orange (dark) | `Space Mono` |
| **Swiss International Style** | Helvetica-era grid design. Black/white/red, high contrast | `IBM Plex Mono` |
| **Sea Glass** | Crisp coastal pastels — teal, sand, soft blue | `Sometype Mono` |
| **Dust Bloom** | Crisp botanical pastels — mauve, sage, dusty pink | `Overpass Mono` |
| **Slate Orchard** | Crisp cool pastels — lavender, plum, muted green | `Red Hat Mono` |
| **Chalk & Clay** | Crisp warm pastels — terracotta, ochre, chalky neutral | `Martian Mono` |
| **Foggy Pine** | Crisp cool pastels — pine, moss, fog grey | `Fragment Mono` |
| **Watercolor Wash** | Painterly ink-wash — ultramarine, sap green, ochre, burnt sienna, violet over warm paper (light) or wet indigo paper (dark). Keywords/types render italic for a brushstroke feel. | `Victor Mono` |
| **Aurora Glass** | Icy teal/blue/violet aurora tones over a near-black glass ground (dark) or pale glass-white ground (light) | `Spline Sans Mono` |
| **Autumn Terminal** | Cozy amber/rust/olive terminal palette, warm brown-black (dark) or warm cream paper (light) | `Anonymous Pro` |
| **Golden Hour Studio** | Warm amber/terracotta studio light, on a warm dark-brown ground (dark) or cream paper (light) | `DM Mono` |
| **Graph Paper Studio** | Precise, technical — grid-paper adjacent tones | `Roboto Mono` |
| **Ink Spill** | Bold, saturated ink strokes | `JetBrains Mono` |
| **Liquid Glass** | Sleek, modern, translucent-glass feel | `Chivo Mono` |
| **Marker Pack** | Bold, felt-tip marker color blocks | `Kode Mono` |
| **Night Ferry** | Moody navy/gold/copper, nighttime harbor tones | `Azeret Mono` |
| **Pastel Field Notes** | Soft, notebook-adjacent pastel palette | `Cutive Mono` |
| **Studio Monochrome** | Clean, neutral monochrome | `Ubuntu Mono` |

Search "Anorak" in the theme picker to see all 18 packs together. New packs can be added over time under the same prefix.

## Fonts

Selecting an Anorak theme sets `editor.fontFamily` to that theme's paired font. This only *sets the preference* — VS Code can't install fonts for you, so if you don't already have the font, it silently falls back to your system monospace instead. All paired fonts are freely available, primarily through Google Fonts:

- [Space Mono](https://fonts.google.com/specimen/Space+Mono)
- [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
- [Sometype Mono](https://fonts.google.com/specimen/Sometype+Mono)
- [Overpass Mono](https://fonts.google.com/specimen/Overpass+Mono)
- [Red Hat Mono](https://fonts.google.com/specimen/Red+Hat+Mono)
- [Martian Mono](https://fonts.google.com/specimen/Martian+Mono)
- [Fragment Mono](https://fonts.google.com/specimen/Fragment+Mono)
- [Victor Mono](https://rubjo.github.io/victor-mono/) (also on [Google Fonts](https://fonts.google.com/specimen/Victor+Mono)) — its cursive italics are what carry Watercolor Wash's brushstroke feel, worth actually installing rather than falling back
- [Spline Sans Mono](https://fonts.google.com/specimen/Spline+Sans+Mono)
- [Anonymous Pro](https://fonts.google.com/specimen/Anonymous+Pro)
- [DM Mono](https://fonts.google.com/specimen/DM+Mono)
- [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono)
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- [Chivo Mono](https://fonts.google.com/specimen/Chivo+Mono)
- [Kode Mono](https://fonts.google.com/specimen/Kode+Mono)
- [Azeret Mono](https://fonts.google.com/specimen/Azeret+Mono)
- [Cutive Mono](https://fonts.google.com/specimen/Cutive+Mono)
- [Ubuntu Mono](https://fonts.google.com/specimen/Ubuntu+Mono)

Install, then either restart VS Code or reselect the theme, and it'll pick them up. Double-click each downloaded `.ttf`/`.otf` and use *Install Font* (Font Book) rather than just dragging a folder into `~/Library/Fonts` — that validates the font and avoids silent mismatches between the filename and the actual font family name the extension looks for.

The font switch writes to your **global** `editor.fontFamily` setting, so it affects all VS Code windows and projects, not just the current one. To turn this off and keep your own font regardless of theme:

```json
"anorakThemes.autoSwitchFont": false
```

**Known gotcha:** if your `settings.json` file is open with unsaved changes when you switch themes, VS Code will refuse the write and the font won't update. Close or save that file before switching.

## Local development

For development, package the extension from this directory with `pnpm package` and install the resulting `.vsix` with VS Code. You can also symlink the extension folder into your VS Code extensions directory and use `Developer: Reload Window` while iterating.

## Activating a theme

`Cmd/Ctrl+Shift+P` → `Preferences: Color Theme` → type `Anorak` to see all eighteen packs, or narrow further by pack name (e.g. "Ink Spill").

## Adding a new theme

1. Add a new `<name>-color-theme.json` file under `themes/`.
2. Add one entry to `package.json`'s `contributes.themes` array (`label`, `uiTheme`, `path`) — keep the `Anorak: ` prefix on the label.
3. Add a font pairing for it in `FONT_MAP` in `extension.js` — every registered theme should have one, or its font-switch silently does nothing.
4. Bump `version` in `package.json`.
5. Run `pnpm package` from this directory.
6. Install the generated `.vsix` to test it locally.

**Always build both light and dark for a new pack together** — a pack with only one variant registered breaks the "search Anorak, get a clean list" experience and is easy to forget about later.

## Modifying an existing theme

Edit hex values directly in that theme's JSON file (`colors` for UI, `tokenColors` for syntax highlighting), bump the version, repackage, reinstall.

## Fast iteration while tweaking

Instead of repackaging a `.vsix` every time, symlink the whole extension folder into `~/.vscode/extensions/`, edit the JSON or `extension.js`, then run `Developer: Reload Window` from the command palette. Only package a `.vsix` once you're happy and want a portable, shareable artifact.

## Repo hygiene

A `.vscodeignore` file keeps `.vsix` build artifacts, `.DS_Store`, and generator scripts out of packaged extensions. After packaging a new version, delete old `.vsix` files from the project folder rather than letting them accumulate — they're not needed once installed, and `vsce package` will otherwise bundle them into the next build.
