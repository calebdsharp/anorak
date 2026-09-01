const vscode = require("vscode");

// Font pairing per theme label. Fonts are free (Google Fonts) but not bundled here —
// install them yourself for the real thing to render; otherwise this falls back
// through the generic monospace chain silently.
const FONT_MAP = {
  "Anorak: National Parks Field Guide Light":
    "'Space Mono', Menlo, Consolas, monospace",
  "Anorak: National Parks Field Guide Dark":
    "'Space Mono', Menlo, Consolas, monospace",
  "Anorak: Swiss International Style Light":
    "'IBM Plex Mono', Menlo, Consolas, monospace",
  "Anorak: Swiss International Style Dark":
    "'IBM Plex Mono', Menlo, Consolas, monospace",
  "Anorak: Sea Glass Light": "'Sometype Mono', Menlo, Consolas, monospace",
  "Anorak: Sea Glass Dark": "'Sometype Mono', Menlo, Consolas, monospace",
  "Anorak: Dust Bloom Light": "'Overpass Mono', Menlo, Consolas, monospace",
  "Anorak: Dust Bloom Dark": "'Overpass Mono', Menlo, Consolas, monospace",
  "Anorak: Slate Orchard Light": "'Red Hat Mono', Menlo, Consolas, monospace",
  "Anorak: Slate Orchard Dark": "'Red Hat Mono', Menlo, Consolas, monospace",
  "Anorak: Chalk & Clay Light": "'Martian Mono', Menlo, Consolas, monospace",
  "Anorak: Chalk & Clay Dark": "'Martian Mono', Menlo, Consolas, monospace",
  "Anorak: Foggy Pine Light": "'Fragment Mono', Menlo, Consolas, monospace",
  "Anorak: Foggy Pine Dark": "'Fragment Mono', Menlo, Consolas, monospace",
  "Anorak: Watercolor Wash Light": "'Victor Mono', Menlo, Consolas, monospace",
  "Anorak: Watercolor Wash Dark": "'Victor Mono', Menlo, Consolas, monospace",
  "Anorak: Aurora Glass Light": "'Spline Sans Mono', Menlo, Consolas, monospace",
  "Anorak: Aurora Glass Dark": "'Spline Sans Mono', Menlo, Consolas, monospace",
  "Anorak: Autumn Terminal Light": "'Anonymous Pro', Menlo, Consolas, monospace",
  "Anorak: Autumn Terminal Dark": "'Anonymous Pro', Menlo, Consolas, monospace",
  "Anorak: Golden Hour Studio Light": "'DM Mono', Menlo, Consolas, monospace",
  "Anorak: Golden Hour Studio Dark": "'DM Mono', Menlo, Consolas, monospace",
  "Anorak: Graph Paper Studio Light":
    "'Roboto Mono', Menlo, Consolas, monospace",
  "Anorak: Graph Paper Studio Dark": "'Roboto Mono', Menlo, Consolas, monospace",
  "Anorak: Ink Spill Light": "'JetBrains Mono', Menlo, Consolas, monospace",
  "Anorak: Ink Spill Dark": "'JetBrains Mono', Menlo, Consolas, monospace",
  "Anorak: Liquid Glass Light": "'Chivo Mono', Menlo, Consolas, monospace",
  "Anorak: Liquid Glass Dark": "'Chivo Mono', Menlo, Consolas, monospace",
  "Anorak: Marker Pack Light": "'Kode Mono', Menlo, Consolas, monospace",
  "Anorak: Marker Pack Dark": "'Kode Mono', Menlo, Consolas, monospace",
  "Anorak: Night Ferry Light": "'Azeret Mono', Menlo, Consolas, monospace",
  "Anorak: Night Ferry Dark": "'Azeret Mono', Menlo, Consolas, monospace",
  "Anorak: Pastel Field Notes Light":
    "'Cutive Mono', Menlo, Consolas, monospace",
  "Anorak: Pastel Field Notes Dark": "'Cutive Mono', Menlo, Consolas, monospace",
  "Anorak: Studio Monochrome Light": "'Ubuntu Mono', Menlo, Consolas, monospace",
  "Anorak: Studio Monochrome Dark": "'Ubuntu Mono', Menlo, Consolas, monospace",
};

function applyFontForActiveTheme() {
  const config = vscode.workspace.getConfiguration();
  const enabled = config.get("anorakThemes.autoSwitchFont", true);
  if (!enabled) return;

  const themeName = config.get("workbench.colorTheme");
  const fontFamily = FONT_MAP[themeName];
  if (!fontFamily) return; // not one of ours — leave the user's font alone

  const current = config.get("editor.fontFamily");
  if (current === fontFamily) return;

  config.update(
    "editor.fontFamily",
    fontFamily,
    vscode.ConfigurationTarget.Global,
  );
}

function activate(context) {
  // Apply once on startup in case a Anorak theme is already active.
  applyFontForActiveTheme();

  context.subscriptions.push(
    vscode.window.onDidChangeActiveColorTheme(() => applyFontForActiveTheme()),
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
