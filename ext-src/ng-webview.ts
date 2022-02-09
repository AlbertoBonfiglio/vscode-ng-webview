import config from './config';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { getNonce, getWebviewOptions } from './extension';
import  LocalStorageService  from './services/local-storage.service';

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
      (message: any) => {
        switch (message.command) {
          case 'alert':
            vscode.window.showErrorMessage(message.text);
            return;
        }
      },
      null,
      this.disposables
    );

    vscode.window.showInformationMessage(`${config.appTitle} Activated`);
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

  /**
   * Returns html of the start page (index.html)
   */
  private getHtmlForWebview(webview: vscode.Webview): string {
    // path to dist folder
    const appDistPath = path.join(this.context!.extensionPath, config.appPath);
    const appDistPathUri = vscode.Uri.file(appDistPath);

    // Local path to main script run in the webview
    const scriptUri = vscode.Uri.joinPath(
      this.context!.extensionUri,
      config.extMediaFolder,
      config.extMediaScript
    ).with({ scheme: 'vscode-resource' });

    // Uri to load styles into webview
    const styleResetPath = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context!.extensionUri,
        config.extMediaFolder,
        'reset.css'
      )
    );

    const stylesPathMainPath = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context!.extensionUri,
        config.extMediaFolder,
        'vscode.css'
      )
    );

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce();

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

    // TODO Instead of returning this, return an iframe with this as content
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
