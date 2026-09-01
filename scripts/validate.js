const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

const extensionPaths = [
  "extensions/anorak-dad-joke",
  "extensions/anorak-status-message",
  "themes",
];

const expectedPackages = {
  "extensions/anorak-dad-joke": "anorak-dad-joke",
  "extensions/anorak-status-message": "anorak-status-message",
  themes: "anorak-themes",
};

const failures = [];

const readJson = (relativePath) => {
  const absolutePath = path.join(root, relativePath);
  try {
    return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  } catch (error) {
    failures.push(`${relativePath}: unable to parse JSON (${error.message})`);
    return null;
  }
};

const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const extensionPath of extensionPaths) {
  const pkg = readJson(path.join(extensionPath, "package.json"));
  if (!pkg) continue;

  assert(
    pkg.name === expectedPackages[extensionPath],
    `${extensionPath}: unexpected package name`,
  );
  assert(
    pkg.publisher === "calebdsharp",
    `${extensionPath}: publisher must be calebdsharp`,
  );
  assert(pkg.version === "1.0.0", `${extensionPath}: version must be 1.0.0`);
  assert(
    pkg.license === "SEE LICENSE IN LICENSE",
    `${extensionPath}: license metadata must point to LICENSE`,
  );
  assert(
    pkg.repository?.url === "https://github.com/calebdsharp/anorak",
    `${extensionPath}: repository URL is incorrect`,
  );
  assert(
    fs.existsSync(path.join(root, extensionPath, "LICENSE")),
    `${extensionPath}: LICENSE is missing`,
  );
  assert(
    fs.existsSync(path.join(root, extensionPath, "README.md")),
    `${extensionPath}: README.md is missing`,
  );
  assert(
    fs.existsSync(path.join(root, extensionPath, "extension.js")),
    `${extensionPath}: extension.js is missing`,
  );
}

const themesPkg = readJson("themes/package.json");
if (themesPkg) {
  const themeEntries = themesPkg.contributes?.themes ?? [];
  assert(
    themeEntries.length === 36,
    `themes: expected 36 registered themes, found ${themeEntries.length}`,
  );

  const labels = new Set();
  const paths = new Set();

  for (const theme of themeEntries) {
    assert(
      typeof theme.label === "string" && theme.label.startsWith("Anorak: "),
      `themes: invalid theme label "${theme.label}"`,
    );
    assert(
      !labels.has(theme.label),
      `themes: duplicate theme label "${theme.label}"`,
    );
    labels.add(theme.label);

    assert(
      typeof theme.path === "string",
      `themes: invalid theme path for "${theme.label}"`,
    );
    assert(
      !paths.has(theme.path),
      `themes: duplicate theme path "${theme.path}"`,
    );
    paths.add(theme.path);

    const fileName = theme.path.replace(/^\.\/themes\//, "");
    assert(
      fs.existsSync(path.join(root, "themes", "themes", fileName)),
      `themes: missing registered theme file "${theme.path}"`,
    );
  }

  const themeDir = path.join(root, "themes", "themes");
  const files = fs
    .readdirSync(themeDir)
    .filter((file) => file.endsWith(".json"));
  assert(
    files.length === 36,
    `themes: expected 36 theme JSON files, found ${files.length}`,
  );

  for (const file of files) {
    assert(
      /-(dark|light)-color-theme\.json$/.test(file),
      `themes: theme filename does not follow the naming convention: ${file}`,
    );
  }

  const extensionSource = fs.readFileSync(
    path.join(root, "themes", "extension.js"),
    "utf8",
  );
  const fontMapEntries = [
    ...extensionSource.matchAll(/"((?:Anorak: ).*?)":\s*/g),
  ].map((match) => match[1]);
  const fontMap = new Set(fontMapEntries);
  assert(
    fontMap.size === 36,
    `themes: expected 36 FONT_MAP entries, found ${fontMap.size}`,
  );

  for (const theme of themeEntries) {
    assert(
      fontMap.has(theme.label),
      `themes: missing FONT_MAP entry for "${theme.label}"`,
    );
  }
}

if (failures.length > 0) {
  console.error("Anorak validation failed:\n");
  for (const failure of failures) console.error(`✗ ${failure}`);
  process.exit(1);
}

console.log("Anorak validation passed.");
console.log(`✓ ${extensionPaths.length} publishable packages`);
console.log("✓ publisher: calebdsharp");
console.log("✓ version: 1.0.0");
console.log("✓ 36 registered themes with matching files and font mappings");
console.log("✓ package READMEs and LICENSE files present");
