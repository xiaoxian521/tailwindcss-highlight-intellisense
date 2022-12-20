import type { ExtensionContext } from "vscode";
import { window, workspace } from "vscode";

import { Configuration } from "./utils/configuration";
import { Decoration } from "./utils/decoration";

export async function activate(context: ExtensionContext): Promise<void> {
  const configuration = new Configuration();
  const decoration = new Decoration(configuration);
  decoration.update();
  window.onDidChangeActiveTextEditor(
    () => {
      decoration.update();
    },
    null,
    context.subscriptions
  );
  workspace.onDidChangeTextDocument(
    () => {
      decoration.update();
    },
    null,
    context.subscriptions
  );
  workspace.onDidChangeConfiguration(
    () => {
      const configuration = new Configuration();
      decoration.update(configuration);
    },
    null,
    context.subscriptions
  );
}

export async function deactivate(): Promise<void> {
  const configuration = new Configuration();
  const decoration = new Decoration(configuration);
  decoration.dispose();
}
