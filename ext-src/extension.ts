import * as vscode from 'vscode';
import config from './config';
import WebNgPanel from './ng-webview';

const START_COMMAND: string = 'ng-webview.start';
const SEND_MSG_COMMAND: string = 'ng-webview.send-message';


const DEBUG = false;
const debug = (fn: Function) => {
  DEBUG && fn();
};

export const activate = (context: vscode.ExtensionContext): void => {
  const startCommand = vscode.commands.registerCommand(START_COMMAND, () => {
    WebNgPanel.createOrShow(context);
  });
  const sendMsgCommand = vscode.commands.registerCommand(SEND_MSG_COMMAND, () => {
    WebNgPanel.sendMessage(context);
  });

  context.subscriptions.push(startCommand);
  context.subscriptions.push(sendMsgCommand);

  const statusBarItem = vscode.window.createStatusBarItem();
  statusBarItem.text = config.appTitle;
  statusBarItem.command = START_COMMAND;
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  debug(() => vscode.commands.executeCommand(START_COMMAND));
}


export const getWebviewOptions = (extensionUri: vscode.Uri): vscode.WebviewOptions => {
  return {
    // Enable javascript in the webview
    enableScripts: true,

    // And restrict the webview to only loading content from the extension's `js` directory
    // and then angular app directory.
    localResourceRoots: [
      vscode.Uri.joinPath(extensionUri, config.extMediaFolder),
      vscode.Uri.joinPath(extensionUri, config.appPath),
    ],
  };
};


export const getNonce = (): string => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
