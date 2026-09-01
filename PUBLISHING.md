# Publishing Anorak

Anorak publishes three independent VS Code extensions to Open VSX under the `calebsharp` namespace.

## Prerequisites

Before the first publication:

1. Sign in to [Open VSX](https://open-vsx.org) with the GitHub account that owns the Anorak repository.
2. Complete the Eclipse Foundation Publisher Agreement.
3. Create an Open VSX access token.
4. Create the `calebsharp` namespace with that token.
5. Claim ownership of the namespace so the publisher can be shown as verified.

Open VSX uses the extension `publisher` field as the namespace. All Anorak packages use `calebsharp`.

## Local publishing

Never commit an Open VSX token.

Set the token in your shell:

```bash
export OVSX_PAT="your-token"
```

Validate and package everything first:

```bash
pnpm validate
pnpm package
```

Publish one package:

```bash
pnpm publish:openvsx:themes
pnpm publish:openvsx:dad-joke
pnpm publish:openvsx:status-message
```

Or publish all three:

```bash
pnpm publish:openvsx
```

The `ovsx` CLI reads `OVSX_PAT` automatically.

## GitHub Actions publishing

The repository contains `.github/workflows/publish-openvsx.yml`.

Create a GitHub Actions environment named `openvsx`, then add an environment secret named:

```text
OVSX_PAT
```

The workflow is intentionally manual. From GitHub:

1. Open **Actions**.
2. Select **Publish to Open VSX**.
3. Select **Run workflow**.
4. Choose `all` or an individual package.
5. Start the workflow.

The workflow installs from the lockfile, validates the repository, packages all extensions, and then publishes the selected package(s).

## Versioning

Each publishable extension has its own version. Open VSX does not allow republishing an existing extension version, so increment the package version before publishing a new release.

The monorepo root version is not the release version for the extensions.

## Release checklist

Before publishing a new version:

```bash
pnpm install
pnpm validate
pnpm package
```

Then install each generated `.vsix` locally and smoke-test it in VS Code.

Confirm:

- the extension activates correctly
- settings work
- commands work
- theme paths resolve
- both light and dark variants are present
- no development files are included
- the package version is new
- the README and metadata are accurate

Only then publish.
