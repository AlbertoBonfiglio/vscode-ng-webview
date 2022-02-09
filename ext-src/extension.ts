import { WebPanel } from './ng-webview';
import * as vscode from 'vscode';
/**
 * Manages webview panels
 */
/**
 * Activates extension
 * @param context vscode extension context
 */
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('ng-webview.start', () => {
      WebPanel.createOrShow(context.extensionPath);
    })
  );
}
