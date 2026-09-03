const vscode = require("vscode");
const https = require("https");

let statusBarItem;

function fetchDadJoke() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "icanhazdadjoke.com",
      path: "/",
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Anorak Dad Joke VS Code Extension",
      },
      timeout: 8000,
    };

    const req = https.get(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed && typeof parsed.joke === "string") {
            resolve(parsed.joke);
          } else {
            reject(new Error("Unexpected response from icanhazdadjoke.com"));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("timeout", () => req.destroy(new Error("Request timed out")));
    req.on("error", reject);
  });
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, Math.max(0, maxLength - 1)).trimEnd() + "…";
}

async function loadNewJoke() {
  const config = vscode.workspace.getConfiguration("anorakDadJoke");
  const enabled = config.get("enabled", true);

  if (!enabled) {
    statusBarItem.hide();
    return;
  }

  statusBarItem.text = "$(sync~spin) Loading a dad joke...";
  statusBarItem.tooltip = "Fetching a fresh dad joke from icanhazdadjoke.com…";
  statusBarItem.show();

  const maxLength = config.get("maxLength", 80);

  try {
    const joke = await fetchDadJoke();
    statusBarItem.text = `😄 ${truncate(joke, maxLength)}`;
    statusBarItem.tooltip = `${joke}\n\nClick for another.`;
  } catch (err) {
    statusBarItem.text = "😅 Couldn't fetch a joke";
    statusBarItem.tooltip = `Dad joke fetch failed: ${err.message}\n\nClick to retry.`;
  }
}

function activate(context) {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    45,
  );
  statusBarItem.command = "anorakDadJoke.newJoke";
  context.subscriptions.push(statusBarItem);

  context.subscriptions.push(
    vscode.commands.registerCommand("anorakDadJoke.newJoke", () =>
      loadNewJoke(),
    ),
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("anorakDadJoke")) {
        loadNewJoke();
      }
    }),
  );

  loadNewJoke();
}

function deactivate() {}

module.exports = { activate, deactivate };
