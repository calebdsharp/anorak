const vscode = require("vscode");

let statusBarItem;

const render = () => {
  const config = vscode.workspace.getConfiguration("anorakStatusMessage");
  const enabled = config.get("enabled", true);
  const text = config.get("text", "[Anorak]");

  if (!enabled) {
    statusBarItem.hide();
    return;
  }

  statusBarItem.color = "#ceff1a";
  statusBarItem.text = text;
  statusBarItem.show();
};

const activate = (context) => {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    50,
  );

  statusBarItem.command = "anorakStatusMessage.change";
  statusBarItem.tooltip = "Click to change Anorak status message";

  context.subscriptions.push(statusBarItem);

  const changeMessage = vscode.commands.registerCommand(
    "anorakStatusMessage.change",
    async () => {
      const config = vscode.workspace.getConfiguration("anorakStatusMessage");
      const current = config.get("text", "[Anorak]");

      const text = await vscode.window.showInputBox({
        prompt: "Enter the message to display in the status bar",
        title: "Change Status Message",
        value: current,
      });

      if (text === undefined) {
        return;
      }

      await config.update("text", text, vscode.ConfigurationTarget.Global);
    },
  );

  context.subscriptions.push(changeMessage);

  render();

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("anorakStatusMessage")) {
        render();
      }
    }),
  );
};

const deactivate = () => {};

module.exports = { activate, deactivate };
