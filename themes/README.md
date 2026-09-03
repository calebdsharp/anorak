# Anorak Themes

A curated collection of VS Code color themes, organized into 18 design-led packs with light and dark variants (36 themes total). Each pack includes a matching editor font that can switch in automatically.

## Themes

| Theme                          | Palette                                                                                                                                                                           | Font               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **National Parks Field Guide** | Vintage WPA-poster. Cream paper + forest green + rust (light), deep pine + campfire orange (dark)                                                                                 | `Space Mono`       |
| **Swiss International Style**  | Helvetica-era grid design. Black/white/red, high contrast                                                                                                                         | `IBM Plex Mono`    |
| **Sea Glass**                  | Crisp coastal pastels — teal, sand, soft blue                                                                                                                                     | `Sometype Mono`    |
| **Dust Bloom**                 | Crisp botanical pastels — mauve, sage, dusty pink                                                                                                                                 | `Overpass Mono`    |
| **Slate Orchard**              | Crisp cool pastels — lavender, plum, muted green                                                                                                                                  | `Red Hat Mono`     |
| **Chalk & Clay**               | Crisp warm pastels — terracotta, ochre, chalky neutral                                                                                                                            | `Martian Mono`     |
| **Foggy Pine**                 | Crisp cool pastels — pine, moss, fog grey                                                                                                                                         | `Fragment Mono`    |
| **Watercolor Wash**            | Painterly ink-wash — ultramarine, sap green, ochre, burnt sienna, violet over warm paper (light) or wet indigo paper (dark). Keywords/types render italic for a brushstroke feel. | `Victor Mono`      |
| **Aurora Glass**               | Icy teal/blue/violet aurora tones over a near-black glass ground (dark) or pale glass-white ground (light)                                                                        | `Spline Sans Mono` |
| **Autumn Terminal**            | Cozy amber/rust/olive terminal palette, warm brown-black (dark) or warm cream paper (light)                                                                                       | `Anonymous Pro`    |
| **Golden Hour Studio**         | Warm amber/terracotta studio light, on a warm dark-brown ground (dark) or cream paper (light)                                                                                     | `DM Mono`          |
| **Graph Paper Studio**         | Precise, technical — grid-paper adjacent tones                                                                                                                                    | `Roboto Mono`      |
| **Ink Spill**                  | Bold, saturated ink strokes                                                                                                                                                       | `JetBrains Mono`   |
| **Liquid Glass**               | Sleek, modern, translucent-glass feel                                                                                                                                             | `Chivo Mono`       |
| **Marker Pack**                | Bold, felt-tip marker color blocks                                                                                                                                                | `Kode Mono`        |
| **Night Ferry**                | Moody navy/gold/copper, nighttime harbor tones                                                                                                                                    | `Azeret Mono`      |
| **Pastel Field Notes**         | Soft, notebook-adjacent pastel palette                                                                                                                                            | `Cutive Mono`      |
| **Studio Monochrome**          | Clean, neutral monochrome                                                                                                                                                         | `Ubuntu Mono`      |

Search "Anorak" in the theme picker to see all 18 packs together. New packs can be added over time under the same prefix.

## Fonts

Selecting an Anorak theme sets `editor.fontFamily` to that theme's paired font. This only _sets the preference_ — VS Code can't install fonts for you, so if you don't already have the font, it silently falls back to your system monospace instead. All paired fonts are freely available, primarily through Google Fonts:

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

Install, then either restart VS Code or reselect the theme, and it'll pick them up. Double-click each downloaded `.ttf`/`.otf` and use _Install Font_ (Font Book) rather than just dragging a folder into `~/Library/Fonts` — that validates the font and avoids silent mismatches between the filename and the actual font family name the extension looks for.

The font switch writes to your **global** `editor.fontFamily` setting, so it affects all VS Code windows and projects, not just the current one. To turn this off and keep your own font regardless of theme:

```json
"anorakThemes.autoSwitchFont": false
```

**Known gotcha:** if your `settings.json` file is open with unsaved changes when you switch themes, VS Code will refuse the write and the font won't update. Close or save that file before switching.

## Activating a theme

`Cmd/Ctrl+Shift+P` → `Preferences: Color Theme` → type `Anorak` to see all eighteen packs, or narrow further by pack name (e.g. "Ink Spill").
