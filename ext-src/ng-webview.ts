import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { getWebviewOptions } from './extension';
import  LocalStorageService  from './services/local-storage.service';
import { environment as env } from './../environments/environment';
import { IVSCodeSettings, IVsCodeMessage } from './interfaces';
import { VSCMessages } from './enums';

export default class WebNgPanel {
  public static currentPanel: WebNgPanel | undefined;
  private readonly panel: vscode.WebviewPanel;
  private readonly context?: vscode.ExtensionContext;
  private disposables: vscode.Disposable[] = [];
  private configuration: vscode.WorkspaceConfiguration =
    vscode.workspace.getConfiguration(env.appName);
  private storageManager?: LocalStorageService;

  public static createOrShow(context: vscode.ExtensionContext) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (WebNgPanel.currentPanel) {
      WebNgPanel.currentPanel.panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      env.extension.viewType,
      env.appTitle,
      column || vscode.ViewColumn.One,
      getWebviewOptions(context.extensionUri)
    );

    WebNgPanel.currentPanel = new WebNgPanel(context, panel);
  }

  private constructor(
    context: vscode.ExtensionContext,
    panel: vscode.WebviewPanel
  ) {
    this.context = context;
    this.panel = panel;
    // initializes te workspace storage (not used yet)
    this.storageManager = new LocalStorageService(context.workspaceState);

    // Set the webview's initial html content
    this.update();

    // Update the content based on view changes
    this.panel.onDidChangeViewState(
      (e) => {
        if (this.panel && this.panel.visible) {
          this.update();
        }
      },
      null,
      this.disposables
    );

    // Handle messages from the webview
    this.handleOnDidReceiveMessage();

    // handles conviguration change events
    this.handleOnDidChangeConfiguration();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

    // vscode.window.showInformationMessage(`${env.appTitle} Activated`);
  }

  private handleOnDidReceiveMessage(): void {
    this.panel.webview.onDidReceiveMessage(
       (message: IVsCodeMessage) => {
        // make sure it oly responds to ng-app sent messages
        if (message.source !== `NG-${env.appName}`) return;

        switch (message.type) {
          case VSCMessages.alert:
            vscode.window.showErrorMessage(message.payload);
            break;
          case VSCMessages.info:
            vscode.window.showInformationMessage(message.payload);
            break;
          case VSCMessages.warning:
            vscode.window.showWarningMessage(message.payload);
            break;
          case VSCMessages.loadSettings:
            WebNgPanel.sendMessage({
              type: VSCMessages.loadSettingsComplete,
              payload: this.configuration
            } as IVsCodeMessage);
            break;

          default:
            console.log('[WebNgPanel] unknown command.', message);
            break;
        }
      },
      null,
      this.disposables
    );
  }

  private handleOnDidChangeConfiguration(): void {
    vscode.workspace.onDidChangeConfiguration(
      (event: vscode.ConfigurationChangeEvent) => {
        // refresh the configuration object
        this.configuration = vscode.workspace.getConfiguration(
          env.appName
        );

        for (let [key, value] of Object.entries(this.configuration)) {
          if (event.affectsConfiguration(`${env.appName}.${key}`)) {
            WebNgPanel.sendMessage({
              type: VSCMessages.changedSetting,
              payload: { key, value }
            } as IVsCodeMessage);
            break;
          }
        }
      }
    );
  }

  private update(): void {
    this.panel.title = env.appTitle;
    this.panel.webview.html = this.getHtmlForWebview();
  }

  public static revive(
    panel: vscode.WebviewPanel,
    context: vscode.ExtensionContext
  ) {
    WebNgPanel.currentPanel = new WebNgPanel(context, panel);
  }

  public static sendMessage(payload: IVsCodeMessage): void {
    const view = WebNgPanel.currentPanel?.panel?.webview;
    if (view) {
      payload.source = `${env.extension.prefix}-${env.appName}`;
      view.postMessage(payload);
    }
  }

  // Returns the html content for the webview (the ng app)
  private getHtmlForWebview(): string {
    // path to dist folder
    const appDistPath = path.join(this.context!.extensionPath, env.extension.appPath);
    const appDistPathUri = vscode.Uri.file(appDistPath);

    // path as uri
    const baseUri = this.panel.webview.asWebviewUri(appDistPathUri);

    // get path to index.html file from dist folder
    const indexPath = path.join(appDistPath, 'index.html');

    // read index file from file system
    let indexHtml = fs.readFileSync(indexPath, { encoding: 'utf8' });

    // update the base URI tag
    indexHtml = indexHtml.replace(
      '<base href="/">',
      `<base href="${String(baseUri)}/">`
    );

    return indexHtml;
  }

  public dispose() {
    WebNgPanel.currentPanel = undefined;

    // Clean up our resources
    this.panel.dispose();

    while (this.disposables.length) {
      const stack = this.disposables.pop();
      if (stack) {
        stack.dispose();
      }
    }
  }
}
