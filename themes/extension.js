const vscode = require("vscode");

const FONT_MAP = {
  "Anorak: National Parks Field Guide Light": "Space Mono",
  "Anorak: National Parks Field Guide Dark": "Space Mono",

  "Anorak: Swiss International Style Light": "IBM Plex Mono",
  "Anorak: Swiss International Style Dark": "IBM Plex Mono",

  "Anorak: Sea Glass Light": "Sometype Mono",
  "Anorak: Sea Glass Dark": "Sometype Mono",

  "Anorak: Dust Bloom Light": "Overpass Mono",
  "Anorak: Dust Bloom Dark": "Overpass Mono",

  "Anorak: Slate Orchard Light": "Red Hat Mono",
  "Anorak: Slate Orchard Dark": "Red Hat Mono",

  "Anorak: Chalk & Clay Light": "Martian Mono",
  "Anorak: Chalk & Clay Dark": "Martian Mono",

  "Anorak: Foggy Pine Light": "Fragment Mono",
  "Anorak: Foggy Pine Dark": "Fragment Mono",

  "Anorak: Watercolor Wash Light": "Victor Mono",
  "Anorak: Watercolor Wash Dark": "Victor Mono",

  "Anorak: Aurora Glass Light": "Spline Sans Mono",
  "Anorak: Aurora Glass Dark": "Spline Sans Mono",

  "Anorak: Autumn Terminal Light": "Anonymous Pro",
  "Anorak: Autumn Terminal Dark": "Anonymous Pro",

  "Anorak: Golden Hour Studio Light": "DM Mono",
  "Anorak: Golden Hour Studio Dark": "DM Mono",

  "Anorak: Graph Paper Studio Light": "Roboto Mono",
  "Anorak: Graph Paper Studio Dark": "Roboto Mono",

  "Anorak: Ink Spill Light": "JetBrains Mono",
  "Anorak: Ink Spill Dark": "JetBrains Mono",

  "Anorak: Liquid Glass Light": "Chivo Mono",
  "Anorak: Liquid Glass Dark": "Chivo Mono",

  "Anorak: Marker Pack Light": "Kode Mono",
  "Anorak: Marker Pack Dark": "Kode Mono",

  "Anorak: Night Ferry Light": "Azeret Mono",
  "Anorak: Night Ferry Dark": "Azeret Mono",

  "Anorak: Pastel Field Notes Light": "Cutive Mono",
  "Anorak: Pastel Field Notes Dark": "Cutive Mono",

  "Anorak: Studio Monochrome Light": "Ubuntu Mono",
  "Anorak: Studio Monochrome Dark": "Ubuntu Mono",
};

function applyFontForActiveTheme() {
  const config = vscode.workspace.getConfiguration();
  const enabled = config.get("anorakThemes.autoSwitchFont", true);
  if (!enabled) return;

  const themeName = config.get("workbench.colorTheme");
  const fontFamily = FONT_MAP[themeName];
  if (!fontFamily) return;

  const current = config.get("editor.fontFamily");
  if (current === fontFamily) return;

  config.update(
    "editor.fontFamily",
    fontFamily,
    vscode.ConfigurationTarget.Global,
  );
}

function activate(context) {
  applyFontForActiveTheme();

  context.subscriptions.push(
    vscode.window.onDidChangeActiveColorTheme(() => applyFontForActiveTheme()),
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
