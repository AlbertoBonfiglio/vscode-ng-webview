import config from './config';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { getNonce, getWebviewOptions } from './extension';
import  LocalStorageService  from './services/local-storage.service';
import { IVsCodeMessage, IVSCodeSettings } from './interfaces';

export default class WebNgPanel {
  public static currentPanel: WebNgPanel | undefined;
  private static readonly viewType = 'angular';
  private readonly panel: vscode.WebviewPanel;
  private readonly context?: vscode.ExtensionContext;
  private readonly builtAppFolder: string;
  private disposables: vscode.Disposable[] = [];
  private configuration: vscode.WorkspaceConfiguration =
    vscode.workspace.getConfiguration(config.configuration);
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
      WebNgPanel.viewType,
      config.appTitle,
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
    // sets the angular app path
    this.builtAppFolder = config.appPath;
    // initializes te workspace storage
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

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

    // Handle messages from the webview
    this.panel.webview.onDidReceiveMessage(
      (message: IVsCodeMessage) => {
        console.log(
          '[WebNgPanel] received command:',
          message.type,
          message.payload
        );
        switch (message.type.toLowerCase()) {
          case 'alert':
            vscode.window.showErrorMessage(message.payload);
            break;
          case 'info':
            vscode.window.showInformationMessage(message.payload);
            break;
          case 'warn':
            vscode.window.showWarningMessage(message.payload);
            break;
          case 'loadsettings':
            const settingsMessage = {
              type: 'loadSettings',
              payload: this.configuration,
              source: config.appTitle,
              } as IVsCodeMessage;
            WebNgPanel.sendMessage(settingsMessage);
            break;
          default:
            console.log('[WebNgPanel] unknown command.', message);
            break;
        }
      },
      null,
      this.disposables
    );

    vscode.window.showInformationMessage(`${config.appTitle} Activated`);
    console.log("[Config] :", this.configuration as unknown as IVSCodeSettings );
  }

  private update(): void {
    this.panel.title = config.appTitle;
    this.panel.webview.html = this.getHtmlForWebview(this.panel.webview);
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
      console.log('[WebNgPanel] sending message to app.', payload);
      view.postMessage(payload);
    }
  };

  /**
   * Returns html of the start page (index.html)
   */
  private getHtmlForWebview(webview: vscode.Webview): string {
    // path to dist folder
    const appDistPath = path.join(this.context!.extensionPath, config.appPath);
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
