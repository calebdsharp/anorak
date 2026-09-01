const vscode = require("vscode");

let statusBarItem;

function render() {
  const config = vscode.workspace.getConfiguration("anorakStatusMessage");
  const enabled = config.get("enabled", true);
  const text = config.get("text", "✨ Anorak");

  if (!enabled) {
    statusBarItem.hide();
    return;
  }

  statusBarItem.text = text;
  statusBarItem.color = "#ceff1a";
  statusBarItem.show();
}

function activate(context) {
  // Left side: use StatusBarAlignment.Left. Priority is arbitrary — higher numbers
  // sit further left among other left-aligned items.
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    50,
  );
  // No command assigned — intentionally not clickable.
  context.subscriptions.push(statusBarItem);

  render();

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("anorakStatusMessage")) {
        render();
      }
    }),
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
