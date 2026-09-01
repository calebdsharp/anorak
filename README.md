# Anorak

Anorak is a collection of small, opinionated VS Code extensions and thoughtfully designed themes.

## Packages

### Anorak Themes

18 design-led theme packs with light and dark variants — 36 themes total — plus optional paired editor fonts.

### Anorak Dad Joke

A lightweight status-bar extension that fetches a fresh dad joke on startup and whenever you click it.

### Anorak Status Message

A tiny utility for displaying configurable text on the left side of the VS Code status bar.

## Development

This repository is a pnpm monorepo. Each package is independently versioned and publishable to Open VSX.

```bash
pnpm install
pnpm package
```

To package one extension:

```bash
pnpm package:themes
pnpm package:dad-joke
pnpm package:status-message
```

The generated `.vsix` files are intentionally ignored by Git.

## Publishing

Packages are published independently under the `calebsharp` publisher name. Open VSX publishing requires an `OVSX_PAT` environment variable containing an Open VSX access token.

```bash
pnpm publish:openvsx
```

## License

MIT
