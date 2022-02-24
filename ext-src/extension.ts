import * as vscode from 'vscode';
import WebNgPanel from './ng-webview';
import { IVsCodeMessage } from './interfaces';
import { environment as env } from './../environments/environment';

const START_COMMAND: string = 'ng-webview.start';
const SEND_MSG_COMMAND: string = 'ng-webview.send-message';
const SEND_TEST_COMMAND: string = 'ng-webview.send-message-test';


const DEBUG = false;
const debug = (fn: Function) => {
  DEBUG && fn();
};

export const activate = (context: vscode.ExtensionContext): void => {
  const startCommand = vscode.commands.registerCommand(START_COMMAND, () => {
    WebNgPanel.createOrShow(context);
  });
  const sendMsgCommand = vscode.commands.registerCommand(SEND_MSG_COMMAND, () => {
    WebNgPanel.sendMessage({
      type: 'message',
      payload: 'test message'
    } as IVsCodeMessage);
  });
  const sendTestMsgCommand = vscode.commands.registerCommand(SEND_TEST_COMMAND, () => {
    WebNgPanel.sendMessage({
      type: 'test',
      payload: 'en',
    } as IVsCodeMessage);
  });

  context.subscriptions.push(startCommand);
  context.subscriptions.push(sendMsgCommand);
  context.subscriptions.push(sendTestMsgCommand);

  const statusBarItem = vscode.window.createStatusBarItem();
  statusBarItem.text = env.appTitle;
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
      vscode.Uri.joinPath(extensionUri, env.extension.extMediaFolder),
      vscode.Uri.joinPath(extensionUri, env.extension.appPath),
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
