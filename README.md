# VscodeNgWebview

# VSCode Webview based on Angular

This project contains starter template for your next VSCode extension based on `Angular` framework.
It features:
* state management with NgRx, and NgrxSlices, 
* 2-way communication between VsCode and the Angular App via actions and effects,
* persistent storage of configuration data  

<div align="center">
<img src="https://raw.githubusercontent.com/4gray/vscode-webview-angular/master/screenshot.png" width="" alt="Screenshot" title="VSCode Webview Angular" />
</div>

Project was inspired by:
* [vscode-webview-react](https://github.com/rebornix/vscode-webview-react)
* [vscode-webview-angular](https://github.com/4gray/vscode-webview-angular)
* [VSCode Webview API](https://code.visualstudio.com/api/extension-guides/webview)

## Development

This project was generated with `Angular CLI`, so it can be be used for angular development by default.

To test your extension in vscode context add the following to task.json:
```
{
      "name": "Launch Extension",
      "type": "extensionHost",
      "preLaunchTask": "npm: build-dev",
      "request": "launch",
      "runtimeExecutable": "${execPath}",
      "args": [
        "--extensionDevelopmentPath=${workspaceRoot}"
      ],
      "stopOnEntry": false,
      "sourceMaps": true,
      "outDir": "${workspaceRoot}/ext-src"
    }
```
and the following to the script section of package.json
```
"build-dev": "ng build --output-hashing none && tsc -p tsconfig.extension.json",
```

After build process you can press F5 to "Start Debugging" (or: select in menu "Debug" -> "Start Debugging"). A new window will open in which you need to open command palette (Ctrl/Cmd + Shift + P) and select "NgWebView: Open" to start your extension.

## Packaging

To generate extension in `VSIX` format execute the package command:

```
yarn run package
```

Finally the generated VSIX file with VSCode extension should appear in the root folder of your project.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


https://medium.com/younited-tech-blog/reactception-extending-vs-code-extension-with-webviews-and-react-12be2a5898fd
